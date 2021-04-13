[![9791158390754](https://lh3.googleusercontent.com/-Xh-CwPEt9k8/Wh4ziawNEFI/AAAAAAAATFk/aaG1Y6IaoWU1E2uXh-S8IuABLj6k7NoFwCHMYCw/I/9791158390754.png) 쉽고 빠르게 배우는 Vue.js 2 프로그래밍](http://www.yes24.com/24/goods/44271600?scode=032&OzSrank=1)

# 1. Vue.js 기초 - 필터.컴포넌트.사용자정의 이벤트.클래스와 스타일바인딩

# 6장 필터

## 6.1 필터

개발을 하다보면 원본데이터를 변경하지 않고 원하는 형태로 값을 변경하고 싶을 때가 있다. 이것을 수동으로 하려면 원하는 데이터를 복제해서 따로 쓰거나, 특정 조건을 이용해서 처리해야 하는데, 필터를 통해 이 과정을 손쉽게 구성할 수 있다.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            <h1>Let's hear some stories!</h1>
            <div>
                <h3>Alex's stories</h3>
                <ul class="list-group">
                    <li v-for="story in storiesBy('Alex')" class="list-group-item">
                        {{ story.writer }} said "{{ story.plot }}"
                    </li>
                </ul>
                <h3>John's storiesBy</h3>
                <ul class="list-group">
                    <li v-for="story in storiesBy('John')" class="list-group-item">
                        {{ story.writer }} said "{{ story.plot }}"
                    </li>
                </ul>
            </div>
            <pre>
                {{ $data }}
            </pre>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: ".container",
                
                data: {
                    stories: [
                        { plot: "I crashed my car today!", writer: "Alex" },
                        { plot: "Yesterday, someone stole my bag!!", writer: "John" },
                        { plot: "Someone ate my chocolate...", writer: "John" },
                        { plot: "I ate somone's chocolate!", writer: "Alex" },
                    ]
                },

                methods: {
                    storiesBy: function(writer) {
                        return this.stories.filter(function(story) {
                            return story.writer === writer
                        });
                    }
                }

            });

        </script>
    </body>
</html>
```

`v-for` 의 우측에 배열을 `storiesBy` 메소드의 return 값으로 사용하고 있다. 이로써 해당 전달값과 일치하는 새로운 배열이 대입되게 되고, 그 결과가 출력된다.

### 6.1.1 계산된 프로퍼티 사용

`computed` 를 이용해서 변수에 배열을 할당한 후에 적용을 해보자

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            <h1>Let's hear some famous stories! ({{ famous.length }})</h1>
            <ul class="list-group">
                <li v-for="story in famous" class="list-group-item">
                    {{ story.writer }} said "{{ story.plot }}" and upvoted {{ story.upvotes }} times.
                </li>
            </ul>
            <h1>Let's hear some stories!</h1>
            <div>
                <h3>Alex's stories</h3>
                <ul class="list-group">
                    <li v-for="story in storiesBy('Alex')" class="list-group-item">
                        {{ story.writer }} said "{{ story.plot }}"
                    </li>
                </ul>

                <h3>John's storiesBy</h3>
                <ul class="list-group">
                    <li v-for="story in storiesBy('John')" class="list-group-item">
                        {{ story.writer }} said "{{ story.plot }}"
                    </li>
                </ul>
                
            </div>
            <pre>
                {{ $data }}
            </pre>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            new Vue({
                el: ".container",
                
                data: {
                    stories: [
                        { plot: "I crashed my car today!", writer: "Alex", upvotes: 28 },
                        { plot: "Yesterday, someone stole my bag!!", writer: "John", upvotes: 8 },
                        { plot: "Someone ate my chocolate...", writer: "John", upvotes: 51 },
                        { plot: "I ate somone's chocolate!", writer: "Alex", upvotes: 74 },
                    ]
                },

                methods: {
                    storiesBy: function(writer) {
                        return this.stories.filter(function(story) {
                            return story.writer === writer
                        });
                    }
                },

                computed: {
                    famous: function() {
                        return this.stories.filter(function(item) {
                            return item.upvotes > 25;
                        })
                    }
                }

            });

        </script>
    </body>
</html>
```

