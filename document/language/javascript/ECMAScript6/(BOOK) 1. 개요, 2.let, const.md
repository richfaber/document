[![104515374](https://lh3.googleusercontent.com/-tXz42oJYrCw/W68582ug7NI/AAAAAAAAU9o/mS9F7ueq5WsEZ9JYh2pFzK_jQoAUskV-ACHMYCw/I/104515374.jpg)](http://www.yes24.com/24/goods/35254611)

# 개요

## ECMA-262 스펙상태

자바스크립트로 작성된 코드는 해석기(보통 웹브라우저)가 기계어롤 변환을 해주는데, 그 과정을 컴파일 이라고 한다. 컴파일 한 결과를 수행할 수 있는 필요한데 그것이 자바스크립트 엔진이다.

이런 자바스크립트 엔진은 표준문서에 나열된 정의를 참고하여 개발이 되는데, 정식 명칭은 `ECMAScript 2016 Language Specification` 으로, 줄여서 ES2015 또는 ES6 라고 한다.

ES6 의 표준문서는 ES5의 두배에 달하고, ES6를 모르고 개발하는 것은 자바스크립트를 절반도 이해하지 못하는 것과 같다.

### ES6 방향성

자바스크립트는 함수 위주의 함수형 언어로 분류할 수 있고, 우회적인 방법으로 객체지향 적인 프로그래밍을 할 수는 있으나, 지원은 약한편에 속했고, 주로 함수를 사용하는 것이 보통이다.

근래의 프로그래밍 언어들은, 객체지향 언어들은 함수형 언어를 도입하고, 함수형 언어들은 객체지향을 도입하는 추세로, 프로그래밍의 형태가 비슷한 구조로 가는 경향이 있다.

ES5 가 프로그램 언어의 기본에 충실했다면, ES6는 객체지향의 장점을 받아들이고, 효율적 메모리 사용에 집중했다고 볼 수 있다.

그렇다해서 객체지향 중심으로 변모하는 것은 아니고, 함수형 언어가 갖는 장점을 효율적으로 접근하는 노력도 하고 있다.

# let, const

## var 키워드

var는 변수 선언시에 사용하는데, 로컬변수와 글로벌변수로 구분한다. 이는 사용할 수 있는 범위에 제한이 다르기 때문이다.

```javascript
one = 100;
function get() {
    one = 300;
    console.log("함수:", one);
}
get();
console.log("글로벌:", one);
```

`var` 키워드를 사용하지 않았기 때문에, 글로벌 변수 이다.
즉 어디에 영역에 걸쳐 있더라도 유효한 범위(scope)를 가진다는 의미이다. 이와 반대로

```javascript
//"use strict"
one = 100;
function get() {
    var one = 300;
    console.log("함수:", one);
}
get();
console.log("글로벌:", one);
```

이렇게 설정하면 결과는 `300, 100` 이 나온다. 함수안에 `one` 변수는 `var` 키워드를 통해, 내부에서만 사용하겠다는 설정이 생기고, function 바깥의 `one` 변수와는 이름만 같을뿐, 다른존재가 된다.

이렇게 전체에 걸치는 변수가 `글로벌 변수` 이고, 한정된 범위를 갖는 변수가 `로컬 변수` 이다.

**글로번 변수 오해**

글로벌 변수는 정확히는 전체에 걸치는 변수라기 보다는 `글로벌 오브젝트` 의 로컬변수 이다. 

하지만 웹브라우저에서 `window 오브젝트` 로 `글로벌 오브젝트`를 접근할 수 있기 때문에, 위에 선언된 글로벌 변수 `one` 는 `window.one` 과 정확히 일치한다. 

```javascript
console.log( one === window.one ) // true
``` 

이는 객체지향 관점에서는 허락도 없이 접근변경이 되는 것을 위험하다고 판단하기 때문에, 원천적으로 봉쇄를 한다.

`use strict` 는 엄격한 문법을 준수하겠다는 약속 같은 것인데, 이를 선언하면 `var` 키워드를 사용하지 않은 변수는 에러를 발생 시킨다.

```javascript
"use strict" // <-- 엄격한 문법을 준수하겠다는 약속.

one = 100; // <-- 에러발생, 아예 실행이 되지 않는다.
function get() {
    var one = 300;
    console.log("함수:", one);
}
get();
console.log("글로벌:", one);
```

## let 키워드

`var` 키워드의 문제점을 보완하기 위해 나온것이 `let` 키워드 이다. 이는 다음과 같은 특징이 있다.

- 함수 안에 작성한 let 변수는 스코프이다.
- 함수 안에 `if(a=b) { let sports = "축구" }` 형태로 코드를 작성했을 때, `sports` 변수는 함수가 스코프가 아니라 `if` 문의 블록 `{}` 이 스코프이다.
- 같은 스코프 안에 같은 이름의 `let` 변수를 선언할 수 없다.
- `let` 변수는 호이스팅(hosting) 되지 않는다.

```javascript
"use strict";

let book;
let sports = "축구";
sports = "농구";

let one = 1, tow = 2, three;

let sports = "배구"; // Error
let four = 4, let five = 5 // Error
let six = 6, var seven = 7; // Error
``` 

## 블럭 스코프

`let` 변수의 가장 큰 목적은 블록 스코프이다. 이는 해당 변수의 유효범위가 블록({}) 에 있다는 의미이다.

```javascript
"use strict";

let sports = "축구";
if (sports) {
    let sports = "농구";
    console.log("블록: ", sports);
}
console.log("글로벌: ", sports);
```

실행을 해보면 같은 변수명 이더라도 서로 독립적 존재임을 확인할 수 있다.

## let 과 this 키워드

```javascript
var music = "음악";
console.log(this.music); // 음악

let sports = "축구";
console.log(this.sports); // undefined
```

위에 결과에 `music` 변수는 나오는데 `sports` 변수는 나오지 않는다. 

브라우저에서 `new` 연산자로 생성된 객체거나 `var let = { a: function() { console.log(this) } }` 와 같이 객체를 변수에 대입했을 때의 `this` 를 제외하면, `window` 객체에 바라보게 된다.

`this.music, this.sports` 의 `this` 는 `window 오브젝트` 로 접근할 수 있고, `music, sports` 를 가지고 있으면 나오고, 안가지고 있으면 `undefined` 가 나온다.

즉 `let` 키워드로 생성된 변수는 `글로벌 오브젝트` 의 자식이 아니라는 의미다.

## function

함수도 ({}) 블록을 가지기 때문에, `let` 키워드로 선언만 변수의 유효범위는 함수에 한정된다.

```javascript
let sports = "축구", music="재즈";

function get() {
    let music = "클래식";
    console.log(music); // 클래식
    console.log(sports); // 축구
}
get();
``` 

조금 다른 얘기지만, 브라우저 관점에서 변수탐색을 하는 과정은, 현재 스코프에서 없으면 상위스코프를 탐색한다. 즉 `get` 함수안의 `console.log(sports)` 를 만나면, 현재 함수에 그 변수가 있는지 찾아보고, 없으면 상위스코프를 탐색한다. `축구` 라고 선언되어 있기 때문에, 해당 변수의 값이 출력된다.

```javascript
let sports = "축구", music = "재즈";

function get() {
    let sports = "배구";
    console.log(sports); // 배구
    
    function child() {
        let sports = "농구";
        console.log(sports); // 농구
        
        if(sports) {
            console.log(music);
        }
    }
}
get();
```

이렇게 계층적 변수를 선언할 일은 거의 없겠지만, 계층적 변수를 사용할 수 밖에 없는 경우라면, 브라우저가 탐색하는 방식을 아는것은 도움이 된다.

`use strict` 모드에서는 좀 다르다.

```javascript
"use strict";

var sports = "축구";
let music = "재즈";

function get() {
    var sports = "농구";
    let music = "클래식";
    console.log("1:", sports);
    console.log("2:", this.sports);
    console.log("3:", this.music);
};
window.get();
get();
```

`window.get`의 실행결과는 우리가 예상한데로 `농구, 축구, undefined` 의 결과를 얻는다. 그런데 `get()` 함수를 선언하면 두번째 `console` 에서 에러를 발생시킨다.

`use strict` 모드에서는 `window.get()` 처럼 `window` 오브젝트를 참조해서 함수를 실행했을 경우에 `this` 는 `window` 오브젝트를 바라보게 되지만, `get()` 으로 실행했을 때의 `this` 는 `window`를 참조하지 않는다.

## for()

`for` 의 형태에서도 블럭 스코프를 유용하게 사용할 수 있다.

```html
<ul>
    <li>1~10</li>
    <li>11~20</li>
    <li>21~30</li>
</ul>
```

```javascript
var nodes = document.querySelector("ul");
for (var k = 0; k < nodes.children.length; k++) {
    var el = nodes.children[k];
    el.onclick = function(event) {
        event.target.style.backgroundColor = "yellow";
        console.log(k);
    }
}
```

자바스크립트로 이벤트 할당할 때 흔히 나오는 예제인데, `li` 요소에 클릭 이벤트를 주었다. 
기대하는 것은 `li`를 클릭할 때마다 `k`의 값은 `1,2,3`이 나와야 하는데, `3,3,3` 이 나오게 된다.

이는 스코프 때문인데, 위에 예제의 `var k` 는 글로벌 변수에 할당이 되기 때문에, 그 변수는 `for` 문을 통해서 이미 `3` 으로 증가한 상태이기 때문에, 어디를 클릭 하더라도 `3` 이 나오게 된다.

이때 `let` 변수를 사용하면 글로벌 변수참조가 아니고, 로컬변수로 스코프를 갖기 때문에 기대한 `1,2,3` 의 값을 얻을 수 있다.

```javascript
var nodes = document.querySelector("ul");
for (let k = 0; k < nodes.children.length; k++) {
    var el = nodes.children[k];
    el.onclick = function(event) {
        event.target.style.backgroundColor = "yellow";
        console.log(k); // 요소를 클릭 시 마다 k에 할당된 숫자가 출력된다.
    }
}
```

## const

`var, let` 키워드와 다른점은 한번 할당된 값은 변경이 불가능 한 상수 라는 점이다. 변경을 시도하려고 하면 에러를 발생 시킨다.

관례적으로 이런 상수는 알파벳 대문자로 작성한다.

```javascript
const LIKE_SPORTS = "축구";
try {
    LIKE_SPORTS = "농구";
} catch (e) {
    console.log("const 재할당 불가");
}
``` 

하지만 변수의 값이 오브젝트일 경우에는 속성값에 한해 변경이 가능하다.

```javascript
const LIKE_SPORTS = {};
LIKE_SPORTS.ball = "야구";
LIKE_SPORTS.game = "농구";

LIKE_SPORTS.ball = "배구";
console.dir(LIKE_SPORTS);

try {
    LIKE_SPORTS = [];
} catch(e) {
    console.log("const 재할당 불가");
}
```


