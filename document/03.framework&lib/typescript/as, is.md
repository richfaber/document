
# as

컴파일 단계의 타입검사 시 컴파일러가 감지하지 못하는 애매한 타입 요소를 직접 명시하는 것

```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// or

const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

# is

타입가드 역할을 하고, 함수가 호출될 때