`Vue` 프레임워크에서 뭔가 멋진 필터를 제공하는 줄 알았는데, 그렇진 않네? 싶어서 찾아봤는데 정말 기본으로 제공하는 필터는 아직 없었다. 좀 지나면 사람들이 이쁘게 만들어 주겠지만, 지금은 일일이 작성해야 할 거 같다.

## 6.3 사용자 정의 필터

이전에 예제는 변수로 등록하거나, 담을 배열을 함수를 통해서 변경하거나 하는 식이였다면, 이번엔 `Vue.filter` 에 직접 등록하여, HTML 템플릿에서 사용해 보자.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            
            <h1>Real identities of Super Heroes!</h1>
            <ul class="list-group">
                <li v-for="hero in heroes" class="list-group-item">
                    {{ hero | snitch }}
                </li>
            </ul>
            <pre>
                {{ $data }}
            </pre>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>

            Vue.filter('snitch', function(hero) {
                return [
                    hero.secretId,
                    ' is ',
                    hero.firstname,
                    ' ',
                    hero.lastname,
                    ' in real life!'].join('');
            });

            new Vue({
                el: ".container",
                
                data: {
                    heroes: [
                        { firstname: 'Bruce', lastname: 'Wayne', secretId: 'Batman' },
                        { firstname: 'Clark', lastname: 'Kent', secretId: 'Superman' },
                        { firstname: 'Jay', lastname: 'Garrick', secretId: 'Flash' },
                        { firstname: 'Peter', lastname: 'Parker', secretId: 'Spider-Man' }                        
                    ]
                }

            });

        </script>
    </body>
</html>
```

위와 같이 글로벌 `Vue.filter` 를 통해 등록 후, HTML 템플릿에 `|` 로 데이터에 필터 적용을 할 수 있다. 무조건 이런 방식이 되지 않으면, filter만 따로 분류해서 관리할 수 없을 뿐더러, `methods, computed` 에 변수와 필터를 구분할 수 없어 코드파편화 끝에 지옥을 맛보게 될 것이다.

# 7장 컴포넌트 

## 7.1 컴포넌트란?

`Vue`의 컴포넌트 개념은, 기본 HTML 요소 + 기능을 캡슐화 하여 재사용 할 수 있도록 하는 것에 목적이 있다고 정의하고 있다.

## 7.2 컴포넌트 사용하기

컴포넌트를 글로벌에 등록 후 사용한다.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            <story></story>
            <story></story>
            <story></story>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        <script>
            
            Vue.component('story', {
                template: '<h1>My horse is amazing!</h1>'
            });

            new Vue({
                el: ".container"
            });

        </script>
    </body>
</html>
```

기본적으로 이러면 끝이 난다.

컴포넌트에 템플릿은

```html
<script type="text/template" id="story-template">
	<h1>My horse is amazing!</h1>
</script>

<script type="text/javascript>
	Vue.component('story', {
		template: '#story-template'
	});
</script>

or

<template id="story-template">
	<h1>My horse is amazing!</h1>
</template>	

<script type="text/javascript">
	Vue.component('story', {
		template: '#story-template'
	});
</script>
```

와 같이 분리해서 사용할 수도 있다. 참고로 `template` 키값에 해당하는 템플릿은 `<story></story>` 라는 정의태그와 교체한다. 즉 `<story></story>` 안에 추가되는 것이 아니라 교체이기 떄문에, 디버거를 통해 확인해 보면 `<story></story>` 태그는 없어져 버린다.   

즉 컴포넌트 이름은 `사용자정의 태그의 이름` 이 되고, 교체되는 템플릿은 `template` 라는 키값을 통해서 직접 태그를 넣어도 되고, 분리해서 ID를 참조하게 해도 된다.

