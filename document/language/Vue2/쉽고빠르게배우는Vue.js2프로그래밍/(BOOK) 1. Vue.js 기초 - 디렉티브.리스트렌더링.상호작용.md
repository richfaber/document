[![9791158390754](https://lh3.googleusercontent.com/-Xh-CwPEt9k8/Wh4ziawNEFI/AAAAAAAATFk/aaG1Y6IaoWU1E2uXh-S8IuABLj6k7NoFwCHMYCw/I/9791158390754.png) 쉽고 빠르게 배우는 Vue.js 2 프로그래밍](http://www.yes24.com/24/goods/44271600?scode=032&OzSrank=1)
 
# 1. Vue.js 기초 - 디렉티브.리스트렌더링.상호작용

## 1.1 Vue.js 설치

### 독립 실행 버전

스크립트를 로딩하면 Vue는 전역변수가 된다.

- 개발버전 [http://vuejs.org/js/vue.js](http://vuejs.org/js/vue.js)
- 배포버전 [http://vuejs.org/js/vue.min.js](http://vuejs.org/js/vue.min.js)

### NPM, Bower 설치

```command
# 최신 안정 버전
> npm install vue

# 최신 안정버전 + CSP(Content Security Policy) 준수버전
> npm install vue@csp

# 개발 빌드 버전
> npm install vue.js/vue#dev

# 최신 안정 버전
> bower install vue 
```

## 1.2 시작하기

간단한 예제를 통해 vue를 사용해 보자.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div id="app">
            <h1>{{ message }}</h1>                 
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>
            var data = {
                message: 'Yeah Vue, incredible'
            }
            
            new Vue({
                el: "#app",
                data: data
            });
        </script>
    </body>
</html>
```

보간식 표현으로 템플릿에 모델을 출력해 보았다. 앵귤러는 이거하고 저거하고 빌드하고...-_-
와우! 넘 쉬운것..

## 2.2 양방향 바인딩

Vue 디렉티브인 v-model을 통해 모델값을 변경해 보자.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div id="app">
            <h1>{{ message }}</h1>
            <input v-model="message" />                 
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>
            var data = {
                message: 'Yeah Vue, incredible'
            }

            new Vue({
                el: "#app",
                data: data
            });
        </script>
    </body>
</html>
```

input 값을 변경하면 message가 갱신되는걸 확인할 수 있다. 멋지다! 학습비용이 적다는게 이해가 간다.

jQuery 코드와 비교해 보자.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div id="app">
            <h1>{{ message }}</h1>
            <input id="message" />                 
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" type="text/javascript"></script>
        <script>
            $("#message").on('keyup', function() {
                var message = $("#message").val();
                $('h1').text(message);
            })
        </script>
    </body>
</html>
```

흠.. 말이 필요없이 간단.

# 3장 디렉티브

디렉티브는 라이브러리에서 DOM 요소가 뭔가를 수행하도록 지시하는 특수한 기능이다.

- v-show: 조건에 따라 요소를 표시(css의 display: none, block값을 이용)
- v-if: v-show 와 기능은 같지만, DOM출력을 아예 안함.
- v-else: v-if 평가값이 거짓일때

## 3.1 v-show

코드를 통해 알아보자.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div id="app">
            <textarea v-model="message"></textarea>
            <button v-show="message">
                Send word to allies for help!
            </button>                 
            <pre>
                {{ $data }}
            </pre>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: "#app",
                data: {
                    message: 'Our king is dead!'
                }
            });
        </script>
    </body>
</html>
```

`v-show`의 조건은 `message 변수가 있다면` 으로 해석할 수 있고, message 값이 없다면 button 태그는 보이지 않을 것이다. `textarea`의 값을 다 지우면 버튼이 나오지 않는 것을 확인할 수 있다.

## 3.2 v-if

`v-show` 와 모든 것이 동일하지만 개발자도구로 보면 해당 요소가 아예 없어져 버리는걸 확인할 수 있다.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div id="app">
            <textarea v-model="message"></textarea>
            <button v-if="message">
                Send word to allies for help!
            </button>                 
            <pre>
                {{ $data }}
            </pre>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: "#app",
                data: {
                    message: 'Our king is dead!'
                }
            });
        </script>
    </body>
</html>
```

다양하게 포함된 영역을 토글하기 위해서 `template` 요소를 사용할 수 있다. 물론 `div`로 해도 되는데, 가상DOM을 사용함으로써 브라우저 렌더링 비용을 줄인다.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div id="app">
            <template v-if="!message">
                <h1>You muse send a message for help!</h1>
                <p>Dispatch a messenger immediately!</p>
                <p>To nearby kingdom of Hearts!</p>
            </template>
            <textarea v-model="message"></textarea>
            <button v-if="message">
                Send word to allies for help!
            </button>                 
            <pre>
                {{ $data }}
            </pre>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: "#app",
                data: {
                    message: 'Our king is dead!'
                }
            });
        </script>
    </body>
</html>
```

`message` 값이 없을 경우에 `template` 태그안의 내용이 나오게 된다. 정식 html이 아닌 가상DOM 이라는 것을 기억하자.

## 3.3 v-else

무조건 `v-if` 다음에 나와야 한다. 그러지 않으면 인식되지 않는다.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div id="app">
            <h1 v-if="!message">You muse send a message for help!</h1>
            <h2 v-else>You have a message!</h2>
            <textarea v-model="message"></textarea>
            <butt앱n v-if="message">
                Send word to allies for help!
            </button>                 
            <pre>
                {{ $data }}
            </pre>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: "#app",
                data: {
                    message: 'Our king is dead!'
                }
            });
        </script>
    </body>
