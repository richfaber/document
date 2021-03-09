[![thumbs](https://lh3.googleusercontent.com/-DP_1WlcsJxw/WWHQ9TJixuI/AAAAAAAASKE/ndaT8Dslq1Ivom24xHoYd9w_eQObvMQwwCHMYCw/I/thumbs.jpg)](http://www.yes24.com/24/Goods/41070512?Acode=101)

# 1 앵귤러 준비하기

프론트엔드는 전에 없던 사전컴파일 과정이 생기면서, 뭘 하나 배우려면 사전컴파일 과정을 먼저 공부해야 한다.  

쉽게 얘기하면, Nodejs를 설치하고, 태스크러너(gulp or grunt or webpack), 모듈설치 및 설정(Brew or Npm or Bower or etc and package.json or 각종 lint설정) 등을 알고 나서, 컴파일 환경이 적응 되어야 한다는 것을 의미 하며, 그것을 알고 나서야 비로소 Sass든 Less든 es6든 Ionic, Angular, Typescript, React, Vue, Fuse 등등등.. 새로운 기술을 할 수 있다.

이 과정이 쉽지만은 않기 때문에, 사전에 질려 버리는 경우가 허다하다.  
   
(이렇게 하면 될거 같은데, 그대로 되지 않는 경우가 문제다. 그렇다고 해법이 검색을 통해 바로 나오지도 않는다. 대충 해결되고 익숙해 질 때쯤 다른 것이 나와 버린다.)

이것은 여전히 발전하고 있는 자바스크립트 과정에서 안정화 보다는 성장을 하고 있기 때문인데, 지금 불평하기에는 이런 기술들이 나온지가 꽤 되었고, 이미 다수의 개발자들은 익숙해지고 있어서, 지금 시작하는 것이 늦지는 않았지만, 더 지체할 수는 없다는 것은 사실이다. 이전에 웹표준이나 jquery를 선지적으로 학습했던 개발자들은 고통스러운 과정이였지만, 이후 일반화 되었을때는 선점적인 위치에서 인정받을 수 있었던 느낌 이랄까..

다행인건, 이러한 자바스크립트 성장과정에서 컴파일은 컴파일대로, 언어는 언어대로 독립적인 부분이 있고, 앵귤러를 하던, React를 하던, Vue.js 를 하던 컴파일 과정은 모두 같은 과정이고, 언어는 es6의 공유점이 있기 때문에, 하나 해놓으면 다른거 에서 고생할 일이 줄어든다.  
  
그래서 React던 Angular던 하나는 해야 한다는 말이 나온다.  

## Node.js

앵귤러2 이후부터는 앵귤러1 버전의 `AngularJS1` 의 JS 라는 이름은 빼버리고 `Angular` 로 명칭을 변경하고 꾸준히 버전업 하여, 현재 Angular4 까지 버전업 되었다.  
  
앵귤러4는 Node.js 4.x.x, Npm 3.x.x 이상을 요구하고 있다. 이전에 Node.js를 설치한 사람은 CommandLine 에서 업데이트 하면 된다.  
[- Nodejs 버전올리기](https://velopert.com/1351)

처음 설치하는 사람은 [Nodejs 홈페이지](https://nodejs.org/)에 가서 설치하자.  
  
설치가 잘 되었는지 테스트를 해보자  
  
`welcome.js` 라는 파일을 편한 곳에 작성하고 내용으로는 `console.log('hello')` 라고 작성하자.  
  
commandline에서 node를 이용해서 출력결과를 얻어보자.

```command
> node welcome.js_
hello

> _
```  

위와 같은 결과가 나왔다면 제대로 설치된 것이다. 브라우저에서 실행한 것과 다른점은 window 객체는 없고, global 객체가 있다는 것이다.

그래서 오픈소스 라이브러리 등에서는 아래와 같은 패턴이 보인다.

```javascript
(function(global) {
	... some code ...
})(this);
```

브라우저에서 this를 window를 가르키기 때문에, window객체가 global 매개변수로 전달 되지만, node 같은 경우 global객체가 global매개변수로 전달 된다.

## NPM 다루기

Nodejs 를 설치하면, Npm이 같이 설치되기 때문에, 다른 과정은 필요없다.  
Npm을 통해서 필요한 모듈들을 설치할 수 있다.

### Npm 주요 명령어

- npm init : 의존성 모듈설치를 위한 준비(package.json 파일생성)
- npm install : package.json에 나열되 있는 의존성 모듈 설치 또는 새로운 모듈 설치(예를 들어 npm install jquery 를 하면 jquery가 설치되고, package.json 파일에 jquery 파일이 등록된다.)
- npm uninstall : 설치된 모듈을 삭제한다.
- npm list : 설치된 의존성 모듈 목록을 보여준다.
- npm link : 전역 환경으로 설치된 모듈을 현재 위치에 설치된 모듈을 바라보게 한다.
- npm run : package.json의 scripts에 나열된 명열을 수행 한다.

초반부터 질리는 것을 방지하기 위해서, 이런게 있다 정도로 skip 하자. 하다보면 외워진달까..
(엄청 skip 못하는 1인)

### 패키지 설치

프로젝트 폴더를 하나 만들고 의존성모듈 설치를 해보자.  

`d:/bear` 폴더를 예제로 들어보면.

```command
c:> d:
d:> mkdir bear (맥사용자는 가끔 권한문제가 있는데 앞에 sudo 로 관리자권한 실행을 하자 sudo mkdir bear)

d:> cd bear
d:/bear> npm init

... 엔터키 누르면 기본값 들어가는데, 계속 엔터키 치자.

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (bear)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /bear/package.json:

{
  "name": "bear",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

... 끝나고 나면 pacekage.json 파일이 생긴다.

d:/bear> dir (맥사용자는 ls)

package.json

... 파일이 생겼다면 제대로 된 것이다. 없다면 뭔가 문제가 있는 것임 -_-?

d:/bear> npm install jquery

bear@1.0.0 /bear
└── jquery@3.2.1

npm WARN bear@1.0.0 No description
npm WARN bear@1.0.0 No repository field.

```

[Node Package에 등록](https://www.npmjs.com/) 되어 있는 가장 최신 버전의 jquery 가 현재 폴더의 node_module 폴더로 설치된다.

특정 버전을 설치하는 것도 가능한데,

```command
d:/bear> npm install jquery@1.12.4
```

이렇게 @ 붙이고 버전을 명시하면 된다. 이렇게 설치된 모듈들은 보통 src폴더와 dist폴더가 있는데, dist가 최종 파일이라고 보면 된다. 그 안에 ???.min.js 등이 있는데, 이것을 보통 프로젝트의 파일로 사용 한다.

부록으로 설치가 되었으니, `npm list` 를 통해서 설치목록을 한번 보자

```command
d:/bear> npm list
bear@1.0.0 /bear
└── jquery@3.2.1 extraneous

npm ERR! extraneous: jquery@3.2.1 /bear/node_modules/jquery
```

Error가 나올 때도 있고, Warning 이 나올때도 있는데, 가볍게 skip~

bear 폴더에 ex.html로 저장하고 출력결과를 보면, 정상적으로 jquery 버전이 로드 되는 것을 확인할 수 있다.

```html
<!doctype html>
<html lang="ko">
<head>
  <title>Welcome Msg App</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script type="text/javascript" src="./node_modules/jquery/dist/jquery.min.js"></script>
</head>
<body>
안녕 앵귤러?

<script>
document.write("jquery version : " + $.fn.jquery);
</script>
</body>
</html>
```

### 패키지와 의존 관계

패키지를 설치할 때, 의존되는 패키지들 까지 같이 설치된다.
예를 들어 http-server라는 간단하게 서버를 구동할 수 있는 모듈을 설치해 보자.

```command
d:\bear> npm install http-server
npm WARN prefer global http-server@0.10.0 should be installed with -g
bear@1.0.0 /bear
└─┬ http-server@0.10.0
  ├── colors@1.0.3
  ├── corser@2.0.1
  ├─┬ ecstatic@2.2.1
  │ ├── he@1.1.1
  │ ├── mime@1.3.6
  │ ├── minimist@1.2.0
  │ └── url-join@2.0.2
  ├─┬ http-proxy@1.16.2
  │ ├── eventemitter3@1.2.0
  │ └── requires-port@1.0.0
  ├── opener@1.4.3
  ├─┬ optimist@0.6.1
  │ ├── minimist@0.0.10
  │ └── wordwrap@0.0.3
  ├─┬ portfinder@1.0.13
  │ ├── async@1.5.2
  │ ├─┬ debug@2.6.8
  │ │ └── ms@2.0.0
  │ └─┬ mkdirp@0.5.1
  │   └── minimist@0.0.8
  └─┬ union@0.4.6
    └── qs@2.3.3

npm WARN bear@1.0.0 No description
npm WARN bear@1.0.0 No repository field.

d:/bear> cd node_modules/http-server
```

위와 같이 http-server는 colors 모듈 이라던지, http-proxy 라던지, ecstatic 등등 나열된 모듈들이 같이 설치되는데, http-server 모듈이 이런 여러가지 모듈을 필요로 한다는걸 의미 한다.

http-server는 jquery 처럼 브라우저에서 실행할 것이 아니라 node 명령어를 통해 실제 구동을 해야 하는 것이기 때문에, `node_modules\.bin` 폴더에 설치하게 된다.

```command
d:/bear> cd node_modules
d:/bear/node_modules> cd .bin
d:/bear/node_modules/.bin> dir

...
...
http-server
...
...

```

이렇게 http-server라는 확장자 없는 파일이 있다. http-server를 구동해 보자.

```command
d:/bear/node_modules/.bin> node http-server
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.0.46:8080
  http://192.168.1.100:8080
Hit CTRL-C to stop the server

```

8080 포트로 웹서버가 구동 되었다. 브라우저에서 제대로 동작하는지 주소를 넣어보자.
그럼 현재 폴더를 루트로 잡고 웹서버가 구동된 것을 확인할 수 있다.

### 로컬환경과 전역환경

하지만 맨날 .bin 폴더 찾아가서 구동시키는 것은 매우 불편한 일.
자주 사용하는 모듈은 전역설치를 통해, 어디 위치에서든 실행될 수 있도록 옵션을 통해서  가능하다.

```command
d:/bear> npm install http-server -g
/usr/local/bin/http-server -> /usr/local/lib/node_modules/http-server/bin/http-server
/usr/local/bin/hs -> /usr/local/lib/node_modules/http-server/bin/http-server
/usr/local/lib
└─┬ http-server@0.10.0
  ├── colors@1.0.3
  ├── corser@2.0.1
  ├─┬ ecstatic@2.2.1
  │ ├── he@1.1.1
  │ ├── mime@1.3.6
  │ ├── minimist@1.2.0
  │ └── url-join@2.0.2
  ├─┬ http-proxy@1.16.2
  │ ├── eventemitter3@1.2.0
  │ └── requires-port@1.0.0
  ├── opener@1.4.3
  ├─┬ optimist@0.6.1
  │ ├── minimist@0.0.10
  │ └── wordwrap@0.0.3
  ├─┬ portfinder@1.0.13
  │ ├── async@1.5.2
  │ ├─┬ debug@2.6.8
  │ │ └── ms@2.0.0
  │ └─┬ mkdirp@0.5.1
  │   └── minimist@0.0.8
  └─┬ union@0.4.6
    └── qs@2.3.3
```

-g 옵션을 통해서 전역설치가 되고 나면, 어떤 폴더 에서든 실행이 된다.

```command
	d:/bear> http-server
	Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.0.46:8080
  http://192.168.1.100:8080
Hit CTRL-C to stop the server

```

구동되었다. 심지어는 node라는 명령어도 쓰지 않았다.  
신기방기.. 브라우저로 다시 확인해 보면, 이제는 bear 폴더를 루트로 잡은 웹서버가 구동되었다는 걸 확인할 수 있다.   
(nodejs가 처음 발표 되었을때는 http-server가 아니라, nodejs 문법을 통해서 10줄 안되는 js 파일로 서버가 구동되는 것을 보고, 수많은 백엔드 개발자들이 좌절과 상실감을 느꼈다는 설이 있다. 웃음)  
  
### pacekage.json

pacekage.json은 npm 으로 설치되는 모듈의 정보를 담는다. 추가적으로 node 명령어를 통해서 실행할 수 있는 스크립트도 추가할 수 있다.  
  
그런것 들은 무시하더라도 기본적으로 알아야 할 것은, `package.json` 에 나열된 모듈들은 다른 사용자가 `npm install` 이라는 명령어 만으로 모두 자동설치 된다는 것이다.  
  
하지만 위의 방법처럼 `npm install jquery` 만으로는 `package.json` 에 명시되지 않고, 옵션을 사용해야 한다. 아래의 명령어를 통해서 설치하기 전에, package.json 파일의 내용을 확인 한 후에 설치해보자.

```command
c:/bear> npm install --save jquery
bear@1.0.0 /bear
└── jquery@3.2.1

npm WARN bear@1.0.0 No description
npm WARN bear@1.0.0 No repository field.
```

이제 `package.json` 파일을 열어보면 이전과 다른 것이 추가된 것을 확인할 수 있다.

```json
{
  "name": "bear",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "jquery": "^3.2.1"
  }
}
```

dependencies 라는 속성 아래 jquery 가 추가되어 있다.  
만약  `--save` 가 아닌 `--save-dev` 옵션을 사용하면, devDependencies 라는 속성아래 추가 된다.

이 둘의 차이점은 실제 서비스에 배포하는 모듈인지, 개발시에만 필요한 모듈인지를 개념적으로 분리하는 것인데, `package.json`의 기능을 보다 구체적으로 사용할 떄는 의미가 있지만, 단순히 모듈을 설치할 때는 무시해도 좋다.

`npm install`을 통해서 `package.json` 의 나열된 모듈을 설치할 때는 dependenciesd와 devDependencies의 나열된 모든 모듈을 자동설치 해 준다.

설치된 모듈을 제거할 때는 `npm uninstall` 명령을 통해서 할 수 있지만, 옵션을 지정해주지 않으면, `package.json` 파일에 반영되지 않는다.

```command
c:/bear> npm uninstall jquery
- jquery@3.2.1 node_modules/jquery
npm WARN bear@1.0.0 No description
npm WARN bear@1.0.0 No repository field.
```

```json
{
  "name": "bear",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": { <-- 여전히 남아있음.
    "jquery": "^3.2.1"
  }
}
```
  
옵션을 붙여서 삭제하면,  
  
```command
c:/bear> npm uninstall --save jquery
- jquery@3.2.1 node_modules/jquery
npm WARN bear@1.0.0 No description
npm WARN bear@1.0.0 No repository field.
```

```json
{
  "name": "bear",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.json 에서도 삭제된 것을 확인할 수 있다.

@뒤에 붙는 버전명시에 `~` 이런거도 있고 `^` 이런거도 있는데, 호환버전중에 상위버전 이라던지, 최소최대 범위를 정한다던지 하는건데, 알고싶지도 않고, 쓰지도 않고 싶다.  
skip~ 
이 책에 자세히 나와 있음.

