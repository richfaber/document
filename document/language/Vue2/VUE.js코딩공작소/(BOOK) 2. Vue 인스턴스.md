[![9791158390754](http://image.yes24.com/goods/78872554/800x0) Vue.js 코딩공작소](http://www.yes24.com/Product/Goods/78872554)

# (BOOK) 2장 Vue 인스턴스

VUE 애플리케이션 자체가 Vue 인스턴스고, Vue 구성요소도 Vue 인스턴스고, 맞춤 속성값들로 구성된 이슨턴스를 직접 생성하여 Vue를 확장할 수도 있다.

Vue 인스턴스와 Vue 생명주기에 대해서 알아본다.

## 첫 애플리케이션

시작하기 전에 [`vue-devtools`](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=ko) 플러그인을 설치하자.

### Vue 인스턴스 루트

모든 Vue 애플리케이션 중심에는 `루트 Vue 인스턴스` 가 있다.

`new Vue({ /* 옵션 */ })` 로 생성할 수 있는데, HTML 서식을 컴파일, 데이터 초기화,생성, 상호 작용의 이벤트 바인딩 등의 애플리케이션 구동을 담당한다.

필수 옵션으로 `el` 이 있는데, DOM 요소를 지정하는 옵션이다. 지정된 DOM을 탐색하여, vue 애플리케이션 적용 지점으로 설정한다.

```html
<html>
  <head>
    <title>Vue.js 애완용품샵</title>
    <meta charset="UTF-8">
    <script src="https://unpkg.com/vue"></script>
    <link rel="stylesheet" type="text/css" href="assets/css/app.css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    crossorigin="anonymous">
  </head>
  <body>
    <div id="app"></div>
    <script type="text/javascript">
      var webstore = new Vue({
        el: '#app'
      });
    </script>
  </body>
</html>
```

해당 `el` 옵션을 통해 `app` 이라는 id속성을 가진 DOM 을 탐색하고, 애플리케이션을 마운트 한다.

물론 이 옵션을 통해 여러개의 `Vue 인스턴스` 를 생성해서 사용할 수도 있다.

### 뷰 안에서 무언가 보여 주기

```html
<html>
  <head>
    <title>Vue.js 애완용품샵</title>
    <meta charset="UTF-8">
    <script src="https://unpkg.com/vue"></script>
  </head>
  <body>
    <div id="app">
      <header>
        <h1 v-text="sitename"></h1>
      </header>
    </div>
    <script type="text/javascript">
      var webstore = new Vue({
        el: '#app',
        data: {
          sitename: 'Vue.js 애완용품샵'
        }
      });
    </script>
  </body>
</html>
```

`data` 옵션을 통해서 `sitename` 데이터를 전달하였다.

`<h1 v-text="sitename"></h1>` 태그에서 `sitename` 데이터를 활용하고 있다. `v-text` 는 해당데이터를 텍스트로 안에 붙여준다.

다른 방식으로

`<h1>{{ sitename }}</h1>` 이렇게 사용할 수도 있다.

## Vue 생명 주기

Vue 가 처음으로 인스턴스화 되면 Vue 생명주기 라는 일련의 이벤트를 거친다.

![(Vue 생명주기](https://blog.kakaocdn.net/dn/n0xcc/btqHsbsC0np/KfwMcGvVcG40ENArkBPzU1/img.png)

- 인스턴스 생성 : 뷰-모델에서 데이터 관찰자를 생성하고, 내부 이벤트 시스템에서 사용될 이벤트를 생성하여 초기화
- 템플릿과 가상 DOM 생성 : 템플릿 혹은 렌더링 함수를 찾아 템플릿을 컴파일 한다. 가상 DOM 복사본 만들고, 그 결과를 HTLM,DOM 마운트 한다.
- 이벤트 루프 : 뷰-모델의 데이터를 감시하고 있다가, 변화가 생기면 DOM 이 다시 렌더링 되어 적용된다.
- 인스턴스 소멸 : 모든 관찰자, 이벤트 리스너, 자식 컴포넌트들이 삭제된다.

### 생명 주기 코드 탐구

```javascript
var APP_LOG_LIFECYCLE_EVENTS = true;

var webstore = new Vue({
  el: "#app",
  data: {
    sitename: "Vue.js 애완용품샵",
  },
  beforeCreate: function() {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("beforeCreate");
    }
  },
  created: function() {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("created");
    }
  },
  beforeMount: function() {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("beforeMount");
    }
  },
  mounted:  function() {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("mounted");
    }
  },
  beforeUpdate:  function() {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("beforeUpdate");
    }
  },
  updated:  function() {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("updated");
    }
  },
  beforeDestroy:  function() {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("beforeDestroy ");
    }
  },
  destroyed:  function() {
    if (APP_LOG_LIFECYCLE_EVENTS) {
      console.log("destroyed");
    }
  }
});
```

이번엔 생명주기에 대한 설명인데, 작동시키고 나면 순차적으로 어떤 타이밍이 우선순위를 가지는지 알 수 있다. 마지막에 있는 `beforeDestroy, destroyed`  는 `$destroy()` 함수를 통해 호출 할 수 있다.

```javascript
webstore.$destroy()
```

## 상품 표시

### 상품 데이터 정의

```javascript
data: {
  sitename: "Vue.js 애완용품샵",
  product: {
    id: 1001,
    title: "고양이 사료, 25파운드",
    description: "당신의 고양이를 위한 <em>거부할 수 없는</em>, 유기농 25파운드 사료입니다.",
    price: 2000,
    image: "assets/images/product-fullsize.png"
  }
},
```

- id: 상품식별 번호
- title, description: HTML 마크업으로 이루어진 설명
- price: 상품의 가격
- image: 상품의 이미지

### 상품 화면 마크업

```html
<main>
  <div class="row">
    <div class="col-md-2 col-md-offset-1">
      <figure>
        <img v-bind:src="product.image">
      </figure>
    </div>
    <div class="col-md-6 col-md-offset-2 description">
      <h1 v-text="product.title"></h1>
      <p v-text="product.description"></p>
      <p v-text="product.price" class="price"></p>
    </div>
  </div>
</main>
```

`. 표기법` 으로 지정된 `data` 의 속성으로 접근이 가능하다. `img` 태그에는 `v-bind:src` 를 통해 속성값을 전달하고 있다는 점 기억하자. 

일반 텍스트가 아닌 속성에 값을 주어야 할 경우에 다른 표기법이 있다는 것이라고 생각하자.

> v-bind:src 는 :src 로 축약이 가능하다.
> `<img :src="product.image">` 동일표현

## 출력 필터 적용

해당 예제에서 가격이 2000 으로 표시가 되는데, $20.00 같이 출력되도록 하고 싶을 경우에 필터를 적용할 수 있다.

```javascript
var webstore = new Vue({
  el: '#app',
  data: {
    sitename: "Vue.js 애완용품샵",
    product: {
      id: 1001,
      title: "고양이 사료, 25파운드",
      description: "당신의 고양이를 위한 <em>거부할 수 없는</em>, 유기농 25파운드 사료입니다.",
      price: 2000,
      image: "assets/images/product-fullsize.png",
    },
  },
  filters: {
    formatPrice: function(price) {
      if (!parseInt(price)) { return ""; }
      if (price > 99999) {
        var priceString = (price / 100).toFixed(2);
        var priceArray = priceString.split("").reverse();
        var index = 3;
        while (priceArray.length > index + 3) {
          priceArray.splice(index+3, 0, ",");
          index += 4;
        }
        return "$" + priceArray.reverse().join("");
      } else {
        return "$" + (price / 100).toFixed(2);
      }
    }
  }
});
```

위와 같이 `filters` 라는 옵션명을 통해서 필터등록이 가능한데 이렇게 등록된 필터는 

```html
<main>
  <div class="row">
    <div class="col-md-2 col-md-offset-1">
      <figure>
        <img v-bind:src="product.image">
      </figure>
    </div>
    <div class="col-md-6 col-md-offset-2 description">
      <h1 v-text="product.title"></h1>
      <p v-text="product.description"></p>
      <p class="price">{{ product.price | formatPrice }}</p>
    </div>
  </div>
</main>
```

위와 같이 `|` 를 사용해서 필터이름을 지정하면, 함수와 연동되어 결과값이 출력된다.
