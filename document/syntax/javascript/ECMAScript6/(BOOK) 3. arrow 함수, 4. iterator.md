[![104515374](https://lh3.googleusercontent.com/-tXz42oJYrCw/W68582ug7NI/AAAAAAAAU9o/mS9F7ueq5WsEZ9JYh2pFzK_jQoAUskV-ACHMYCw/I/104515374.jpg)](http://www.yes24.com/24/goods/35254611)

# arrow 함수

## 개요

arrow 의 사전적 의미는 "화살, 화살표(=>)" 라는 의미로 "화살표 함수" 라고 읽는다.

### 사용법

```javascript
(param) => { 코드 };
param => { 코드 };
() => { 코드 };
(param1, param2, , , , paramN) => { 코드 };
param => ( {key: value} );
(param1, param2, ...rest) => { 코드 };
(param1, param2 = 123, , , paramN) => { 코드 };
([one, two] = [1, 2]) => one + two;
({key: sum} => {key: 10 + 20}) => { 코드 };
```

이 함수는 `function() { return; }` 와 같이 익명(이름이 없는) 함수의 축약형으로 사용한다.

- `function() { return; }` ==> `() => { return; }`

만약 전달변수가 있다면은

- `function(x) { return x+1; }` ==> `(x) => { return x+1 }`

이렇게 축약할 수 있다. 만약

```javascript
function(x) {
    let a = 10;
    let b = 20;
    return x+a+b;
}
```

이렇게 여러줄의 연산을 할 경우도 마찬가지로, 

```javascript
(x) => {
    let a = 10;
    let b = 20;
    return x+a+b;
}
```

이렇게 해야 하지만 만약 위와같이 복수의 연산이 필요없고, 1줄로 하는 간단한 연산 이라면 더 축약할 수 있다.

```javascript
function(x) {
    return x+1;
}

// equal

(x) => x+1
```

이렇게 익명함수를 축약해서 구문을 간단하게 만드는 것에 목적이 있는 문법이다.

익명함수로 사용하기 때문에, 변수에 대입을 하려면

```javascript
var calculate = (x) => x+1
calculate(10) // 11 출력
```

이것은

```javascript
var calculate = function(x) { return x+1 }
calculate(10) // 11 출력
```

와 같다. 

변수를 대입하지 않고 실행결과만 받고자 할 때도

```javascript
var calculate => () => 10+1
calculate() // 11 출력

var result = calculate()
console.log(result) // 11 출력
```

이렇게 사용한다.

## new 연산자

화살표 함수로 대입된 변수는 `new` 연산자로 새롭게 할당할 수 없다.

```javascript
var a = function () { this.foo = 10; }
var z = new a();
console.log(z.foo) // 10;


var a = () => this.foo = 10
var z = new a(); // Syntax Error
```

## arguments 사용

화살표 함수로 대입된 변수는 `arguments` 속성을 사용할 수 없다.

```javascript
var a = function (a, b, c) { console.log(arguments[0], arguments); }
a(10, 20, 30); // 10, Object arguments...


var a = (a, b, c) => { console.log(arguments[0], arguments); }
a(10, 20, 30); // Uncaught ReferenceError: arguments is not defined

```

대신 `...rest ` 파라미터를 사용해서 `arguments` 속성을 대체할 수는 있다.

```javascript

var a = (...rest) => { console.log(rest); }
a(10, 20, 30); // [10, 20, 30]

```

## this와 setTimeout()

화살표 함수 안에서의 `this` 는 `window` 객체를 가르킨다.

```javascript
var Sports = function() {
    this.count = 20;
};

Sports.prototype = {
    showThis: function() {
        console.log(this);
    }
};

var newSports = new Sports();
newSports.showThis(); // newSports 객체를 가르킨다.
```

이렇게 `new` 연산자로 생성한 `newSports` 를 가르키게 되는데, 화살표 함수를 사용하면,

```javascript
var Sports = function() {
    this.count = 20;
};

Sports.prototype = {
    showThis: () => {
        console.log(this);CROAD C604 갈축
    }
};

var newSports = new Sports();
newSports.showThis(); // window 객체를 가르킨다.

```

`window` 객체를 가르키게 되기 때문에, 사용에 주의 해야만 한다.

# Iteration

## 개요

사전적 의미는 되풀이, 반복 이라는 의미로 반복처리를 목적으로 한다. 또한 이것은 프로토콜을 가지고 있다.

일종의 이터레이션을 위한 약속이 있고, 그것을 지키면서 사용해야 한다.

## 이터러블 프로토콜

이런 이터러블 프로토콜을 가지는 빌트인 객체에는 아래와 같은 것들이 있다.

- String
- Array
- Map
- Set
- TypedArray
- Argument

이렇게 이터러블 프로토콜을 가지는 객체들 `이터러블 객체` 라고 한다. 이것들은 별다른 선언을 하지 않아도, 반복처리를 할 수 있다.

`이터러블 객체` 는 `Symbol.iterator` 메소드를 가지고 있다. 그래서 위에 열거된 빌트인객체 들은 `Symbol.iterator` 를 이용해서 이터러블 프로토콜(규칙)을 사용할 수 있다.

```javascript
var a = "abcde";
var b = a[Symbol.iterator]();

b.next(); // {value: "a", done: false}
b.next(); // {value: "b", done: false}
b.next(); // {value: "c", done: false}

```

순회가 진행중이지만, 현재값을 가져오는 `current()` 같은 메소드는 없다. 현재의 값을 저장하고 싶다면 변수에 대입해서 사용하자


```javascript
var a = "abcde";
var b = a[Symbol.iterator]();

b.next(); // {value: "a", done: false}
b.next(); // {value: "b", done: false}
zz = b.next().value; // {value: "c", done: false}
console.log(zz); // c 저장

```

이렇게 순회되는 `next` 메소드는 마지막 까지 가면 순회가 종료되었다는 의미로 `done` 속성이 `true`로 변한다.

```javascript
var a = "abcde";
var b = a[Symbol.iterator]();

b.next(); // {value: "a", done: false}
b.next(); // {value: "b", done: false}
b.next(); // {value: "c", done: false}
b.next(); // {value: "d", done: false}
b.next(); // {value: "e", done: false}
b.next(); // {value: undefined, done: true}

```

마지막인지를 알려면 `value` 가 `undefined` 인지를 체크해도 되지만, 기왕 `done` 으로 알려주기 때문에, 사용하는게 좋아 보인다.




