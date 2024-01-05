# as

타입단언 역할이고, 컴파일 단계의 타입검사 시 컴파일러가 감지하지 못하는 애매한 타입 요소를 직접 명시하는 것

```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// or

const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

# is

타입가드 역할이고, 함수가 호출될 때 매개변수의 타입을 명시할 수 있다.