[![9791158390754](http://image.yes24.com/goods/78872554/800x0) Vue.js 코딩공작소](http://www.yes24.com/Product/Goods/78872554)

# (BOOK) 3장 상호 작용성 추가

## 장바구니 데이터는 배열 추가로 시작

장바구니를 작성하는 예제인데, 우선 `data` 속성에 아래와 같이 작성하자.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        Vue Context
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <script type="text/javascript">
    var app = new Vue({
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
            cart: []
        }
    });
    </script>
</body>
</html>
```

위에 `cart` 라는 속성에 실제 장바구니 항목이 추가될 것이다.

## DOM 이벤트에 바인딩

### 이벤트 바인딩 기초

```html
<p v-on:eventname="some javascript"></p>
```

`v-on` 지시자를 이용하여 이벤트를 연결할 수 있다. `v-on:click="script code"` 라고 하면 `click` 이벤트에 `script code`가 연결된다.

### 장바구니 담기 버튼에 이벤트 연결

이벤트 바인딩 방법을 알았으니, 버튼을 하나 만들고, 클릭시에 `cart` 변수에 클릭한 상품번호를 넣어보자.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">

        장바구니에 담긴 상품: {{ cart }}
        <br />
        <button type="button" v-on:click="addToCart">담기</button>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <script type="text/javascript">
    var app = new Vue({
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
            cart: []
        },

        methods: {
            addToCart: function() {
                this.cart.push( this.product.id );
            }
        }
    });
    </script>
</body>
</html>
```

methods 의 함수 안에서 this 는 `vue 컨텍스트` 를 바라본다. `data, methods` 등에 선언된 속성들은 그 컨텍스트에 자식요소로 설정되어 있기 때문에, 접근이 가능하다. 물론 `this.addToCart` 도 접근된다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">

        장바구니에 담긴 상품: {{ cart }}
        <br />
        <button type="button" v-on:click="addToCart">담기</button>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <script type="text/javascript">
    var app = new Vue({
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
            cart: []
        },

        methods: {
            addToCart: function() {
                this.cart.push( this.product.id );
                
                console.log(this.addToCart);
                
            }
        }
    });
    </script>
</body>
</html>
```

`console.log` 로 `this.addTocart` 를 출력하면 해당함수의 내용이 나오는 것을 확인할 수가 있다. 이래서 `data, methods` 의 이름이 중복되면 오류가 나기 때문에, 주의하자.

## 장바구니 담기 버튼을 추가하고 개수 세기

상품개수를 위해서, 계산된 속성(computed) 를 사용할 것이다.

### 계산된 속성(computed)은 언제 사용할까?

쉽게 얘기해서 `data` 속성은 데이터베이스에 저장하는 대표 데이터의 묶음 이라고 생각하면 되고, 계산된 속성은 화면단(View) 에 역동적 값을 계산하기 위해 사용한다고 이해하자.

사용자의 성과 이름을 예로 들어보면, 데이터베이스 에는 `성과 이름`이 저장될 것이고, 화면에는 `성+이름` 을 표현한다고 치면,

```javascript
data: {
  firstName: 'lee',
  lastName: 'heewon'
},

computed: {
  fullName: function() {
    return this.firstName + this.lastName
  }
}
```

이렇게 구성할 수 있다.

위에 예제를 들어보면, 장바구니에 들어가 있는 상품에 개수를 화면에 표현하는 것으로 바꿔보면 아래와 같다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">

        장바구니에 담긴 상품: {{ cart }}<br>
        장바구니에 담긴 상품 개수: {{ currentCartNumber }}<br>
        <br />
        <button type="button" v-on:click="addToCart">담기</button>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <script type="text/javascript">
    var app = new Vue({
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
            cart: []
        },

        computed: {

            currentCartNumber: function() {
                return this.cart.length;
            }

        },

        methods: {

            addToCart: function() {
                this.cart.push( this.product.id );
                
                console.log(this.addToCart);
                
            }
        }
    });
    </script>
</body>
</html>
```

### 계산된 속성으로 업데이트 이벤트 살펴보기

이 `computed` 가 중요한건, `data` 의 값의 변화가 생기면 한번 호출해서 갱신해 준다는 데에 있다.

