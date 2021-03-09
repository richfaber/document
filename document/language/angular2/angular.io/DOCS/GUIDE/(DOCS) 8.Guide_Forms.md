> angular.io > DOCS > GUIDE > [8. Forms](https://angular.io/docs/ts/latest/guide/forms.html)
> 2016/12월 기준 으로 작성 되었고, 의역 하였고, 오역이 있습니다.

# FORMS

- Form은 응집력 있고 효과적이며 매력적인 데이터 입력 경험을 제공합니다. Angular form은 데이터 바인딩 된 사용자 컨트롤 집합을 조정하고 변경 내용을 추적하며 입력의 유효성을 검사하고 오류를 표시합니다.

우리는 로그인을 하고, 주문을 하고, 비행기 예약을 하고, 회의 일정을 잡는 등의, 수 많은 데이터 입력 작업을 수행하기 위해 submit 요청form을 제출합니다. form은 비즈니스 애플리케이션의 메인 입니다.

모든 노련한 웹개발자가 올바른 태그가 포함된 HTML form 을 작성할 수는 있지만, form 제출 뒤의 효율적이고 효과적으로 사용자를 안내 하는 일관된 데이터 입력 환경을 만드는 것은 어려운 일입니다.

솔직히 이러한 것들은, 이 안내서의 범위를 벗어나는 설계 기술을 필요로 하고, 양방향 데이터 바인딩, 변경 추적, 유효성 검사 및 오류 처리에 대한 프레임 워크 지원이 필요 합니다...

이 가이드 에서는 Angular form 에 대해 설명하고자 합니다.

한 번에 한 단계 씩 간단한 form을 만들 것입니다.

- component와 템플릿을 사용하여 Angular form 만들기

- 입력 컨트롤에 값을 읽고 쓰기 위한 [(ngModel)] 구문을 사용하는 양방향 데이터 바인딩

- form 과 함께 ngModel을 사용하여 form 컨트롤의 변경 상태 및 유효성을 추적.

- 컨트롤의 상태를 추적하는 특수 CSS 클래스를 사용하여 강력한 시각적 피드백 제공

- 사용자 에게 유효성 검사 오류를 표시하고 form 컨트롤을 활성화/비활성화.

- HTML 요소간에 정보를 공유하기 위해 템플릿 참조 변수 사용

[실제 예제](https://angular.io/resources/live-examples/forms/ts/eplnkr.html)를 실행 하십시오.

## 템플릿 기반 form

많은 사람들이 이 안내서 에서 설명하는 `form-specific directive` 및 기법을 사용하여, Angular 템플릿 구문으로 템플릿을 작성하여 form 을 작성합니다.

> 이것이 form을 만드는 유일한 방법은 아닙니다.

Angular 템플릿 (로그인 양식, 연락 양식 ... 거의 모든 비즈니스 양식) 으로 필요한 거의 모든 form을 만들 수 있습니다.

창의적으로 컨트롤을 배치 하고, 데이터에 바인딩하고, 유효성 검사 규칙을 지정하고, 유효성 검사 오류를 표시하고, 특정 컨트롤을 조건부로 활성화 또는 비활성화 하고, 내장된 시각적 피드백을 트리거 하는 등의 작업을 수행 할 수 있습니다.

Angular가 반복적인 지루한 단순 작업 중 많은 부분을 처리하기 때문에 우리는 스스로 어려움을 겪지 않아도 됩니다.

다음 템플릿 기반 form을 작성해 봅시다.

![](https://lh3.googleusercontent.com/-5LmDFcmNz1I/WFHSO0Pfz6I/AAAAAAAAPwA/GYGk6Sh0JU0/I/hero-form-1.png)

`영웅 고용 대행사` 에서 우리는 이 form 을 사용하여 우리의 안정적인 영웅의 개인 정보를 유지하고 있습니다.

모든 영웅은 일자리가 필요 합니다. 적절한 위기의 영웅을 구하는 것이 우리 회사의 사명 입니다!

이 form 의 세 필드 중 두 개가 필수 입니다. 필수 입력란은 쉽게 찾을 수 있도록 왼쪽에 녹색 막대가 있습니다.

영웅 이름을 삭제하면 form 의 attention grabbing 스타일의 유효성 검사 오류가 표시 됩니다.

![](https://lh3.googleusercontent.com/-82htMxCvf-Y/WFHSO6TZlsI/AAAAAAAAPwE/48qcjoQvTuw/I/hero-form-2.png)

submit 버튼이 비활성화 되고, input 컨트롤의 왼쪽 에있는 "required" 막대가 녹색 에서 빨간색 으로 변경 되었습니다.

> 우리는 표준 CSS로 "required" 표시 줄의 색상과 위치를 정의 하였습니다.

이 form을 단계별로 작성해 보겠습니다.

1. Hero 모델 클래스 만들기
2. form을 제어하는 component 만들기
3. 초기 form 레이아웃을 사용하여 템플릿 만들기
4. ngModel 양방향 데이터 바인딩 구문을 사용 하여 각 form의 input 컨트롤에 데이터 속성 바인딩
5. 각 form의 input 컨트롤에 name 속성 추가
6. 사용자 정의 CSS를 추가 하여 시각적 피드백 제공
7. 유효성 검사 오류 메시지 표시 및 숨기기
8. ngSubmit 으로 form 제출 처리
9. form 이 유효 할 때까지 form 제출 단추를 사용 불가능하게 하십시오.

## 설치

Angle-forms 라는 이름의 새 프로젝트를 작성 하는 [setup](https://angular.io/docs/ts/latest/guide/setup.html) 지시 사항을 따르십시오.

## Hero 모델 클래스 만들기

우선 사용자가 form 데이터를 입력하면 변경 사항을 감지하고 모델 인스턴스를 업데이트 해야 합니다.

모델은 "property bag" 처럼 간단하게 생각할 수도 있지만, 아주 중요합니다.
세 가지 필수 입력란 (id, name, power)과 하나의 선택 필드 (alterEgo)를 Hero 클래스의 모델로 설정해 보겠습니다.

hero.ts 라는 앱 폴더에 새 파일을 만들고 다음 클래스 정의를 지정하세요.

**[app/hero.ts]**

```typescript
export class Hero {
	constructor(
    	public id: number,
        public name: string,
        public power: string,
        public alterEgo?: string
    ) {

    }
}
```

요구사항이 거의 없고, 동작 없는 빈 모델 입니다. 우리의 데모에 딱 맞습니다.

TypeScript 컴파일러는 각 public 생성자 매개 변수에 대한 public 필드를 생성 하고,
새 영웅을 만들 때 해당 필드에 매개 변수의 값을 자동으로 할당 합니다.

alterEgo는 선택사항 이며, 생성자는 이를 생략 할 수 있습니다. alterEgo에 (?)를 적어 두십시오.

우리는 다음과 같이 새로운 영웅을 생성할 수 있습니다:

```typescript
let myHero =  new Hero(42, 'SkyDog',
                       'Fetch any object at any distance',
                       'Leslie Rollover');
console.log('My hero is called ' + myHero.name); // "My hero is called SkyDog"
```

## Form component 만들기

Angular form은 HTML 기반 템플릿과 데이터 및 사용자 상호작용을 처리 하는 component 클래스의 두 부분 으로 구성 됩니다.
간단히 말해서 우리는 영웅에게 무엇을 할 수 있도록 하는 수업을 시작합니다.

hero-form.component.ts 라는 새 파일을 만들고 다음과 같이 정의 하십시오.

**[app/hero-form.component.ts]**

```typescript
import { Component } from '@angular/core';
import { Hero }    from './hero';
@Component({
  moduleId: module.id,
  selector: 'hero-form',
  templateUrl: 'hero-form.component.html'
})
export class HeroFormComponent {
  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
  submitted = false;
  onSubmit() { this.submitted = true; }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
```

이 component는 특별한 것이 없으며, 이전에 작성한 component와 차이가 없습니다.

이 component를 이해 하려면 이전 가이드 에서 배운 angular 개념만 있으면 됩니다.

1. 일반적으로 Angular 라이브러리에서 Component 데코레이터를 가져옵니다.
2. 방금 만든 Hero 모델을 가져옵니다.
3. "hero-form" 이라는 @Component selector의 값은, 이 form 을 `<hero-form>` 태그가 있는 상위 템플릿에 놓을 수 있음을 의미 합니다.
4. moduleId : module.id 속성은 templateUrl 의 module-relative 로딩을 위한 기준을 설정 합니다.
5. templateUrl 속성은 hero-form.component.html 이라는 템플릿 HTML에 대한 별도의 파일을 가리킵니다.
6. 모델과 `powers` 에 대한 테스트용 데이터를 데모로 정의 했습니다. 실제 데이터를 가져와 저장 하거나 이러한 component를 부모 component에 바인딩 하기 위한 input 및 output 을 제공하기 위해서는 데이터 서비스를 삽입 해야 합니다.
7. 우리는 모델의 JSON 표현을 return 하기 위해 마지막에 diagnostic 속성을 두었습니다. 이것은 개발과정 에서 model의 변화를 보는데 도움이 될 것입니다. 나중에 폐기하기 위해 정리 메모를 남겼습니다.

### 별도의 template 파일을 왜 만들었죠?

다른 예제에 있는 것처럼, 템플릿을 component 파일에 인라인으로 작성 하지 않은 이유는 무엇입니까?

모든 경우에 대해 "정답"은 없습니다. 우리는 짧은 인라인 템플릿을 좋아합니다.
대부분의 form 템플릿은 짧지 않습니다. TypeScript 및 JavaScript 파일은 일반적으로 HTML을 많이 쓰거나 읽는 데 적합하지 않으며, HTML과 코드가 혼합된 파일에 도움을 주는 에디터는 거의 없습니다. 우리는 또한 이와 같이 명확하고 분명한 목적을 가진 짧은 파일을 좋아 합니다.

form 템플릿은 소수의 필드를 표시 할 때도 상당히 많은 코드를 가지게 되는 경향이 있으므로, 일반적으로 HTML 템플릿을 별도의 파일에 저장하는 것이 가장 좋습니다.
우리는 잠시후 그 템플릿 파일을 쓸 것입니다. 시작하기 전에 우리는 한 걸음 물러서서 새로운 `HeroFormComponent` 를 사용하기 위해 app.module.ts 및 app.component.ts를 수정해야 합니다.

## app.module.ts 수정

app.module.ts는 프로그램의 루트 모듈을 정의 합니다.
여기서는 응용 프로그램에서 사용할 외부 모듈을 확인하고 HeroFormComponent와 같은 이 모듈에 속한 component를 선언 합니다.

템플릿-중심 form은 자체모듈에 있기 때문에, form을 사용하려면 응용 프로그램 모듈에 대한 import 배열에 FormsModule을 추가 해야합니다.

"QuickStart"버전의 내용을 다음으로 교체하십시오 :

**[app/app.module.ts]**

```typescript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { HeroFormComponent } from './hero-form.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HeroFormComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

> 세가지 변화가 있습니다.
>
> 1. 우리는 FormsModule과 새로운 HeroFormComponent를 import 합니다.
> 2. FormsModule을 ngModule 데코레이터에 정의한 imports 목록에 추가합니다. 이렇게 하면 응용 프로그램에서 ngModel을 비롯한 모든 템플릿 기반 form 기능에 접근 할 수 있습니다.
> 3. HeroFormComponent를 ngModule 데코레이터에 정의한 declarations 목록에 추가 합니다. 이 모듈을 통해 HeroFormComponent component를 볼 수 있습니다.
> 
> component, directive 또는 pipe가 imports 배열의 모듈에 속하는 경우, declarations 배열에서 다시 선언하지 마십시오. 이 모듈에 작성해야 한다면 declarations 배열에 선언하십시오.

## app.component.ts 수정

app.component.ts 는 프로그램의 루트 component 입니다. 새로운 HeroFormComponent를 호스팅 할 것입니다.

"QuickStart" 버전의 내용을 다음으로 교체하십시오 :

**[app/app.component.ts]**

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: '<hero-form></hero-form>'
})
export class AppComponent { }
```

> 단 하나의 변화가 있습니다. 템플릿은 단순히 component의 selector 속성 으로 식별되는 새로운 요소 태그 입니다.
응용 프로그램 component가 로드 될 때 영웅 form이 표시됩니다.

## 초기 HTML form 템플릿 작성

hero-form.component.html 라는 새 템플릿 파일을 만들고 다음의 내용을 넣습니다.

**[app/hero-form.component.html]**

```typescript
<div class="container">
    <h1>Hero Form</h1>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" required>
      </div>
      <div class="form-group">
        <label for="alterEgo">Alter Ego</label>
        <input type="text" class="form-control" id="alterEgo">
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
</div>
```

이것은 평범하고 오래된 HTML 입니다. 우리는 영웅 필드인 name과 alterEgo 중 두 가지를 제시하고, 이를 input-box에 사용자 입력을 위해 열었습니다.

Name `<input>` 컨트롤 에는 required 특성이 있습니다. alterEgo 는 선택 사항 이므로 Alter Ego `<input>` 컨트롤은 required가 없습니다.

하단에 submit 버튼이 있고, 약간의 클래스로 스타일을 지정하고 있습니다.

아직 Angular는 사용하지 않았습니다. 바인딩된 것도 없습니다. 추가 directive도 없습니다. 그냥 레이아웃 입니다.

`container`, `form-group`, `form-control` 및 `btn` 클래스는 [Twitter Bootstrap](http://getbootstrap.com/css/) 에서 가져 옵니다.
순전히 화장품 같은 것입니다. Bootstrap을 사용하여 form 에 약간의 스타일을 부여해 봅시다!

### Angular form은 스타일 라이브러리를 요구하지 않습니다.

> Angular는 컨테이너, 폼 그룹, 폼 컨트롤, btn 클래스 또는 외부 라이브러리의 스타일을 사용하지 않습니다. Angular 응용 프로그램은 모든 CSS 라이브러리를 사용할 수도 있고, 전혀 사용하지 않을 수도 았습니다.

스타일 시트를 추가해 봅시다.

- 응용 프로그램 루트 폴더에서 터미널 창을 열고 다음 명령을 입력하고 bootstrap을 다운로드 받으십시요.

```command
npm install bootstrap --save
```

- 또는 index.html 을 열고 `<head>` 에 다음 링크를 추가하십시오.

```html
<link rel="stylesheet" href="https://unpkg.com/bootstrap@3.3.7/dist/css/bootstrap.min.css">
```

## *ngFor를 이용해서 Powers 삽입

우리의 영웅은 에이전시가 제공한 powers 목록에서 슈퍼 파워를 선택할 수 있습니다.
우리는 그 목록을 HeroFormComponent에서 내부적으로 유지 합니다.

이전에 [데이터 표시 가이드](https://angular.io/docs/ts/latest/guide/displaying-data.html) 에서 보았던 기술인 `ngFor`를 사용하여 선택 항목을 form 에 추가하고, 옵션을 powers 목록에 바인딩 합니다.

Alter Ego 그룹 바로 아래에 다음 HTML을 추가하십시오.

**[app/hero-form.component.html (excerpt)]**

```html
<div class="form-group">
  <label for="power">Hero Power</label>
  <select class="form-control" id="power" required>
    <option *ngFor="let pow of powers" [value]="pow">{{pow}}</option>
  </select>
</div>
```

우리는 powers 목록에서 각 파워에 대해 `<options>` 태그를 반복합니다. pow 템플릿 입력변수는 각 반복 에서 다른 power 들입니다.
이중 중괄호 보간 구문을 사용하여 이름을 표시합니다.

## ngModel 과 함께 하는 양방향 데이터 바인딩

지금 앱을 실행하면 실망 할 것입니다.

![](https://lh3.googleusercontent.com/-ma5HEDLl_fo/WFHSPCkOhwI/AAAAAAAAPwI/fXlh2mrPzp0/I/hero-form-3.png)

우리는 아직 영웅을 바인딩 하지 않았기 때문에, 영웅 데이터를 볼 수 없습니다.
우리는 이전 가이드 에서 하는 법을 배웠습니다. [Displaying Data절](https://angular.io/docs/ts/latest/guide/displaying-data.html)은 속성 바인딩을 우리에게 알려주는 절입니다.
[User Input절](https://angular.io/docs/ts/latest/guide/user-input.html)은 이벤트 바인딩을 사용하여 DOM 이벤트를 수신하는 방법과 표시된 값으로 component 속성을 업데이트하는 방법을 보여주었습니다.

이제 우리는 동시에 표시, 듣기 및 구해내는 것을 할 것입니다.

우리는 이러한 기술들을 다시 사용할 수도 있지만, 새로운 형태의 [(ngModel)] 문법을 도입하여 우리의 form을 매우 쉽게 모델에 바인딩 할 수 있습니다.

"Name"에 대한 `<input>` 태그를 찾아 다음과 같이 업데이트하십시오

**[app/hero-form.component.html (excerpt)]**

```html
<input type="text"  class="form-control" id="name" required [(ngModel)]="model.name" name="name">
TODO: remove this: {{model.name}}
```

> 우리는 input 태그 뒤에 보간법을 추가 하여 최근 데이터를 볼 수 있습니다. 이후에 버리겠다는 메모를 남겼습니다.

바인딩 구문을 주의깊게 보십시요. [(ngModel)] = "...".

이제 앱을 실행하고 name input-box에 문자를 추가하거나 삭제 하면, 텍스트 에서 문자가 나타나고 사라지는 것을 볼 수 있습니다.
어떤 시점 에는 이렇게 보일 수도 있습니다.

![](https://lh3.googleusercontent.com/-yTleJWWnWhY/WFHSPR2Y-6I/AAAAAAAAPwM/6dX7BKdpKjA/I/ng-model-in-action.png)

보간법으로 표기해서 보고 있는 model.name은 우리가 실제로 input-box 에 입력한 값이 모델로 다시 전달 되고 있다는 증거 입니다.
양방향 데이터 바인딩 입니다!

`<input>` 태그에 name 속성을 추가하고, 영웅의 이름에 "name" 을 설정 한 것에 주목하십시오.
고유한 값으로 아무거나 사용해도 되지만, 설명이 포함된 이름을 사용하면 도움이 됩니다.
`[(ngModel)]`을 form 과 함께 사용하는 경우, name 속성을 정의 하는 것이 필요합니다.

> 내부적으로 Angular는 FormControl을 만들고 `<form>` 태그에 Angular 라는 NgForm directive을 등록합니다. angular FormControl은 name 속성에 지정한 이름으로 등록 됩니다. NgForm 에 대해서는 나중에 [이 가이드](https://angular.io/docs/ts/latest/guide/forms.html#ngForm) 에서 다룰 것입니다.

유사한 `[(ngModel)]` 바인딩과 name 속성을 Alter Ego 와 Hero Power 에도 추가합시다.
우리는 input-box 바인딩 메시지를 버리고, 맨 위에다가 바인딩 되는 것을 확인하기 위해 component 의 diagnostic 를 추가할 것입니다.
그런 다음 양방향 데이터 바인딩이 영웅 모델 전체 에서 어떻게 작동하는지 확인해 봅시다.

수정 후에는 form 의 핵심 부분에 다음과 같이 세 개의 [(ngModel)] 바인딩 및 이름 속성이 있어야 합니다.
(diagnostic도 추가되어 있습니다.)

**[app/hero-form.component.html (excerpt)]**

```typescript
{{diagnostic}}
<div class="form-group">
  <label for="name">Name</label>
  <input type="text" class="form-control" id="name" required [(ngModel)]="model.name" name="name">
</div>
<div class="form-group">
  <label for="alterEgo">Alter Ego</label>
  <input type="text"  class="form-control" id="alterEgo" [(ngModel)]="model.alterEgo" name="alterEgo">
</div>
<div class="form-group">
  <label for="power">Hero Power</label>
  <select class="form-control"  id="power"
          required
          [(ngModel)]="model.power" name="power">
    <option *ngFor="let pow of powers" [value]="pow">{{pow}}</option>
  </select>
</div>
```

- 각 input 요소 에는 label 요소의 for 속성이 input 컨트롤에 레이블을 일치 시키는 데 사용하는 id 속성이 있습니다.
- 각 input 요소의 name 속성은 angular Forms에 form과 콘트롤을 등록 하는데에 필요합니다.

지금 앱을 실행하고 form의 영웅 모델 속성을 변경 하면 다음과 같이 표시 될 수 있습니다.

![](https://lh3.googleusercontent.com/-ha7CKRTLCmM/WFHSPXqKi8I/AAAAAAAAPwQ/Vx-42zq8gI4/I/ng-model-in-action-2.png)

form 상단의 diagnostic은 모든 변경 사항이 모델에 반영 되었음을 확인합니다.

상단의 {{diagnostic}}은 목적을 달성 했으므로 삭제하십시오.


### Inside [(ngModel)]

이 섹션은 [(ngModel)]에 대한 심층적인 다이빙 입니다. 관심이 없다? 앞으로 건너 뜁시다!

바인딩 구문의 구두점 ([])은 무슨 일이 일어나는가 에 대한 좋은 단서 입니다.

`속성바인딩` 된 요소의 값은, 값이 변경될 때, 변경된 값이 모델의 `대상속성` 으로 전달 됩니다.
우리는 `대상속성`을 괄호 [] 안에 그 이름을 넣어 식별합니다.
이것은 모델에서 뷰로 흐르는 단방향 데이터 바인딩 입니다.

`이벤트바인딩` 된  `대상속성` 들은, 자신의 값을 모델로 흘려 보냅니다.
괄호안의 속성으로 들어간 것(괄호로 둘러쌓인) 들을, `대상속성` 으로 식별하고, 뷰에서 모델로 흐르는 단방향 데이터 바인딩 입니다.

Angular는 이 두가지를 겹합하여, `[()]` 양방향 데이터 바인딩과 양방향 데이터 흐름을 표현합니다.

사실, 2개의 바인딩을 사용해서, `<input>` 에 값이 변경됨에 따라 NgModel 바인딩 으로 흐르는, 똑같은 행위을 구현할 수도 있습니다.

**[app/hero-form.component.html (excerpt)]**

```typescript
<input type="text" class="form-control" id="name"
       required
       [ngModel]="model.name" name="name"
       (ngModelChange)="model.name = $event" >
  TODO: remove this: {{model.name}}
```

속성 바인딩은 익숙하지만, 이벤트 바인딩은 이상해 보일 수도 있습니다.

`ngModelChange`는 `<input>` 요소의 표준 이벤트가 아닙니다.
실제로 `NgModel` directive 의 이벤트 속성입니다.
Angular 는 `[(x)]` 형식의 바인딩 대상을, x input 속성과 `xChange` output 속성을 가지는 `x` directive일 것이라고 당연하게 생각합니다.

다른 이상한 점은, 템플릿 표현인 `model.name = $event` 입니다. 우리는 DOM 이벤트에서 오는 `$event` 객체를 보는데 익숙합니다.
`ngModelChange` 속성은 DOM 이벤트를 생성하지 않습니다. 이것은 model의 값이 변경 됐을 때, input-box의 값을 반환하는 `Angular EventEmitter` 속성 입니다. 모델의 name 속성에 반드시 $event를 지정 해줘야 합니다.

들여다보면 실용적 이지는 않습니다. 우리는 거의 [(ngModel)]을 선호하게 될 것입니다. 만약 debounce 나 keystrokes throttle과 같은 이벤트 핸들링에서 특별한 부분을 건드려야 한다면 바인딩을 분리 할 경우가 있을수도 있습니다.

[템플릿 구문설명서](https://angular.io/docs/ts/latest/guide/template-syntax.html) 에서 `NgModel` 및 기타 템플릿 구문에 대해 자세히 알아보십시오.

## ngModel을 사용하여 상태변경 및 유효성 추적

form은 단지 데이터 바인딩에 관한 설명은 아닙니다.

우리는 우리가 만든 form의 변경 되는 상태를 알고 싶을 것입니다.

form 에서 ngModel을 사용하면 두 가지 방식의 데이터 바인딩 이상의 것을 얻을 수 있습니다.
또한 사용자가 컨트롤을 터치 했는지, 값이 변경되었는지 또는 값이 유효하지 않은지 여부를 알려줍니다.

NgModel directive는 상태를 감지하거나 추적하지는 않습니다.
Angular는 상태를 반영하는 특별한 CSS 클래스를 제공합니다.

클래스 이름을 사용하여 컨트롤의 모양을 변경하고 메시지를 표시하거나 사라지게 할 수 있습니다.

| State | Class if true | Class if false |
|-------|---------------|----------------|
| Control has been visited | ng-touched | ng-untouched |
| Control's value has changed | ng-dirty | ng-pristine |
| Control's value is valid | ng-valid | ng-invalid |

`<input>` 태그에 spy 라는 임시 템플릿 참조 변수를 추가하고, spy를 사용하여 해당 클래스를 표시해 보죠.

**[app/hero-form.component.html (excerpt)]**

```html
<input type="text" class="form-control" id="name"
  required
  [(ngModel)]="model.name" name="name"
  #spy >
<br>TODO: remove this: {{spy.className}}
```

이제 앱을 실행하고 Name input-box 에 초점을 맞춥니다. 다음 4 단계를 정확하게 따르십시오.

1. 보기만 하고 만지지는 마세요.
2. input-box를 클릭 한 다음 text타입의 input-box 바깥 쪽을 클릭하십시오.
3. 이름 끝에 슬래시를 추가하십시오.
4. 이름을 지워보세요

동작과 효과는 다음과 같습니다.

![](https://lh3.googleusercontent.com/--gSUndacL98/WFHSP-IDNoI/AAAAAAAAPwU/DpwkIaiB6Sg/I/control-state-transitions-anim.gif)

다음의 4가지 방식으로 클래스 이름과 동작이 설명 됩니다.

![](https://lh3.googleusercontent.com/-l1PQXph3Inc/WFHSP8TZrCI/AAAAAAAAPwY/MwOtUllls9Y/I/ng-control-class-changes.png)

(ng-valid | ng-invalid) 는 가장 흥미 롭습니다.
데이터가 올바른 값이여야 하고, 필수 입력란 임을 표시 하려는 경우, 강력한 시각적 신호를 보내려고 합니다.
따라서 시각적 피드백을 위해 맞춤 CSS를 추가해 보세요.

`#spy` 템플릿 참조 변수와 TODO 는 삭제 하셔도 됩니다.

## 시각적 피드백을 위한 맞춤 CSS 추가

input-box 왼쪽의 색상 막대를 사용하여 필수 입력란과 잘못된 데이터를 동시에 표시해 보죠.

![](https://lh3.googleusercontent.com/-STKzQBq68ho/WFHSQMTl8tI/AAAAAAAAPwc/fgqBq-FM72Q/I/validity-required-indicator.png)

이 효과는 새로운 forms.css 파일에 두 가지 스타일을 추가하여, 프로젝트에 index.html 의 추가하는 방식으로 이루어집니다.

**[forms.css]**

```css
.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}
```

이 스타일은 두 개의 Angular 유효성 클래스와 HTML 5 "required" 속성을 사용 합니다.

이 스타일 시트를 포함하도록 index.html의 `<head>`를 업데이트 하십시요.

**[index.html (excerpt)]**

```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="forms.css">
```

## 유효성 검사에 따라 오류 메시지 표시 및 숨기기

"Name" 이라는 라벨의 input-box 는 필수 항목 입니다. 값이 없으면 바가 빨간색으로 변합니다.
그것은 무엇인가 잘못되었다고 말하지만, 우리는 무엇이 잘못되었거나 그것에 대해 무엇을 해야 하는지를 알려주지 않습니다.
`NG-invalid` 클래스를 활용 하여 유용한 메시지를 표시해 보죠.

다음은 사용자가 이름을 삭제할 때 표시되는 방식 입니다.

![](https://lh3.googleusercontent.com/-g5J7Ky_4smM/WFHSQl7deOI/AAAAAAAAPwg/MVWORIpx4Pw/I/name-required-error.png)

이 효과를 얻기 위해 `<input>` 태그를

1. 하나의 템플릿 참조 변수
2. 근처의 `<div>`에 "Name is required" 메시지가 표시됩니다.이 메시지는 컨트롤이 유효하지 않은 경우 에만 표시됩니다.

다음의 코드를 추가해 보세요.

**[app/hero-form.component.html (excerpt)]**

```html
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
               required
               [(ngModel)]="model.name" name="name"
               #name="ngModel" >
        <div [hidden]="name.valid || name.pristine"
             class="alert alert-danger">
          Name is required
        </div>
```

angular 가 템플릿 내의 input-box 제어에 접근하려면, 템플릿 참조 변수가 필요합니다.
여기에 name 이라 불리는 변수를 만들고, "ngModel" 이라는 값을 주었습니다.

> 왜 "ngModel" 이지? directive의 exportAs 속성은 참조 변수를 directive 에 연결하는 방법을 Angular 에게 알려줍니다. ngModel directive의 exportAs 속성이 "ngModel" 이기 때문에 이름을 ngModel로 설정 합니다.
>
> 이제 hidden으로 바인딩 된 `<div>` 에 `name` 의 필요조건을 넣고, "name" 오류 메시지를 조건에 따라 보여줄 수 있습니다.

**[app/hero-form.component.html (excerpt)]**

```html
<div [hidden]="name.valid || name.pristine"
     class="alert alert-danger">
```

이 예제 에서 pristine 값이 있거나, valid 값이 있을 경우 에는 메시지를 숨깁니다.

이런 사용자경험(UX)을 표현하는 것은 개발자의 선택 입니다. 어떤 사람들은 항상 메시지가 보이는 것을 선호 하죠.
초기 상태를 무시하면 값이 유효한 경우 에만 메시지가 숨겨집니다.

어떤 사람들은 당황스러운 행동을 하는데, 사용자가 잘못된 행동을 하면 메시지를 보여줘야 합니다.

영웅 Alter Ego는 선택 사항 이므로, 그대로 두고, Hero Power 항목은 필수 항목 입니다.

원하는 경우 `<select>` 에 동일한 종류의 오류 처리를 추가 할 수 있지만, selectbox 가 이미 유효한 값 만으로 구성 되어 있기 때문에, 반드시 필요한 것은 아닙니다.

## 영웅을 추가 하고 form을 reset

새로운 영웅을 추가하는 것을 form 에 넣어 봅시다.
form 하단에 "New Hero" 버튼을 배치하고, component 내에 있는 newHero 메소드를 click 이벤트에 바인딩 합니다.

**[app/hero-form.component.html (New Hero button)]**

```html
<button type="button" class="btn btn-default" (click)="newHero()">New Hero</button>
```

**[app/hero-form.component.ts (New Hero method)]**

```typescript
newHero() {
  this.model = new Hero(42, '', '');
}
```

응용 프로그램을 다시 실행 하고, New Hero 버튼을 클릭하면 form 이 지워 집니다. input-box 왼쪽의 필수 막대는 빨간색 으로 표시되며, name 및 Power 속성이 잘못되어 있다고 보여줍니다. 이것은 필수 입력 이라는 것을 알 수 있고, form 이 깨끗한 상태 일 때만 에러메세지가 나오지 않습니다.

Name을 입력하고 New Hero를 다시 클릭 하십시오. 앱은 'Name is required' 라는 에러 메시지를 표시 합니다!
우리는 새로운 (blank) 영웅을 만들 때는, 오류 메시지가 나오는 것을 원하지 않습니다.

브라우저 도구 에서 요소를 검사하면, input-box 상자가 초기 상태가 아님을 알 수 있습니다. 이 form 은 New Hero를 클릭하기 전에, name을 입력 했다는 것을 기억하기 때문에, 영웅 object를 교체 해도, form 컨트롤의 초기 상태로 돌아 가지는 않습니다.

`newHero()` 메서드를 호출 한 후, form 의 reset() 메서드를 호출 하여 모든 상태를 초기화 하십시요.

**[app/hero-form.component.html (Reset the form)]**

```html
<button type="button" class="btn btn-default" (click)="newHero(); heroForm.reset()">New Hero</button>
```

이제 "New Hero" 를 클릭하면, 폼과 컨트롤 플래그가 재설정 됩니다.
(아직은 reset이 작동하지 않습니다. 추가로 해줘야 할 것이 있어요.)

## ngSubmit으로 form 승인

form 이 정상적으로 작성되었으면, form을 제출할 수 있어야 합니다.
form 하단의 submit 버튼은 아무 것도 바인딩 되어 있지 않지만, type(type="submit")으로 인해서 form 제출이 됩니다.

"form submit" 은 현재 쓸모가 없습니다. 유용하게 사용하려면 `<form>` 태그를 다른 Angular directive에 NgSubmit 으로 업데이트하고, 이벤트 바인딩을 사용 하여 `HeroFormComponent.submit()` 메서드에 바인딩 해야 합니다.

```html
<form (ngSubmit)="onSubmit()" #heroForm="ngForm">
```

템플릿 참조 변수 인 #heroForm 을 정의하고 값으로 "ngForm"을 넣었습니다.

변수 heroForm 은 이제 form 전체를 관리하는 NgForm directive에 대한 참조 입니다.

### NgForm directive

우리는 NgForm directive를 추가하지 않았습니다!

Angular가 했습니다. Angular는 NgForm directive를 자동으로 만들고 `<form>` 태그에 붙입니다.

NgForm directive는 form 요소에 추가 기능을 추가하여 기능을 보완 합니다. ngModel directive 및 name 속성을 사용하여 만들어진 이것은, 요소에 대해 만든 컨트롤을 보유하고, 유효성을 포함하여 속성을 모니터링 합니다. 또한 포함된 모든 컨트롤이 유효한 경우 에만 고유하고 유효한 속성인 true를 가집니다.

나중에 우리는 템플릿의 heroForm 변수를 통해 버튼의 `disabled` 속성을 form의 전반적인 유효성에 바인딩 합니다. 마크업 조각은 다음과 같습니다.

```html
<button type="submit" class="btn btn-default" [disabled]="!heroForm.form.valid">Submit</button>
```

응용 프로그램을 다시 실행하십시오. form이 유효한 상태로 열리고 버튼이 활성화 됩니다.

이제 Name을 입력했다가 삭제해 보십시요. 이전과 같이 오류 메시지에 "Name is required" 메세지가 나옵니다. 이제 submit button은 disabled 상태 입니다.

인상적이지 않나요? Angular의 도움 없이 버튼의 enable/disabled 상태를 form의 유효성에 연결 하려면 어떻게 해야 하는지 생각해 보세요.

우리는 Angular의 도움으로 다음의 2가지를 통해서 모든 과정이 끝났습니다.

1. (향상된) form 요소에 템플릿 참조 변수 정의
2. 약 50줄정도 떨어진 버튼 에서 변수를 참조연결.

## 두 개의 양식 영역 토글 (추가 크레딧)

이 form을 제출 하는 것은 현재 로서는 드라마 같은 극적으로 이루어 지지는 않습니다.

더 눈에 띄게 시각적인 것을 해보죠. 데이터 입력 영역을 숨기고 다른 것을 표시해 봅시다.

먼저 `<div>`에 form을 배치하고 숨겨진 속성을 HeroFormComponent.submitted 속성에 바인딩 합니다.

**[app/hero-form.component.html (excerpt)]**

```html
  <div  [hidden]="submitted">
    <h1>Hero Form</h1>
    <form (ngSubmit)="onSubmit()" #heroForm="ngForm">

       <!-- ... all of the form ... -->

    </form>
  </div>
```

```typescript
submitted = false;

onSubmit() { this.submitted = true; }
```

HeroFormComponent 의 submitted 플래그가 false 이고, form을 제출하고 나면 true가 될 것이므로, 처음에는 표시되지 않습니다.

submit button을 클릭하면 submitted 플래그가 true가 되고, form이 계획대로 사라 집니다.

이제 양식이 제출된 상태에 있는 동안 다른 것을 보여 주어야 합니다. 방금 작성한 `<div>` 래퍼 아래에 다음 HTML 블록을 추가하십시오.

**[app/hero-form.component.html (excerpt)]**

```html
<div [hidden]="!submitted">
  <h2>You submitted the following:</h2>
  <div class="row">
    <div class="col-xs-3">Name</div>
    <div class="col-xs-9  pull-left">{{ model.name }}</div>
  </div>
  <div class="row">
    <div class="col-xs-3">Alter Ego</div>
    <div class="col-xs-9 pull-left">{{ model.alterEgo }}</div>
  </div>
  <div class="row">
    <div class="col-xs-3">Power</div>
    <div class="col-xs-9 pull-left">{{ model.power }}</div>
  </div>
  <br>
  <button class="btn btn-default" (click)="submitted=false">Edit</button>
</div>
```

보간을 통해서 읽기 전용으로 표시된 영웅이 다시 나옵니다. 이 HTML 은 component가 제출된 상태에 있는 동안 에만 나타납니다.

submitted 플래그를 지우는 표현식을 click event에 연결한 Edit button을 추가 했습니다.

이것를 클릭하면 이 블록이 사라지고 편집 가능한 양식으로 돌아갑니다.

## 결론

이 가이드 에서 설명하는 Angular form 기술은 데이터 수정, 유효성 검사 등에 대한 지원을 제공하기 위해 다음과 같은 프레임 워크 기능을 활용 합니다.

- Angular HTML form 템플릿.
- Component 데코레이터가 있는 form component 클래스.
- form 제출을 처리하기 위한 ngSubmit directivev.
- #heroForm, #name 및 #power와 같은 템플릿 참조 변수.
- [(ngModel)] 구문과 양방향 데이터 바인딩, 변경 내용을 추적하고 검증.
- 컨트롤이 유효한지 확인하고, 입력값에 따라 오류 메시지를 Show/Hide.
- NgForm 유효성에 바인딩하여, submit button의 활성화 상태 제어.
- 잘못된 컨트롤에 대해 사용자 에게 시각적 피드백을 제공하는 맞춤 CSS 클래스.

최종 프로젝트 폴더 구조는 다음과 같습니다.

* angular-forms
	* app
		* app.component.ts
		* app.module.ts
		* hero.ts
		* hero-form.component.html
		* hero-form.component.ts
		* main.ts
	* node_modules ...
	* index.html
	* package.json
	* tsconfig.json

다음은 소스의 최종 버전입니다.

**[hero-form.component.ts]**

```typescript
import { Component } from '@angular/core';
import { Hero }    from './hero';
@Component({
  moduleId: module.id,
  selector: 'hero-form',
  templateUrl: 'hero-form.component.html'
})
export class HeroFormComponent {
  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
  submitted = false;
  onSubmit() { this.submitted = true; }
  newHero() {
    this.model = new Hero(42, '', '');
  }
}
```

**[hero-form.component.html]**

```html
<div class="container">
  <div  [hidden]="submitted">
    <h1>Hero Form</h1>
    <form (ngSubmit)="onSubmit()" #heroForm="ngForm">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
               required
               [(ngModel)]="model.name" name="name"
               #name="ngModel" >
        <div [hidden]="name.valid || name.pristine"
             class="alert alert-danger">
          Name is required
        </div>
      </div>
      <div class="form-group">
        <label for="alterEgo">Alter Ego</label>
        <input type="text" class="form-control" id="alterEgo"
               [(ngModel)]="model.alterEgo" name="alterEgo" >
      </div>
      <div class="form-group">
        <label for="power">Hero Power</label>
        <select class="form-control" id="power"
                required
                [(ngModel)]="model.power" name="power"
                #power="ngModel" >
          <option *ngFor="let pow of powers" [value]="pow">{{pow}}</option>
        </select>
        <div [hidden]="power.valid || power.pristine" class="alert alert-danger">
          Power is required
        </div>
      </div>
      <button type="submit" class="btn btn-default" [disabled]="!heroForm.form.valid">Submit</button>
      <button type="button" class="btn btn-default" (click)="newHero(); heroForm.reset()">New Hero</button>
    </form>
  </div>
  <div [hidden]="!submitted">
    <h2>You submitted the following:</h2>
    <div class="row">
      <div class="col-xs-3">Name</div>
      <div class="col-xs-9  pull-left">{{ model.name }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Alter Ego</div>
      <div class="col-xs-9 pull-left">{{ model.alterEgo }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Power</div>
      <div class="col-xs-9 pull-left">{{ model.power }}</div>
    </div>
    <br>
    <button class="btn btn-default" (click)="submitted=false">Edit</button>
  </div>
</div>
```

**[hero.ts]**

```typescript
export class Hero {
  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string
  ) {  }
}
```

**[app.module.ts]**

```typescript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { HeroFormComponent } from './hero-form.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HeroFormComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

**[app.component.ts]**

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: '<hero-form></hero-form>'
})
export class AppComponent { }
```

**[main.ts]**

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule);
```

**[index.html]**

```html
<html>
  <head>
    <title>Hero Form</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" 
          href="https://unpkg.com/bootstrap@3.3.7/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="forms.css">
    <!-- Polyfills for older browsers -->
    <script src="node_modules/core-js/client/shim.min.js"></script>
    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/reflect-metadata/Reflect.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>
    <script src="systemjs.config.js"></script>
    <script>
      System.import('app').catch(function(err){ console.error(err); });
    </script>
  </head>
  <body>
    <my-app>Loading...</my-app>
  </body>
</html>
```

**[forms.css]**

```css
.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; /* green */
}
.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}
```



