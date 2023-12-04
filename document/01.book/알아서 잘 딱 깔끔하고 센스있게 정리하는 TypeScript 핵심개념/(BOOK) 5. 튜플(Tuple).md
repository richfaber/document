# 알아서 잘 딱 깔끔하고 센스있게 정리하는 TypeScript 핵심개념

- @refer
  - https://bumlog.notion.site/Notion-PDF-QR-da0cb7a053e343cc942840a589f26f0b

## 튜플(Array)

배열의 타입을 강제할 수 있다.

```typescript
let member: [string, number] = ["김멋사", 10];
console.log(member);
```

이렇게 타입을 강제해서 사용할 때, 튜플 타입이라 한다.

이전에는 개수제한 까지는 안했으나, 2.7 이후에는 배열의 개수까지 제한하게 되었다.
