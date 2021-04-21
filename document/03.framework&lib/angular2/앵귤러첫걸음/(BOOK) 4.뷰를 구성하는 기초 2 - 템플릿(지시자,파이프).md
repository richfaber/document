[![thumbs](https://lh3.googleusercontent.com/-DP_1WlcsJxw/WWHQ9TJixuI/AAAAAAAASKE/ndaT8Dslq1Ivom24xHoYd9w_eQObvMQwwCHMYCw/I/thumbs.jpg)](http://www.yes24.com/24/Goods/41070512?Acode=101)

# (BOOK) 4.뷰를 구성하는 기초#2 - 템플릿(지시자, 파이프)

### 지시자

#### 지시자의 개념

앵귤러 소스를 보면 컴포넌트(Component)는 지시자(Directive)를 상속받는 형태를 가지고 있다.

```typescript
export interface Component extends Directive
```

이런 구조의 형태 이다. 즉 컴포넌트 또한 지시자(Directive) 라는 것이다.

지시자라는 것에 사전적 의미는 `가리켜 보임`, `알려줘서 시킴 혹은 그 내용자체` 등인데, `어떠한 대상에게 일련의 명령을 수행하게 함` 으로 정의할 수 있다.

앵귤러에서 지시자는 `DOM을 다루기 위한 모든 것` 이라고 재해석 할 수도 있다.

컴포넌트(Component) 인터페이스는 지시자(Directive) 인터페이스를 상속 받기 때문에, Directive가 가지고 있는 기본 속성에, 추가메타정보(템플릿, 스타일 정보등)를 추가하여 사용한다고 이해하면 된다.

즉 `지시자 + 메타정보(템플릿,스타일,등등) = 컴포넌트` 이다.

컴포넌트는 뷰 정보를 가진 특수한 지시자로 컴포넌트를 자식으로 가질 수 있지만, 지시자는 컴포넌트를 자식으로 가질 수 없다. 

만약 A컴포넌트가 B컴포넌트를 자식으로 가지고 있고, B컴포넌트에 C지시자가 있다고 치자. C지시자는 다른 컴포넌트를 가질 수 없다.
(뷰정보가 없어서 라는데.. 모르겠음.)

즉 지시자를 컴포넌트처럼 사용하면 안된다. 
지시자는 컴포넌트의 종속된 요소로 사용해야 하는 것이지, 컴포넌트처럼 컴포넌트 안에 컴포넌트 식으로, 확장 개념으로 보면 안된다.
(대충 이정도 특징만 으로 넘어가는 걸로..)

##### 구조 지시자

구조 지시자는 DOM 요소를 추가하거나 삭제하는 등의 DOM 트리를 동적으로 조작하여 화면의 구조를 변경할 목적으로 사용한다.

기본적으로 제공하고 있는 지시자로 `NgIf, NgFor, NgSwitch` 등을 들 수 있다.

```typescript
<div>
  <button type="button" (click)="isShow = !isShow">전환</button>
  <label *ngIf="isShow; else hiding">You are special</label>
  <ng-template #hiding>
    <label>I'm so depressed</label>
  </ng-template>
</div>

<div *ngIf="member">
  <p>Name: {{member.name}}</p>
  <p>Email: {{member.email}}</p>
</div>
```

3번줄에 `isShow` 가 `true` 일 경우에 `label`이 활성화 된다.
반면 `isShow` 가 `false` 가 되면 DOM트리에서 제거되고 대신 `else` 뒤에 `hiding` 이라는 ID를 가진 템플릿 참조변수의 요소가 DOM 삽입 된다.
(`#hiding` 은 아이디를 지정하는 셀렉터)

9번줄의 `ngIf`는 `member` 라는 객체가 있을 경우 해당 DOM이 삽입된다. member 객체가 `null or undefined` 이면 해당 DOM 트리는 제거된다.

(이전 코딩방식 에서는 보통 css를 활용해서 `display:none` 으로 해당 DOM을 숨기는 방식을 일반적으로 취했지만, Angular는 그러지 않고 아예 DOM 자체를 삭제 하거나, 삽입 한다는 특징이 있다. 메모리면 에서 더 효율적.. 하지만 순회문, 조건문은 삭제하지 않고 주석처리로 함.)

`ngFor`는 배열 형태의 DOM 에 반복 표현할 목적으로 사용한다.

```typescript
<ul>
  <li *ngFor="let animal of animals; let idx = index">{{ idx + 1 }} {{ animal }}</li>
</ul>
```

ngFor 안에 `for ... of` 문법을 사용하고 있는데, 이것은 순회문은 맞는데, `for ... in`과 다르게, 컬렉션 전용이다. 쉽게 얘기해서 `for ... in`은 모든 속성을 순회한다. `[a,b,c]` 배열이 `for ... in` 으로 돌아가면, 배열의 index 까지 순회에 포함되서 6번 돈다. `0,1,2,a,b,c` 이렇게 순회하는 반면 `for ... of`는 `a,b,c` 순회만 한다.

[`for ... of` 설명링크](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...of)

이때 필요한 순회번호는 `index`로 자동 전달 되기 때문에, 필요한 경우 사용하면 된다.

`ngSwitch`는 스위치케이스 문과 비슷하다. 조건에 맞는 부분만 화면에 보이게 된다.

```typescript
<span [ngSwitch]="animal">
  <span *ngSwitchCase="'Dog'">멍멍</span>
  <span *ngSwitchCase="'Cat'">야옹</span>
  <span *ngSwitchCase="'Cock'">꼬끼오</span>
  <span *ngSwitchDefault>에헴!</span>
</span>
```

`ngSwitch`는 `[ngSwitch]` 로 사용하고, 해당 조건은 `*ngSwitchCase`로 사용 한다.
해당 변수의 값이 `ngSwitchCase`에 지정하고 있는 문자열과 매칭 될 경우에, 해당 라인의 요소가 화면에 출력되고, 나머지는 주석처리 되어 진다. 해당 사항이 없을 경우에는 `*ngSwitchDefault` 라인이 출력된다.

만약 span 태그가 부담스러워서 태그 자체를 사용하지 않을 경우에는 `ng-container`를 사용하면 되는데, 마크업 구조 측면에서는 비추천!!!!

```typescript
<span [ngSwitch]="animal">
  <ng-container *ngSwitchCase="'Dog'">멍멍</ng-container>
  <ng-container *ngSwitchCase="'Cat'">야옹</ng-container>
  <ng-container *ngSwitchCase="'Cock'">꼬끼오</ng-container>
  <ng-container *ngSwitchDefault>에헴!</ng-container>
</span>
```

구조지시자는 `*`로 쓰는데, `ngSwitch`는 속성지시자처럼 `[]` 썻다.. 왜지...
우선 몇개 안나와서 외워 버리기로 했다. 지금까지는 `ngSwitch`만 `[]` 이렇게 쓰고, 나머지는 `*` 쓰는걸로~

##### 속성 지시자

선언된 DOM의 상태를 변경할 목적으로 사용한다. 대표적으로 사용하는 것이 `ngClass, ngStyle` 이다.

```typescript
<div [class.my-class]="isMyClass">앵귤러 속성 지시자</div>
```

`isMyClass` 변수값의 불리언값(true, false)에 의해서 `my-class` 가 붙거나, 없거나 한다. 
뭔가 좀 이상한데?? `ngClass` 또한 클래스를 제어할 목적으로 사용한다.

```typescript
<div [ngClass]="myObj">앵귤러 속성 지시자</div>
```

이렇게 쓰고 조건문을 어떻게 쓰냐면, 변수 설정을

```typescript
myObj = { 'test-class': true, 'anything-class': 0, test:true }
```

이렇게 지정해 버리면, `test-class`와 `test` 클래스가 붙어서

```typescript
<div class="test-class test"></div>
```

와 같은 결과가 나온다.

`ngClass`가 클래스를 넣는 목적으로 사용한다면, `ngStyle`은 inline으로 스타일을 동적으로 적용하기 위해 쓴다.

```typescript
<p [ngStyle]="styleconf">NgStyle 속성 지시자</p>

this.styleConf = {
	color: this.boilable ? 'green' : 'yellow',
	'font-weight': this.edible ? 'bold' : 'normal'
}
```

엥간하면 자바스크립트 코드로 스타일을 제어하는 것은 반대!!... 그를 위한 css 인데...

### 파이프

뷰에 노출할 데이터를 간단하게 변환하는 필터의 목적으로 사용한다.

앵귤러가 기본으로 제공하는 파이프로는 `DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, PercentPipe` 등이 있다.

```html
<p name="member-name">{{ myName | uppercase | honor }}</p>
```

파이프는 이렇게 `|` 를 사용해서 변수명 뒤에 연결하면 적용 된다.

#### 커스텀 파이프

내가 만들수도 있다. 사용하려면 `@angular/core`에 있는 `Pipe, PipeTransform` 메소드를 사용해야 한다.

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'honor' })
export class HonorPipe implements PipeTransform {
	transform(value: string): string {
		return `${value}님`;
	}
}
```

위와 같이 `Pipe` 데코레이터를 통해서 이름을 정하고 클래스 이름은 관례상 뒤에 `Pipe`를 붙인다. (응? 뒤에 붙이네? 난 앞에 붙는게 좋은데..)

`PipeTransform` 인터페이스를 사용하겠다고 하고 있는데, 이 인터페이스는 `transform` 에 대해서만 지정되어 있다. 인터페이스에 선언되어 있기 때문에, 무조건 구현해야 한다. (외우는 걸로..)

좀더 복잡하게 구성할 수도 있는데,

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'geeMark' })
export class GeeMarkerPipe implements PipeTransform {
	transform(value: string, level: string): string {
		switch (level) {
			case 'A':
				return `Oh Geek! ${value}`;
			case 'I':
				return `Good man, ${value}`;
			case default:
				return `Novice ${value}`;
		}
	}
}
```

