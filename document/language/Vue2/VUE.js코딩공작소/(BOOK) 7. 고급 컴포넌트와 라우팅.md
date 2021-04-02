[![9791158390754](http://image.yes24.com/goods/78872554/800x0) Vue.js 코딩공작소](http://www.yes24.com/Product/Goods/78872554)

# (BOOK) 7장 고급 컴포넌트와 라우팅

## 슬롯 사용

컴포넌트 사용 시 해당 컴포넌트 안에 컨텐츠를 넣고 싶을 때가 있다.

예를 들어

```html
<my-component>
  이 내부에 내가 필요로 하는 태그를 사용할 수 없다.
</my-component>
```

위와 같은 컴포넌트 내부에 무엇인가를 추가하고 싶을 때 `slot` 을 사용한다.

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
      ></my-component>
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

여기에 `slot` 을 적용해 보자.

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
        props: ['myInfo'],
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

`middle, final` 슬롯을 추가하고, 컴포넌트 삽입시에 `<slot name="middle">, <slot name="final">` 을 지정했더니 해당 영역에 정확히 표현되고 있다.

여기서 살펴볼 것이 마크업 영역의 `<h1>{{ header }}</h1>` 는 슬롯 이름을 지정하지 않았는데, 지정을 하지 않았을 경우 `<slot></slot>` 에 자동으로 삽입되게 된다.

참고로 `<slot></slot>` 은 `name=default` 가 생략된 슬롯이다. 

개인적으로 명시된 것을 선호하기 때문에 `<slot></slot>` 대신 `<slot name="default"></slot>` 라고 명시해서 코딩하는 편이다.


## 범위 슬롯

