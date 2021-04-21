> angular.io > DOCS > GUIDE > [5. The Root Module](https://angular.io/docs/ts/latest/guide/appmodule.html)
> 2016/12월 기준 으로 작성 되었고, 의역 하였고, 오역이 있습니다.

# APPMODULE: THE ROOT MODULE

- Angular 가 "AppModule" 에서 앱을 만들고 부트스트랩 하는 과정을 알려줍니다.

Agnular Module class는 프로그램 간에 어떻게 동작 해야 하는 지를 설명 합니다.
모든 응용 프로그램은 적어도 하나의 Angular Module이 있습니다. 이 모듈은 응용 프로그램을 시작하기 위해 부트스트랩 하는 루트 모듈 입니다.
루트 모듈 에서는 당신이 원하는 무엇이든 부를 수 있습니다. 일반적인 이름은 AppModule 입니다.

아래 예제는 아주 작은 `AppModule`로 새 프로젝트의 설정을 정의 했습니다. 애플리케이션이 성장함에 따라 이 모듈은 발전될 것입니다.

**[app/app.module.ts]**

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
	imports: [ BrowserModule ],
    declarations: [ AppComponent ],
    bootstrap:[ AppComponent ]
})
```

import 문 다음 에는 `@NgModule 데코레이터` 로 장식된 클래스가 있습니다.

@NgModule 데코레이터는 AppModule을 Angular module class(NgModule 클래스 라고도 함)로 식별 합니다. @NgModule은 응용 프로그램을 컴파일 하고 시작하는 방법을 Angular 에게 알려주는 메타 데이터 객체를 사용 합니다.

- imports — 이 모든 애플리케이션이 브라우저 에서 실행 될때 필요한 BrowserModule.
- declarations — 응용 프로그램의 유일한 component, 또한 ...
- bootstrap — Angular 가 index.html 호스트 웹 페이지를 만들고 삽입 하는 root component 입니다.

Angular 모듈은(NgModules) Angular 모듈의 세세한 작동 방식을 설명 합니다.
현재 이 세 가지 속성에 대한 몇 가지 기본 사항만 알아도 됩니다.

### imports 배열

Angular 모듈은 개별 단위의 기능 들을 통합 하는 방법 입니다.
Angular의 많은 기능들이 Angular 모듈로 구성 됩니다.
HTTP 서비스는 `HttpModule` 에 있습니다. 라우터는 `RouterModule` 에 있습니다.
즉 이런 것들을 합쳐서 기능 모듈을 만들 수 있습니다.

응용 프로그램에 기능이 필요할 때 imports 배열에 모듈을 추가 합니다.

응용 프로그램의 대부분은 브라우저에서 실행 됩니다.
브라우저에서 실행되는 모든 응용 프로그램은 `@angular/platform-browser` 의 `BrowserModule` 이 필요합니다.
따라서 이러한 모든 애플리케이션은 root AppModule 의 import 배열에 `BrowserModule` 이 포함 됩니다.
다른 가이드 및 cookbook 페이지는 이 배열에 모듈을 추가 해야 할 때 참고가 됩니다.

> import 배열은 NgModule 클래스 에만 있습니다. 다른 종류의 class에 imports를 넣지 마십시오.

> 파일의 맨 위에 있는 import 문을 Angular 모듈의 imports 배열과 혼동하지 마십시오. 그들은 서로 다른 직업을 합니다.
>
> JavaScript import 명령문을 사용하면 다른 파일 에서 내보낸 심볼에 접근 할 수 있으므로, 이 파일에서 심볼을 참조 할 수 있지만, Angular의 import를 통해 알고 있는 것과는 다릅니다.
>
> 모듈의 import 배열은 Angular 에게 응용 프로그램이 제대로 작동 해야 하는 특정 Angular 모듈(@NgModule로 꾸며진 클래스)에 대해 알려줍니다.

### declarations 배열

하나의 NgModule 클래스에, declarations 배열에 필요한 component를 나열하여, AppModule에 속한 component를 Angular 에게 알려줍니다.
더 많은 component를 만들었을 경우, declarations에 추가 해야 합니다.

declarations 배열에 추가 해야 하는 다른 두 종류의 클래스 (directives 및 pipes)를 만드는 방법을 배워 보십시오.

> declarations 배열에는 component, directives 및 pipes 선언문만 포함 됩니다. declarations에 다른 종류의 class를 포함하지 마십시오. (NgModule 클래스, service 클래스, model 클래스 등)

### bootstrap 배열

root AppModule의 bootstrap 되어진 응용 프로그램을 시작 하십시요.
bootstrap 한다는 것은 작성된 component를 bootstrap 배열에 나열 하고, 나열된 component를 브라우저 DOM 에 삽입 하는 과정을 말합니다.

bootstrap된 component는 component들이 가지고 있는 구조(tree)의 기초가 되는 component들 입니다.
통상적으로 bootstrap된 component를 삽입 한다는 것은, 해당 tree에 필요한 것들을 채우는 `component 생성 단계` 의 상속 과정이 수행됨을 의미 합니다.

host 웹페이지에 둘 이상 의 component tree를 배치 할 수는 있지만, 일반적 이지는 않고,
대부분의 응용 프로그램은 component 트리가 하나만 있으며 단일 루트 component를 부트 스트랩합니다.

하나의 루트 component의 작명은 원하는 대로 만들면 되지만, 대부분의 개발자는 AppComponent 라고 합니다.

## Bootstrap in main.ts

응용 프로그램을 부트스트랩 하는 방법은 많습니다. 수많은 변수들은 응용 프로그램을 컴파일 하려는 방법과 실행 위치에 종속되어 집니다.

이번 과정 에서는 `Just-in-Time (JiT)` 컴파일러를 이용해서 동적으로 애플리케이션을 컴파일 하고, 브라우저에서 실행하는 방법으로 진행 하겠습니다.
나중에 다른 옵션에 대해서 알 수 있습니다.

JiT로 컴파일 된 브라우저 응용 프로그램을 부트스트랩 하기 위한 권장장소 로써, app/main.ts 라는 app 폴더에 별도의 파일이 있습니다.

**[app/main.ts]**

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

이 코드는 동적(JiT) 컴파일을 위한 브라우저 플랫폼을 생성하고 위에서 설명한 AppModule을 부트스트랩 합니다.

부트스트랩 과정은 실행 환경을 설정하고, 모듈의 부트스트랩 배열에 있는 루트 AppComponent를 분석해서, component의 인스턴스를 만든 다음 component의 선택자로 식별 되는 `요소 태그` 내에 삽입 합니다.

AppComponent 선택자 (여기와 대부분의 문서 샘플) 는 my-app 입니다. Angular는 index.html 에서 `<my-app>` 태그를 찾습니다.

```html
<my-app><!-- content managed by Angular --></my-app>
```

이 파일은 매우 정석적인 방법입니다. 설정한 후에는 다시 변경 할 수 없습니다.

## QuickStart의 AppModule

모든 Angular 응용 프로그램은 root 에 NgModule(퀵 스타트 포함)이 있어야 합니다. [Quickstart절](https://angular.io/docs/ts/latest/quickstart.html) 에서는 보지 못했지만, root 에 있습니다.

index.html 에는 Angular가 필요로 하는 것들을 빨리 발견하고, AppComponent 에 집중할 수 있도록 숨겨진 AppModule을 생성 하고, 부트스트랩 하고 있습니다.

모험을 하고 싶다면, AppModule 및 main.ts 를 QuickStart plunker 의 라이브 코드에 추가 하십시오.

index.html 에서 다음 `<script>` 태그를 제거하고 작업 내용을 확인하십시오.

**[Remove this script tag from "index.html"]**

```html
<script> window.autoBootstrap = true; </script>
```



