# 알아서 잘 딱 깔끔하고 센스있게 정리하는 TypeScript 핵심개념

- @refer
  https://bumlog.notion.site/Notion-PDF-QR-da0cb7a053e343cc942840a589f26f0b

## Type의 종류

### 타입스크립트의 기본 타입

```typescript
boolean
number
string
object
array
tuple
enum
any // 모든 타입을 허용, 정해지지 않은 변수 지정 가능
void // 값이 없음
null
undefined
unknown
never // 도달이 불가능한 코드
```

### 변수 타입선언

#### 기본적인 타입 표기

변수 선언 후 콘론 뒤에 타입과 할께 세미콜론을 붙인다. 이를 `타입주석` 이라 한다.

```
let name: string;
let age: number;
```

타입을 잘못 넣는 경우 오류가 발생한다.

```
let address: string = '제주';
let age: number = 28;
address = 0; // Error: The type 'number' is not assignable to type 'string'
age = '나이'; // Error!
```

#### 타입추론

타입표기는 자바스크립트와의 호환성을 위해 생략될 수 있는데, 타입 선언이 없으면 컴파일러가 타입을 추론한다.
이것을 `타입추론` 이라 한다.

```
let a = true; // a의 타입을 boolean 으로 판단
let b = 'hello'; // b의 타입을 string 으로 판단
let c = 1; // c의 타입을 number로 판단
let d = {} // d의 타입을 object로 판단

let name: string = "다은"; // 타입을 중복해서 지정
```

마지막줄의 타입추론이 가능한 구문에서는 선언할 필요 없다

#### any

모든 타입의 값이 지정될 수 있다. 하지만 타입을 명백히 하려는 의도가 있으니, 지양해야 한다.

```
let a: any = 0;
a = true;
a = 'typescript';
a = {}
```

오류가 발생하지 않는다.

#### never 타입

never 타입은 절대 도달할 수 없는 변수다.
예를 들어서, 반환(return) 이 없는 이 함수의 타입은 `never` 이다.

```
const neverTest = () => {
  while(true) {
    console.log("함수가 실행중입니다.")
  }
}
```

아래의 예시는 도달할 수 없는 변수의 다른 예이다.

```
function sayName(value: string): string {
  if(typeof value === "string") {
    return value;
  } else {
    return value;
  }
}
```

`sayName` 함수의 파마미터 value 는 무조건 `string` 이므로, `else` 절의 value 의 타입은 `never` 이다.

#### 유니온 타입

하나의 변수에 여러개 타입 지정 시 `유니온타입` 을 사용한다.

```
let a: string | number;
```

any 타입을 써도 되나, 필요한 경우 사용하면 되겠다.

### 커스텀타입

나만의 타입을 생성할 수 있다.

```
type Centimeter = number;
type Kilogram = number;
```

여기에 추가로 `Student` 라는 타입을 추가 선언하자

```
type Student = {
  name: string;
  height: Centimeter;
  weight: Kilogram;
}
```

이렇게 구성된 타입을 사용해 보자

```
let 학생: Student = {
  name: '대운',
  height: 163,
  weight: 53
}
```

학생이라는 변수의 타입으로 `Student` 를 지정하였다.

만약 3개의 속성 중 하나라도 누락되면 오류가 난다.

```
let 학생: Student = {
  height: 163,
  weight: 53
}
// Property 'name' is missing in type '{ height: number; weight: number; }' but required in type 'Student'.
```

하지만 타입지정자는 `name` 이 필수는 아니였으면 할 경우 아래와 같이 표기한다.

```
let 학생: Student = {
  name?: '대운',
  height: 163,
  weight: 53
}
```

`?` 를 추가함으로써, 옵션의 형태가 된다. 이후 `name` 이 없다는 오류는 나지 않는다.
