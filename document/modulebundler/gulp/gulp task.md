# 기본 gulp task

작년까지만 해도 `bower` 로 의존성 설치를 했는데, `npm` 에도 대부분의 라이브러리 지원이 되어서, 귀찮은 `bower`를 떼어 버리고, `package.json` 에 의존성 설치를 하게 됬다. 

기본으로 사용하는 `gulp` 태스크 이다.

**package.json**

```json
{
  "name": "Default setting",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "gulp",
    "dev": "set NODE_ENV=development&&gulp",
    "release": "set NODE_ENV=production&&gulp build",
    "serve": "node app.js",
    "live": "gulp browser-sync"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/richfaber/setting"
  },
  "author": "leeheewon",
  "license": "MIT",
  "copyright": "",
  "serve": {
    "port": {
      "live": 25530,
      "development": 9000,
      "production": 80
    }
  },
  "paths": {
    "SRC": {
      "RESOURCES": "./_src",
      "SCSS": "./_src/sass",
      "IMAGES": "./_src/images",
      "JS": "./_src/js",
      "HTML": "./_src/html",
      "VENDOR": "./_src/vendor"
    },
    "DEST": {
      "RESOURCES": "./resources",
      "JS": "./resources/js",
      "CSS": "./resources/css",
      "IMAGES": "./resources/images",
      "HTML": "./html",
      "VENDOR": "./resources/vendor"
    }
  },
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-plugin-transform-object-assign": "^6.22.0",
    "babel-plugin-transform-proto-to-assign": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "browser-sync": "^2.18.13",
    "cool-ascii-faces": "^1.3.4",
    "cssnano": "^3.10.0",
    "del": "^3.0.0",
    "git-rev-sync": "^1.9.1",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^4.0.0",
    "gulp-babel": "^7.0.0",
    "gulp-cached": "^1.1.1",
    "gulp-changed": "^3.1.1",
    "gulp-concat": "^2.6.1",
    "gulp-filter": "^5.0.1",
    "gulp-header": "^1.8.9",
    "gulp-inject": "^4.3.0",
    "gulp-load-plugins": "^1.5.0",
    "gulp-newer": "^1.3.0",
    "gulp-plumber": "^1.1.0",
    "gulp-print": "^2.0.1",
    "gulp-rename": "^1.2.2",
    "gulp-sass": "^3.1.0",
    "gulp-size": "^2.1.0",
    "gulp-sourcemaps": "^2.6.1",
    "gulp-uglify": "^3.0.0",
    "gulp-watch": "^4.3.11",
    "gutil": "^1.6.4",
    "gutil-color-log": "^1.0.2",
    "moment": "^2.19.3",
    "nodemon": "^1.12.1",
    "opn": "^5.1.0",
    "path": "^0.12.7",
    "phantomjs-prebuilt": "^2.1.15",
    "prompt-list": "^3.1.1",
    "pump": "^2.0.0",
    "raw-loader": "^0.5.1",
    "run-sequence": "^2.2.0",
    "ts-loader": "^3.1.1",
    "tslint": "^5.8.0",
    "tslint-loader": "^3.5.3",
    "typescript": "^2.6.1",
    "typings": "^2.1.1"
  },
  "dependencies": {
    "express": "^4.16.2",
    "serve-static": "^1.13.1"
  }
}
```

**gulp.js**

