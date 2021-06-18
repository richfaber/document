[![9791158390754](http://image.yes24.com/goods/78872554/800x0) Vue.js 코딩공작소](http://www.yes24.com/Product/Goods/78872554)

# (BOOK) 9장. Vue 확장 (mixin, directive)


## 믹스인과 함께 기능 재사용

믹스인은 내가 작성하고 있는 컴포넌트에 기능을 섞어내는 것이다.

공통적으로 사용하는 부분을 따로 관리할 목적으로 사용할 수 있다.


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
      믹스인
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>

    <script type="text/javascript">
    
      const myMixin = {

        data() {

          return {
            myname: '백정'
          }
          
        },


        created() {
          console.log('mixin created');
        },

        methods: {

          rainbow() {
            console.log( this.myname );
          }
        
        },

        mounted() {         
          console.log('mixin mounted');
          this.rainbow();
        }

      }


      new Vue({
        el: '#app',
        mixins: [myMixin],
        data() {
          return {

          }
        },

        mounted() {
          console.log( '앱이 구동되었다.' );
        }
        
      });

    </script>
  
  </body>
</html>
```


위와 같이 현재 컴포넌트에 기능을 섞는(mix) 것이다. 일종의 병합과정이 일어난다.

`myMixin <- 현재컴포넌트`

이렇기 때문에, 만약 `myMixin` 에 있는 내용을 현재컴포넌트가 동일한 이름으로 선언하면 mixin의 내용은 사라진다. 
위에 `rainbow` 함수만 같은 이름으로 재지정해 보자.


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
      믹스인
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>

    <script type="text/javascript">
    
      const myMixin = {

        data() {

          return {
            myname: '백정'
          }
          
        },


        created() {
          console.log('mixin created');
        },

        methods: {

          rainbow() {
            console.log( this.myname );
          }
        
        },

        mounted() {        
          console.log('mixin mounted');
          this.rainbow();
        }

      }


      new Vue({
        el: '#app',
        mixins: [myMixin],
        data() {
          return {

          }
        },

        mounted() {
          console.log( '앱이 구동되었다.' );
        },

        methods: {
          rainbow() {
            console.log( "함수가 새로 선언되었다. => ", this.myname );
          }
        }

      })
    </script>
  
  </body>
</html>
```

동일하게 사용할 `filter, computed` 등을 공용으로 관리하고 싶다면 활용하기 좋다.

```javascript
computed: {
    $currentUser () {
      return this.$store.state.user.currentUser
    },

    $FORMAT_DATETIME () {
      return {
        DATE: datetime.FORMAT_DATE,
        TIME: datetime.FORMAT_TIME,
        DATETIME: datetime.FORMAT_DATETIME
      }
    }
},

filters: {
    inactivatedAt( val ) {
      return ( val ) ? '휴먼' : '정상';
    },

    pluralize: (n, w) => n === 1 ? w : w + 's',
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
}
```


## 전역 Mixin

전역으로 적용할 수도 있는데, 말그대로 모든 컴포넌트 에게 영향을 미치기 때문에, 주의 해야만 한다.

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
      믹스인
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>

    <script type="text/javascript">
    
      Vue.mixin({
        
        created: function () {

          var myOption = this.$options.myOption
          if (myOption) {
            console.log(myOption)
          }
        }

      });

      new Vue({
        el: '#app',
        myOption: 'hello!',
        mounted() {
          console.log('구동되었다.');
        }

      });

    </script>
  
  </body>
</html>
```


## 예제와 함께 사용자지정 지시자 배우기

사용자가 요소에 특정속성을 만들고 싶을 때, 사용한다. 사용법은 `directives` 를 이용한다.

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
      <p v-highlight="'red'">디렉티브</p>
      <p v-highlight:background="'blue'">디렉티브</p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>

    <script type="text/javascript">
    
      new Vue({
        el: '#app',
        directives: {
          'highlight': {

            bind(el, binding, vnode, oldNode) {

              if (binding.arg == 'background') {

                el.style.backgroundColor = binding.value;

              } else {

                el.style.color = binding.value;

              }

            }

          }
        },
        mounted() {
          console.log( '구동되었다.' );
        }

      })
    </script>
  
  </body>
</html>
```

위에 코드는 `v-highlight` 라는 사용자 지정속성(directive) 를 선언했다. 

`bind` 함수를 통해서 동작함수를 구현할 수 있는데, 파마리터로 4가지를 제공한다.

- el: 바인딩 되어지는 요소
- binding: `name, value, oldValue, expression` 등을 포함한 객체. 위에 예제에서는 `:` 에 지정된것이 기록되어 있는 `arg` 에 접근했다.
- vnode: Vue 컴파일러가 생성한 가상노드
- oldVnode: 이전 가상 노드

`bind`는 동작에 관한 구현이고, 이 외에 몇가지를 더 구현할 수 있다. 
(이것을 `훅(hook)` 이라고 하고, `bind`도 `훅(hook)` 중 하나이다.)

- bind: 요소에 지시자가 바인딩 될 때 한번 호출된다.
- inserted: 바인딩된 요소가 삽입될 때 호출된다.
- update: 컴포넌트를 포함하는 VNode 가 업데이트된 후 호출된다.
- componentUpdate: 컴포넌트를 포함하는 VNode 와 Vnode 의 자식이 업데이트된 후 호출한다.
- unbind: 요소에서 바인딩이 해제될 때 호출한다.

뭔소린지 모르겠는데, `bind` 만 주로 쓰게 될 것 같다.

전역지시자로 설정하는 것 또한 `mixin` 과 동일한 방법이다.

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
      <p v-highlight="'green'">디렉티브</p>
      <p v-highlight:background="'gold'">디렉티브</p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>

    <script type="text/javascript">
    
      Vue.directive('highlight', {

        bind(el, binding, vnode, oldNode) {

          if (binding.arg == 'background') {

            el.style.backgroundColor = binding.value;

          } else {

            el.style.color = binding.value;

          }

        }

      });

      new Vue({
        el: '#app',
        myOption: 'hello!',
        mounted() {
          console.log( '구동되었다.' );
        }

      });
    
    </script>
  
  </body>
</html>
```