구조화를 좋아한다면 컴포넌트에 직접 태그를 심지 않고, 동적 로딩을 통해 연결하는 것이 좋아 보인다. `Mustache` 같은걸로?

## 7.4 프로퍼티

이런 과정을 거치게 되는 컴포넌트는 재사용의 목적이 크기 때문에, 원하는 변수를 전달하고 싶어진다.

그럴 때 `props` 키를 이용한다.

```html
<story plot="hello"></story>

<template id="story-template">
	<h1>{{ plot }}</h1>
</template>

Vue.component('story', {
	props: ['plot'],
	template: '#story-template'
});
```

`props`에 정의된 변수는 컴포넌트 이름인 `story 태그` 에 속성을 통해 전달이 되고, 선언되지 않은 변수를 템플릿 안에서 사용할 경우 `Vue 프레임워크` 는 에러를 뿜어낸다.

주의할 점은 HTML태그가 대소문자 구별을 하지 않기 때문에, 카멜표기법(viewModel 같은형태?) 은 의미가 없다.

전달해야 하는 것이 배열 이거나 객체라면 `v-bind:` 를 사용해야 한다.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            <story v-bind:info="{ name:'Bolton', age:20 }"></story>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        
        <template id="storyTemplate">
            <h2>{{ info.name }} is {{ info.age }}</h2>
        </template>

        <script>
            
            Vue.component('story', {
                props: ['info'],
                template: '#storyTemplate'
            });

            new Vue({
                el: ".container"
            });

        </script>
    </body>
</html>
```

위와 같은 `v-bind:` 는 `:` 로 축약이 가능하다.

```html
<story v-bind:info="{ name:'Bolton', age:20 }"></story>

동일

<story :info="{ name:'Bolton', age:20 }"></story>
```

만약 태그에 속성으로 값을 전달하지 않고, 컴포넌트 등록시에 값을 전달하려면 `data` 키값을 이용하면 된다. 

- 반드시 `function()` 형태 여야만 전달이 되고, 그렇지 않으면 전달되지 않는다는 것을 주의해야 한다.

```html
<!doctype html>
<html>
    <head>
        <title>Hello Vue</title>
    </head>
    <body>
        <div class="container">
            <story v-bind:info="{ name:'Bolton', age:20 }"></story>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        
        <template id="storyTemplate">
            <h2>{{ info.name }} is {{ info.age }}</h2>
        </template>

        <script>
            
            Vue.component('story', {
                template: '#storyTemplate',
                data : function() { // Component의 값은 무조건 function 형태 여야 한다.

                    return {
                        info: { name : 'Bolton', age : 20 }
                    }

                }
            });

            new Vue({
                el: ".container"
            });

        </script>
    </body>
</html>
```

# 8장 사용자 정의 이벤트

## 8.1 발생과 청취

`Vue.js` 는 단방향바인딩을 기본으로 하기 때문에, 부모의 변경값은 자식에게 전달 되지만, 자식의 변경값은 부모에게 전달되지 않는다. 부모에게 전달하기 위해서는 이것을 수동으로 해주어야 하는데, 기본적으로 아래의 메소드를 사용한다.

- $on(event)를 이용해 이벤트 청취
- $emit(event)를 이용해 이벤트 발생
- $once(event)를 이용해 이벤트를 한번만 청취
- $off()를 이용해 이벤트 리스너를 제거

```html
<!doctype html>
<html>
    <head>
        <title>Emit and Listen</title>
    </head>
    <body>

        <div class="container text-center">
            <p style="font-size: 140px;">{{ votes }}</p>
            <button class="btn btn-primary" @click="vote">Vote</button>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        
        <script>
            
            new Vue({
                el: ".container",
                data: {
                    votes: 0
                },

                methods: {
                    vote: function(writer) {
                        this.$emit('voted');
                    }
                },

                created: function() {
                    this.$on('voted', function(button) {
                        this.votes++;
                    })
                }
            });

        </script>
    </body>
