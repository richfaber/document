[![104515374](https://lh3.googleusercontent.com/-tXz42oJYrCw/W68582ug7NI/AAAAAAAAU9o/mS9F7ueq5WsEZ9JYh2pFzK_jQoAUskV-ACHMYCw/I/104515374.jpg)](http://www.yes24.com/24/goods/35254611)

# Spread 연산자

## 개요

이터러블 객체를 요소 하나씩 분리하여 열거해 준다. 결과를 변수에 할당하거나 함수의 파라미터 값으로 사용할 수 있다.

```javascript

// 사용법
[...iterableObject]
function(...iterableObject)

// 예제
let one = [11, 12];
let two = [21, 22];
let spreadObj = [51, ...one, 52, ...two];

console.log(spreadObj); // [51, 11, 12, 52, 21, 22]
console.log(spreadObj.length); // 6
```

String 객체도 이터러블 객체에 해당하기 때문에, 문자도 가능하다.

```javascript
let favorite = "music";
let spreadObj = [...favorite];

console.log(spreadObj); // ["m", "u", "s", "i", "c"]
```

함수의 전달변수로도 적용이 가능하다.

```javascript
const values = [10, 20, 30];

function get(one, two, three) {
    console.log( one + two + three );
}

get(...values); // 60
```

## rest 전달변수

함수의 전달변수로 `function(...rest)` 와 같이 spread 연산자로 전달한 형태를 `rest 전달변수(파라미터)` 라고 한다.

```javascript
let get = (one) => {
    console.log(one);
}

get(...[1, 2, 3]); // 1
```

`...[1, 2, 3]` 은 전달변수에 열겨되서 `get(1, 2, 3)` 이 되고, 변수로 `one` 하나만 받고 있기 때문에, 출력결과에 `1,2,3` 이 아닌 `1` 만 출력된다.

만약에 `rest 파라미터` 를 사용한다면

```javascript
let get = (...one) => {
    console.log(one);
}

get(...[1, 2, 3]); // [1, 2, 3]
```

위와 같이 `get(1, 2, 3)` 으로 열거된 변수들은 `...one` 에 대입되고, `one` 에는 `[1, 2, 3]` 이 대입된다. 뭔가 좀 헷갈려서 다른 형태로 변경해 보면

```javascript
let get = (a, ...one) => {
    console.log(a, one);
}

get(...[1, 2, 3]); // 1, [2, 3]
```

이렇게 첫번째 열거변수는 `a` 에 대입하고 나머지 들은 `one`에 대입된다.

## Array-like

Array는 아닌데 Array 처럼 사용할 수 있는 객체를 `Array-like` 라고 한다.

배열의 가장 큰 특징은 `index` 가 있다는 것인데, 객체리터럴(객체용법)을 통해서 배열같이 동작하게 할 수 있다.

```javascript
var realArray = [10, 20, 30];
realArray["a"] = "son";

var arrayLike = {0: 10, 1: 20, 2: 30};
var modernObject = {a: "son", b: "oh", c: "kong"};

console.log(realArray[0]); // 10
console.log(realArray["a"]); // son
console.log(realArray.a); // son

console.log(arrayLike[0]); // 10

console.log(modernObject.a); // son
console.log(modernObject["a"]); // son
console.log(modernObject[0]); // undefined

Array.isArray(realArray); // true
Array.isArray(modernObject); // false

```

배열은 자체 `index` 를 통해 값에 접근하지만, 키값을 가지는 배열을 연관배열이라고 한다. (`(realArray["a"]`)

이렇게 키값을 가지는 배열은 객체의 키를 접근하는 방법처럼 `(.)` 으로도 접근할 수 있다.

객체 또한 `(.)` 으로 접근하지만, `["key"]` 로도 접근할 수 있다. 이것은 자바스크립트의 특징인데, 객체와 배열이 해당값에 접근하는 방법이 같을수는 있지만, 엄밀히 둘은 다른객체 이므로, 혼용해서 쓸일은 거의 없지만, 구분하는 것은 필요하다.

es5 에서는 해당특징을 구분하는 것이 없었으나, es6 에서는 `Array-like` 라고 규정지었다는 것은 재밌는 요소이다.


# 디스트럭처링

## 개요

다음과 같은 형태가 `디스트럭쳐링` 이다.

```javascript
let one, two;
[one, two] = [1, 2];

console.log(one); // 1
console.log(two); // 2
```

`디스트럭처링` 의 사전적 의미는 "...의 구조를 파괴하다" 는 뜻이 있는데, 파괴는 아니고, 분해해서 대입한다는 의미로 받으면 된다.

다시 정리하면, 대입연산자(=)의 오른쪽에 있는 것을 분해해서 왼쪽에 대입한다. 즉 왼쪽에 대입되는 쪽은 꼭 오른쪽의 형태와 같아야만 한다.

## Array 분할 할당

```javascript
let one, two, three, four, five;
const values = [1, 2, 3];

[one, two, three] = values;
console.log("A:", one, two, three); // A: 1 2 3

[one, two] = values;
console.log("B:", one, two); // B: 1 2

[one, two, three, four] = values;
console.log("C:", one, two, three, four); // B: 1 2 3 undefined

// 다차원 배열
[one, two, [three, four]] = [1, 2, [73, 74]];
console.log("D:", one, two, three, four); // D: 1 2 73 74

// 중간 넘기기
[one, , , four] = [1, 2, 3, 4];
console.log("E:", one, four); // E: 1 4

// ...rest
[one, ...other] = [1, 2, 3, 4];
console.log(one, other); // 1, [2, 3, 4]
```

## 객체 분할 할당

```javascript
let {one, two} = {one: 1, nine: 9};
console.log(one, two); // 1 undefined
```

객체는 왼쪽의 키값이 같아야 대입이 된다. 만약 키값을 다르게 대입하려면

```javascript
let five, six;
( {one:five, two: six} = {one: 10, two: 20} ); // 양쪽 괄호
console.log(five, six);
```

위와 같이 사용할 수 있는데, 양쪽괄호를 꼭 해줘야 한다.

변수선언과 동시에 할 수도 있다.

```javascript
let {nine, plus: {ten}} = {nine: 9, plus: {ten: 10}};
console.log(nine, ten); // 9, 10
console.log(plus); // undefined
```

오른쪽의 객체가 선언을 하는 것은 아니기 떄문에 위의 `plus` 는 `undefined` 가 나온다.

## 전달변수 분할 할당

```javascript
function total({ one, plus: {two, five} }) {
    console.log(one + two + five);
};

total({ one: 1, plus: {two: 2, five: 5} }); // 8
```

함수에도 사용할 수가 있다.

뭔가 한눈에 들어오지는 않아서, 잘쓰면 유용할 거 같은데, 익숙해지기 까지 좀 걸릴거 같은 느낌이 든다.



