> angular.io > DOCS > GUIDE > [6. Displaying Data](https://angular.io/docs/ts/latest/guide/displaying-data.html)
> 2016/12월 기준 으로 작성 되었고, 의역 하였고, 오역이 있습니다.

# DISPLAYING DATA

- property 바인딩을 사용하면 UI에 앱 데이터를 표시 할 수 있습니다.

Angular component 의 속성을 HTML 템플릿에 바인딩 하여, 데이터를 화면에 표시 할 수 있습니다.

이 페이지 에서는 heroes의 목록이 있는 component를 만듭니다. hero 이름 목록을 표시하고 목록 아래에 조건부로 메시지를 표시합니다.

마지막 UI는 다음과 같습니다.

![](https://lh3.googleusercontent.com/-x_is3GsKflo/WEk_WkAB6yI/AAAAAAAAPtM/Xsl10VOcnas/I/final.png)

## Contents

- 보간법(`{}`)으로 component 속성 표시
- NgFor로 배열 속성 표시.
- NgIf를 사용한 조건부 표시.

> 이 페이지에서 설명하는 모든 구문과 코드 단편은 [live example](https://angular.io/resources/live-examples/displaying-data/ts/eplnkr.html) 에서 볼 수 있습니다.

## 보간법(`{}`) 으로 component 속성 보기

component 속성을 표시하는 가장 쉬운 방법은 보간법을 통해 등록 정보 이름을 바인딩 하는 것입니다.
보간법을 사용하면 두 개의 중괄호로 묶인 뷰 템플릿에 속성 이름을 넣을 수 있습니다. `{{ myHero }}`.

`[setup](https://angular.io/docs/ts/latest/guide/setup.html)` 지시 사항을 수행 했다면, `display-data` 라는 새 프로젝트를 작성 하십시오.

그런 다음 body와 template를 변경 하는 app.component.ts 파일을 수정 하십시오.

완료 되면 다음과 같이 보입니다.

**[app/app.component.ts]**

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>My favorite hero is: {{ myHero }}</h2>
    `
})
export class AppComponent {
  title = 'Tour of Heroes';
  myHero = 'Windstorm';
}
```

이전에 비어 있는 component 에 title 및 myHero 라는 두 가지 속성을 추가했습니다.

수정된 템플릿은 이중 중괄호 보간법을 사용하여 두 개의 component 속성을 표시합니다.

```typescript
template: `
  <h1>{{title}}</h1>
  <h2>My favorite hero is: {{myHero}}</h2>
  `
```

> 템플릿은 ECMAScript 2015(es6) 역 따옴표 (\`) 안에 여러 줄로 된 문자열 입니다. 작은 따옴표 (')와 같은 문자가 아닌 역 따옴표 (\`-)는 여러 행에 걸쳐 문자열을 구성 할 수 있으므로 HTML을 더 쉽게 읽을 수 있습니다.

Angular는 component 에서 title 및 myHero 속성 값을 자동으로 가져 와서 해당 값을 브라우저에 삽입합니다.
Angular는 이러한 속성이 변경 될 때 디스플레이를 업데이트합니다.

> 보다 정확하게는 keystroke, 타이머 완료 또는 HTTP 요청에 대한 응답과 같이 view와 관련된 일종의 비동기 이벤트가 발생한 후에 다시 표시됩니다.

new 키워드를 호출하지 않아도 AppComponent 클래스의 인스턴스를 Angular 가 만들 수 있습니다. 어떻게?

@Component 데코레이터의 `<my-app>` 으로 이름 지어진 CSS selector 요소가 지정되어 있고, 이 요소는 index.html 파일 본문에서 대체 됩니다.

**[index.html (body)]**

```html
<body>
  <my-app>loading...</my-app>
</body>
```

AppComponent 클래스 (in main.ts)를 사용하여 부트스트랩 할 때 Angular는 index.html 에서 `<my-app>`를 찾은 다음 AppComponent의 인스턴스를 생성하고 `<my-app>` 태그 안에 렌더링 합니다.

이제 앱을 실행하십시오. 그것은 제목과 영웅 이름을 표시해야 합니다 :

![](https://lh3.googleusercontent.com/--5bGVGPVqEY/WEk_W1kLYnI/AAAAAAAAPtQ/uMrd633kjXY/I/title-and-hero.png)

다음 섹션 에서는 앱의 코딩 선택 사항 중 일부를 검토합니다.

## Template inline or template file?

component의 template를 저장하는 두가지 방법이 있습니다. 템플릿 속성을 사용하여 인라인으로 정의 하거나 별도의 HTML 파일에 템플릿을 정의하고 @Component 데코레이터의 templateUrl 속성을 사용하여 component 메타 데이터에 링크 할 수 있습니다.

인라인과 HTML의 선택은 기호, 환경 및 조직 정책의 문제입니다.
여기에서는 template 가 작고, 추가 HTML 파일 없이도 데모가 가능하기 때문에 응용 프로그램은 인라인 HTML을 사용합니다.

두 가지 스타일 모두 템플릿 데이터 바인딩은 component의 속성에 동일한 액세스 권한을 가집니다.

## Constructor or variable initialization?

이 예제 에서는 변수 할당을 사용하여 component를 초기화 했지만, 생성자를 사용하여 속성을 선언하고 초기화 할 수도 있습니다.

**[app/app-ctor.component.ts (class)]**

```typescript
export class AppCtorComponent {
  title: string;
  myHero: string;

  constructor() {
    this.title = 'Tour of Heroes';
    this.myHero = 'Windstorm';
  }
}
```

이 앱은 간결 하게하기 위해 "변수 할당" 스타일을 사용합니다.

## *ngFor를 사용하여 배열 속성 표시

영웅 목록을 표시 하려면 component에 영웅 이름 배열을 추가하고, myHero를 배열의 첫 번째 이름으로 다시 정의하십시오.

**[app/app.component.ts(class)]**

```typescript
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  myHero = this.heroes[0];
}
```

템플릿의 Angular `ngFor` directive를 사용 하여 영웅 목록의 각 항목을 표시하십시오.

**[app/app.component.ts (template)]**

```typescript
  template: `
    <h1>{{title}}</h1>
    <h2>My favorite hero is: {{myHero}}</h2>
    <p>Heroes:</p>
    <ul>
      <li *ngFor="let hero of heroes">
        {{ hero }}
      </li>
    </ul>
  `
```

이 UI는 `<ul>` 및 `<li>` 태그와 함께 HTML 순서없는 목록을 사용합니다. `<li>` 요소의 *ngFor는 Angular 의 "순회문" directive 입니다. `<li>` 요소 (및 그 하위 요소)를 "반복템플릿" 으로 표시 합니다.

```html
<li *ngFor="let hero of heroes">
  {{ hero }}
</li>
```

> *ngFor 에서 앞에있는 별표 (*)를 잊지 마십시오. 이것은 구문의 핵심 부분입니다. 자세한 내용은 [템플릿 구문 페이지](https://angular.io/docs/ts/latest/guide/template-syntax.html#ngFor)를 참조 하십시오.

ngFor로 묶인 큰 따옴표 안의 영웅을 주목하십시오; 템플릿 입력 변수의 예입니다. [Template Syntax 페이지](https://angular.io/docs/ts/latest/guide/template-syntax.html)의 [microsyntax](https://angular.io/docs/ts/latest/guide/template-syntax.html#ngForMicrosyntax) 섹션 에서 템플릿 입력 변수에 대해 자세히 읽어보십시오.

Angular는 목록의 각 항목에 대해 `<li>`를 복제 하여 현재 반복 안의 item(hero)을 hero로 설정 합니다.
Angular는 변수를 이중 중괄호의 보간법을 사용 합니다.

> 이 경우 ngFor는 배열 이지만, ngFor는 반복 가능한 모든 객체([iterable object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)) 에 대해 항목을 반복 할 수 있습니다.

이제 영웅은 li 에 나타납니다.

![](https://lh3.googleusercontent.com/-eNDaZkf1AqU/WEk_XA9119I/AAAAAAAAPtU/Mpl26_9AeNY/I/hero-names-list.png)

## 데이터를 위한 클래스 만들기

보통 앱의 코드는 component 내부에 직접 데이터를 정의하기 때문에, 위에 예제가 모범 사례는 아닙니다. 단순한 데모일 뿐입니다.

문자열 배열로 바인딩 된 것을, 실제 프로그램 에서는 대부분 특수한 객체(specialized objects)들일 것입니다.

특수한 객체를 사용하려면 heroes 배열을 Hero 객체의 배열로 반환해 주면 됩니다. 이것을 위해서 Hero 클래스가 필요합니다.

app 폴더에 다음 코드로 hero.ts 라는 새 파일을 만듭니다.

**[app/hero.ts (excerpt)]**

```typescript
export class Hero {
  constructor(
    public id: number,
    public name: string) { }
}
```

생성자와 두개의 속성인 id 와 name을 사용하여 클래스를 정의 했습니다.

클래스에 속성에 타입이 있는 것처럼 보이지만 실제로는 아닙니다.
생성자 매개 변수의 타입 선언 부분은 TypeScript의 shortcut 을 사용한 것입니다.

첫 번째 매개 변수를 주목하십시오.

**[app/hero.ts (id)]**

```typescript
	public id: number,
```

public을 사용하는 것은 아래와 같은 의미를 가집니다.

- 생성자 매개 변수와 해당 타입을 선언 합니다.
- 같은 이름의 공용 속성임을 선언 합니다.
- 클래스의 인스턴스를 만들 때 해당 속성을 초기화 합니다.

## Hero class 사용하기

이제 component의 heroes 속성에 Hero 클래스를 사용하여 Hero 객체 배열을 반환하면 됩니다.

**[app/app.component.ts (heroes)]**

```typescript
heroes = [
  new Hero(1, 'Windstorm'),
  new Hero(13, 'Bombasto'),
  new Hero(15, 'Magneta'),
  new Hero(20, 'Tornado')
];
myHero = this.heroes[0];
```

그런 다음 템플릿을 업데이트 하십시오. 영웅 목록에서 Id와 Name이 표시되고, favorite 영웅의 name 속성이 표시 되도록 수정하십시요.

**[app/app.component.ts (template)]**

```typescript
template: `
  <h1>{{title}}</h1>
  <h2>My favorite hero is: {{myHero.name}}</h2>
  <p>Heroes:</p>
  <ul>
    <li *ngFor="let hero of heroes">
      {{ hero.name }}
    </li>
  </ul>
`
```

디스플레이는 동일하게 보이지만 코드가 명확합니다.

## NgIf을 이용한 선택적 표현

특정상황 에서만 보거나, 보기의 일부만 표시해야 하는 경우가 있습니다.

영웅이 4 명 이상일 경우 메시지를 표시하도록 예제를 변경해 보겠습니다.

Angular ngIf directive는 true/false 조건에 따라 요소를 삽입하거나 제거합니다.
실행중인 것을 보려면 템플릿의 맨 아래에 다음 단락을 추가하십시오.

**[app/app.component.ts (message)]**

```typescript
<p *ngIf="heroes.length > 3">There are many heroes!</p>
```

> *ngIf 에서 앞에 있는 별표 (*)를 잊지 마십시오. 이것은 구문의 핵심 부분입니다. [템플릿 구문 페이지](https://angular.io/docs/ts/latest/guide/template-syntax.html)의 [ngIf 섹션](https://angular.io/docs/ts/latest/guide/template-syntax.html#ngIf)에서 ngIf 및 *에 대해 자세히 읽어보십시오.

`*ngIf="heros.length> 3` 의 큰 따옴표 안에 있는 템플릿 표현식은 TypeScript 와 비슷해 보이고, 제대로 작동합니다.
component의 hero 목록에 항목이 네 개 이상 있을 경우 Angular는 단락을 DOM 에 추가하고 메시지가 나타납니다. 항목수가 세 개 이하면 Angular는 단락을 생략 하므로 아무런 메시지도 표시되지 않습니다. 자세한 내용은 [템플릿 구문 페이지](https://angular.io/docs/ts/latest/guide/template-syntax.html)의 [템플릿 표현식 섹션](https://angular.io/docs/ts/latest/guide/template-syntax.html#template-expressions)을 참조하십시오.

> Angular는 메시지를 숨기거나 보여주는 것이 아닌, DOM 에서 요소를 추가 하거나 제거합니다. 이는 특히 많은 데이터 바인딩이 포함된 큰 HTML 에서 조건부로 포함 하거나 제외 함으로써, 프로젝트의 성능을 향상시킵니다.

배열에 네 개의 항목이 있으므로 메시지가 나타나야 합니다. app.component.ts 로 돌아가서 hero 배열의 요소 중 하나를 삭제 하거나 주석 처리하십시오. 
브라우저를 새로고침 하면, 메시지가 사라집니다.

## 개요

이제 사용 방법을 알았습니다.

- 이중 중괄호로 보간하여 구성 요소 속성을 표시합니다.
- ngFor를 사용해서 배열을 표시합니다.
- 모델의 속성을 component 에 표현하기 위해서, model data를 그리는 Typescript class를 만들었습니다.
- ngIf의 boolean 표현식을 기반으로 HTML 덩어리를 조건부로 표시하였습니다.

다음은 최종 코드입니다.

**[app/app.component.ts]**

```typescript
import { Component } from '@angular/core';
import { Hero } from './hero';
@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
  <h2>My favorite hero is: {{myHero.name}}</h2>
  <p>Heroes:</p>
  <ul>
    <li *ngFor="let hero of heroes">
      {{ hero.name }}
      </li>
  </ul>
  <p *ngIf="heroes.length > 3">There are many heroes!</p>
`
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = [
    new Hero(1, 'Windstorm'),
    new Hero(13, 'Bombasto'),
    new Hero(15, 'Magneta'),
    new Hero(20, 'Tornado')
  ];
  myHero = this.heroes[0];
}
```

**[app/hero.ts]**

```typescript
export class Hero {
  constructor(
    public id: number,
    public name: string) { }
}
```

**[app.module.ts]**

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

**[main.ts]**

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```