</html>
```

created 라는 함수(생명주기로 추상화) 안에서 이벤트등록을 할 수 있다. 앵귤러가 생명주기가 있듯 `Vue`도 생명주기가 있다.

이 생명주기에 접근해서 뭔가 다른 작업을 하면 된다.

- beforeCreate: Vue 인스턴스 초기화 후 데이터 감시 및 이벤트/감시자 설정하기 전
- created: Vue 인스턴스 생성 후
- beforeMount: DOM 마운트 전
- mounted: DOM 마운트 직후
- beforeUpdate: 데이터 변경 시 가상 DOM 렌더링 후 패치 직전
- updated: 데이터 변경 시 가상 DOM 렌더링 후 패치 직후
- activated: keep-alive 상태의 컴포넌트 활성 시
- deactivated: keep-alive 상태의 컴포넌트 비활성 시
- beforeDestroy: Vue 인스턴스가 파괴되기 전
- destroy: Vue 인스턴스가 파괴된 후

## 8.2 부모-자식 간 통신

자식컴포넌트 에서 특정버튼을 클릭하면 부모의 특정한 이벤트를 발생 시키는 예제를 보자.

즉 부모는 특정한 이벤트를 가지고 있어야만 한다.

```html
<!doctype html>
<html>
    <head>
        <title>Emit and Listen</title>
    </head>
    <body>

        <div class="container">

            <parent-comp count="10"></parent-comp>
                   
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        
        <script>

            Vue.component('parent-comp', {
                props: ['count'],
                template: '<h1>HI. Im parent. do show my child?({{ count }}) <child-comp></child-comp></h1>',
                methods: {
                    increaseCount: function() {
                        this.count = parseInt(this.count) + 10;
                    }
                }
            });

            Vue.component('child-comp', {
                template: '<p>Hello? Im child component. click button. <button type="button" @click="haha">click me</button></p>',
                methods: {
                    haha: function() {
                        this.$emit('increase');
                    }
                }
            });
            
            new Vue({
                el: ".container"
            });

        </script>
    </body>
</html>
```

위 예제는 자식 컴포넌트에서 `$emit`을 호출 했음에도 동작하지 않는다.
실행할 이벤트가 무엇인지를 자식이 모르고 있기 때문이다.

```html
<!doctype html>
<html>
    <head>
        <title>Emit and Listen</title>
    </head>
    <body>

        <div class="container">

            <parent-comp count="10"></parent-comp>
                   
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        
        <script>

            Vue.component('parent-comp', {
                props: ['count'],
                template: '<h1>HI. Im parent. do show my child?({{ count }}) <child-comp @increase="increaseCount"></child-comp></h1>',
                methods: {
                    increaseCount: function() {
                        this.count = parseInt(this.count) + 10;
                    }
                }
            });

            Vue.component('child-comp', {
                template: '<p>Hello? Im child component. click button. <button type="button" @click="haha">click me</button></p>',
                methods: {
                    haha: function() {
                        this.$emit('increase');
                    }
                }
            });
            
            new Vue({
                el: ".container"
            });

        </script>
    </body>
</html>
```

이렇게 `@increase="increaseCount"` 로 실행한 함수를 지정해 준다. 
(`v-on:increase="increaseCount"` 와 같은 표현)

## 8.5 이벤트 리스너 제거

청취하고 있는 이벤트는 `$off` 를 통해 제거할 수 있다.

```html
<!doctype html>
<html>
    <head>
        <title>Emit and Listen</title>
    </head>
    <body>

        <div class="container">

            <parent-comp count="10"></parent-comp>
                   
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        
        <script>

            Vue.component('parent-comp', {
                props: ['count'],
                template: '<h1>HI. Im parent. do show my child?({{ count }}) <child-comp @increase="increaseCount"></child-comp></h1>',
                methods: {
                    increaseCount: function() {
                        this.count = parseInt(this.count) + 10;
                    }
                }
            });

            Vue.component('child-comp', {
                template: '<p>Hello? Im child component. click button. <button type="button" @click="haha">click me</button></p>',
                methods: {
                    haha: function() {
                        this.$emit('increase');
                        this.$off('increase');
                    }
                }
            });
            
            new Vue({
                el: ".container"
            });

        </script>
    </body>
