[![9791158390754](https://1.bp.blogspot.com/-Zn0A-6q9zQ8/VyXY7dyTpKI/AAAAAAAAN0c/aSDSM_CeJ1g0b6Is8mPqfDcAHyLd-jkOgCLcB/s320/cfile10.uf.206F3A364EAA4CA906E76D.png) Javascript Patterns](http://www.yes24.com/Product/Goods/5871083?OzSrank=5)

소프트웨어 에서 패턴이란 어떤 문제에 대한 일반적 해결책을 의미 한다.

검증되고 자주 사용되는 코드를 패턴 이라고 생각하면 될 듯 하다.


# (BOOK) 2. 리터럴과 생성자


리터럴(이후 표현) 표기법 패턴을 사용하면 좀 더 정확하고 표현력이 풍부하면서 에러율은 낮은 방식으로 객체를 정의 할 수 있다.


## 객체 표현법

자바스크립트 객체는 이름과 쌍으로 이루어져 있는데, 다른 언어와 다른 점은 함수를 넣을수도 있고, 배열을 넣을 수도 있다는 것이다.

```javascript
var dog = {}
dog.name = "Benji";
dog.getName = function() {
  return dog.name;
};
```

`{}` 이것이 `표현법(리터럴)` 이다.

`var dog = new Object();` 라고 할 수도 있고, `var dog = {}` 할 수도 있다.

dog 의 속성으로 name과 getName을 설정 했다.

이렇게 선언된 속성은 delete 연산자를 통해 삭제도 가능하다.

```javascript
delete getName;
```

이렇게 하면 `getName` 은 삭제 된다. 하지만 `delete dog;` 이런식으로 원시변수는 삭제할 수 없다. 이것은 자바스크립트가 가지고 있는 가비지콜렉터(사용할 일이 없다고 판단되면 메모리에서 자동삭제되는 기능)가 한다.

```javascript
var dog = {
  name: "Benji",
  getName: function() {
    return this.name;
  }
};
```

이렇게도 사용할 수 있다. 단순히 의미는 같은데, 다양한 표현이 가능하다는 것이다.
요리사가 요리를 하는데, 칼의 종류가 많으면 편리하게, 때에 맞게 칼을 사용함 으로써, 도움을 얻을 수 있다고 생각하면 된다.


## 객체 리터럴 문법

- 객체를 중괄호 ({ 와 })로 감싼다.
- 객체 내의 선언된 것들은 콤마(,) 로 분리 한다.
- 속성과 값은 콜론(:) 으로 구분한다.
- 객체(function, array, object) 를 변수에 할당할 때는 마지막에 세미콜론(;) 을 넣어야 한다.


## 객체 생성자의 함정

new Object를 사용한 것과 위와 같은 표현법이 동일한 기능을 하지만, 약간의 차이가 있다.

```javascript
var o = new Object();
console.log(o.constructor === Object); // true

var o = new Object(1);
console.log(o.constructor === Number); // true
console.log(o.toFixed(2)); // "1.00"

var o = new Object("I am a string");
console.log(o.constructor === String); // true
console.log(typeof o.substring); // "function"

var o = new Object(true);
console.log(o.constructor === Boolean); // true
```

`constructor` 는 해당 Object가 어떤 Object를 상속 받았는지를 판단할 수 있는 기능인데, Object를 상속받기를 원했지만, new Object로 선언된 것의 리턴값이 자바스크립트 해석기가 스스로 판단해서 다른것을 리턴하는 결과가 되었다. 결론적으론 new Object를 사용하지 않는 것이 좋다.

그런 이유가 아니더라도 `new Object() 보다 다른 표현법` 이 더 편하다.


## 사용자 정의 생성자 함수

직접 Object 함수를 만들어서 상속받을 수 있다.

```javascript
var Person = function(name) {
  this.name = name;
  this.say = function() {
    return "I am" + this.name;
  };
}

var adam = new Person("Adam");
adam.say();
```

자바에서 Person 이라는 클래스를 사용하여 객체를 생성하는 방식과 유사하다. 그렇지만 자바스크립트는 클래스가 없기 때문에, Person은 그저 보통 함수이다.

이것의 동작원리는 이렇다.

- 빈 객체다 생성된다. 이 객체는 this라는 변수로 참조할 수 있고, 해당 함수의 프로토탑입을 상속받는다.
- this로 참조되는 객체에 속성과 기능함수가 추가 된다.
- 마지막에 다른 객체가 명시적으로 반환되지 않을 경우, this로 참조된 이 객체가 반환된다.

즉

```javascript
var Person = function(name) {
  var this = {};

  this.name = name;
  this.say = function() {
    return "I am" + this.name;
  };

  //this를 반환한다.
  //return this;
  
}
```

결과적으로 `new Person()` 을 호출할 때마다 메모리에 새로운 함수가 생성된다. `say()` 라는 메서드는 생성된 객체마다 달라지는게 아니므로 비효율 적이기 때문에, prototype으로 정의하는 것이 좋다.

```javascript
Person.prototype.say = function() {
  return "I am" + this.name;
}
```

여기서 한가지 집고 넘어가야 할 것이 있는데, `var this = {};` 이 부분이 단순히 빈 객체를 생성하는 것이 아니라, `Person 의 프로토타입을 상속` 받는 다는 것이다. 정확히는

```javascript
var this = Object.create(Person.prototype);
```

이 된다.


### 생성자의 반환 값

생성자 함수를 new와 함께 호출하면 항상 객체가 반환된다. 기본값은 this로 참조되는 객체다.

함수 내에 return 문을 쓰지 않더라도 생성자는 암묵적으로 this를 반환한다. 

그러나 반환값이 될 객체를 따로 정할 수도 있다.

```javascript
var Objectmaker = function() {
  this.name = "This is it";
  var that = {};
  that.name = "And that's that";
  return that;
}

var o = new Objectmaker();
console.log(o.name);
```

이와 같이 생성자에서는 어떤 객체라도 반환이 가능 하다.


## new를 강제하는 패턴 

`생성자란 new와 함께 호출` 될 뿐 여전히 별다를 것 없는 하수에 불과하다. 그렇다면 `new` 를 빼먹으면 어떻게 될까? 문법 오류나 런타임 에러가 발생하지는 않지만, 논리적인 오류가 생겨 예기치 못한 결과가 나올 수 있다. `new` 를 빼먹으면 `생성자 내부의 this` 가 전역 객체를 가리키게 되기 때문이다.

생성자 내부에 `this.member` 와 같은 코드가 있을 때 이 생성자를 `new 없이 호출` 하면, 실제로는 `전역 객체에 member 라는 새로운 속성` 이 생성된다. 

이 속성은 `window.member` 또는 그냥 `member` 를 통해 접근되어 진다. 

이는 함수의 유효범위를 전역변수로 선언되는 효과가 되기 때문에, 주의를 해야 한다.

ECMAScript 5 에서는 이러한 동작 방식의 문제에 대한 해결책으로, `'use strict'` 모드에서는 `this가 전역객체를 가르키지 않도록` 했다. 

하지만 ES5 혹은 그 이상을 사용할 수 없다면, new 없이 호출되어도 동작이 가능하도록 보장하는 방법을 써야 한다.


## 명명규칙

생성자 함수명의 첫글자를 대문자로 쓰고 '일반적인' 함수와 메서드의 첫글자는 소문자를 사용 한다.

## that의 사용

생성자가 항상 생성자로 동작하도록 해주는 패턴이 있다.

```javascript
function Waffle() {
  var that = {};
  that.tastes = "yummy";
  return that;
}

function Waffle() {
  return {
    tastes: "yummy"
  };
}

var first = new Waffle(),
  second = Waffle();

console.log(first.tastes);
console.log(second.tastes);
```

이렇게 하면 new를 사용하던, 사용하지 않던 변수의 유효범위가 한정되어 진다.

```javascript
var testA = new Waffle();
console.log(testA);

var testB = Waffle();
testB.tastes = "change Value";

console.log(testA.tastes); // yummy
console.log(testB.tastes); // change Value

var testC = Waffle();
console.log(testC.tastes); // yummy
```


## 스스로를 호출하는 생성자 

생성자 내부에서 this가 해당 생성자의 인스턴스인지를 확인하고, 그렇지 않은 경우 new와 함께 스스로를 재호출 하는 패턴이 있다.

```javascript
function Waffle() {
  if(!(this instanceof Waffle)) {
    return new Waffle();
  }
  this.tastes = "yummy";
}
Waffle.prototype.wantAnother = true;

var first = new Waffle(),
  second = Waffle();

console.log(first.tastes); // "yummy"
console.log(second.tastes); // "yummy"

console.log(first.wantAnother); // true
console.log(second.wantAnother); // true
```

인스턴스를 판별하는 또 다른 범용적인 방법은 생성자 이름을 하드코딩하는 대신 arguments.callee와 비교하는 것이다.

```javascript
if (!(this instanceof arguments.callee)) {
  return new arguments.callee();
}
```

이것은 모든 함수가 호출될 때, 내부적으로 arguments라는 객체가 생성되며, 이 객체가 함수에 전달된 모든 인자를 담고 있다는 점을 활용 한 것이다. 

- arguments.callee는 ES5 strict 모드 에서는 허용되지 않는다는 점을 유의해야 한다.


## 배열 표현식

배열도 `new Array()` 외에 표현식이 있다.

```javascript
var a = new Array('itsy', 'bitsy', 'spider');
var a = ['itsy', 'bitsy', 'spider'];

console.log(typeof a);
console.log(a.constructor === Array);
```

위에 2가지 a 의 선언은 같은 기능이다. 특별할 것은 없다. 각 원소는 콤마(,)로 구분하고, 객체든 배열이든 어떤것이든 자유롭게 넣으면 된다.


### 배열 생성자의 특이성 

`new Array()` 를 멀리해야 하는 이유는 이 생성자가 함정을 품고 있기 때문이다.

`Array() 생성자` 에 숫자 하나를 전달할 경우, 이 값은 배열의 첫번째 원소 값이 되는 게 아니라 배열의 길이를 지정한다. 
즉 `new Array(3)` 은 길이가 3이고 실제 원소값은 가지지 않는 배열을 생성한다. 원소가 존재하지 않기 때문에 어느 원소에 접근하든 undefined 값을 얻게 된다.

```javascript
var a =[3];
console.log(a.length); // 1
console.log(a[0]); // 3

var a = new Array(3);
console.log(a.length); // 3
console.log(typeof a[0]); // "undefined"
```

물론 `new Array('3')` 으로 하면 `a[0]` 을 얻을 수 있다. 혼돈이 있을 수 있기 때문에, new Array 대신 다른 표현식을 사용하는 것이 좋다.


### 배열인지 판별하는 방법 

배열에 typeof 연산자를 사용하면 "object"가 반환된다.

```javascript
console.log( typeof [1,2] );
```

배열도 객체이니 맞지만 도움이 되지 않는다. 이 외에 배열의 일부 속성인 length 라던지, slice 라던지를 가지고 판단하는 방법도 있지만 견고하지 않다. 

제일 유력해 보이는 `instanceof Array` 조차 IE 에서 다른 결과를 준다.

ES5 에서는 `Array.isArray()` 매서드가 정의 되었다.

```javascript
Array.isArray([]); // true

Array.isArray({
  length: 1,
  "0" : 1,
  slice: function() {}
}); // false
```

## JSON 

JSON은 자바스크립트 객체 표기법(Javascript Object Notation)의 준말로, 데이터 전송 형식의 일종이다. 자바스크립트를 비롯하여 여러 언어에서 가볍고 편리하게 쓸 수 있다.

```javascript
{"name" : "value", "some": [1,2,3]}
```

특별할 것은 없다. 속성에 공백이 있다면 따옴표로 감싸 주어야 한다. {"first name" : "Dave"}


### JSON 다루기 

`Json.parse()` 는 최신 브라우저에서는 구현이 되었다. 구형 엔진은 JSON.org의 라이브러리를 플러그인 하자. - http://www.json.org/json2.js

```javascript
var jstr = '{"mykey": "my value"}';

var data = eval('(' + jstr + ')'); // 안티패턴
var data = JSON.parse(jsstr);

console.log(data.mykey);

JSON.parse() 의 반대는 JSON.stringify() 다. 이것은 객체 또는 배열을 인자로 받아 직렬화 한다.

var dog = {
  name: "Fido",
  dob: new Date(),
  legs: [1, 2, 3, 4]
}
var jsonstr = JSON.stringify(dog);

// {"name":"Fido", "dob":"2014-04-11T22:36:22.436Z", "legs":[1,2,3,4]}
```