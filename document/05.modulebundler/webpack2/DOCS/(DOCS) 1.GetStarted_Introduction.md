> webpack.js.org > DOCS > 2.1 > Get Started > [Introduction](https://webpack.js.org/get-started/)

# Webpack 시작하기

## 시작하기

webpack 은 응용 프로그램 에서 JavaScript 모듈을 작성 하는 도구 입니다.
cli 또는 api에서 webpack을 사용 하려면 설치 지침을 따르십시오. webpack 은 응용 프로그램의 의존성 그래프를 신속하게 구성하고, 올바른 순서로 묶음 으로써 워크 플로를 간소화합니다.

webpack은 코드 최적화, 생산을 위한 vendor/css/js 코드 분할, 페이지 새로 고침 없이 개발서버의 코드를 핫 리로드 하는 등의 많은 멋진 기능을 가지고 있습니다.

webpack을 사용해야 하는 이유에 대해 자세히 알아보십시오.

## bundle 생성하기

데모 디렉토리를 만들고 webpack을 시험해 보십시오. [webpack을 설치](https://webpack.js.org/get-started/install-webpack)하십시오.

```command
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install --save-dev webpack
webpack --help # Shows a list of valid cli commands
npm install --save lodash
```

이제 `index.js` 파일을 만드세요.

**[app/index.js]**

```javascript
function component () {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.map(['Hello','webpack'], function(item){
    return item + ' ';
  });

  return element;
}

document.body.appendChild(component());
```

이 코드를 실행하려면 일반적으로 아래 HTML 코드가 있어야 합니다.

**[index.html]**

```html
<html>
  <head>
    <title>Webpack demo</title>
    <script src="https://unpkg.com/lodash@4.16.6" type="text/javascript"></script>
  </head>
  <body>
    <script src="app/index.js" type="text/javascript"></script>
  </body>
</html>
```

이 예제 에서는 스크립트 태그 사이에 암시적인 의존성이 있습니다.

index.js 는 로딩하기 전에 페이지에 포함되는 lodash 가 로딩 되었다고 가정하고 있습니다.
그것은 index.js 가 lodash 에 대한 필요성을 선언한 부분은 없기 때문에 함축적 입니다.
그것은 단지 전역 변수 _가 있다고 가정 하고 있습니다.

이런 식의 JavaScript 프로젝트를 관리하는 데는 문제가 있습니다.

종속성이 누락 되거나 잘못된 순서로 로딩되면 응용 프로그램이 전혀 작동하지 않습니다.
의존성이 포함되어 있지만 사용되지 않으면 브라우저가 다운로드 해야 하는 많은 불필요한 코드가 있을수도 있습니다.

lodash 의존성을 index.js 에 명시적으로 import 하는 것이 필요합니다.

**[app/index.js]**

```javascript
+ import _ from 'lodash';

function component () {
  ...
}
```

또한 묶여진 단일 js 파일을 로딩하기 위해 index.html을 변경해야 합니다.

```html
<html>
  <head>
    <title>Webpack demo</title>
-   <script src="https://unpkg.com/lodash@4.16.6" type="text/javascript"></script>
-   <script src="app/index.js" type="text/javascript"></script>
  </head>
  <body>
+   <script src="dist/bundle.js" type="text/javascript"></script>
  </body>
</html>
```

여기에서 index.js 는 명시적으로 lodash가 필요하며, _을 전역변수로 바인딩 합니다.

이렇게 모듈이 필요로 하는 종속성을 설명함 으로써, webpack은 이 정보를 사용하여 종속성 그래프를 작성할 수 있습니다.
그런 다음 그래프를 사용하여 스크립트가 올바른 순서로 실행되는 최적화 된 번들(묶여진)을 생성 합니다.
또한 사용되지 않는 종속성은 번들에 포함되지 않습니다.

이제 webpack을 이용해서, 이 폴더의 index.js가 될 항목 파일을 실행하고, 페이지에 필요한 모든 코드가 묶여진 bundle.js 파일을 output 하십시오.

```command
webpack app/index.js dist/bundle.js

Hash: a3c861a7d42fc8944524
Version: webpack 2.2.0
Time: 90ms
   Asset     Size  Chunks             Chunk Names
index.js  1.56 kB       0  [emitted]  main
   [0] ./app/index.js 170 bytes {0} [built]
```

## webpack 설정

좀 더 복잡한 구성을 위해 webpack이 참조 할 수 있는 config 파일을 사용하여 코드를 묶을 수 있습니다. 
위의 CLI 명령은 다음과 같이 config 에 정의할 수 있습니다.

**[webpack.config.js]**

```javascript
module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: './dist'
  }
}
```

이 파일은 webpack 으로 다음과 같이 실행할 수 있습니다.

```command
webpack --config webpack.config.js

Hash: a3c861a7d42fc8944524
Version: webpack 2.2.0
Time: 90ms
   Asset     Size  Chunks             Chunk Names
index.js  1.56 kB       0  [emitted]  main
   [0] ./app/index.js 170 bytes {0} [built]
```

> webpack.config.js 가 있으면 webpack 명령이 기본적 으로 선택 됩니다.

config 파일은 webpack 사용의 모든 유연성을 허용 합니다.
이 config 파일을 사용하여 로더 규칙, 플러그인, 옵션 및 기타 여러 향상된 기능을 번들에 추가 할 수 있습니다.

## npm에서 webpack 사용하기

이런 식으로 CLI에서 webpack을 실행하는 것이 그리 재미있는 것은 아니므로 약간의 지름길을 설정할 수 있습니다. 
다음과 같이 package.json을 조정하십시오.

```JSON
{
  ...
  "scripts": {
    "build": "webpack"
  },
  ...
}
```

이제 npm run build 명령을 사용하여 위와 동일한 결과를 얻을 수 있습니다.
npm은 scripts를 통해 스크립트를 선택하고, 임시로 환경을 패치하여 bin 명령을 포함 합니다.
이 방식은 많은 프로젝트에서 볼 수 있습니다.

> npm 실행 빌드 명령에 두개의 대시를 추가하여 webpack 에 사용자 지정 매개 변수를 전달할 수 있습니다 (예 : `npm run build`, `npm run build -- --colors`)

## 결론

이제 [기본 빌드](https://webpack.js.org/concepts)를 만들었으므로 webpack의 기본 개념과 구성을 파헤쳐 [configuration](https://webpack.js.org/configuration)를 더 잘 이해해야 합니다.
또한 일반적인 문제에 접근하는 방법을 배우려면 [안내서](https://webpack.js.org/guides)를 확인하십시오. [API 섹션](https://webpack.js.org/api)은 하위 수준으로 파급됩니다.