</html>
```

위와 같이 하면 `haha`에 `$emit` 호출 후에는 다시 작동하지 않는다.

# 9장 css의 class와 스타일 바인딩

## 9.1 클래스 바인딩

(자바스크립트를 클래스화 해서 사용한다는 것이 아니라 css의 클래스를 의미하는 것이다. -_-)

스타일 조작시에는 `v-bind:class` 를 사용하면 된다. 축약으로 `:class` 로도 사용할 수 있다.

```html
<!doctype html>
<html>
    <head>
        <title>Emit and Listen</title>
    </head>
    <body>

        <div class="container">

            <div v-bind:class="{ 'red': color, 'blue': !color }" class="box"></div>
            <div v-bind:class="{ 'purple': color, 'green': !color }" class="box"></div>
            <div v-bind:class="{ 'red': color, 'blue': !color }" class="box"></div>
            <div v-bind:class="{ 'purple': color, 'green': !color }" class="box"></div>

            <button v-on:click="flipColor" class="btn">Flip color!</button>
            
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        
        <script>

        
            new Vue({
                el: ".container",
                data: { // **Component 에서는 function 형태여야 함. Component 아니라서 객체전달 가능** 
                    color: true
                },

                methods: {
                    flipColor: function() {
                        this.color = !this.color;
                    }
                }
            });

        </script>
        <style type="text/css">
            .red {
                background: #ff0000;
            }

            .blue {
                background: #0000ff;
            }

            .purple {
                background: #7b1fa2;
            }

            .green {
                background: #4caf50;
            }

            .box {
                float: left;
                width: 200px;
                height: 200px;
                margin: 40px;
                border: 1px solid rgba(0, 0, 0, .2);
            
            }
        </style>
    </body>
</html>
```

위와 같이 객체로 좌측에 적용할 클래스, 우측에 상태값을 지정하면 된다. 이 형태는 우측에 상태값 지정이라 한국 문체(?) 와 맞지 않는다.

"이 클래스를 줘! 이런 경우라면"

이런 식이기에 

"이런 경우에 이 클래스를 줘!" 로 바꿀수도 있다.

```html
<!doctype html>
<html>
    <head>
        <title>Emit and Listen</title>
    </head>
    <body>

        <div class="container">

            <div v-bind:class="[ 'green', 'blue', 'red' ]" class="box"></div>
            <div v-bind:class="[ color ? 'red' : 'blue']" class="box"></div>
            <div v-bind:class="[ color ? 'purple' : 'green']" class="box"></div>
            
            <button v-on:click="flipColor" class="btn">Flip color!</button>
            
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        
        <script>

        
            new Vue({
                el: ".container",
                data: { // **Component 에서는 function 형태여야 함. Component 아니라서 객체전달 가능** 
                    color: true
                },

                methods: {
                    flipColor: function() {
                        this.color = !this.color;
                    }
                }
            });

        </script>
        <style type="text/css">
            .red {
                background: #ff0000;
            }

            .blue {
                background: #0000ff;
            }

            .purple {
                background: #7b1fa2;
            }

            .green {
                background: #4caf50;
            }

            .box {
                float: left;
                width: 200px;
                height: 200px;
                margin: 40px;
                border: 1px solid rgba(0, 0, 0, .2);
            
            }
        </style>
    </body>