</html>
```

혹시나 해서 `v-if` 대신 `v-show`를 해봤지만, 되지 않는다.

## 3.4 v-if vs v-show

`v-show` 는 초기 렌더링 비용이 발생하지만, `v-if` 는 애시당초 없애버리기 때문에 비용이 줄어든다.

하지만 토글기능은 말이 달라진다. `v-show`는 css로 숨긴걸 보여주는 것이지만, `v-if`는 요소를 다시 만들어서 붙이기 때문에 느리다.

(물론 체감속도는 거의 없다고 봐도 무방하지 않을까? 어떤 UI 설계자가 토글을 100개이상 넣는다는 말인가!!)

# 4장 리스트 렌더링

## 4.2 v-for

배열의 항목 순회를 위한 목적으로 사용한다.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            <h1>The multiplication table of 4.</h1>
            <ul class="list-group">
                <li v-for="i in counter" class="list-group-item">
                    {{ i }}
                </li>
            </ul>

            <ul class="list-group">
                    <li v-for="data in info" class="list-group-item">
                        {{ data.name }} : {{ data.age }} 
                    </li>
                </ul>

            </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: ".container",
                data: {
                    counter: [1, 2, 3, 4, 5, 6],
                    info: [
                        {
                            name: 'one',
                            age: 10
                        },
                        {
                            name: 'two',
                            age: 20
                        },
                        {
                            name: 'three',
                            age: 30
                        },
                        {
                            name: 'four',
                            age: 40
                        },
                        {
                            name: 'five',
                            age: 50
                        }
                    ]
                }
            });

        </script>
    </body>
</html>
```

자바스크립트의 `in` 연산자는 아니고, 우측이 `배열 or 객체 or 정수` 가 들어가고, 순회하면서 좌측 변수에 해당값이 연결된다.

우측에 숫자가 사용된다는 것이 신기한데, `idx in 10` 하게되면, 정수의 형태로 idx에 할당된다. 혹시 음수는 어떻게 되나 싶어 해봤더니..

```console
Invalid array length
```

양수 소수점을 넣었더니

```console
Invalid array length
```

양의 정수값만 카운터값으로 인정하나 보다. 
(정해진 순회를 하는 경우가 있을까 싶다.)

배열을 순회하는 동안 종종 `index`의 순번이 필요할 때가 있는데, 특별히 지정되어 있는 `index` 변수를 이용해서 출력이 가능하다.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            <h1>The multiplication table of 4.</h1>

            <ul class="list-group">
                    <li v-for="(data, index) in info" class="list-group-item">
                        {{index}} - {{ data.name }} : {{ data.age }} 
                    </li>
                </ul>

            </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: ".container",
                data: {
                    counter: [1, 2, 3, 4, 5, 6],
                    info: [
                        {
                            name: 'one',
                            age: 10
                        },
                        {
                            name: 'two',
                            age: 20
                        },
                        {
                            name: 'three',
                            age: 30
                        },
                        {
                            name: 'four',
                            age: 40
                        },
                        {
                            name: 'five',
                            age: 50
                        }
                    ]
                }
            });

        </script>
    </body>
</html>
```

`index` 라는 변수명에 할당되는 줄 알았는데, `(data, index) in info` 변수명이 아니라 자리의 위치에 영향을 받는구나 싶다. `(data, aaa) in info` 이런거도 정확히 aaa 값은 인덱스순번을 출력한다.

세번째 자리는 뭔가 싶어서 `(data, aaa, what) in info` 했더니 `what` 은 값이 아무것도 나오지 않았다.
('vue.js'를 그만 괴롭히라고 옆에 있던 남자사람이 얘기했다. 실제로 농락하는 기분이 들기도 하고 ㅋㅋ)

하지만 객체를 순회할 땐 세번째 자리가 의미가 있어졌다.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            <h1>The multiplication table of 4.</h1>

            <ul class="list-group">
                <li v-for="(data, key, index) in forms" class="list-group-item">
                    {{ data }}, {{ key }}, {{ index }}
                </li>
            </ul>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: ".container",
                data: {
                    forms: {
                        id: 'superman',
                        pw: 'ohgod'
                    }
                }
            });

        </script>
    </body>
</html>
```

