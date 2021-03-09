출처 : 
[![thumbs](https://lh3.googleusercontent.com/-DP_1WlcsJxw/WWHQ9TJixuI/AAAAAAAASKE/ndaT8Dslq1Ivom24xHoYd9w_eQObvMQwwCHMYCw/I/thumbs.jpg)](http://www.yes24.com/24/Goods/41070512?Acode=101)

# (BOOK) 7. HTTP 통신과 RxJs

서버와 데이터를 주고받기 위해서 자바스크립트 파트에서는 `XMLHttpRequest` 를 사용하거나, 지원 해주는 라이브러리를 사용한다.

jQuery를 사용한다면  `$.get` 또는 `$.post, $.ajax` 등의 함수를 사용할 수 있다.

```javascript
// Ajax 호출 하기 전 로직 ...
$.get('someURL', function(res) {
	// 어떤 작업.
});
```

통신이 성공하고 나면 `function(res) { }` 형태로 그 다음에 수행할 일을 처리한다.

이런식의 `통신성공` 후에 뭔가를 처리할 함수를 `콜백함수` 라고 하는데, 한번의 통신으로 모든 처리를 할 수 있다면 좋겠지만, 콜백성공 후에 다른 통신이 있다면

```javascript
$.get('someUrl', function(res) {
	if(res가 성공) {
		$.get('someUrl2', function(res) {
			if(res가 성공) {
				...
			}
		}
	} else {
	|	
});
```

이런 무한의 형태를 갖추게 되기 때문에, 이런 콜백지옥을 벗어나기 위해서, 프로젝트에 ES6 표준인 `Promise` 를 많이 사용하는 추세이다.

앵귤러는 비동기 로직을 효과적으로 제어하기 위해서 `RxJS` 라는 기술을 선택하였다.

`RxJS`는 `ReactiveX 프로젝트` 시리즈 중 자바스크립트 버전에 해당하는 라이브러리 이다.

이것은 앵귤러가 비동기로 실행되는 곳곳에서 사용되고 있고, 앵귤러가 제공하는 `Http 서비스` 메소드는 `RxJS` 를 기본 으로 구현되어 있다.

## HttpModule 과 Http 서비스 기초

`HttpModule` 은 `@angular/http 패키지`에 포함되어 있는 모듈이다.

Angular-cli 를 이용해서 조회, 등록, 수정, 삭제 기능을 하는 `UserService`를 하나 만들어 보자.

```command
> ng g service UserService
installing service
  create src/app/user-service.service.spec.ts
  create src/app/user-service.service.ts
  WARNING Service is generated but not provided, it must be provided to be used
```

```typescript
// filename: [app/user.service.ts]
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(public http: Http) { }

}
```

`Http` 클래스를 주입 받아서 `UserService` 의 `constructor` 의 매개변수로 받았다. 매개변수로 받으면 앵귤러가 자동으로 서비스 객체를 생성(new Http()) 해서 해당 클래스에 속성으로 부여해 준다.

```typescript
// filename: [app/user.service.ts]
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(public http: Http) { }

  getUser(id: number, callback) {
    this.http.get(`/api/users/${id}`, user).map(res => res.json()).subscribe(callback);
  }

  addUser(user: any, callback) {
    this.http.post(`/api/users/${user.id}`, user).map(res => res.json()).subscribe(callback);
  }

  modifyUser(user: any, callback) {
    this.http.put(`/api/users/${user.id}`, user).map(res => res.json()).subscribe(callback);
  }

  removeUser(user: any, callback) {
    this.http.delete(`/api/users/${user.id}`).subscribe(callback);
  }

}
```

Ajax 호출 후에 `.map()` 메소드로 전달해서 받은 `res` 데이터를 `JSON` 형태로 변경하는 처리를 하고 있다. 이것은 `Http` 서비스의 메소드 들이 체이닝 형태를 가지고 있다는 것을 알 수 있고, 마지막엔 subscribe 메소드로 콜백을 전달하고 있다.

마지막의 `subscribe` 가 `RxJS`의 `Observable` 타입에 선언된 메소드로 `Http` 서비스의 모든 인터페이스는 `Observable` 을 반환하고 있다는 것을 알 수 있다.
(-_-??)

### angular-in-memory-web-api 활용

프론트엔드 작업을 하다 보면 `mock-api` 가 필요할 떄가 있다. 백엔드가 아직 구현되지 않았을 때이다.
약식으로 `mock-api`를 구성할 수 있도록 하는 `angular-in-memory-web-api` 패키지가 있다.

사용하기 위해선 `npm`을 통해서 설치를 해줘야만 한다.

```command
> npm i --save angular-in-memory-web-api
```

그리고 `angular-in-memory-web-api` 패키지가 제공하는 `InMemoryDbService` 클래스를 이용해서 클래스를 만든다.

```command
> ng g service in-memory-user
installing service
  create src/app/in-memory-user.service.spec.ts
  create src/app/in-memory-user.service.ts
  WARNING Service is generated but not provided, it must be provided to be used
```

```typescript
// filename: [app/in-memory-user.service.ts]
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user/user.model';

@Injectable()
export class InMemoryUserService implements InMemoryDbService {
  private _database: any;

  constructor() { }

  createDb() {
    this._database = {};
    this.makeUserTableAndDummyData();
    return this._database;
  }

  private createTable(tableName: string, initialData: any[]) {
    this._database[tableName] = initialData;
  }

  private makeUserTableAndDummyData() {
    const dummyUserData: User[] = [
      { id: 1, name: 'woojin', age: 33 },
      { id: 2, name: 'heewon', age: 30 },
      { id: 3, name: 'junha', age: 43 }
    ];

    this.createTable('users', dummyUserData);
  }

}
```

이렇게 작성하고 `AppModule`에 등록하면 된다.

```typescript
// filename: [app/app.module.ts]
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { UserService } from './user/user.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryUserService } from './in-memory-user.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryUserService, { delay: 500, put204: false })
  ],
  providers: [ UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

메모리에 가상으로 `Db`를 만드는 것인데, 하나 만들어 두고 프로젝트 마다 재활용하면 좋을거 같다.

## RxJs

`ReactiveX` 시리즈 중에 자바스크립트로 구현된 라이브러리가 `RxJs` 이다. 비동기로 일어나는 이벤트를 효율적으로 다루기 위한 기술이다.

앵귤러에 필수 패키지 이지만, 생각보다 학습비용이 들어 간다고 한다.

`ReactiveX` 가 해결하려는 것은 `비동기 코드를 어떻게 처리하는게 좋은가?` 이고, 비동기통신은 콜백으로 작업할 수밖에 없는데, 애플리케이션이 복잡해 짐에 따라서, 로직상의 우선순위도 중요해지고, 여러가지 해결해야 할 문제들이 생기게 되었는데, 이러한 것들을 효율적으로 다루기 위해서 `ReactiveX` 기술이 등장하였다. 이런 비슷한 배경의 기술이 `Future, async/await, Promise` 등이다.

이런 `ReactiveX` 는 다양한 언어, 환경별로 제공되어 있어서 학습해 두면(미묘한 차이가 있겠지만) 도움이 된다.
(RxJava, RxSwift 등 동일한 API가 제공된다.)

`RxJS`는 기본적으로 `Observable, Observer, Subscription` 의 관계로 설명이 가능하고, 데이터를 주시하고 있다가 변경시에 반응하는 것이 주요 개념 이라고 본다. 이 데이터 라는 것은 광범위 하게 본다면, 마우스의 현재위치 정보 또한 범주에 해당한다.

즉 변할 수 있는 값이 있다면, 추적하여 가공하고 변경하고 콜백처리 하는 것이 가능하다는 것이다.

jQuery 나 Promise 보다 더 가치있게 보는 것은, `RxJs`가 제공하는 데이터 관련 연산자를 통해서, 복잡한 비동기 이벤트 간의 처리를 손쉽게 다룰 수 있다는 것에 있다. (map, filter, reduce등)

[RxJs 소개글](https://hyunseob.github.io/2016/10/09/understanding-reactive-programming-and-rxjs/)


