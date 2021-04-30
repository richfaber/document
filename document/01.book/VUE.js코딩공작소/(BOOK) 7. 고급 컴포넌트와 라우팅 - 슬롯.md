[![9791158390754](http://image.yes24.com/goods/78872554/800x0) Vue.js 코딩공작소](http://www.yes24.com/Product/Goods/78872554)

# (BOOK) 7장 고급 컴포넌트와 라우팅 - 슬롯, 동적컴포넌트 생성

## 슬롯 사용

컴포넌트 사용 시 해당 컴포넌트 안의 템플릿 내용을 외부에서 조작하고 싶을 때가 있다.

예를 들어

```html
<my-component>
  이 내부에는 내가 원하는 태그를 사용할 수 없고, 해당 컴포넌트에 등록된 template 로 치환된다.
</my-component>
```

위와 같이 컴포넌트 내부에 템플릿을 변경하고 싶을 때 `slot` 을 사용한다.

아래 예제는 간단한 `my-component` 예제이다.

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
      <my-component 
        :author="authorLabel"
        :title="titleLabel"
      >안에 있는 내용은 컴포넌트에 선언된 템플릿으로 대체되므로, 의미가 없다.</my-component>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>
    <script type="text/javascript">
    
      const MyComponent = {
        props: ['myInfo'],
        template: `
          <div>
            <form>
              <label for="title">{{ title }}</label><input id="title" type="text" /><br />
              <label for="author">{{ author }}</label><input id="author" type="text" /><br />
              <button>제출하기</button>
            </form>
          </div>
        `,
        props: ['title', 'author']
      };

      new Vue({
        el: '#app',
        components: {
          'my-component': MyComponent
        },

        data() {

          return {
            titleLabel: '제목:',
            authorLabel: '저자:'
          }

        }
        
      })
    </script>
  </body>
</html>
```

위와같이 컴포넌트에 선언된 템플릿을 조작할 수 없지만, `slot` 을 사용하면 가능해 진다.

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
      <my-component 
        :author="authorLabel"
        :title="titleLabel"
      >
      <h1>{{ header }}</h1>
    </my-component>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>
    <script type="text/javascript">
    
      const MyComponent = {
        props: ['myInfo'],
        template: `
          <div>
            <form>
              <slot></slot>
              <label for="title">{{ title }}</label><input id="title" type="text" /><br />
              <label for="author">{{ author }}</label><input id="author" type="text" /><br />
              <button>제출하기</button>
            </form>
          </div>
        `,
        props: ['title', 'author']
      };

      new Vue({
        el: '#app',
        components: {
          'my-component': MyComponent
        },

        data() {
          return {
            titleLabel: '제목:',
            authorLabel: '저자:',
            header: '안녕? 슬롯제목 이라고 해'
          }
        }
      })
    </script>
  </body>
</html>
```

위와 같이 `template` 에 `<slot></slot>` 을 추가하고, 컴포넌트 삽입시에 태그안에 내용으로 `<h1>{{ header }}</h1>` 을 넣었더니, 해당 내용이 `template` 의 `<slot></slot>` 부분에 대체되어 표현되었다.


## 지정 슬롯 살펴보기

이제 여러 슬롯영역을 지정해 보자.

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
      <my-component 
        :author="authorLabel"
        :title="titleLabel"
      >
      <h1>{{ header }}</h1>
      <span slot="middle">중앙에 슬롯을 추가해 본다.</span>
      <span slot="final">마지막에 슬롯을 추가해 본다.</span>
    </my-component>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>
    <script type="text/x-template" :my-info="message" id="my-component">
      <p>안녕, x-template로부터, {{ myInfo }} 잘가</p>
    </script>
    <script type="text/javascript">
    
      const MyComponent = {
        props: ['title', 'author'],
        template: `
          <div>
            <form>
              <slot></slot>
              <label for="title">{{ title }}</label><input id="title" type="text" /><br />
              <label for="author">{{ author }}</label><input id="author" type="text" /><br />
              <br />
              <slot name="middle"></slot><br />
              <button>제출하기</button><br />
              <slot name="final"></slot>
            </form>
          </div>
        `
      };

      new Vue({
        el: '#app',
        components: {
          'my-component': MyComponent
        },

        data() {
          return {
            titleLabel: '제목:',
            authorLabel: '저자:',
            header: '안녕? 슬롯제목 이라고 해'
          }
        }
      })
    </script>
  </body>
</html>
```

`middle, final` 슬롯을 추가하고, 컴포넌트 삽입시에 `<slot name="middle">, <slot name="final">` 을 지정했더니 해당 영역에 정확히 표현되고 있다.

여기서 살펴볼 것이 마크업 영역의 `<h1>{{ header }}</h1>` 는 슬롯 이름을 지정하지 않았는데, 지정을 하지 않았을 경우 `<slot></slot>` 에 자동으로 삽입되게 된다.

참고로 `<slot></slot>` 은 `name=default` 가 생략된 슬롯이다. 

개인적으로 명시된 것을 선호하기 때문에 `<slot></slot>` 대신 `<slot name="default"></slot>` 라고 명시해서 코딩하는 편이다.


## 범위 슬롯

지금까지는 `slot` 을 이용해서 태그를 치환했다면, `slot` 에 데이터연동 부분을 보자.

부모컴포넌트의 데이터를 활용하는 방법은 쉽다.

```javascript
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

      <book-component>

        <template slot="haha">
            <h3>{{ header }}</h3>
            <div v-for="book in books">{{ book.title }}</div>
        </template>

      </book-component>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>

    <script type="text/javascript">
    
      const bookComponent = {
        
        template: `
          <div title="컴포넌트의 루트 요소(element)는 반드시 1개여야 한다.">
            <slot name="haha"></slot>
            <p>bookComponent 내부데이터: {{ childData }}</p>
          </div>
        `,
        data() {

          return {
            childData: '안녕?'
          }

        }
          
      };

      new Vue({
        el: '#app',
        components: {
          'book-component': bookComponent
        },

        data() {

          return {

            header: '책 목록 - 컴포넌트 안의 태그의 유효범위는 컴포넌트속이 아니라, 부모이다.',

            books: [
              { author: 'John Smith', title: 'Best of Times'},
              { author: 'John Doe', title: 'Go West Young Man'},
              { author: 'Avery Katz', title: 'The Life And Times Of Avery'}
            ]

          }

        }
      })
    </script>
  </body>
</html>
```

위와 같이 `<h3>{{ header }}</h3>, book in books` 처럼 부모데이터 있는 그대로 사용하면 된다.

그대로 사용하면 되기 때문에, 특별히 `부모 데이터 -> 자식 데이터` 흘려보낼 필요성이 없어 보인다.

반대로 `자식 데이터 -> 부모 데이터` 를 해보자.


> 자식컴포넌트의 데이터를 부모에서 활용하는 것이다!
> (반복) 자식컴포넌트의 데이터를 부모에서 활용하는 것이다!
> (또) 자식컴포넌트의 데이터를 부모에서 활용하는 것이다!


```javascript
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

      <book-component>

        <template slot="haha" slot-scope="scopeProps">
            <h3>{{ header }}</h3>
            <div v-for="book in books">{{ book.title }}</div>
            <p>자식데이터 : {{ scopeProps.sendParam }}</p>
            <p>자식데이터 : {{ scopeProps.sendParam2 }}</p>
        </template>

      </book-component>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>

    <script type="text/javascript">
    
      const bookComponent = {

        template: `
          <div title="컴포넌트의 루트 요소(element)는 반드시 1개여야 한다.">

            <slot name="haha" :sendParam="IamGroot" :sendParam2="childData"></slot>
            <p>bookComponent 내부데이터: {{ childData }}</p>
            
          </div>
        `,
        data() {

          return {
            childData: '안녕?',
            IamGroot: {
              type: '나무',
              hair: '양배추'
            }
          }

        }
          
      };

      new Vue({
        el: '#app',
        components: {
          'book-component': bookComponent
        },

        data() {

          return {

            header: '책 목록 - 컴포넌트 안의 태그의 유효범위는 컴포넌트속이 아니라, 부모이다.',

            books: [
              { author: 'John Smith', title: 'Best of Times'},
              { author: 'John Doe', title: 'Go West Young Man'},
              { author: 'Avery Katz', title: 'The Life And Times Of Avery'}
            ]

          }

        }
      })
    </script>
  </body>
</html>
```

여기서 `slot-scope` 가 나온다.

`자식의 slot` 에서 `:property="내부데이터"` 를 줄줄이 선언하고, 부모 에서는 `slot-scope="임의의변수명"` 을 지정하여 `자식의 slot 의 연결된 모든 property` 들을 참조하는 형태 이다.



## 동적 컴포넌트 생성

VUE 에서 제공하는 `component` 요소와 `is` 속성을 사용해서 컴포넌트를 동적으로 변경하는 것이 가능하다.

```javascript
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
      <main>
        <button @click="cycle">순회하기</button>
        <h1>
          <component :is="currentView"></component>
        </h1>
      </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>

    </style>
    <script type="text/javascript">

      const BookComponent = {
        template: `<div>책 컴포넌트</div>`
      }

      const FormComponent = {
        template: `<div>폼 컴포넌트</div>`
      }
      
      const HeaderComponent = {
        template: `<div>헤더 컴포넌트</div>`
      }

      var app = new Vue({
        
        el: "#app",
        
        components: {
          'book-component': BookComponent,
          'foorm-component': FormComponent,
          'header-component': HeaderComponent
        },

        data: {
          currentView: BookComponent
        },

        methods: {

          cycle() {

            if(this.currentView === HeaderComponent) {

              this.currentView = BookComponent;

            } else {

              this.currentView = this.currentView === BookComponent ? FormComponent : HeaderComponent;

            }

          }

        }

      });
    </script>
  </body>
</html>
```

3개의 컴포넌트를 등록과 `currentView` 라는 변수를 하나 선언했다.

`currentView` 는 `component :is="currentView"` 와 매핑되어 있다.

즉 `component` 의 `:is` 를 통해서, 해당 컴포넌트 자체를 교체 하는 것이 가능하다.

![image](data:image/gif;base64,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)

탭메뉴 같은 경우, 페이지전환을 하지 않고, 화면에 보여줄 목적이 있다면, 활용가능 할것으로 보인다.

다만 탭메뉴와 같은 곳에 구현 시 이전의 상태를 VUE가 알고 있지 못하기 때문에, `back` 버튼이라던지, `$route` 등을 이용해서 이전으로 돌리는 것은 불가능 하다.

