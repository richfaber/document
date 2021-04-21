> Angular2 Document > DOCS > Advanced 한글 번역본
> 2016/11월 기준 으로 작성 되었고, 의역 하였고, 오역이 있을 수 있습니다.

# COMPONENT STYLES

Component 들에게 CSS 스타일을 적용 하는 것을 알아 보자.

앵귤러 어플리케이션은 일반적인 CSS 로 스타일 할 수 있다. 
이것은 Angular 응용프로그램에서 CSS stylesheets, selectors, rules, 그리고 media queries 등을 사용 할 수 있다는 의미 이다.

Angular 는 Component 에 스타일을 묶어서, 일반 스타일 시트 방식과 다르게, 모듈 방식의 디자인을 가능 하게 한다.

이번 장에서는 이러한 Component 스타일을 적용하고, 어떻게 불러오는 지를 학습니다.

## 목차

- Component 스타일 사용하기
- 특수한 selector 들
- Component 안으로 스타일 불러오기
- View 캡슐 제어: Emulated, Native, and None
- Appendix 1: 실시간 으로 생성된 Component 스타일의 검사
- Appendix 2: 스타일 로딩과 절대경로 URLs

## Component 스타일 사용하기

작성한 모든 Angular Component 요소는 HTML template 뿐만 아니라 해당 template 와 함께 제공 되는 CSS 스타일을 정의하여, 필요한 selector, 규칙 및 미디어 쿼리를 지정 할 수 있다.

이 작업을 수행 하는 방법 중 한가지는 Component 요소의  메타 데이터로 styles 속성을 설정 하는 것이다. 
styles 속성은 CSS 코드가 포함된 문자열 배열을 사용 한다. 

보통 하나의 문자열을 제공 한다.

```typescript
@Component({
  selector: 'hero-app',
  template: `
    <h1>Tour of Heroes</h1>
    <hero-app-main [hero]=hero></hero-app-main>`,
  styles: ['h1 { font-weight: normal; }']
})
export class HeroAppComponent {
/* . . . */
}
```

Component style은 몇가지 방법이 전통적인 스타일 방식과 다르다.

첫째, Component 스타일에 적용되는 selector는 해당 Component template 에만 적용 된다. 
위 예제의 h1 selector는 HeroAppComponent 의 template 에 있는 `<h1>` 태그 에만 적용 된다. 
응용 프로그램의 다른 곳에 있는 `<h1>` 요소는 영향을 받지 않는다.

이것은 전통적인 css 방식에 비해서, 모듈성이 크게 향상 되었다는 것을 의미한다:

- CSS 클래스 이름과 각 Component 요소의 컨텍스트 에서 가장 적절한 Selector 를 사용할 수 있다.
- 클래스 이름 및 Selector 는 Component 요소에 대해서만 적용되기 때문에, 응용 프로그램의 다른 곳에서 사용 되는 클래스 및 Selector 와 충돌 하지 않는다.
- 응용 프로그램의 다른 위치 에서 스타일을 변경 하더라도 Component 요소의 스타일은 변경 되지 않는다.
- 각 Component 요소의 CSS 코드를 Component 요소의 TypeScript 및 HTML 코드와 함께 배치 하여 청결 하고 깔끔한 프로젝트 구조를 만들 수 있다.
- 각 Component 요소의 CSS 코드를 변경 하거나 제거 하더라도, 다른 애플리케이션 에게 영향을 주지 않는다. 그저 우리가 속한 Component 요소만 보면 된다.

## 특수한 selector

Component 스타일은 가상 클래스 스타일 방식 에서 몇 가지 특별한 Selector 를 추가로 제공 한다.

### :host
: host 가상 클래스 selector 를 사용 하면, Component 요소 자체(host) 를 대상으로 스타일을 지정할 수 있다 
(Component 의 template 내부에 있는 Component 가 아닌).

```stylesheet
:host {
  display: block;
  border: 1px solid black;
}```

Component 자체(host) 를 대상 으로 지정할 수 있는 유일한 방법 이다. 
Component template 의 내부 요소에 적용 되는 것이 아니기 때문에, Component 내부 요소 에는 적용 되지 않는다. 

괄호 안에 다른 Selector 를 넣어서, 호스트 스타일을 조건부로 적용할 수도 있다.

이번 예제는 오직 active 클래스가 있을 경우에만 호스트에 적용 된다.

```stylesheet
:host(.active) {
  border-width: 3px;
}
```

### :host-context
때로는 Component 요소의 View 외부 조건에 의해, 스타일을 적용 하는 것이 유용할 떄가 있다. 
예를 들어, `<body>` 요소 문서에 적용된 CSS 테마 클래스 가 있고, 이것이 Component 요소의 모양을 변경 해야 하는 경우다.

이럴때 `:host-context()` 가상 클래스 Selector 를 사용할 수 있고, 사용법은 `host()` 와 같다. 

호스트요소의 부모요소 부터, 상위 끝까지 CSS 클래스를 찾은 후에, 해당 조건의 Selector 와 결합 하고 적용한다.

