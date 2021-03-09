'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const dirTree = require("directory-tree");

const router = express.Router();
const showdown = require('showdown');

let DOCUMENT_ROOT = path.resolve(`./document`);
let shClassMap = {
    h1: 'h1 header',
    h2: 'h2 header',
    ul: 'ul list',
    li: 'li item',
    a: 'a anchor'
};
let shTagBinding = Object.keys(shClassMap)
    .map(key => ({
        type: 'output',
        regex: new RegExp(`<${key}(.*)>`, 'g'),
        replace: `<${key} class="${shClassMap[key]}" $1>`
    }));
let mdConverter = new showdown.Converter({
    noHeaderId: true,
    strikethrough: true,
    tables: true,
    simpleLineBreaks: true,
    openLinksInNewWindow: true,
    extensions: [...shTagBinding]
});


/* GET Local Tree */
router.get("/document/tree", function (req, res, next) {

    let documentTree = dirTree( DOCUMENT_ROOT, {
        normalizePath: true,
        extensions: /\.(md|html)$/,
        attributes:['mode', 'mtime']
    });

    res.setHeader('Content-Type', 'application/json');
    res.json( documentTree );


});

/* GET Local Tree */
router.get("/markup/:directory*?/:file", function (req, res, next) {

    var FILE = decodeURIComponent( DOCUMENT_ROOT + req.path.replace(/^(\/markup\/document)/g, '') ),
        PATH;

    PATH = FILE.replace(DOCUMENT_ROOT, '');
    fs.readFile( FILE, 'utf8', function(error, data) {

        if(error) {

            console.error(error);

        } else {

            res.setHeader('Content-Type', 'application/json');
            return res.json( {
                result: 'ok',
                markup: mdConverter.makeHtml(data),
                path: PATH,
                fileName: req.params.file
            } );

        }

    });

});


module.exports = router;
