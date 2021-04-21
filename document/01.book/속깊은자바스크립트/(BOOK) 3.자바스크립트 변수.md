# 3. 자바스크립트의 변수

## 자바스크립트의 기본형과 typeof

- number (숫자)
- string (문자열)
- boolean (이진값)
- undefined
- null
- symbol

### typeof

typeof 연산자는 우측의 입력값 하나를 받는 단항 연산자로, 해당 입력값의 타입을 알려준다.

- `undefined` : 정의되지 않은 값 또는 해당 값을 가진 변수
- `boolean` : true/false 값 또는 해당 값을 가진 변수
- `number` : 숫자 값 또는 해당 값을 가진 변수
- `string` : 문자열 값 또는 해당 값을 가진 변수
- `object` : 객체 또는 객체를 저장하는 변수
- `function` : 함수 또는 함수를 저장하는 변수
- `symbol` : Symbol() 함수로 생성한 키

```javascript
if (typeof myVariable === "function") {
    
    alert("Variable is function");
    myVariable.call(this);
    
} else if (typeof myVariable === "string") {

    alert("Variable is string: " + myVariable);

}
```

위와 같이 사용하기도 하고

```javascript
typeof 3; // === "number"
typeof "str"; // === "string"
typeof {}; // === "object"
typeof []; // === "object"
typeof function () {}; // === "function"
typeof null; // === "object" ?!
```

주의깊게 볼 부분이 `null` 의 타입이 `object` 라는 것인데, 이것은 `null` 이 맞지만, 지금껏 구축된 웹페이지들이 `object` 로 사용중 이여서 쉽사리 변경하기 어려워서 조심스럽게 검토하고 있다 한다.

## new String("")과 "", 그리고 String("") 의 차이

** instanceof 연산자 **

instanceof 연산자는 이항 연산자로 인자를 2개 받고, 왼쪽 인자가 오른쪽 인자의 인스턴스 인지를 확인하고, `true` 혹은 `false` 를 반환한다.

```javascript
function Person(name, blog) {
    this.name = name;
    this.blog = blog;
}
var unikys = new Person("unikys", "http://unikys.tistory.com");

console.log(unikys iunstanceof Person); // === true
console.log(unikys instanceof Object); // === true
console.log(tyupeof unikys); // === "object"
```

instanceof 의 연산 결과로 unikys 객체가 생성자인 Person을 통해 생성 되었음을 알 수 있다.

```javascript
console.log(true instanceof Boolean); // === false
console.log(true instanceof Object); // === false

console.log([0,1] instanceof Array); // === true
console.log({name:"unikys"} instanceof Object); // === true;

var color1 = new String("red");
var color2 = "red";
console.log(color1 == color2); // === true
console.log(color1 instanceof String); // === true
console.log(color2 instanceof String); // === false ?!
console.log(color2 instanceof Object); // === false
```

`true` 나 `false` 는 기본형 이라서 `Boolean` 객체의 `instanceof` 가 `false` 가 된다.

여기서 주의깊게 봐야 하는 것이 `color2` 변수는 `String` 객체의 `instance` 가 아니라는 점인데, 이것에 대해서 살펴보자

### 기본형 문자열과 문자열 객체 비교

```javascript
console.log(color1 === color2); // === false
console.log(color1.constructor === String); // === true
console.log(color2.constructor === String); // === true ?!
```

타입비교 연산자로 비교를 해보면 둘이 같은 타입은 아니지만, `constructor` 속성은 `String` 이라고 나오게 되는데, 

