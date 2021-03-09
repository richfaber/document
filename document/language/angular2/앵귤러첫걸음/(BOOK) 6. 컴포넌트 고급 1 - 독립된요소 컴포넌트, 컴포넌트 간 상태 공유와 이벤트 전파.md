출처 : 
[![thumbs](https://lh3.googleusercontent.com/-DP_1WlcsJxw/WWHQ9TJixuI/AAAAAAAASKE/ndaT8Dslq1Ivom24xHoYd9w_eQObvMQwwCHMYCw/I/thumbs.jpg)](http://www.yes24.com/24/Goods/41070512?Acode=101)

# (BOOK) 6. 컴포넌트 고급#1 - 독립된요소 컴포넌트, 컴포넌트 간 상태 공유와 이벤트 전파

컴포넌트 : 뷰를 구성하는 정보인 템플릿을 소유하며 뷰의 상태를 관리하고 뷰에서 일어나는 이벤트를 처리하는 관리자

## 독립된 요소: 컴포넌트

### 웹 컴포넌트

근대의 웹은 이전보다 복잡해 졌다. 
이것은 한 페이지의 개별영역 마다 다양한 기능들을 가지게 되었다고 볼 수 있다.
하지만 브라우저는 한페이지 안에 HTML을 읽어서, CSS로 디자인을 표현하고, JS로 기능을 붙이는데, 이것을 개별로 해석 하지는 않는다. 그렇기에 전역적으로 해석되는 이러한 것들의 종속성을 끊기 위해 나온 표준이 웹 컴포넌트 이다.

이것은 한 페이지에 독립된 컴포넌트 단위로 UI를 개발할 수 있도록 도와준다.

이 표준은 Custom Elements, HTML Imports, Template, Shadow DOM 의 4개의 기술 스펙으로 구성되며, 앵귤러의 컴포넌트와 깊은 관계가 있다.

- Custom Elements : HTML 표준안에 없는 요소작성을 위한 스펙
- Template : 화면에 바로 렌더링 되지 않지만 동적으로 렌더링 하기 위한 스펙
- HTML Imports : 페이지 안에서 CSS와 JS를 포함한 다른 HTML을 불러오기 위한 스펙
- Shadow DOM : DOM트리 내에 독립된 환경의 새로운 DOM 트리를 구축하기 위한 스펙


여러 예제를 통해서 앵귤러가 표준이 아닌 HTML 태그를 정의하고, 사용하고 있으며, 독립적인 컴포넌트 중심으로 구성되어 진다는 것을 경험 하였다. 이것은 웹컴포넌트의 개념과 유사하다.

중요한 것은 웹상에서 재사용 가능한 독립적인 스코프를 가지는 컴포넌트가 필요하고, 이같은 철학을 앵귤러와 웹컴포넌트가 공유하고 있다는 점이다.

### 컴포넌트와 스타일 정보

컴포넌트는 자신의 스코프를 가지기 때문에, 컴포넌트 내부의 스타일정보는 오직 컴포넌트에만 적용 된다.

이를 적용하는 방법은 `@Component` 데코레이터의 `styles` 에 CSS를 인라인으로 기술하거나 `styleUrls`를 통해 외부 CSS 파일을 로드하는 방법이다.

```type
@Component({
  selector: 'mpl-mouse-track-zone',
  templateUrl: './mouse-track-zone.component.html',
  styleUrls: ['./mouse-track-zone.component.css'],
  providers: [MySpecialLoggerService, {provide:LOG_LEVEL_TOKEN, useValue: LogLevel.DEBUG} ]
}
export class MouseTrackZoneComponent { ... }
}
```

```css
:host {
  display: inline-block;
  padding: 5px;
  border: 1px solid darkslategrey
}

.track-zone {
  width: 200px;
  height: 200px;
  vertical-align: top;
  background-color: lightblue;
  border: 1px solid grey;
  display: inline-block;
}
```

특정 컴포넌트에만 적용되는 스타일정보를 브라우저는 아직 구현하지 않고 있다. 하지만 앵귤러는 다른 방법을 통해서 이를 구현하고 있다.

실제로 컴포넌트를 작동 시킬때 선언한 css에 속성선택자를 하나 추가한다.

예를 들어 `<mpl-mouse-track-zone><div class="track-zone"></div></mpl-mouse-track-zone>` 이라는 마크업이 선언되었다고 치면, 앵귤러는 이것을

`<mpl-mouse-track-zone _ngcontent-c0 _nghost-c1><div _ngcontent-c1 class="track-zone"></div></mpl-mouse-track-zone>`

과 같이 속성을 하나 추가하고, css 는

```css
[_nghost-c1] {
  display: inline-block;
  padding: 5px;
  border: 1px solid darkslategrey
}

.track-zone[_ngcontent-c1] {
  width: 200px;
  height: 200px;
  vertical-align: top;
  background-color: lightblue;
  border: 1px solid grey;
  display: inline-block;
}
```

등의 랜덤한 속성을 추가함 으로써, 개별 컴포넌트에만 적용하는 스타일시트를 만들게 된다.

보통은 이렇게 하지만, 혹여 브라우저에서 웹컴포넌트를 구현했다고 가정했을 경우를 위해, 옵션을 제공한다.

```typescript
import { Component, Host, Optional, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mpl-mouse-track-zone',
  templateUrl: './mouse-track-zone.component.html',
  styleUrls: ['./mouse-track-zone.component.css'],
  providers: [MySpecialLoggerService, {provide:LOG_LEVEL_TOKEN, useValue: LogLevel.DEBUG }],
  encapsulation: ViewEncapsulation.Native
})
export class MouseTrrackZoneComponent { ... }
```

viewEncapsulation은 `Emulated, Native, None` 을 제공하고, 기본값은 `Emulated` 이다. `Native`를 사용할 경우 속성선택자로 캡슐화 하지 않고, 있는 그대로 사용 한다. 물론 웹컴포넌트를 지원하지 않는 브라우저에서 사용한다면, `track-zone` 스타일을 전역적인 스타일로 적용 된다.

### 컴포넌트의 독립성을 깨뜨리는 안티패턴

컴포넌트가 자신이 관리하는 뷰의 정보를 캡슐화하고, 외부에 노출시키지 않으려는 것은, 외부에서 또한 해당 컴포넌트 내부의 정보를 직접 접근할 수 없게 한다는 뜻이기도 하다.

하지만 DOM API 표준에 의해 document 안에 모든 DOM은 접근이 가능하기 때문에 이는 접근이 가능하다.

폐쇄되어 작동되길 바라는 앵귤러의 의지와는 상관없이 DOM API를 사용해서 접근하는 예제를 위해서 컴포넌트를 2개 만들자.

```command
> ng new firstangular
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
Project 'firstangular' successfully created.
```

예제를 위해서 angular-cli에서 제공하는 `ng new` 명령어로 프로젝트를 하나 생성하고,

```command
> cd firstangular
firstangular> ng g component check-list
installing component
  create src/app/check-list/check-list.component.css
  create src/app/check-list/check-list.component.html
  create src/app/check-list/check-list.component.spec.ts
  create src/app/check-list/check-list.component.ts
  update src/app/app.module.ts
```

```command
firstangular> ng g component check-list/check-list-result
installing component
  create src/app/check-list/check-list-result/check-list-result.component.css
  create src/app/check-list/check-list-result/check-list-result.component.html
  create src/app/check-list/check-list-result/check-list-result.component.spec.ts
  create src/app/check-list/check-list-result/check-list-result.component.ts
  identical src/app/app.module.ts
```

이렇게 2개의 컴포넌트를 생성하고, 화면에 컴포넌트를 보여주기 위해서 수정하자.

```html
<!-- filename : [src/app/app.component.html] -->
<app-check-list></app-check-list>
<app-check-list-result></app-check-list-result>
```

```html
<!-- filename : [src/app/check-list/check-list.component.html] -->

<form>
  <legend>항목체크</legend>
  <fieldset>

    <label for="check01">
      <input type="checkbox" id="check01" />
      <span>check list one</span>
    </label>

    <label for="check02">
      <input type="checkbox" id="check02" />
      <span>check list two</span>
    </label>

    <label for="check03">
      <input type="checkbox" id="check03" />
      <span>check list three</span>
    </label>

    <label for="check04">
      <input type="checkbox" id="check04" />
      <span>check list four</span>
    </label>

    <button type="button"><span>결과출력</span></button>

    <app-check-list-result></app-check-list-result>

  </fieldset>
</form>

```

```html
<!-- filename : [src/app/check-list/check-list-result/check-list-result.component.html] -->
<h3>체크한 항목 수 : {{ checkedCnt }}</h3>
<h3>체크한 항목 : </h3>
<ul>
  <li *ngFor="let value of checkedResult;">{{ value }}</li>
</ul>
```

그리고 기본 기능을 넣기 위해서 타입스크립트를 수정하자.

```typescript
//filename : [src/app/check-list/check-list.component.ts]
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit {
  checkList: string[];
  checkedResult: boolean[] = [];

  constructor() {
    this.checkList = [
      'check list one',
      'check list two',
      'check list three',
      'check list four'
    ];

    this.checkList.forEach(() => this.checkedResult.push(false));

  }

  ngOnInit() {
  }

}
```

```typescript
//filename : [src/app/check-list/check-list-result/check-list-result.component.ts]
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-list-result',
  templateUrl: './check-list-result.component.html',
  styleUrls: ['./check-list-result.component.css']
})
export class CheckListResultComponent implements OnInit {
  checkedCnt: number;
  checkedResult: string[];

  constructor() {
    this.initResult();
  }

  ngOnInit() {
  }

  private initResult() {
    this.checkedCnt = 0;
    this.checkedResult = [];
  }

}

```

이제 `CheckListComponent` 의 뷰에 DOM API를 이용해서 접근해 보자.

```typescript
//filename : [src/app/check-list/check-list-result/check-list-result.component.ts]

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-list-result',
  templateUrl: './check-list-result.component.html',
  styleUrls: ['./check-list-result.component.css']
})
export class CheckListResultComponent implements OnInit {
  checkedCnt: number;
  checkedResult: string[];

  constructor() {
    this.initResult();
    const buttonElem = document.querySelector('button');
    buttonElem.addEventListener('click', () => this.collectCheckedResult());
  }

  ngOnInit() {
  }

  private initResult() {
    this.checkedCnt = 0;
    this.checkedResult = [];
  }

  private collectCheckedResult() {
    this.initResult();
    const spanElems = document.querySelectorAll('label');
    for(let i = 0; i < spanElems.length; i++) {
      const spanElem = spanElems.item(i);

      const checkboxElem = spanElem.querySelector('input');
      if(checkboxElem.checked) {
        this.checkedResult.push(spanElem.querySelector('span').innerText);
      }

    }
    this.checkedCnt = this.checkedResult.length;
  }

}
```

위와 같이 `check-list-result.component` 에서 `check-list.component` 의 요소에 DOM API를 이용해서 요소들을 접근했다.

이러한 코드는 2개의 컴포넌트 사이에 결합도가 높다.

결합도가 높다는건 둘중에 하나의 코드변경이 다른쪽에 영향을 미친다는 것이고, 에러가 나올 확률이 높다는 데에 있다. 

언제든 변경되어질 가능성이 높은 태그에 의존하고 있다는 것에 문제가 있다. 가령 HTML의 ID를 지정해두고, 그것을 활용하는 것 또한 불안하긴 매한가지 이다.

HTML 템플릿이 자바스크립트 기능에 미치는 영향이 최소화 되어야만 한다.
왜냐하면, 위와 같은 예제는 코드를 이해하기 위해서 HTML 템플릿 또한 이해 해야만 하는데, 이것은 소모적이고, 가독성도 떨어지고, 수정도 어렵다.

프로젝트가 복잡해 질수록, 이런 결합도 높은 코드는 수정이 어렵게 된다. 심지어는 해당 컴포넌트의 아주 작은 수정을 했을 뿐인데도, 모든 페이지가 오류가 생기는 치명상이 되기도 한다.

앵귤러에서 제공하는 DOM 접근법을 적용해서 차이점을 확인해 보자.

## 컴포넌트 간 상태 공유와 이벤트

컴포넌트는 의존도를 낮추기 위해서 하는 것이지만, 불기피하게 다른 컴포넌트와 상태정보를 공유하거나 이벤트를 알아야 한다.

### 부모-자식 컴포넌트 간의 통신

#### Input 데코레이터를 사용한 속성바인딩

컴포넌트 html에서 전달할 수 있는 가장 간단한 방법이다.

```html
<test>
	속성바인딩을 통한 전달
	<test-child [myAnotherState]="myState" [cloneVal]="uniqueVal"></test-child>
</test>
```

좌측의 `myAnotherState`는 test-child 컴포넌트 내부의 변수와 동일해야 하고, 우측의 값은 test 컴포넌트의 변수 이다.

이것으로만 안끝나고 타입스크립트에 데코레이터도 추가해 줘야 한다.

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'test-child',
  templateUrl: '...',
  styleUrls: ['...']
})
export class CheckListResultComponent implements OnInit {
  @Input() myAnotherState;
}
``` 

이러면 부모의 `myState` 변수를 `myAnotherState` 로 받을 수 있다. 
(개인적인 생각인데, 전달변수와 받는변수가 같은 이름인게 편한데, 보통은 다르게 사용하는가 보다.)

#### Output 데코레이터를 사용한 이벤트 바인딩

위의 방법은 양방향 바인딩은 아니다. 단순히 전달일 뿐이기 때문에, 자식에서 값이 바뀐다 해도, 부모에 영향이 가지 않는다.

이번엔 자식에서 부모에게 전달해 보자. 이건 좀 복잡한데??

```html
<!-- filename : [src/check-list/check-list.component.html] -->
<app-check-list-result [receiveChild]="sendChild" (selectStory)="getName($event)"></app-check-list-result>
내 이름은 {{ name }}
```

위와 같이 `()` 안에 자식의 변수이름이 설정 되고(이 값을 받게 된다.) 부모의 `getName` 함수를 통해 이 값을 받게 된다. 

```typescript
// filename : [src/check-list/check-list.component.ts]
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent {
  checkList: string[];
  checkedResult: boolean[] = [];
  sendChild: string = "자식에게 보냈다.";
  name: '';

  constructor() {

  }

  getName(name) {
    this.name = name;
  }
  
}
```

부모의 `getName` 함수를 통해서, 나의 `name` 변수가 바뀌게 된다.

```html
<!-- filename : [src/check-list/check-list-result/check-list-result.component.html] -->
<p>자식에게 전달했다.. : {{ receiveChild }}</p>
<button type="button" (click)="sendSelectStory()">부모에게 전달</button>
```

버튼을 클릭하면 `sendSelectStory` 함수가 실행되고, `emit` 앵귤러 함수를 통해 부모에게 전달된다.

```typescript
// filename : [src/check-list/check-list-result/check-list-result.component.ts]
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-check-list-result',
  templateUrl: './check-list-result.component.html',
  styleUrls: ['./check-list-result.component.css']
})
export class CheckListResultComponent {
  @Input() receiveChild;
  @Output() selectStory = new EventEmitter<string>();
  name = "heewon";

