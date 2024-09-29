# 기본 문법 익히기

[![](https://image.yes24.com/goods/121811365/XL)][https://www.yes24.com/Product/Goods/121811365]

## 변수, 매개변수, 반환값에 타입을 붙이면 된다

타입핑 이라는 행위는 보통 변수, 함수의 매개변수, 함수의 반환값 타입이 어떻게 되는지를 기록하는 것이다.

- string: 문자열
- number: 숫자
- boolean: 불값
- null: 빈값
- undefined: 선언되지 않은 값
- symbol: 심볼값
- bigint: 넓은 범위의 정수
- object: 객체

함수와 배열도 객체로 취급되기 때문에, object 타입이다.

```typescript
const str: string = "hello";
const num: number = 123;
const bool: boolean = false;
const n: null = null;
const u: undefined = undefined;
const sym: symbol = Symbol("sym");
const big: bigint = 1000000n;
const obj: object = { hello: "world" };
```

함수의 표기는 아래와 같다.

```typescript
function plus(x: number, y: number) {
  return x + y;
}

const minus = (x: number, y: number): number => x - y;
```

## 타입 추론을 적극 활용하자

타입스크립트는 어느 정도 변수의 반환값의 타입을 스스로 추론한다.

```typescript
function plus(x: number, y: number): number {
  return x + y;
}

const result1: number = plus(1, 2);
const result2 = plus(1, 2);
```

result2 에는 타입명시를 하지 않았지만, 타입스크립트는 추론을 통해 number 임을 알 수 있다. 복잡한 경우가 있는 경우는 타입을 명시하지만, 추론이 명확한 부분은 타입스크립트 추론에 맡겨도 괜찮다.

하지만 함수의 매개변수에는 타입을 필수로 넣어야 한다.

```typescript
function plus(x, y) {
  return x + y;
}

// function plus(x: any, y: any): any
// Parameter 'x' implicitly has an 'any' type.
// Parameter 'y' implicitly has an 'any' type.
```

매개변수 x,y 가 암묵적으로 any 타입을 가지고 있다는 뜻으로, 직접 타입을 표기하지 않았기 때문에, any 타입으로 추론을 했다는 의미이다.

암묵적 any 때문에 발생하는 에러를 implicitAny 에러라고 한다.

매개변수의 타입을 명시하는 경우로 변경하면, number 로 추론하게 된다.

```typescript
function plus(x: number, y: number) {
  return x + y;
}
// function number(x: number, y: number): number
```

plus 함수의 반환값이 number 로 추론되었다.

`타입스크립트가 타입을 제대로 추론하면 그대로 쓰고, 틀리게 추론할 때만 올바른 타입을 표기한다.`

라는 기준이 좋은데, 아래의 예제는 추론이 잘못된 경우이다.

```typescript
const str = "hello";
// const str: 'hello'

const num = 123;
// const num: 123

const bool = false;
// const bool: false

const n = null;
// const n: null

const u = undefined;
// const u: undefined

const sym = Symbol("sym");
// const sym: typeof sym

const big = 10000000n;
// const big: 10000000n

const obj = { hello: "world" };
// const obj: { hello: stirng }
```

추론이 예상한 것과 다른데, 결론부터 말하면 타입스크립트의 추론이 정확하다. const 로 선언되어 있는 변수는 다른 대입이 불가능 하기 때문에, str 변수는 'hello' 외에는 다른 것이 될 수 없다.

두가지를 알고 넘어가야 하는데,

- 타입을 표기할 때는 'hello', 123, false 같은 정확한 값을 입력할 수 있고, 이것을 리터럴 타입이라고 부른다.

- 타입을 표기할 때, 더 넓은 타입으로 표기해도 문제는 없다.

```typescript
const str1: "hello" = "hello";
const str: string = "hello";
const str3: {} = "hello";
```

첫번째는 불변하는 값이기 때문에, `hello` 타입으로 지정한 경우이고, 이보다 상위의 타입의 개념으로 `string` 을 주었고, `null, undefined` 를 제외한 모든 값이라는 표기로 `{}` 를 사용했다.

틀린건 아니지만, 부정확한 타입을 사용한 경우가 되겠다.

냅두면 정상추론이 되었는데, 잘못된 명시로 부정확한 타입이 되었다.

이러한 이유로 타입스크립트가 제대로 추론하면 그대로 두고, 잘못 추론하면 그때 명시를 하는 것이 좋다고 주장하는 이유다.

const 대신 let을 사용하는 경우를 보자

```typescript
let str = "hello";
// let str: string

let num = 123;
// let num: number

let bool = false;
// let bool: boolean

let n = null;
// let n: any

let u = undefined;
// let u: any

let sym = Symbol("sym");
// let sym: symbol

let big = 1000000n;
// let big: bigint

let obj = { hello: "world" };
// let obj: { hello: string }
```

let 을 사용한 경우 완전히 다른 타입으로 추론된다. let 은 다른 값이 대입할 수 있기 때문에, 타입을 넓게 추론하는 것이다.

이러한 현상을 타입 넓히기(Type Widening) 이라고 부른다.

특이한 점들이 있는데, null, undefined 를 let 변수에 대입한 경우 any 로 추론한다는 것을 기억해 두자.

sym은 const 일 때는 typeof sym 이었는데, let 일 때는 symbol 이다.
typeof sym 은 고유한 symbol을 의미한다. const 일때는 다른 symbol 로 변경할 수 없는 symbol 인 셈이다.

타입스크립트는 이를 unique symbol 이라고 표현한다.
unique symbol 끼리는 상호비교가 불가능하지만, unique symbol 과 일반 symbol 은 비교가 가능하다.

```typescript
const sym1 = Symbol.for("sym"); // unique symbol
const sym2 = SYmbol.for("sym"); // unique symbol
let sym3 = Symbol.for("sym");
let sym4 = Symbol.for("sym");

if (sym1 === sym2) {
}
// This comparison appears to be unintentional because the types 'typeof sym1' and 'typeof sym2' have no overlap.
if (sym3 === sym4) {
}
if (sym2 === sym3) {
}
```

sym1 === sym2 도 true 이지만, 타입스크립트 에서는 unique symbol 상호비교를 금지하고 있다.

obj는 const 일 때나, let 일때나 { hello: string } 으로 추론한다. 속성 값인 'world' 가 string 으로 추로한 것이다.

기타사항으로 타입스크립트 에러를 무시하려면, 주석을 넣으면 된다.

`// @ts-ignore`

에러를 흘려보내기 보다는 올바른 타입스크립트 코드로 작성하는 것이 좋다.

- `@ts-expect-error`
- `@ts-ignore`
- `@ts-nocheck`: 파일의 가장 윗 줄에 주석으로 추가하면 해당 파일은 검사를 진행하지 않는다.

## 값 자체가 타입인 리터럴 타입이 있다

## 배열 말고 튜플도 있다

## 타입으로 쓸 수 있는 것을 구분하자

## 유니언 타입으로 OR 관계를 표현하자

## 타입스크립트에만 있는 타입을 배우자

## 타입 별칭으로 타입에 이름을 붙이자

## 인터페이스로 객체를 타이핑하자

## 객체의 속성과 메서드에 적용되는 특징을 알자

## 타입을 집합으로 생각하자(유니언, 인터섹션)

## 타입도 상속이 가능하다

## 객체 간에 대입할 수 있는지 확인하는 법을 배우자

## 제네릭으로 타입을 함수처럼 사용하자

## 조건문과 비슷한 컨디셔널 타입이 있다

## 함수와 메서드를 타이핑하자

## 같은 이름의 함수를 여러 번 선언할 수 있다

## 콜백 함수의 매개변수는 생략 가능하다

## 공변성과 반공변성을 알아야 함수끼리 대입할 수 있다

## 클래스는 값이면서 타입이다

## enum은 자바스크립트 에서도 사용할 수 있다

## infer로 타입스크립트의 추론을 직접 활용하자

## 타입을 좁혀 정확한 타입을 얻어내자

## 자기 자신을 타입으로 사용하는 재귀 타입이 있다

## 정교한 문자열 조작을 위해 템플릿 리터럴 타입을 사용하자

## 추가적인 타입 검사에는 satisfies 연산자를 사용하자

## 타입스크립트는 건망증이 심하다

## 원시 자료형에도 브랜딩 기법을 사용할 수 있다

## 배운 것을 바탕으로 타입을 만들어보자

## 타입스크립트의 에러 코드로 검색하자

## 함수에 기능을 추가하는 데코레이터 함수가 있다

## 앰비언트 선언도 선언 병합이 된다
