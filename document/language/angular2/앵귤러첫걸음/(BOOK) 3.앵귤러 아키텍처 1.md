[![thumbs](https://lh3.googleusercontent.com/-DP_1WlcsJxw/WWHQ9TJixuI/AAAAAAAASKE/ndaT8Dslq1Ivom24xHoYd9w_eQObvMQwwCHMYCw/I/thumbs.jpg)](http://www.yes24.com/24/Goods/41070512?Acode=101)

# (BOOK) 3.앵귤러 아키텍처#1 - 뷰를 구성하는 요소

아키텍처 챕터 이지만, 이번 챕터 까지도 맛보기에 해당하는 것 같다. 

프레임워크를 사용하는 이유는, 애플리케이션 에서 왠만한건 프레임워크에 의존하고, 나머지 비즈니스 로직만 코딩할 목적이 있다.

앵귤러는 사용자와 접촉하게 될 애플리케이션의 뷰와 핵심 비즈니스 로직 작성 외에 왠만한 것들은 관리해 준다고 할 수 있다.

앵귤러로 개발 한다는 것은

- 사용자와 상호작용할 뷰를 구성
- 뷰와 연결된 일련의 로직을 개발

하지만 프레임워크에 문제는 자유도에 있다. 프레임워크를 사용한다는 것은 그 프레임워크가 어떻게 돌아가고 있다는 개념적 이해를 필요로 한다. 또 그 프레임워크가 지정해 둔 여러가지 규칙들을 숙지 해야만 한다.
(리액트는 뷰 라이브러리로, 꽤나 자유도가 있기 때문에 개발자들이 쉽다고 느끼는지도 모르겠다.)

프레임워크를 기반으로 코딩하는 것이 눈으로 보고, 금방 따라할 수 있는 정도라면, 프레임워크로 만들 필요도 없을 것이다.

개발함에 각종 경우의 수와, 작동해야하는 기본적인 것들이 광범위하기 때문에, 프레임워크 라는 얘기를 들으려면, 이 기본적으로 필요한 기능들을 지원해야 하고, 이는 메뉴얼이 두꺼워 진다는 의미 이기도 하다.

이 책은 앵귤러 아키텍처를 설명하기 위해 다국어 환영 인사 기능을 할 수 있는 예제를 소개하고 있다.

## 뷰를 구성하는 요소

예제를 실행하기 위해서 `ng new` 명령어로 프로젝트를 하나 만들자

```command
c:> ng new ng-welcome-msg-app
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
Project 'ng-welcome-msg-app' successfully created.

c:> cd ng-welcome-msg-app
c:/ng-welcome-msg-app> _
```

`src/app/app.component.html` 파일을 열고 다음의 코드를 작성하자

```html
<h4>
  <span id="display-name"></span>님 환영합니다.
</h4>
<div class="contents">
  <label for="user-name">사용자 이름: </label>
  <input type="text" name="user-name" id="user-name" />
  <button type="button">입력</button>
</div>
```

작성 후에 `ng serve` 명령어를 통해서 웹서버를 구동하자.

```command
c:/ng-welcome-msg-app> ng serve
** NG Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200 **
Hash: 0bfed0a19bd6a93c30d1                                                    - Time: 6772ms
chunk    {0} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 171 kB {4} [initial] [rendered]
chunk    {1} main.bundle.js, main.bundle.js.map (main) 3.7 kB {3} [initial] [rendered]
chunk    {2} styles.bundle.js, styles.bundle.js.map (styles) 10.5 kB {4} [initial] [rendered]
chunk    {3} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.18 MB [initial] [rendered]
chunk    {4} inline.bundle.js, inline.bundle.js.map (inline) 0 bytes [entry] [rendered]
webpack: Compiled successfully.
```

`http://localhost:4200/` 에서 마크업이 적용된 화면을 볼 수 있다.

이제 앵귤러 템플릿 문법을 조금 사용해서 html 마크업을 변경해 보자.

```html
<h4>
  <span>{{ userName }}</span>님 환영합니다.
</h4>
<div class="contents">
  <label for="user-name">사용자 이름: </label>
  <input type="text" name="user-name" #nameInput />
  <button type="button" (click)="setName(nameInput.value)">입력</button>
</div>
```

환영합니다 옆에 span의 id를 지우고 `{{ userName }}` 이라고 넣었다. 한국말로 보간법이라고 번역되는데... 보간법?? 여하튼 보간법 안에 변수명을 넣으면 userName 변수와 매칭되서 값이 출력된다.

input에 `#nameInput` 이라고 했는데, 앵귤러 템플릿 문법으로 내부 변수에 요소를 할당 한다는 정도로 이해하자.
(아래의 절차를 템플릿 문법으로 축약 했다고 보면 편할거 같음.)

```javascript
[html]
<input type="text" name="user-name" id="nameInput" />

[js]
let nameInput = document.querySelector('#nameIpunt');
```

(click)은 클릭 시 동작할 명령코드를 의미한다.
(angularjs1의 ng-click과 동일한 기능)

딱보면 `input`에 이름 넣고 버튼 누르면 사용자 이름이 나올것으로 기대할 수 있는데, setName 함수를 아직 작성하지 않았기 때문에, 작성해 보자.

`src/app/app.component.ts` 파일을 열고

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userName = "";

  setName(name) {
    this.userName = name;
  }
}
```
  
이렇게 수정한 후 브라우저에서 결과를 확인하자.

(참고로 `ng-serve` 로 인해 백그라운드로 동작하고 있는 서버에서 `webpack` 이 변경된 파일을 감지하여 지속적 으로 컴파일을 하고 있다는 것을 알아두자.)

input 박스에 이름을 넣고 버튼을 누르니까 화면이 변경 된다.(신기방기)

### 컴포넌트와 템플릿

`app.component.ts` 파일을 살펴볼 필요가 있는데, 다른건 뭐 그렇다치고, `@Component` 라는 부분이 눈에 띈다.

앵귤러의 핵심개념중에 컴포넌트를 정의할 때, 이것을 사용한다.

컴포넌트는 통상 한 페이지의 모든것을 관할하지 않고, 각 요소별로 쪼개진다.

게시판의 검색부분, 목록부분, 상단메뉴 부분등.. 단위별로 나누어 구성하는 것이 일반적 이다. 

속성으로 `selector, templateUrl, styleUrls` 를 사용했는데, 이보다 더 많은 옵션들이 존재한다.

#### 컴포넌트와 템플릿의 관계

기존의 코딩 방식과 크게 다른점이 html 마크업에 기능이 혼재할 수 있다는 점이다.
이전에는 javascript로만 기능을 작성할 수 있었다면, 앵귤러는 템플릿에 기능을 넣음으로써, javascript의 코드를 줄이는 효과가 있다.

기계적으로 보자면, 앵귤러가 html 따로, js 따로 해석하지 않고, html+js 로 해석 후 화면을 다시 그린다고 생각하면 편하다.

##### @Component 데코레이터

클래스 함수명 위에 클래스에 대한 설정정보를 넣을 때, `데코레이터`를 사용한다. 몇가지 데코레이터가 있고, `@` 붙이고 뒤에 지정어를 쓰면 된다.

데코레이터를 통해서 클래스를 구성하는 정보를 명시해야 하는데, 이 데이터를 `메타데이터` 라고 한다.

> AppComponent 컴포넌트 메타데이터 어떻게되?
> 응 { selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css'] } 이거얌~

(저런 얘기는 귀엽게 얘기하는게 중요하다.)

메타데이터의 지정어는 꽤나 있고, 슬슬 알아가면 되는거 라고 생각해서, 자세 하게는 안봤다.

selector를 흔히 사용(?) 하는 셀렉터다. css에는 `app-root { }` 로 사용하고, jquery 에서는 `$("app-root")` 라고 사용하는 아주 흔한 셀렉터..

위에 셀렉터는 `<app-root>` 태그 자체를 가리킨다고 볼 수 있다. 즉 템플릿에 `<app-root>` 태그가 있으면, 이 클래스가 기능과 동작을 하게 된다.

그럼.. 느닷없이 나온 이 `app-root` 태그는 어디에 있지? 란 생각이 들기 때문에, `src/index.html` 를 열어보자

```html
<body>
  <app-root></app-root>
</body>
```

이렇게 `index.html`에 이쁘게 들어가 있고, 각종 설정에 의해서, `app-root` 태그에 해당하는 컴포넌트가 그려졌다.

### 컴포넌트 생명주기

앵귤러는 주기적으로 일정한 타이밍(생명주기 : life cycle)에 특정한 기능을 간섭하는데, 해당 타이밍에 대한 인터페이스를 제공하고 있다.

예를 들어서 컴포넌트가 그려 지고 난후, 최초 1회만 실행하는 ngAfterViewInit 메소드를 통해서 알아 보자.

```typescript
[app.	component.html]
<h4>
  <span>{{ userName }}</span>님 환영합니다.
</h4>
<div class="contents">
  <label for="user-name">사용자 이름: </label>
  <input type="text" name="user-name" id="user-name" #nameInput (keyup)="onKeyUp(nameInput.value)" />
  <button type="button" (click)="setName(nameInput.value)">입력</button>
</div>

[app.component.ts]
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  userName = "";
  private valid = false;
  private static CHK_KEYUP_WAIT_SEC = 5000;

  ngAfterViewInit() {
    const checkTouchedFn = () => {
      if(this.valid) return;
      alert('이름을 입력해 주세요.');
    };

    setTimeout(checkTouchedFn, AppComponent.CHK_KEYUP_WAIT_SEC);
  }

  onKeyUp(name) {
    this.valid = name.length > 0;
  }

  setName(name) {
    this.userName = name;
  }
}
```

템플릿(app.component.html)과 컴포넌트(app.component.ts)를 수정했다. 

5초가 지나도 이름 입력이 없으면 입력 하라는 메세지가 출력된다. 

### 컴포넌트 트리

사용자에게 제공되는 화면은 이와 같이 컴포넌트의 조합으로 이루어 진다. 
컴포넌트 또한 다른 컴포넌트의 집합체가 되기도 한다.

예를들어 A 컴포넌트는 `my-foo` 컴포넌트와 `my-bar` 컴포넌트를 사용한다고 보자.

이럴 경우 A 컴포넌트는 `my-foo` 컴포넌트와 `my-bar`의 부모 컴포넌트라고 볼 수 있고, 관계가 형성된다.
이를 확인하기 위해 추가 컴포넌트를 생성해 보자.
(2개의 컴포넌트를 추가할 것이다.)

```command
c:/ng-welcome-msg-app> ng g component welcome-msg
installing component
  create src/app/welcome-msg/welcome-msg.component.css
  create src/app/welcome-msg/welcome-msg.component.html
  create src/app/welcome-msg/welcome-msg.component.spec.ts
  create src/app/welcome-msg/welcome-msg.component.ts
  update src/app/app.module.ts