  constructor() {
  }

  sendSelectStory() {
    this.selectStory.emit(this.name);
  }

}
```

위와 같이 `sendSelectStory` 함수에서 `emit` 함수에 매개변수로 `this.name`이 전달된다.
물론 이 `emit`을 사용하기 위해, 상단에 `EventEmitter` 함수를 import 하였고, `selectStory` 변수가 `emit` 함수를 상속받기 위해서 `@Output()` 데코레이터에 설정되어 있다.

이렇게 하면, `sendSelectStory` 함수가 호출 시, `emit` 을 통해서, 부모의 `getName` 함수가 호출되게 되는 구조이다.

굉장히 불편한데?? -_-??

자식의 `constructor` 에서 `this.sendSelectStory()` 를 강제로 실행시켜 봤는데도, 전혀 작동하지 않는다.

무조건 이벤트가 작동(버튼클릭) 할 때, 비로소 부모에게 전달된다. 말그대로 `단방향 이벤트바인딩` 이다.
한참을 찾았는데, 이런 이벤트 호출 방식이 아닌 방법을 찾지 못했다.
(물론 남은건 양방향 [()] 이겠거니 추측이 되지만..)

좀더 편한 방법은 `ngOnInit`를 활용 하는 것이다.

```typescript
// filename : [src/check-list/check-list-result/check-list-result.component.ts]
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-list-result',
  templateUrl: './check-list-result.component.html',
  styleUrls: ['./check-list-result.component.css']
})
export class CheckListResultComponent {
  @Input() receiveChild;
  @Output() selectStory = new EventEmitter<string>();
  name = "heewon";

  constructor() {
  }

  ngOnInit() {
    this.selectStory.emit(this.name);
  }

}
```

이렇게 해버리면 값이 전달 되는데, `이벤트바인딩` 의 목적과는 좀 맞지 않는듯해 보인다.

단순히 변수를 전달하는 것인데, `@Input` 데코레이터를 사용하는 것보다 훨씬 불편하다.

정리를 해보자면 `@Input` 데코레이터로 전달하고 싶은 것을 자식에게 내리 꼽는 용도이고, `@Output` 데코레이터는 무조건 이벤트를 호출해야 하기 때문에, 단순히 부모에게 보낸다는 느낌 보다는, 자식이 어떤 행동(Action)을 하게되면 부모도 뭔가를 동작하게 만드는 방법인 것으로 정리 하고자 한다.

이것에 문제는... 부모의 부모, 그의 부모, 그 위에 부모까지 전달하기 위해, 중간에 무슨 허브처럼 이 작업들을 죄다 해야 하는 것이다. 물론 이렇게 복잡해 질거라면 공유를 해야하는 컴포넌트를 따로 만들어서 개별 Component 들이 import 하는 것이 현명할 것이다.





