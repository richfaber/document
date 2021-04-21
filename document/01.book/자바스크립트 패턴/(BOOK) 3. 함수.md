[![9791158390754](https://1.bp.blogspot.com/-Zn0A-6q9zQ8/VyXY7dyTpKI/AAAAAAAAN0c/aSDSM_CeJ1g0b6Is8mPqfDcAHyLd-jkOgCLcB/s320/cfile10.uf.206F3A364EAA4CA906E76D.png) Javascript Patterns](http://www.yes24.com/Product/Goods/5871083?OzSrank=5)

소프트웨어 에서 패턴이란 어떤 문제에 대한 일반적 해결책을 의미 한다.

검증되고 자주 사용되는 코드를 패턴 이라고 생각하면 될 듯 하다.


# (BOOK) 3. 함수

자바스크립트는 함수를 다양한 방법으로 사용한다. 그래서 완벽히 익히는 것이 반드시 필요 하다.

함수는 다음과 같은 특징을 가진다.

- 런타임, 즉 프로그램 실행 중에 동적으로 생성할 수 있다.
- 변수에 할당할 수 있고, 다른 변수에 참조를 복사할 수 있으며, 확장가능하고, 몇몇 특별한 경우를 제외하면 삭제할 수 있다.
- 다른 함수의 인자로 전달할 수 있고, 다른 함수의 반환 값이 될 수 있다.
- 자기 자신의 속성과 기능을 가질 수 있다.

함수 A가 객체로서 속성과 기능을 가지고, 이 중 하나가 또 다른 함수인 B이다.
이 함수 B는 C 라는 함수를 인자로 받아들이고, 실행 결과로 또 다른 함수 D를 반환한다.
이런 것은 자바스크립트의 특징 들로 인해 가능한 것이다.

함수는 일반적으로 하나의 객체라고 생각하면 된다.

```javascript
// 안티패턴, 실제로 이렇게 사용하면 안된다.
 var add = new Function('a, b', 'return a+b');
 add(1,2); // 3을 반환
```

이 코드는 `add()` 생성자를 통해 만들었으므로 객체라는 사실이 맞다. 하지만 `Function()` 생성자의 사용은 `eval()` 만큼이나 좋지 않은 방법이다.

- 코드가 문자열로 전달되어 평가된다.
- 따옴표를 이스케이프 해야 한다.
- 가독성을 높이기 위해 함수 본문을 들여쓰기 하려고 신경을 써야 한다.

자바스크립트에서는 중괄호({}) 지역 유효범위가 없다. 다르게 얘기해서 블록이 유효범위를 만드는 것은 아니다. if문이나 for 문안에 들어 있는 변수의 유효범위가 중괄호 안에만 유효한 것이 아니라는 뜻이다.

어떤 변수이건 함수 내에서 var로 정의되면 지역 변수가 되고, 함수 밖에서는 그 변수를 참조할 수 없다.

```javascript
function testCode() {
  var aa = "scope this";

  for(var i=0, j=5; i<j; i++) {
    var cc = "이 변수는 testCode 함수내에서 언제든 접근된다.";
  }

  console.log(cc);
}
console.log(aa); // Error, 선언되지 않은 변수.
```

## 용어 정리 

### 기명 함수 표현식(named function expression)을 사용한 함수

```javascript
var add = function add(a,b) {
  return a + b;
};
```

이름이 정해진 함수 라고 이해하면 된다.


### 무명 함수 표현식(unnamed function expression)

```javascript
var add = function(a,b) {
  return a + b;
};
```

이름이 없는 함수 표현 이다. 익명함수(annoymous function) 이라고도 한다.

아 두가지 표현식의 유일한 차이점은 함수 객체의 name 속성이 빈 문자열이 되거나 속성이 들어가거나 하는 차이 뿐이다.  

즉 기명 함수 표현식으로 해서 console.log(add.name) 은 add 라는 속성값이 나오지만, 무명 함수 표현식은 빈문자열이 나온다.


### 함수 선언문 (function declaration)

```javascript
function foo() {
  // 함수 본문
}
```

함수 표현식의 결과를 변수에 할당하지 않을 경우(이러한 사용법은 콜백 패턴이라고 한다.) 

기명 함수 표현식과 함수 선언문은 비슷해 보인다. 
이 둘의 문법적 차이는 세미콜론을 붙이느냐 아니냐 인데, 함수 선언문에는 세미콜론이 필요 없지만 함수 표현식에는 필요하다.

세미콜론이 자동으로 붙긴 하더라도, 함수 표현식에 세미콜론은 붙이는 것이  정법이다.


## 선언문 vs 표현식 : 이름과 호이스팅

함수 선언문과 함수 표현식중 어떤 것을 사용 해야 할까? 

```javascript
function callMe(func) {
  if(func) func();
}

callMe(function() {
  // 무명 함수를 인자로 전달했다.
  
})

callMe(function me() {
  // 기명 함수를 인자로 전달했다.
});

var myobject = {
  say : function() {
    // 이것은 함수 표현식.
  }
}
```

함수 선언문은 전역 유효범위나 다른 함수의 본문 내부, 즉 `프로그램 코드` 에서만 쓸 수 있다. 변수나 속성에 할당할 수 없고, 함수 호출시 인자로 넘길 때도 사용할 수 없다. 그렇다면 언제 함수 선언물을 사용할 까?

```javascript
function foo() {
  function local() {
    // 지역 유효범위
    function bar() { }
    return bar();
  }
}
```

## 함수의 name 속성 

함수를 정의하는 패턴을 선택할 때는 읽기 전용인 name 속성을 쓸 일이 있는지 고려해 봐야 한다. 다시 한번 말하지만 name 속성은 표준은 아니지만 많은 실행환경 에서 사용이 가능하다. 함수 선언문과 기명 함수 표현식을 사용하면 name 속성이 정의 되는 반면, 무명 함수 표현식의 name 속성은 경우에 따라 달라진다.

IE는 undefined, 파이어폭스와 웹킷은 빈 문자로 지정 된다.

```javascript
function foo() {}
var bar = function() {};
var baz = function baz() {};

foo.name; // "foo"
bar.name; // ""
baz.name; // "baz"
```

name 속성은 파이어버그나 다른 디버거에서 코드를 디버깅할 때 유용하다. 함수 내에서 발생한 에러를 보여주어야 할 때, 디버거가 name 속성값을 확인 하여 이름표로 쓸 수 있기 때문이다. name 속성은 자신을 호출할 때도 사용 한다.(비추천)

이런 경우 아니라면 무명함수 표현식이 더 쉽고 간결하다.


## 함수 호이스팅 

함수 선언문과 기명 함수 표현식에는 `호이스팅(hoisting)` 동작에 차이점이 있다.

모든 변수는 함수 본문 어느 부분에서 선언(declation) 되더라도 내부적으로 함수의 맨 윗부분으로 끌어올려(hoist)진다. 함수 또한 결국 변수에 할당되는 객체이기 때문에 동일한 방식이 적용된다.

함수 선언문을 사용하면 변수 선언뿐 아니라 함수 정의(definition) 자체도 호이스팅 되기 때문에 자칫 오류를 만들어내기 쉽다.


```javascript
// 안티패턴, 사용하면 안된다.
function foo() {
  alert('global foo');
}

function bar() {
  alert('global bar');
}

function hostMe() {
  console.log(typeof foo); // 'function'
  console.log(typeof bar); // 'undefined'

  foo(); // 'local foo'
  bar(); // TypeError: bar is not a function

  function foo() {
    alert('local foo');
  }

  var bar = function() {
    alert('local bar');
  };
}
hoistMe();
```

`hostMe()` 함수 내에서 `foo` 와 `bar` 를 정의하면, 실제 변수를 정의한 위치와 상관 없이 끌어올려져 전역 변수인 `foo` 와 `bar` 를 덮어쓰게 된다.

그런데 `지역 변수 foo()` 는 나중에 정의 되어도 상단으로 호이스팅 되어 정상 동작하는 반면에, `bar()` 의 정의는 호이스팅 되지 않고 선언문만 호이스팅 된다. 

그렇기 때문에 `bar()` 의 정의가 나오기 전까지는 undefined 상태이고, 함수의 기능으로 사용할 수 없다. 

또한 선언문 자체는 호이스팅되었기 때문에 유효범위 체인 내에서 `전역 bar()` 도 보이지 않는다.

변수 호이스팅 이란 같은 현상이다.

```javascript
function testMe() { 
  console.log(a); // 끌어올려져서 var a; 는 있지만 값은 할당되지 않았으므로 undefined 
  var a = "10"; 
  console.log(a); 
}
```


## 콜백 패턴 

함수는 객체이고 다른 함수에 인자로 전달이 가능 하다.
통상 함수 내에 특정한 영역에서 다른 함수를 실행하고 싶을 때 콜백함수를 전달한다고 한다.

```javascript
function writeCode(callback) {
  // 어떤 작업.
  callback();
  // ...
}

function introduceBugs() {
  // 버그발생코드
}
writeCode(introduceBugs);
```

`introduceBugs()` 가 `writeCode()` 의 인자로 괄호 없이 전달했는데, 괄호를 넣으면 함수를 실행 후 return 값이 전달되지만 괄호가 없으면 참조만 전달 된다.


## 콜백예제

```javascript
var findNodes = function() {
  var i = 100000,
    nodes = [],
    found;

  while(i) {
    i -= 1;
    nodes.push(found);
  }
  return nodes;
}
```

이 함수는 범용으로 쓸 수 있도록 실제 요소에 아무 것도 하지 않고 단지 DOM 노드의 배열을 반환하기만 하도록 유지하는게 좋다. 노드를 수정하는 로직은 다른 함수에 두자.

```javascript
var findNodes = function() {
  var i = 100000,
    nodes = [],
    found;

  while(i) {
    i -= 1;
    nodes.push(found);
  }
  return nodes;
}

var hide = function(nodes) {
  var i = 0, max = nodes.length;
  for(; i < max; i+= 1) {
    nodes[i].style.display = "none";
  }
}

hide( findNodes() );
```

findNodes를 통해서 요소를 넣고 그 return 값을 이용해 hide 내부에서 숨김처리 하는 것이다.

이것은 findNodes()의 루프를 통한다음, 다시 hide에서 루프를 돌기 때문에 비효율 적이다. findnodes가 직접 숨기면 좋을 거 같다. 이럴 때 콜백 함수를 활용할 수 있다.

```javascript
var findNodes = function(callback) {
  var i = 100000,
    nodes = [],
    found;

  if(typeof callback !== 'function') {
    callback = false;
  }
  
  while(i) {
    i -= 1;
    // 이곳에 복잡한 로직을 구현한다.

    if (callback) {
      callback(found);
    }
    nodes.push(found);
  }
  return nodes;
}

var hide = function(nodes) {
    nodes[i].style.display = "none";
}

findNodes(hide);
// or
findNodes(function(node) {
  node.style.display = "block";
})
```

좀더 직관적인 로직이 되었다.


### 콜백과 유효범위 

콜백에서 혹여 this를 사용해야 하는 경우라면 예상치 않은 동작을 할 것이다.

```javascript
var myapp = {};
myapp.color = "green";
myapp.paint = function(node) {
  node.style.color = this.color;
}

var findNodes = function (callback) {
  // ...
  if ( typeof callback === "function") {
    callback(found);
  }
}

findNodes(myapp.paint);
```

this.color가 정의되지 않았다고 나올 것이다. `findNodes()` 는 전역 함수이기 때문에 객체 this 는 전역 객체로 브라우저에서는 window 를 가르킬 것이다.

```javascript
var myapp = {};
myapp.color = "green";
myapp.paint = function(node) {
  node.style.color = this.color;
}

var findNodes = function (callback, callback_obj) {
  // ...
  if ( typeof callback === "function") {
    callback.call(callback_obj, found);
  }
}

findNodes(myapp.paint, myapp);
```

call 기능을 통해 호출의 주체를 정할 수 있다.


### 비동기 이벤트 리스너 

콜백 패턴은 다양하게 사용 되는데, 이벤트 리스너에도 사용 한다.

```javascript
document.addEventListener('click', console.log, false)
```

현재 페이지를 클릭하면 console.log의 콜백을 실행 할 것이다.


### 타임아웃

```javascript
var thePlotThickens = function() {
  console.log('500ms later...');
}
setTimeout(thePlotThickens,500);
```

`setTimeout` 이나 `setInterval` 과 같은 기능에도 콜백방식을 사용 한다.

그 외에도 라이브러리 라던지, 범용 함수를 제작할 때에는 콜백함수를 충분히 제공해서, 그 함수를 사용하는 사람이 임의적으로 코드를 삽입할 수 있는 장치를 마련해 주어야 한다.

그렇지 않으면 사용자는 그 함수를 유용하게 쓰려고 이리저리 수정하게 될 것이고, 라이브러리 제작자의 초기 의도와는 상관 없는 함수로 변신하게 된다.


## 함수 반환하기

함수는 객체 이기 때문에 반환 값으로 사용될 수 있다. 즉 함수의 실행 결과로 꼭 어떤 데이터값이나 배열을 반환할 필요는 없다는 뜻이다. 보다 특화된 함수를 반환할 수도 있고, 입력 값에 따라 필요한 함수를 새로 만들어 낼 수도 있다.

```javascript
var setup = function() {
  alert(1);
  return function() {
    alert(2);
  };
}

var my = setup(); // 1 출력
my(); // 2 출력
```

`setup()` 은 반환된 함수를 감싸고 있기 때문에 클로저를 생성한다. 클로저는 반환되는 함수 에서는 접근할 수 있지만 코드 외부 에서는 접근할 수 없기 때문에, 비공개 데이터 저장을 위해 사용할 수 있다.

```javascript
var setup = function() {
  var count = 0;
  return function() {
    return (count += 1);
  };
};

var next = setup();
next(); // 1 반환
next(); // 2 반환
next(); // 3 반환
```

반환된 함수를 변수에 받어서 실행하면, 내부의 count 변수를 직접 접근할 수는 없지만, 변경이 가능하다.


## 자기 자신을 정의하는 함수 

함수는 동적으로 정의할 수 있고 변수에 할당할 수 있다. 새로운 함수를 만들어 이미 다른 함수를 가지고 있는 변수에 할당 한다면, 새로운 함수가 이전 함수를 덮어 쓰게 된다.
(이전의 함수 포인터가 새로운 함수를 가리키도록 재사용된다고 보는 것이 정확하다.)

이런 일을 이전 함수의 본문 내에서도 할 수가 있다.

```javascript
var scareMe = function() {
  alert("Boo!");
  scareMe = function() {
    alert('Double boo!');
  }
}

scareMe(); // Boo!
scareMe(); // Double boo!
```

함수는 자기 자신을 새로운 구현으로 덮어쓰고 재정의를 했다.

이 패턴은 함수가 어떤 초기화 작업을 단 한번만 수행할 경우에 유용하다. 불필요한 작업을 반복할 이유가 없기 때문에 함수의 일부는 더 이상 쓸모가 없다.

간단히 말해서 재정의된 함수의 작업량이 적기 때문에 이 패턴은 애플리케이션 성능에 확실히 도움이 된다. 이 패턴의 단점은 자기 자신을 재정의한 이후에는 이전에 원본 함수에 추가했던 모든 속성들을 잃게 된다는 것이다.

```javascript
var scareMe = function() {
  alert("Boo");
  scareMe = function() {
    alert('Double boo!');
  };
};

// 1. 새로운 속성을 추가 한다.
scareMe.property = "properly";

// 2. 다른 이름으로 할당한다.
var prank = scareMe;

// 3. 기능으로 사용한다.
var spooky = {
  boo: scareMe
};

// 새로운 이름으로 호출한다.
prank(); // "Boo";
prank(); // "Boo";
console.log(prank.property); // "properly"

// 기능으로 호출한다.
spooky.boo(); // "Boo!"
spooky.boo(); // "Boo!"
console.log(spooky.boo.property); // "properly"

// 자기 자신을 재정의한 함수를 사용한다.
scareMe(); // "Double boo!
scareMe(); // "Double boo!
console.log(scareMe.property); // undefined;
```

이 예제에서 보는 것처럼, 함수가 새로운 변수에 할당되면 예상과 달리 자기 자신을 정의 하지는 않는다.

`prank()` 가 호출될 대마다 알림으로 `Boo!` 가 출력되고, `전역 scareMe()` 함수를 덮어썻는데도 `prank()` 자신은 여전히 property 속성을 포함한 이전의 정의를 참조한다. `spooky 객체의 boo() 메서드` 로 함수가 사용될 때에도 똑같은 일이 일어난다.

 이 모든 호출들은 계속해서 `전역 scareMe()` 포인터를 덮어 쓴다. 마지막에 `전역 scareMe()` 가 호출되었을 때 비로소, `Double boo` 가 출력되고, `scareme.property` 또한 참조할 수 없게 된다.

`scareMe` 는 무명함수를 가르키고 있고, `prank` 는 scareMe 가 가르키고 있는 곳을 바라보고 있다.

즉 `prank 가 scareMe 를 보고 있는 것` 이 아니라, `scareMe 가 보고 있는 곳` 을 보고 있기 때문에, `prank 는 엄밀히 scareMe 자체` 는 아니라고 봐야 한다.

그래서 `prank()` 를 호출 하고 나면 `scareMe` 의 값을 바뀌었지만, `prank` 의 값은 바뀌지 않는다.


## 즉시 실행 함수

선언 되자 마자 실행 되도록 하는 문법이다.

```javascript
(function() {
  alert('watch out');
}());
```

또 다른 패턴도 있다.

```javascript
(function() {
  alert('watch out');
})();
```

둘의 기능 차이는 없다.

페이지 로딩이 완료된 후, 이벤트 핸들러를 등록하거나 객체를 생성하는 등의 초기 설정 작업을 해야 한다고 했을 때, 이런 모든 작업은 단 한번만 실행 되기 때문에 재사용 하기 위해 이름이 지정된 함수를 생성할 필요는 없다.

```javascript
(function() {
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today = new Date(),
    msg = 'Today is ' + days[today.getDay()]
      + ', ' + today.getDate();

  alert(msg);
  
}()); // Today is Fri, 13
```

또한 function은 클로저를 생성하기 때문에, 외부에서는 참조할 수 없고, 격리되기 때문에, 한번 사용되고, 네임스페이스를 어지럽히지 않고 종료된다.
즉시 실행 함수의 매개변수 

```javascript
(function (who, when) {
  console.log("I met " + who + " on " + when);
}('Joe Black', new Date() ));
```

일반적으로 전역 객체가 즉시 실행 함수의 인자로 전달된다. 따라서 즉시 실행 함수 내에서 window를 사용하지 않고도 전역 객체에 접근할 수 있다. 이러한 방법을 통해 브라우저 외에 실행 환경 에서도 코드를 공통으로 사용할 수 있다.

```javascript
(function (global) {
  // 
}(this));
```

전달인자를 확인하기 위해, 위아래를 오가며 확인하는 것이 다소 불편할 수 있기 때문에, 전달인자가 많으면 불편할 수 있다.


### 즉시 실행 함수의 반환 값 

```javascript
var result = (function() {
  return 2 + 2;
}());
```

다른 함수와 마찬가지로 값을 반환할 수 있고 반환된 값을 변수에 할당할 수 있다.

```javascript
var result = function() {
  return 2 + 2;
}();
```

감싸고 있는 괄호를 삭제해도 결과는 같다.

```javascript
var result = (function() {
  return 2 + 2;
})();
```

이렇게 해도 된다.

객체에 속성이 적절한 계산을 하고 나서 할당 되어야 하는 경우,

```javascript
var o = {
  message: (function() {
    var who = "me",
      what = "call";
    return what + " " + who;
  }()),
  getMsg: function() {
    return this.message;
  }
}
o.getMsg();
o.message;
```

이런 식의 응용도 가능 하다.

이런 즉시실행 함수는 외부에서의 무간섭적인 상태를 유지할 수 있기 때문에, 일회성 기능함수 라던지, 내부변수를 외부에서 참조하면 안되는 상황이라던지 하는 때에 유용하게 사용할 수 있다.

혹은 템플릿 형태로 제작하는 경우에도 도움이 된다.

```javascript
// module1.js 파일내용.
(function() {
  // Module1 코드
}());
```

이렇게 기능을 단위별로 정의하는 데에 활용할 수 있는데, module 이라고도 부른다. 이렇게 분리된 파일을 한파일로 가져가야 하는 상황에는 빌드스크립트를 통해 파일들을 병합하면 된다.


## 즉시 객체 초기화

전역 유효범위가 난잡해지지 않도록 보호하는 또 다른 방법을 앞서 설명한 즉시실행 함수 패턴과 비슷한 즉시 객체 초기화 패턴이다. 이 패턴은 객체가 생성된 즉시 init() 기능함수를 실행 한다.

```javascript
({
  maxwidth: 600,
  maxheight: 400,
  gimmeMax: function() {
    return this.maxwidth + "x" + this.maxheight;
  },

  init: function() {
    console.log(this.gimmeMax());
  }
}).init();
```

이 패턴은 `{} 중괄호` 를 `() 괄호` 로 감싸게 함으로써, 코드 블록이 아니라 객체 표현식으로 인식 하도록 했다.

```javascript
({ ... }).init();
({ ... }.init());
```

2가지 패턴 모두 같은 결과를 얻을 수 있다.

이 패턴의 단점은 대부분의 자바스크립트 압축 도구가 즉시 실행 함수 패터네 비해 효과적으로 압축하지 못할 수 있다는 데에 있다.

```javascript
var Test = ({
  maxwidth: 600,
  maxheight: 400,
  gimmeMax: function() {
    return this.maxwidth + "x" + this.maxheight;
  },

  init: function() {
    console.log(this.gimmeMax());
  }
});
Test.init(); // 정상 출력

({
  maxwidth: 600,
  maxheight: 400,
  gimmeMax: function() {
    return this.maxwidth + "x" + this.maxheight;
  },

  init: function() {
    console.log(this.gimmeMax());
  }
}).init(); // 정상 출력

({
  maxwidth: 600,
  maxheight: 400,
  gimmeMax: function() {
    return this.maxwidth + "x" + this.maxheight;
  },

  init: function() {
    console.log(this.gimmeMax());
  }
}.init()); // 정상 출력

{
  maxwidth: 600,
  maxheight: 400,
  gimmeMax: function() {
    return this.maxwidth + "x" + this.maxheight;
  },

  init: function() {
    console.log(this.gimmeMax());
  }
}.init(); // Uncaught SyntaxError: Unexpected token : 객체 표현식이 아닌 객체로 인식되었고, 객체는 할당되어야 실행 된다. (즉시실행 함수의 형태가 아님.)
```


괄호의 역할을 주의 깊게 보고, 즉시 실행함수의 문법적 특성을 이해하는 것이 중요하다.

## 초기화 시점의 분기

초기화 시점의 분기는 최적화 패턴이다. 어떤 조건이 프로그램의 생명주기 동안 변경되지 않는게 확실할 경우, 조건을 단 한번만 확인하는 것이 바람직 하다.

예를 들어, XMLHttpRequest 가 내장 객체로 지원되는 걸 확인 했다면, 프로그램 실행 중에 브라우저가 바뀌어 난데없이 ActiveX 객체로 변경되거나 하지 않는다. 

실행환경은 변하기 않기 때문에, XHR지원을 체크하는 것을 매번 할 필요는 없다.

Dom 요소의 계산된 스타일을 확인하거나 이벤트 핸들러를 붙이는 작업도 초기화 시점 분기 패턴의 이점을 살릴 수 있는 경우 이다.

```javascript
var utils = {
  addListener: function(el, type, fn) {
    if (typeof window.addEventListener === 'function') {
      el.addEventListener(type, fn, false);
    } else if (typeof document.attachEvent === 'function') {
      el.attachEvent('on' + type, fn);
    } else {
      el['on' + type] = fn;
    }
  },
  removeListener: function(el, type, fn) {
    // .... 동일한 분기체크를 통해 이벤트를 삭제 한다.
  }
}
```

이것은 비효율 적이다. 호출을 할 때마다 확인 작업을 하기 때문이다.

```javascript
var utils = { addListener: null, removeListener: null };

if( typeof window.addEventListener === 'function') {
  util.addListener = function(el, type, fn) {
    el.addEventListener(type, fn, false);
  };
  util.removeListener = function(el, type, fn) {
    el.removeEventListener(type, fn, false);
  };
} else if( typeof document.attachEvent === 'function') {
  util.addListener = function(el, type, fn) {
    el.attachEvent('on' + type, fn);
  };
  util.removeListener = function(el, type, fn) {
    el.detachEvent('on' + type, fn);
  };
} else {
  util.addListener = function(el, type, fn) {
    el['on' + type] = fn;
  };
  util.removeListener = function(el, type, fn) {
    el['on' + type] = null;
  };
}
```

이렇게 하면 한번만 확인하면 된다.

덧붙여서 이 패턴을 브라우저의 버전 체크로 활용하지 말아야 한다. window.addEventlistener를 지원하지 않는다고 IE 브라우저라고 판단하는 코드는 좋지 않다. 언제든 상황은 바뀔 수 있고, 업데이트를 통해 지원이 되는 사례도 있기 때문이다.

## 함수 속성 - 메모이제이션(Memoization) 패턴 

함수는 객체이므로 속성을 가질 수 있다. 이미 생성할 때부터 .length 속성을 갖는다.

```javascript
function func(a, b, c) {}
console.log(func.length)
```

언제든지 함수에 사용자 정의 속성을 추가할 수 있는데, 함수에 속성을 추가하여 결과를 캐시하면 다음 호출 시점에 복잡한 연산을 반복하지 않을 수 있다. 이것을 메모이제이션 패턴이라고 한다.

```javascript
var myFunc = function (param) {
  if (!myFunc.cache[param]) {
    var result = {}
    // .. 비용이 많이 드는 수행 ..
    myFunc.cache[param] = result;
  }
  return myFunc.cache[param];
};

myFunc.cache = {};
myFunc('apple'); // myFunc.cache에 속성으로 apple이 등록 되었다.
```

이 로직은 `param` 에 문자열이나 혹은 원시 데이터 타입 같은 것을 가정 한다. 만약 원시데이터를 한번만 파싱하고 이후 파싱 과정은 피하고 싶다면,

```javascript
var myFunc = function (param) {
  if (!myFunc.cache[param]) {
    var result = {}

    for(prop in param) {
        myFunc.cache[prop] = param[prop];
    }
  }
  return myFunc.cache;
};

myFunc.cache = {};

myFunc({ a:100, b:200 });
myFunc.cache['a']; // 100
```

비용이 많이 드는 `for in` 문을 한번만 쓰고 이후에는 `cache` 에서 가져다 쓰면 되고, 데이터가 바뀌더라도 `myFunc( data )` 로 다시 파싱을 하면 된다.

만약 변수명을 `clientData` 라고 하고, `clientData(jsonData)` 로 파싱 하고, `clientData.get['apple']` 로 데이터를 사용한다면, 가독성이나 구조적으로 편하게 사용할 수 있다.


## 설정 객체 패턴

설정 객체 패턴은 좀더 깨끗한 API를 제공하는 방법이다.

```javascript
var addPerson(first, last) {
  ...
}
```

`addPerson` 이라는 함수가 있다고 치자. 실제로는 생일도 저장할 거고, 성별, 주소도 선택적으로 저장할 것이다.

```javascript
var addPerson(first, last, dob, gender, address) {
  ...
}
```

길어지고 있다.

하다보니 username 또한 필수로 저장해야 한다.
이러다 보니, 어떤 매개변수는 필수이거나 아니거나도 주의해야 하고, 매개변수의 순서도 주의해야 한다.

```javascript
var addPerson(first, last, dob, gender, address, username) {
  ...
}
addPerson('Bruce', 'Wayne', new Date(), null, null, 'batman');
```

많은 수의 매개변수를 전달 하는 것은 불편 하다.
하나의 객체를 만들어 대신 전달하는 것이 더 나은데, 이 객체를 설정(configration)을 의미하는 conf 라고 지정하고, 매개변수 한개를 전달 한다.

```javascript
var addPerson(conf) {
  ...
}
var conf = {
  username: 'batman',
  first: 'bruce',
  name: 'wayne'
};

addPerson(conf);
```

설정 객체의 장점은 다음과 같다.

- 매개변수와 순서를 기억할 필요가 없다.
- 선택적인 매개변수를 안전하게 생략할 수 있다.
- 읽기 쉽고 유지보수하기 편하다.
- 매개변수를 추가하거나 제거하기가 편하다.

단점은

- 매개변수의 이름을 기억해야 한다.
- 속성이름은 압축되지 않는다. 