```

`ng g` 를 통해서 컴포넌트를 일일이 만들지 않고 만들어 낼 수 있다.
(`app.module.ts` 파일이 갱신 되었는데, 일단 skip~~)

`/app/app.component.html` 파일을 수정하자. 싹 지우고.

```html
<h1>다국어 환영 인사 서비스</h1>
<app-welcome-msg></app-selcome-msg>
```

그리고 `/app/app.component.ts` 파일에 내용도 기본적인 거만 두고 싹 지운다.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
```

또 다른 컴포넌트를 생성하자

```command
c:/ng-welcome-msg-app> ng g component lang-selector
installing component
  create src/app/lang-selector/lang-selector.component.css
  create src/app/lang-selector/lang-selector.component.html
  create src/app/lang-selector/lang-selector.component.spec.ts
  create src/app/lang-selector/lang-selector.component.ts
  update src/app/app.module.ts
```

또 `app.module.ts` 가 갱신되었지만, 하하.. skip

추가된 컴포넌트를 사용하기 위해 `/app/app.component.html`를 수정하자

```html
<h1>다국어 환영 인사 서비스</h1>
<app-welcome-msg></app-welcome-msg>
<app-lang-selector></app-lang-selector>
```

그리고 브라우저를 확인하면, 2개의 추가된 컴포넌트가 화면에 출력되면 잘 된 것이다.

