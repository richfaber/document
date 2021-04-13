> angular.io > DOCS > GUIDE > [9. Dependency Injection](https://angular.io/docs/ts/latest/guide/dependency-injection.html)
> 2016/12월 기준 으로 작성 되었고, 의역 하였고, 오역이 있습니다.

# DEPENDENCY INJECTION

- Angular의 의존성 주입 시스템은 "적시에" 의존 서비스를 만들고 전달 합니다.

의존성 주입은 중요한 응용 프로그램 디자인 패턴 입니다.
Angular는 자체적인 의존성 주입 프레임 워크를 가지고 있으며, 의존성 주입 없이는 응용 프로그램을 만들 수 없습니다.
의존성 주입은 널리 쓰이고 있으며, 거의 모든 사람들이 이것을 DI 라고 부릅니다.

이 장 에서는 DI 가 무엇인지, 왜 DI가 필요한지를 배우게 될 것입니다.
그런 다음 Angular 앱에서 사용하는 방법을 배우게 됩니다.

- 왜 의존성 주입을 해야 하는가?
- Angular 의존성 주입
- Injector providers
- 의존성 주입 토큰
- 개요

[실제 예제](https://angular.io/resources/live-examples/dependency-injection/ts/eplnkr.html)를 실행 하십시오.

## 왜 의존성 주입을 해야 하는가?

아래의 코드를 확인해 보세요.

**[app/car/car.ts (without DI)]**

```typescript
export class Car {
  public engine: Engine;
  public tires: Tires;
  public description = 'No DI';
  constructor() {
    this.engine = new Engine();
    this.tires = new Tires();
  }
  // Method using the engine and tires
  drive() {
    return `${this.description} car with ` +
      `${this.engine.cylinders} cylinders and ${this.tires.make} tires.`;
  }
}
```

우리의 Car 는 필요한 것들을 constructor 내부 에서 모두 생성 합니다. 뭐가 문제일까요?
문제는 우리 Car 클래스가 부서지기 쉽고, 융통성이 없으며, 테스트 하기 어렵다는 것 입니다.

우리의 Car 는 엔진과 타이어가 필요 합니다.
엔진과 타이어를 가져오기 위해서, Car 의 constructor는 Engine과 Tires 클래스를 매우 직관적인 방법으로 인스턴스화 하여 가져 옵니다.

Engine 클래스가 진화 하여, constructor 에 매개 변수를 필요로 한다면?

우리의 Car 는 작동을 멈추고, `this.engine = new Engine(theNewParameter)` 을 다시 작성할 때 까지 작동하지 않는 상태로 있습니다.
Car 를 처음 작성할 때, Engine의 constructor는 매개 변수에 신경 쓰지 않는 상태 였고, 걱정 하지도 않았습니다.
그러나 Engine의 정의가 변경 되면, Car 클래스가 변경 되어야 하므로, 수정을 해야만 합니다. 이런 방식은 Car 가 작동하지 않을 가능성을 보유하게 됩니다.

다른 브랜드의 타이어를 Car 에 설치 하려면 어떻게 해야할까요? 우리는 Tires 클래스가 만드는 브랜드에 의존하게 됩니다.
이것은 Car의 Tires 의 브랜드를 변경하기 까다로운 상태임을 의미 합니다.

또한 지금의 상태는 각각의 새 Car 가 자체 엔진을 얻는 가지게 되고, 다른 Car 와 엔진을 공유 할 수는 없습니다.
제조업체의 서비스 센터에 무선으로 연결되는 것과 같은 소프트웨어 같은, 공유 되어야 하는 다른 의존성을 생각할 수도 있습니다.
우리의 Car 는 그걸 사용할 다른 사용자를 위해 향후 만들어진 서비스를 공유 할 수 있는 유연성이 부족 합니다.

우리가 우리의 Car 에 대한 테스트 코드를 작성할 때, 다양한 가능성 들을 배제하게 됩니다. 가령

테스트 환경에서 새 Engine을 만들 수 있습니까?
엔진 자체는 무엇을 의존 합니까?
그 의존성은 무엇에 달려 있습니까?
Engine의 새로운 인스턴스가 서버에 대한 비동기 호출을 수행 합니까?

등의 테스트 들입니다.
우리는 QA가 진행 되는 동안 위와 같은 일이 생기지 않기를 바랄 것입니다.
(설계에 포함되지 않은 질문이기 때문이죠.)

타이어 압력이 낮을 때, 우리 Car 가 경고 신호를 깜박 거려야 한다면 어떨까요?
테스트 도중 저압 Tires로 교체 할 수 없다면, 실제로 경고 메시지가 깜박이는 것을 어떻게 확인할 수 있습니까?

지금의 Car 는 숨어있는 의존성(가능하게 벌어질 수 있는 것)을 재현 할 수 없습니다.
의존성을 제어 할 수 없으면, 클래스를 테스트 하기가 어려워 집니다.

자동차를 보다 견고하고, 유연하며, 테스트 할 수 있는 방법 으로 만들어야 합니다.

매우 쉽습니다. Car constructor를 DI 가 있는 버전으로 변경 하면 됩니다.

**[app/car/car.ts (excerpt with DI)]**

```typescript
public description = 'DI';

constructor(public engine: Engine, public tires: Tires) { }
```


의존성의 정의를 constructor로 이동 했습니다.
우리의 Car 클래스는 더 이상 engine 이나 tires를 만들지 않고, 사용만 합니다.

> 또한 매개 변수와 속성을 동시에 선언하기 위해, TypeScript 의 생성자구문을 활용 했습니다.

이제 engine과 tires를 constructor 에 전달 하여 Car를 만듭니다.

```typescript
// Simple car with 4 cylinders and Flintstone tires.
let car = new Car(new Engine(), new Tires());
```

간단하지 않습니까? Car 클래스는 이제 의존성 관점에서 engine 및 tires 와 분리 되어 있습니다.
engine이나 tires의 일반적인 API 요구 사항을 준수 하는 한 원하는 모든 종류의 엔진 이나 타이어 를 개별 전달할 수 있습니다.

누군가가 Engine 클래스를 확장 하더라도, Car 클래스에 문제가 생기지 않습니다.

> Car 에는 여전히 문제가 있습니다. Engine을 교체하기 위해 생성 코드를 다음과 같이 업데이트 해야 합니다.
>
> ```typescript
class Engine2 {
  constructor(public cylinders: number) { }
}
// Super car with 12 cylinders and Flintstone tires.
let bigCylinders = 12;
let car = new Car(new Engine2(bigCylinders), new Tires());
```
>
> 중요한 것은, Car 자체를 변경하지 않아도 된다는 것입니다. 이런 문제도 곧 해결할 것입니다.

Car 클래스의 의존성이 완전히 분리되어 있기 때문에, 테스트 하기가 훨씬 쉽습니다.
우리는 테스트 하는 동안 수행할 작업을, constructor 에게 정확하게 지정 하면서 전달할 수 있습니다.

```typescript
class MockEngine extends Engine { cylinders = 8; }
class MockTires  extends Tires  { make = 'YokoGoodStone'; }

// Test car with 8 cylinders and YokoGoodStone tires.
let car = new Car(new MockEngine(), new MockTires());
```

### 우리는 단지 의존성 주입이 무엇 인지를 보았습니다.

이것은 클래스가 외부 소스에게 의존성을 의탁 하는 대신, 자신을 새로 생성하게 만드는 코딩 패턴 입니다.

의존성 주입이 없다면 어떨까요?
Car 를 원하는 사람은 생성할 때마다 Car, Engine 및 Tires 을 따로 만들어야 할지도 모릅니다.
(같은 Car가 아닐수도 있기 때문이죠. new Engine2, new Tires2 ...etc )

우리의 부품들은 필요에 따라서 조립하는 방법으로 만들어 질 필요가 있습니다.

**[app/car/car-factory.ts]**

```typescript
import { Engine, Tires, Car } from './car';
// BAD pattern!
export class CarFactory {
  createCar() {
    let car = new Car(this.createEngine(), this.createTires());
    car.description = 'Factory';
    return car;
  }
  createEngine() {
    return new Engine();
  }
  createTires() {
    return new Tires();
  }
}
```

지금까지 한 것을 종합해서 위의 factory를 보시죠.
3가지 메소드만 필요 하다면 문제가 없습니다.
그러나 응용 프로그램이 커지면, 거대한 거미줄 처럼 상호 의존되는 factory가 됩니다.
(create..(), create..() )

무엇을 주입해야 하는 지를 명시하지 않고, 우리가 원하는 것을 얻어낼 수 있는 아주 nice 한 방법은 없을까요?

이것이 의존성 주입 프레임 워크가 하는 일 입니다.

프레임워크에 `주입기(Injector)` 라고 하는 것이 있다고 상상해 보십시오. 우리는 이 `주입기(Injector)`로 몇 개의 클래스를 등록 하고, 필요할 때 요청만 합시다.

Car 가 필요할 때 인젝터 에게 Car를 요청합니다.

```typescript
let car = injector.get(Car);
```

모두가 승자. Car는 engine이나 tires를 만드는 것에 대해 알 필요가 없고, 사용자는 Car를 만드는 방법에 대해서 아무것도 모릅니다.
유지해야 할 거대한 factory 클래스도 없습니다.
Car 와 사용자 모두 단순히 필요한 것을 요구하는 인젝터가 제공되고 있습니다.

이것이 의존성 주입 프레임 워크의 핵심입니다.

의존성 주입이 무엇인지 알았고, 그 이점을 이해 했으므로 이제는 Angular로 구현되는 방법을 살펴 보겠습니다.

# Angular dependency injection

Agnualr는 의존성 주입 프레임워크를 가지고 있는 큰 배입니다. 이 프레임워크는 다른 프로그램 및 프레임워크에서 독립 실행형 모듈로 사용할 수도 있습니다.

Angular의 component를 작성할 때 우리는 뭘 해야하지?

[The Tour of Heroes](https://angular.io/docs/ts/latest/tutorial/) 에서 제작한 HeroesComponent의 단순화 된 버전으로 시작 하겠습니다.

**[app/heroes/heroes.component.ts]**

```typescript
import { Component }          from '@angular/core';
@Component({
  selector: 'my-heroes',
  template: `
  <h2>Heroes</h2>
  <hero-list></hero-list>
  `
})
export class HeroesComponent { }
```

**[app/heroes/hero-list.component.ts]**

```typescript
import { Component }   from '@angular/core';
import { HEROES }      from './mock-heroes';
@Component({
  selector: 'hero-list',
  template: `
  <div *ngFor="let hero of heroes">
    {{hero.id}} - {{hero.name}}
  </div>
  `
})
export class HeroListComponent {
  heroes = HEROES;
}
```

**[app/heroes/hero.ts]**

```typescript
export class Hero {
  id: number;
  name: string;
  isSecret = false;
}
```


**[app/heroes/mock-heroes.ts]**

```typescript
import { Hero } from './hero';
export var HEROES: Hero[] = [
  { id: 11, isSecret: false, name: 'Mr. Nice' },
  { id: 12, isSecret: false, name: 'Narco' },
  { id: 13, isSecret: false, name: 'Bombasto' },
  { id: 14, isSecret: false, name: 'Celeritas' },
  { id: 15, isSecret: false, name: 'Magneta' },
  { id: 16, isSecret: false, name: 'RubberMan' },
  { id: 17, isSecret: false, name: 'Dynama' },
  { id: 18, isSecret: true,  name: 'Dr IQ' },
  { id: 19, isSecret: true,  name: 'Magma' },
  { id: 20, isSecret: true,  name: 'Tornado' }
];
```

HeroesComponent는 Heroes 동작의 루트 component 이며, `모든 하위 component를 관리` 합니다.
우리 버전 에는 영웅의 목록을 표시하는 자식 HeroListComponent 만 있습니다.

현재 HeroListComponent는 다른 파일(mock-heroes)에 정의하고 있는, 가상의 collection 안에 있는 HEROES 에서 영웅들을 가져옵니다. 개발 초기 단계 에서는 충분할 수 있지만 완벽한 방법은 아닙니다. 이 component를 테스트 하거나, 원격서버의 Model 이 mock-heroes 와 다르면, HEROES mock 데이터를 원격서버의 Model 과 매번 같은 형태를 유지하기 위해 수정 해야 합니다.

우리는 이러한 영웅 데이터를 가져오는 방법을 숨기는 서비스를 만들 수 있습니다.

> service 가 [별도의 의도](https://en.wikipedia.org/wiki/Separation_of_concerns)가 있는 경우, service 코드를 자체 파일에 작성하는 것이 좋습니다.
>
> 자세한 내용은 [이 노트](https://angular.io/docs/ts/latest/guide/dependency-injection.html#one-class-per-file)를 참조하십시오.

**[app/heroes/hero.service.ts]**

```typescript
import { Injectable } from '@angular/core';
import { HEROES }     from './mock-heroes';
@Injectable()
export class HeroService {
  getHeroes() { return HEROES;  }
}
```

우리의 HeroService는 전과 같은 mock 데이터를 반환하는 getHeroes 메소드를 노출 하지만, 이걸 사용하는 사용자는 이것이 무엇인지 알 필요는 없습니다.

> 서비스 클래스 위에 `@Injectable()` 데코레이터가 있는데, 이것을 얘기해야 할 시간이네요.


> 이것은 실제 서비스처럼 보이지 않습니다.
> 원격 서버에서 실제 데이터를 가져 오는 경우 API는 비동기식 이어야 하며, Promise를 반환 합니다. 또한 component가 서비스를 사용하는 방식을 다시 작성 해야합니다. 이것은 중요한 일이지만 현재의 이야기 에는 중요하지 않습니다.

서비스는 Angular의 클래스에 불과합니다. Angular 인젝터를 등록하기 전까지는 말이죠.

### injector 수정

Angular injector를 따로 만들 필요는 없습니다. Angular는 bootstrap 과정을 통해, 응용 프로그램 전반에 걸친 인젝터를 만듭니다.

**[app/main.ts (bootstrap)]**

```typescript
platformBrowserDynamic().bootstrapModule(AppModule);
```

우리는 응용 프로그램에 필요한 서비스를 만드는 providers에 등록하여 인젝터를 설정 해야합니다. 이 장의 뒷부분에 나오는 providers 에 대해 잠깐 설명하겠습니다.

NgModule 또는 애플리케이션 component에 provider 를 등록 할 수 있습니다.

### NgModule에 providers 등록하기

여기 `Logger`, `UserService` 및 `APP_CONFIG` providers를 등록하는 AppModule 이 있습니다.

**[app/app.module.ts (excerpt)]**

```typescript
@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    CarComponent,
    HeroesComponent,
    /* . . . */
  ],
  providers: [
    UserService,
    { provide: APP_CONFIG, useValue: HERO_DI_CONFIG }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

### component에 providers 등록하기

다음의 HeroesComponent는 HeroService를 등록하는 방법 입니다.

**[app/heroes/heroes.component.ts]**

```typescript
import { Component }          from '@angular/core';
import { HeroService }        from './hero.service';

@Component({
  selector: 'my-heroes',
  providers: [HeroService],
  template: `
  <h2>Heroes</h2>
  <hero-list></hero-list>
  `
})
export class HeroesComponent { }
```

### 언제 NgModule 사용, 언제 component 사용?

NgModule에 등록된 모든 providers는 전체 응용 프로그램에서 접근 할 수 있습니다.

한편 component에 등록된 providers는, 그 component와 그의 자식들만 접근할 수 있습니다.

APP_CONFIG 같은 서비스는 응용 프로그램 전반적으로 사용 가능 해야 하지만, HeroService는 Heroes 기능 영역 내에서만 사용하면 됩니다.

> "루트 AppModule 또는 루트 AppComponent에 전체 앱 provider를 추가 하고 싶으세요?" [NgModule FAQ에서](https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html#root-component-or-module).

### HeroListComponent에 주입해서 사용하기

HeroListComponent는 주입된 HeroService 에서 영웅을 얻습니다. 앞에서 설명한 것처럼 의존성 주입 패턴에 따라 component의 constructor 에서 서비스를 요청해야 합니다. 작은 수정 입니다.

**[app/heroes/hero-list.component (with DI)]**

```typescript
import { Component }   from '@angular/core';
import { Hero }        from './hero';
import { HeroService } from './hero.service';
@Component({
  selector: 'hero-list',
  template: `
  <div *ngFor="let hero of heroes">
    {{hero.id}} - {{hero.name}}
  </div>
  `
})
export class HeroListComponent {
  heroes: Hero[];
  constructor(heroService: HeroService) {
    this.heroes = heroService.getHeroes();
  }
}
```

**[app/heroes/hero-list.component (without DI)]**

```typescript
import { Component }   from '@angular/core';
import { HEROES }      from './mock-heroes';
@Component({
  selector: 'hero-list',
  template: `
  <div *ngFor="let hero of heroes">
    {{hero.id}} - {{hero.name}}
  </div>
  `
})
export class HeroListComponent {
  heroes = HEROES;
}
```

### constructor에 집중

constructor 에 매개변수를 추가하는 것이, 주입이 일어나는 것은 아닙니다.

```typescript
constructor(heroService: HeroService) {
  this.heroes = heroService.getHeroes();
}
```

constructor 매개 변수 heroService는 HeroService를 type 으로 지정 했고, HeroListComponent 클래스 에는 @Component 데코레이터가 있습니다.
또한 부모 component (HeroesComponent)에는 HeroService 에 대한 provider 정보가 있다는 점을 상기 하십시오.

constructor의 매개변수 타입, @Component 데코레이터, 부모의 provider 정보가 결합되어 새로운 HeroListComponent를 만들 때마다 Angular 인젝터가 HeroService의 인스턴스를 주입하도록 지시합니다.

### 암시적 인젝터 생성

인젝터 아이디어를 소개했을 때, 우리는 그것을 사용하여 새로운 Car를 만드는 방법을 설명 했습니다.
아래의 코드는 그러한 인젝터가 어떻게 명시적으로 생성되는지를 보여줍니다 :

```typescript
  injector = ReflectiveInjector.resolveAndCreate([Car, Engine, Tires]);
  let car = injector.get(Car);
```

Tour of Heroes 나 다른 샘플 에서 이와 같은 코드는 찾을 수 없습니다.
우리가 해야만한다면 인젝터를 명시적으로 생성하는 코드를 작성할 수 있지만, 거의 하지 않습니다.
Angular는 `<hero-list></hero-list>` 와 같은 HTML 마크업을 통해서, 또는 라우터의 component를 탐색 한 후에 해당 인젝터를 생성하고 호출하는 역할을 합니다.
Angular 에게 이러한 일들을 맡긴다면, 자동으로 의존성 주입의 이점을 누릴 수 있습니다.

### Singleton services

의존성은 인젝터 범주 안에서 한번씩만(singletons) 일어 납니다.
예를들어, 주입된 하나의 HeroService 인스턴스는 HeroesComponent 및 HeroListComponent 자식들과 공유 됩니다.

그러나 Angular DI 는 계층적 주입 시스템으로, 중첩된 인젝터들은 자체적 서비스 인스턴스를 만들 수 있다는 의미 하기도 합니다.
[계층적 인젝터(Hierarchical Injectors)](https://angular.io/docs/ts/latest/guide/hierarchical-dependency-injection.html) 장에서 자세히 알아보십시오.

### component 테스트

우리는 의존성 주입을 위한 클래스를 설계하는 것이, 클래스를 보다 쉽게 테스트 할 수 있다고 강조했습니다.
constructor의 매개변수로 의존적인 목록을 나열하는 것은, 테스트에 필요한 부분을 효과적으로 나타내는 하나의 방법 이기도 합니다.

mock 서비스를 사용하여 HeroListComponent 테스트 하는 코드를 만들어 봅시다.

```typescript
let expectedHeroes = [{name: 'A'}, {name: 'B'}]
let mockService = <HeroService> {getHeroes: () => expectedHeroes }

it('should have heroes when HeroListComponent created', () => {
  let hlc = new HeroListComponent(mockService);
  expect(hlc.heroes.length).toEqual(expectedHeroes.length);
});
```

> [테스팅](https://angular.io/docs/ts/latest/guide/testing.html)을 배워보세요.

### service에 service가 필요한 경우

우리의 영웅 서비스는 매우 간단 합니다. 의존성은 가지는 부분이 없습니다.

의존성이 있다면 어떨까요? Logging 서비스를 통해 활동을 보고 싶다면?
우리는 동일한 constructor 주입 패턴을 적용하여 Logger 매개 변수를 사용하는 constructor를 추가해 보겠습니다.

다음은 수정된 코드 입니다.

**[app/heroes/hero.service (v2)]**

```typescript
import { Injectable } from '@angular/core';
import { HEROES }     from './mock-heroes';
import { Logger }     from '../logger.service';
@Injectable()
export class HeroService {
  constructor(private logger: Logger) {  }
  getHeroes() {
    this.logger.log('Getting heroes ...');
    return HEROES;
  }
}
```

**[app/heroes/hero.service (v1)]**

```typescript
import { Injectable } from '@angular/core';
import { HEROES }     from './mock-heroes';
@Injectable()
export class HeroService {
  getHeroes() { return HEROES; }
}
```

constructor 에 매개변수로 지역변수(private) logger를 만들고 Logger 서비스를 주입합니다.(실제 주입이 이루어진 것은 아닙니다. 단지 선언입니다.)
우리는 누군가가 영웅을 요청할 때 `getHeroes` 메서드 에서 해당 속성을 호출 합니다.

### @Injectable()이 뭐지?

`@Injectable()`는 인젝터에게 인스턴스화 해서 사용해야 하는 class 라는 것을 알려줍니다.
일반적으로 인젝터는 `@Injectable()` 로 표시되지 않은 클래스가 인스턴스를 시도 할 때 오류를 보고 합니다.

> HeroService 의 첫 번째 버전에서는, 주입이 필요한 매개 변수가 없기 때문에 `@Injectable()`을 생략 할 수 있었습니다. 그러나 우리의 서비스가 의존성을 가지기 때문에, 우리는 `@Injectable()`을 가지고 있어야 합니다. Logger 를 주입하기 위해 constructor 매개 변수 메타 데이터가 필요하다는 것을 Angular 에게 알려줘야 하기 때문입니다.

#### 제안 : 모든 서비스 클래스에 `@Injectable()` 을 추가하십시오.

의존성이 없거나, 기술적으로 요구하는 것이 없는 서비스 class 일지라도, 모든 서비스 클래스에 `@Injectable()`을 추가하는 것이 좋습니다.
이유는 다음과 같습니다.

- 향후 교정 : 나중에 의존성을 추가 할 때 `@Injectable()` 을 신경쓸 필요가 없습니다.
- 일관성 : 모든 서비스는 동일한 규칙을 따르게 되고, 왜 데코레이터 누락 되었는지 궁금할 필요가 없습니다.

인젝터는 HeroesComponent와 같은 `component의 인스턴스화` 또한 담당 하고 있습니다.
그런데 왜 HeroesComponent는 `@Injectable()`를 표시하지 않았을까요?
(추가해도 상관 없긴 합니다.)

HeroesComponent 가 이미 @Component로 표시되어 있기 때문에 필요가 없습니다. 데코레이터 class(@Directive 및 @Pipe, @Component 등)는 이미 주입이 가능한 상태 입니다.
실제로 Injectable 데코레이터 에는 인젝터의 의한 인스턴스화 되어야 하는 대상 클래스로 정의되어 있다.
(즉 구지 명시해도 상관없지만, 이미 그렇게 지정되어 있다는 얘기입니다.)

> 런타임시 인젝터는 추출된 JavaScript 코드의 클래스 메타 데이터를 읽고, constructor 매개변수의 type 정보를 참고하여 주입할 항목을 결정 합니다.
>
> 모든 Javascript 클래스가 메타 데이터를 가지고 있는 것은 아닙니다. TypeScript 컴파일러는 기본적으로 메타 데이터를 삭제합니다. `emitDecoratorMetadata` 컴파일러 옵션이 true 일 경우(tsconfig.json에 있는), 적어도 한개의 데코레이터가 있는 class는 metadata가 삭제 되지 않습니다.
>
> 데코레이터의 효과를 유효하게 하려면, Injectable 데코레이터(`@Injectable()`)로 service 클래스 임을 표시하여 의도를 분명히 하십시요.

#### 항상 괄호를 포함하십시요.
> 항상 @Injectable 이 아닌 @Injectable ()을 사용하십시오. 우리가 괄호를 잊어 버리면 우리의 프로그램은 신비로운 결과를 만들 것입니다.

## logger 서비스 생성 및 등록

logger는 두 단계를 거쳐서, HeroService에 주입됩니다.

- 로거 서비스를 만듭니다.
- 응용 프로그램에 등록.

로거 서비스는 매우 간단합니다.

**[app/logger.service.ts]**

```typescript
import { Injectable } from '@angular/core';
@Injectable()
export class Logger {
  logs: string[] = []; // capture logs for testing
  log(message: string) {
    this.logs.push(message);
    console.log(message);
  }
}
```

우리는 애플리케이션의 모든 곳에서 동일한 Logger 서비스를 필요로 하기 때문에, 프로젝트의 애플리케이션 폴더에 넣고 우리의 애플리케이션 모듈인 AppModule 의 providers 배열에 등록 합니다.

**[app/app.module.ts (excerpt)]**

```typescript
providers: [Logger]
```

Logger 등록을 잊은 경우, Angular는 Logger 를 못찾았다는 예외를 throw 합니다.

```console
EXCEPTION: No provider for Logger! (HeroListComponent -> HeroService -> Logger)
```

Angular의 인젝터는 의존성 서비스인 Logger를 provider 에서 찾지 못했다고 말합니다.
새로운 HeroService 에 주입할 Logger를 만들고 Provider에 등록해야 합니다.
이 HeroService 는 새로운 HeroListComponent 에서 작성 및 주입 하겠습니다.

## providers 주입

provider 인 `providers` 는 의존성 값의 런타임 버전입니다. 인젝터는 providers를 통해서 주입해야 하는 component 나 service 의 인스턴스를 생성합니다.

인젝터는 `provider` 서비스의 등록된 것을 통해서, 서비스를 만드는 방법을 알 수 있게 됩니다.

이전에 AppModule의 메타 데이터 `providers` 배열에 로거 서비스를 등록한 적이 있습니다.

```typescript
providers: [Logger]
```

`Logger` 처럼, 어떤 것을 공급(provide)하는 방법은 여러가지가 있습니다.
Logger 클래스 자체는 의도가 명확하기 때문에, 일반적인 방법으로 공급 하였습니다.
그렇지만 이렇게 사용하는 것이 유일한 방법은 아닙니다.

대체 providers를 통해서, 위와 동일하게 행동 하도록 인젝터 에게 알려줄 수 있는 방법이 있습니다.
즉 logger 비슷한 객체를 제공 하는 방법 인데, Logger factory function을 호출하는 provider를 제공하는 것입니다.
상황에 따라 적절한 방법을 사용하면 됩니다.

중요한 것은, 인젝터가 Looger 를 필요로 하는 시점에 provider를 참조 한다는 것입니다.

### Provider 클래스와 provide 객체 표현식

`providers` 는 이렇게 사용한다.

```typescript
providers: [Logger]
```

아래는 두 가지 속성을 가진 provide 객체 표현을 사용하는 provider 등록에 대한 축약 표현 입니다.
(더 많은 옵션이 있어요.)

```typescript
[{ provide: Logger, useClass: Logger }]
```

위에 방법은 의존성 값을 찾고, provider에 등록 하기 위한 키 역할을 하는 토큰을 통해 공급하는 방법 입니다.

아래 방법은 provider 정의 객체를 통해서 공급하는 방법 입니다.

### 대체 class providers

때로는 다른 클래스를 공급(provide)할 때가 있습니다. 다음 코드는 뭔가가 Logger를 요청할 때 BetterLogger를 반환 하도록 인젝터에 지시합니다.

```typescript
[{ provide: Logger, useClass: BetterLogger }]
```

### 의존성이 있는 클래스 provider

어쩌면 `EvenBetterLogger` 가 로그 메시지에 사용자 이름을 표시해야 할 수 있습니다.
이 로거는 주입된 `UserService` 에서 사용자를 가져오고, 이 사용자는 응용 프로그램 레벨 에서 주입 됩니다.

```typescript
@Injectable()
class EvenBetterLogger extends Logger {
  constructor(private userService: UserService) { super(); }

  log(message: string) {
    let name = this.userService.user.name;
    super.log(`Message to ${name}: ${message}`);
  }
}
```

그리고 아래와 같이 구성을 변경해 보십시요.

```typescript
[ UserService,
  { provide: Logger, useClass: EvenBetterLogger }]
```

### 별칭(aliased) 클래스 공급자(providers)

이전 component 가 OldLogger 클래스에 의존 한다고 가정 합시다.
OldLogger 는 NewLogger와 동일한 인터페이스를 가지고 있지만, 어떤 이유로 인해, 오래된 component는 사용할 수 없게 되었습니다.

이럴 경우, 이전 component가 OldLogger로 메시지를 기록 할 때, NewLogger 의 singleton 인스턴스가 대신 이를 처리하기를 원할 수 있습니다.

의존성 인젝터는 component가 필요로 하는 NewLogger 또는 OldLogger 중 하나를 선택 해야 하고, 알맞은 해당 singleton 인스턴스를 주입해야 합니다.

useClass를 사용하여 OldLogger에 NewLogger를 설정하면 되겠지만,

```typescript
[ NewLogger,
  // Not aliased! Creates two instances of `NewLogger`
  { provide: OldLogger, useClass: NewLogger}]
```

이렇게 하면 각각의 instance를 생성하게 되므로, singleton 으로 작동하지 않는, 2개의 같은 provide를 설정한 결과가 되었습니다.
NewLogger와 OldLogger가 둘다 존재하는 것을 원하지는 않을 것입니다.

해결책 : useExisting 옵션을 사용하면 됩니다.

```typescript
[ NewLogger,
  // Alias OldLogger w/ reference to NewLogger
  { provide: OldLogger, useExisting: NewLogger}]
```

### providers 값

때로는 클래스 에서 값을 생성하도록 인젝터에 요청하기 보다, 직접 만들어 쓰는 방법이 더 쉬울 수 있습니다.

```typescript
// An object in the shape of the logger service
let silentLogger = {
  logs: ['Silent logger says "Shhhhh!". Provided via "useValue"'],
  log: () => {}
};
```

그런 다음 이 객체가 로거 역할을 하도록하는 useValue 옵션을 사용하여 provider로 등록합니다.

```typescript
[{ provide: Logger, useValue: silentLogger }]
```

[클래스가 아닌 의존성](https://angular.io/docs/ts/latest/guide/dependency-injection.html#non-class-dependencies) 및 [OpaqueToken](https://angular.io/docs/ts/latest/guide/dependency-injection.html#opaquetoken) 섹션 에서 더 많은 useValue 예제를 참조하십시오.

### Factory 공급자(providers)

우리는 때때로 정보에 기반이 되고 중요한 값이, 어떠한 순간 에는 동적으로 변경 되기를 원할 수 있습니다.
(정보가 브라우저 세션 중에 변경 될 수 있기 때문이죠.)

새로운 비즈니스 요구 사항을 추가하여 설명해 보겠습니다.

`HeroService` 는 일반 사용자는 비밀영웅을 볼 수 없고, 권한이 부여된 사용자만 비밀 영웅을 보아야 합니다.

`EvenBetterLogger` 와 마찬가지로 `HeroService` 에는 사용자에 대한 정보가 필요하고, 사용자가 비밀영웅을 볼 권한이 있는지 알아야 합니다.
이 권한은 단일 응용 프로그램 세션 중에 변경 될 수 있습니다.
(예를 들어 로그아웃 하고, 다른 사용자로 로그인 했을 경우 입니다.)

`EvenBetterLogger` 와는 달리, 우리는 HeroService 에 UserService 를 삽입 할 수 없습니다.
HeroService는 누가 권한이 있고, 누가 권한이 없는지 결정하기 위해 사용자 정보에 직접 접근 할 수 없어야 합니다.

> 왜? 어쩌다 보니 이 같은 일이 일어났습니다.

대신 HeroService constructor는 boolean 플래그를 사용하여 비밀 영웅의 표시를 제어합니다.

**[app/heroes/hero.service.ts (excerpt)]**

```typescript
constructor(
  private logger: Logger,
  private isAuthorized: boolean) { }

getHeroes() {
  let auth = this.isAuthorized ? 'authorized ' : 'unauthorized';
  this.logger.log(`Getting heroes for ${auth} user.`);
  return HEROES.filter(hero => this.isAuthorized || !hero.isSecret);
}
```

우리는 Logger를 주입 할 수는 있어도, `isAuthorized` boolean을 주입 할 수는 없습니다.
factory provider를 통해서 HeroService 의 새로운 인스턴스를 생성 하십시요.

factory provider 에는 팩토리함수가 필요합니다.

**[app/heroes/hero.service.provider.ts (excerpt)]**

```typescript
let heroServiceFactory = (logger: Logger, userService: UserService) => {
  return new HeroService(logger, userService.user.isAuthorized);
};
```

HeroService는 UserService에 접근할 수 없지만, Factory 함수를 통해서는 가능합니다.

우리는 `Logger`와 `UserService` 를 팩토리 provider 에 주입하고, 인젝터가 팩터리 함수를 통해서 전달하도록 하겠습니다. :

**[app/heroes/hero.service.provider.ts (excerpt)]**

```typescript
export let heroServiceProvider =
  { provide: HeroService,
    useFactory: heroServiceFactory,
    deps: [Logger, UserService]
  };
```

`useFactory` 속성은 provider 가 heroServiceFactory를 구현한 팩토리 함수임을 Angular에게 알려줍니다.

deps 속성은 provider 토큰의 배열 입니다. Logger 및 UserService 클래스는 자체 클래스 provider 의 토큰 역할을 합니다.
인젝터는 이러한 토큰을 분석하고, 일치하는 서비스를 팩토리 함수 매개 변수에 주입합니다.

우리는 export된 변수 `heroServiceProvider` 에서 팩토리 provider를 가져왔습니다.
이러한 단계를 통해서, factory provider는 재사용이 가능하게 됩니다.
필요할 때마다 변수로 HeroService 에 등록 해서 사용할 수 있습니다.

이 샘플은 providers 배열 메타 데이터로 등록된 이전 `HeroService` 를 대체 하는 HeroesComponent 에서만 필요 합니다.
여기에 새로운 방식과 이전 방식을 비교해 보세요.

**[app/heroes/heroes.component (v3)]**

```typescript
import { Component }          from '@angular/core';
import { heroServiceProvider } from './hero.service.provider';
@Component({
  selector: 'my-heroes',
  template: `
  <h2>Heroes</h2>
  <hero-list></hero-list>
  `,
  providers: [heroServiceProvider]
})
export class HeroesComponent { }
```

**[app/heroes/heroes.component (v2)]**

```typescript
import { Component }          from '@angular/core';
import { HeroService }        from './hero.service';
@Component({
  selector: 'my-heroes',
  providers: [HeroService],
  template: `
  <h2>Heroes</h2>
  <hero-list></hero-list>
  `
})
export class HeroesComponent { }
```

## 의존성 주입 토큰

provider를 등록 할 때, 우리는 그 provider를 의존성 주입 토큰과 연관 시킵니다.
인젝터는 의존성을 묻는 메시지가 표시 될 때, 참조하는 내부 토큰 공급자 맵을 유지 관리 합니다.
(토큰이 맵의 키입니다.)

이전의 모든 예에서 의존성 값은 클래스 인스턴스 였고, 클래스 유형은 자체 조회 키로 사용 되었습니다.
여기서는 HeroService 유형을 토큰으로 제공하여, 인젝터에서 직접 HeroService를 얻어 보겠습니다.

```typescript
heroService: HeroService = this.injector.get(HeroService);
```

클래스 기반 의존성 주입을 요청하는 constructor를 작성할 때, 비슷한 경우가 있었습니다.
HeroService 클래스 타입으로 constructor에 파라미터를 지정하면, Angular는 HeroService 클래스 토큰을 주입해야 한다는 것을 알게 됩니다.

```typescript
constructor(heroService: HeroService)
```

이것은 대부분의 의존성 값이 클래스에 의해 제공 될 때 특히 편리합니다.

### 클래스가 아닌 의존성들

의존성 값이 클래스가 아닌 경우는 어떻게 합니까? 때로 우리가 주입하고자 하는 것은 문자열, 함수 또는 객체입니다.

응용 프로그램은 종종 작은 사실(응용 프로그램의 제목이나 웹 API 끝점의 주소와 같은)이 많은 설정 객체를 정의하지만,
이러한 설정 객체는 항상 클래스의 인스턴스가 아닙니다.
이러한 것들은 아래의 형태가 일반적 입니다.

**[app/app-config.ts (excerpt)]**

```typescript
export interface AppConfig {
  apiEndpoint: string;
  title: string;
}

export const HERO_DI_CONFIG: AppConfig = {
  apiEndpoint: 'api.heroes.com',
  title: 'Dependency Injection'
};
```

이 설정 객체를 주입 할 수 있게 만들고 싶습니다.
우리는 value provider 를 통해서, 객체를 등록 할 수 있다는 것을 알고 있습니다.

그러나 토큰으로 무엇을 사용해야 할까요? 우리는 토큰을 제공하는 class를 가지고 있지 않습니다. 즉 AppConfig 클래스는 없습니다.

### TypeScript 인터페이스는 유효한 토큰이 아닙니다.

HERO_DI_CONFIG 상수는 AppConfig 인터페이스를 가지고 있습니다.
유감스럽지만 TypeScript 인터페이스를 토큰으로 사용할 수는 없습니다.

```typescript
// FAIL!  Can't use interface as provider token
[{ provide: AppConfig, useValue: HERO_DI_CONFIG })]
```

```typescript
// FAIL! Can't inject using the interface as the parameter type
constructor(private config: AppConfig){ }
```

인터페이스가 기본 의존성 조회 키인 강력한 타입기반의 언어에서, 의존성 주입에 익숙하다면 이상하게 보일 것입니다.

Angular가 틀린 것은 아닙니다. 인터페이스는 TypeScript 디자인-타임-아티팩트 입니다. JavaScript 는 인터페이스가 없습니다.
TypeScript 인터페이스는 컴파일 후 JavaScript 에서 사라집니다. Angular가 런타임에 찾을 수 있는 인터페이스 유형 정보가 없어 진다는 것입니다.

### OpaqueToken

클래스가 아닌 의존성을 provider 토큰으로 사용할 수 있는 한 가지 해결책은 OpaqueToken을 정의하고 사용하는 것입니다. 정의는 다음과 같습니다.

```typescript
import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');
```

OpaqueToken 객체를 사용하여 의존성 provider를 등록합니다.

```typescript
providers: [{ provide: APP_CONFIG, useValue: HERO_DI_CONFIG }]
```

이제 우리는 @Inject 데코레이터를 사용하여 필요한 모든 constructor에 설정 객체를 삽입 할 수 있습니다.

```typescript
constructor(@Inject(APP_CONFIG) config: AppConfig) {
  this.title = config.title;
}
```

> AppConfig 인터페이스는 의존성 주입에 아무런 역할도 없지만, 클래스 내의 설정 객체 입력을 지원합니다.

또는 AppModule과 같은 ngModule에 설정 객체를 제공하고 주입 할 수 있습니다.

**[app/app.module.ts (ngmodule-providers)]**

```typescript
providers: [
  UserService,
  { provide: APP_CONFIG, useValue: HERO_DI_CONFIG }
],
```

## 선택적인 의존성

우리 HeroService 에는 Logger가 필요하지만, Logger 없이 할 수 있는 방법을 없을까요?
우리는 Angular 에게 `@Optional()` 을 사용하여 constructor 인자에 주석을 달아 의존성이 선택 사항 이라고 말할 수 있습니다.

```typescript
import { Optional } from '@angular/core';
```

```typescript
constructor(@Optional() private logger: Logger) {
  if (this.logger) {
    this.logger.log(some_message);
  }
}
```

`@Optional()` 을 사용할 때, 우리 코드는 null 값을 미리 준비합니다. logger를 어딘가에서 쓰이지 않는다면 인젝터는 logger 값을 null로 설정해 버립니다.

## 개요

이 장에서는 Angular 의존성 주입의 기초를 배웠습니다. 다양한 providers를 등록 할 수 있으며, constructor 에 매개 변수를 추가하여 주입된 객체(예:서비스)를 요청하는 방법을 알 수 있었습니다.

Angular 의존성 주입은 설명된 것보다 더 유용합니다. [Hierarchical Dependency Injection](https://angular.io/docs/ts/latest/guide/hierarchical-dependency-injection.html) 장에서 중첩된 인젝터에 대한 지원부터 시작하여 고급 기능에 대해 자세히 배울 것입니다.

## 부록 : 인젝터 직접 작업

우리는 인젝터를 직접 주입하는 경우는 거의 없지만, `InjectorComponent`를 사용하는 예제를 보여드리겠습니다.

**[app/injector.component.ts]**

```typescript
@Component({
  selector: 'my-injectors',
  template: `
  <h2>Other Injections</h2>
  <div id="car">{{car.drive()}}</div>
  <div id="hero">{{hero.name}}</div>
  <div id="rodent">{{rodent}}</div>
  `,
  providers: [Car, Engine, Tires, heroServiceProvider, Logger]
})
export class InjectorComponent {
  car: Car = this.injector.get(Car);
  heroService: HeroService = this.injector.get(HeroService);
  hero: Hero = this.heroService.getHeroes()[0];
  constructor(private injector: Injector) { }
  get rodent() {
    let rousDontExist = `R.O.U.S.'s? I don't think they exist!`;
    return this.injector.get(ROUS, rousDontExist);
  }
}
```

인젝터 자체가 주입 가능한 서비스입니다.

이 예제 에서는 component가 가지고 있는 Injector를 component의 constructor 에서 주입하고, 주입된 인젝터를 사용해서, 원하는 서비스를 요청합니다.
서비스가 component 에 주입된 것이 아니고, injector.get을 호출하여 사용하는 것입니다.

get 메소드는 요청된 서비스를 해결할 수 없는 경우 오류를 발생시킵니다. 대신에 이 서비스 또는 조상 인젝터에 등록되지 않은 서비스(ROUS)를 검색하기 위해 수행하는 두 번째 매개 변수 (서비스를 찾을 수 없는 경우 반환 할 값)로 get을 호출 할 수 있습니다.

> 방금 설명한 기술은 [서비스 locator 패턴](https://en.wikipedia.org/wiki/Service_locator_pattern)의 예입니다.
>
> 진짜 필요 하지 않는 한 이 기술을 피해야 합니다. 설명하기 어렵고, 이해하기도 어렵고, 테스트 하기도 어렵습니다. 우리는 constructor를 통해서, 이 클래스가 요구 하는 것과 무엇을 하고 싶어 하는지도 확인하지 못합니다.
>
> 이 방법은 일반적으로 동적으로 서비스를 획득해야 할 경우, 인위적으로 이러한 접근 방식을 취할 수 있다는 것만 보여줍니다.

## 부록 : 파일당 하나의 클래스를 권장 하는 이유

같은 파일에 여러 개의 클래스가 있는 것은 혼란스럽고 피하는 것이 좋습니다. 개발자는 파일당 하나의 클래스를 예상합니다.

이 조언을 무시하고 HeroService 클래스와 HeroesComponent를 같은 파일에 결합하고, 마지막에 component를 정의해 보십시요.
서비스 전에 component를 정의하면 런타임 null 참조 오류가 발생 하게 됩니다.

> 이 블로그 게시물에서 설명 한대로 `forwardRef()` 메서드를 사용하면 component를 먼저 정의 할 수 있습니다. 그러지 말고 별도의 파일에 component와 서비스를 정의하여 문제를 피하십시오.



