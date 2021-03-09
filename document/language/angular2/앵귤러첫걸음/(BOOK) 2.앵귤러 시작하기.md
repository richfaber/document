[![thumbs](https://lh3.googleusercontent.com/-DP_1WlcsJxw/WWHQ9TJixuI/AAAAAAAASKE/ndaT8Dslq1Ivom24xHoYd9w_eQObvMQwwCHMYCw/I/thumbs.jpg)](http://www.yes24.com/24/Goods/41070512?Acode=101)

# (BOOK) 2.앵귤러 시작하기

타입 스크립트는 자바스크립트의 인기에 따라서 탄생한 언어 이다. 규모가 있는 웹 애플리케이션에서 안정적인 코드를 생산하기 위해 마이크로 소프트(MS) 에서 만든 언어 이다.  
하지만 기본 자바스크립트 문법에 타입(typed) 정보를 추가하고, 코드의 오류 검사를 하는 기능을 넣은것 뿐이다.  
  
확장명은 ts로 작성하고, 컴파일을 통해서 js 파일이 생성 된다.  

## 타입 스크립트

### 타입 언어

타입스크립트는 자바스크립트에 명시적으로 타입을 추가한 언어이다.   
자바스크립트는 기본으로 5가지 타입 + 객체타입 이 있는데, 변수 선언시의 그 타입이 결정되는 것이 아닌, 변수에 값을 대입할 때 타입이 결정되는 동적 프로그래밍 언어로 본다.  
  
이런 유연성을 바탕으로 빠르게 개발할 수 있다는 장점이 있지만, 대규모의 코드 베이스로 제작되고 있는 현재의 상황에는 각종 요구사항에 대한 코드 변경, 리팩토링이 어렵다는 단점이 있다.  
  
하지만 타입 정보가 명시적이 되면, IDE의 도움을 받아 코드 오류를 쉽게 탐지하고, 안전한 리팩토링을 할 수 있다.  
  
```javascript
  var unknownTypedVal = 1 + "1";

  if(unknownTypedVal === 2) {
    console.log("비교 성공!");
  }
```
  
> 숫자1과 문자열"1"을 `+` 연산하면 11(String) 이 된다. 이것은 `+` 연산 에만 적용되는 자바스크립트의 특징 이라고 간단하게 생각하자.  
  
```javascript
  var unknownTypedVal = 1 - "1"; --> 0
```
  
처음 예제에 보면 if문으로 unkownTypedVal 변수가 2 인지를 기대하는 코드가 들어가 있다. 하지만 값이 11이라서 if문 안에는 못들어간다.  
  
이 코드를 타입스크립트로 바꾸면, 코드상의 문제가 있을수 있다고 경고를 해준다.  

### 상위 언어

타입스크립트는 자바스크립트의 기능을 포함하여 추가적인 기능을 제공하는 상위 개념의 언어 이다.  
  
온전히 자바스크립트만 사용해도 타입스크립트는 무리없이 돌아간다. 다시 얘기해서 자바스크립트에 타입정보를 추가하는 것이 타입스크립트의 기본 형태라고 보면 된다.  
  
엄격하게 타입스크립트 에서는 타입을 모두 명시하는 것을 권장하고, 이것은 정적 언어 인것처럼 보일때도 있다.  
  
하지만 권고일뿐, 필요한 부분에만 타입을 선언해서 코딩하는 것이 일반적인 것 같다.  
(취향의 차이랄까?? 이게 맞고, 저건 틀리다는 문제는 아니니깐..)  

### 기본 코드 실습

확장명 ts로 작성된 타입스크립트는 컴파일을 통해서 js 파일로 변환해야 사용할 수 있다.  
  
우선 타입스크립트를 설치 하자.  
  
```command
> npm install -g typescript
```
  
-g 옵션으로 전역설치를 하고, 어디에서든 typescript 명령어를 사용할 수 있게 하자.  
  
간단한 예제파일을 만들고 컴파일을 통해 js 파일로 변환해 보자.  
  
```typescript
[class-extend.ts]

class Person {
  name: string;
  age: number;
}

class Empolyee extends Person {
  department: string;
  role: string;
}
```
  
class-extend.ts 로 파일을 저장하고, commandline 에서 컴파일 해보자.  
  
```command
> tsc class-extend.ts
```
  
실행하고 나면 class-extend.js 파일이 생겼다.  
  
```javascript
[class-extend.js]

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = (function () {
    function Person() {
    }
    return Person;
}());
var Empolyee = (function (_super) {
    __extends(Empolyee, _super);
    function Empolyee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Empolyee;
}(Person));
```
  
특별한 옵션을 지정하기 않았기 대문에, ecmascript 3 버전 기준으로 컴파일이 되었다.  
이번에는 옵션을 통해서, ecmascript 6 로 컴파일 해보자  
  
```command
> tsc class-extend.ts --target es6
```
  
컴파일을 하고 나니 ecmascript 6에서 class를 지원하기 때문에, 큰 차이없는 코드가 나올줄 알았는데, 타입스크립트에서 지정한 속성들이 없어져 버렸다. (아니.. 왜?)  
  
```javascript
[class-extend.js]

class Person {
}
class Empolyee extends Person {
}
```
  
이유는 es6 문법에서 클래스는 메서드만을 수용하기 때문이라고 한다.  
(그럼 의도치 않은 실행 결과가 나오는데, 이건 아니지 않냐?? 알아서 컴파일 해줘야지. es6 특성을 생각하면서 타입스크립트 코딩 하란 말이냐?? ㅉㅉㅉ)   
    
차치하고, es6 에서 속성을 선언 하기 위해 constructor 메서드를 활용 해야 한다.  
  
```typescript
[class-extend.ts]

class Person {

  constructor(public name, public age) {

  }
}
``` 
  
이렇게 constructor 에 변수명을 넣고, 전역변수로 사용하기 위해 public을 넣었다.  
  
그럼 아래와 같이 컴파일 된다.  
  
```javascript
[class-extend.js]

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
```

public을 붙이지 않으면, 지역변수로 컴파일 된다.

```javascript
[class-extend.js]

class Person {
    constructor(name, age) {
    }
}
```

public은 접근제한자 로서 es6에서 지원하는 것은 아니고, 타입스크립트에서 지원하는 것임을 주의 하자.  
(그래서 컴파일후 public은 삭제된 js가 나옴)  
(타입스크립트 작성 하면서 js 로 어떻게 나올지를 상상 하면서 해야 한다. 이건 아닌데;;)  
  
앵귤러 프레임워크 코드 자체가 모두 타입스크립트로 되어 있다고 한다. 빅터 사브킨이 장단점을 설명해놓았다고 하니, 시간날때 한번 보는것도 좋을거 같다. (저자가 번역해 놓은 한글 번역본)  
  
> [Angular: Why TypeScript](https://github.com/not-for-me/til/blob/master/angular2/translations/writing_angular2_in_typescript.md)
  
(시간없음.)  

## Hello, Angular

하하 역시 `Hello Language` 를 안하면 서운하지..  
  
앵귤러 진입시에 갖추어야 할 사전 준비(Node + TSC + Webpack or Gulp or Grunt)를 설정 하다가 지쳐 쓰러지다 보니, 일반적으로 사용되는 환경을 제공해 주는데, 이걸 통상 CLI(Command Line Interface) 라 하고, 앵귤러팀도 이걸 만들어 줬다.  
하지만 대부분의 CLI로 생성된 환경설정은, 아직까지는 프로젝트에 그대로 적용 하기엔 무리수가 있고, 결국 손대야 하기 때문에, 환경설정 에서 완전히 자유로울 수는 없다. (경로설정 정도 바꾸는 걸로 끝나지 않음)  
  
하지만 실습용 으로는 굿~  
  
```command
d:/bear> npm install @angular/cli -g
...
...
...
  │ │   └─┬ parse-glob@3.0.4
  │ │     └── is-dotfile@1.0.3
  │ ├─┬ serve-index@1.9.0
  │ │ └── batch@0.6.1
  │ ├─┬ spdy@3.4.7
  │ │ └─┬ spdy-transport@2.0.20
  │ │   └── detect-node@2.0.3
  │ └─┬ yargs@6.6.0
  │   ├─┬ cliui@3.2.0
  │   │ └─┬ string-width@1.0.2
  │   │   └── is-fullwidth-code-point@1.0.0
  │   └── yargs-parser@4.2.1
  └── zone.js@0.8.13
```
  
-g 옵션으로 전역설치 했기 때문에, 아무경로에서나 실행할 수 있다.  

### ng new

ng new 를 통해 프로젝트 이름을 입력하면 필요한 최소한의 파일들이 설치 된다.  
  
```command
d:/bear> ng new hello-angular
Unable to find "@angular/cli" in devDependencies.

Please take the following steps to avoid issues:
"npm install --save-dev @angular/cli@latest"

installing ng
  create .editorconfig
  create README.md
  create src/app/app.component.css
  create src/app/app.component.html
  create src/app/app.component.spec.ts
  create src/app/app.component.ts
  create src/app/app.module.ts
  create src/assets/.gitkeep
  create src/environments/environment.prod.ts
  create src/environments/environment.ts
  create src/favicon.ico
  create src/index.html
  create src/main.ts
  create src/polyfills.ts
  create src/styles.css
  create src/test.ts
  create src/tsconfig.app.json
  create src/tsconfig.spec.json
  create src/typings.d.ts
  create .angular-cli.json
  create e2e/app.e2e-spec.ts
  create e2e/app.po.ts
  create e2e/tsconfig.e2e.json
  create .gitignore
  create karma.conf.js
  create package.json
  create protractor.conf.js
  create tsconfig.json
  create tslint.json
Installing packages for tooling via npm.
Successfully initialized git.
Project 'hello-angular' successfully created.
```
  
- e2e : e2e는 End-to-End 를 의미함. 브라우저를 실제로 띄워서 애플리케이션을 통합 테스트할 테스트 코드도 포함되어 있다.
- src : 실제 애플리케이션에 필요한 소스가 들어있다.
- .angular-cli.json : angular-cli에서 사용할 설정 정보
- karma.conf.js : Karma 단위 테스트 도구의 설정 파일
- protractor.conf.js : e2e 폴더에 선언된 통합 테스트를 실행하기 위한 protractor 도구 설정 파일
- tslint.json : 타입스크립트용 구문 체크 설정 파일
- tsconfig.json : 타입스크립트 컴파일 설정 파일
- src/typings.d.ts : 타입스크립트에서 사용할 타입 선언 정보
  
가볍게.. pass  

### ng serve

웹서버를 구동 시키는 명령어다. `ng new` 로 새로 프로젝트를 생성했다면  `ng serve` 를 통해서 서버구동을 해보자  
  
```command
d:bear> cd hello-angular
d:bear/hello-angular> ng serve
** NG Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200 **
Hash: 2c27530a223a3ecca45a                                                    / Time: 6605ms
chunk    {0} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 171 kB {4} [initial] [rendered]
chunk    {1} main.bundle.js, main.bundle.js.map (main) 5.28 kB {3} [initial] [rendered]
chunk    {2} styles.bundle.js, styles.bundle.js.map (styles) 10.5 kB {4} [initial] [rendered]
chunk    {3} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.18 MB [initial] [rendered]
chunk    {4} inline.bundle.js, inline.bundle.js.map (inline) 0 bytes [entry] [rendered]
webpack: Compiled successfully.
```
  
webpack으로 파일이 묶이고, 서버가 구동되었다.   
`localhost:4200` 접속하면 화면이 나온다.  
  
설정 으로 지쳐 쓰러지지 않고, 아주 간단하게 실행 환경을 만들게 되었다.  
  
구동된 서버를 중지시키는 것은 `Ctrl+C` 를 누르면 된다.  

### ng test

웹서버와 별도로 테스트 서버 구동 시키는 명령어 이다. Angular-CLI는 카르마 테스트환경을 제공하고 있다.  
테스트코드는 중요성을 알면서도, 작성하지 않게 되는건... 음.... -_-....  
  
구동하고 있던 서버를 `Ctrl+C`로 중지시키고 해도 되고, 새로운 Command창을 띄어서 해도 상관없다.  
  
```command
d:/bear/hello-angular> ng test
 10% building modules 1/1 modules 0 active13 07 2017 15:45:42.634:WARN [karma]: No captured browser, open http://localhost:9876/
13 07 2017 15:45:42.646:INFO [karma]: Karma v1.7.0 server started at http://0.0.0.0:9876/
13 07 2017 15:45:42.646:INFO [launcher]: Launching browser Chrome with unlimited concurrency
13 07 2017 15:45:42.656:INFO [launcher]: Starting browser Chrome
13 07 2017 15:45:47.478:WARN [karma]: No captured browser, open http://localhost:9876/
13 07 2017 15:45:47.656:INFO [Chrome 59.0.3071 (Mac OS X 10.12.5)]: Connected on socket FIHej8C_9TrSxNeqAAAA with id 5388267
Chrome 59.0.3071 (Mac OS X 10.12.5): Executed 1 of 3 SUCCESS (0 secs / 0.113 secChrome 59.0.3071 (Mac OS X 10.12.5): Executed 2 of 3 SUCCESS (0 secs / 0.154 secChrome 59.0.3071 (Mac OS X 10.12.5): Executed 3 of 3 SUCCESS (0 secs / 0.187 secChrome 59.0.3071 (Mac OS X 10.12.5): Executed 3 of 3 SUCCESS (0.207 secs / 0.187 secs)
```
  
`http://localhost:9876/` 를 열어보면 정상적인 테스트 결과가 나오는 것을 확인할 수 있다.  
  
app폴더에 app.component.spec.ts 파일의 테스트 결과가 출력되었다.  
  
### 타입 선언 정보

타입스크립트는 타입명시가 권고이고(명시안하면 설정시 타입이 결정), 컴파일 할 때 정의된 타입에서 벗어나면 에러를 뱉어 낸다.  
  
예를 들어서,  
  
```typescript
[ex_1.ts]

let A = 10;

A = 20;
console.log(A);
```
  
이 파일을 컴파일 하면  
  
```javascript
[ex_1.js]

let A = 10;
A = 20;
console.log(A);
```
  
별일 없이 컴파일 된다. 그런데  
  
```typescript
[ex_1.ts]

let A = 10;

A = 20;
console.log(A);

A = "글자";
console.log(A);
```
  
이걸 컴파일 하려고 하면 Number 형에 String 넣었다고 컴파일러는 불평한다.  
  
```command
d:/bear> tsc ex_1.ts --target es6
ex_1.ts(6,1): error TS2322: Type 'string' is not assignable to type 'number'.
```
  
A에 10을 넣은 순간 A는 숫자라는 타입이 정해져 버렸고, 넣으면 오류가 되는 것이다.  
  
또 다르게  
  

```typescript
[ex_1.ts]

let A:Number = 10;

A = 20;
console.log(A);
```
  
A변수에 콜론(:) 후 타입을 명시할 수 있다. 만약
  
```typescript
[ex_1.ts]

let A:Number;

A = "워후";
```
  
라고 하면 컴파일러는 또 불평한다.
  
```command
d:/bear> tsc ex_1.ts --target es6
ex_1.ts(3,1): error TS2322: Type 'string' is not assignable to type 'Number'.
  Property 'toFixed' is missing in type 'String'.
```
  
왜 string 을 넣었냐며...
  
코드 작성시 이렇게 상단에 모든 변수나 함수, 혹은 함수의 파라미터의 타입을 콜론(:)을 통해서 명시할 수 있는데, 이 명시파일만 따로 파일로 뺄 수 있다. 	
  
```typescript
[ex_1.ts]

/// <reference path="ex_1.d.ts" />
A = "워후";


[ex_1.d.ts]
let A:Number;
```
  
이렇게 파일분리를 하고, reference 속성을 통해 경로를 지정하면, 선언부만 따로 관리가 가능하다.   
  
만약 jquery를 프로젝트 에서 사용한다면, jquery용 .d.ts 파일이 없으면 컴파일이 되지 않는다.
  
쉬운 방법은 그냥 html 하단부에 로딩하면 되겠지만, 프로젝트가 전체적으로 타입스크립트 기반으로 컴파일 되는 환경이라면 .d 파일이 없을때는 컴파일이 되지 않기 때문에, 알아두어야만 한다.
  
외부 라이브러리를 사용해야 할 때는 이 파일이 필수이다.


