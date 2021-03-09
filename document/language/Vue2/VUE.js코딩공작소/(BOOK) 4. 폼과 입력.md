[![9791158390754](http://image.yes24.com/goods/78872554/800x0) Vue.js 코딩공작소](http://www.yes24.com/Product/Goods/78872554)

# (BOOK) 4장 폼과 입력

Vue의 양방향 데이터 바인딩을 사용해 볼 건데, 양방향 데이터 바인딩은 폼의 값을 주시하고 있다가, 값이 변경되면 연관된 작업들을 자동으로 수행해 준다. 하지만 완전히 자동으로 될 수는 없고, 일종의 규칙들이 있다. 

간단한게 `v-model` 부터 사용해 보자.

## v-model 바인딩 사용

지금까지는 단방향의 흐름으로 작성해 보았다. 어떤 버튼을 클릭하면, 어떤 함수가 일방적으로 실행된다던지, `data` 속성에 값을 화면에 템플릿문법 `{{ }}` 등을 이용해서 표현한다던지 하는 것이다.

![9791158390754](data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAFWAoADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACio5poreIyTSLGi9WY4Arm9Q8Z20JKWURnb++3yr/iauMJS2RhWxNKir1JWOoqrc6jZ2YP2i6ijPozDP5V55eeINTvsiS5ZEP8EXyj9OazOpz39a6I4V/aZ5NXOktKcfvPQpvF+kxEhXll/3Iz/XFUn8cW4P7uymb/ecD/GuKorVYaCOKWbYmWzS+X+Z158cntp/5y//AFqVfHQz82nn8Jf/AK1cfRT9hT7Ef2niv5vwX+R3EXjezY/vbWdPphv61fg8U6RPx9q8s+kilf16V5xRUvDQZrDN8RHez+R65DPDcLuhlSRfVGBFSV5DFLJC4eJ2jYfxISD+lbdl4s1K1wsrLcp6ScN+Y/rWUsK18LO6jnNOWlSNvxPQ6KxNO8U6ffEI7m3lP8MvQ/Q9K2655RcXZnrUq1OquaDugoooqTQKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKZLLHBE0srqiKMszHAAoBu2rH1z2seK7axLQ2oFxcDg8/Ip9z3+grD13xRLfFreyLRW3Qv0aT/AVzlddLD9Zng4zNvsUPv/AMi1e6hdajL5l1M0h7Doq/Qdqq0UV2JJaI8KUnJ3k7sKKwn1Wayu9WiuX3CCMTQZAHynt78kVHa6pc208Q1C4Zh9hNxIojAwc+o9sDFK5Xs2dDRWMPEMXlyM9pcIyweeqMVy6eowf0NLJ4itY2uBsdvJgWfgj5gccD35FF0L2cuxsUVzaa/Lb61dJeErZqMLkD5G27sZHXPIo07X51t7mW/R3k+0LFFCijOWGQv/AOujmRXspHSUVknxBAkFw01vPFLAyo0LAFiW6YwcVUTXJItRv3u45oYIIEYQOBuDE47etF0JU5HQ0Vz2o68/9nXQhjltbuEI+JAp+ViBkYyK6BTlQfai9yXFpai1raX4hvtLIQP50A/5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/rQxda8T+JD4BvdaNvbaaHihktXgm82TDuM7gVwPlP61LqfjnVdFmsbC/s9Lgu7iJpjLNeMsAUHAAbbkseuMcVqJ4EgbQrnRbrV9SurCWJIo45XT9wFORtIX2HXPSi68GT3llFaT+JNTeNEZG3LCxcE98p6ccUrxKca26fRdjotNuJLvTLa4lMBkljDsbeTfHkj+Fu496tVT0rTLfRtKttOtAwgt4xGm45OB6n1q5WbOqN7ahRRRQMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKa+7Y2zG7HGemaAOUv8ATdLl+Jel6hLqoj1KO1dYrHaMyLh/mz26t+VdbXz/AKz4w1y2+IMWo3mn2yanp6m1ECBij53AHrk535H4V7ppUl9LpVtJqccUV66BpY4s7UY9hn0rScWkrnLh6sZykkupcooorM6gooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK85m8X6npFj4wt7+4Et9psgNkxjUEpLxHwBg4JFNRb2M51FDc6m98JaVf+JrPXp4ibu1XCgY2uf4Sw7lecf8A1hW7XHWfi6SxstSttTimnvtHsori7kG1RKzJuIUDpjpUU/xJsolaSPTb2eKC3iuLt4ymIFkUMAcsCxwecVXLJkKrSjrtc7aio4Jo7m3jnibdHIodT6gjIqSoNwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK47xB4ETXPFVjrH2sRQxeWLm32E+eEbcuTmuxopptbEThGatI4rXPBF7qGqapdWOrpaxarAkF3HJbeYcKMZU5GOKpXXwyA1A3NncWEiPDFE0eoWInxsULlTuGMgDNehUU+dkPD027tDY41iiSNQFVQFAUYAA9BTqKKk2CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/9k=)

`v-model` 는 주로 입력과 폼 바인딩에 사용된다. `v-bind` 로도 가능하지만, 사용빈도가 높고, 입력등을 편하게 작성할 수 있도록 제공하는 문법으로 봐도 무방하다.

```javascript
<input v-model="something" />

==> equal

<input v-bind:something v-on:input="something=$event.target">
```

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

        <div class="col-md-6">
            <strong>이름:</strong>
            <input v-model="order.firstName" class="form-control"/>
          </div>
          <div class="col-md-6">
            <strong>성:</strong>
            <input v-model="order.lastName" class="form-control"/>
          </div>
          <div class="col-md-12 verify">
            <pre>
              이름: {{ order.firstName }}
              성:  {{ order.lastName }}
            </pre>
          </div>

        </div>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            sitename: "Vue.js 애완용품샵",
            showProduct: true,
            order: {
                firstName: '',
                lastName: ''
            }
        },

        computed: {

        },

        methods: {
            
        }
    });
    </script>
