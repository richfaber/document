[![9791158390754](http://image.yes24.com/goods/78872554/800x0) Vue.js 코딩공작소](http://www.yes24.com/Product/Goods/78872554)

# (BOOK) 5장 조건부, 반복, 리스트

해당 장은 `v-for, v-if, v-else, v-show` 문법을 활용해서 예제를 설명하는 장이다.

해당 내용이 기초문법 이긴 하지만, vue로 작성한 프로그래밍이 어디서 어떠한 연결(method, data, computed) 을 통해서, 동작 하는지를 체험해 볼 수 있는 예제이다.

for(순회문) 이 있어서 입문자 에게는 복잡해 보일수도 있을거 같은데, 내용 자체가 어려운 편은 아니기 때문에, 하나하나 지워가면서 파악해 가는 것을 추천한다.

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
      <main>
        <div v-if="showProduct">
          <div v-for="product in sortedProducts">
            <div class="row">
              <div class="col-md-5 col-md-offset-0">
                <figure>
                  <img class="product" v-bind:src="product.image" />
                </figure>
              </div>
              <div class="col-md-6 col-md-offset-0 description">
                <h1 v-text="product.title"></h1>
                <p v-html="product.description"></p>
                <p class="price">{{product.price | formatPrice}}</p>
                <button
                  class="btn btn-primary btn-lg"
                  v-on:click="addToCart(product)"
                  v-if="canAddToCart(product)"
                >
                  장바구니 담기
                </button>
                <button disabled="true" class="btn btn-primary btn-lg" v-else>
                  장바구니 담기
                </button>
                <span
                  class="inventory-message"
                  v-if="product.availableInventory - cartCount(product.id) === 0"
                >
                  품절!
                </span>
                <span
                  class="inventory-message"
                  v-else-if="product.availableInventory - cartCount(product.id) < 5"
                >
                  {{product.availableInventory - cartCount(product.id)}}
                  남았습니다!
                </span>
                <span class="inventory-message" v-else>지금 구매하세요! </span>
                <div class="rating">
                  <span
                    v-bind:class="{'rating-active': checkRating(n, product)}"
                    v-for="n in 5"
                    >☆
                  </span>
                </div>
              </div>
            </div>
            <!-- end of row -->
            <hr />
          </div>
          <!-- end of v-for -->
        </div>
        <!-- end of showProduct -->
      </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
      .rating-active {
        color: red;
      }
    </style>
    <script type="text/javascript">
      var app = new Vue({
        el: "#app",
        data: {
          sitename: "Vue.js 애완용품샵",
          showProduct: true,
          products: [
            {
              id: 1001,
              title: "고양이 사료, 25파운드",
              description:
                "당신의 고양이를 위한 <em>거부할 수 없는</em>, 유기농 25파운드 사료입니다.",
              price: 2000,
              image: "assets/images/product-fullsize.png",
              availableInventory: 10,
              rating: 1,
            },
            {
              id: 1002,
              title: "실뭉치",
              description:
                "실뭉치로 당신의 고양이에게 <strong>오랜</strong> 놀이 시간을 주세요!",
              price: 299,
              image: "assets/images/yarn.jpg",
              availableInventory: 7,
              rating: 1,
            },
            {
              id: 1003,
              title: "고양이 화장실",
              description: "당신의 고양이를 위한 최고급 화장실입니다.",
              price: 1100,
              image: "assets/images/cat-litter.jpg",
              availableInventory: 99,
              rating: 4,
            },
            {
              id: 1004,
              title: "고양이 집",
              description: "고양이가 놀 수 있는 장소!",
              price: 799,
              image: "assets/images/cat-house.jpg",
              availableInventory: 11,
              rating: 5,
            },
            {
              id: 1005,
              title: "레이저 포인터",
              description: "이 <em>놀라운</em> 상품으로 고양이와 놀아주세요.",
              price: 4999,
              image: "assets/images/laser-pointer.jpg",
              availableInventory: 25,
              rating: 1,
            },
          ],
          cart: [],
        },
        methods: {
          addToCart(aProduct) {
            this.cart.push(aProduct.id);
          },
          checkRating(n, myProduct) {
            return myProduct.rating - n >= 0;
          },
          canAddToCart(aProduct) {
            return aProduct.availableInventory > this.cartCount(aProduct.id);
          },
          cartCount(id) {
            let count = 0;
            for (var i = 0; i < this.cart.length; i++) {
              if (this.cart[i] === id) {
                count++;
              }
            }
            return count;
          },
        },
        computed: {
          cartItemCount() {
            return this.cart.length || "";
          },

          sortedProducts() {

            if (this.products.length > 0) {

              let productsArray = this.products.slice(0);
              function compare(a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                return 0;
              }
              return productsArray.sort(compare);

            }

          }
        },
        filters: {

          formatPrice(price) {

            if (!parseInt(price)) {
              return "";
            }

            if (price > 99999) {

              var priceString = (price / 100).toFixed(2);
              var priceArray = priceString.split("").reverse();
              var index = 3;
              while (priceArray.length > index + 3) {
                priceArray.splice(index + 3, 0, ",");
                index += 4;
              }

              return "$" + priceArray.reverse().join("");

            } else {

              return "$" + (price / 100).toFixed(2);

            }
          }

        }
      });
    </script>
  </body>
</html>
```

아래 예제는 filter, for를 제외해서, 이해하는데 도움이 되었으면 하는 생각에 따로 발췌해 보았다.

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
      <main>
        <div v-if="showProduct">
          <div v-for="product in products">
            <div class="row">
              
              <div class="col-md-5 col-md-offset-0">
                <figure>
                  <img class="product" v-bind:src="product.image" />
                </figure>
              </div>

              <div class="col-md-6 col-md-offset-0 description">
                <h1 v-text="product.title"></h1>
                
                <p v-html="product.description"></p>
                <p class="price">{{ product.price }}</p>
                
                <button
                  class="btn btn-primary btn-lg"
                  v-on:click="addToCart(product)"
                  v-if="canAddToCart(product)"
                >
                  장바구니 담기
                </button>
                <button disabled="true" class="btn btn-primary btn-lg" v-else>
                  장바구니 담기
                </button>
                
                <span
                  class="inventory-message"
                  v-if="product.availableInventory - cartCount(product.id) === 0"
                >
                  품절!
                </span>
                <span
                  class="inventory-message"
                  v-else-if="product.availableInventory - cartCount(product.id) < 5"
                >
                  {{product.availableInventory - cartCount(product.id)}}
                  남았습니다!
                </span>

                <span class="inventory-message" v-else>지금 구매하세요! </span>

                <div class="rating">
                  <span
                    v-bind:class="{'rating-active': checkRating(n, product)}"
                    v-for="n in 5"
                    >☆
                  </span>
                </div>

              </div>
            </div>
            <!-- end of row -->
            <hr />
          </div>
          <!-- end of v-for -->
        </div>
        <!-- end of showProduct -->
      </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
      .rating-active {
        color: red;
      }
    </style>
    <script type="text/javascript">
      var app = new Vue({
        el: "#app",
        data: {
          sitename: "Vue.js 애완용품샵",
          showProduct: true,
          products: [
            {
              id: 1001,
              title: "고양이 사료, 25파운드",
              description:
                "당신의 고양이를 위한 <em>거부할 수 없는</em>, 유기농 25파운드 사료입니다.",
              price: 2000,
              image: "assets/images/product-fullsize.png",
              availableInventory: 10,
              rating: 1,
            }
          ],
          cart: [],
        },
        methods: {

          addToCart(aProduct) {
            this.cart.push(aProduct.id);
          },

          checkRating(n, myProduct) {
            return myProduct.rating - n >= 0;
          },

          canAddToCart(aProduct) {
            return aProduct.availableInventory > this.cartCount(aProduct.id);
          },

          cartCount(id) {
            let count = 0;
            for (var i = 0; i < this.cart.length; i++) {
              if (this.cart[i] === id) {
                count++;
              }
            }
            return count;
          }

        },
        computed: {

          cartItemCount() {
            return this.cart.length || "";
          }

        }
      });
    </script>
  </body>
</html>
```