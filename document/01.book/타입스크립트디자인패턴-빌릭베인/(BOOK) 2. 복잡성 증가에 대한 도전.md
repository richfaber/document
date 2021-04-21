![타입스크립트 디자인 패턴](https://lh3.googleusercontent.com/-9rIL7BmyXH4/WjZKwIgcaLI/AAAAAAAATI8/GPFiMFtIqCwomkN34B-BHETdbk-whOAUACHMYCw/I/1492078251UdV8l4PZ.jpg)  
[타입스크립트 디자인 패턴](http://www.yes24.com/24/goods/38881387?scode=032&OzSrank=1)

프로그램의 본질은 특정 조건에 따른 분기와 자동화선택의 조합을 나열해 놓는 것이다.

어디서 분기를 해야는지, 분기되면 어떤 선택을 하게 자동화 할 수 있는지를 정의하는 행위라고 볼 수 있다.

이런 분기의 수는 프로젝트가 복잡하면 복잡해 질수록 엄청나게 분리되어 지고, 이런 현상은 실제 개발자가 자신의 개발을 재분석 해야 할 정도로 복잡해지는 해프닝이 생기게 된다.

이러한 복잡함의 실타래를 조금이나마 풀어내기 위한 기법들을 살펴보겠다.

# 기본사항 구현

예제를 통해서 로직을 배운 다음, 패턴을 적용한 로직과 소요시간을 비교해 보자

## 코드 기반 생성

우선 이것을 테스트 하기 위해, `server.ts` 파일과 `client.ts` 파일을 생성하자.

```typescript
// filename: [server.ts]
export class Server {
    
}
```

```typescript
// filename: [client.ts]
export class Client {
    
}
```

그 다음에 이 2개의 파일을 가져오기 위한 `test.ts` 파일을 생성하자.

```typescript
// filename: [test.ts]
import { Server } from './server';
import { Client } from './client';
```

이제 컴파일을 시도할 껀데, 생성한 3개 파일을 전부 하는게 아니라, `test.ts` 파일만 한다.

```command
> tsc test
```

터미널에서 명령을 실행하면, 3개의 `js` 파일이 생성된다. 타입스크립트 컴파일러가 자체판단으로 컴파일이 필요하기 때문에, 하나의 파일을 컴파일 시도했음에도 나머지 파일을 같이 컴파일 해 버린 것이다.

이렇게 중심이 되는 파일을 통상 `엔트리` 라고 하고,  `entry.ts` 파일로 생성해서 사용한다.
(이런 형태는 자바스크립트 번들러인 웹팩 에도 있다.) 

## 동기화 할 데이터의 초기 구조 정의

이제.. 속도체크를 위해서 `timestamp` 속성과 예제를 위한 `data` 속성을 추가하자.

지금 부터는 `묻지마 주입식 타이핑` 의 시간이다.

```typescript
// filepath: [server.ts] 
export class Server {

}

export interface DataStore {
    timestamp: number;
    data: string;
}
```

## 타임스탬프를 비교하여 데이터 가져오기

데이터를 가져오는 메소드를 추가 하자

```typescript
// filepath : [server.ts]
export class Server {

    store: DataStore = {
        timestamp: 0,
        data: ''
    };

    getData(clientTimestamp: number): DataStore {
        if(clientTimestamp< this.store.timestamp) {
            return this.store;
        } else {
            return undefined;
        }
    }

}

export interface DataStore {
    timestamp: number;
    data: string;
}
```

이제 클라이언트에서 사용하는 코드를 추가 한다.

```typescript
// filepath : [client.ts]
import { Server, DataStore } from "./server";

export class Client {
    store: DataStore = {
        timestamp: 0,
        data: undefined
    };

    constructor (public server: Server) {

    }
}
```

`store` 라는 변수의 인터페이스는 `DataStore` 의 형태를 가져야만 하고, 초기값을 주었고, `constructor` 의 변수로 `server` 라는 변수는 해당 클래스의 어디서든 사용할 수 있는 `public` 접근제한을 가지고,  클래스가 생성될 때 `server.ts` 에서 `export` 하고 있는 `Server` 클래스를 `new` 연산자를 통해서 생성 후 연결한다.

이렇게 기본적인 형태를 구성하고 여기에 `synchronize` 메소드를 추가한다.

```typescript
// filepath : [client.ts]
import { Server, DataStore } from "./server";

export class Client {
    store: DataStore = {
        timestamp: 0,
        data: undefined
    };

    constructor (public server: Server) {

    }

    sychronize(): void {
        let updatedStore = this.server.getData(this.store.timestamp);
        if( updatedStore ) {
            this.store = updatedStore;
        }
    }
}
```

`syhcronize` 메소드는 return 값이 없고(void), `server` 클래스의 `getData` 메소드를 활용하여, 변경되는 값을 `Client` 클래스에 `store` 속성에 대입한다.

`묻지마 주입식 타이핑` 시간은 계속된다.

### 양방향 동기화

서버에 업데이트 상황만 동기화 하는 것이 아니라, 클라이언트가 최신일 때는 그것이 서버로 업데이트 까지 되어야 하는 것이 상호동기화라고 볼 수 있고, 그러한 `양방향 동기화` 를 위해서 서버로 업데이트 하는 코드도 추가하자.

```typescript
// filepath : [client.ts]
import { Server, DataStore } from "./server";

export class Client {
    store: DataStore = {
        timestamp: 0,
        data: undefined
    };

    constructor (public server: Server) {

    }

    sychronize(): void {
        let updatedStore = this.server.getData(this.store);
        if( updatedStore ) {
            this.store = updatedStore;
        }
    }

    update(data: string): void {
        this.store.data = data;
        this.store.timestamp = Date.now();
    }
}
```

그리고 서버도 업데이트 받을 수 있도록 `server.ts` 에 `getData` 메소드를 변경하자. 의미가 좀 어긋나는 듯 보이니 `getData` 메소드이름도 `syncronize` 로 변경하고, `client.ts` 의 `syncronize` 메소드에서 사용하던 `getData`도 `syncronize` 로 변경하자.

```typescript
// filepath : [client.ts]
import { Server, DataStore } from "./server";

export class Client {
    store: DataStore = {
        timestamp: 0,
        data: undefined
    };

    constructor (public server: Server) {

    }

    sychronize(): void {
        let updatedStore = this.server.synchronize(this.store);
        if( updatedStore ) {
            this.store = updatedStore;
        }
    }

    update(data: string): void {
        this.store.data = data;
        this.store.timestamp = Date.now();
    }
}

// filepath : [server.ts]
export class Server {

    store: DataStore = {
        timestamp: 0,
        data: ''
    };

    synchronize(clientDataStore: DataStore): DataStore {

        if(clientDataStore.timestamp > this.store.timestamp) {

            this.store = clientDataStore;
            return undefined;

        } else if (clientDataStore.timestamp < this.store.timestamp) {

            return this.store;

        } else {

            return undefined;

        }

    }
}

export interface DataStore {
    timestamp: number;
    data: string;
}
```

이제 만들어진 2개의 클래스를 활용해서 값을 테스트 해보자.

```typescript
// filepath : [test.ts]
import { Server } from './server';
import { Client } from './client';

let server = new Server();
let client = new Client( server );

// 서버의 값이 변경되었을 때, 동기화가 잘 되는지 확인.
server.synchronize( { timestamp: Date.now(), data: '서버에 있는거' });

console.log( `CLIENT.STORE => ${client.store.data}` ); // CLIENT.STORE => undefined
console.log( `SERVER.STORE => ${server.store.data}` ); // SERVER.STORE => 서버에 있는거

client.sychronize();

console.log( `after sync CLIENT.STORE => ${client.store.data}` ); // after sync CLIENT.STORE => 서버에 있는거

// 클라이언트의 값 변경 후, 싱크를 통해 서버에 전달.
client.update("이거? 1");
client.update("이거? 8");

console.log( `CLIENT.STORE => ${client.store.data}` ); // CLIENT.STORE => 이거? 8
console.log( `SERVER.STORE => ${server.store.data}` ); // SERVER.STORE => 이거? 8
```

자 이제 터미널에서 결과를 보자.

```command
> node test
CLIENT.STORE => undefined
SERVER.STORE => 서버에 있는거
after sync CLIENT.STORE => 서버에 있는거
CLIENT.STORE => 이거? 8
SERVER.STORE => 이거? 8
```

서버의 값이 바뀌었을 경우, `client.sychronize` 메서드를 통해서 값을 동기하고, `client.update` 메서드를 통해서 값을 바꾸면 그 값이 `server` 로 전달 된다. 클라이언트 값이 변경될 때는 `sychronize` 가 없다.

뭔가 이상한데..???

### 기본 구현 과정에서 잘못된 점

#### 서버에서 클라이언트로의 데이터 저장소 전달은 적합하지 않다.

우선 `server.ts` 에 구현되어 있는 `synchronize` 의 return 타입이 `datastore` 라는 의미가 아니라, 그 안에 있는 `timestape, data` 의 값이 전달되는 것이다. 단순히 사전적 해석의 의미로 `데이터저장소` 를 return 하는 것은 아니기 때문에, 오해의 소지가 있으므로 `interface` 를 하나 추가해서 구분해 주자.

덧붙여, `return this.store` 부분을 직접 return 안하고, 객체로 return 해주는 방식으로 변경한다. (왜?? -_-? 왜지..)

```typescript
// filepath : [server.ts]
export class Server {

    store: DataStore = {
        timestamp: 0,
        data: ''
    };

    synchronize(clientDataStore: DataStore): DataSyncingInfo {

        if(clientDataStore.timestamp > this.store.timestamp) {

            this.store = clientDataStore;
            return undefined;

        } else if (clientDataStore.timestamp < this.store.timestamp) {

            return {
                timestamp: this.store.timestamp,
                data: this.store.data
            };

        } else {

            return undefined;

        }

    }

}

export interface DataStore {
    timestamp: number;
    data: string;
}

export interface DataSyncingInfo {
    timestamp: number;
    data: string;
}
```

#### 관계 명확히 하기

분리된 `DataSyncingInfo` 인터페이스는 서버와 클라이언트간에 공유되는 인터페이스용으로 사용되야 한다. 반면 `DataStore` 는 서버와 클라이언트 양측에서 공유되지는 않도록 할 거다. 
(엄밀히는 다른것이 되었음)

