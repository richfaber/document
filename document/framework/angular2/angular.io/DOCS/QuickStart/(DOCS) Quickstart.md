> angular.io > DOCS > [Quickstart](https://angular.io/docs/ts/latest/quickstart.html)

# QuickStart

- Angular2.x 기초에 대한 간략히 살펴보기


Angular 응용 프로그램은 Component 들로 구성 됩니다. Component는 HTML 템플릿과 화면의 일부를 제어 하는 Component 클래스의 조합 입니다. 다음은 간단한 문자열을 표시 하는 Component 의 예입니다.

**[app/app.component.ts]**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>`
})
export class AppComponent { name = 'Angular'; }
```

당신은 아무것도 설치하지 않고, 이것을 시도 할 수 있습니다. 다른 탭의 Plunkr 에서 [QuickStart 예제](http://plnkr.co/edit/?p=preview&open=app%2Fapp.component.ts)를 열고 따라 하십시오.

모든 Component는 메타 데이터 객체를 사용하는 `@Component decorator` 함수로 시작합니다. 메타 데이터 객체는 HTML 템플릿과 Component 클래스가 어떻게 작동하는 지를 설명 합니다.

selector 속성은 Angle에게 index.html의 사용자 정의 `<my-app>` 태그 내에 구성 요소를 표시 하도록 지시합니다.

**[`index.html (inside <body>)`]**

```typescript
<my-app>Loading AppComponent content here ...</my-app>
```

`template` 속성은 `<h1>` 헤더 안에 메시지를 정의 합니다. 메시지는 "Hello" 로 시작하고, Angular 표현식(보간바인딩[interpolation binding](https://angular.io/docs/ts/latest/guide/displaying-data.html)) 인 {{name}} 으로 끝납니다.

런타임에 Angular는 {{name}}을 Component 의 name 속성 값으로 바꿉니다.

이 예제 에서는 Component 클래스의 name 속성을 'Angular' 에서 'World' 로 변경하고 어떤 결과가 발생 하는지 확인합니다.

보간바인딩은 이 문서에서 발견 할 수 있는 다양한 Angular 기능 중 하나 입니다.

**A WORD ABOUT TYPESCRIPT**
> 이 예제는 JavaScript 의 상위집합인 TypeScript로 작성 되었습니다. Angular 는 Typescript를 사용함으로써, 제품의 개발생산성을 높여줍니다. 그렇다고 자바 스크립트로 Angular 코드를 작성할 수 없는 것은 아닙니다. 이 가이드는 어떻게 해야 하는지를 설명하고 있습니다.