</body>
</html>
```

`v-model` 을 이용해서 `order` 의 내용을 연결시켰다.

해당값을 입력해 보면 알겠지만, `data` 의 값들이 입력 하자마자 실시간 반영되고 있다는 것을 확인할 수 있는데, 이것이 양방향 데이터 바인딩이다.

단방향 데이터 바인딩은 폼의 값이 변해도, 다른곳에 영향을 주지 않는다.


## 값 바인딩 살펴보기

### 체크 박스에 값 바인딩

`v-model` 과 `v-bind` 을 응용해서 체크박스를 제어해 보자.

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

        <div class="col-md-6">
            <strong>이름:</strong>
            <input v-model="order.firstName" class="form-control"/>
          </div>
          <div class="col-md-6">
            <strong>성:</strong>
            <input v-model="order.lastName" class="form-control"/>
          </div>
          <div class="col-md-12 verify">

            <input type="checkbox" id="gift" value="true" v-bind:true-value="order.sendGift" v-bind:false-value="order.dontSendGift" v-model="order.gift" />
            <label for="gift">{{ order.gift }}</label>

            <pre>
              이름: {{ order.firstName }}
              성:  {{ order.lastName }}
            </pre>
          </div>

        </div>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            sitename: "Vue.js 애완용품샵",
            showProduct: true,
            order: {
                firstName: '',
                lastName: '',
                gift: '선물로 보내기',
                sendGift: '선물로 보내기',
                dontSendGift: '선물로 보내지 않기'
            }
        },

        computed: {

        },

        methods: {
            
        }
    });
    </script>
</body>
</html>
```

이 예제에서는 `v-model="gift"` 로 연결되어 있는 폼이 있고, `v-bind:true-value, v-bind:flase-value` 를 통해서 해당값이 전달되고 있다.

`v-bind:true-value, v-bind:flase-value` 이 부분은 `Vue` 가 지원하는 문법으로, 체크되어 있거나 체크되지 않았을때 이 폼요소의 값을 참조할 수 있게 제공한다.