이렇게 2번째에 `index`를 의미하던 녀석은 중간에 `key` 라는 변수에 밀려나 버렸다. `key`는 오브젝트의 좌변(키값)을 출력해 준다.

이럴거면 걍 두번째 자리를 `index` 로 북박이 해주면 될 것을.. `index` 를 사용하지 않는 경우가 더 많아서라고 판단해서 일까? 쳇 헷갈리게

# 5장 상호작용

## 5.1 이벤트 처리

이벤트는 기본적으로 사용자 상호작용을 통해 렌더링이 변화하는 일에 이르기까지의 모든것 이라 할 수 있다.

이벤트를 발생시키는 것을 준비시키기 위해 `v-on` 리스너를 사용한다.

### 5.1.1 인라인 이벤트 핸들링

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            <h1>Upvote</h1>

            <button v-on:click="upvotes++">
                Upvote! {{ upvotes }}
            </button>

        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: ".container",
                data: {
                    upvotes: 0
                }
            });

        </script>
    </body>
</html>
```

위와 같이 `v-on:click` 으로 리스너를 설정하고, 우측에 실행할 구문을 넣으면 작동한다. 이 시점에 `this` 를 찍어보면, 

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            <h1>Upvote</h1>

            <button v-on:click="alert(this); upvotes++">
                Upvote! {{ upvotes }}
            </button>

        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: ".container",
                data: {
                    upvotes: 0
                }
            });

        </script>
    </body>
</html>
```

신기하게도 `Window` 객체가 나온다. `vue.js` 에는 scope의 개념이 없기 때문인걸까? 신기방기

### 5.1.2 메서드를 이용한 이벤트 처리

사전정의 함수를 연결해 보자.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            <h1>Upvote</h1>

            <button v-on:click="upvote">
                Upvote! {{ upvotes }}
            </button>

        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: ".container",
                
                data: {
                    upvotes: 0
                },

                methods: {
                    upvote: function() {
                    
                        console.log(this);
                        this.upvotes++;
                        
                    }
                }
            });

        </script>
    </body>
</html>
```

사전함수를 정의할 때는 `methods` 속성을 이용해서 연결해야 한다. 실행되는 함수 내에서의 `this` 는 현재 영역의 `Vue 객체` 가 된다.

### 5.1.3 v-on의 축약형

`v-on` 대신 `@`를 사용할 수 있다.

```html
<button v-on:click="upvote">
    Upvote! {{ upvotes }}
</button>

이렇게 축약해서 쓸 수 있다.

<button @click="upvote">
    Upvote! {{ upvotes }}
</button>
```

간결하구나... 좋다.

## 5.2 이벤트 한정자

간단한 계산기 예제를 보면서 한정자에 대해 알아보자.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            
            <h1>계산기</h1>

            <form class="form-inline">
                <input v-model.number="a" class="form-control" />
                <select v-model="operator" class="form-control">
                    <option>+</option>
                    <option>-</option>
                    <option>*</option>
                    <option>/</option>
                </select>

                <input v-model.number="b" class="form-control" />
                <button type="submit" @click="calculate" class="btn btn-primary">
                    Calculate
                </button>
            </form>
            
            <h2>Result: {{ a }} {{ operator }} {{ b }} = {{ c }}</h2>
            <pre>
                {{ $data }}
            </pre>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: ".container",
                
                data: {
                    a: 1,
                    b: 2,
                    c: null,
                    operator: "+"
                },

                methods: {
                    calculate: function() {
                        switch (this.operator) {
                            case "+":
                                this.c = this.a + this.b;
                                break;
                            case "-":
                                this.c = this.a - this.b;
                                break;
                            case "*":
                                this.c = this.a * this.b;
                                break;
                            case "/":
                                this.c = this.a / this.b;
                                break;
                        }
                    }
                }
                
            });

        </script>
    </body>
</html>
```

