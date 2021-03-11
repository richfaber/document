> webpack.js.org > DOCS > 2.1 > Get Started > [Why wepack](https://webpack.js.org/get-started/why-webpack/)

# Why webpack?

webpack은 일반적으로 Make, Grunt, Gulp, Browserify 또는 Brunch와 같은 도구와 비교됩니다.
그러나 이러한 도구 중 일부(task runner 인 Make, Grunt 및 Gulp)는 모듈 묶음인 Webpack보다 훨씬 다른 목적을 가지고 있습니다.
그것 들을 직접 비교하는 것은 혼란을 야기 할 수 있으므로 먼저 이러한 도구 유형을 구분해 보겠습니다.

## Task Runner가 뭐지?

Task runner는 글자 그대로 작업을 보다 쉽게 처리 할 수 있도록 도와줍니다.
(예 : linting, building 또는 프로젝트 개발).
Browserify, Brunch 또는 webpack과 같은 번들과 비교하면 더 높은 level의 포커스가 있습니다.
반대로, 묶는 것(bundle)은 훨씬 더 구체적인 목표를 가지고 있습니다.

## Bundlers이 뭐지?

대략적으로 번들러는 JavaScript 파일과 같은 자산을 가져 와서 사용자의 브라우저가 최종적으로 소비하는 데 적합한 형식으로 변환합니다.
이 번들링 프로세스는 웹 개발에서 가장 중요한 문제 중 하나이며, 프로세스에서 많은 부분을 제거 할 수 있습니다.

묶음은 Task runner와 함께 사용할 수 있습니다.
더 높은 수준의 툴링을 통해 이익을 얻을 수 있으며, 번들링의 문제는 보다 전문화 된 툴로 남겨 둘 수 있습니다.
grunt-webpack 및 gulp-webpack은 통합의 좋은 예입니다.

## 비교

webpack은 유일한 모듈 번들러는 아닙니다.

| Feature                                                            | webpack/webpack                                               | jrburke/requirejs                                | substack/node-browserify                         | jspm/jspm-cli                                                                                                                           | rollup/rollup                                            | brunch/brunch                  |
|--------------------------------------------------------------------|---------------------------------------------------------------|--------------------------------------------------|--------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|--------------------------------|
| Additional chunks are loaded on demand                             | yes                                                           | yes                                              | no                                               | System.import                                                                                                                           | no                                                       | no                             |
| AMD?define                                                         | yes                                                           | yes                                              | deamdify                                         | yes                                                                                                                                     | no                                                       | yes                            |
| AMD?require                                                        | yes                                                           | yes                                              | no                                               | yes                                                                                                                                     | no                                                       | yes                            |
| AMD?require?loads on demand                                        | yes                                                           | with manual configuration                        | no                                               | yes                                                                                                                                     | no                                                       | no                             |
| CommonJs?exports                                                   | yes                                                           | only wrapping in?define                          | yes                                              | yes                                                                                                                                     | commonjs-plugin                                          | yes                            |
| CommonJs?require                                                   | yes                                                           | only wrapping in?define                          | yes                                              | yes                                                                                                                                     | commonjs-plugin                                          | yes                            |
| CommonJs?require.resolve                                           | yes                                                           | no                                               | no                                               | no                                                                                                                                      | no                                                       |                                |
| Concat in require?require("./fi" + "le")                           | yes                                                           | no?                                              | no                                               | no                                                                                                                                      | no                                                       |                                |
| Debugging support                                                  | SourceUrl, SourceMaps                                         | not required                                     | SourceMaps                                       | SourceUrl, SourceMaps                                                                                                                   | SourceUrl, SourceMaps                                    | SourceMaps                     |
| Dependencies                                                       | 19MB / 127 packages                                           | 11MB / 118 packages                              | 1.2MB / 1 package                                | 26MB / 131 packages                                                                                                                     | ?MB / 3 packages                                         |                                |
| ES2015?import/export                                               | yes(vr. 2)                                                    | no                                               | no                                               | yes                                                                                                                                     | yes                                                      | yes, via?es6 module transpiler |
| Expressions in require (guided)?require("./templates/" + template) | yes (all files matching included)                             | no?                                              | no                                               | no                                                                                                                                      | no                                                       | no                             |
| Expressions in require (free)?require(moduleName)                  | with manual configuration                                     | no?                                              | no                                               | no                                                                                                                                      | no                                                       |                                |
| Generate a single bundle                                           | yes                                                           | yes?                                             | yes                                              | yes                                                                                                                                     | yes                                                      | yes                            |
| Indirect require?var r = require; r("./file")                      | yes                                                           | no?                                              | no                                               | no                                                                                                                                      | no                                                       |                                |
| Load each file separate                                            | no                                                            | yes                                              | no                                               | yes                                                                                                                                     | no                                                       | no                             |
| Mangle path names                                                  | yes                                                           | no                                               | partial                                          | yes                                                                                                                                     | not required (path names are not included in the bundle) | no                             |
| Minimizing                                                         | uglify                                                        | uglify, closure compiler                         | uglifyify                                        | yes                                                                                                                                     | uglify-plugin                                            | UglifyJS-brunch                |
| Multi pages build with common bundle                               | with manual configuration                                     | yes                                              | with manual configuration                        | with bundle arithmetic                                                                                                                  | no                                                       | no                             |
| Multiple bundles                                                   | yes                                                           | with manual configuration                        | with manual configuration                        | yes                                                                                                                                     | no                                                       | yes                            |
| Node.js built-in libs?require("path")                              | yes                                                           | no                                               | yes                                              | yes                                                                                                                                     | node-resolve-plugin                                      |                                |
| Other Node.js stuff                                                | process, __dir/filename, global                               | -                                                | process, __dir/filename, global                  | process, __dir/filename, global for cjs                                                                                                 | global (commonjs-plugin)                                 |                                |
| Plugins                                                            | yes                                                           | yes                                              | yes                                              | yes                                                                                                                                     | yes                                                      | yes                            |
| Preprocessing                                                      | loaders,?transforms                                           | loaders                                          | transforms                                       | plugin translate                                                                                                                        | plugin transforms                                        | compilers, optimizers          |
| Replacement for browser                                            | web_modules,?.web.js, package.json field, alias config option | alias option                                     | package.json field, alias option                 | package.json, alias option                                                                                                              | no                                                       |                                |
| Requirable files                                                   | file system                                                   | web                                              | file system                                      | through plugins                                                                                                                         | file system or through plugins                           | file system                    |
| Runtime overhead                                                   | 243B + 20B per module + 4B per dependency                     | 14.7kB + 0B per module + (3B + X) per dependency | 415B + 25B per module + (6B + 2X) per dependency | 5.5kB for self-executing bundles, 38kB for full loader and polyfill, 0 plain modules, 293B CJS, 139B ES2015 System.register before gzip | none for ES2015 modules?(other formats may have)         |                                |
| Watch mode                                                         | yes                                                           | not required                                     | yes                                              | not needed in dev                                                                                                                       | no                                                       | yes                            |