`/app/app.component.html` 템플릿에 태그를 추가한 것 만으로 어떻게 다른 컴포넌트가 동작하는지에 대한 비밀은 `app.module.ts`에 ngModule 데코레이터에 있지만, 앞으로도 주구장창 나온다.

이렇게 해서, AppComponent는 WebcomeMsgComponent와 LangSelectorComponent에 부모가 되었다.
(많은 의문들이 생기는데, 머리 아퍼서 생각을 그만둠)

### 데이터 바인딩

앵귤러는 뷰와 컴포넌트에서 서로 뭐라도 바뀌면 동기화 해주는 데이터 바인딩을 지원 한다.

템플릿에 input값이 바뀌면 컴포넌트 내부의 할당된 변수의 값도 바뀐달까.. 컴포넌트 변수가 바뀌면 템플릿에 input 값도 바뀐달까..
(Angularjs1 에서는 `양방향 데이터 바인딩` 을 크게 강조했는데, 편하긴 한데 그닥... 없어도 크게 안불편..특성일뿐)

`양방향 데이터 바인딩`과 `단방향 데이터 바인딩`이 있는데, 양방향은 서로의 상태정보를 일치시켜 주는 것이고, 단방향은 `컴포넌트 -> 뷰` 또는 `뷰 -> 컴포넌트` 등의 한쪽 으로만 데이터가 흐르는 걸 의미한다.

