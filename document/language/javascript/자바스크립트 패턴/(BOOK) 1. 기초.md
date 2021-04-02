[![9791158390754](https://1.bp.blogspot.com/-Zn0A-6q9zQ8/VyXY7dyTpKI/AAAAAAAAN0c/aSDSM_CeJ1g0b6Is8mPqfDcAHyLd-jkOgCLcB/s320/cfile10.uf.206F3A364EAA4CA906E76D.png) Javascript Patterns](http://www.yes24.com/Product/Goods/5871083?OzSrank=5)

# (BOOK) 1. 기초

소프트웨어 에서 패턴이란 어떤 문제에 대한 일반적 해결책을 의미 한다.

검증되고 자주 사용되는 코드를 패턴 이라고 생각하면 될 듯 하다.

## 유지보수 가능한 코드 작성

소프트웨어는 유지보수 비용이 든다. 시간이 지나면 지날수록 증가하게 되는데, 그 이유는

- 문제를 인지하고 코드를 다시 학습 하는 데 걸리는 시간
- 이 문제를 해결하는 코드를 작성하고, 호환성 검토 하는 데 걸리는 시간

조직 이라면 문제가 생겼을 때, 문제를 발생시킨 사람, 문제를 발견한 사람, 문제를 해결하는 사람 모두 다른 사람일 가능성이 있기 때문에, 이해하기 쉬운 코드를 작성 하는 것이 대단히 중요한 일이다.

유지보수 가능한 코드란 것은 읽기 쉽고, 일관적이고, 예측가능하며, 한사람이 작성한 것처럼 보여야 하고, 문서화 되어 있으면 된다.
(말이 쉽지.. 일하다 보면 놓치고 싶은(?) 것들이다.)


### 전역 변수 최소화

자바스크립트는 함수를 사용하여 유효 범위를 관리 한다.
함수 안의 선언된 변수는 해당 함수에 종속 되어서 외부 에서는 사용할 수 없다.

```javascript
function foo() {
 var a; // function에 귀속된 변수. 외부 에서는 사용할 수 없다.
}
```

반대로 전역 변수는 어떤 함수에도 속하지 않고 선언 되거나, 아예 선언 되지 않은 채로 사용되는 변수를 가리킨다.

```javascript
myglobal = "hello";
console.log(myglobal);
console.log(window.myglobal);
console.log(window["myglobal"]);
console.log(this.myglobal);
```

전역변수는 현재 컨텍스트(js 가 실행되는 환경. 예를 들어 브라우저, node등) 에서 공유 된다.
이것은 다른 목적으로 만들어진 코드의 변수와 충돌이 일어날 수 있다.

### var 의 연속 선언

var 선언을 연쇄적 으로 할당하는 것은 의도하지 않은 결과를 만들어 낼 수 있다.

```javascript
function foo() {
 var a = b = 0;
}
```

여기에 b 코드는 지역변수가 아니다. 이런 결과가 생기는 이유는 자바스크립트는 오른쪽에서 좌측으로 평가 되기 때문이다. 위의 코드는

```javascript
function foo() {
 b = 0;
 var a = b;
}
```

이렇게 수행 된다. b가 선언문인 var를 누락시키는 결과가 된다. 주의해야만 한다.


### 전역 객체에 대한 접근

브라우저 에서는 어디서는  window 속성을 통해 전역 객체에 접근할 수 있다. 그러나 다른 환경 에서는 window를 사용하지 않을 수도 있다.

이럴 때 유용하게 사용할 수 있는 코드가 있다.

```javascript
var global = (function() {
 return this;
}());
```

어디서는 최상위객체에 global을 통해 접근할 수 있게 된다.

### 단일 var 패턴 

함수 상단에 var 선언을 한번만 쓰는 패턴은 유용하고 사용해 볼 만 하다.

- 함수에서 필요로 하는 모든 지역 변수를 한군데서 찾을 수 있다.
- 변수를 선언하기 전에 사용할 때 발생하는 로직상의 오류를 막아준다.
- 변수를 먼저 선언한 후에 사용해야 한다는 사실을 상기시키기 때문에 전역 변수를 최소화하는 데 도움이 된다.
- 코드량이 줄어 든다.

```javascript
function func() {
 var a = 1,
  b = 2,
  sum = a + b,
  myobject = {},
  i,
  j;
}
```

var 선언을 하나만 쓰고 쉼표로 연결하여 선언했다. 선언 시 초기값을 주어 초기화 하는 방법 또한 좋은 방법이다. 가독성도 좋다.


### 호이스팅(hoisting): 분산된 var 선언의 문제점
 
자바스크립트는 함수 내 여기저기서 여러 개의 var 선언을 사용할 수 있는데, 실제로는 모두 함수 상단에서 변수가 선언된 것과 동일하게 동작한다. 이러한 동작 방식은 `호이스팅(hosting, 끌어올리기)` 이라고 한다.
이런 특성 때문에, 중간에 var 를 사용하면 오작동이 생길 수 있다.

```javascript
myname = "global";
function func() {
 alert(myname);
 var myname = "local";
 alert(myname);
}
```

첫번째 alert은 undefined 가 된다. 호이스팅 방식 때문에 위의 로직은

```javascript
myname = "global";
function func() {
 var myname;
 alert(myname);
 myname = "local";
 alert(myname);
}
```

이런식으로 해석되기 때문이다.

### for 루프 

for 루프 안에서는 보통 배열이나 arguments, HTMLCollection 등 배열과 비슷한 객체를 순회한다.

```javascript
for(var i = 0; i < myarray.length; i++) {
 // myarray[i]
}
```

이 반복문의 문제점은  순회할 때마다 배열의 lenth를 접근 한다는 데에 있다.

```javascript
for(var i = 0, j=myarray.length; i < j; i++) {
 // myarray[i]
}
```

이렇게 초기값으로 지정하면 순회마다 갯수를 세지 않아도 되기 때문에, 수행시 필요한 비용을 줄일 수 있다.

이와 다른 패턴 으로는

```javascript 
var i, myarray = [1,2,3,4,5,6,7];
for( i = myarray.length; i--) {
 // myarray[i]
}
```

변수를 하나 덜 쓰고 (개수를 세지 않는다) 0이 되면 끝나기 때문에, `.length` 를 비교하는 거보다 다소 비용이 적다.

### for-in 루프

보통 객체를 순회할 때 사용 한다. 하지만 프로토타입 체인을 통해 상속되는 property 또한 순회에 대상이 된다.

```javascript
var man = {
 hands : 2,
 legs : 2,
 heads : 1
};

Object.prototype.clone = function() { }

for(var i in man) {
 console.log(i, ":", man[i]);
}

for(var i in man) {
 if (man.hasOwnProperty(i)) {
  console.log(i, ":", man[i]);
 }
}
```

object에 clone 을 추가했기 때문에, 모든 object는 곧바로 프로토타입에 clone이 생기게 되고, 처음 for 문에서는 어김없이 clone 이 console 로 나오게 되지만,  hasOwnProperty를 사용하면 이런 것을 걸를 수 있게 된다.

객체나 배열을 순회할 때 기억하고 있다면, 도움이 된다.

### switch 패턴

```javascript
var inspect_me = 0,
 result = '';

switch (inspect_me) {
 case 0:
  result = "zero";
  break;
 case 1:
  result = "one";
  break;
 default:
  result = "unknown";
}
```

몇가지 규칙 으로 가독성을 높였다.

- 각 case문을 switch문에 맞추어 정렬한다.
- 각 case문 안에서 코드를 들여쓰기 한다.
- 명백하게 break; 로 종료 한다.
- 마지막 default 문을 사용 한다.

### 암묵적 타입캐스팅 피하기

자바스크립트는 변수를 비교할 때 암묵적으로 타입캐스트를 실행하기 때문에, `== 0` 과 `== "0"` 이 같은 비교가 된다.

```javascript
var zero = 0;
if (zero === false) {
 // zero는 0이고 false가 아니기 때문에 실행 하지 않는다.
}

if (zero == false) {
 // 실행 한다.
}
```

이는 자바스크립트가 자동으로 타입변환을 한다는 특성을 이해하고, 주의하면서 사용하면 된다.

### eval() 피하기 

임의의 문자열을 받아서 자바스크립트로 코드를 실행 한다. 

```javascript
// 안티 코드
var property = "name";
alert(eval('obj.' + property));

// 바른 코드
var property = "name";
alert(obj[property]);
```

eval 을 사용하지 말아야 하는 이유는 많지만 그 중에..

1. 보안: 문자열이 사용자 입력이나 제3자의 스크립트에 의해 다른 명령어로 대체될 수 있다.
2. 디버깅: 에러를 디버깅하기 어렵다. – 실패하는 확실한 위치나 줄번호를 얻을 수 없다.
3. 최적화: 문자열은 변경될 수 있기 때문에, JavaScript 인터프린터는 코드를 미리 컴파일 할 수 없다. 물론 인터프린터가 효율을 높이기 위해 계속 시도는 하지만, 네이티브 코드 보다는 확실히 느리게 실행된다.

이유불문 하고 사용하지 말자.

### parseInt() 을 통한 숫자 변환

이 함수는 두번째 매개변수로 기수를 받는데, 보통 생략을 하지만 그러면 안된다. 파싱할 문자열이 0으로 시작하는 경우 8진수로 다뤄지는 경우가 있기 때문에, 예측 불가능한 경우가 생긴다.

```javascript
var month = "06",
 year = "09";

month = parseInt(month, 10);
year = parseInt(year, 10);
```

만약 기수를 생략 한다면, 09는 8진수로 취급되고 유효한 수가 아니기 때문에 0이 나올 것이다.

### 명명 규칙

변수와 함수이 이름을 일관되게 결정 하는 것이다.

1. 생성자는 대문자로 시작 한다.

```javascript
var adam = new Person();
```

함수 이름만 보고도 생성자로 쓸 함수인지를 눈치챌 수 있으면 도움이 된다.

2. 변수는 _ 를 기준으로 사용 한다.

`first_name, favorite_bands` 등으로 사용하면 함수와 변수를 가시적으로 구별하는 데에 도움이 된다.

3. 변경 되어서는 안되는 변수는 대문자로 쓴다.

```javascript
var PI = 3.14,
 MAX_WIDTH = 800
```

4. 직접 사용하지 않는 메서드는 `_` 로 구별 한다.

```javascript
var person = {
 getName = function() {
  return this._getFirst() + ' ' + this._getLast();
 },

 _getFirst: function() {

 },

 _getLast: function() {
  
 }
}
```

`getName()` 은 안정된 API에 속하는 공개 메서드 이고, `_getFirst()` 는 비공개 메서드를 뜻한다. 비공개 메서드는 사용자가 어떤 의도를 가지고 사용할 때, 동작을 보장하지 않는다는 의미로, 사용자에게 활용하지 말라는 의미를 내포 한다.