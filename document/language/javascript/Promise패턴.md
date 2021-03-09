# Promise 패턴

@refer: 
- [자바스크립트 프라미스: 소개](https://developers.google.com/web/fundamentals/primers/promises?hl=ko)
- [MDN Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## 개요

일반적으로 프로그래밍은 하나의 실행업무가 종료되기 전까지 다른 업무를 하지 않는다. 
예를 들어, 글쓰기폼 에서 글쓰기를 전송하기 위해 `Form` 전송을 하면, 서버통신이 완료되기 전까지 다른 업무를 하지 않는다.
(강제로 페이지를 이동하기 전에는)

대부분의 프로그래밍이 이런 `동기방식` 으로 작동한다.

하지만 자바스크립트의 `ajax` 통신같은 `비동기방식` 은 결과가 나올때 까지 모든것을 중지하지 않는다.

선행된 `비동기방식 업무` 가 완료됐을때 완료됐다는 `callback` 을 주게 되면 반응하는 구조로 되어 있다.

사용자가 페이지에 접속해서 우측상단에 있는 로그인박스에 계정정보를 넣고 로그인버튼을 누른 후에, 사용자는 로그인이 완료될 때까지 현재페이지에서 스크롤을 움직여가며, 나머지 컨텐츠 들을 확인할 수 있다.

`동기방식` 이라면 `로그인박스의 로그인버튼을 누를 경우` 다른행위를 할 수 없게 된다. 모든 다른 행위가 중지되기 때문이다.

이것이 `비동기방식` 이 인기를 얻게된 이유 중 하나이다.


## 콜백방식

`비동기방식` 에서 하나의 프로세스가 끝난 후에 다른 프로세스를 실행해야 할 경우에 일반적으로 `callback` 을 함수에 준다.

```javascript
function aProcess(callback1) {

    if(callback1) {

        setTimeout(function() {

            // 어떤 작업을 끝낸 후 callback함수를 호출
            callback1();

        },1000);

    }

}

aProcess( function() { console.log('callback1 run') } );
```

그렇다면 `aProcess -> callback -> callback2` 은 어떻게 해야할까?

```javascript
function aProcess(callback1, callback2) {

    if(callback1) {

        setTimeout(function() {
            callback1();

            if(callback2) {

                setTimeout(function() {
                    callback2();
                }, 1000);
            
            }

        }, 1000);

    }

}

aProcess( function() {
    console.log('callback1 run');
}, function() {
    console.log('callback2 run');
} );
```

이런 비슷한 형태가 될 것이다.

물론 4단계가 필요한 경우가 흔하지는 않지만, 이런 callback 단계가 깊어질수록 효율적 코드관리가 어려워 지기 때문에 `콜백지옥` 이라는 표현을 종종 사용한다.

이런 `A -> B -> C` 단계를 수행해야 할 때, 효율적 코드관리를 위해서 `Promise` 명세가 나왔다.

명세는 설명서 같은 것이고, `브라우저 벤더사` 혹은 `라이브러리&프레임워크 개발자` 들이 참고해서 뭔가를 만들어 낸다.

- [Promise 명세](https://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects)


## Promise

Promise 는 어느날 갑자기 생긴 것은 아니고, 이전에 일정부분 구현이 되어 있었다.

- [Q](https://github.com/kriskowal/q)
- [when](https://github.com/cujojs/when)
- [WinJS](https://docs.microsoft.com/en-us/previous-versions/windows/apps/br211867(v=win.10))
- [RSVP.js](https://github.com/tildeio/rsvp.js)

이렇게 사용하던 것이 `ecma 인터네셔널` 에 정식채택이 되면서, 브라우저에도 탑재되기 시작했다.

최신브라우저 에서는 지원하는거 같은데, 일부 지원하지 않는 브라우저를 위해서 `polyfill library` 를 붙여 사용하는 것을 권장한다.

- [Promise Polyfill](https://github.com/taylorhakes/promise-polyfill)


### 기본적인 사용

위의 콜백형태를 프로미스 형태로 변경하면 아래와 같다.

```javascript
function aProcess(callback1, callback2) {

    if(callback1) {

        setTimeout(function() {
            callback1();

            if(callback2) {

                setTimeout(function() {
                    callback2();
                }, 1000);
            
            }

        }, 1000);

    }

}

aProcess( function() {
    console.log('callback1 run');
}, function() {
    console.log('callback2 run');
} );
```

이 예제는

```javascript
function aProcess(callback1, callback2) {

    new Promise(function(resolve, reject) {
        
        setTimeout(function() {
            callback1();
            resolve();
        }, 1000);

    }).then(function() {

        setTimeout(function() {
            callback2();
        }, 1000);

    });
}

aProcess( function() {
    console.log('callback1 run');
}, function() {
    console.log('callback2 run');
} );
```

이런 형태로 변경이 가능하다.

`new Promise` 를 선언하고 안에 `resolve, reject` 인자를 가진 함수를 지정하면, 내부함수에서 `resolve()` 를 수행하기 전에는 그 다음에 체인으로 연결되어 있는 `.then` 단계로 넘어가지 않는다. 

즉 `aProcess -> callback1 -> callback2` 가 가능해 진다.

위에 2단계로는 뚜렷하게 다른점이 보이지 않는다. 5단계 정도까지 확장을 하면,

```javascript
function aProcess(callback1, callback2) {

    new Promise(function(resolve, reject) {
        
        setTimeout(function() {
            callback1();
            resolve();
        }, 1000);

    }).then(function() {

        setTimeout(function() {
            callback2();
        }, 1000);

    }).then(function() {

        setTimeout(function() {
            console.log('callback3 run');
        }, 1000);

    }).then(function() {
        
        setTimeout(function() {
            console.log('callback4 run');
        }, 1000);

    }).then(function() {
        
        setTimeout(function() {
            console.log('callback5 run');
        }, 1000);

    })
}

aProcess( function() {
    console.log('callback1 run');
}, function() {
    console.log('callback2 run');
} );
```

위와 같은 나열이 예상된다. 처음 예제처럼 `callback` 안의 `callback` 을 호출하는 형태는 코드 자체가 무한하게 가로로 확장되는 구조를 가질 수 밖에 없다. (물론 코드의 indent 를 좀 정리하면 되지 않겠는가 라고 반문할 수도 있겠다.)

위에 코드를 조금 정리하면

```javascript
function callback1() {
    console.log('callback1 run');
}

function callback2() {
    console.log('callback2 run');
}

function callback3() {
    console.log('callback3 run');
}

function callback4() {
    console.log('callback4 run');
}

function callback5() {
    console.log('callback5 run');
}


function aProcess() {

    new Promise(function(resolve, reject) {
        
        setTimeout(function() {
            callback1();
            resolve();
        }, 1000);

    }).then(function() {

        setTimeout(function() {
            callback2();
        }, 1000);

    })
    .then(callback3)
    .then(callback4)
    .then(callback5)

}

aProcess();
```

좀더 정리된 느낌의 코드가 된다.

`Promise` 메소드 들은 `Promise 객체` 를 리턴해 주는데, 이것을 이용하면 다른 형태로도 코드를 만들 수 있다.

```javascript
function callback1() {
    console.log('callback1 run');
}

function callback2() {
    console.log('callback2 run');
}

function callback3() {
    console.log('callback3 run');
}

function callback4() {
    console.log('callback4 run');
}

function callback5() {
    console.log('callback5 run');
}

function aProcess() {

    return new Promise(function(resolve, reject) {
        
        setTimeout(function() {
            callback1();
            resolve();
        }, 1000);

    });

}

aProcess()
    .then(function() {

        setTimeout(function() {
            callback2();
        }, 1000);

    })
    .then( callback3 )
    .then( callback4 )
    .then( callback5 )
```

`Promise` 함수가 나 자신인 `Promise` 를 return 해 준다는 것은 `Promise` 객체의 기능들을 체인처럼 연결해서 사용할 수 있다는 것을 의미하는데, 조금 추상적일 수도 있어서, 체이닝패턴에 대해 간략히 보고 가도록 하자.

#### 갑자기 체이닝패턴

```javascript
function bitCoin() {
    console.log("constructor running");
}

bitCoin.prototype.sell = function() {
    console.log("절대 못팔아");
}

bitCoin.prototype.buy = function() {
    console.log("사기 무서워");
}

bitCoin.prototype.decision = function() {
    console.log("사기도 팔기도 무서워");
}

var inheritMethod = new bitCoin();
inheritMethod.sell();
inheritMethod.buy();
inheritMethod.decision();
// inheritMethod.sell().buy(); // Uncaught TypeError: Cannot read property 'buy' of undefined
```

위와 같이 `prototype` 으로 메소드가 있는 함수를 `new` 연산자를 통해 대입하게 되면 `inheritMethod` 는 `bintCoin.__proto__` 에 대한 접근권한을 얻게 되고, 이 연결을 통해 `inheritMethod.sell()` 이 가능해 진다. 물론 `inheritMethod.__proto__.sell = null` 이런 코드로 `bitCoin.sell = null` 같은 위험도 동반된다.

- [프로토타입 이해하기](http://www.nextree.co.kr/p7323/)

이런 여러가지 것들에 대한 이야기 보다 마지막 줄에 있는 `inheritMethod.sell().buy()` 이렇게 연결형으로 함수를 실행할 수 있게 만드는 것을 `체이닝 패턴` 이라고 하는데, 대표적인 예로 `jQuery` 가 `$(selector).addClass('test').find('div')` 같이 연결형으로 메소드를 실행할 수 있는 것은 이런 `체이닝 패턴` 을 가지고 있기 때문이다.

위의 예시에서 `inheritMethod.sell().buy()` 가 가능하게 만드는 것은 의외로 쉽다. `return this` 를 해주면 된다.

```javascript
function bitCoin() {
    console.log("constructor running");
}

bitCoin.prototype.sell = function() {
    console.log("절대 못팔아");
    return this;
}

bitCoin.prototype.buy = function() {
    console.log("사기 무서워");
    return this;
}

bitCoin.prototype.decision = function() {
    console.log("사기도 팔기도 무서워");
    return this;
}

var inheritMethod = new bitCoin();
inheritMethod.sell().buy().decision(); // OK
```

이렇게 자신을 `return` 해주면 `체이닝패턴` 이 가능해진다. 

`var inheritMethod = new bitCoin().buy` 이런 코드를 썼을때 `inheritMethod` 는 `bitCoin.prototype.buy` 와 동일해 진다.

이렇듯 `Promise` 도 `체이닝패턴` 으로 되어 있다.

```javascript
function aProcess() {

    new Promise(function(resolve, reject) {
        resolve();
    });

}

aProcess().then(function() { console.log('yahoo') }); // Uncaught TypeError: Cannot read property 'then' of undefined
```

위와 같이 `aProcess()` 를 실행하고 나면 `return` 값이 없기 때문에, `aProcess().then` 은 사용할 수 없다. 

```javascript
function aProcess() {

    var inheritMethod = new Promise(function(resolve, reject) {
        resolve();
    });

    return inheritMethod;
}

aProcess().then(function() { console.log('yahoo') }); // yahoo
```

`new Promise` 는 `Promise` 를 `return` 해주게 되고, 그것이 `inheritMethod` 에 할당되며, 그리고 나서 `return inheritMethod` 을 해주기 때문에, `aProcess()` 는 `Promise` 객체를 다시 return 받게 된다. 그럼 `Promise` 가 가지고 있는 메소드를 사용할 수 있다.

위에 코드는 아래와도 동일하게 작동한다.

```javascript
function aProcess() {

    return new Promise(function(resolve, reject) {
        resolve();
    });
}

aProcess().then(function() { console.log('yahoo') }); // yahoo
```

위와 같은 코드가 일반적으로 사용되는 듯 하다. 다시 `Promise 예제코드` 로 돌아오면

```javascript
function callback1() {
    console.log('callback1 run');
}

function callback2() {
    console.log('callback2 run');
}

function callback3() {
    console.log('callback3 run');
}

function callback4() {
    console.log('callback4 run');
}

function callback5() {
    console.log('callback5 run');
}

function aProcess() {

    return new Promise(function(resolve, reject) { // `new Promise() 를 return`
        
        setTimeout(function() {
            callback1();
            resolve();
        }, 1000);

    });

}

aProcess()
    .then(function() {

        setTimeout(function() {
            callback2();
        }, 1000);

    })
    .then(callback3)
    .then(callback4)
    .then(callback5)
```

위에 코드가 어떻게 체이닝 패턴으로 사용할 수 있는지 설명이 된거 같다. 
하지만 위에 코드에는 `의도와 다른 결과` 가 출력이 되는데, 잠시 접고 가자.
- callback2 함수가 제일 나중에 출력이 되는 현상. 
  - 의도대로 라면 `10초후 -> callback1 -> 10초후 -> callback2 -> callback3 -> callback4 -> callbak5` 여야 하지만, 위에 코드 결과는 `10초후 -> callback1 -> 10초후 -> callback3 -> callback4 -> callbak5 -> callback2` 로 나옴

### Promise 메소드 와 사용 예시

`Promise` 가 어떻게 돌아가는지 정확히 이해하지 못하더라도, 형태를 외우고 사용하는 데에는 큰 어려움은 없을 것이다.

간단히 실무에서 사용해 볼 만한 예시를 통해서 활용법을 보자.

검색을 해보면 대부분이 `비동기 통신` 에 관한 예제인 것을 확인할 수 있는데, 나 같은 경우에는 화면 동작과 관련해서 알아보고 싶었다.

가령 왼쪽에 있던 사각형이 우측으로 이동한 후, 이동이 끝나면 하단으로 이동하고, 끝나면 제자리로 가는 것을 해보면서, 단계별로 동작하는 Promise 에 대해서 알아보고자 한다.

#### Promise 의 resolve, reject

프로그래밍 할 때, 위와 같이 어떻게 돌아간다는 것을 모두 이해하지 않더라도, Promise를 사용할 때의 형태는 아래의 코드가 전부이기 때문에, 형태만 익숙해 져도 사용할 수 있다.

```javascript
function rect() {
    return new Promise(function(resolve, reject) {
        if(true) {
            resolve();
        } else {
            reject();
        }
    });
}

rect()
    .then(function() {
        console.log('then 1');
    }).then(function() {
        console.log('then 2');
    }).catch(function() {
        console.log('error!');
    });
```

위와 같이 `new Promise` 를 `return` 해주고, 실제 사용할 때에 `then 체이닝` 으로 실행할 구문이 들어가 있다. 
여기서 `catch` 구문이 추가되어 있는데, 이 블럭이 실행되는 조건은 두가지 이다.

- `rect() 함수에서 reject()` 가 실행 되었을 경우
- `then 체인 실행 도중에 에러가 날 경우`

이 조건중에 하나가 걸리면 `catch` 블럭이 실행 된다는 것을 기억하면 된다.

#### 로직구현

**기능**

- 제자리에 있던 사각형이 우측으로 이동
- 이동이 끝나면 하단으로 이동 
- 끝나면 제자리로 이동

```html
<!doctype html>
<html>
<head>
</head>
<body>
<div id="circle" style="position:absolute; top:100px; left:100px; width:100px; height:100px; background:greenyellow; border-radius:50%"></div>
<script>

function moveRight() {
    console.log('우측으로 이동');
}

function moveBottom() {
    console.log('아래로 이동');
}

function moveOriginal() {
    console.log('원래자리로 이동');
}

function init(status) {

    return new Promise(function(resolve, reject) {
        if(status) {
            console.log('초기화가 되었습니다.');
            resolve();
        } else {
            reject();
        }
        
    });

}

init(true)
    .then(moveRight)
    .then(moveBottom)
    .then(moveOriginal)
</script>
</body>
</html>
```

기본설계는 이렇게 될거 같다.

여기서 애니메이션을 넣어보자.

```html
<!doctype html>
<html>
<head>
</head>
<body>
<div id="circle" style="position:absolute; top:100px; left:100px; width:100px; height:100px; background:greenyellow; border-radius:50%"></div>
<script>

var circleObject;

function moveRight() {

    var start = 100,
        end = 200,
        moveTimer;

    moveTimer = setInterval(function() {

        if(start == end) clearInterval(moveTimer);
        circleObject.style.left = start + "px";
        start = start + 10;

    }, 500);
}

function moveBottom() {
    console.log('아래로 이동');
}

function moveOriginal() {
    console.log('원래자리로 이동');
}

function init(status) {

    circleObject = document.getElementById('circle');

    return new Promise(function(resolve, reject) {
        if(status) {
            console.log('초기화가 되었습니다.');
            resolve();
        } else {
            reject();
        }
        
    });

}

init( true )
    .then( moveRight )
    .then( moveBottom )
    .then( moveOriginal )
</script>
</body>
</html>
```

우선 오른쪽으로 가는 애니메이션을 작성하고.. 같은 방식으로 `bottom 함수` 도 구현하자.

```html
<!doctype html>
<html>
<head>
</head>
<body>
<div id="circle" style="position:absolute; top:100px; left:100px; width:100px; height:100px; background:greenyellow; border-radius:50%"></div>
<script>

var circleObject;

function moveRight() {

    var start = 100,
        end = 200,
        moveTimer;

    moveTimer = setInterval(function() {

        if(start == end) clearInterval(moveTimer);
        circleObject.style.left = start + "px";
        start = start + 10;

    }, 500);
}

function moveBottom() {
    var start = 100,
        end = 200,
        moveTimer;

    moveTimer = setInterval(function() {

        if(start == end) clearInterval(moveTimer);
        circleObject.style.top = start + "px";
        start = start + 10;
        
    }, 500);
}

function moveOriginal() {
    console.log('원래자리로 이동');
}

function init(status) {

    circleObject = document.getElementById('circle');

    return new Promise(function(resolve, reject) {
        if(status) {
            console.log('초기화가 되었습니다.');
            resolve();
        } else {
            reject();
        }
        
    });

}

init( true )
    .then( moveRight )
    .then( moveBottom )
    .then( moveOriginal )
</script>
</body>
</html>
```

위와 같이 실행할 경우 `우측으로 이동 + 아래로 이동` 이 한번에 작동하게 되는데, `.then` 에 연결된 함수가 실행되는 것이기 때문에, 자연스러운 현상이다. 하지만 의도한 것은 `우측으로 이동 후 아래로 이동` 이다.

의도한 바 대로 `우측으로 이동이 끝날때까지 그다음 수행하는 .then` 을 잡아두려면 `.then` 에서 실행하는 함수가 `Promise` 객체를 넘겨주면 된다.

```html
<!doctype html>
<html>
<head>
</head>
<body>
<div id="circle" style="position:absolute; top:100px; left:100px; width:100px; height:100px; background:greenyellow; border-radius:50%"></div>
<script>

var circleObject;

function moveRight() {

    return new Promise(function(resolve, reject) {

        var start = 100,
            end = 200,
            moveTimer;

        moveTimer = setInterval(function() {

            if(start == end) {
                clearInterval(moveTimer);
                resolve(); // Promise 종료
            }
            circleObject.style.left = start + "px";
            start = start + 10;

        }, 500);

    });
}

function moveBottom() {
    var start = 100,
        end = 200,
        moveTimer;

    moveTimer = setInterval(function() {

        if(start == end) clearInterval(moveTimer);
        circleObject.style.top = start + "px";
        start = start + 10;
        
    }, 500);
}

function moveOriginal() {
    console.log('원래자리로 이동');
}

function init(status) {

    circleObject = document.getElementById('circle');

    return new Promise(function(resolve, reject) {
        if(status) {
            console.log('초기화가 되었습니다.');
            resolve();
        } else {
            reject();
        }
        
    });

}

init( true )
    .then( moveRight )
    .then( moveBottom )
    .then( moveOriginal )
</script>
</body>
</html>
```

이렇게 소스를 변경하면 의도한 대로 `moveRight 수행 후에 moveBottom` 이 실행된다. 이와 같은 원리로 `moveOriginal` 까지 작성한 코드는 아래와 같다.

```html
<!doctype html>
<html>
<head>
</head>
<body>
<div id="circle" style="position:absolute; top:100px; left:100px; width:100px; height:100px; background:greenyellow; border-radius:50%"></div>
<script>

var circleObject;

function moveRight() {

    return new Promise(function(resolve, reject) {

        var start = 100,
            end = 200,
            moveTimer;

        moveTimer = setInterval(function() {

            if(start == end) {
                clearInterval(moveTimer);
                resolve(); // Promise 종료
            }
            circleObject.style.left = start + "px";
            start = start + 10;

        }, 500);

    });
}

function moveBottom() {

    return new Promise(function(resolve, reject) {

        var start = 100,
            end = 200,
            moveTimer;

        moveTimer = setInterval(function() {

            if(start == end) {
                clearInterval(moveTimer);
                resolve();
            }
            circleObject.style.top = start + "px";
            start = start + 10;

        }, 500);

    });    

}

function moveOriginal() {

    var start = 200,
        end = 100,
        moveTimer;

    moveTimer = setInterval(function() {

        if(start == end) {
            clearInterval(moveTimer);
            console.log("종료");
        }
        circleObject.style.top = start + "px";
        circleObject.style.left = start + "px";
        start = start - 10;

    }, 500);
}

function init(status) {

    circleObject = document.getElementById('circle');

    return new Promise(function(resolve, reject) {
        if(status) {
            console.log('초기화가 되었습니다.');
            resolve();
        } else {
            reject();
        }
        
    });

}

init( true )
    .then( moveRight )
    .then( moveBottom )
    .then( moveOriginal )
</script>
</body>
</html>
```

이제 `우측으로 이동 -> 아래로 이동 -> 처음자리로 이동` 스텝이 단계마다 끝나고 다음단계가 진행되는 방식으로 확인할 수 있다.

이렇게 `Promise`는 `대기상태를 제어해야 할때나, 내가 원하는 정확한 타이밍을 제어하고 싶을때, 혹은 ajax로 어떤 데이터를 받고 나서 그 다음에 어떤것을 수행하고자 할때` 등에 사용 하기에 적합하다.


