# 알아서 잘 딱 깔끔하고 센스있게 정리하는 TypeScript 핵심개념

- @refer
  - https://bumlog.notion.site/Notion-PDF-QR-da0cb7a053e343cc942840a589f26f0b
  - https://developer-talk.tistory.com/297

## 객체 타입(Object Types)

### 객체 타입이란?

타입스크립트 에서는 객체를 선언할 때 어떤 타입인지 명확하게 정의해야 한다.

#### 객체 선언

변수 이름 옆에 `:` 또는 `new` 를 사용하여 정의한다.

```typescript
const student1: object = {};
const student2 = {}; // any 타입
const student2: any = {};
```

`object` 로 타입을 지정할 수도 있고, 만약 안한다면 `any` 타입이 된다.

`object` 에서 더 구체적으로 타입을 지정할 수 있는데,

```typescript
let student: {
  name: string;
  grade: number;
};
```

이렇게 구체적 제한을 만들 수 있다.

### 타입 추론

만약 타입표기가 없는 경우에, 타입스크립트의 컴파일러는 타입을 추론한다.

```typescript
const student = {
  name: "김멋사",
  grade: 3,
};
```

name 은 `string` 으로, grade 는 `3` 으로 추론한다.

### 옵션 속성

타입을 지정하지만 필수값이 아닌 경우 `?` 로 옵션임을 알려 준다.

```typescript
const cat: {
  type: string;
  age?: number;
};

cat.age = 2;
```

### 인덱스 시그니처

객체가 다양한 속성을 가질 경우 `key, value` 를 매핑하는 표현이다.

`key` 와 `value` 가 한정적인 경우에 지정한다.

`{ [Key: T]: U }`

```typescript
const student: { [index: string]: number } = {};

student.id = 222111;
student.id = "홍길동"; // Error
```

```typescript
let objSalary = {
  bonus: 200,
  pay: 2000,
  allowance: 100,
  incentive: 100,
};
```

이러한 데이터가 있는 경우

```typescript
function totalSalary(salary: { [key: string]: number }) {
  let total = 0;
  for (const key in salary) {
    total += salary[key];
  }
  return total;
}
```

만약 인덱스 시그니처의 `value` 타입을 다양하게 하고 싶다면

```typescript
type userType = {
  [key: string]: string | number | boolean;
}

let user: userType = {
  'name': '홍길동',
  'age': 20,
  'man': true'
}
```

키의 값을 제한하는 경우는 아래와 같은 사용도 가능하다.

```typescript
type userInfoType = "name" | "age" | "address";

type userType = {
  [key in userInfoType]: string;
};
```
