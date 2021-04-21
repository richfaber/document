> angular.io > DOCS > GUIDE > [10. Template Syntax](https://angular.io/docs/ts/latest/guide/template-syntax.html)

# TEMPLATE SYSTAX

- 데이터 바인딩을 사용하여 데이터를 표시하고, 사용자 이벤트를 사용하는 템플릿을 작성하는 방법에 대해 알아보십시오.

Angular 애플리케이션은 Component 클래스 인스턴스(component)와 사용자 접점 템플릿의 상호 작용을 관리하여 사용자가 보고, 할 수 있는 것을 가능하게 합니다.

많은 사람들이 Model-View-Controller(MVC) 또는 Model-View-View-Model(MVVM) 패턴에 대한 경험을 바탕으로 Component/Template 분리 사용에 익숙 합니다.
Angular의 component는 Controller/ViewModel 의 일부를 담당하며, 템플릿은 View를 나타냅니다.

우리가 보기에 템플릿을 작성하는 데 필요한 것이 무엇인지 알아 보겠습니다. 템플릿 구문의 기본 요소는 다음과 같습니다.

- HTML
- 보간법
- 템플릿 표현식
- 템플릿 문
- 바인딩 구문
- 속성 바인딩
- 속성, 클래스 및 스타일 바인딩
- 이벤트 바인딩
- 양방향 데이터 바인딩
- NgModel과 양방향 데이터 바인딩
- 기본 제공 Directive
	* NgClass
	* NgStyle
	* NgIf
	* NgSwitch
	* NgFor
- `*` 및 `<template>`
- 템플릿 참조 변수
- Input 및 Output 속성
- 템플릿 표현 연산자
	- pipe
	- safe navigation operator(?)

[이 예제](https://angular.io/resources/live-examples/template-syntax/ts/eplnkr.html)는 이 장에서 설명하는 모든 구문과 코드 조각을 보여줍니다.

## HTML

HTML은 Angular 템플릿 언어 입니다. QuickStart 응용 프로그램에는 순수한 HTML 템플릿을 봤습니다.

```html
<h1>안녕하세요 Angular</ h1>
```

거의 모든 HTML 구문은 유효한 템플릿 구문 입니다. `<script>` 요소가 배제되 있다는 것을 주목하십시요. 그것을 금지함으로써, 스크립트 삽입 공격의 위험을 제거 합니다.
(실제로, `<script>`는 무시됩니다.)

일부 표준 HTML은 템플릿 에서 별로 의미가 없습니다. `<html>`, `<body>` 및 `<base>` 요소는 우리의 레퍼토리 에서 유용한 역할을 하지 않습니다. 그 외에는 꽤 많은 것들이 그대로 사용됩니다.

새로운 요소 및 속성 으로 나타나는 Component 및 Directive를 사용하여 템플릿의 HTML 어휘를 확장 할 수 있습니다. 다음 섹션 에서는 데이터 바인딩을 통해 DOM(Document Object Model) 값을 동적으로 가져오고 설정하는 방법을 배우게 됩니다.

HTML을 풍부하게 확장하는 템플릿이 얼마나 많은지 알아보기 위해 데이터 바인딩의 첫번째 형태인 보간법을 살펴 보겠습니다.

## 보간법

우리는 Angular 교육의 초기에 `{{and}}` 의 이중 중괄호 보간법을 만났습니다.

```html
<p>My current hero is {{currentHero.firstName}}</p>
```

보간을 사용하여 계산된 문자열을 HTML 요소 태그및 속성 사이의 텍스트로 집어 넣을 수 있습니다.

```html
<h3>
  {{title}}
  <img src="{{heroImageUrl}}" style="height:30px">
</h3>
```

중괄호 사이의 들어가는 것은 때론 component 속성의 이름(property name) 입니다.
Angular 는 해당 이름을 해당 component 속성의 문자열 값으로 바꿉니다.
위 예제 에서 Angular 는 title 및 heroImageUrl 속성을 평가(판단)하고 "공백을 채웁니다". 응용 프로그램 제목과 영웅 이미지가 표시될 것입니다.

보다 일반적으로, 괄호 사이의 들어가는 것들은, Angular가 먼저 평가한 다음 문자열로 변환하는 템플릿식 입니다.
다음 보간법은 중괄호 안에 두 숫자를 추가하여 이것을 설명해 줍니다.

```html
<!-- "The sum of 1 + 1 is 2" -->
<p>The sum of 1 + 1 is {{1 + 1}}</p>
```

아래 표현식은 `getVal()` 과 같이 component 의 메소드를 호출 할 수 있습니다.

```typescript
<!-- "The sum of 1 + 1 is not 4" -->
<p>The sum of 1 + 1 is not {{1 + 1 + getVal()}}</p>
```

Angular는 이중 중괄호 안에 있는 모든 표현식을 평가(계산)하고, 표현식 결과를 문자열로 변환한 다음 인접한 리터럴 문자열과 연결 합니다.
마지막으로 이 복합보간결과를 요소 또는 directive 속성에 치환 합니다.

태그요소 사이에 결과를 삽입 하고, 속성에 할당하는 것으로 생각하는 것이 편리하며, 잘못 입력 되더라도 에러를 발생 시키지 않습니다.
보간은 Angular가 속성 바인딩으로 변환하는 특수구문 으로 아래에서 설명합니다.

하지만 먼저 템플릿 표현식과 문장을 자세히 살펴 보겠습니다.

## Template 표현식

템플릿 표현식은 주로 값을 생성 합니다. Angular는 표현식을 실행하고 바인딩 대상 속성에 할당합니다.
대상은 HTML 요소, component 또는 directive(지시문) 일 수도 있습니다.

{{1 + 1}} 을 쓸 때 우리는 보간 중괄호 안에 템플릿 표현식을 넣고, 속성 바인딩은 [property]="expression" 와 같이 사용합니다.

템플릿 표현식은 JavaScript의 표현식과 비슷한 언어로 작성되지만, 예외도 있습니다.
부작용이 있거나 부작용을 조장하는 JavaScript 표현식은 다음을 포함하여 금지 됩니다.

- assignments (=, + =, - =, ...)
- new
- ; 나 , 를 이용해서 연속적으로 표현하는 식
- 증가 및 감소 연산자 (++ or --)

JavaScript 구문과 다른 주목할 만한 차이점은 다음과 같습니다.

- 비트 연산자를 지원하지 않는다. (| or &)
- 새로운 템플릿 표현 연산자 (| and ?)

### 표현식 context

아마도 템플릿 표현식의 놀라운 점은 전역 네임 스페이스의 어떤 것도 참조 할 수 없다는 것입니다.
그들은 window나 document를 참조 할 수 없습니다. 또한 console.log 나 Math.max를 호출 할 수 없습니다. 표현식 컨텍스트는 참조 멤버로 제한되어 있기 때문입니다.

표현 컨텍스트는 일반적으로 바인딩 값의 소스인 component의 인스턴스 입니다.

제목이 이중 중괄호 {{title}}로 묶인 것을 볼 때, title은 데이터 바인딩 된 component의 속성 이라는 것을 알고 있습니다.
[disabled]="isUnchanged" 에서 isUnchanged를 볼 때 우리는 해당 component의 isUnchanged 속성을 참조하고 있음을 알 수 있습니다.

표현 컨텍스트 에는 component가 아닌 다른 객체가 포함될 수 있습니다. [템플릿 참조 변수](https://angular.io/docs/ts/latest/guide/template-syntax.html#ref-vars)는 이러한 대체 컨텍스트 개체 중 하나 입니다.

### 표현식 가이드라인

템플릿 표현식은 응용프로그램을 만들거나, 중지 할 수도 있습니다.
다음 지침을 참고 하십시오.

- side effects 없게 하라.
- 간단한 실행문.
- 간소화 해라.
- idempotent 표현식(멱등원 - 어떤 조작을 몇 번을 반복해도 결과가 동일한 것)

특정 상황에 꼭 필요한 일이 아니라면, 이 지침의 예외조항을 두지 마십시요.

#### side effects 없게 하라.

템플릿표현식은 대상 속성값 이외의 응용 프로그램 상태 변경을 위해서 사용 해서는 안됩니다.

이 규칙은 Angular 의 "단방향 데이터 흐름" 정책에 필수적 입니다.
이것을 지킴으로써, component 값을 변경하면 다른 표시된 값이 변경 될 수 있다는 점에 대해서 걱정할 필요가 없습니다.
뷰는 단일 렌더링 단계에서 안정적이어야만 합니다.

#### 간단한 실행문

Angular는 생각보다 자주 템플릿 표현식을 실행 합니다. 키를 누르거나 마우스를 움직일 때마다 호출 할 수 있습니다.
표현식은 빠르게 끝나야 하며, 특히 느린 기기의 경우 사용자 경험이 저하될 수 있습니다. 계산이 복잡할 때 다른 곳에서 계산된 값 캐싱을 고려하십시오.

#### 간소화

상당히 복잡한 템플릿 표현식을 작성할 수도 있지만 사용하지 마십시요.

속성 이름 또는 메서드 호출이 기본적 사용방법 이어야 합니다.
간혹 boolean 부정(!) 같은 것이 문제가 되지는 않습니다.
그외에 응용 프로그램과 비즈니스 로직을 component 자체에 한정하십시오. 개발 및 테스트가 더 쉬울 것입니다.

#### idempotent 표현식

idempotent 표현식은 부작용이 없고, Angular의 변경 감지 성능을 향상 시키기 때문에 이상적입니다.

Angular term에서, 멱등원(idempotent) 표현식은 종속 변수 값 중 하나가 변경 될 때까지 항상 똑같은 것을 반환 합니다.

이벤트 루프의 단일 회전 중에는 종속 값이 변경 되어서는 안됩니다.
멱등 수식이 문자열이나 숫자를 반환하면 행에서 두 번 호출 될 때 동일한 문자열 또는 숫자를 반환합니다.
표현식이 객체 (Array 포함)를 반환하면 행에서 두 번 호출 될 때 동일한 객체 참조를 반환합니다.

## Template 명령문

템플릿 명령문은 요소, component 또는 directive와 같은 바인딩 대상에서 발생하는 이벤트에 응답 합니다.

우리는 `(event)="statement"` 와 같이 = 기호의 오른쪽에 따옴표로 나타나는 이벤트 바인딩 섹션에 템플릿 명령문을 보게 됩니다.

템플릿 명령문은 부수적인 효과를 가지고 있는데, 사용자 입력에 따라서 응용 프로그램 상태를 업데이트 합니다. 그렇지 않으면 이벤트에 응답할 이유가 없기 때문 이지요.

> 이벤트에 응답하는 것은 Angular "단방향 데이터 흐름"의 또 다른 측면 입니다. 이벤트 루프가 진행되는 동안 어디서나 자유롭게 변경 됩니다.

템플릿 표현식과 마찬가지로 템플릿 명령문은 JavaScript와 비슷한 언어를 사용 합니다.
템플릿 명령문 분석기는 템플릿 표현식구문 분석기와 다르고, 특히 기본 지정식(=)과 연쇄 표현식(; or ,)을 모두 지원합니다.

그러나 특정 JavaScript 구문은 허용되지 않습니다.

- new
- 증가 및 감소 연산자, ++ 및 -
- += 및 -= 과 같은 연산자 할당
- 비트 연산자 | 및 "
- 템플릿 표현 연산자

### 문장의 context

표현식 에서와 마찬가지로 명령문은, `명령문 context` 에 있는 항목(일반적으로 이벤트를 바인딩 할 component 인스턴스) 만 참조 할 수 있습니다.

템플릿 명령문은 전역 namespace의 어떤 것도 참조 할 수 없습니다. 이것들은 `window` 나 `document` 를 참조 할 수 없고, `console.log` 나 `Math.max`를 호출 할 수도 없습니다.

`(click)="onSave()"` onSave 는 데이터 바인딩 된 component 인스턴스의 메서드 여야만 합니다.

명령문 컨텍스트 에는 component 가 아닌 다른 오브젝트가 포함될 수 있습니다.
템플릿 참조 변수는 이러한 대체 컨텍스트 객체 중 하나 입니다.

우리는 발생된 이벤트의 "메시지" 또는 "페이로드" 를 나타내는 이벤트 바인딩 문에서 예약된 `$event` 심볼을 자주 볼 수 있을 것입니다.

### 문장의 가이드라인

표현식과 마찬가지로 복잡한 템플릿 문을 작성하지 마십시오. 메소드 호출 또는 간단한 특성 할당이 작성 기준이 되어야 합니다.

이제 템플릿 표현식 및 문장에 대한 느낌을 알게 되었으므로, 보간법 이상의 다양한 데이터 바인딩 구문에 대해 배울 준비가 되었습니다.

## 바인딩 구문 : 개요

데이터 바인딩은 사용자가 애플리케이션 데이터값 으로 보는 것을 조정 하기 위한 메커니즘 입니다.
HTML 에서 값을 땡겨 오거나 값을 밀어 넣을 수는 있지만, 이러한 작업을 바인딩 프레임워크로 바꾸면 응용 프로그램의 write,read 등을 유지 하는 것이 더 쉽습니다.
우리는 단순히 바인딩 소스와 타겟 HTML 요소 사이의 바인딩을 선언하고 프레임 워크가 작동 하도록 할 수 있습니다.

Angular 는 많은 종류의 데이터 바인딩을 제공하며, 이 장에서 각각에 대해 논의 할 것입니다.

먼저 Angular 데이터 바인딩과 구문에 대해 자세히 살펴 봅시다.
모든 바인딩을 데이터가 흐르는 방향에 따라 세 가지 범주로 그룹화 할 수 있습니다.

각 카테고리에는 고유한 구문이 있습니다.

| Data direction                            | Syntax                                                            | Binding type                                 |
|-------------------------------------------|-------------------------------------------------------------------|----------------------------------------------|
| view target에서 데이터 소스로의 단방향    | {{expression}}<br>[target] = "expression"<br>bind-target = "expression" | Interpolation<br>Property<br>Attribute<br>Class<br>Style |
| 데이터 소스에서 view target 으로의 단방향 | (target) = "statement"<br>on-target = "statement"                    | Event                                        |
| 양방향                                    | [(target)] = "expression"<br>bindon-target = "expression"            | Two-way                                      |

보간법 이외의 대상의 등호(=) 왼쪽에 ([], ())로 둘러 싸거나 접두어`(bind-, on-, bindon-)` 등을 사용할 수 있습니다.

그 대상 이란 것은 무엇 일까요?
이 질문에 답하기 전에 Angular의 템플릿 HTML을 새로운 시각으로 봐야 합니다.

### 새로운 mental 모델

데이터 바인딩의 모든 기능과 HTML 어휘를 사용자 정의 마크업으로 확장 할 수 있으므로, 템플릿 HTML을 HTML Plus 로 생각할 수 있습니다.

HTML 플러스 입니다. 그러나 우리가 익숙했던 HTML과 크게 다르지는 않습니다.

HTML 개발의 일반적인 과정은, HTML 요소로 시각적 구조를 만들고, 요소의 속성에 상수를 대입하여 수정을 합니다.

```html
<div class="special">Mental Model</div>
<img src="images/hero.png">
<button disabled>Save</button>
```

우리는 Angular 템플릿으로 속성 값을 초기화 하고, 구조를 생성할 것입니다.

그런 다음 우리는 navtive HTML 요소로 만든 템플릿을 HTML로 캡슐화 하고, component 에 주입하여 새로운 요소를 만드는 방법을 배울 것입니다.

```html
<!-- Normal HTML -->
<div class="special">Mental Model</div>
<!-- Wow! A new element! -->
<hero-detail></hero-detail>
```

조금 더 덧붙여진 HTML 입니다.

이제 데이터 바인딩에 대해 배워 보죠. 첫번째 바인딩은 다음과 같이 보일 수 있습니다.

```html
<!-- Bind button disabled state to `isUnchanged` property -->
<button [disabled]="isUnchanged">Save</button>
```

특유의 괄호 표기법을 잠깐 살펴 보겠습니다. 딱 보기에는 버튼의 disabled 속성을 바인딩하고, component의 isUnchanged 속성을 현재 값으로 설정 한다는 것 같습니다.

하지만 직감이 잘못되었습니다! 우리의 일상적인 HTML 모델은 우리를 혼란스럽게 합니다. 사실 데이터 바인딩을 시작하면 더 이상 HTML 속성은 의미가 없습니다.
우리는 DOM 요소의 HTML 속성을 설정하는 것이 아닙니다. component 및 directive 의 속성을 설정 하고 있습니다.

### HTML attribute vs. DOM property

HTML 속성과 DOM 속성을 구별하는 것은 Angular 바인딩이 작동 하는 방식을 이해 하는데 중요합니다.

Attribute는 HTML 에 의해 정의 됩니다. Property는 DOM(Document Object Model)에 의해 정의 됩니다.

- 몇 가지 HTML attribute는 property에 1:1 로 매핑 됩니다. id 가 하나의 예입니다.
- 일부 HTML attribute는 해당 property가 없습니다. colspan 은 하나의 예입니다.
- 일부 DOM 속성에는 해당 속성이 없습니다. textContent는 한 가지 예입니다.
- 많은 HTML 속성이 속성에 매핑되는 것처럼 보입니다. 그러나 우리가 생각할 수 있는 방식으로는 아닙니다!