</html>
```

배열로 클래스를 줄 수 있는데(뭐하러 배열로 줘??), 이걸 활용하면 해당 방법이 가능해진다.

```html
<div v-bind:class="[ 'green', 'blue', 'red' ]" class="box"></div>
<div v-bind:class="[ color ? 'red' : 'blue']" class="box"></div>
<div v-bind:class="[ color ? 'purple' : 'green']" class="box"></div>
```

1번째 것은 배열로 클래스를 부여한 것이다. 최종적으로는 `box green blue red` 의 클래스가 부여된다.

2,3 번째에 삼항연산자를 활용해서 `이런 조건이면 클래스를 줘` 구문이 되었다. 일종의 편법 느낌이랄까

## 9.2 스타일 바인딩

### 9.2.1 객체문법

`v-bind:style` 을 이용해서 스타일을 inline 방식으로 적용이 가능하다.

```html
<!doctype html>
<html>
    <head>
        <title>Emit and Listen</title>
    </head>
    <body>

        <div class="container">

            <div v-bind:style="niceStyle" class="box">1</div>
            
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.min.js" type="text/javascript"></script>
        
        <script>

        
            new Vue({
                el: ".container",
                data: { 
                    niceStyle: {
                        color: 'white',
                        fontSize: '100px'
                    }
                }

            });

        </script>

        <style>
            .box { width:200px; height:200px; background:green; }
        </style>

</body>
</html>
```

이렇게 하면 `div` 의 스타일속성을 이용해서 해당값이 바인딩 된다. (인라인으로 스타일 만들지마 ㅠㅜ)

```html
<div :style="{'color' : 'blue', fontSize: '100px' }">...</div>
```

이렇게 직접 객체를 넣어도 된다. (인라인으로 스타일 만들지말자... 클래스 쓰자.. ㅠㅜ)

배열로도 넣을 수 있다.

```html
<div :style="[niceStyle, badStyle]">...</div>

data: {
	niceStyle: { color: 'blue', fontSize: '20px' },
	basStyle: { fontStyle: 'italic' }
}
```

## 1부 Vue 기초 문법 마무리

하루에 120페이지를 한다는 오만한 생각은 지키지 못했다. 하지만 내용에 어려움이 없어 보이고, 왜 `Vue` 가 쉽다고 하는지 알 거 같다.

1. 쉽다. 제공문법 자체가 별로 없고, 배우는데 스트레스가 없다. 배울만한 개념 자체가 없다 -_-;;; 컴포넌트 정도랄까.
2. jQuery 처럼 원하는 부분에만 적용할 수 있고, 기존에 다른 프레임워크를 쓰더라도 시간만 들이면 간단하게 교체 가능해 보인다.
3. 빠르다? (모르겠음 솔직히..)
4. Angular 보다 지켜야 할게 없어서 초기진입이 쉬워 보인다.
5. 컴파일 때문에 안싸워도 된다.

그로 인해 단점은 

1. 가벼운 만큼 지원하는게 0. 보충하기 위해 라이브러리 떡칠하다 보면, 최종적으로 vue 적용이 성능향상 이라는 결과로 이어진다고 할 수 있을까? 프레임워크 느낌보다 라이브러리 또는 헬퍼 느낌.
2. 개념이 가벼워서 쉽다는 생각이 들지만 구지 필요한가. HTML 템플릿엔진 하나 달아두는거랑 큰 차이가 없어보임. 강한 장점 없는데 사용하는게 의미가 있는가.

음.. 결론적으론 쉽다는 의미가 개념자체가 가볍고, 제공문법도 별로 없기 때문이라고 생각한다.

이 책의 설명이 모든 것을 얘기한 것은 아니겠지만, 공식사이트 메뉴얼과 큰차이가 없어 보인다. 
나는 책으로 보는 걸 선호하기 때문에 그런데, 인터넷으로 학습하는거에 거부감이 없다면, 이 책의 내용과 메뉴얼과 큰 차이가 없다는 느낌이 들었다.

그래도 책의 설명이 웹사이트 메뉴얼 보다는 보기가 좋다. 아무래도 웹사이트 메뉴얼은 기계번역의 느낌이 좀 있고, 책은 의역을 해놓은 흔적이 있기 때문일까?

angular는 사용하다 보면, 아 이제 알겠다 싶을때, 구렁텅이에 빠지고, 이러면 되겠지 했는데 안되고, 하다보면 GG 치는데, (컴파일까지 싸우면 미쳐버림) 그에 비해 Vue는 템플릿 엔진이라고 생각하고 사용하면 괜찮다고 생각한다.




