# 3. 리액트 컴포넌트

## 3.1 리액트 컴포넌트 알아보기

화면을 구성하는 최소 단위이고, 자신만의 상태(state) 를 가지고, 캡슐화 되어 독립적으로 작동, 렌더링 된다.

## 3.2 컴포넌트 구조 살펴보기

리액트 컴포넌트는 클래스형과 함수형 2가지 형태가 있는데, 현재는 함수형만 사용되는 추세다.

```react
function MyComponent() {
  return (
    <div>
      출력할 UI
    </div>
  )
}
```

화살표 방식도 가능

```react
const MyComponent = () => {
  return (
    <div>
      출력할 UI
    </div>
  )
}
```

루트는 단일루트 여야만 한다. 컴파일 오류

```react
const MyComponent = () => {
  return (
    <div>출력할 UI 1</div>
    <div>출력할 UI 2</div>
  )
}
```

만약 2개를 반환해야 한다면 `<></>` 를 사용한다.

```react
const MyComponent = () => {
  return (
    <>
      <div>출력할 UI 1</div>
      <div>출력할 UI 2</div>
    </>
  )
}
```

## 3.3 JSX 란 무엇인가요?

자바스크립트에서 HTML 유사코드를 사용할 수 있도록 하는 확장 문법이다.

- JSX 없이 리액트에서 h1 구현

```react
var element = React.createElement("h1", {
  className: "greeting"
}, "Hello, React")
```

- JSX

```react
const element = (
  <h1 className="greeting">
    Hello, React
  </h1>
)
```

JSX 가 편한데, 몇가지 규칙이 있다.

1. 반드시 하나의 최상위 요소로 감싸야 한다.
2. XML 문법을 따르므로 여는 태그와 닫는 태그가 모두 필요하다.
3. <br>, <input> 같은 태그는 반드시 self-closing 형식으로 작성해야 한다.
- <br />, <input />
4. 일부 속성을 자바스크립트 충돌을 피하기 위해서 다른 이름을 사용한다.
- class -> className
- for -> htmlFor
5. 이벤트 핸들러는 카멜 케이스 형식으로 작성한다.
- onclick -> onClick
- onchange -> onChange

## 3.4 컴포넌트는 어떻게 표시해야 할까?

- 컴포넌트 하위에 자식 컴포넌트를 추가할 때

```react
function App() {
  return (
    <>
      <MyComponent>
        <자식 컴포넌트...>
      </MyComponent>
    </>
  )
}
```

- 컴포넌트 하위에 자식 요소가 없을 때

```react
function App() {
  return (
    <>
      <MyComponent />
    </>
  )
}
```

