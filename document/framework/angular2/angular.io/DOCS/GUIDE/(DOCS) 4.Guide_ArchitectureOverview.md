> angular.io > DOCS > GUIDE > [4. Architecture](https://angular.io/docs/ts/latest/guide/architecture.html)
> 2016/12월 기준 으로 작성 되었고, 의역 하였고, 오역이 있습니다.

# ARCHITECTURE OVERVIEW

- Angular 응용 프로그램의 기본 구성 요소

Angular는 HTML과 JavaScript 또는 JavaScript 로 컴파일 되는, TypeScript와 같은 언어로 클라이언트 응용 프로그램을 작성하기 위한 프레임 워크입니다.

프레임 워크는 몇개의 라이브러리로 구성 되며, 일부 라이브러리는 코어 라이브러리 이고, 일부 라이브러리는 선택적 라이브러리 입니다.

Angular스러운 마크업을 사용하여 HTML 템플릿을 작성하고, 이러한 템플릿을 관리하기 위한 Component class 작성하고, Service에 응용프로그램 로직  추가를 통해서 Angular 응용 프로그램을 작성할 수 있습니다.

그런 다음 Root module을 bootstrap 하여 앱을 실행 합니다.

Angular는 브라우저에서 애플리케이션 콘텐츠를 제공하고, 제공한 지침에 따라 사용자 상호 작용에 응답합니다.

물론, 이것보다 더 많은 것이 있습니다. 다음 페이지에서 자세히 설명합니다. 지금은 큰 그림에 집중 하십시오.

![](https://lh3.googleusercontent.com/-cuEE375LVyg/WEVN5QFzggI/AAAAAAAAPr4/do403ytbOBo/I/overview2.png)

아키텍처 다이어그램은 Angular 응용 프로그램의 8가지 주요 빌딩 블록으로 나누어 집니다.

- Modules
- Components
- Templates
- Metadata
- Data binding
- Directives
- Services
- Dependency injection

이러한 빌딩 블록을 통해서, Angular를 배우십시오.

> 이 페이지에서 참조 된 코드는 [실제 예제](https://angular.io/resources/live-examples/architecture/ts/plnkr.html)로 제공 됩니다.

## Modules

![](https://lh3.googleusercontent.com/-A4YJ_2hCsLA/WEVN5qNUNlI/AAAAAAAAPr8/6U9aW-nYHzs/I/module.png)

Angular 응용 프로그램은 모듈형 이며, Angular는 Angular 모듈 또는 `NgModules` 이라는 자체 모듈 시스템이 있습니다.
Angular 모듈은 범주가 큽니다. 이 페이지 에서는 모듈만을 소개합니다.
깊이 있는 모듈은 [Angular modules](https://angular.io/docs/ts/latest/guide/ngmodule.html) 페이지 에서 다룹니다.

모든 Angular app은 적어도 하나의 Angular module class, `AppModule` 같은 [root module](https://angular.io/docs/ts/latest/guide/appmodule.html)을 가지고 있습니다.

root module은 소규모 응용 프로그램의 유일한 모듈일 수 있지만, 대부분의 응용 프로그램에는 응용 프로그램 domain, workflow 또는 밀접한 관련 기능 세트 전용 코드가 모여 있는 더 많은 기능 모듈이 있습니다.

Angular 모듈은 root, feature 상관 없이 `@NgModule decorator` 가 있는 클래스 입니다.

> decorator는 JavaScript 클래스를 수정하는 함수 입니다. Angular는 클래스에 첨부된 메타 데이터, 사용 되는 decorator를 통해서 방식을 이해합니다. [웹의 decorator 에 대해 자세히 알아보십시오](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.x5c2ndtx0).

`NgModule`은 모듈을 설명 하는 속성을 가진, 단일메타 데이터객체를 취하는 decorator 함수 입니다. 가장 중요한 속성은 다음과 같습니다.

* declarations - 이 모듈을 통해 view class를 Angular에게 알려준다. 세가지 뷰 클래스가 있습니다. components, directives 및 pipe 입니다.

* exports - 다른 모듈의 Component Template 에서 볼 수 있고, 사용할 수 있어야 하는 선언의 집합.

* imports - 이 모듈 에서 필요로 하는 컴포넌트 Template 에 필요한 기타 모듈.

- providers - 전역적으로 사용할 수 있는 서비스. 앱의 모든부분 에서 액세스 할 수 있게 됩니다.

- bootstrap - 다른 모든 앱보기를 호스팅 하는 Root component 라고 하는 기본 애플리케이션보기 입니다. root module 만이 부트 스트랩 속성을 설정 할 수 있습니다.

다음은 간단한 root module 입니다.

**[app/app.module.ts]**

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
	imports : [ BrowserModule ],
    providers: [ Logger ],
    declarations: [ AppComponent ],
    exports: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
```

> AppComponent 의 export 는 내보내는 방법을 보여 줍니다. 이 예제 에서는 실제로 필요하지 않습니다. root module은 다른 Component가 가져올 필요가 없으므로, 아무 것도 내보낼 필요도 없습니다.

root module을 부트 스트랩 하여 응용 프로그램을 시작하십시오.
개발하는 동안 `main.ts` 안에 있는 `AppModule`을 bootstraping 할 가능성이 높습니다.

**[app/main.ts]**

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

### Angular modules vs. JavaScript modules

Angular module(`@NgModule`로 decorate된 class)은 Angular 의 기본 기능 입니다.

JavaScript는 JavaScript object 컬렉션을 관리하기 위한 자체 모듈 시스템을 가지고 있습니다.
Angular 모듈 시스템과는 완전히 다르지만, 유사한 점도 있습니다.

JavaScript 에서 각 파일은 모듈이며, 파일에 정의된 모든 객체는 해당 모듈에 속합니다.
모듈은 일부 키워드를 export 키워드로 표시하여 공개임을 선언 합니다.
다른 JavaScript 모듈은 import 문을 사용하여, 다른 모듈의 public 객체에 액세스 합니다.

```javascript
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

export class AppModule { }
```

> [자바스크립트 모듈 시스템에 대해서 배우십시요.](http://exploringjs.com/es6/ch_modules.html)

### Angular libraries

![](https://lh3.googleusercontent.com/-75D-U2u6ASQ/WEVN52FSYXI/AAAAAAAAPsA/mpOY-xrPV5o/I/library-module.png)

Angular 모듈은 자바스크립트 모듈의 집합 입니다. 라이브러리모듈 이라고 생각하면 됩니다.

Angular 라이브러리 이름은 `@angular` 접두어로 시작 합니다.

npm 패키지 관리자를 사용하여 이들을 설치하고, JavaScript `import` 문을 사용하여 그 중 일부를 가져옵니다.

예를 들어 Angular 의 Component decorator를 `@angular/core` 라이브러리 에서 다음과 같이 가져옵니다.

```javascript
import { Component } from '@angular/core';
```

또한 JavaScript import 문을 사용하여, Angular 라이브러리에서 Angular 모듈을 가져 옵니다.

```javascript
import { BrowserModule } from '@angular/platform-browser';
```

위의 간단한 Root module 예제 에서 애플리케이션 모듈은 해당 `BrowserModule` 내부의 내용을 필요로 합니다.
해당 자료에 액세스하려면 `@NgModule` 메타 데이터 `import` 하여 추가 하십시오.

```javacript
imports:      [ BrowserModule ],
```

이 방법으로 Angular와 JavaScript 모듈 시스템을 함께 사용 합니다.

`import` 와 `export` 의 공통된 어휘를 공유하고 있기 때문에, 혼란스러울 수 있습니다.
혼란은 시간과 경험이 쌓이면 명확해 지기 때문에, 얽매일 필요는 없습니다.

> [Angular 모듈 페이지](https://angular.io/docs/ts/latest/guide/ngmodule.html) 에서 자세히 알아보십시오.

## Components

![](https://lh3.googleusercontent.com/-z0_Fapgyhvg/WEVN6CL6BFI/AAAAAAAAPsE/XSK7EwV3c6M/I/hero-component.png)

component는 view 라는 화면의 갱신(patch)을 제어 합니다.

예를 들어, 다음 view는 component 에 의해 제어됩니다.

- Navigation link가 있는 앱 루트
- heroes의 목록
- hero 편집기

클래스 에서 view 내부를 지원하기 위한 로직을 정의 합니다.
클래스는 속성 및 메서드의 API를 통해 view와 상호 작용 합니다.

예를 들어, `HeroListComponent` 에는 서비스 에서 얻은 hero의 배열을 반환하는 `heroes` 속성이 있습니다.
`HeroListComponent` 에는 사용자가 해당 목록 에서 hero을 클릭 할 때 `selectedHero` 속성을 설정 하는 `selectHero()` 메서드를 가지고 있습니다.

**[app/hero-list.component.ts (class)]**

```typescript
export class HeroListComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private service: HeroService) { }

  ngOnInit() {
    this.heroes = this.service.getHeroes();
  }

  selectHero(hero: Hero) { this.selectedHero = hero; }
}
```

Angular는 사용자가 응용 프로그램을 이동 하면서 component를 작성, 업데이트 및 삭제합니다.
앱은 위에 명시된 `ngOnInit()` 과 같은 선택적 `라이프 사이클 후크` 를 통해서 라이프 사이클의 과정에 간섭 할 수 있습니다.

## Templates

![](https://lh3.googleusercontent.com/-k4dxcN5sVzY/WEVN6teFSNI/AAAAAAAAPsI/DOQ_3CQp5ck/I/template.png)

template와 함께 component의 뷰가 정의 됩니다. template는 Angular에서 component를 렌더링 하는 방법을 알려주는 HTML폼 입니다.

템플릿은 몇 가지 차이점을 제외 하고는, 일반적인 HTML 처럼 보입니다. 다음은 `HeroListComponent`의 템플릿입니다.

**[app/hero-list.component.html]**

```html
<h2>Hero List</h2>
<p><i>Pick a hero from the list</i></p>
<ul>
  <li *ngFor="let hero of heroes" (click)="selectHero(hero)">
    {{hero.name}}
  </li>
</ul>
<hero-detail *ngIf="selectedHero" [hero]="selectedHero"></hero-detail>
```

이 템플릿은 `<h2>` 및 `<p>`와 같은 일반적인 HTML 요소를 사용하지만 일부 차이점이 있습니다. `*ngFor`와 같은 코드, `{{hero.name}}`, `(click)`, `[hero]` 및 `<hero-detail>`은 Angular의 템플릿 구문이 사용되고 있습니다.

템플릿의 마지막 줄에서 `<hero-detail>` 태그는 새 component 인 `HeroDetailComponent`에서 정의된 custom요소 입니다.

`HeroDetailComponent`는 `HeroListComponent` 와는 다른 component 입니다.
`HeroDetailComponent`(코드는 아직 보지는 않았지만)는 `HeroListComponent` 가 제공하는 목록에서 사용자가 선택한 hero에 대한 상세정보를 보여줍니다.
`HeroDetailComponent` 는 `HeroListComponent` 의 자식 component 입니다.

![](https://lh3.googleusercontent.com/-BC-HEWOwztI/WEVN6vimKDI/AAAAAAAAPsM/4lSFmikaWOI/I/component-tree.png)

`<hero-detail>` 은 네이티브 HTML 요소들 사이에서 어떻게 작동하는지 주목 하십시오.
맞춤 component 들은 동일한 레이아웃 에서 기본 HTML과 자연스럽게 섞여 있습니다.

## Metadata

![](https://lh3.googleusercontent.com/-4n8IGMIc8LA/WEVN6_xtQQI/AAAAAAAAPsQ/rjbpmpZv8gk/I/metadata.png)

메타 데이터는 Angular를 처리하여 클래스를 처리하는 방법을 알려줍니다.

HeroListComponent의 코드를 살펴보면, 클래스임을 알 수 있습니다. 프레임 워크에 대한 어떠한 증거도 없으며 Angular 코드는 전혀 없습니다.

사실 `HeroListComponent`는 실제로 클래스일 뿐입니다. Angular에게 알려주기 전에는 component 가 아닙니다.

`HeroListComponent`가 component 라는 것을 Angular 에게 알려주려면, 클래스에 메타 데이터를 첨부하십시오.

TypeScript 에서는 데코레이터를 사용하여 메타 데이터를 첨부할 수 있습니다. `HeroListComponent`의 메타 데이터는 다음과 같습니다.

**[app/hero-list.component.ts (metadata)]**

```typescript
@Component({
  moduleId: module.id,
  selector:    'hero-list',
  templateUrl: 'hero-list.component.html',
  providers:  [ HeroService ]
})
export class HeroListComponent implements OnInit {
/* . . . */
}
```

`@Component 데코레이터`는 바로 아래에 있는 클래스를 component 클래스로 식별합니다.

`@Component 데코레이터`는 component와 뷰를 생성하고 표시하는 데 필요한 정보가 있는 필수 구성 객체를 가지고 있습니다.

가능한 @Component 설정 옵션은 다음과 같습니다.

- moduleId : templateUrl 과 같은 모듈 기준 URL에 대한 기본 주소 (module.id)의 소스를 설정 합니다.
- selector : 부모 HTML에 `<hero-list>` 태그가 있는 경우, 구성 요소의 인스턴스를 만들고 삽입하도록, Angular에게 알려주는 CSS 선택기입니다. 예를 들어 앱의 HTML에 `<hero-list></hero-list>`가 포함 된 경우 Angular는 해당 태그 사이에 `HeroListComponent` view 의 인스턴스를 삽입 합니다.
- templateUrl : component의 HTML template의 위치를 포함한 파일 입니다.
- providers : component에 필요한 서비스에게 필요한 의존성 component(종속성 주입 공급자) 배열 입니다. 이것은 Angular에게 component의 생성자가 `HeroService`를 필요로 하므로 표시할 hero 목록을 가져올 수 있다고 알려 주는 하나의 방법 입니다.

![](https://lh3.googleusercontent.com/-SDYGNlA-l_4/WEVN7N2PxqI/AAAAAAAAPsU/ODEfZcajiB8/I/template-metadata-component.png)

@Component의 메타 데이터는 Angular 에게 component에 대해서 필요한 주요 빌딩 블록을 가져올 위치를 알려 줍니다.

template, 메타 데이터, component가 함께 view를 구성합니다.

Angular에게 동작을 안내 하는 유사한 방식으로 다른 메타 데이터 데코레이터도 있습니다. `@Injectable`, `@Input` 및 `@Output` 은 인기있는 데코레이터 중 일부 입니다.

설계상으로 코드에 메타 데이터를 추가 해야만 Angular 가 수행할 작업을 알 수 있게 됩니다.

## Data binding

프레임 워크가 없으면 데이터 값을 HTML 컨트롤로 푸시하고, 사용자 응답에 따라서, 액션 및 값을 업데이트 해야 한다. 그러한 push/pull 로직을 직접 작성하는 것은 지루하고, 오류가 발생하기 쉽고, 숙련 된 jQuery 프로그래머가 읽을 수 있기 때문에 악몽처럼 변할 수 있습니다.
(결과적으로 jQuery의 자유로운 작성방식은 수많은 조각코드과 에러코드를 양산하게 되었음)

![](https://lh3.googleusercontent.com/-eI6sorgQ__E/WEVN7UoBYbI/AAAAAAAAPsY/HMiTXUrLCJs/I/databinding.png)

Angular는 template의 일부를 component의 일부와 상호작동 하는 메커니즘인 데이터 바인딩(양방향 데이터바인딩)을 지원 합니다.
템플릿 HTML에 바인딩 마크업을 추가하여 Angular에게 양방향 연결하는 방법을 알려줍니다.

다이어그램에서 볼 수 있듯이 네 가지 형태의 데이터 바인딩 구문이 있습니다. 각 양식은 DOM, DOM 또는 양방향 방향을 나타냅니다.

`HeroListComponent` 예제에는 세 가지 형식을 가지는 template를 보여준다.

**[app/hero-list.component.html (binding)]**

```html
<li>{{hero.name}}</li>
<hero-detail [hero]="selectedHero"></hero-detail>
<li (click)="selectHero(hero)"></li>
```

- `{{hero.name}}` 보간법은 `<li>` 태그 내에 component의 hero.name 속성 값을 표시합니다.
- `[hero]` 속성 바인딩은 selectedHero 값을 부모 HeroListComponent 에서 자식 HeroDetailComponent 의 `hero` 속성으로 전달합니다.
- 사용자가 영웅의 이름을 클릭하면 (click) 이벤트 바인딩이 component의 selectHero 메서드를 호출 합니다.

양방향 데이터 바인딩은 `ngModel directive`를 사용하여, 속성 및 이벤트 바인딩을 단일 표기법으로 결합하는 중요한 네 번째 형식입니다.
다음은 HeroDetailComponent 템플릿의 예입니다.

**[app/hero-detail.component.html (ngModel)]**

```html
<input [(ngModel)]="hero.name">
```

양방향 바인딩에서, 데이터 속성값은 속성 바인딩과 마찬가지로 component의 input 으로 상호 연결합니다.
사용자의 변경 사항은 component로 다시 전달되어 이벤트 바인딩과 마찬가지로 입력된 정보를 최신 값으로 재설정 합니다.

Angular는 모든 자식 구성 요소를 통해 응용 프로그램 구성 요소 트리의 루트에서, JavaScript 이벤트 사이클 마다 한 번씩 모든 데이터 바인딩을 처리합니다.

![](https://lh3.googleusercontent.com/-1ylRrSlG3hM/WEVN7nUsWmI/AAAAAAAAPsc/sbldkOmN1mA/I/component-databinding.png)

데이터 바인딩은 템플릿과 해당 구성 요소 간의 통신에서 중요한 역할을 합니다.
데이터 바인딩은 부모 구성 요소와 하위 구성 요소 간의 통신에도 중요합니다.

## Directives

Angular 템플릿은 동적 입니다. Angular 가 렌더링 할 때 directive가 지시한 지시 사항에 따라 DOM을 변환합니다.

Directive는 지시문 메타 데이터가 있는 클래스입니다.
TypeScript에서 `@Directive 데코레이터`를 적용 하여 메타 데이터를 클래스에 첨부합니다.

component는 템플릿이 있는 directive 입니다. `@Component 데코레이터`는 실제로 템플릿 지향 기능으로 확장된 `@Directive 데코레이터` 입니다.

> `component`는 기술적으로는 directive 이지만, Angular프로그램 에서, 중심에 있는 매우 독특한 특징을 가지기 때문에, 아키텍처 개요는 component와 directive를 구분합니다.

두 가지 다른 종류의 directive가 있습니다 : structual 와 attribute directive.

그것들은 속성처럼 엘리먼트 태그 안에 정의되기도 하고, 때로는 태그이름 으로 정의 되기도 하지만,
assignment 나 binding의 대상 으로 자주 등장 하는 경향이 있습니다.

structural directive는 DOM의 요소를 추가, 제거 및 교체하여 레이아웃을 변경 합니다.

[예제 템플릿](https://angular.io/docs/ts/latest/guide/architecture.html#templates)은 두 가지 기본 구조 지시문을 사용합니다.

**[app/hero-list.component.html (structural)]**

```html
<li *ngFor="let hero of heroes"></li>
<hero-detail *ngIf="selectedHero"></hero-detail>
```

- *ngFor는 Angular가 영웅 목록에서 영웅당 하나의 `<li>`를 출력 하도록 명령합니다.
- *ngIf는 영웅이 있는 경우에만 HeroDetail 구성 요소가 표현 됩니다.

Attribute directive 는 기존 요소의 모양 또는 동작을 변경합니다. 템플릿 에서는 정규 HTML 속성 이름처럼 보입니다.

양방향 데이터 바인딩을 구현하는 `ngModel directive` 는 속성 지정 문의 예입니다.
ngModel은 대상이 되는 요소(`<input>`)의 이벤트에 반응하여 기존의 value 속성값을 수정 합니다.

**[app/hero-detail.component.html (ngModel)]**

```html
<input [(ngModel)]="hero.name">
```

Angular에는 레이아웃 구조(예:ngSwitch)를 변경 하거나, DOM 요소 및 component의 측면 (예:ngStyle 및 ngClass)을 수정하는 몇 가지 directive가 추가로 있습니다.

물론, 자신의 지시어를 작성할 수도 있습니다. HeroListComponent와 같은 component는 사용자 지정 directive의 한 종류 입니다.

## Services

![](https://lh3.googleusercontent.com/-b5aFwwooygA/WEVN7-MLfAI/AAAAAAAAPsg/Ii8ZaY4au2Q/I/service.png)

service는 응용 프로그램에 필요한 모든 value, 기능 또는 기능을 포괄하는 광범위한 범주 입니다.

거의 모든 것이 서비스가 될 수 있습니다. 서비스는 일반적으로 명확하게 잘 정의된 목적을 가진 클래스입니다.
그것은 특정한 것만을 잘해야 합니다.

예 :

- logging service
- data service
- message bus
- tax calculator
- application configuration

Angular는 service에 대해 구제적으로 정의하고 있지 않습니다.
서비스는 기반이 되는 클래스가 없으며, 서비스를 등록 할 수 있는 곳도 없습니다.

그러나 서비스는 Angular 응용 프로그램의 기본 입니다. component는 서비스를 가장 높게 활용 합니다.

다음은 브라우저 콘솔에 로그를 남기는 service class 의 예입니다.

**[app/logger.service.ts (class)]**

```typescript
export class Logger {
  log(msg: any)   { console.log(msg); }
  error(msg: any) { console.error(msg); }
  warn(msg: any)  { console.warn(msg); }
}
```

영웅을 가져 와서 resolved Promise로 돌려 보내는 영웅 서비스가 있습니다.
`HeroService`는 Logger 서비스와 서버 통신을 위한 작업을 처리하는 또 다른 `BackendService` 을 주입 받습니다.

**[app/hero.service.ts (class)]**

```typescript
export class HeroService {
  private heroes: Hero[] = [];

  constructor(
    private backend: BackendService,
    private logger: Logger) { }

  getHeroes() {
    this.backend.getAll(Hero).then( (heroes: Hero[]) => {
      this.logger.log(`Fetched ${heroes.length} heroes.`);
      this.heroes.push(...heroes); // fill cache
    });
    return this.heroes;
  }
}
```

서비스는 어디에나 있습니다.

component 클래스 들은 가벼워야 합니다. 서버에서 데이터를 가져 오거나 사용자 입력의 유효성을 검사 하거나 콘솔에 직접 로그온 하지 않습니다.
그들은 이러한 작업을 서비스에 위임 합니다.

component의 역할은 User Experience 를 가능하게 하는 것입니다. view(template에서 렌더링 된)와 응용 프로그램 로직 (종종 모델의 개념을 포함) 사이를 조정 합니다.
좋은 component는 데이터 바인딩을 위한 속성과 메서드 만을 제공 하고, 그외에 모든것을 서비스에 위임 합니다.

Angular는 이러한 원칙을 강요하지 않습니다. 3000 라인의 "kitchen sink" 부품을 쓰더라도 불평하지 않습니다.

Angular는 응용 프로그램 로직을 서비스로 요소화 하고, 의존성주입을 통해 해당 서비스를 component 에서 쉽게 사용할 수 있도록 함으로써, 이러한 원칙을 따르도록 도와줍니다.

## Dependency injection

![](https://lh3.googleusercontent.com/-bd0QL2JFWh8/WEVN8Iy4G0I/AAAAAAAAPsk/4OBqEGyybe8/I/dependency-injection.png)

Dependency injection 은 클래스의 새로운 인스턴스에 필요한 완전한 종속성을 제공하는 방법 입니다.
대부분의 의존되는 것들은 service 가 됩니다. Angular는 새로운 component에 필요한 서비스를 제공하기 위해 의존성 주입(dependency injection)을 사용 합니다.

Angular는 생성자의 매개변수의 유형을 보고, component에 필요한 서비스를 알 수 있습니다.
예를 들어, `HeroListComponent`의 생성자 에는 `HeroService` 가 필요합니다.

**[app/hero-list.component.ts]**

```typescript
constructor(private service: HeroService) { }
```

Angular가 component를 만들면 먼저 component에 필요한 서비스를 인젝터에 요청합니다.

인젝터는 이전에 생성한 서비스 인스턴스의 컨테이너를 유지 관리 하는 역할을 합니다.
요청된 서비스 인스턴스가 컨테이너에 없으면, 인젝터는 서비스를 앵귤러로 반환하기 전에, 컨테이너에 해당 인스턴스를 추가합니다.
요청된 모든 서비스가 확인되고 반환되면, Angular는 해당 서비스를 사용하여 component의 생성자를 인수로 호출 할 수 있습니다. 이것이 의존성 주입(dependency injection)입니다.

HeroService 주입 과정은 다음과 같습니다.

![](https://lh3.googleusercontent.com/-rulall8VHwA/WEVN8ROM9cI/AAAAAAAAPso/MHPVpD8iKsQ/I/injector-injects.png)

주입해야 하는 `HeroService` 가 없을 경우, 어떤 class를 주입해야 한다는 것을 어떻게 알 수 있을까요?

이것은 `HeroService`를 provider 에 등록함 으로써 해결 됩니다.
(provider는 일반적으로 서비스 클래스 자체를 생성하거나 반환 할 수있는 서비스 입니다.)

provider는 모듈 또는 component에 등록 할 수 있습니다.

일반적으로 서비스의 동일한 인스턴스가 모든 곳에서 사용 가능하도록 provider를 root 모듈에 추가하십시오.

**[app/app.module.ts (module providers)]**

```typescript
providers: [
  BackendService,
  HeroService,
  Logger
],
```

또는 `@Component 메타 데이터`의 component providers 속성에 등록 합니다.

```typescript
@Component({
  moduleId: module.id,
  selector:    'hero-list',
  templateUrl: 'hero-list.component.html',
  providers:  [ HeroService ]
})
```

component level에 등록 하면 해당 component의 새로운 인스턴스가 나올 때마다, 서비스의 새 인스턴스를 얻게 됩니다.

의존성 주입에 대해 기억해야 할 점 :

- Dependency Injection은 Angular 프레임 워크에 연결 되어 어디서나 사용됩니다.
- 인젝터는 중요한 main 메커니즘입니다.
	* 인젝터는 생성한 서비스 인스턴스의 컨테이너를 유지 관리 합니다.
	* 인젝터는 provider 로부터 새로운 서비스 인스턴스를 생성 할 수 있습니다.
- provider는 서비스를 생성하는 방법 입니다.
- provider에 주입 해야 하는 것들을 등록하십시오.

## Wrap up

Angular 애플리케이션의 8 가지 주요빌딩 블록에 대한 기본 사항을 배웠습니다.

- Modules
- Components
- Templates
- Metadata
- Data binding
- Directives
- Services
- Dependency injection

Angular 프로그램에 대한 기반은 이것이 전부 입니다. 그러나 당신이 알아야 할 모든 것을 포함 하지는 않습니다.

다음은 Angular의 다른 중요한 기능과 서비스를 알파벳순으로 나열한 간단한 목록 입니다.
대부분이 문서 에서 다루고 있습니다 (또는 곧 지원 될 예정입니다).

- Animation : Angular의 애니메이션 라이브러리로 애니메이션 기술 이나 CSS 에 대한 깊은 지식 없이 구성 요소 동작에 애니메이션을 적용합니다.

- Change detaction : 변경 감지 문서 에서는 component 속성 값이 변경되는 시점에 화면을 갱신하거나, 비동기 활동을 가로채거나 하는등의 변화를 감지하는 방법에 대해 설명합니다.

- Events : 이벤트 문서는 구성 요소와 서비스를 사용하여 이벤트 게시 및 구독에 대한 메커니즘을 사용하여 이벤트를 발생 시키는 방법을 다룹니다.

- Forms : HTML 기반 유효성 검사 및 dirty checking 으로 복잡한 데이터 입력 시나리오를 지원합니다.

- HTTP : HTTP 클라이언트를 사용하여 서버와 통신하여 데이터를 가져 와서 데이터를 저장하고 서버 측 작업을 호출합니다.

- Liftcycle hooks : Lifecycle hooks 인터페이스를 구현하여 구성 요소의 생성 에서 파기 까지 주요 수명을 활용하십시오.

- Pipes : 템플릿에 파이프를 사용하여 표시 할 값을 변환하여 사용자 경험을 향상시킵니다. 이 통화 파이프 표현식을 고려해보십시오.

```typescript
price | currency : 'USD': true
```

"42.33"의 가격은 42.33 달러로 표시됩니다.

- Router : 클라이언트 응용 프로그램은 페이지에서 페이지로간 이동시 브라우저를 결코 떠나지 않습니다. (SPA)

- Testing : Angular 테스트 플랫폼을 사용하여 Angular Framework와 상호 작용할 때 응용 프로그램 파트 에서 단위 테스트를 실행합니다.