다음 예제는 부모 요소에 theme-light 클래스가 있는 CSS 클래스가 있는 경우 에만 Component 안의 모든 `<h2> ` 요소에 배경색 스타일을 적용 한다.

```stylesheet
:host-context(.theme-light) h2 {
  background-color: #eef;
}
```

### /deep/

Component 스타일은 일반적 으로 Component 자체 template 에 있는 HTML에만 적용 되는데, `/deep/` selector 를 사용 하여,모든 하위 구성 요소 뷰에 스타일을 적용 할 수 있다. 

`/deep/` selector 는 중첩된 Component 요소의 깊이 에 상관 없이 작동 하며, 구성 요소의 하위 뷰와 하위 컨텐츠에 모두 적용 된다.

이 예제는 host 요소 에서 부터 DOM 의 모든 자식 요소로 대상으로 모든 `<h3>` 요소가 지정된 경우이다.

```stylesheet
:host /deep/ h3 {
  font-style: italic;
}
```

The /deep/ selector also has the alias >>>. We can use either of the two interchangeably.

> The /deep/ and >>> selectors should only be used with emulated view encapsulation. This is the default and it is what we use most of the time. See the Controlling View Encapsulation section for more details.

##  Component 안으로 스타일 불러오기

Component 에 스타일을 불러오는 방법은 몇 가지가 있다.

- HTML Template 인라인 방법
- styles 또는 styleUrls 메타 데이터를 설정하는 방법
- import CSS 사용하는 방법

### 메타 데이터의 스타일
@Component decorator 에 styles 배열 속성을 추가 할 수 있습니다. 
배열의 각 문자열 (대개 하나의 문자열)은 CSS를 정의합니다.

```stylesheet
@Component({
  selector: 'hero-app',
  template: `
    <h1>Tour of Heroes</h1>
    <hero-app-main [hero]=hero></hero-app-main>`,
  styles: ['h1 { font-weight: normal; }']
})
export class HeroAppComponent {
/* . . . */
}
```

### Template 인라인 스타일
`<style>` 태그 안에 스타일을 넣어 HTML 템플릿에 스타일을 직접 삽입 할 수 있습니다.

```stylesheet
@Component({
  selector: 'hero-controls',
  template: `
    <style>
      button {
        background-color: white;
        border: 1px solid #777;
      }
    </style>
    <h3>Controls</h3>
    <button (click)="activate()">Activate</button>
  `
})
```

### 메타데이터 안의 Style URLs 사용
Component의 @Component Decorator 에 styleUrls 속성을 추가 하여 외부 CSS 파일을 로드 할 수 있다.

```stylesheet
@Component({
  selector: 'hero-details',
  template: `
    <h2>{{hero.name}}</h2>
    <hero-team [hero]=hero></hero-team>
    <ng-content></ng-content>
  `,
  styleUrls: ['app/hero-details.component.css']
})
export class HeroDetailsComponent {
/* . . . */
}
```

URL은 루트를 기준으로 하는 경로 이다. 
일반적으로  `styleUrls`는 Component 파일과 관련이 없고, 응용 프로그램을 소유한 index.html 가 웹 페이지의 루트 이다.

예제 URL이 `app/` 로 시작하는 이유 이다. 
(Component 파일과 관련된 URL을 지정 방법은 부록 2를 참조 하시오.)

> Webpack과 같은 모듈 번들 사용자는 빌드 할 때 styles 속성을 사용 하여 외부 파일의 스타일을 로드 할 수도 있다. 
>
> styles: [require('my.component.css')]
>
> styleUrls 속성이 아닌 styles 속성을 설정했다! 모듈 번들러가 Angular 가 아닌 CSS 문자열을로드하고 있습니다. Angular는 번들러가 CSS 문자열을로드 한 후에 만 CSS 문자열을 봅니다. To Angular는 수작업 으로 스타일 배열을 작성한 것입니다. 이 방법으로 CSS를 로딩하는 방법에 대한 정보는 모듈 번들의 문서를 참조 하십시오.
 
### 템플릿 링크 태그
`<link>` 태그를 Component 의 HTML template 에 포함 할 수도 있다.

styleUrls와 마찬가지로 링크 태그의 href URL은 Component 파일이 아닌 응용 프로그램 루트에서 부터 시작 한다.

```stylesheet
@Component({
  selector: 'hero-team',
  template: `
    <link rel="stylesheet" href="app/hero-team.component.css">
    <h3>Team</h3>
    <ul>
      <li *ngFor="let member of hero.team">
        {{member}}
      </li>
    </ul>`
})
```

### CSS @import
표준 CSS @import 규칙을 사용하여 CSS 파일을 가져올 수도 있다.
이 경우 URL은 가져 오는 CSS 파일과 관련이 있다.

**[app/hero-details.component.css (excerpt)]**

```stylesheet
@import 'hero-details-box.css';
```

## View 캡슐화 제어 : Native, Emulated, and None

위에서 설명한 것처럼 Component CSS 스타일은 구성 요소 자체의 View 에 캡슐화 되어 나머지 응용 프로그램 에는 영향을 주지 않는다.