위 예제에서 `Calculate` 버튼을 누르면 `submit 타입` 이기 때문에 페이지가 전환되 버린다. 
보통 이런 태그의 기본기능을 제한 하기 위해서 `event.preventDefault()` 메소드를 사용하게 되는데, `Vue` 프레임워크는 축약 방식을 지원해 준다.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            
            <h1>계산기</h1>

            <form class="form-inline">
                <input v-model.number="a" class="form-control" />
                <select v-model="operator" class="form-control">
                    <option>+</option>
                    <option>-</option>
                    <option>*</option>
                    <option>/</option>
                </select>

                <input v-model.number="b" class="form-control" />
                <button type="submit" @click.prevent="calculate" class="btn btn-primary">
                    Calculate
                </button>
            </form>
            
            <h2>Result: {{ a }} {{ operator }} {{ b }} = {{ c }}</h2>
            <pre>
                {{ $data }}
            </pre>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: ".container",
                
                data: {
                    a: 1,
                    b: 2,
                    c: null,
                    operator: "+"
                },

                methods: {
                    calculate: function() {
                        switch (this.operator) {
                            case "+":
                                this.c = this.a + this.b;
                                break;
                            case "-":
                                this.c = this.a - this.b;
                                break;
                            case "*":
                                this.c = this.a * this.b;
                                break;
                            case "/":
                                this.c = this.a / this.b;
                                break;
                        }
                    }
                }

            });

        </script>
    </body>
</html>
```

`@click.prevent` 을 통해서 이 작업이 자동으로 이루어 진다.

이벤트에 대해 몇가지 기능을 제공하고, 체인형태로 조합도 가능하다. 예를 들어 `@click.prevent.stop` 하면 태그의 고유기능도 막을뿐더러, 이벤트 전파도 막아준다.

> - .stop : 이벤트 전파방지 (event.stopPropagation)
> - .prevent : 기본기능 방지 (event.preventDefault)
> - .capture : 이벤트 전파방식을 **capture** 방식으로 호출한다.
> - .self : 현재 요소에 대해서만 클릭이 발생한다. 자식요소까지 이벤트 캡춰가 되지 않는다. 이벤트버블링은 발생한다.
> - .once : 한번만 수행하고, 이벤트가 제거된다.

`.self` 가 좀 애매한데, 자식까지 이벤트캡춰를 하지 않기 때문에, [이벤트 전파방식이 **capture** 방식](http://frontend.diffthink.kr/2016/08/blog-post_16.html) 일때 유용해 보인다.

## 5.3 키 한정자

이벤트를 다루다 보면 키보드의 입력값을 감지해야 할 떄가 있다. 일반적으로 엔터키의 키코드는 13이기 때문에 `Vue`를 통해 이벤트를 연결할 수 있다.

```html
<input v-model="a" @keyup.13="calculate" />
```

이렇게 코드값을 대응시킬 수도 있고, 외우기 어렵기 때문에 일반적인 것들은 별칭을 제공해 준다.

`enter, tab, delete, esc, space, up, down, left, right`

```html
<input v-model="a" @keyup.enter="calculate" />
```

## 5.4 계산된 프로퍼티

변수의 값을 계산 후 사용할 수 있는 방법을 `computed` 를 통해 제공해 준다.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            
            a = {{ a }}, b = {{ b }}
            <pre>
                {{ $data }}
            </pre>

        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: ".container",
                
                data: {
                    a: 1
                },

                computed: {
                    b: function() {
                        return this.a + 1;
                    }
                }

            });

        </script>
    </body>
</html>
```

b의 값은 계산된 후 `Vue`의 변수로 등록되기 때문에, b의 값을 얻었지만, 내부변수를 참조해서 볼 수 있는 `$data` 에는 b 의 값이 나오지 않는다. (뒤에 계산되기 때문일까?)

주의해야 할 것은 자바스크립트의 유연한 타입으로 인해 의도치 않은 결과를 얻을 수도 있다는 점이다.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            
            a = {{ a }}, b = {{ b }}
            <input v-model="a" />
            <pre>
                {{ $data }}
            </pre>
        
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: ".container",
                
                data: {
                    a: 1
                },

                computed: {
                    b: function() {
                        return this.a + 1;
                    }
                }

            });

        </script>
    </body>
</html>
```

`<input v-model="a" />` 을 추가하였는데, `input`의 값을 2로 주면 원하는 값은 3일텐데, 21이 나온다. `String + Number` 는 `String + String` 이 되는 자바스크립트의 특성 때문이다.

이것을 보완하기 위해 계산식을 `return parseInt(this.a) + 1` 혹은 ***parseFloat*** 를 사용해서 보완할 수도 있지만, 이럴때 `Vue` 프레임워크의 타입을 지정해 주는 방식으로도 보완할 수 있다.

```html
<input v-model.number="a" />
```

이렇게 `number` 를 설정해 주면, 원하던 b의 값을 얻을 수 있게 된다.

`number`를 지정했다고 해서 `input` 요소의 `type` 이 `number` 가 되는 것은 아니라는 것을 기억하자. 대체적으로 `Vue`는 요소자체에 뭔가를 하지는 않는거 같다. 타입이 text라는 것을 아래 코드로 확인해보자

```javascript
console.log( document.querySelector('input').type )
```

이런 타입을 지정하는 것은 습관적으로 해두는게 필요할 거 같다. 개인적으론 `<input type="number" />` 이 방식이 훨~씬 좋아 보이지만?




