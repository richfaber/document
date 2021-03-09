# 2. 자바스크립트의 스코프와 클로저

## 스코프란? (scope)

현재 변수의 접근할 수 있는 범위

```html
<div id="div0">Click me! DIV 0</div>
<div id="div1">Click me! DIV 1</div>
<div id="div2">Click me! DIV 2</div>
<script>
    var i, len = 3;
    for (i=0; i<len; i++) {
        document.getElementById('div'+i).addEventListener('click', function() {
            alert("You clicked div #" + i);
        }, false)
    }
</script>
``` 

위의 결과를 브라우저에 출력하면

```
Click me! div0.       You clicked div #3
Click me! div1.       You clicked div #3
Click me! div2.       You clicked div #3
```

이렇게 내부에서 사용되는 `i` 값이 변하는 이유는 스코프가 생성되고 유지되는 원리에 있다.

`var i, len=3` 번줄의 변수를 참조하는 `callback` 함수가 이벤트함수로 등록 되어 있다. 즉 이벤트함수가 외부변수 `i` 를 참조하고 있는데, `for` 문에 의해 `i`의 값이 지속적으로 증가하기 때문에, `i`는 최종적으로 `3` 이 되고, `alert` 으로 `외부`의 `i` 를 참조하다 보니, 이런 결과가 나온다.

전체적인 스코프를 그림으로 보면

[그림]

이렇게 되고, 최종적으로 변해버린 `i` 를 참조하게 된다.

### 스코프의 생성

만약 0부터 9까지 더하여 총합이 16이 넘는 숫자를 구한다면

```javascript
for(var i=0; i<10; i++) {
    var total = (total || 0) + i;
    var last = i;
    if (total > 16) {
        break;
    }
}
console.log(typeof total !== "undefined");
console.log(typeof last !== "undefined");
console.log(typeof i !== "undefined");
console.log("total === " + total + ", last === " + last);
```

`typeof` 연산자는 데이터 형식을 나타내는 문자열을 반환하고, `undefined` 는 선언되지 않은 변수를 뜻한다.

다른 언어에서는 `for` 블럭 안에 있는 변수를 외부에서 참조하려 할 때, 에러를 발생시키는데, 자바스크립트는 블록스코프를 따르지 않기 때문에, 외부에서 참조를 할 수 있다.

특정구문에 스코프가 생성되는 구문은

- function
- with
- catch

일때만 스코프가 생성된다.

** function 구문의 스코프 생성 **

```javascript
function foo() {
    var b = "Can you access me?";
}
console.log(typeof b === "undefined");
```

`for-loop` 문은 외부에서 접근 가능했지만, `function` 안의 변수는 외부에서 참조할 수 없다.

** catch 구문의 스코프 생성 **

```javascript
try {
    throw new exception("fake exception");
} catch (err) {
    var test = "can you see me";
    console.log(err instanceof ReferenceError === true);
}
console.log(test === 'can you see me');
console.log(typeof err === 'undefined');
```

전달된 `err` 변수는 외부에서 접근할 수 없지만, 그 안에 선언된 `test` 는 외부에서 참조할 수 있다.

** with 구문의 스코프 생성 **

```javascript
with({inScope: "You can't see me"}) {
    var notInScope = "but you can see me";
    console.log(inScope === "You can't see me");
}
console.log(typeof inScope === "undefined");
console.log(notInScope === "but you can see me");
```

`with` 구문의 인자로 전달되는 `{inScipe:}` 는 내부에서 참조할 수 있지만, `with` 구문 안에서 선언된 변수는 외부에서 참조할 수 없다.

### 스코프의 지속성

특정한 조건에서 `스코프가 생성되었다` 라는 것은 그 변수가 허용범위를 가지게 되었다는 의미이고, 이렇게 생성된 스코프 즉 허용범위는 언제까지 지속될까를 알아 보자.

이것은 이해하기 위해, 앞서 만들었던 이벤트 예제를 약간 변형해 보자.

** function 을 이용한 해결 **

```html
<div id="divScope0">Click me! DIV 0</div>
<div id="divScope1">Click me! DIV 1</div>
<div id="divScope2">Click me! DIV 2</div>
<script>
    function setDivClick(index) {
        document.getElementById('divScope' + index)
            .addEventListener("click", 
                function () {
                    alert('You clicked div #' + index)
                }
                , false);
    };

    var i, len = 3;
    for (i=0; i<len; i++) {
        setDivClick(i);
    }
</script>
```

해당 `div` 클릭 시 정상적인 결과를 받아 볼 수 있음을 확인할 수 있다.

이것은 인자로 전달된 `i` 의 값이 `setDivClick` 함수의 인자로 전달된 순간 전달인자인 `index` 는 독자적인 스코프를 생성하게 되고, 이것은 `i` 를 참조하지 않게 되었다는 의미이다.

## 클로저란?

> 특정함수가 참조하는 변수들이 선언된 렉시컬 스코프(lexical scope)는 계속 유지되는데, 그 함수와 스코프를 묶어서 클로저 라고 한다.

```javascript
function outer() {
    var count = 0;
    var inner = function () {
        return ++count;
    };
    return inner;
}
var increase = outer();

console.log(increase()); // === 1
console.log(increase()); // === 2
```

- count 변수는 `outer()` 함수의 로컬 변수로 `outer()` 함수 내부에서만 접근할 수 있다.
- `outer()` 함수 내부에 다시 함수를 선언하여 `inner 변수` 에 할당했다.
- `inner 변수` 에 할당한 함수는 `outer()` 함수의 로컬변수인 `count` 에 접근하여 1 증가시키고 반환한다. 
- `outer()` 함수의 반환값으로 `inner 변수` 를 지정하면서 로직이 끝난다.

일반적으로 `count` 변수는 `outer()` 함수의 로컬변수 이므로, 외부에서 접근을 할 수 없다. 흔히 객체지향의 `private 변수` 의 개념과 비슷하다.

하지만 다른 함수 `inner`를 반환(return) 함으로써, `count` 변수에 간섭을 할 수 있게 되었다.

이러한 상황이 클로저의 기본 개념이다.

** 또 다른 응용 예 **

```javascript
function outer () {
    var count = 0;
    return {
        increase: function () {
            return ++count;
        },
        decrease: function () {
            return --count;
        }
    }
}
var counter = outer();
console.log(counter.increase());    // === 1
console.log(counter.increase());    // === 2
console.log(counter.decrease());    // === 1

var counter2 = outer();
console.log(counter2.increase());   // === ?
```

위의 결과는 `1` 이다. 이유는 함수 실행 시 `count` 변수가 독립적 스코프를 만들었기 때문이다.

이것은 스코프를 이해하는데 아주 중요한 단서 이므로, 꼭 기억해야 한다. 

## 

