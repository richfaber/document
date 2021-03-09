출처 : 
[![thumbs](https://lh3.googleusercontent.com/-DP_1WlcsJxw/WWHQ9TJixuI/AAAAAAAASKE/ndaT8Dslq1Ivom24xHoYd9w_eQObvMQwwCHMYCw/I/thumbs.jpg)](http://www.yes24.com/24/Goods/41070512?Acode=101)


[(이전까지 예제파일 다운로드)](https://cdn.rawgit.com/richfaber/example/24790c46/angular2/beginingAngular/ng-welcome-msg-app-v5.1.zip)

# (BOOK) 5. 견고한 애플리케이션 만들기#1 - 서비스

## 서비스

서비스는 뷰와 상관없이 순수한 비즈니스 로직이나 값을 다루는 클래스 이다. 로깅기능 같은 유틸 성격의 라이브러리가 해당사항이 될 수 있다.

컴포넌트로 순수하게 뷰를 만들었다면, 뷰와 상관없는 로거 기능 같은걸 서비스로 만들어서 컴포넌트에 붙이면 된다.

앵귤러 1.x 버전에서 `factory, service` 메소드로 역할을 구분했다면, 앵귤러 2 버전부터는 이런 구분 없이 클래스를 만들고 데코레이터의 `providers` 속성으로 정의해서 쓰거나, `import` 해서 사용하면 된다.

단지 서비스 클래스에 `@Injectable` 데코레이터 명시를 권장하고 있다. 

팩토리와 서비스를 구분하는게 나는 좀 어려워 보인다. 어디까지 팩토리고 어디까지 서비스인가..

처음엔 용도를 재사용이 필요한 것인가, 아닌가로 구분을 했었는데(예를들어 디자인셀렉트박스 같은거는 무조건 재사용방식으로 독립적 구성이 무조건 필요, Rest 통신은 Promise or Defer 로 return해 버리면, 그럴 필요가 없음.) 

이것 또한 시원찮아서.. UI 관련 해서는 팩토리로 하고, 그 외에 화면과 관련없는 것은 서비스로 구성하는데, Constructor라는걸 따로 명시할 수 없어서, 주석으로만 달아야 되는... 이것또한 시원찮...

게다가 협업 하면 이 마져도 제대로 지켜지기가 어렵다. 어렵~

### 서비스의 생성과 사용

컴포넌트는 데코레이터가 필수지만, 서비스는 필수 데코레이터는 없고, `@Injectable` 데코레이터만 권장하고 있다. (꼭 붙여야지~)

우선 `ng` 명령어로 서비스를 하나 만들고..

```command
> ng generate service Calculator
installing service
  create src/app/calculator.service.spec.ts
  create src/app/calculator.service.ts
  WARNING Service is generated but not provided, it must be provided to be used
```

파일을 열어서 수정하자.

```typescript
//filename: [app/calculator.service.ts]
import { Injectable } from '@angular/core';

@Injectable()
export class CalculatorService {
  add(a, b) {
    return a + b;
  }

  sub(a, b) {
    return a - b;
  }

  mul(a, b) {
    return a * b;
  }

  div(a, b) {
    return a / b;
  }

}
```

그리고 이걸 컴포넌트 에서 사용해 보자. 컴포넌트도 `ng` 명령어로 만들고,

```command
> ng generate component CalculatorService
installing component
  create src/app/calculator-service/calculator-service.component.css
  create src/app/calculator-service/calculator-service.component.html
  create src/app/calculator-service/calculator-service.component.spec.ts
  create src/app/calculator-service/calculator-service.component.ts
  update src/app/app.module.ts
```

파일을 열어서 만들어 놓은 서비스를 주입(DI)해 보자.

```typescript
//filename: [app/calculator-service/calculator-service.component.ts]
import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-calculator-service',
  templateUrl: './calculator-service.component.html',
  styleUrls: ['./calculator-service.component.css']
})
export class CalculatorServiceComponent implements OnInit {
  private result: number;
  private anotherResult: number;
  private calculator: CalculatorService;

  constructor() {
    this.calculator = new CalculatorService();
  }

  add(a, b) {
    this.result = this.calculator.add(a, b);
  }

  addAnother(a, b) {
    this.anotherResult = this.calculator.add(a, b);
  }

  ngOnInit() {
  }

}
```

```html
<!-- filename: [app/app.component.html] -->
<h1>다국어 환영 인사 서비스</h1>
<app-welcome-msg></app-welcome-msg>
<app-lang-selector></app-lang-selector>
<hr />
<app-calculator-service></app-calculator-service>
```

이렇게 바꾸고 나면 화면에 출력 된다.

포인트는 `this.calculator.add` 라는 서비스 메소드를 사용해서, 화면과 상관없이 연산하는 부분은 서비스화 했다는 것이 포인트 이다. 만약 서비스를 사용하지 않았다면,

```typescript
  add(a, b) {
    this.result = a + b;
  }

  addAnother(a, b) {
    this.anotherResult = a + b;
  }
```

해야 하고, `a+b` 라는 것을 비즈니스로직 이라고 보고, 같은 일인데 고치려면 2개 고쳐야 하니깐 서비스로 빼는게 이득이다는 얘기이다.

이건 좀 연습이 필요한거 같다. 추상적으로 해야 하는 것들은 정답을 두기 어려운 데다가, 쪼개다 쪼개다 보면 가독성이 떨어지는 경향이 있다.

휴~

### 실습: 마우스 위치 로거

마우스 위치 로거를 위해서 새로운 프로젝트를 만들어 보자. 지금까지 쓰던 `ng-welcome-msg-app` 은 접어두고

```command
> ng new mouse-pos-logger --prefix mpl
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
Project 'mouse-pos-logger' successfully created.

> cd mouse-pos-logger
> ng serve
** NG Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200 **
Hash: cea2c6bd58151389cc58            gTime: 7154ms                         i chunk    {0} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 178 kB {4} [initial] [rendered]
chunk    {1} main.bundle.js, main.bundle.js.map (main) 5.28 kB {3} [initial] [rendered]
chunk    {2} styles.bundle.js, styles.bundle.js.map (styles) 10.5 kB {4} [initial] [rendered]
chunk    {3} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.19 MB [initial] [rendered]
chunk    {4} inline.bundle.js, inline.bundle.js.map (inline) 0 bytes [entry] [rendered]
webpack: Compiled successfully.
```

`--prefix` 옵션이 있는데, 새로운 프로젝트에 접두어를 지정하는 방식이다. 

```html
<!-- prefix가 없을 경우 index.html -->
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>NgWelcomeMsgApp</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>

<!-- prefix를 지정했을 경우 index.html -->
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MousePosLogger</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <mpl-root></mpl-root>
</body>
</html>
```

다 봤는데 그냥, `index.html`만 다르고, 이렇게 사용하는 이유는 외부 패키지로 사용할 때 쓴다고 한다.
뭐...ok

서비스 만들고.

```command
> ng g service my-special-logger
installing service
  create src/app/my-special-logger.service.spec.ts
  create src/app/my-special-logger.service.ts
  WARNING Service is generated but not provided, it must be provided to be used
```

이제 수정해보자.

```typescript
//filename: [app/my-special-logger.service.ts]

import { Injectable } from '@angular/core';

@Injectable()
export class MySpecialLoggerService {

  logLevel: LogLevel;
  logs: string[] = [];
  private readonly MAX_HISTORY_CNT: number = 100;
  private readonly TIME_FORMATTER: string = "YYYY-MM-DD HH:mm:ss.SSS";

  constructor(logLevel: LogLevel) {
    this.logLevel = logLevel;
  }

}
```

`logLevel` 변수와, 과거기록 보관용 `logs` 변수, 정해진 상수 `MAX_HISTORY_CNT, TIME_FORMATTER` 가 있다.

타입스크립트는 자바나 C#과 마찬가지로 접근제어자를 제공하고, public이 기본값이다. 그렇기 때문에 명시하지 않으면 자동 public 이다.

[[접근제어자 설명 링크]](http://88240.tistory.com/448)

다른 언어와 다르게 `readonly` 가 더 있는데, 변경금지다. 읽기 전용이다. `const` 로 선언되어 있겠지..

위에 서비스는 `LogLevel`을 못찾는게 정상인데 추가해 보자.

```command
> ng g enum log-level
installing enum
  create src/app/log-level.enum.ts
```

`ng-cli` 는 열거형 클래스를 만들어 주는 옵션도 이렇게 제공해 주고 있다. 해당 파일을 열고

```typescript
//filename : [app/log-level.enum.ts]
export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR
}
```

그리고 서비스에서 import

```typescript
//filename: [app/my-special-logger.service.ts]

import { Injectable } from '@angular/core';
import { LogLevel } from './log-level.enum';

@Injectable()
export class MySpecialLoggerService {

  logLevel: LogLevel;
  logs: string[] = [];
  private readonly MAX_HISTORY_CNT: number = 100;
  private readonly TIME_FORMATTER: string = "YYYY-MM-DD HH:mm:ss.SSS";

  constructor(logLevel: LogLevel) {
    this.logLevel = logLevel;
  }

}
```

따로 파일로 빼지 않고, 소스에 때려박아도 되지만, 열거형으로 해두면 관리가 좀 더 쉬우니깐?

(가끔 신규파일로 추가된 걸 인식하지 못하는거 같다. 이럴땐, `Ctrl+C` 로 `ng serve`를 취소했다가 다시 해보면 됨)

특정 시간포맷으로 출력하기 위해, 헬퍼용으로 `date-fns` 패키지를 설치하자.

```command
> npm install --save date-fns
mouse-pos-logger@0.0.0 /mouse-pos-logger
└── date-fns@1.28.5
```

이제 본격적으로 구현..

```typescript
//filename: [app/my-special-logger.service.ts]
import { Injectable } from '@angular/core';
import { LogLevel } from './log-level.enum';
import * as format from 'date-fns/format';

@Injectable()
export class MySpecialLoggerService {

  debug(msg: string) { this.log(LogLevel.DEBUG, msg); }
  info(msg: string) { this.log(LogLevel.INFO, msg); }
  warn(msg: string) { this.log(LogLevel.WARN, msg); }
  error(msg: string) { this.log(LogLevel.ERROR, msg); }

  logLevel: LogLevel;
  logs: string[] = [];
  private readonly MAX_HISTORY_CNT: number = 100;
  private readonly TIME_FORMATTER: string = "YYYY-MM-DD HH:mm:ss.SSS";

  constructor(logLevel: LogLevel) {
    this.logLevel = logLevel;
  }

  log(logLevel: LogLevel, msg: string) {
    const logMsg = this.getFormattedLogMsg(logLevel, msg);
    if (this.isProperLogLevel(logLevel)) {
      console.log(logMsg);
      this.keepLogHistory(logMsg);
    }
  }

  private keepLogHistory(log: string) {
    if (this.logs.length === this.MAX_HISTORY_CNT) {
      this.logs.shift();
    }

    this.logs.push(log);
  }

  private getFormattedLogMsg(logLevel: LogLevel, msg: string) {
    const curTimestamp = format(new Date(), this.TIME_FORMATTER);
    return `[${LogLevel[logLevel]}] ${curTimestamp} - ${msg}`;
  }

  private isProperLogLevel(logLevel: LogLevel):boolean {
    if( this.logLevel === LogLevel.DEBUG) return true;
    return logLevel >= this.logLevel;
  }

}

//filename: [app/app.component.ts]
import { Component } from '@angular/core';
import { MySpecialLoggerService } from './my-special-logger.service';
import { LogLevel } from './log-level.enum';

@Component({
  selector: 'mpl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mpl works!';
  logger: MySpecialLoggerService;

  constructor() {
    this.logger = new MySpecialLoggerService(LogLevel.INFO);
    this.testLoggerLevel();
  }

  testLoggerLevel() {

    console.log("=================Default(Info) Log Level ================");
    this.logger.debug("test logging... in debug");
    this.logger.info("test logging... in info");
    this.logger.warn("test logging... in warn");
    this.logger.error("test logging... in error");

    this.logger.logLevel = LogLevel.DEBUG;
    console.log("=================Debug Log Level ================");
    this.logger.debug("test logging... in debug");
    this.logger.info("test logging... in info");
    this.logger.warn("test logging... in warn");
    this.logger.error("test logging... in error");

    this.logger.logLevel = LogLevel.WARN;
    console.log("=================WARN Log Level ================");
    this.logger.debug("test logging... in debug");
    this.logger.info("test logging... in info");
    this.logger.warn("test logging... in warn");
    this.logger.error("test logging... in error");

    this.logger.logLevel = LogLevel.ERROR;
    console.log("=================Error Log Level ================");
    this.logger.debug("test logging... in debug");
    this.logger.info("test logging... in info");
    this.logger.warn("test logging... in warn");
    this.logger.error("test logging... in error");


  }
}
```

여기서 열거형에 대해서 알아볼 필요가 있는데,(잘 모르겠는데..?) 

열거형의 배경은 배열의 index를 사용하거나, 특정한 순번을 지정할 필요가 생겨서 탄생했다고 한다.
그래서, import 되어 있는 LogLevel 을 콘솔에 출력하면

```console
Object {
	0: "DEBUG", 
	1: "INFO", 
	2: "WARN", 
	3: "ERROR", 
	DEBUG: 0, 
	INFO: 1, 
	WARN: 2, 
	ERROR: 3
}
```

이렇게 생겼다. `LogLevel.DEBUG` 의 값은 `0` 이고, `LogLevel[0]` 의 값은 `DEBUG` 이다. 

이렇게 열거형으로 숫자를 사용해야 할 필요성이 있을 때 사용한다고 하고,

```typescript
  private isProperLogLevel(logLevel: LogLevel):boolean {
    if( this.logLevel === LogLevel.DEBUG) return true;
    return logLevel >= this.logLevel;
  }
```

여기에 return 하는 boolean 값이 숫자비교를 할 수 있게 된다. 
그래서, 어떤 `LogLevel` 인자를 준다는 것은 숫자를 준다는 것이 되고, `this.logLevel` 값보다 인자가 크면 `true`가 되고, console.log가 찍히게 되는 원리 이다.

여기에 마우스 위치를 로깅하는 기능을 추가해 보자.

컴포넌트를 새로 만들고

```command
> ng g component mouse-track-zone
installing component
  create src/app/mouse-track-zone/mouse-track-zone.component.css
  create src/app/mouse-track-zone/mouse-track-zone.component.html
  create src/app/mouse-track-zone/mouse-track-zone.component.spec.ts
  create src/app/mouse-track-zone/mouse-track-zone.component.ts
  update src/app/app.module.ts
``` 

느닷없이 `app.mobule.ts` 에 컴포넌트가 차곡차곡 `declarations` 되고 있다는 것을 확인하고 넘어가자.

html,css,ts 파일을 수정하자

```html
<!-- filename: [app/mouse-track-zone/mouse-track-zone.component.html] -->
<div class="track-zone" (click)="captureMousepos($event)"></div>
```

```css
/* filename: [app/mouse-track-zone/mouse-track-zone.component.css */
.track-zone {
	width: 200px;
	height: 200px;
	vertical-align: top;
	background-color: lightblue;
	border: 1px solid grey;
	display: inline-block;
	cursor: pointer;
}
```

```typescript
/* filename: [app/mouse-track-zone/mouse-track-zone.component.ts */
import { Component, OnInit } from '@angular/core';
import { MySpecialLoggerService } from '../my-special-logger.service';
import { LogLevel } from '../log-level.enum';

@Component({
  selector: 'mpl-mouse-track-zone',
  templateUrl: './mouse-track-zone.component.html',
  styleUrls: ['./mouse-track-zone.component.css']
})
export class MouseTrackZoneComponent implements OnInit {

  logLevel: LogLevel = LogLevel.INFO;
  logger: MySpecialLoggerService;

  constructor() {
    this.logger = new MySpecialLoggerService(this.logLevel);
  }

  captureMousePos($event: MouseEvent) {
    this.logger.debug('click event occured');
    const pos = [$event.clientX, $event.clientY];
    this.logger.info(`x:${pos[0]} y:${pos[1]}`);
  }

  ngOnInit() {
  }

}
```

마지막으로 app.component.html 에 만든 컴포넌트를 추가하자.

```html
<!-- filename: [app/app.component.html] -->
<h1>{{title}}</h1>
<mpl-mouse-track-zone></mpl-mouse-track-zone>
```

표시된 박스에 클릭을 할 때마다 마우스의 위치를 console에 출력하는 코드가 완성되었다.

이 코드를 한번 더 리팩토링 할 수 있다.

`mouse-track-zone.component.ts` 에서 로그 서비스를 사용하기 위해서, `MySpecialLoggerService`를 `new` 연산자로 객체생성 하고 있는데, 마우스 추적이 아니라, 다른 컴포넌트를 생성할 때마다 객체생성을 해야만 한다. 
그렇게 해도 되지만, 같은 코드가 중복 된다는 것은, 고칠 필요가 있을 때, 다 열고 다 고쳐야 하는 단점이 있기 때문에, 불편하다.

`@input` 데코레이터를 사용하게 동일한 코드로 사용 할 수 있다.

현재 `mouse-track-zone.component` 은 `app.component` 안에 포함 되고 있다는 사실을 기억하자. 
즉 `app.component` 는 `mouse-track-zone.component`의 부모 컴포넌트 이다.

이제 부모가 가지고 있는 `MySpecialLoggerService`를 사용할 것이다.

```typescript
/* filename: [app/mouse-track-zone/mouse-track-zone.component.ts */
import { Component, OnInit, Input } from '@angular/core';
import { LogLevel } from '../log-level.enum';

@Component({
  selector: 'mpl-mouse-track-zone',
  templateUrl: './mouse-track-zone.component.html',
  styleUrls: ['./mouse-track-zone.component.css']
})
export class MouseTrackZoneComponent implements OnInit {
  @Input() private logger;
  logLevel: LogLevel = LogLevel.INFO;

  constructor() {
  }

  captureMousePos($event: MouseEvent) {
    this.logger.debug('click event occured');
    const pos = [$event.clientX, $event.clientY];
    this.logger.info(`x:${pos[0]} y:${pos[1]}`);
  }

  ngOnInit() {
  }

}
```

`@angular/core` 에서 `Input` 데코레이터를 import 하고, 클래스 안에서 변수 선언할 때 `@Input()` 을 사용해서, 부모의 어떠한 것을 대입한다. 이렇게 하면 `MySpecialLoggerService` 를 마우스기록 컴포넌트가 import 할 필요도 없다. 

그리고 html을 열어서 값을 전달하자.

```html
<!-- filename: [app/app.component.html] -->
<h1>{{title}}</h1>
<mpl-mouse-track-zone [logger]="logger"></mpl-mouse-track-zone>
```

이렇게 해도 화면은 나오지 않는다. 
왜냐하면 `app.component.ts` 에서 테스트로 `logLevel` 값을 조정했기 때문이다. 해당 코드를 삭제하자.

```typescript
/* filename: [app/app.component.ts] */
import { Component } from '@angular/core';
import { MySpecialLoggerService } from './my-special-logger.service';
import { LogLevel } from './log-level.enum';

@Component({
  selector: 'mpl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mpl works!';
  logger: MySpecialLoggerService;

  constructor() {
    this.logger = new MySpecialLoggerService(LogLevel.INFO);
  }

}
```

자.. 이제 됨!



