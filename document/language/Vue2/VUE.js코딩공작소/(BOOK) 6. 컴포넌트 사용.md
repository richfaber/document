[![9791158390754](http://image.yes24.com/goods/78872554/800x0) Vue.js 코딩공작소](http://www.yes24.com/Product/Goods/78872554)

# (BOOK) 6장 컴포넌트 사용

컴포넌트는 프레임워크에 가장 꽃이라 할 수 있다.

어떤 언어로 개발을 하던지 간에, 추상화를 잘했냐 못했냐에 따라서, 문제를 발견하고 해결하고, 기능을 확장하는 구간에서 문제가 되냐 안되냐가 생긴다.

컴포넌트는 재사용이 목적이긴 하지만, 추상화 전략이 잘 되어 있어야 재사용과 확장이 용이하다.

SPA 에서 제일 중요한 부분으로 생각한다.

## 컴포넌트란?

하나의 앱을 개발할 때는 여러 컴포넌트가 만들어 진다. 반복코드를 줄이고, 작은 기능 단위로 분리하여 관리와 확장을 위한 목적이다.

컴포넌트는 단일 요소를 이용하여 접근할 수 있는 요소의 집합체로 정의를 해야 한다.

외부에서 요청하는 옵션,데이터 등이 있을 수 있는데, 컴포넌트에 전달되는 것들이 컴포넌트 내부의 기능과 밀접한 관계를 가지는 것은 종속성이 있다고 봐야 한다.

(예를 들어서, 어쩔 수 없이 컴포넌트간 이벤트를 공유하는 경우를 제외하고, 컴포넌트의 이벤트가 발생하고, 처리하는 부분이 항상 처리 되어야 한다면, 그 함수는 컴포넌트에 내장 되어야 한다.)

### 컴포넌트 생성

전역 컴포넌트와 지역 컴포넌트로 구분해서 사용할 수가 있는데, 전역 컴포넌트는 Vue 인스턴스 전체에서 언제든 사용할 수 있고, 지역 컴포넌트는 특정한 컴포넌트가 다른 컴포넌트를 `import` 하여, 필요할 때만 사용하는 용도로 보면 된다.

### 전역 등록

이제 암기 과목이다. 아래 예제를 보자

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <my-component></my-component>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>
    <script type="text/javascript">

      Vue.component('my-component', {
        template: '<div>안녕, 전역컴포넌트 라고해'
      });
      
      var app = new Vue({
        el: "#app",
      });
    </script>
  </body>
</html>
```

Vue 에 직접 등록함으로써, 어디서든 사용할 수 있다. 
(만약 컴포넌트 이름이 중복되면, 마지막 등록된 것으로 결정된다. 별도의 에러표기가 되지 않기 때문에 주의하자.)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <my-component></my-component>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>
    <script type="text/javascript">

      Vue.component('my-component', {
        template: '<div>안녕, 전역컴포넌트 라고해'
      });
      
      Vue.component('my-component', {
        template: '<div>안녕2, 전역컴포넌트 라고해'
      });
      
      var app = new Vue({
        el: "#app",
      });
    </script>
  </body>
</html>
```

### 지역 등록

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <my-component></my-component>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>
    <script type="text/javascript">

      const Component = {
        template: '<div>안녕, 지역 컴포넌트로부터</div>'
      }
      
      var app = new Vue({
        el: "#app",
        components: {
          'my-component': Component
        }
      });
    </script>
  </body>
</html>
```

이렇게 `Vue` 최상위 객체에 직접 등록하지 않고, 내부옵션 으로 등록하면, 지역컴포넌트 등록 끝이다.

`my-component` 와 같이 `-` 로 이름짓는걸 `케밥케이스 작명법` 이라고 하는데, vue가 권고하는 가이드라인 이다.

이유는 html 이 대소문자 구분을 하지 않기 때문이다.

작명식에 대한 가이드라인은 ['Vue namespace'](https://vuejs.org/v2/style-guide/) 에서 확인하자

## 컴포넌트의 관계

컴포넌트는 각자의 영역이 설정되어 있어서, 부모 데이터에 직접 접근할 수 없다는 것을 기억하자.

Vue 에서 전달된 데이터를 `props (properties)` 라고 한다. 예제에서 보겠지만, 해당컴포넌트 안에는 `props: ['comment']` 의 배열형태로 지정을 해둔다. 

그리고 다시한번 강조하지만, 부모가 자식에게 전달을 일방적으로 하는 `단방향` 이다.

## 속성을 사용해서 데이터 전달

가장 기본적 형태의 전달 예제이다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <my-component text="World"></my-component>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>
    <script type="text/javascript">

      const Component = {
        template: '<div>안녕, {{ text }}</div>',
        props: ['text']
      }
      
      var app = new Vue({
        el: "#app",
        components: {
          'my-component': Component
        }
      });
    </script>
  </body>
</html>
```

속성을 컴포넌트로 전달하는 가장 일반적인 방법이다. 속성안의 값은 변수가 아닌 상수이다. 즉 정해진 값이고, 참조의 값이 아니라는 점을 기억하자.

만약 변수를 넘기고 싶을 때는 `v-bind` 를 이용하면 된다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <my-component :text="sendMessage"></my-component>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>
    <script type="text/javascript">

      const Component = {
        template: '<div>안녕, {{ text }}</div>',
        props: ['text']
      }
      
      var app = new Vue({
        el: "#app",
        data: function() {

          return {
            sendMessage: 'World wow'
          }
          
        },
        components: {
          'my-component': Component
        }
      });
    </script>
  </body>
</html>
```

부모 `data` 의 변수가 전달된 예제이다. 변수와 상수는 전달하는 방법이 다르다는 것을 구분하자.

다른예제를 볼건데, 컴포넌트 내부에 카운트를 1씩 증가시키는 버튼이 있다고 치자.

그런데 현재 페이지에 동일 컴포넌트를 3개를 쓰는 설정이다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <my-component text="sendMessage1"></my-component>
      <my-component text="sendMessage2"></my-component>
      <my-component text="sendMessage3"></my-component>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>
    <script type="text/javascript">
      const Component = {
        template: '<div>안녕, {{ text }} <button v-on:click="counter += 1">{{ counter }}</button></div>',
        props: ['text'],
        data: function() {
          return {
            counter: 1
          }
        }
      }
      
      var app = new Vue({
        el: "#app",
        data: function() {

          return {
            sendMessage: 'World wow'
          }
          
        },
        components: {
          'my-component': Component
        }
      });
    </script>
  </body>
</html>
```

해당 예제의 `counter` 변수가 컴포넌트별로 따로 동작하고 있다는 것을 확인할 수 있다. 

만약 컴포넌트 내부의 `data` 에 참조방식 으로 전달하면 모든 컴포넌트가 그 값을 공유한다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <my-component text="sendMessage1"></my-component>
      <my-component text="sendMessage2"></my-component>
      <my-component text="sendMessage3"></my-component>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>
    <script type="text/javascript">
      const counter = { counter: 1 };
      const Component = {
        template: '<div>안녕, {{ text }} <button v-on:click="counter += 1">{{ counter }}</button></div>',
        props: ['text'],
        data: function() {
          return counter
        }
      }
      
      var app = new Vue({
        el: "#app",
        data: function() {

          return {
            sendMessage: 'World wow'
          }
          
        },
        components: {
          'my-component': Component
        }
      });
    </script>
  </body>
</html>
```

외부에 지정된 값으로 참조가 전달되었기 때문에, Js 작동방식 으로는 당연한 결과이지만, 유효범위를 살펴 볼 수 있는 예제로 만 참고 하자.

### 속성검증

`props` 로 설정되는 변수들에 대해서, 타입을 지정해 줄 수 있다.

- 문자열: string
- 숫자: number
- 불: boolean
- 함수: function
- 객체: object
- 배열: array
- 기호: symbol
 -->

간단한 예제를 보면

```html
props: {
  num: {
    type: Number,
    required: true
  }
}
```

`num` 이라는 변수는 `Number 타입` 이여야 하고, `필수값` 처리되어야 함을 명시적으로 선언했다.

이러한 형태도 있다 라고만 알아두고, 필요한 예제와 같이 다시 보자.


## 템플릿 컴포넌트 정의

컴포넌트 정의하는 몇가지 방법을 제시하고 있다. 필요에 따라 선택하면 된다.

### 인라인 템플릿 문자열 사용

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <my-component :my-info="message" inline-template>
        <div>
          <p>inline-template - {{ myInfo }}</p>
        </div>
      </my-component>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>
    <script type="text/javascript">
      const MyComponent = {
        props: ['myInfo']
      };

      new Vue({
        el: '#app',
        components: {
          'my-component': MyComponent
        },

        data() {
          return {
            message: '안녕'
          }
        }
      })
    </script>
  </body>
</html>
```

컴포넌트를 마크업 영역에 집어넣고, `inline-template` 라는 선언을 주었다.

### text/x-template 스크립트 요소

템플릿 정의에 또다른 방법으로는 `script` 태그의 `text/x-template` 를 활용한 방법이다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <my-component />
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>
    <script type="text/x-template" :my-info="message" id="my-component">
      <p>안녕, x-template로부터, {{ myInfo }} 잘가</p>
    </script>
    <script type="text/javascript">
    
      const MyComponent = {
        props: ['myInfo'],
        template: '#my-component'
      };

      new Vue({
        el: '#app',
        components: {
          'my-component': MyComponent
        },

        data() {
          return {
            message: '안녕'
          }
        }
      })
    </script>
  </body>
</html>
```

위와같이 사용하면 되는데, 컴포넌트에 변수 바인딩이 안된다. 이유는 찾다 말았다.

Vue 가이드에는 위와같은 방법이 있으나 쓰지마. 이렇게 되어있다... -_-;; 

쓰지말랄거면 지원하지마 =_=;;


### 단일 파일 컴포넌트

`template, script, style` 이 포함된 `.vue` 파일을 생성하는 방법이다.

```html
// 파일명: single-file-component.vue
<template>
    <div class="hello">
        {{ msg }}
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {
                msg: 'Vue.js 앱에 오신걸 환영합니다.'
            }
        }
    }
</script>

<style>
    body { background: red; }
</style>
```

이런형태로 소스를 작성하는 것인데, 추천방식 이다.

다만 이것은 `프론트엔드 빌드 도구` 에 대한 사전지식을 요구한다. `webpack, gulp, grunt` 등이 있고, Vue는 `webpack` 을 사용한다는 가정하에 문서들이 만들어져 있다.

이 부분이 넘사벽인데, 모두 이해하려고 하면 인내심이 필요하고, `vue-cli` 를 설치하면, 해당빌드 연관된 파일들을 자동생성 해주기 때문에, 이 부분만 편집해서 사용하도록 하자.

