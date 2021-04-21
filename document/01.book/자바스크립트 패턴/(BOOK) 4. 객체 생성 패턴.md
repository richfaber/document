[![9791158390754](https://1.bp.blogspot.com/-Zn0A-6q9zQ8/VyXY7dyTpKI/AAAAAAAAN0c/aSDSM_CeJ1g0b6Is8mPqfDcAHyLd-jkOgCLcB/s320/cfile10.uf.206F3A364EAA4CA906E76D.png) Javascript Patterns](http://www.yes24.com/Product/Goods/5871083?OzSrank=5)

소프트웨어 에서 패턴이란 어떤 문제에 대한 일반적 해결책을 의미 한다.

검증되고 자주 사용되는 코드를 패턴 이라고 생각하면 될 듯 하다.


# (BOOK) 4. 객체 생성 패턴

자바스크립트 에서는 객체 표현식(리터럴) 이나 생성자 함수를 사용하여 아주 쉽게 객체를 만드는 것이 가능하고, 간단하고 평이하다.

다른 언어의 네임스페이스나 모듈 패키지, 비공개 속성, static 멤버 등의 기능이 익숙하고 당연할지 몰라도, 자바스크립트 에서는 이런 것들을 위한 별도의 문법이 거의 없다.

이러한 기능들을 구현하거나 대체하거나 또는 다른 관점에서 바라볼 수 있게 해주는 범용적인 패턴들을 살펴 보자.

## 네임스페이스 패턴

네임스페이스(기능에 이름을 붙이는 방법)는 프로그램에서 필요로 하는 전역 변수의 개수를 줄이는 동시에 과도한 접두어를 사용하지 않고도 이름이 겹치지 않게 해준다.

수많은 함수, 객체, 변수들로 전역 유효범위를 어지럽히는 대신, 애플리케이션이나 라이브러리를 위한 전역 객체를 하나 만들고 모든 기능을 이 객체에 추가하면 된다.

```javascript
// 수정 전: 전역 변수 5개
// 경고 : 안티패턴이다.

// 생성자 함수 2개
function Parent() { }
function Child() { }

// 변수 1개
var some_var = 1;

//객체 2개
var module1 = {};
module1.data = { a: 1, b: 2 };
var module2 = {};
```

전역변수로 5개를 사용했다. 언제든 다른 코드와 이름이 겹치게 될 수 있다. 이를 리팩토링 하기 위해서 먼저 애플리케이션 전용 전역 객체, 이를 테면 MYAPP 을 생성한다. 그런 다음 모든 함수와 변수들을 이 전역객체의 속성으로 변경 한다.

```javascript
// 수정 전: 전역 변수 1개

// 전역 객체
var MYAPP = {};

// 생성자
MYAPP.Parent = function() {};
MYAPP.Child = function() {};

// 변수
MYAPP.some_var = 1;

// 객체 컨테이너
MYAPP.modules = {};

// 객체들을 컨테이너 안에 추가한다.
MYAPP.modules.module1 = {};
MYAPP.modules.module1.data = {a:1, b:2};
MYAPP.modules.module2 = {};
```

전역변수 이름으로 `MYAPP` 하나로 줄였다.

전역 네임스페이스 개게의 이름은 애플리케이션 이름이나 라이브러리 이름, 도메인명, 회사 이름 등을 통상적으로 사용 하지만, 사정에 맞춰서 적절히 정하면 된다.

하지만 가독성을 위해서 전역 객체 이름은 모두 대문자로 쓰는 명명 규칙을 사용하는 것이 좋다.

이 패턴은 코드에 네임스페이스(이름)을 지정해주며, 코드 내의 이름 충돌 뿐 아니라 이 코드와 같은 페이지의 이름 충돌도 방지해 준다.

하지만 단점이 있다.

- 모든 변수와 함수에 접두어를 붙여야 하기 때문에 전체적 으로 코드량이 약간 더 많아지고 따라서 파일 크기도 증가 한다.
- 전역 객체가 단 하나 뿐이기 때문에, 코드상 에서 어느 한 부분이 수정 되어도 전역 객체를 수정하는 꼴이 된다. 즉 다양한 기능들이 너무 한 객체에 집중 되어 있다.
- 이름이 중첩되고 길어지므로 속성을 판별하기 위한 검색 작업도 길고 느려진다.


## 범용 네임스페이스 함수

프로그램 복잡도가 증가하고 코드의 각 부분들이 별개의 파일로 분리되어 선택적 으로 문서에 포함하게 되면, 어떤 코드가 특정 네임스페이스나 그 내부의 속성을 처음으로 정의한다고 가정하기가 위험하다.

네임스페이스에 추가하려는 속성이 이미 존재할 수도 있고, 그 내용이 덮여쓰여질 가능성이 있기 때문이다.

그래서 네임스페이스를 생성하거나 속성을 추가하기 전에 먼저 이미 존재하는지 여부를 확인하는 것이 최선이다.

```javascript
// 전역 객체
if(typeof MYAPP === 'undefined') {
  var MYAPP = {};
}

// 혹은
var MYAPP = MYAPP || {};
```

이 코드는 상당량의 중복 코드가 생겨날 수 있다. 예를 들어 `MYAPP.modules` 의 `module2` 를 정의 하기 위해 `MYAPP.modules.module2` 가 있는지를 확인해야 하고, `MYAPP.modules` 가 정의 되어 있는지도 확인해야 하기 때문이다.

따라서 실제 작업을 맡아 줄 재사용 가능한 함수를 만들어 두는 것이 좋다.

```javascript
var MYAPP = MYAPP || {};

MYAPP.namespace = function (ns_string) {
  var parts = ns_string.split('.'),
    parent = MYAPP,
    i;

  // 처음에 중복되는 전역 객체명은 제거한다
  if(parts[0] === 'MYAPP') {
    parts = parts.slice(1);
  }

  for (i = 0; i < parts.length; i += 1) {
    // 속성이 없으면 생성한다.
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }

    parent = parent[parts[i]];
  }
  return parent;
};

MYAPP.namespace('MYAPP.modules.module2');

// 이것은 다음과 같은 결과가 된다.
var MYAPP = {
  modules: {
    module2: {}
  }
}
```

전달된 `MYAPP.modules.module2` 의 `MYAPP` 은 떼어버리고, `modules` 를 비교해서 없으면 만들고 있으면 넘어간다. `module2` 도 마찬가지로 존재 하면 넘어가고, 없으면 새로 만든다.

이것은 만약 다른 작업자가 `MYAPP.modules.module2` 를 사용하고 있다면, 나는 그것을 알 길이 없다.

그래서 마지막 module2 가 있을 경우에 강제로 에러를 발생 시키는 방법 으로 조금 수정해 보자.
  
```javascript
var MYAPP = MYAPP || {};
MYAPP.namespace = function (ns_string) {
  var parts = ns_string.split('.'),
    parent = MYAPP,
    i;

  // 처음에 중복되는 전역 객체명은 제거한다
  if(parts[0] === 'MYAPP') {
    parts = parts.slice(1);
  }

  for (i = 0; i < parts.length; i += 1) {
    // 속성이 없으면 생성한다.
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    } else if( i == parts.length - 1) {
        console.log('Exist Object ===> ' + ns_string);
        parent[parts[i]] = error;
    }

    parent = parent[parts[i]];
  }
  return parent;
};

MYAPP.namespace('MYAPP.modules.module2');
MYAPP.namespace('MYAPP.modules.module2');
```

## 의존 관계 선언 

자바스크립트 라이브러리 들은 대개 네임스페이스를 지정하여 모듈화 되어 있기 때문에, 필요한 모듈만 골라서 쓸 수 있다. 예를 들어 YUI2 에는 네임스페이스 역할을 하는 YAHOO 라는 전역 변수가 있고, 이 전역 변수의 속성으로 `YAHOO.util.DOM (DOM 모듈)` 이나 `YAHOO.util.Event(이벤트 모듈)` 와 같은 모듈이 추가되어 있다.

```javascript
var myFunction = function() {
  // 의존 관계에 있는 모듈들
  var event = YAHOO.util.Event,
    dom = YAHOO.util.Dom;

  // 이제 event와 dom 이라는 변수를 사용한다.
};
```

- 의존 관계가 명시적으로 선언되어 있기 때문에, 코드를 사용하는 사람이 페이지 내에 반드시 포함시켜야 하는 스크립트 파일이 무엇인지 알 수 있다.
- 함수의 첫머리에 의존 관계가 선언되기 때문에 의존 관계를 찾아내고 이해하기가 쉽다.
- dom과 같은 지역 변수는 YAHOO와 같은 전역 변수보다 언제나 더 빠르며 YAHOO.util.Dom 처럼 전역 변수이 중첩 속성과 비교하면 더 말할것도 없다. 의존 관계 선언 패턴을 잘 지키면 함수 안에서 전역 개게 판별을 단 한번만 수행하고, 이 다음부터는 지역 변수를 사용하기 때문에 훨씬 빠르다.
- YUI 컴프레서나 구글 클로저 등 고급 압축 도구는 지역 변수명에 대해서는 event를 A라는 글자 하나로 바꾸는 식으로 축약해 코드를 줄여 준다. 하지만 전역 변수명 변경은 위험하기 때문에 축약하지 않는다.

다음 예제는 코드를 압축했을 때 의존 관계 선언 패턴의 효과를 보여준다.

```javascript
function test1() {
  alert(MYAPP.modules.m1);
  alert(MYAPP.modules.m2);
  alert(MYAPP.modules.m51)
}

/*
  압축된 test1의 본문
  alert(MYAPP.modules.m1);alert(MYAPP.modules.m2);alert(MYAPP.modules.m51);
*/

function test2() {
  var modules = MYAPP.modules;
  alert(modules.m1);
  alert(modules.m2);
  alert(modules.m51);
}

/*
  압축된 test2의 본문 :
  var a = MYAPP.modules; alert(a.m1); alert(a.m2); alert(a.51);
*/  
```

test2에만 패턴 적용이 되어 있다. 변수가 하나 추가 되었지만, 실제 코드량은 더 적어지게 되고, 그것은 파일크기가 줄어든다는 것을 의미한다.

## 비공개 속성과 기능함수

자바스크립트는 다른 언어와 달리 private, protected, pubilc 속성과 기능함수를 나타내는 별도의 문법이 없다.

객체의 모든 속성은 공개(public) 되어 있다.

```javascript
var myobj = {
  myprop : 1,
  getProp : function() {
    return this.myprop;
  }
}

console.log(myobj.myprop);
console.log(myobj.getProp());
```

`myobj.myprop` 를 접근하는 것이 가능하다.

생성자 함수를 사용해도 마찬가지로 모든 속성에 접근이 가능하다.

```javascript
function Gadget() {
  this.name = 'iPod';
  this.stretch = function() {
    return 'iPad';
  };
}

var toy = new Gadget();
console.log(toy.name);
console.log(toy.stretch());
```

### 비공개(private) 멤버 

모든 변수가 접근 할 수 있다면, 개발자의 의도와 다르게 기능이 훼손되거나, 용도와 다르게 사용될 수 있기 때문에, 변경 못하게 하고 싶을 때가 있다.

별도의 문법은 없지만 클로저 특성을 사용해서 구현이 가능 하다.
생성자 함수 안에서 클로저를 활용하면, 유효범위 안의 변수는 생성자 함수 외부에서는 접근할 수 없다.

```javascript
function Gadget() {
  var name = 'iPad';
  this.getName = function() {
    return name;
  };
}

var toy = new Gadget();
console.log(toy.name);
console.log(toy.getName);
```

name 변수는 이제 외부에서는 접근이 불가능 하고, toy.getName 으로만 접근을 할 수 있다.

name은 clouser(동사, 폐쇄되다. 종지되다. 닫혔다.) 되었기 때문에, 값을 변경 할 수도 없다.

### 특권(privileged) 기능함수

특권 기능함수 라는 개념은 문법과는 상관 없다.
단지 비공개로 접근권한을 가진 공개 기능함수를 가리키는 이름일 뿐이다.
앞선 예제의 getName 은 비공개속성인 name을 접근할 수 있는 접근 권한을 가진 특권기능함수 라고 할 수 있다.

### 비공개 속성의 허점

```javascript
function Gadget() {
  var specs = {
    screen_width: 320,
    screen_height: 480,
    color: 'white'
  }

  this.getSpecs = function() {
    return specs;
  }
}
```

얼핏 보기에 문제 없어 보이는데 getSpecs 함수가 specs 객체에 대한 참조를 return 한다는게 문제다.

- [(참조객체 도움글)](https://draft.blogger.com/blog/post/edit/1402486756640559023/4213707346479969391#)

```javascript
function Gadget() {
  var specs = {
    screen_width: 320,
    screen_height: 480,
    color: 'white'
  }

  this.getSpecs = function() {
    return specs;
  }
}

var toy = new Gadget(),
  specs = toy.getSpecs();

specs.color = "black";
specs.price = "free";

console.log(toy.getSpecs());
```

이렇게 객체나 배열을 return 할 경우는 참조를 return 하기 때문에, 보호하고 싶었던 specs의 값의 변경이 가능해 진다.

이런 자바스크립트의 특성을 고려 하면서 사용해야 한다. 가장 안전한 방법은 상수값을 전달하는 것이다.

```javascript
function Gadget() {
  var SPECTS_SCREEN_WIDTH = 320,
    SPECTS_SCREEN_HEIGHT = 480,
    SPECTS_COLOR = 'white'

  this.getSpecs = function() {
    return [SPECTS_SCREEN_WIDTH, SPECTS_SCREEN_HEIGHT, SPECTS_COLOR];
  }
}

var toys = new Gadget();
var specs = toys.getSpecs();
console.log(specs);

specs[0] = 200; // 값을 변경 하고 나면 당연히 specs의 값을 변하지만,
console.log(specs);

var specs = toys.getSpecs(); // 다시 값을 받으면,
console.log(specs); // 값이 보존되고 있다.
```

변하면 안되는, 즉 불변의 변수는 관례적으로 대문자로 표기 한다.


### 객체 표현식과 비공개 속성

객체 표현식으로 생성한 경우를 살펴 보자.

```javascript
var myobj;
(function() {
  var name = "my, oh my";

  myobj = {
    getName : function() { // 특권 기능 함수
      return name;
    }
  }
}());

myobj.getName();
```

익명 즉시 실행 함수안에 변수가 들어가 있기 때문에, `name 은 클로저(clouser)` 되었다. 즉 외부에서는 접근할 수 없다.

약간 형태를 변경해 보면

```javascript
var myobj = (function() {
  var name = "my, oh my";

  return {
    getName : function() { // 특권 기능 함수
      return name;
    }
  };
}());

myobj.getName();
```

위의 두 예제는 표현만 달리 했을뿐, 정확히 같은 결과를 나타 낸다.

객체 표현식으로 선언한 특권 기능함수의 return 값 또한, 참조 되어지는(객체, 배열등) 값을 return 하게 되면, 보호 하기로 한 변수의 변경이 가능해 지게 되기 때문에 주의하자.


### 프로토타입과 비공개 속성

생성자를 사용하여 비공개 멤버를 만들 경우, 생성자를 호출하여 새로운 객체를 만들 때 마다 비공개 멤버가 매번 재생성 된다는 단점 이 있다. (장점으로 볼수도 있지만, 재사용 할 필요가 없는 변수 또한 재생성되기 때문에..)

생성자 내부에서 this 에 멤버를 추가하면 항상 이런 문제가 생긴다. prototype 을 사용하면 이렇게 중복 생성 시키지 않을 수 있다.

이럴 때 발생 할 수 있는 것은 메모리는 절약할 수 있지만, 동일한 생성자로 생성된 모든 객체들은 공통 prototype 속성을 공유하게 된다. 감춰놓은 비공개 변수, function등 모든 prototype에 정의된 것들이 공유 된다는 것이다.

```javascript
function Gadget() { // 생성자 함수는 관례적으로 앞문자는 대문자.
  var name = 'iPad';

  this.getName = function() {
    return name;
  };
}

Gadget.prototype = {
  browser: "Mobile Webkit",
  getBrowser: function () {
    return this.browser;
  }
};

var gg = new Gadget();
console.log('prototype 값이 변경 전 > ' + gg.getBrowser() );

var zz = new Gadget();
Gadget.prototype.browser = "change value";

console.log('prototype 값이 변경 후 > ' + gg.getBrowser() );
console.log('prototype 값이 변경 후 > ' + zz.getBrowser() );
```

Gadget 의 prototype 으로 붙어 있는 속성을 변경 했더니, 모든 생성자들의 값 또한 변경되어 버렸다.
이를 위해서 비공개 멤버 패턴을 같이 써서 보완을 해야 한다.

```javascript
function Gadget() { 
  var name = 'iPad';

  this.getName = function() {
    return name;
  };
}

Gadget.prototype = (function() {
  var browser = 'Mobile Webkit';

  return {
    getBrowser: function() {
      return browser;
    }
  };
}() );

var gg = new Gadget();
console.log( gg.getBrowser() ); // gadget의 browser 변수로 접근할 방법이 없다.
```

이렇게 해버리면 내부에 선언된 변수로의 접근이 불가능 하고, 변경 또한 안된다.


### 비공개 함수를 공개 메서드로 노출 시키는 방법

노출 패턴(revelation pattern) 은 비공개 기능 함수를 구현 하면서 동시에 공개 기능함수 로도 노출하는 것을 말한다.

객체의 모든 기능이 객체가 수행하는 작업에 필수 불가결한 것들 이라서 최대한 사용자가 변경 못하도록, 보호하고 싶지만, 이 기능들의 유용성 때문에 공개적인 접근을 일부 허용 하고 싶을 경우가 있다.

노출 패턴은 이럴 때 유용 하다.

(기억해야 할 것은, 접근이 가능 하다는 것은 즉, 이 함수가 다른 사용자에 의해 변경이 가능 하다는 얘기도 되기 때문에, 위험에 노출 되었다고 볼 수 있다.)

참고로 ECMA5 에서는 객체를 고정(freeze) 하는 선택자가 있다.

`모듈 노출 패턴(revealing module pattern)` 이라고 하고, 크리스천 헤일먼(Christian Heilmann)이 고안 했다.

```javascript
var myarray;
(function() {

  var astr = '[object Array]',
    toString = Object.prototype.toString;

  function isArray(a) {
    return toString.call(a) === astr;
  }

  function indexOf(haystack, needle) {
    var i=0,
      max = haystack.length;

    for(; i < max; i += 1) {
      if(haystack[i] === needle) {
        return i;
      }
    }

    return -1;
  }

  myarray = {
    isArray: isArray,
    indexOf: indexOf,
    inArray: indexOf
  };
}());

console.log( myarray.indexOf(['a', 'b', 'z'], 'z') );
console.log( myarray.isArray(['a', 'b', 'z'], 'z') );

myarray.indexOf = null;
console.log( myarray.isArray(['a', 'b', 'z'], 'z') );
console.log( myarray.indexOf(['a', 'b', 'z'], 'z') ); // Error
```

indexOf 라는 pair 를 하나 return 시켜서 inArray를 보호한다. 이렇게 하더라도, myarray.isArray = null 해버리면 보호고 뭐고 없다.


### 모듈 패턴

늘어나는 코드를 구조화하고 정리하는 데 도움이 되는 패턴이다.

지금까지 봤던 패턴들의 종합체 라고 할 수 있다.

```javascript
var MYAPP = MYAPP || {};
MYAPP.namespace = function (ns_string) {
  var parts = ns_string.split('.'),
    parent = MYAPP,
    i;

  // 처음에 중복되는 전역 객체명은 제거한다
  if(parts[0] === 'MYAPP') {
    parts = parts.slice(1);
  }

  for (i = 0; i < parts.length; i += 1) {
    // 속성이 없으면 생성한다.
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    } else if( i == parts.length - 1) {
        console.log('Exist Object ===> ' + ns_string);
        parent[parts[i]] = error;
    }

    parent = parent[parts[i]];
  }
  return parent;
};


MYAPP.namespace('MYAPP.utilities.array');
MYAPP.utilities.array = (function() {

  // 의존 관계
  var uobj = MYAPP.utilities.object,
    ulang = MYAPP.utilities.lang,
    array_string = '[object Array]', // 비공개 속성
    ops = Object.prototype.toString; // 비공개 속성

  // 비공개 기능함수들..

  // 공개 API
  return {

    inArray: function (needle, haystack) {
      for (var i = 0, max = haystack.length; i < max; i += 1) {
        if (haystack[i] === needle) {
          return true;
        }
      }
    },

    isArray: function (a) {
      return ops.call(a) === array_string;
    }
  };

}());
```

비공개와 공개를 구별하는 것을 빼고는 특이한 것은 없다.


### 모듈 노출 패턴 

모든 기능함수를 비공개 상태로 유지 하면서, 최종적으로 노출할 기능 함수만 노출 한다.

```javascript
MYAPP.utilities.array = (function() {

  // 의존 관계
  var array_string = '[object Array]',
    ops = Object.prototype.toString,
    inArray = function (needle, haystack) {
      for (var i = 0, max = haystack.length; i < max; i += 1) {
        if (haystack[i] === needle) {
          return true;
        }
      }
    },
    isArray = function (a) {
      return ops.call(a) === array_string;
    }

  return {
    isArray: isArray,
    inArray: inArray,
    indexOf: inArray
  }

}());
```

사용자가 두개의 return 중에 하나만 훼손 하길 기대하는 패턴.


### 생성자를 생성하는 모듈 

생성자함수를 사용해서 객체를 만드는게 더 편할 때가 있다. 이 패턴은 function 을 넘겨주는 방식 이다.

```javascript
MYAPP.utilities.Array = (function() {

  // 의존 관계
  var Constr;

  Constr = function(o) {
    this.elements = this.toArray(o);
  }

  Constr.prototype = {
    constructor: MYAPP.utilities.Array,
    version: "2.0",
    toArray : function (obj) {
      for (var i = 0, a = [], len = obj.length; i < len; i += 1) {
        a[i] = obj[i];
      }
      return a;
    }
  }
  return Constr;

}());

var arr = new MYAPP.utilities.Array([1,2]);
```


### 모듈에 전역 변수 가져오기

즉시 실행 함수에 인자를 전달하는 형태 이다.
어떠한 값이라도 가능하지만, 보통 전역 변수에 대한 참조 또는 전격 객체 자체를 전달 한다.

이렇게 전역 변수를 전달하면 즉시 실행 함수 내에서 지역 변수로 사용할 수 있게 되기 때문에 탐색 작업이 좀더 빨라진다.(미미한 성능차이)

```javascript
MYAPP.utilities.module = (function(app, global) {
  // ... 로직 ...
} (MYAPP, this));
```


## 샌드박스 패턴 

다음의 단점을 보완하기 위한 패턴 이다.

- 애플리케이션 전역 객체가 단 하나의 전역 변수에 의존 한다. 따라서 네임스페이스 패턴으로는 동일한 애플리케이션이나 라이브러리의 두 가지 버전을 한페이지 에서 실행시키는 것이 불가능 하다. 이를테면 모두 MYAPP이라서 두개의 같은 버전을 사용할 수 없다는 거다.
- MYAPP.utilities.array와 같이 점으로 연결된 긴 이름을 써야 하고 런타임에는 탐색 작업을 거쳐야 한다.

샌드박스 패턴은 모듈간 영향을 미치지 않고 동작 할 수 있는 환경을 위한다.

```javascript
function Sandbox() {

  var args = Array.prototype.slice.call(arguments),
    callback = args.pop(),
    modules = (args[0] && typeof args[0] === 'string') ? args : args[0],
    i;

  if (!(this instanceof Sandbox)) {
    return new Sandbox(modules, callback);
  }

  this.a = 1;
  this.b = 2;

  if (!modules || modules === '*' || modules[0] === '*') {
    modules = [];
    for (i in Sandbox.modules) {
      if (Sandbox.modules.hasOwnProperty(i)) {
        modules.push(i);
      }
    }
  }

  for ( i = 0; i < modules.length; i += 1) {
    Sandbox.modules[modules[i]](this);
  }

  callback(this);
}

Sandbox.prototype = {
  name : "MY Application",
  version : "1.0",
  getName: function() {
    return this.name;
  }
};

Sandbox.modules = {
  dom : function(box) {
    box.getElement = function() {};
    box.getStyle = function() {};
    box.foo = "bar";
  },

  event : function(box) {
    box.attachEvent = function() {};
    box.detachEvent = function() {};
  },

  ajax : function(box) {
    box.makeRequest = function() { };
    box.getResponse = function() { };
  }
};

var MYAPP1 = Sandbox('ajax', function() { console.log('ajax 모듈만 쓸거야'); });
var MYAPP2 = Sandbox('ajax', 'dom', function() { console.log('ajax랑 dom 다 쓸거야'); });
//var MYAPP3 = Sandbox('test', function() { console.log('modules 추가가 되어 있지 않음.'); }); // Error
```

- this가 Sandbox의 속성인지 확인하고, 그렇지 않으면 함수를 생성자로 호출 한다.
- 생성자 내부에서 this에 속성을 추가 한다.
- 필요한 모듈은 배열 혹은 개별적 인자로 전달할 수 있고, * 와일드카드를 사용하거나, 쓸 수 있는 모듈을 모두 쓰겠다는 의미로 생략도 가능하다.
- 필요한 모듈을 모두 파악한 다음에는 각 모듈을 초기화 한다.
- 생성자의 마지막 인자로 콜백 함수가 있는데, 이 콜백 함수가 실제 사용자의 샌드박스이며 필요한 기능을 모두 갖춘 상태에서 box 객체를 전달받게 된다.

정리하면

Sandbox에 자주 사용되고, 필수의 유틸리티들이 모여 있고, 필요한 모듈만 따로 떼어 생성자를 통해 box로 전달해 주면, 사용자는 필요한 모듈만 골라 사용 할 수 있다.

## 스태틱 멤버 

스태틱 속성과 기능함수는 변경하거나 변형 되지 않고 사용되는 속성과 기능함수를 말한다. 즉 변경하지 않기를 바라는 속성, 함수이고, 있는 그대로 사용하면 된다.

예를 들어 MathUtils 에 max() 라는 스태틱 기능함수가 있다면, MathUtils.max(3, 5) 같은 식으로 호출해서 return을 받으면 된다.

다른 언어 에서는 문법으로 제한을 두어 사용자가 변경을 시도할 경우 에러를 발생하지만, 자바스크립트는 따로 문법을 제공하지 않는다.

### 공개 스태틱 멤버

생성자에 속성을 추가함 으로써, 클래스 기반 언어와 동일한 문법을 사용할 수 있는데, 예제를 보자.

```javascript
var Gadget = function() {};

Gadget.isShiny = function() {
  return "you bet";
};

Gadget.prototype.setPrice = function(price) {
  this.price = price;
};

Gadget.isShiny();

var iphone = new Gadget();
iphone.setPrice(500);

typeof Gadget.setPrice; // undefined
typeof iphone.isShiny; // undefined
```

Gadget 생성자에 속성 으로 `isShiny()` 와 prototype으로 `setPrice()` 를 정의 하였다.
isShiny는 다른 함수나, 변수의 영향을 받지 않기 때문에, `스태틱 기능 함수` 라고 할 수 있다.

즉 고정이다.

스태틱으로 정의된 `isShiny는 Gadget.isShiny()` 이렇게 사용하면 된다. 반면 `setPrice` 는 생성자를 생성 후 사용자가 함수를 사용 한다.

```javascript
Gadget.prototype.setPrice(500);
console.log(Gadget.prototype.price);
```

이렇게 하면, Gadget의 prototype에 price 속성이 추가가 된다. 하지만 설계자의 의도는 이런것이 아닐것이다. isShiny가 필요한 경우라면,

```javascript
Gadget.prototype.isShiny = Gadget.isShiny;
console.log(iphone.isShiny());

// or..

iphone.isShiny = Gadget.isShiny;
console.log( iphone.isShiny() );
```

prototype 체인을 연결해 버리면 생성자를 통해 생성된 참조자(iphone) 에도 기능이 붙여 진다. 혹은 생성한 객체에 참조를 붙일 수도 있다.

설계자가 생각했던 사용 용도가 이렇게 사용되는 것을 염두에 두고 설계한 것은 아닐 것이다.


### 비공개 스태틱 멤버 

비공개 스태틱 멤버는 다음과 같은 의미를 가진다.

- 동일한 생성자 함수로 생성된 객체 들이 공유 하는 속성, 혹은 기능함수
- 생성자 외부 에서는 접근 할 수 없다.

```javascript
var Gadget = (function() {

  var counter = 0; // 스태틱 변수/속성

  return function() {
    console.log(counter += 1);
  };
}());

var g1 = new Gadget(); // 1
var g2 = new Gadget(); // 2
var g3 = new Gadget(); // 3
```

`counter` 변수는 function() 으로 인해 `클로져(닫힘, 폐쇠됨)` 되었기 때문에, 접근을 할 수는 없고, 익명 즉시 실행 함수 (function() {} ()) 에 의해 Gadget에 counter를 증가 시키는 function() 이 할당 된다.

new 생성자로 Gadget을 수행할 때마다, counter의 값은 증가 된다.

counter변수는 Gadget을 생성자로 생성할 때마다 유일한 ID 가 필요로 할 때 활용할 수 있다.

왠지 이런 유일한 ID는 쓸모가 있어서 특권 기능함수로 노출 시켜도 좋을 것 같아서, getLastId() 라는 특권 기능 함수를 추가해 봤다.

```javascript
var Gadget = (function() {

  var counter = 0,
    NewGadget; // 스태틱 변수/속성

  NewGadget = function() {
    counter += 1;
  };

  NewGadget.prototype.getLastId = function() {
    return counter;
  };

  return NewGadget; // Gadget은 NewGadget을 바라보게 된다.

}());

var iphone = new Gadget();
iphone.getLastId();

var ipod = new Gadget();
ipod.getLastId();

var ipad = new Gadget();
ipad.getLastId();
```

공개/비공개 스태틱 속성은 상당히 편리한 부분이 있어서, 알아두면 활용할 곳이 상당히 있다.

## 객체 상수

자바스크립트는 클로저 특성을 활용해서 외부에서 접근 못하게 변수를 설정할 수는 있어도, 내부에서는 값을 변하지 못하게 할 수 있는 방법이 없다.
관례적으로 상수(변경되면 안되는 값, 고정값)는 대문자로 표기해서 사용 한다.

```javascript
function Widget() {
  var MAX_WIDTH = 200;
  var MAX_HEIGHT = 400;

  // ... 구현내용.
}
```

비공개 변수로 만들어서 getWidth() 라던지 등의 기능 함수를 추가해서, 접근 못하게도 하지만, 최신 브라우저 에서는 const를 통해 지정이 가능하다.


```javascript
// 주의: 상수는 대소문자로 선언될 수 있습니다, 하지만
// 일반 관례는 모두 대문자로 쓰는 것입니다.
const MY_FAV = 7;
MY_FAV = 20; // 재할당, 실패

console.log("my favorite number is: " + MY_FAV); // 7이 찍힘

const MY_FAV = 20; // const 재선언 시도, 실패
var MY_FAV = 20; // var 재선언 시도, 실패

console.log("my favorite number is " + MY_FAV); // MY_FAV는 여전히 7

const FOO; // SyntaxError: const 선언 내에 = 가 빠짐

const MY_OBJECT = {"key": "value"}; // const는 객체 에도 동작
MY_OBJECT = {"OTHER_KEY": "value"}; // 재할당, 실패

// 그러나, 객체 key는 보호되지 않기에
// 다음 문은 문제없이 실행됨
MY_OBJECT.key = "otherValue"; // 객체를 불변하게 하려면 Object.freeze()를 쓰세요
console.log(MY_OBJECT);
```

## 체이닝 패턴 

jQuery처럼 연쇄적으로 기능함수를 호출할 수 있도록 하는 패턴이다.

```javascript
var obj = {
  value: 1,
  increment: function() {
    this.value += 1;
    return this;
  },
  add: function(v) {
    this.value += v;
    return this;
  },
  shout: function() {
    alert(this.value);
  }
};

obj.increment().add(3).shout(); // 5

obj.increment();
obj.add(3);

obj.increment() 를 수행하고 나면, this를 리턴하는데, 이 this는 obj를 가리킨다.

new 생성자로 생성한 객체 안의서의 this, 또는 이벤트로 바인드 되어 있는 경우의 this (obj.onclick = function() { this }) 외에는 가장 가까운 function의 부모가 this가 된다.

console.log(window.a); // undefined
function obj() {
  console.log(this);
  this.a = 10;
}

obj(); // 함수 실행하고 나면
console.log(window.obj);
console.log(window.a); // window에 속성으로 할당됨.

var getObj = new obj();
console.log(getObj.a);
```

obj를 수행하고 나면, 내부 에서의 this는 가장 가까운 function의 부모 객체인 window를 가리키게 되고, `this.a` 는 곧 `window.a` 에 할당 된다.

하지만 new 연산자를 사용하면 새로운 메모리가 할당되기 때문에, 여기서의 this는 getObj가 된다.
(getObj가 새로 할당된 메모리 안의 a를 가리키고 있는것이 정확한 표현이다.)

### 체이닝 패턴의 장단점 

- 사용자의 코드량이 줄고, 간결하고, 한문장 같아 보여서 가독성이 좋다.
- 체이닝 패턴을 위해 함수를 쪼개는 방법을 고민하게 되고, 한개의 함수가 너무 많은 일을 처리하지 않도록 하는 노력을 하게되고, 이는 곧 유지보수 비용을 줄이게 된다.

이런 장점이 있지만, 디버깅이 어렵다는 단점이 있다.

연결된 함수들 중에 하나 라도 실패해 버릴 경우, 어떤 부분에서 실패 했는지 알기가 어렵다.
에러난 line을 명시해서 보여주지 않기 때문에, 각 라인을 검색해 가면서 오류를 찾아야만 한다.

이럼에도 체이닝 패턴은 가독성도 좋고, 편하기 때문에 알아두면 좋다.

## method() 기능함수

클래스 관점에서 생각하는 데에 익숙한 개발자는 자바스크립트를 좀 혼란스러운 언어로 받아 들인다.
혹은 좀 더 클래스 기반의 방식 으로 작성하려고 노력 한다.

더글라스 크록포드가 고안한 method() 라는 개념도 이런 시도중에 하나 이다.
이후 그는 클래스 기반 방식으로 만드는 것이 권장할 만한 방법은 아니였다고 인정한 바 있지만, 그럼에도 불구하고 이 패턴은 매우 흥미롭다.

```javascript
if(typeof Function.prototype.method !== 'function') {
  Function.prototype.method = function(name, implementation) {
    this.prototype[name] = implementation;
    return this; // 체이닝 패턴을 위해 this 를 return
  }
}
var Person = function (name) {
  this.name = name;
}
  .method('getName', function() {
    return this.name;
  })
  .method('setName', function (name) {
    this.name = name;
    return this;
  });

var a = new Person('Adam');

console.log( a.getName() );
console.log( a.setName('Eve').getName() );
```

체이닝 패턴에 의해 `.method`를 Person 함수 뒤에 연결 해서 사용할 수 있게 되었고, 전체를 하나의 명령문으로 정의 했다.

이 패턴은 자바스크립트의 가능성을 보는 패턴으로 좋은 예제인거 같다.

자주 쓰는 실무의 패턴은 아니기 때문에 주의 하자. 