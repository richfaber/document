![](https://1.bp.blogspot.com/-ZBIeRwYFt80/YIZQ8lgSRmI/AAAAAAAAZqI/saJIdRGcFswI4hrqhjsNc-xlQxyOvXG0QCNcBGAsYHQ/s0/props.png)

# Vue 컴포넌트 데이터 v-model 연동하기

컴포넌트 작성 시 자식컴포넌트와 부모컴포넌트의 `데이터를 양방향으로 구성` 하는 경우가 종종 있다.

방법은 몇가지 있지만, 원리는 같으며, `v-model` 속성을 연동하는 방법에 대한 `팁` 으로 보면 좋을 거 같다.

해당 예제는  `vue 2.x` 에 적용된다.


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

      부모의 데이터: <input type="text" v-model="doggie" />

      <dog-component v-model="doggie"></dog-component>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
    <style>
    </style>

    <script type="text/javascript">
    
      const dogComponent = {
        template: `
          <div>
            자식의 데이터: <input type="text" v-model="왈왈" />
          </div>
        `,
        props: ['value'],
        computed: {

          '왈왈': {

            get() {
              return this.value;
            },

            set(val) {
              this.$emit('input', val);
            }
            
          }

        }
      };

      new Vue({
        el: '#app',
        components: {
          'dog-component': dogComponent
        },

        data() {

          return {
            doggie: '안녕하세요? 도지입니다.'
          }

        }
      })
    </script>
  </body>
</html>
```


위와같이 `왈왈` 속성을 `computed 와 get, set` 을 통해서, `input` 이벤트 때에 부모에게 값을 전달해 주는 형태 이다.