```javascript
'use strict';

let browserSync = require('browser-sync').create(); // 기본서버(express)에 proxy를 활용해서 리소스가 변경될때 마다 브라우저를 자동갱신 한다. 옛날부터 생각한건데 귀찮을 뿐.. 죄다 쓰길래 걍 붙여둠.

const $ = require('gulp-load-plugins')({
    pattern: ['*'],
    scope: ['devDependencies']
}); // package.json에 모든 devDependencies에 있는 gulp 플러그인을 $를 이용해서 사용할 수 있다. 예를 들어 gulp-copy 플러그인은 $.copy로 사용할 수 있다. gulp- 가 아니면 못쓴다. devDependencies에 gulp-copy랑 copy랑 두개가 다 있어도 못쓴다.

const pkg = require('./package.json'); // package.json을 로딩함
const gulp = require('gulp');
const Prompt = require('prompt-list');
const cool = require('cool-ascii-faces'); // 랜덤한 얼굴이모티콘을 그려준다. 콘솔에 찍으면 꿀잼~
const logs = require('gutil-color-log'); 
const runSequence = require('run-sequence'); // gulp 태스크 실행을 도와준다. 가독성을 높여준달까
const pump = require('pump'); 

if (!process.env.NODE_ENV) process.env.NODE_ENV = "development"; // package.json에 node_env가 없으면 개발자모드로 설정한다.
let isProd = (process.env.NODE_ENV == "production") ? true : false;
let isLive = false;

// options
const path = pkg.paths;
const PORT = {
    serve: pkg.serve.port[process.env.NODE_ENV], // port정보도 gulp.config 등의 파일로 따로 관리 안하고 그냥 package.json에 설정해 버렸다.
    live: pkg.serve.port['live']
};
const browserslist = require('./_config/browserslist'); // 브라우져 호환성 파일은 따로 관리

const log = (color, msg) => logs(color, cool() + '*** ' + msg); // 여기가 cool로 랜덤한 얼굴 프린트하는 꿀잼 부분.
const onError = (err) => console.log(err);

const banner = [
    "/**",
    " * @project        <%= pkg.name %>",
    " * @author         <%= pkg.author %>",
    " * @build          " + $.moment().format("llll") + " ET",
    // " * @release        " + $.gitRevSync.long() + " [" + $.gitRevSync.branch() + "]",
    " * @copyright      Copyright (c) " + $.moment().format("YYYY") + ", <%= pkg.copyright %>",
    " *",
    " */",
    ""
].join("\n"); // 파일을 모두 작업하고 나서(minify, babel 등) 출력되는 파일 상단에 버전표기를 해준다. 멋찜.

gulp.task('browser-sync', function () {

    return $.browserSync.init({
        port: PORT.live,
        proxy: `localhost:${PORT.serve}`,
        startPath: '/'
    });

});

gulp.task('nodemon', (cb) => {

    let stream = $.nodemon({
        script: 'app.js',
        env: {'NODE_ENV': process.env.NODE_ENV},
        ext: 'js ejs html',
        // watch: ['app.js', 'routes/', 'config/', 'models/', 'views/'],
        watch: ['app.js'],
        ignore: ['webpack.config.js', 'path.js', 'browserslist.js'],
        tasks: function (changedFiles) {
            let tasks = [];
            changedFiles.forEach(function (file) {
                let filename = file.split('/');
                filename = filename[filename.length - 1];
                log('magenta', `file changed : ${filename}`);
                // if (path.extname(file) === '.js' && !~tasks.indexOf('lint')) tasks.push('lint')
                // if (path.extname(file) === '.css' && !~tasks.indexOf('cssmin')) tasks.push('cssmin')
            });
            return tasks;
        }
    });

    stream.on('start', function () {

        $.gutil.log(gutil.colors.green(cool() + ' Nodemon server started!'));
        if ($.browserSync.active) $.browserSync.reload();

    }).on('restart', function () {

        $.gutil.log($.gutil.colors.blue(cool() + ' Nodemon server restarted!'));

    }).on('crash', function () {

        $.gutil.log($.gutil.colors.red(cool() + ' Nodemon has crashed!'));
        stream.emit('restart', 10);  // restart the server in 10 seconds

    });

    if (!isLive) {

        $.opn(`http://localhost:${PORT.serve}`);

    }

    return stream;

});

gulp.task('html', () => {

    return gulp.src(path.SRC.HTML + '/**/*.*')
        .pipe($.changed(path.DEST.HTML)) // 집계된 파일중에 dist 폴더파일과 비교해서 변경된 것만을 다시 추린다.
        .pipe(gulp.dest(path.DEST.HTML));

});

gulp.task('vendor', () => {

    return gulp.src(path.SRC.VENDOR + '/**/*.*')
        .pipe($.changed(path.DEST.VENDOR))
        .pipe(gulp.dest(path.DEST.VENDOR));

});

gulp.task('images', () => {

    return gulp.src(path.SRC.IMAGES + '/**/*.*')
        .pipe($.changed(path.DEST.IMAGES))
        .pipe(gulp.dest(path.DEST.IMAGES));

});

gulp.task('sass', () => {

    return gulp.src(path.SRC.SCSS + '/**/*.scss')
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.sass({
            outputStyle: 'compressed',
            sourceComments: false,
            includePaths: pkg.paths.scss
        })
            .on("error", $.sass.logError))
        .pipe($.cached("sass_compile"))
        .pipe($.autoprefixer(browserslist))
        .pipe($.sourcemaps.write("./"))
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest(path.DEST.CSS));

});