이렇게 하고 사용은

```html
<p name="member-name">{{ myName | geeMark }}</p>

or

<p name="member-name">{{ myName | geeMark:'A' }}</p>
```

이렇게 사용한다. 첫번째 인자는 무조건 좌측에 변수명이 넘어가고, 그 뒤부터는 다음 인자에 대입된다.
인자를 더 받고 싶으면, 콜론 ':'으로 이어서 사용한다.

```html
<p name="member-name">{{ myName | geeMark:'A':10:'heewon' }}</p>
```

3개 인자를 사용했다. 그러면 `transform` 메소드 또한 변경해서,

```typescript
	transform(value: string, level: string, score:number, name:string): string {
```

이렇게 인자를 더 받으면 된다.

이렇게 만들어진 파이프 파일은 `NgModule` 데코레이터의 `declarations` 속성에 지정해서 사용한다.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { GeeMarkerPipe } from './pipe/geeMarkPipe';

@NgModule({
  declarations: [
    AppComponent,
    GeeMarkerPipe
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

심심해서 imports에도 넣어보고 privders에도 넣어봤는데 에러 뿜는다..
컴포넌트 데코레이터는 `declarations` 을 지원하지 않아서, 해당 컴포넌트용 파이프를 지정하는건 불가능, `NgModule` 을 통해야만 한다.



 



