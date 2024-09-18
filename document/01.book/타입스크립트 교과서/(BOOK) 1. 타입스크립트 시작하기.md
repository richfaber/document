# 타입스크립트 시작하기

[![](https://image.yes24.com/goods/121811365/XL)][https://www.yes24.com/Product/Goods/121811365]

## 타입스크립트를 공부할 때 알아야 할 단 한 가지

자바스크립트를 보완하는 10%의 추가 구문이다.

```typescript
const hello: string = "world";

function add(x: number, y: number): number {
  return x + y;
}

interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "zero",
  age: 28,
};
```

이 구문은 아래의 자바스크립트 코드와 같다.

```javascript
const hello = "world";

function add(x, y) {
  return x + y;
}

const person = {
  name: "zero",
  age: 28,
};
```

타입스크립트 플레이 그라운드를 활용하자

## 왜 타입이 필요한가

자바스크립트로 작성된 프로그램의 크기, 범위 복잡성은 기하급수적으로 커졌지만, 다른 코드 단위 간 관계를 표현하는 자바스크립트 언어의 능력은 그렇지 못했다. 더불어 언어와 프로그램 복잡성 간 불일치는 자바스크립트 개발을 규모에 맞게 관리하기 어려운 작업으로 만들었습니다.

가장 흔히 하는 실수로, 단순한 오타, 라이브러리 API 를 이해하지 못한 것, 런타임 동작에 대한 잘못된 가정 또는 다른 오류 때문일 수도 있다. 타입스크립트의 목표는 자바스크립트 프로그램의 정적 타입 검사이다.

즉 코드 실행 전에, 정확한 타입인지 확인하는 도구다.

타입스크립트는 문법에러, 타입에러 를 체크한다. (런타임에러는 안함)

자바스크립트 에러 베스트 10은 아래와 같다.

- Uncaught TypeERROR: Cannot read property
- TypeError: 'undefined' is not an object (evaluating...)
- TypeError: null is not an object (evaluating...)
- (unknown): Script error
- TypeError: Object doesn't support property
- TypeError: 'undefined' is not a function
- Uncaught RangeError
- TypeError: Cannot read property 'length'
- Uncaught TypeError: Cannot set property
- ReferenceError: event is not defined

단순에러 예제를 보자

```javascript
const human = {
  sayHello() {},
};

human.syaHello();
```

위와같이 코딩한 경우, 오류를 실시간으로 검출해 준다. 즉, 브라우저에 실행해서 결과를 보기 전에 확인을 해준다.

사전에 검출해 주기 때문에, 생산성을 올려준다.

```javascript
const human = {
  mouth: null,
};
human.mouth.sayHello();
```

문법적인 문제가 없지만, 브라우저 에서는 아래와 같은 오류가 발생한다.

```
Uncaught TypeError: Cannot read properties of null (reading 'sayHello')
```

null의 속성인 sayHello를 읽을 수 없다는 타입에러로, human.mouth 가 null 타입이라 발생하는 에러다.

이러한 에러도 타입스크립트를 사용하면, 에러를 감지할 수 있다.

```
Errors in code 'human.mouth' is possibly 'null'.
```

타입추정 방식으로 모든 에러를 감지하지는 못한다.

```typescript
const array = [123, 4, 56];
array[3].toFixed();
```

array[3] 은 없기 때문에, toFixed 를 사용하지 못하지만, 타입스크립트는 해당에러를 감지하지 못한다.

하지만, 기존방식처럼 런타임에러에서만 확인하는 것보다는 사전에 감지를 할 수 있기 때문에 좋다.

또한, 타입스크립트는 자바스크립트 코드에 대한 설명서 역할도 한다.

```typescript
// lib.es5.d.ts
interface Array<T> {
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void;
}
```

forEach 메서드가 callbackfn 과 thisArg 라는 두 인수를 받을 수 있다는걸 표시하고 있다.

```javascript
[1, 2, 3]
  .forEach(function () {
    console.log(this);
  })

  [(1, 2, 3)].forEach(function () {
    console.log(this);
  }, document);
```

첫 번째 forEach 는 callbackfn 인수만 사용한 것이고, 두 번째 forEach 는 callbackfn 과 thisArg 두 인수를 모두 사용한 것이다.
