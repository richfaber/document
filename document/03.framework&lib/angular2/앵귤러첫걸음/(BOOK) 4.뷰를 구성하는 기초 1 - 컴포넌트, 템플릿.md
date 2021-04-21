[![thumbs](https://lh3.googleusercontent.com/-DP_1WlcsJxw/WWHQ9TJixuI/AAAAAAAASKE/ndaT8Dslq1Ivom24xHoYd9w_eQObvMQwwCHMYCw/I/thumbs.jpg)](http://www.yes24.com/24/Goods/41070512?Acode=101)

[(이전까지 예제파일 다운로드)](https://cdn.rawgit.com/richfaber/example/7afebc2e/angular2/beginingAngular/ng-welcome-msg-app-v4.1.zip)

# (BOOK) 4.뷰를 구성하는 기초#1 - 컴포넌트, 템플릿

드디어 본격적인 기초의 시작이다. 이전에 맛배기를 한 것은 무조건 도움이 된다. 이전것을 뛰어넘고 이 장부터 보더라도 문제가 없겠지만, 개인적 으로는 어떤 것을 배우던 익숙해지고 나서 학습하는 것이랑, 낯익은 상태에서 학습하는 것의 습득력은 천지차이 라고 생각하는 편이라서, 맛배기 타임은 상당한 도움이 된다고 생각한다.

앵귤러는 컴포넌트 단위로 뷰를 생성하고 관리한다.

일반적인 애플리케이션의 뷰는 기능과 목적에 따라 논리적인 구성을 가진다.

컴포넌트에는 무조건 템플릿이 있다. 그것은 표준 HTML을 바탕으로 추가적인 문법을 통해서 뷰의 정보와 이벤트처리 로직을 담는다. 결론적으로 앵귤러의 뷰는 컴포넌트 + 템플릿 코드로 이루어진다고 보면 된다.

앵귤러는 컴포넌트와 템플릿 중간역할을 하게 되는데, 컴포넌트가 제공하는 정보를 뷰에 전달하고, 뷰에서 일어나는 사용자의 액션에 반응해서 앵귤러가 지원하는 기능은 알아서 처리하고, 그 외에 사용자가 지정한 기능들은 컴포넌트에 요청해서 수행한다.

## 컴포넌트

### 컴포넌트의 선언

컴포넌트는 하나의 `Class` 이다.

```typescript
export class SimpleComponent { }
```

여기까지는 단순한 타입스크립트 클래스 이다. 여기에 앵귤러가 알아먹을 수 있도록 `Component 데코레이터` 를 넣는다. (컴포넌트 데코레이터는 `@angular/core` 패키지 에서 제공하고 있다.)

```typescript
import { Component } from '@angular/core';

@Component({
	selector: 'af-simple',
	template: `<h1>Angular is awesome!!</h1>`
})
export class SimpleComponent { }
```

이것이 컴포넌트 선언의 기본이다.

### 메타데이터

`Component 데코레이터`의 두번째 역할은 설정정보를 넣는데 이것은 `메타데이터` 라 한다.
전달할 수 있는 메타데이터의 종류는 총 18가지나 된다. 하지만 강제하는 필수값은 없지만 실상, selector와 템플릿 정보는 입력 해야만 한다.

#### 템플릿 정보

앵귤러가 강제하는 필수값이 없다고는 하지만, 템플릿 정보를 입력하지 않으면, 에러메세지는 아닌 컴포넌트가 없다는 경고 메세지가 나온다.

```console
Warning: No template specified for component
```

템플릿 정보를 지정하는 2가지 방법이 있는데, `template` 와 `templateUrl`이 있다.

```typescript
@Component({
	selector: 'af-simple',
	template: `<h1>Angular is awesome!!</h1>`
})

or

@Component({
	selector: 'af-simple',
	templateUrl: './welcome-msg.component.html'
})
```

여기에 해당 컴포넌트에만 사용될 css를 지정할 수 있다.

```typescript
@Component({
	selector: 'af-simple',
	template: `<h1>Angular is awesome!!</h1>`
	styles: ['h1 { font-weight: normal; }']
})

or

@Component({
	selector: 'af-simple',
	templateUrl: './welcome-msg.component.html'
	styleUrls: ['./welcome-msg.component.css']
})
```

#### selector

selector는 컴포넌트를 사용할 때 사용되는 인식기(?) 같은 것이다. css에서도 사용하고, jquery 에도 사용하고 있는 [W3C의 표준안](https://www.w3.org/TR/selectors/) 이다.
(몇버전을 지원하는지는 모르겠지만.. Level3 부터는 조금 문제가 있는듯 보임.)

#### 기타정보

styles, styleUrls, template, templateUrl 외에 13가지 정보들은 컴포넌트의 동작 방식과 관련된 설정이다.
(이렇게 정리해 주니 너무 좋음.. 다시 한번 저자 조우진님 에게 감사 꾸벅~)

### 부트스트래핑

부트스트래핑은 애플리케이션의 최초 실행할 때 진행되는 과정을 말한다. (시동건다 라는 뜻도 된다.)

```typescript
//filename: [src/app/welcome-msg/app.module.ts]
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

NgModule 은 앵귤러 애플리케이션을 구동하는(시작하는) 가장 기본 모듈이다. NgModule임을 앵귤러에게 알리기 위해서 `NgModule 데코레이터` 를 사용하고 있다.

NgModule의 메타데이터 중 `bootstrap` 은 애플리케이션을 구동(시작)할 때 어떤 컴포넌트를 사용할 것인지를 배열로 명시한다. 통상 브라우저에서 최초 index.html 을 요청하여 애플리케이션을 실행하는 컴포넌트가 된다.

`declarations`는 앵귤러 애플리케이션에서 사용할 모든 컴포넌트를 배열로 선언한 정보이다. 컴포넌트를 포함 파이프까지 선언이 된다.(모든것이 대상이 된다.)
(여기에 선언한 모든 컴포넌트의 셀렉터가 뷰와 연결된다고 생각하자.)

`declarations`와 `bootstrap` 을 반드시 등록하여야 하는 이유는 앵귤러의 동작방식 때문인데, 우리가 작성한 컴포넌트, 지시자 등의 코드를 해석해서 일반적인 자바스크립트 코드로 변환시키기(프리컴파일) 때문이다.

컴파일은 추가적 설정이 없으면 브라우저에서 애플리케이션이 실행될 때 이루어 지는데, 이 과정은 맨땅에서 되는 것은 아니고, `src/main.ts` 안에 있는 `platformBrowserDynamic().bootstrapModule(AppModule)` 를 통해서 컴파일 된다.

이쯤에서 컴파일 된 파일의 물리적 위치가 엄청 궁금한데, 지금의 `ng serve` 로 보고 있는 서버의 물리적 파일들은 메모리에 가상공간 안에서 동작 하고 있다는 것 쯤으로 이해하고 있다.

### 컴포넌트 트리

엥귤러로 개발한 애플리케이션은 무조건 컴포넌트 트리가 있다. 그 이유는 컴포넌트가 다른 컴포넌트를 포함하기 때문이다.

최초 index.html 에서 사용할 컴포넌트가 트리의 루트가 된다. 그 하위에 컴포넌트, 또 그 아래의 컴포넌트로 확장 된다.

앵귤러 애플리케이션은 컴포넌트가 가장 중요한 개념이고, 설계 시점부터 컴포넌트 트리를 고려해야 함을 의미 한다.

명확하게 어떤 규칙이 있다고 얘기할 순 없지만, 마크업을 할 때에 레이아웃의 골짜를 구성하는 것을 빗대어 보면, 

![tree](https://lh3.googleusercontent.com/-iRE6Av1vLZ4/WXmUIyqhBlI/AAAAAAAASlo/tT9z41sNg6QoIXX0sCLR3ysuqvmicO9dQCHMYCw/I/tree.png)

아주 간략하게 이런 구성도 가능해 보인다.

기능단위로 분리해도 좋고, 화면단위로 분리해도 좋다. (어떤것이든)

이런 분리의 기준은 화면을 중시하는 사람은 화면단위 컴포넌트를 좋아하고, 비즈니스 로직단위를 좋아하는 사람은 기능단위의 컴포넌트를 좋아하는 듯 하다. 화면을 나누고 기능을 분리하는 사람이 있는 반면, 기능으로 나누고 화면에 대입하는 사람도 있다. (어떤거든 못할게 무엇인가.)

이런 컴포넌트를 나누는 기준이 중요하지만, 특별한 기준이 없다면, 협업팀에 위탁하는게 좋다고 생각한다.

## 템플릿

템플릿은 컴포넌트의 뷰를 구성한 정보 이다. 앵귤러는 표준 HTML 만으로도 템플릿 코드로 인정하지만, 추가적인 요소와 문법을 제공하고 있다.

템플릿을 지정하는 방법은 2가지로 `template: '<h1>헤드라인</h1>'` 와 같이 인라인방식으로 입력할 수도 있고, `templateUrl: './template.html'` 로 uri를 지정할 수도 있다.

### 절차적 방식과 선언적 방식

기존의 웹 프로그래밍은 뷰를 구성하는 DOM에 직접 접근하여 데이터를 노출하거나, 뷰의 상태를 가져와 로직을 처리하는 등에 일일히 수행하는 방식이였다. 이를 절차적 프로그래밍 이라 한다.

반면 컴포넌트와 뷰 사이에 연결고리를 만들어서 관계를 선언하는 방식은 선언형 프로그래밍 이라고 한다.
(뭔말이여..-_-?)

두가지 소스를 비교해 보자.

```typescript
[기존방식]
var isConfirmed1 = document.querySelector("#confirm-checkbox1").checked;
var isConfirmed2 = document.querySelector("#confirm-checkbox2").checked;
var isAllConfirmed = isConfirmed1 && isConfirmed2;

if( isAllConfirmed ) {
	// 검증 통과
}

[앵귤러 방식]
import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template: `
		<label for="chk-btn">선언적방식</label>
		<input type="checkbox" id="confirm-checkbox1" [(ngModel)]="isConfirmed1" />
		<input type="checkbox" id="confirm-checkbox2" [(ngModel)]="isConfirmed2" />
	`
})
export class AppComponent {
	isConfirmed1: boolean;
	isConfirmed2: boolean;
	
	어떤_비즈니스_로직을_담은_메서드() {
		const isAllConfirmed = isConfirmed1 && isConfirmed2;
		if( isAllConfirmed ) {
			// 검증 통과
		}
	}
}

```

기존방식은 상태가 변경할 때마다 값을 얻어 판단하는 방식이고, 앵귤러 방식은 양방향 바인딩을 통해서, 템플릿에 모델의 값에 대응하는 변수를 선언함으로써, 지속적 변화에 대응하는 로직이 가능해 진다. 

즉 상태변화를 일일이 감지하여, 해당하는 코드를 작성하지 않고, 선언을 함으로써, 나머지 상태변화는 앵귤러가 대신 해 주는 것이다.

이런식의 방식은 컴포넌트와 뷰의 상호간 종속성을 줄여줌으로써 상호 간 분리를 이룰 수 있게 된다.

기존의 방식을 onchange 이벤트를 통해 상호동작 하는 것으로 구현할 수도 있지만, 이때에는 템플릿의 onchange가 없으면 동작이 무너진다. 

혹은 onchange 안에 있는 메소드가 js에 없으면 무너진다. 이것이 상호의존성을 의미하는데, 앵귤러 방식은 둘중에 뭐하나 없어도, 다른 기능이 무너지지 않는다.

의존성이 줄어든 다는 것은, 특정 기능이 오류가 나더라도 나머지는 정상동작 한다는 것을 의미한다.
(모든 문제가 해결되는 조커 같은 것은 아니지만, 최소화 되는 효과)

이것은 자바스크립트의 특징인 인터프리터 기반의 언어(실행과 동시에 반영, 에러나면 이후 모두 Stop)이기 때문에 문제가 될 수 있는데, 다른 언어는 어떤 과정이 실패하면 전체 컴파일에 문제가 생긴다. 

하지만 자바스크립트는 그렇지 않다. 이쪽 에서 잘 동작하는 코드가 다른 쪽에 영향을 끼쳐서 오류가 나더라도 쉽게 찾을 수 없고, 심지어는 오류 난 시점부터 이후 동작은 모두 STOP 되버리기 때문에,(이부분이 자바스크립트 디버깅이 Hell 이라고 얘기하는 지점) 의존성을 없애는 것은 매우 중요 하다고 생각한다.

### 데이터 바인딩

앵귤러의 선언적 프로그래밍은 데이터 바인딩에 근간 한다. 이것은 컴포넌트와 뷰 사이에 연결 고리를 맺는 구체적인 방법 이다.

#### 단방향 바인딩

##### 삽입식

문자열로 변활될 수 있는 값을 뷰에 바인딩 한다. 

```typescript
<div>{{ contents }}</div>
<textarea>{{ getSomeText() }}</textarea>
<a href="{{ someLink + '?who=angular' }}">link</a>
<p>1 + myVal = {{ 1+ myVal }}</p>
```

위와 같이 단순하게 변수를 출력할 수도 있고, `getSomeText()` 메소드의 실행결과를 얻을수도 있고, 변수와 문자를 조합할 수도 있으며, 심지어는 간단한 연산도 가능하다.

중괄호(보간식??) 두개 안에는 무조건 앵귤러의 템플릿 표현식 으로 작성 해야만 한다. 몇가지만 주의하자

- 템플릿 표현식의 유효 컨텍스트는 컴포넌트이다. (해당 컴포넌트에 속해 있지 않은 메소드를 쓰거나, 변수는 나오지 않는다.)
- 템플릿 표현식의 복잡한 수식을 넣으면 심각한 오류가 생길 수 있다.(앵귤러 실행구조에 의해서)

최대한 간결한 내용만 바인딩 하는 것을 추천하고 있다.

##### 속성 바인딩

DOM의 속성으로 바인딩 하는 방법 이다.

```typescript
<p [textContent]="contents"></p>
<img [src]='/some/image.jpg' [width]='10*20' />
<img [src]='someURL' width='128' />
<img src="{{someImageUrl}}" width='128' />
```

P 노드의 textContent 속성에 컴포넌트의 contents 값을 넣기도 하고, 이미지의 src 속성에 일반문자를 넣거나, 어떤 URL을 넣거나, width 속성에 연산식을 넣기도 한다.

몇가지 특징을 더 보자면,

```typescript
<h1 class="test abc" [class]="'force'">{{title}}</h1>
<h1 class="test abc" [class.test]="isTest">{{title}}</h1>
<p [style.color]="isReally ? 'blue': 'grey'">Hell Angular</p>
```

1번째 줄은 기존에 선언된 모든 class를 없애버리고, force로 바꾼다. (주의)
2번째 줄은 isTest 라는 컴포넌트 변수의 값이 true 이면 test 클래스가 되고, 아니면 적용하지 않는다.
3번째 줄은 isReally 라는 컴포넌트 변수의 값이 true이면 color 값은 blue로 하고 아니면 grey를 적용한다.

일반적으로는 클래스나 스타일을 제어할 때는 NgClass나 NgStyle을 권장하고 있다. 

##### 이벤트 바인딩

뷰에서 발생하는 이벤트를 처리할 로직을 바인딩 한다.

```typescript
<button type="button" (click)="confirm()">확인</button>
<div (mousemove)="printPosition($event)"></div>
<input type="text" (keyup)="myStr = $event.target.value" />
<button type="button" (click)="clicked = true; callEvent($event)">확인</button>
```

괄호안에 이벤트 이름을 넣고, 컴포넌트안의 메소드를 넣거나, 간단한 자바스크립트 구문을 넣는다.

`$event`는 앵귤러에서 이벤트 발생시 전달하는 표준 이벤트 객체이다.

#### 양방향 바인딩

단방향방식과 다르게 뷰와 컴포넌트의 상태 변화를 상호 반영해 줄 목적이 있다.

가장 기본적인 출발은 `FormsModule` 에서 제공하는 `ngModel 지시자(directive)` 이다.

```typescript
<input type="text" [(ngModel)]="myData" />
<select [(ngModel)]="mySelection">
	<option value="A">A value</option>
	<option value="B">B value</option>
	<option value="C">C value</option>
</select>
```

속성 바인딩에서 사용하는 `[]` 와 이벤트 바이딩 할때 사용하는 `()` 를 사용하여, ngModel 키워드를 감싸면 양방향 바인딩이 된다. 이것에는 비밀이 있다고 한다. (-_-? 앵귤러 홈페이지에서 본거같은데..)

책에 제공하는 예제는 생략~