gulp.task("css", ["scss"], () => {

    return gulp.src(path.DEST.CSS + '/**/*.css')
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.newer({dest: path.DEST.CSS}))
        .pipe($.print())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.cssnano({
            discardComments: {
                removeAll: true
            },
            discardDuplicates: true,
            discardEmpty: true,
            minifyFontValues: true,
            minifySelectors: true
        }))
        .pipe($.header(banner, {pkg: pkg}))
        .pipe($.sourcemaps.write("./"))
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest(path.DEST.CSS))
        .pipe($.filter("**/*.css"));

});

gulp.task("js", (cb) => {

    return gulp.src( path.SRC.JS + '/**/*.js' )
        .pipe( $.plumber({errorHandler: onError}) )
        .pipe( $.sourcemaps.init() )
        .pipe( $.changed(path.DEST.JS) )
        .pipe( $.babel() )
        .pipe( $.uglify({mangle: false}) )
        .pipe( $.sourcemaps.write('./') )
        .pipe( gulp.dest(path.DEST.JS) );

    // return pump([
    //   gulp.src(path.SRC.JS + '/**/*.js'),
    //   $.uglify({ mangle : false}),
    //   gulp.dest(path.DEST.JS)
    // ], cb);

});

gulp.task('watch', () => {

    $.watch([path.SRC.SCSS + '/**/*.scss'], (cb) => { // 기본 제공하는 gulp.watch 대신 사용하는 이유는  버벅임 없이 좀더 말끔하게 watch를 수행해 주기 때문인데, 어떤 차이점이 있는지는 모르겠다.

        let filename = cb.path.split('/'),
            type = cb.type;

        filename = filename[filename.length - 1];

        log('cyan', `Detected change: ${filename}`);
        return runSequence('sass');

    });


    $.watch(path.SRC.JS + '/**/*.js', (cb) => {

        let filename = cb.path.split('/'),
            type = cb.type;

        filename = filename[filename.length - 1];

        log('cyan', `Detected change: ${filename}`);
        return runSequence('js');

    });

    $.watch(path.SRC.VENDOR + '/**/*', (cb) => {

        let filename = cb.path.split('/'),
            type = cb.type;

        filename = filename[filename.length - 1];

        log('cyan', `Detected change: ${filename}`);
        return runSequence('vendor');

    });

    $.watch(path.SRC.IMAGES + '/**/*', (cb) => {

        let filename = cb.path.split('/'),
            type = cb.type;

        filename = filename[filename.length - 1];

        log('cyan', `Detected change: ${filename}`);
        return runSequence('images');

    });

    $.watch(path.SRC.HTML + '/**/*', (cb) => {

        let filename = cb.path.split('/'),
            type = cb.type;

        filename = filename[filename.length - 1];

        log('cyan', `Detected change: ${filename}`);
        return runSequence('html');

    });


});

gulp.task('build', (callback) => {

    if (isProd) {

        return $.del([path.DEST.RESOURCES])
            .then(paths => {
                log('red', `deleted build files and folders:\n${paths}`);
                runSequence(['sass', 'js', 'images', 'vendor', 'html']);
            });

    } else {

        return runSequence(['sass', 'js', 'images', 'vendor', 'html']);

    }


});


gulp.task('default', (callback) => {

    console.log(`TASK runner start.`);

    let prompt = new Prompt({ // gulp 실행 시 프롬프트를 받는다. 5초 후 자동으로 1번 선택하게 하고 싶은데, 관련 플러그인 있으면 좋은데, 시간날 때 바닐라로 보완을 해야겠음.
        name: 'select_task',
        message: 'Please choose what you want.',
        choices: [
            '1) Run Development Mode',
            '2) Production Build',
            '3) open live-sync server',
            '-) Exit'
        ]
    });

    prompt.ask((answer) => {

        switch (answer.split(')')[0]) {
            case '1':
                isProd = false;
                runSequence(['build', 'watch', 'nodemon', 'browser-sync']);
                break;

            case '2':
                isProd = true;
                runSequence(['build'], () => log('green', 'Build Started.'));
                break;

            case '3':
                runSequence(['nodemon']);
                if (browserSync.active) browserSync.reload();
                else runSequence(['browser-sync']);
                break;

            default:
                log('green', 'Exit task runner.');
                break;
        }

    });

    // // runSequence(['build'], ['nodemon', 'watch'], cb);

});
```

`gulp` 설정 파일만 무궁무진하게 교체한거 같다. 최종적으론 위와 같은 형태가 가장 쓰기 편한 상태로 사용중이다. 이미지압축이나, css sprite 같은거는 추가해서 보완해야 할 필요가 있다.

`webpack`은 `js` 번들할 때만 사용하고 있는다.

아주아주 한가할 때, 웹팩을 써야하는 납득할 만한 이유를 한번 찾아봐야겠다.


