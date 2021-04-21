> angular.io > DOCS > GUIDE > [2. Setup](https://angular.io/docs/ts/latest/guide/setup.html)
> 2016/12월 기준 으로 작성 되었고, 의역 하였고, 오역이 있습니다.

# SETUP FOR LOCAL DEVELOPMENT

- 이 설명서를 읽고 사용하는 방법

당신의 개발환경 에서 더 빠르고 효율적으로 개발할 수 있도록 Angular QuickStart 시드를 설치하십시오.

## 로컬 개발 환경 설정

[QuickStart 라이브 코딩 예제](http://plnkr.co/edit/?p=preview&open=app%2Fapp.component.ts)는 Angular 놀이터 입니다.
실제 응용 프로그램을 개발하는 곳이 아닙니다.

당신의 로컬 개발환경 에서 학습해야 합니다... 그것은 우리가 당신이 Angular 를 학습하기 위한 권장 방법 입니다.

[github](https://github.com/angular/quickstart) 에서 유지 관리되는 QuickStart 씨드를 사용하면 컴퓨터에서 새 프로젝트를 쉽고 빠르게 설정할 수 있습니다.

Node와 npm 이 설치되어 있는지 확인 하십시오. 그럼 ...

- 프로젝트 폴더를 만듭니다 (빠른 시작이라고하고 나중에 이름을 바꿀 수 있습니다).
- QuickStart 씨드를 프로젝트 폴더에 복제 하거나 다운로드 하십시오.
- npm 패키지를 설치 하십시오.
- npm start를 실행하여 샘플 응용 프로그램을 시작하십시오.

### Clone

이 터미널 명령을 사용하여 복제 시작 단계를 수행하십시오.

```command
git clone https://github.com/angular/quickstart.git quickstart
cd quickstart
npm install
npm start
```

### Download

[QuickStart 시드를 다운로드](https://github.com/angular/quickstart/archive/master.zip) 하여 프로젝트 폴더에 압축을 풉니다.
그런 다음이 터미널 명령을 사용하여 나머지 단계를 수행하십시오.

```command
cd quickstart
npm install
npm start
```

## QuickStart 씨드에는 무엇이 있습니까?

QuickStart seed 에는 QuickStart 놀이터와 동일한 응용 프로그램이 포함되어 있으며, 실제 코딩 환경에서 더 풍부한 예제를 개발할 수 있는 자체 놀이터가 있습니다.

그러나 진정한 목적은 local 개발을 위한 견고한 기반을 제공하는 것입니다.

결과적으로, 컴퓨터의 프로젝트 폴더 에는 더 많은 파일이 있으며, 그 중 대부분은 나중에 알 수 있습니다.

`/app` 폴더에 있는 다음 세개의 TypeScript (.ts) 파일에 대해서 설명하겠습니다.

* /app
	- app.component.ts
	- app.module.ts
	- main.ts

**[app/app.component.ts]**

```typescript
import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
    template: `<h1>Hello {{ name }}`
})
export class AppComponent { name = 'Angular'; }
```

**[app/app.module.ts]**

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
	imports: [ BrowserModule ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
```

**[app/main.ts]**

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

모든 안내서와 Cookbook 에는 최소한 세 가지 파일이 있습니다.
각 파일은 고유한 목적을 가지고 있으며, 응용 프로그램이 성장함에 따라 독립적으로 발전 합니다.

| File | Purpose |
| ---- | ------- |
| `app.component.ts` | QuickStart 놀이터 에서와 동일한 `AppComponent`를 정의 합니다. 이것은 애플리케이션이 발전함에 따라 중첩 된 컴포넌트의 트리가 될 root component 입니다. |
| `app.module.ts` | `Appmodule`은 Angular 에게 응용프로그램에 조립하는 방법을 알려주는 Root Module 이다. 지금은 `AppComponent` 만 선언합니다. 곧 더 많은 구성 요소가 선언 될 것입니다. |
| `main.ts` | Jit 컴파일러로 응용 프로그램을 컴파일 하고 브라우저에서 실행 되도록 응용 프로그램을 bootstrap 합니다. 이는 대부분의 프로젝트 개발에 있어 합리적인 선택 이며, Plunker와 같은 라이브 코딩 환경에서 실행되는 샘플을 위한 유일한 실행 가능한 선택 입니다. 나중에 문서 에서 대안 컴파일 및 배포 옵션에 대해 배우게 됩니다. |

## Appendix: node and npm

Node.js와 npm은 Angular 및 다른 플랫폼을 사용하는 현대 웹개발에 필수적 입니다. Node는 클라이언트 개발 및 빌드 도구를 지원합니다. npm package manager는 자체 노드 응용 프로그램 으로서 JavaScript 라이브러리를 설치 합니다.

컴퓨터에 설치되어 있지 않은 경우 [지금 다운로드](https://docs.npmjs.com/getting-started/installing-node) 하십시오.

터미널/콘솔 창에서 node -v 및 npm -v 명령을 실행하여 노드 v4.x.x 이상 및 npm 3.x.x 이상을 실행 중인지 확인 하십시오. 이전 버전 에서는 오류가 발생 합니다.

여러 버전의 노드와 npm을 관리 하려면 nvm을 사용하는 것이 좋습니다.
다른 버전의 노드와 npm을 사용하는 컴퓨터에서 이미 프로젝트가 실행 중인 경우 nvm 이 필요할 수 있습니다.

## Appdendix: Why develop locally

브라우저 에서 실시간으로 코딩 하면 Angular를 탐색 할 수 있습니다.

거의 모든 문서 페이지의 링크는 완성된 샘플을 브라우저에서 엽니다.
샘플 코드로 놀고 친구들과 변경 사항을 공유하고, 코드를 다운로드 하여 자신의 컴퓨터에서 실행할 수 있습니다.

QuickStart는 `AppComponent` 파일만 보여줍니다. 놀이터 에서만 내부적으로 `app.module.ts` 및 `main.ts` 에 해당하는 항목을 만듭니다. 그래서 독자는 혼란스럽지 않게 Angular를 발견 할 수 있습니다. 다른 샘플은 QuickStart seed를 기반으로 합니다.

이것 만큼은 주의하세요.

- 당신은 plunker 에 당신의 앱을 보낼 수 없다.
- 코드를 작성할 때 항상 온라인 상태가 아닙니다.
- 브라우저에서 Typescript 변환 과정이 느립니다.
- 타입 지원, 리팩토링 및 코드 완성은 로컬 IDE 에서만 작동합니다.

[live coding](http://plnkr.co/edit/?p=preview&open=app%2Fapp.component.ts) 환경은 놀이터, 문서 샘플을 시도하고 직접 실험해 볼 수있는 장소 로만 사용하십시오.
문서에서 발견한 문제를 제기 하거나, Angular 자체에서 문제를 제기 할 때, 버그를 재현 할 수 있는 완벽한 장소 입니다.

실제 개발을 위해서는 로컬로 개발 하는 것이 좋습니다.



