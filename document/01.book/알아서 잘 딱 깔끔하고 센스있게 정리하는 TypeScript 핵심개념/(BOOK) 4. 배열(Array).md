# 알아서 잘 딱 깔끔하고 센스있게 정리하는 TypeScript 핵심개념

- @refer
  - https://bumlog.notion.site/Notion-PDF-QR-da0cb7a053e343cc942840a589f26f0b

## 배열(Array)

여러 값을 하나의 변수에 담아 관리하는 자료구조다.
배열 타입은 배열타입(array type), 제네릭 배열타입(generic array type) 으로 나눌 수 있다.

### 배열

배열의 값이 모두 `number` 라면 사용법은 아래와 같다.

```
let member: number[] = [1, 2, 3, 4, 5];
```

만약 배열에 `number` 타입이 아닌게 들어가면 에러 난다.

문자는 아래와 같이 한다.

```
let member: string[] = ["김멋사", "이멋사", "박멋사"];
```

만약 2가지 타입을 허용하고 싶으면 `()` 를 이용해서 유니온타입을 사용한다.

```
let member: (string | boolean)[] = ["김멋사", "이멋사", true, false];
```

물론, `any` 도 가능하다.

```
let member: any[] = ["김멋사", 10, true, null];
```

### 제네릭 배열

위와 같이 사용해도 되나, 제네릭 배열방식을 추가로 지원하고 있다. 형태는

```
let member: number[] = [1, 2, 3, 4, 5];
let member: Array<number> = [1, 2];

let member: string[] = ["김멋사", "이멋사", "박멋사"];
let member: Array<string> = ["김멋사", "이멋사", "박멋사"];

let member: (string | boolean)[] = ["김멋사", "이멋사", true, false];
let member: Array<string | boolean> = ["김멋사", "이멋사", true, false];
```

어떤 변수의 타입을 참조해서 지정하는 것도 가능하다.

```
let member: Array<number> = [1, 2];
let secondMember: typeof member = [10,20];
```

`typeof` 를 통해서, 해당변수의 타입을 참조할 수 있다.

제네릭 배열타입은 함수에도 지정이 가능하다.

```
let arr: Array<() => string> = [() => "라이켓", () => "김멋사"];
```
