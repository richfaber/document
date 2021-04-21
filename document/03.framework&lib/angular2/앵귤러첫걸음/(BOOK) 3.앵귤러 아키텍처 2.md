[![thumbs](https://lh3.googleusercontent.com/-DP_1WlcsJxw/WWHQ9TJixuI/AAAAAAAASKE/ndaT8Dslq1Ivom24xHoYd9w_eQObvMQwwCHMYCw/I/thumbs.jpg)](http://www.yes24.com/24/Goods/41070512?Acode=101)

# (BOOK) 3.앵귤러 아키텍처#2 - 애플리케이션을 완벽하게 만드는 요소

**이번 과정에 필요한 이전 소스**

```typescript
//filename: [src/app/app.module.ts]

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WelcomeMsgComponent } from './welcome-msg/welcome-msg.component';
import { LangSelectorComponent } from './lang-selector/lang-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeMsgComponent,
    LangSelectorComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


//filename: [src/app/app.component.ts]

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}


//filename: [src/app/app.component.html]

<h1>다국어 환영 인사 서비스</h1>
<app-welcome-msg></app-welcome-msg>
<app-lang-selector></app-lang-selector>


//filename: [src/app/lang-selector/lang-selector.component.ts]

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.css']
})
export class LangSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


//filename: [src/app/lang-selector/lang-selector.component.html]

<p>
  lang-selector works!
</p>


//filename: [src/app/welcome-msg/welcome-msg.component.ts]

import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-msg',
  templateUrl: './welcome-msg.component.html',
  styleUrls: ['./welcome-msg.component.css']
})
export class WelcomeMsgComponent {

  userName = "";
  private valid = false;

  constructor() { }

  onChange() {
    this.valid = this.userName.length > 0;
  }

}


//filename: [src/app/welcome-msg/welcome-msg.component.html]

<h4>
  <span>{{ userName }}</span>님 환영합니다.
</h4>
<div class="contents">
  <label for="user-name">사용자 이름:</label>
  <input type="text" name="user-name" id="user-name" [(ngModel)]="userName" (ngModelChange)="onChange()" />
</div>


```

## 서비스와 의존성 주입

서비스는 애플리케이션의 비즈니스 로직을 담는 클래스 이다. 
서비스를 사용하는 이유는 컴포넌트에서 비즈니스 로직을 따로 사용하기 위해서다.

컴포넌트는 뷰를 그리는 템플릿과 주 기능을 이루는 서비스를 조합하는 컨트롤 타워 라고 생각하면 될 거 같다.

### 다국어 지원 서비스 만들기

선택한 언어에 따라 해당 언어의 환영 인사를 출력하는 예제를 해보자.

`ng g` 명령어를 통해서 서비스를 하나 만들자.

```command
installing service
  create src/app/i18n-support.service.spec.ts
  create src/app/i18n-support.service.ts
  WARNING Service is generated but not provided, it must be provided to be used
```

`ng g service` 로 만들어진 서비스와 `ng g component` 로 만들어진것에 차이점은 `app.module.ts` 파일에 등록되는가와 개별 폴더를 만들어서 집어 넣는가의 차이인데, 서비스는 컴포넌트에서 사용하기 때문에 `app.module.ts`에 등록할 필요가 없는 걸로 이해했다.

차라리 service 폴더 만들고 넣어줬음 좋겠는데, 그냥 생성하는게 서운했다.

이제 생성된 `i18n-support-service.ts` 파일을 수정하자.

생성된 파일의 기본을 보니, 

```typescript
//filename : [i18n-support.service.ts]

import { Injectable } from '@angular/core';

@Injectable()
export class I18nSupportService {

  constructor() { }

}
```

`@angular/core`에서 `export` 하고 있는 메소드 들 중에, `Injectable`을 얹혀 왔고, 클래스 위에 데코레이터 처럼 사용하고 있다.

정확히는 모르겠지만, 어디에 주입하는 용도로 사용하겠다는 것 같다.
(어디에? 컴포넌트겠지 푸헹)

진짜 수정하자.

```typescript
//filename : [i18n-support.service.ts]

import { Injectable } from '@angular/core';

@Injectable()
export class I18nSupportService {
  private welcomeMsg;

  constructor() {

    this.welcomeMsg = {
      'ko': '안녕하세요',
      'en': 'Hello',
      'jp': 'こんにちは',
      'fr': 'Bonjour'
    };

  }

  getWelcomeMsgByCode(userName: string, code: string) 	{
    const helloMsg = this.welcomeMsg[code];
    return `${helloMsg}, ${userName}!`;
  }

}
```

`constructor` 에 welcomeMsg 라는 변수를 초기화를 하고 있다.

`getWelcomeMsgByCode` 함수로 welcomeMsg 의 해당하는 언어를 불러올 수 있다.
([역슬래쉬로 변수를 출력 하는 부분 주의 - \`${}\`](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-template-strings-2/))

이 코드를 es5로 바꾸면 아래의 코드와 같다.

```javascript
function I18nSupportService() {
    this.welcomeMsg = {
      'ko': '안녕하세요',
      'en': 'Hello',
      'jp': 'こんにちは',
      'fr': 'Bonjour'
    };
}

I18nSupportService.prototype.getWelcomeMsgByCode = function(username, code) {
    var helloMsg = this.welcomeMsg[code];
    return helloMsg + ',' + userName + '!';
}
```

이렇게 만들어 둔 서비스를 이제 컴포넌트 에서 사용해 보자.

```typescript
//filename : [welcome-msg/welcome-msg.component.ts]

import { Component } from '@angular/core';
import { I18nSupportService } from '../i18n-support.service';

@Component({
  selector: 'app-welcome-msg',
  templateUrl: './welcome-msg.component.html',
  styleUrls: ['./welcome-msg.component.css'],
  providers: [I18nSupportService]
})
export class WelcomeMsgComponent {

  userName = "";
  private valid = false;
  welcomeMsg:string = "";

  constructor(public i18nSupporter: I18nSupportService) { }

  showWelcomeMsg() {
    this.welcomeMsg = this.i18nSupporter.getWelcomeMsgByCode(this.userName, 'ko');
  }

  onChange() {
    this.valid = this.userName.length > 0;
  }

}

//filename : [welcome-msg/welcome-msg.component.html]
<h4>
  <span>{{ welcomeMsg }}</span>님 환영합니다.
</h4>
<div class="contents">
  <label for="user-name">사용자 이름:</label>
  <input type="text" name="user-name" id="user-name" [(ngModel)]="userName" (ngModelChange)="onChange()" />
  <button type="button" (click)="showWelcomeMsg()">입력</button>
</div>
```

제일 위에 `import` 로 모듈을 가져왔고, `@Component` 데코레이터의 providers 속성에 집어 넣고, `constructor` 에 매개변수로 가지고 왔고, `showWelcomeMsg` 에서 사용하고 있다.

컴포넌트 데코레이터에서 providers 넣어주지 않으면 에러가 난다. 또는 `app.module.ts` 의 `@NgModule` 데코레이터의 providers에 넣으면, 모든 하위 컴포넌트, 서비스 에서 사용할 수 있다.

 constructor의 매개변수로 들어간 부분이 특이한데, `this.i18nSupporter.prototype += new I18nSupportService()` 이라고 생각하면 된다. 상속 과정을 자동으로 해준달까..
 (깊게 들어가면 머리 아픔, 머리 아프면 안됨) 

이건 타입스크립트가 아닌 앵귤러가 해주는데, 의존성주입(DI)이라고 한다. `WelcomeMsgComponent` 의 prototype에 `I18nSupportService을 prototype`으로 연결해 줌으로써, `I18nSupportService이 가지고 있는 변수, 메소드` 들을 사용할 수 있게 된다. 

이게 es6도 아니고, 타입스크립트도 아니고, 앵귤러가 해주는 거이고, 앵귤러도 의존성 주입 대상이 되는 클래스가 뭔지 알아야 해준다.(앵귤러 미워, Injectable() 해줬으면 자동으로 해쥬라규~~)

그게 데코레이터에 집어넣는 providers 이다. 안넣으면 안해쥼~

그리고 템플릿에서 `{{ userName }}` 대신 welcomeMsg를 사용했고, 버튼을 누르면 welcomeMsg가 변경 되도록 showWelcomeMsg 함수를 실행 하도록 하였다.

여기서 'jp' 값을 출력하려면, 

```typescript
  showWelcomeMsg() {
    this.welcomeMsg = this.i18nSupporter.getWelcomeMsgByCode(this.userName, 'jp');
  }
```

맨끝에 ko를 jp 로 바꾸고 테스트 해보자.

이 시점에서 갑자기 이 책의 저자인 조우진님 에게 감사의 마음을 표현.. 정말 나랑 잘맞아..

Selectbox에다가 국가를 지정하게 한번 바꿔봤다.

```typescript
//filename : [welcome-msg/welcome-msg.component.html]

<h4>
  <span>{{ welcomeMsg }}</span>님 환영합니다.
</h4>
<div class="contents">
  <select [(ngModel)]="countryFlag">
    <option value="ko">한국</option>
    <option value="en">English</option>
    <option value="jp">日本の</option>
    <option value="fr">France</option>
  </select>

  <label for="user-name">사용자 이름:</label>

  <input type="text" name="user-name" id="user-name" [(ngModel)]="userName" (ngModelChange)="onChange()" />
  <button type="button" (click)="showWelcomeMsg()">입력</button>
</div>

//filename : [welcome-msg/welcome-msg.component.ts]
import { Component } from '@angular/core';
import { I18nSupportService } from '../i18n-support.service';

@Component({
  selector: 'app-welcome-msg',
  templateUrl: './welcome-msg.component.html',
  styleUrls: ['./welcome-msg.component.css'],
  providers: [I18nSupportService]
})
export class WelcomeMsgComponent {

  userName = "";
  private valid = false;
  welcomeMsg:string = "";
  countryFlag:string = 'ko'

  constructor(public i18nSupporter: I18nSupportService) { }

  showWelcomeMsg() {
    this.welcomeMsg = this.i18nSupporter.getWelcomeMsgByCode(this.userName, this.countryFlag);
  }

  onChange() {
    this.valid = this.userName.length > 0;
  }

}

```

### 상태 관리 및 공유

컴포넌트를 쪼개다 보면, 서로 통신 하게 하고 싶은 욕구가 엄청나게 생긴다. 

자동차의 타이어컴포넌트, 핸들컴포넌트 있으면, 핸들 꺽으면 타이어 45도 옆으로 움직여..하고싶다.... 부르르르 

컴포넌트간 변수 공유에 대해서 알아보자.

위에 `countryFlag` 변수를 컴포넌트가 아닌 서비스의 변수 에서 공유되고 있다면, 그 서비스를 사용하는 모든 컴포넌트에게 공유변수 역할을 할 수 있을거 같다. 이런 공유가 중요한 것은 한 페이지에 컴포넌트가 조각나서 들어가기 때문이다.

컴포넌트 2개가 같은 변수를 공유하는지 알기 위해 2개의 컴포넌트를 사용해 보자.

위에 `WelcomeMsgComponent`의 변수로 들어간 `countryFlag` 를 서비스로 옮기고, `langSelectorComponent` 에서 해당값을 변경해 보자.

첫번째로 해야 할 일은 컴포넌트의 providers로 지정된 것을 `app.module.ts`의 providers로 옮기는 일이다. 그래야만 자식 컴포넌트 들이 하나의 서비스를 바라볼 수 있다. 

```typescript
//filename : [app.module.ts]

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WelcomeMsgComponent } from './welcome-msg/welcome-msg.component';
import { LangSelectorComponent } from './lang-selector/lang-selector.component';

import { I18nSupportService } from './i18n-support.service';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeMsgComponent,
    LangSelectorComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [I18nSupportService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

그 다음 컴포넌트의 providers를 지우고, `countryFlag`가 서비스를 바라보게 하자.

```typescript
//filename : [welcome-msg/welcome-msg.component.ts]

import { Component } from '@angular/core';
import { I18nSupportService } from '../i18n-support.service';

@Component({
  selector: 'app-welcome-msg',
  templateUrl: './welcome-msg.component.html',
  styleUrls: ['./welcome-msg.component.css'],
  providers: []
})
export class WelcomeMsgComponent {

  userName = "";
  private valid = false;
  welcomeMsg:string = "";

  constructor(public i18nSupporter: I18nSupportService) {
  }

  showWelcomeMsg() {
    this.welcomeMsg = this.i18nSupporter.getWelcomeMsgByCode(this.userName);
  }

  onChange() {
    this.valid = this.userName.length > 0;
  }

}

//filename : [lang-selector/lang-selector.component.ts]

import { Component, OnInit } from '@angular/core';
import { I18nSupportService } from '../i18n-support.service';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.css'],
  providers: []
})
export class LangSelectorComponent implements OnInit {
  countryFlag:string = "";

  constructor(public i18nSupporter: I18nSupportService) {
    this.countryFlag = i18nSupporter.countryFlag;
  }

  changeCountry() {

    this.i18nSupporter.countryFlag = this.countryFlag;

  }

  ngOnInit() {
  }

}
```

이제 `countryFlag` 는 `I18nSupportService`에 귀속되어, 컴포넌트 들이 해당값을 공유할 수 있게 되었다.

### 모듈

앵귤러에서 모듈이란 관련된 요소를 하나로 묶어 애플리케이션을 구성하는 하나의 단위 이다.
모든 앵귤러 어플리케이션은 반드시 하나의 모듈이 있다.

이것을 루트 모듈이라 하고, 관례상 AppModule 이라 한다.
(앵귤러 CLI이 프로젝트를 생성하면 기본으로 `src/app/app.module.ts` 이 만들어 진다.)

하나의 모듈을 생성하기 위해서는 위해서는 `@NgModule 데코레이터` 를 사용한다.

하나의 모듈은 다른 모듈과 각종 정보를 공유하는 것도 가능하다.

책에 맛배기로 `디렉티브`, `파이프` 가 있는데, 맛보나 진지하게 하나, 어차피 심화해야 할 단원이라 가볍게 읽고 넘어가 버렸다.

아주 간략하게 이런 구조라는 것을 맛배기 했다는 것으로 만족할까 한다.




