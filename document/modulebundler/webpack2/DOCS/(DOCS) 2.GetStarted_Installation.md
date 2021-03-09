> webpack.js.org > DOCS > 2.1 > Get Started > [Installation](https://webpack.js.org/get-started/install-webpack/)

# 설치

## 체크 요건

시작하기 전에 새로운 버전의 [Node.js](https://nodejs.org/en/)가 설치 되어 있는지 확인하십시오.
현재의 LTS는 이상적인 출발점 입니다.

이전 버전 에서는 `webpack` 또는 관련 패키지에 필요한 기능이 누락 될 수 있으므로 다양한 문제가 발생할 수 있습니다.

## Global 설치

```command
npm install webpack -g
```

이제 webpack 명령을 global로 사용할 수 있습니다.

그러나 이 방법은 권장되지 않습니다.
이렇게 하면 webpack의 특정 버전으로 잠기고 다른 버전을 사용하는 프로젝트에서 실패 할 수 있습니다.

다음 절에서는 프로젝트에서 webpack을 로컬로 설치하는 방법에 대해 설명 합니다.

## Local 설치

```command
npm install webpack --save-dev

npm install webpack@<version> --save-dev
```

프로젝트에서 npm scripts를 사용하는 경우, npm은 로컬 모듈 에서 웹팩 설치를 찾습니다.

```JSON
"scripts": {
    "start": "webpack --config mywebpack.config.js"
}
```

이것은 표준이며 권장되는 방법입니다.

> webpack의 로컬 설치를 실행하기 위해서는 node_modules/.bin/webpack 의 bin 버전으로 실행 할 수 있습니다.

## Bleeding Edge

webpack이 제공 해야하는 최신 버전을 사용하는 것에 열의가 있는 경우 (주의-불안정 할 수 있음), 
webpack 저장소 에서 직접 설치할 수 있습니다.

```command
npm install webpack/webpack#<tagname/branchname>
```