Component 메타 데이터 에서 View 캡슐화 모드를 설정 하면 Component별로 이 캡슐화가 수행 되는 방식을 제어 할 수 있다. 
다음 세 가지 모드 중 에서 선택할 수 있다.

- `Native` 뷰 캡슐화는 브라우저의 네이티브 Shadow DOM 구현을 사용 하여 Shadow DOM을 구성 요소의 호스트 요소에 연결 한 다음 해당 구성 요소 View를 해당 Shadow DOM에 배치 한다. 구성 요소의 스타일은 Shadow DOM에 포함 된다.
- `Emulated` view 캡슐화 (기본값)는 CSS 코드를 사전 처리 (및 이름 바꾸기)하여 CSS를 Component의 View 에 효과적 으로 적용하여 그림자 DOM 의 동작을 에뮬레이트 한다. 자세한 내용은 부록 1을 참조하십시오.
- `None` 은 Angular가 캡슐화를 수행하지 않음을 의미 한다. Angular는 CSS를 전역 스타일에 추가 한다. 앞서 설명한 범위 지정 규칙, 격리 및 보호는 적용 되지 않는다. 이는 HTML에 구성 요소의 스타일을 붙여 넣는 것과 본질적 으로 같다.

Component 메타 데이터의 캡슐화 속성을 사용 하여 구성 요소 캡슐화 모드를 설정 해보자.

```typescript
// warning: few browsers support shadow DOM encapsulation at this time
encapsulation: ViewEncapsulation.Native
```

Native 뷰 캡슐화는 Shadow DOM을 기본적으로 지원 하는 브라우저 에서만 작동 한다. 
호환성 문제가 있기 떄문에 emulated 보기 캡슐화가 기본 모드 이며 대부분의 경우 권장 된다.

## 부록 1 : Emulated 된 View 캡슐화 에서 생성된 CSS 검사

기본 Emulated 된 View 캡슐화를 사용할 때 Angular 는 모든 Component 스타일을 사전 처리 하여 표준 Shadow CSS 범위 지정 규칙과 비슷하게 처리 한다.

Emulated 된 View 캡슐화가 적용된 Angular 응용 프로그램의 DOM 을 검사 하면 각 DOM 요소에 추가 속성이 적용된 것을 볼 수 있다.

```typescript
<hero-details _nghost-pmm-5>
  <h2 _ngcontent-pmm-5>Mister Fantastic</h2>
  <hero-team _ngcontent-pmm-5 _nghost-pmm-6>
    <h3 _ngcontent-pmm-6>Team</h3>
  </hero-team>
</hero-detail>
```

생성된 속성 에는 두 가지 종류가 있다.

- Native 캡슐화 에서 Shadow DOM 호스트가 될 요소에 생성된 `_nghost` 속성이 있다. 이것은 일반적으로 Component 호스트 요소에 적용 된다.
- Component view 내의 요소 에는 이 요소가 속한 Emulated Shadow DOM을 식별하는 `_ngcontent` 석성이 있다.

이러한 속성의 값은 중요하지 않다. 우리가 사용할 일도 이유도 없다.

이들은 자동으로 생성되고, 생성된 Component 스타일은 DOM 의 `<head>` 섹션에서 사용 되고 있다는 것을 확인할 수 있다.

```stylesheet
[_nghost-pmm-5] {
  display: block;
  border: 1px solid black;
}

h3[_ngcontent-pmm-6] {
  background-color: white;
  border: 1px solid #777;
}
```

이런 자동 생성된 속성들은 사후 스타일로 처리 되므로 각 Selector 에 `_nghost` 또는 `_ngcontent` 속성 Selector 가 추가 된다. 
이러한 추가 Selector 를 사용하면 이 가이드 에서 설명하는 범위 지정 규칙을 사용할 수 있다.

우리는 그림자 DOM이 견인력을 얻을 때까지 에뮬레이션 모드로 살 것이다.

## 부록 2 : 상대 URL을 사용하여 스타일로드
Component의 코드, HTML 및 CSS를 같은 디렉토리에 있는 세 개의 별도 파일로 분할 하는 것이 일반적 이다.

```
quest-summary.component.ts
quest-summary.component.html
quest-summary.component.css
```

templateUrl 및 styleUrls 메타 데이터 속성을 활용 하여 템플릿 및 CSS 파일을 포함 한다. 
이러한 파일은 Component 와 함께 배치 되기 때문에 응용 프로그램의 루트 경로부터 지정해 두는 것이 좋다.

Angular 가 전체 URL을 계산하는 방식을 변경 하여 구성 요소 메타 데이터의 moduleId 속성을 module.id 로 설정할 수 있다.

**[app/quest-summary.component.ts]**

```typescript
@Component({
  moduleId: module.id,
  selector: 'quest-summary',
  templateUrl: 'quest-summary.component.html',
  styleUrls:  ['quest-summary.component.css']
})
export class QuestSummaryComponent { }
```

Component-Relative Paths 장에서 moduleId 에 대해 자세히 알아보시오.