단방향에는 `삽입식, 프로퍼티 바인딩, 이벤트 바인딩` 이 있는데, 보간법 `{{ userName }}` 또는 `(click), [disabled]` 등이 대표적인 단방향식 이라고 본다.

코딩 하는데, 두가지를 엄격히 구별할 필요는 없지만, 양방향으로 동작하는 부분은 인지하는 것이 좋다.

#### 양방향 데이터 바인딩 맛보기

`[(ngModel)]`을 사용해서 양방향 데이터 바인딩을 맛보자

```html
[/app/welcome-msg/welcome-msg.component.html]

<h4>
  <span>{{ userName }}</span>님 환영합니다.
</h4>
<div class="contents">
  <label for="user-name">사용자 이름:</label>
  <input type="text" name="user-name" id="user-name" [(ngModel)]="userName" (ngModelChange)="onChange()" />
</div>
```

```typescript
[/app/welcome-msg/welcome-msg.component.ts]

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
```

이렇게 수정 후 브라우저를 열고, 에러가 나면서 화면이 아무것도 나오지 않고, `ngModel` 없다고 불평하면, 지금껏 열어보지도 않았던, `app.module.ts` 파일을 열어봐야 한다.

`[(ngModel)]` 을 사용하기 위해서는 `FormsModule` 을 `import` 하고, `@NgModule`에 `imports` 해야 한다. 혹시 없다면 추가하자.

```typescript
[app/app.module.ts]

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
```

상단에서 import 하고 `@NgModule` 데코레이터의 imports 요소에 `Formsmodule`을 추가했다.

이제 브라우저의 input박스 안에 값이 변하면, 환영합니다 메세지 옆에 이름이 갱신되면 정상작동 된 것이다.

잠시 데이터 양방향 맛봤다.