![9791158390754](https://lh3.googleusercontent.com/h1KxirgzefYmA3VvvWTqjXcmYUFIms8CwbflNiw38ExNsHhzqRRvE3A-3adIO09S7k0QReZ22A7ktjL3KshEssVam-VaLtMNFdOOzLZZBmkDRYBTj1aYjjlGc0di3IuQ7IS0-nWZMo_IS7yF8cKm__j6dEwltfIh_LfwYWAF1WhGwlFvIuHTesVbVVOHUm5UKPspY9YKfuGSO9WGYf1lQWuqTV5SARNxRNdAoIduTPna_RtXP5hK8ALbOpZv7IwJc0vMeVan0M-fgiA6g6RwTkTgNHh03bnv2AdyriNYiOA9Bz36GAK7QCQznDBeLtgP3qYtfyt-MNwF_HY-DibAxjP7N_SYnrwrs4yJT5eJlhoqOB4cxvmtheFvkieRf2V4u_4YeZHaI6l4RuHXJa12BM9j2DWg5PEobXYYAZU0ePUhXJ8qa-jyJjewotXBD2THczL5f6YPXueL3dFFFQVk56M4U-5xkkjHrhB4uB_mBcrYUriJbfSGzh4RadMq-peD55ItwUlZDhJX-TDNreU4Q4ujyzq2XCcvxfHF_Vdy8wEywYmk76Ro_7SRas5xTv3Ah90T-gKIlAMwRDtr7KmzEnIYzADTUqHiUL2sx4qy8UWqxytAuTJrIOOws4hNkSUvyLCRQA_wPHTeDumFi0GC4sVT1vjEGrC4bVcdq9_WpTNhdxVUELpv8_ycHd0RQ_o=w600-h588-no?authuser=0)

VUE의 라이프사이클이 있는데, 변화가 생기면 한바퀴 도는 주기 같은 것인데, 그 사이클 안에서의 일부분이라고 생각하면 된다.

`computed` 된 값은 `beforeUpdate` 의 의해 화면단(view)가 갱신된다.

### 재고 주시

장바구니가 담긴 개수를 제한해 보자. 5개 이상 못담게 해보자.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">

        장바구니에 담긴 상품: {{ cart }}<br>
        장바구니에 담긴 상품 개수: {{ currentCartNumber }}<br>
        <br />
        <button type="button" v-on:click="addToCart" v-show="canAddToCart">담기</button>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            availableInventory: 5,
            sitename: "Vue.js 애완용품샵",
            product: {
                id: 1001,
                title: "고양이 사료, 25파운드",
                description: "당신의 고양이를 위한 <em>거부할 수 없는</em>, 유기농 25파운드 사료입니다.",
                price: 2000,
                image: "assets/images/product-fullsize.png",
            },
            cart: []
        },

        computed: {

            currentCartNumber: function() {
                return this.cart.length;
            },

            canAddToCart: function() {
                return this.availableInventory > this.currentCartNumber;
            }

        },

        methods: {

            addToCart: function() {

                this.cart.push( this.product.id );
                console.log(this.addToCart);
                
            }
            
        }
    });
    </script>
</body>
</html>
```

data 에 `availableInventory` 추가했고, computed 에 `canAddToCart` 를 추가했다. 그리고 `button` 태그에 `v-show` 지시자를 추가했다.

`v-show` 는 true 면 보여주고, false 면 보여주지 않는다. `canAddToCart` 에 연결되어 있기 때문에, 5개가 넘으면 버튼은 숨는다.

### v-if 와 v-else 로 버튼 비활성화

버튼이 안보여지는 것 말고, 비활성 상태로 만들어 두는 방법도 있다.

`v-if` 와 `v-else` 를 통해서, true와 false를 구분해서 마크업을 분기해 보자.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">

        장바구니에 담긴 상품: {{ cart }}<br>
        장바구니에 담긴 상품 개수: {{ currentCartNumber }}<br>
        <br />
        <button type="button" v-on:click="addToCart" v-if="canAddToCart">담기</button>
        <button type="button" v-on:click="addToCart" v-else disabled="disabled">담기</button>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            availableInventory: 5,
            sitename: "Vue.js 애완용품샵",
            product: {
                id: 1001,
                title: "고양이 사료, 25파운드",
                description: "당신의 고양이를 위한 <em>거부할 수 없는</em>, 유기농 25파운드 사료입니다.",
                price: 2000,
                image: "assets/images/product-fullsize.png",
            },
            cart: []
        },

        computed: {

            currentCartNumber: function() {
                return this.cart.length;
            },

            canAddToCart: function() {
                return this.availableInventory > this.currentCartNumber;
            }

        },

        methods: {

            addToCart: function() {

                this.cart.push( this.product.id );
                console.log(this.addToCart);
                
            }
            
        }
    });
    </script>
</body>
</html>
```

button 태그에 `v-if` 와 `v-else` 를 지정했다.

`template` 사용자태그를 이용해서 이렇게 바꾸어 볼 수도 있다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">

        장바구니에 담긴 상품: {{ cart }}<br>
        장바구니에 담긴 상품 개수: {{ currentCartNumber }}<br>
        <br />

        <template v-if="canAddToCart">
            <button type="button" v-on:click="addToCart">담기</button>
        </template>
        <template v-else>
            <button type="button" v-on:click="addToCart" disabled="disabled">담기</button>
        </template>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            availableInventory: 5,
            sitename: "Vue.js 애완용품샵",
            product: {
                id: 1001,
                title: "고양이 사료, 25파운드",
                description: "당신의 고양이를 위한 <em>거부할 수 없는</em>, 유기농 25파운드 사료입니다.",
                price: 2000,
                image: "assets/images/product-fullsize.png",
            },
            cart: []
        },

        computed: {

            currentCartNumber: function() {
                return this.cart.length;
            },

            canAddToCart: function() {
                return this.availableInventory > this.currentCartNumber;
            }

        },

        methods: {

            addToCart: function() {

                this.cart.push( this.product.id );
                console.log(this.addToCart);
                
            }
            
        }
    });
    </script>
</body>
</html>
```

vue가 제공하는 문법들이 몇가지 있는데, 이것들은 개발하는데에 유용한 도구가 될 것이다.

