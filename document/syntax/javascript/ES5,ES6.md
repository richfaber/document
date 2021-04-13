# ES5, ES6 

`Ajax` 의 관심도가 증가하고, `Server Side` 에서 `Client Side` 로 변화하면서, 현재의 자바스크립트의 고도화 필요성이 생김.

## ES6 는 무엇인가

현재 우리가 사용하고 있는 것은 `ES5` 이고, 2009년에 제정됨. 이후 2015년 `ES6 (ECMASCRIPT 2015)` 제정되어 현재는 컴파일 과정을 거쳐서 `ES5` 변환 후 브라우저에서 인식하는 것이 현대의 흐름이다.

## 컴파일을 위한 TASK RUNNER

- Grunt
- Gulp
- WEBPACK

### 그 외에 브라우저가 채택하고 있는 표준

- BOM (Browser Object Model)
- DOM (Document Object Model)

### 주요 변경 사항

##### let, const

**let**.  
  
- 블록단위에 scope (수정 가능)
- 루프문 안에서는 매번 새로 생성됨 (for, while등)
- 윈도우의 속성이 아님

**const**. 

- let 과 동일하지만 선언 후 수정이 불가

##### Arrow function

- 함수를 간결하게 작성할 수 있도록 람다식표현중 `Arrow` 가 추가됨.

```javascript

// ES5
var selected = allJobs.filter(function (job) {
  return job.isSelected();
});

// ES6
var selected = allJobs.filter(job => job.isSelected());

// ES5
var total = values.reduce(function (a, b) {
  return a + b;
}, 0);

// ES6
var total = values.reduce((a, b) => a + b, 0);
```

화살표 함수표현식 으로 인해, 이전에 사용하던 `this` 를 참조하기 위한 구문이 필요치 않다.

```javascript
//ES5
{
  ...
  addAll: function addAll(pieces) {
    var self = this;
    _.each(pieces, function (piece) {
      self.add(piece);
    });
  },
  ...
}

// ES6
{
  ...
  addAll: function addAll(pieces) {
    _.each(pieces, piece => this.add(piece));
  },
  ...
}

// ES6 with method syntax
{
  ...
  addAll(pieces) {
    _.each(pieces, piece => this.add(piece));
  },
  ...
}
```

##### function arguments

```javascript
// ES6
'use strict';

function loop(func, count = 3) {
    for (var i = 0; i < count; i++) {
        func();
    }
}

function sum(...numbers) {
    return numbers.reduce(function(a, b) { return a + b; });
}

loop(function(){ console.log('hello')}); // hello hello hello
console.log(sum(1, 2, 3, 4)); // 10
```

##### for/for in/for of

```javascript
// Before
for (var index = 0; index < myArray.length; index++) {
  console.log(myArray[index]);
}

// ES5 추가 (return, break등으로 탈출 불가)
myArray.forEach(function (value) {
  console.log(value);
});

// Object를 순회하기 위한 방법
for (var index in myArray) {
  console.log(myArray[index]);
}
```

**For-in 은 객체의 순회를 위한 반복문으로 몇가지 특징을 가진다.**

- prototype chain도 순회한다.
- 순서가 무작위이다.
- `var index` 가 `string` 이다.

**For-in도 순회문 이지만 몇가지 특징이 있다.**

- break/continue/return 등으로 탈출 가능
- 배열순회용 이기 때문에, 정확히 객체의 배열만 순회한다.

##### Template String

새로운 문자표현식이 추가되었다.

```javascript
console.log(`Hello ${a} I'm ${b} year's old`)
```

##### Module

기능별로 파일을 구분하여 페이지에서 로딩하였으나, `export` 와 `import` 구문을 통해 모듈을 로딩 할 수 있도록 추가 되었다.

```javascript

// num.js

export const random = Math.random(); 
export function double(x) { return 2 * x; }

// 혹은

const random = Math.random(); 
function double(x) { return 2 * x; } 

export { random, double };
```

다른 모듈 에서는 `export` 로 불러올 수 있음.

```javascript

//main.js 
import { random, double } from './num.js';

// 불러올게 많을 때 한번에 부를 수 있다.
import * as num from './num.js';

// 이름을 바꿔서 불러올 수 있다.
import { random as ran, double as db } from './num.js';

```

##### Promise

- 비동기 통신이 늘어나면서 콜백에 대한 번거로움을 해소하고자 도입됨. 통신에 한정되지 않고, 무한하게 활용할 수 있음.

```javascript
// ES5
'use strict';

function sleep(callback, msec) {
  setTimeout(callback, msec);
}

sleep(function(){
  console.log('wake!')
}, 1000);


// ES6
'use strict';

function sleep(msec) {
  return new Promise(function(resolve, reject){
	setTimeout(resolve, msec);
  });
}

sleep(1000).then(function(){
  console.log('wake!');
});
```

Refer : http://azu.github.io/promises-book/

##### Class

- 자바스크립트 에서도 클래스를 지원하게 되었다.

```javascript

// ES5 
function Box(length, width) {
    this.length = length; 
    this.width = width; 
}

Box.prototype.calculateArea = function() {
    return this.length * this.width; 
}

var box = new Box(2, 2); 
box.calculateArea(); //4

// ES6
class Box { 
    constructor(length, width) { 
        this.length = length; 
        this.width = width; 
    } 
    
    calculateArea() { 
        return this.length * this.width; 
    } 
} 

let box = new Box(2, 2); 
box.calculateArea(); // 4
```

- 클래스를 확장하는 것도 가능하다.

```javascript

class Shape {

    constructor(color) {
        this._color = color;
    }
    
}

class Circle extends Shape {

    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }

}

```

- 또 다른 예

```javascript
// ES5
'use strict';

function User(name) {
  this._name = name;
}

User.prototype = Object.create(null, {
    constructor: {
        value: User
    },

    say: {
        value: function() {
            return 'My name is ' + this._name;
        }
    }
});

function Admin(name) {
    User.apply(this, arguments);
}

Admin.prototype = Object.create(User.prototype, {
    constructor: {
        value: Admin
    },

    say: {
        value: function() {
            var superClassPrototype = Object.getPrototypeOf(this.constructor.prototype);
            return '[Administrator] ' + superClassPrototype.say.call(this);
        }
    }
});

var user = new User('Alice');
console.log(user.say()); // My name is Alice

var admin = new Admin('Bob');
console.log(admin.say()); // [Administrator] My name is Bob
```

```javascript
// ES6
'use strict';

class User {
  constructor(name) {
    this._name = name;
  }

  say() {
    return 'My name is ' + this._name;
  }
}

class Admin extends User {
  say() {
    return '[Administrator] ' + super.say();
  }
}

var user = new User('Alice');
console.log(user.say()); // My name is Alice

var admin = new Admin('Bob');
console.log(admin.say()); // [Administrator] My name is Bob
```

- Reference : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/create

##### Generator



##### await/async