라디오 박스에서는 `v-bind:value` 를 이용하자

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

        <div class="col-md-6">
            <strong>이름:</strong>
            <input v-model="order.firstName" class="form-control"/>
          </div>
          <div class="col-md-6">
            <strong>성:</strong>
            <input v-model="order.lastName" class="form-control"/>
          </div>
          <div class="col-md-12 verify">

            <input type="radio" v-bind:value="order.home" v-model="order.method" />
            <input type="radio" v-bind:value="order.business" v-model="order.method" />
            <label>{{ order.method }}</label><br />

            <input type="checkbox" id="gift" value="true" v-bind:true-value="order.sendGift" v-bind:false-value="order.dontSendGift" v-model="order.gift" />
            <label for="gift">{{ order.gift }}</label>

            <pre>
              이름: {{ order.firstName }}
              성:  {{ order.lastName }}
            </pre>
          </div>

        </div>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            sitename: "Vue.js 애완용품샵",
            showProduct: true,
            order: {
                firstName: '',
                lastName: '',
                gift: '선물로 보내기',
                sendGift: '선물로 보내기',
                dontSendGift: '선물로 보내지 않기',
                home: '자택',
                business: '직장'
            }
        },

        computed: {

        },

        methods: {
            
        }
    });
    </script>
</body>
</html>
```

해당 `input[type=radio]` 가 참일 경우 해당폼의 `value` 는 `v-bind` 에 참조하고 있는 값으로 지정된다. 그 값은 `v-model` 에 연결된 값으로 연동된다.

### v-for 지시자 알아보기

`v-for` 는 `vue` 가 템플릿에 제공하는 순회문 이다. `select` 박스로 예제를 들어보자.

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

      <div class="form-group">
        <div class="col-md-2">
          <strong>주:</strong>
          <select v-model="order.state" class="form-control">
            <option disabled value="">주</option>
            <option v-for="(state, key) in states" v-bind:value="key">{{state}}</option>
          </select>

          {{ order.state }}
        </div>
      </div>
      
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            sitename: "Vue.js 애완용품샵",
            showProduct: true,
            states: [
              '알리바마', '알래스카', '에리조나', '캘리포니아'
            ],
            order: {}
        },

        computed: {

        },

        methods: {
            
        }
    });
    </script>
</body>
</html>
```

`v-for` 문으로 `states` 를 순회하여 `option` 태그에 매핑하였다. `(state, key)` 는 임의로 지정해준 변수명인데, 첫번째 인자는 해당객체의 값을 의미하고, 두번째 인자는 해당값의 속성이다. `states`는 배열이기 때문에, `인덱스` 가 할당되었다.

## 수식어 살펴보기

`v-model` 에 수식어를 설정할 수 있다. 예를 들어 숫자타입으로 변환되어야 하는 경우 `.number` 를 이어붙여쓰면 된다.
문자인데, 좌우측 공백을 제거해야 하는 경우라면 `.trim`을 이어쓴다.

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

      <div class="form-group">
        <div class="col-md-2">
    
          숫자만: <input type="number" v-model="numberForm1" /><br />
          숫자만: <input type="number" v-model.number="numberForm2" /><br />
          문자공백제거: <input type="text" v-model.trim="stringForm" /><br />
          <br />
          {{ typeof numberForm1 }} {{ typeof numberForm2 }} {{ stringForm }}


        </div>
      </div>
      
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
          numberForm1: '',
          numberForm2: '',
          stringForm: '',
        },

        computed: {

        },

        methods: {
            
        }
    });
    </script>
</body>
</html>
```

input폼의 값은 항상 타입이 `string` 이라서, 임의적으로 변경해야 하는 수고를 덜기 위해 `.number` 를 사용했다. type이 변경되는 것을 확인할 수 있다.

`stringForm` 은 `trim`을 적용해 주는데, 폼의 값에 좌우측 공백을 제거해 준다.

또 다른 수식어로 `.lazy` 가 있다.

폼의 양방향 데이터 바인딩은 `키가 눌렸을 때(keydown)` 동작하는 것이 기본값이다. 키가 눌리고 나서 `떼어질 때(keyup)` 에 수행되게 바꿀 때 사용한다.
