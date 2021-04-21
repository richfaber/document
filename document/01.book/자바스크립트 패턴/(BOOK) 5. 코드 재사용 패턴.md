[![9791158390754](https://1.bp.blogspot.com/-Zn0A-6q9zQ8/VyXY7dyTpKI/AAAAAAAAN0c/aSDSM_CeJ1g0b6Is8mPqfDcAHyLd-jkOgCLcB/s320/cfile10.uf.206F3A364EAA4CA906E76D.png) Javascript Patterns](http://www.yes24.com/Product/Goods/5871083?OzSrank=5)

소프트웨어 에서 패턴이란 어떤 문제에 대한 일반적 해결책을 의미 한다.

검증되고 자주 사용되는 코드를 패턴 이라고 생각하면 될 듯 하다.

# (BOOK) 5. 코드 재사용 패턴

코드 재사용은 개인적 으로 가장 좋아하는 파트 이다. 기존 코드를 최대한 수정 없이 재사용 하고, 유지보수 확장하기 좋은 코드로 사용 되어 질 때 희얼이 있다.
(대부분의 코드 작성자들이 그러한 부분이 있을 거라고 생각 한다.)

하지만 코드 재사용을 기대 하면서 작성하는 방법이 무궁무진 하기 때문에, 섯불리 올바른 방법은 이것이라고 단정 내리는 것은 위험하다고 생각한다.


## 클래스 방식 vs. 새로운 방식의 상속 패턴

클래스(고전적인, 전형적인) 방식 이란 무엇인지 부터 명확히 해보자.

고전적이고 정착된 어떤 것 또는 일을 수행 하는 적절한 방식 으로 널리 받아 들여진 것이라는 의미는 아니다.

대다수 프로그래밍 언어는 객체의 설계도로 클래스라는 개념을 가지고 있다.자바와 같은 언어는 모든 객체가 어떤 클래스를 복제 혹은 참조하는 객체로 이루어 지며, 클래스 없이는 객체를 생성한다는 것이 불가능 하다.

하지만 자바스크립트는 클래스가 없기 때문에, 복제 혹은 참조되는 인스턴스 라는 개념은 조금 부족하게 느껴진다. 자바스크립트 객체는 단순히 키-값의 쌍들일 뿐이며 언제든지 생성하고 변경할 수 있다.

그럼에도 불구하고 자바스크립트 생성자 함수와 new 연산자 문법은 클래스를 사용하는 문법과 매우 유사하다.

```javascript
Person adam = new Person(); // 자바 문법
var adam = new Person(); // 자바스크립트 문법
```

자바가 엄격한 타입 구분을 하기 때문에 adam을 Person 타입으로 선언하는 것을 제외 하곤 동일 하다.

자바스크립트의 생성자 호출을 보면 Person이 클래스인 것 같지만, Person은 여전히 보통의 함수 라는 사실을 구별해야 한다.
문법의 유사성 으로 많은 개발자들이 자바스크립트를 클래스 관점에서 생각하고 클래스를 전제한 상속 패턴을 발전 시켜 왔고, 이러한 구현 방법을 '클래스 방식' 이라고 부를 수 있을 것이다.

재사용패턴 이란 것은 상속 패턴을 의미하는 것이고, 몇가지 선택지가 있다.

## 클래스 방식의 상속을 사용할 경우 예상되는 산출물

클래스 방식의 상속을 구현할 때의 목표는 자식() 라는 생성자 함수로 생성된 객체 들이 다른 생성자 함수인 부모() 의 속성을 가지도록 하는 것이다.

```javascript
function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {}

inherit(Child, Parent); // 상속의 마법이 일어난다.
```

부모 생성자와 자식 생성자가 있고, 상속을 처리하는 inherit 함수를 호출 했다. inherit는 이제 구현해 보자.

## 클래스 방식의 상속 패턴 #1 - 기본 패턴

가장 널리 쓰이는 방법은 부모() 생성자를 사용해 객체를 생성 하고 나서, 이 객체를 자식()의 프로토타입에 할당 하는 것이다. 

```javascript
function inherit(C, P) {
  C.prototype = new P();
}

function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {}

inherit(Child, Parent);
```

여기서 prototype 속성이 함수가 아니라 객체를 가리키게 한다는 것이 중요 하다. 즉 프로토타입이 부모 생성자 함수 자체가 아니고, 부모 생성자 함수로 생성한 객체 인스턴스를 가리켜야 한다.

```javascript
function inherit(C, P) {
  C.prototype = new P();
}

function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {}

inherit(Child, Parent);
console.log( '자식의 say 함수 : ' + Child.prototype.say() );

var kids = new Child();
console.log( kids.say() );
```

new 연산자를 이용 해서 부모() 의 복제 객체를 생성하고, 그 객체의 물리적 메모리 주소를 자식.prototype이 받아 쓰고 있다.

또한 new 연산자를 통해 자식() 의 복제 객체를 생성 하고, 그 객체의 물리적 메모리 주소를  kids가 받고 있다.

### 프로토타입 체인 추적

이 패턴을 사용하게 되면 부모 객체의 프로토타입에 추가된 속성과 기능함수(say) 와 함께, 부모 객체 자신의 속성(this에 추가된 인스턴스 속성 - name) 도 모두 물려 받게 된다.

![alt](https://1.bp.blogspot.com/-YCaMuCipFTY/V3H2tPbxH_I/AAAAAAAAOPI/x2Jf8L7FqhYkR7NqRBasQvQKX2ScX8zWwCLcB/s640/JavaScript_Protoytpe_Constructor_Relationship.png)

```javascript
function Foo() { }
var foo = new Foo();
```

- [prototype 속성 도움글](https://draft.blogger.com/blog/post/edit/1402486756640559023/4457900508628718251#)

prototype의 성격을 간단히 얘기 하자면, 어떤 객체이든 만들어 질 때에, prototype 이라는 객체가 짝궁처럼 별개이지만, 동시에 생성이 되는데, 오롯이 function 만이 이 prototype 객체에 접근할 수 있는 속성을 가지고 있다.

라고 기억을 하고 나서,

new Foo() 가 하는 일은


1. 새로운 객체를 생성 한다.
2. 그 객체에 __proto__ 속성을 생성 한다.
3. __proto__ 는 A.prototype 을 바라본다. (참조 한다)
4. __proto__ 에 있는 constructor 를 한번 실행 한다. (이때 constructor 함수 내부에서의 this는 방금 생성한 객체 이다.)

```javascript
var foo = new Foo()
```

라는 것은 위에 과정을 거친 새로운 객체를 참조 하고 있는 것이다.

또한 모든 객체는 `__proto__` 속성을 가지는데, `__proto__` 밑에 기능함수 혹은 속성이 있다면 접근이 허용 된다.

다시 정리하면

`function Foo() {}` 를 만드는 순간 `prototype` 속성도 같이 가지게 되서,

`Foo.prototype` 을 console로 출력해 보면, `constructor` (내가 만들어 질때, 같이 만들어 놓은 Foo 함수를 복제(!) 하여 넣어둠) 와 `__proto__` 라는 속성을 가진 객체가 나오게 된다.

`new Foo()` 를 하면 새로운 객체에 `__proto__` 라는 속성이 `Foo.prototype` 을 보게 되고,
어떠한 객체이든 `__proto__` 밑에 있는 속성과 기능함수에 접근할 수 있기 때문에, `Foo.prototype` 에 선언되어 있는 모든 것들을 사용할 수 있게 되는 것이다.

이것은 복제가 아닌 참조 라는 사실을 알 수 있는데, 즉 상속이 되었다고 할 수 있다.

예제로 돌아와서,

```javascript
function inherit(C, P) {
  C.prototype = new P();
}

function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {}

inherit(Child, Parent);
console.log( '자식의 say 함수 : ' + Child.prototype.say() );

var kids = new Child();
console.log( kids.say() );

이 예제를 inherit를 빼서 보기 쉽게 바꿔보면,

function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {}

Child.prototype = new Parent();
var kids = new Child();
console.log( kids.say() );
```

1. 자식.prototype 에다가 new 부모() 했기 때문에, 자식.prototype.__proto__ 에 부모.prototype 이 참조 된다. 즉 자식.prototype 은 부모.prototype 을 모두 접근할 수 있게 된다.
2. kids = new 자식() 을 하면 new 연산자 과정을 거치고, kids.__proto__ 에는 자식.prototype을 바라보게 된다.
3. 자식.prototype 에 __proto__를 kids 가 그대로 사용할 수 있게 되었다. 상속 되었다.

모든 객체는 `__proto__` 에 있는 내용 들을 접근할 수 있기 때문에, `kids.say()` 가 실행 된다.

연결고리는

`kids.__proto__ ==> 자식.prototype`

`자식.prototype.__proto__ ==> 부모.prototype`

즉 kids의 꼭대기로 억지로 접근한다고 치면

`kids.__proto__.__proto__.constructor` 가 된다.

그리고 __proto__의 __proto__도 생성된 kids는 전부 접근이 된다.

그렇기 때문에 상속 이라고 얘기할 수 있는 것이다.

__proto__ 안에 __proto__가 접근이 가능 한지 궁금 하다면 이렇게 해보면 된다.

```javascript
var underInherit = {};
underInherit.__proto__ = {
  x : 10,
  xfn : function() {
    console.log('first proto-xfn')
  },
  __proto__ : {
    y : 20,
    xfn : function() {
      console.log('second proto-xfn')
    },
    yfn : function() {
      console.log('second proto-yfn')
    }
  }
};
console.log(underInherit.x);
console.log(underInherit.y);

console.log(underInherit.xfn());
console.log(underInherit.yfn());
```

`xfn` 이 중복되어 있는데, `underInherit` 와 가까운 것이 실행 된다. 중복될 경우는 이렇게 작동하는 것을 기억하자.

이때 `underInherit.z = 10` 이라고 해버리면 어떻게 되는 걸까?

```javascript
var underInherit = {};
underInherit = {
  z : 10,
  __proto__ : {
    x : 10,
    xfn : function() {
      console.log('first proto-xfn')
    },
    __proto__ : {
      y : 20,
      xfn : function() {
        console.log('second proto-xfn')
      },
      yfn : function() {
        console.log('second proto-yfn')
      }
    }
  }
}
```

z는 나 자신에게 붙는다.

한가지 더 기억해야 할 것은 __proto__ 는 표준구현 내용이 아니기 때문에, 일부 환경 에서는 사용이 불가능 하다. 
하지만 동작은 똑같이 하기 때문에, underInherit.__proto__ 가 undefined 라거나 syntax error 라고 나오더라도 실망 하지는 말자.

### 패턴#1의 단점

부모 객체 this 에 추가된 속성과 prototype을 모두 그대로 받기 때문에, 재사용 방법이 꽤 불편함이 있다.

```javascript
var s = new Child('세호'); 
s.say(); // Adam 출력;
```

이렇게 된달까.. 자유도가 없다고 보면 된다.


## 클래스 방식의 상속 패턴 #2 - 생성자 빌려쓰기

```javascript
function Article() {
  this.tags = ['js', 'css'];
}
Article.prototype.name = function() { console.log(this.tags); }

var article = new Article();
function BlogPost() {}
BlogPost.prototype = article;

var blog = new BlogPost();

function StaticPage() {
  Article.call(this);
}

var page = new StaticPage();

console.log(article.tags);
console.log(blog.tags);
console.log(page.tags);

console.log(article.hasOwnProperty('tags')); // true
console.log(blog.hasOwnProperty('tags')); // false
console.log(page.hasOwnProperty('tags')); // true
```

상속패턴 #1의 단점을 극복하기 위해서, 위의 예제를 통해 복제된 속성을 확인 하자.

부모 `Article()` 에 대한 상속은 두 가지 방식으로 이루어 진다.

기본패턴을 적용한 blog 객체는 tags를 자기 자신의 속성으로 가진 것이 아니라 `prototype을 통해 접근` 하기 때문에, `hasOwnProperty()는 false` 이고, 생성자만 빌려쓰는 방식으로 상속받은 page 객체는 부모의 tags 멤버에 대한 참조를 얻는 것이 아니라 복사본을 얻게 되므로 자기 자신의 tags 속성을 가지게 된다.

즉 `blog.tags` 를 변경하면 `article.tags` 도 변경되지만, `page.tags` 는 변경되지 않는다.

이것은 page가 Article 함수와 `숨겨진링크(__proto__)` 로 연결되지 않기 때문에, Article의 name함수를 사용할 수 없다.

중요한 것은 prototype의 속성, 기능함수를 사용할 수는 없지만, 부모의 속성이 복사 된다는 것이다.

그래서 이 패턴에서 prototype 의 기능함수를 사용 하고자 하려면 Article 함수를 바꿔야 한다.

```javascript
function Article() {
  this.tags = ['js', 'css'];
  this.name = function() { console.log(this.tags); }
}

var article = new Article();
function BlogPost() {}
BlogPost.prototype = article;

var blog = new BlogPost();

function StaticPage() {
  Article.call(this);
}

var page = new StaticPage();
page.tags = ['change Value'];

console.log( article.name() ); // ['js', 'css']
console.log( blog.name() ); // ['js', 'css']
console.log( page.name() ); // ['change Value']
```

이것을 제일 첫 예제에 대입해 보면

```javascript
function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {
  Parent.apply(this, arguments);
}

var kids = new Child('세호');
console.log( kids.name );
```

kids의 name 속성은 복제 되었지만, kids.say() 는 사용할 수 없다. 


### 생성자 빌려쓰기 패턴의 장단점 

프로토타입이 전혀 상속되지 않는다는 점은 분명 이 패턴의 한계라 할 수 있다.
반면 부모 생성자 자신의 멤버에 대한 복사본을 가져올 수 있다는 것은 장점이다.
클래스 방식의 상속 패턴 #3 - 생성자 빌려쓰고 프로토타입 지정 해주기
이것은 속성도 개별적 으로 가지면서, prototype도 상속 받도록 하는 패턴이다.

```javascript
function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {
  Parent.apply(this, arguments);
}
Child.prototype = new Parent();

var kids = new Child('세호'); 
console.log( kids.name ); // 세호
console.log( kids.say() ); // 세호

console.log( Child.prototype.name ); // Adam
```

단순하게 Child.prototype에 다시 __proto__ 를 연결 하면 그만이다.

부모의 모든 것을 받게 되지만, 부모의 속성을 덮어 쓸 위험은 없다.
마음껏 자신의 속성을 가질 수 있게 되었다.

## 클래스 방식의 상속 패턴 #4 - 프로토타입 공유

prototype 을 공유해 버리면 모든 객체가 동일한 프로토타입을 공유하기 때문에 간단히 상속이 된다.

```javascript
function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child(name) {
}
Child.prototype = Parent.prototype;

var kids = new Child();

console.log( kids.say );
Child.prototype.say = function() { console.log('change'); }

console.log( kids.say ); // 자식 영향 받음.
console.log( Parent.prototype.say ); // Parent 교체됨.
```

## 클래스 방식의 상속패턴 #5 - 임시 생성자 

프로토타입 체인의 장점을 유지 하면서, 실제 Child.prototype 의 직접 링크는 끊어 버리는 방법이다.

```javascript
function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child() {}

var F = function() {}
F.prototype = Parent.prototype;
Child.prototype = new F();

var kids = new Child();

console.log( kids.say );
Child.prototype.say = function() { console.log('change'); }

console.log( kids.say ); // 자식 영향 안받음.
console.log( Parent.prototype.say ); // Parent 교체 안됨.
```


## 상위 클래스 저장

이 패턴을 기반 으로, 부모 원본에 대한 참조 추가도 가능하다. 즉 상위 클래스에 대한 접근 경로를 가지는 것이다. 경우에 따라 매우 편리할 수 있지만, 접근해서 무엇인가를 변경하면 상속받고 있는 모든 객체들이 변경되기 때문에, 위험한 방법이기도 하다.

```javascript
function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child() {}

var F = function() {}
F.prototype = Parent.prototype;
Child.prototype = new F();
Child.uber = Parent.prototype;

var kids = new Child();
```

super는 예약어 라서, uber로 지정해 보았다.

- [자바스크립트 예약어 목록 보기 - 쓰임새가 있는것도 있지만, 경우에 따라 사용될 가능성이 있어서 미리예약한 것들 또한 포함되어 있다.](https://draft.blogger.com/blog/post/edit/1402486756640559023/4457900508628718251#)


### 생성자 포인트 재설정

생성자 포인터를 재설정 하지 않으면 모든 자식 객체 들의 생성자는 Parent() 로 지정되 있기 때문에, 보완을 할 필요가 있다.

```javascript
function Parent(name) {
  this.name = name || 'Adam';
}

Parent.prototype.say = function() {
  return this.name;
}

function Child() {}

var F = function() {}
F.prototype = Parent.prototype;
Child.prototype = new F();
Child.uber = Parent.prototype;
Child.prototype.constructor = C;

var kids = new Child();
```

이런 상속 패턴은 재사용이 목적 이다. 해서, 물려 받은 기능이나 속성들의 값이 어떤 일에 의해 훼손 되는 것은 위험하다. 상속 받은 객체들 모두 영향을 받기 때문이다.

상속이 어떻게 이루어 지고, 어떤 연결 고리를 가지고 있는지를 기억 하는 것은 중요한 일이다.