[![104515374](https://lh3.googleusercontent.com/-tXz42oJYrCw/W68582ug7NI/AAAAAAAAU9o/mS9F7ueq5WsEZ9JYh2pFzK_jQoAUskV-ACHMYCw/I/104515374.jpg)](http://www.yes24.com/24/goods/35254611)

# ECMAScript6 두고두고 보는 자바스크립트 표준 레퍼런스 - 김영보

어떤 것을 새로 배우려고 할 때, 가장 큰 장벽은 익숙함의 차이인 것 같다. 
사람이 `인지구두쇠` 라는 말이 있다. 새로운 것을 거부하려는 심리적 현상인데, 가지고 있는 것을 지키려는 본능적 거부 라고 한다.

내 앞에 주어진 새로운 것은, 자신이 해오던 것과 비슷한 요소가 있을 때, 관심도 가지고, 금방 이해하고 학습할 수 있다. 

TASK Runner 인 gulp,webpack 등도 처음 봤을때는 이전에 이런형태의 것을 다루지 않았었기 때문에, 거부감이 심했는데, 지금은 크게 부담스럽지 않은 것은, 사용하는 시간의 힘이지 않나는 생각이다.

웹자원들에 대한 이런 `pre-compile` 방식의 대중화는 신기술인 `ECMAScript6` 를 사용해도 브라우저 호환성에 문제가 없고, 브라우저 들도 빠르게 새로운 표준들을 도입하고 있기에, 이전에 어렵게 생각하고 넘어가던 것들도, 이제는 제대로 살펴보고 적용해 봐야겠다는 생각이 들었다.

요즘 책들이 대부분 잘 나오는 편이라고 생각하는데, 구성과 내용설명이 깔끔히 정리가 되어있고, 공부하기 좋게 정리가 잘 되어 있어서 계획세우기가 좋은 느낌이 들어 구매하였다.

빠르게 보고, 다른책 으로 바꿔서 또 보고, 또 보고 하는 방식으로 공부를 하는 편이라서, 이제는 책을 크게 가리지 않고 슥슥 읽어 나가는 느낌이 있다.

요즘 기술책 들은 표지에 감성을 많이 집어넣는 느낌이다. 유행인가? 소장하고 싶다. 는 생각이 들 정도로 이쁘게 나온다. 이전에는 미래, 우주, 다각형 같은 것들을 집어 넣더니, 이책은 꽃이다. 훗

## 목차

### 개요

- ECMA-262 스펙상태
- ES6의 방향성
- 용어 표기
- 용어 기준
- 코딩 환경

### let, const

- var 키워드
- let 키워드
- let 변수 작성 방법
- 블록 스코프
- let과 this 키워드
- function
- try-catch
- switch-case
- 호이스팅
- for()
- const

### arrow 함수

- 개요
- ES5 형태와 차이
- 블록, 파라미터
- return
- new 연산자
- arguments 사용
- this와 setTimeout()
- 화살표 함수와 setTimeout()
- prototype

### Interation

- 개요
- 이터러블 프로토콜
- 이터레이터 프로토콜

### Spread 연산자

- 개요
- rest 파라미터
- Array-like
- Array-like 전개
- rest와 arguments 차이

### 디스트럭처링

- 개요
- Array 분할 할당
- Object 분할 할당
- 파라미터 분할 할당

### 오퍼레이션

- 프로퍼티 이름 조합
- Default Value
- Default 파라미터
- for-of
- for-of 와 for-in 차이
- for-of로 Object 열거
- 거듭 제곱 연산자

### Object 오브젝트

- 오퍼레이션
- 디스크립터
- get, set 속성
- getter
- setter
- is(): 값과 값 타입비교
- assign(): 오브젝트 프로퍼티 복사
- assign() 필요성
- assign() 고려사항
- assign() getter
- setProtoTYPEoF(): __proto__에 첨부
- __proto__

### Number 오브젝트

- Number 상수
- EPSILON
- 진수 리터럴
- isNaN(): NaN 여부
- isInteger(): 정수 여부
- isSafeinteger(): 안정 정수 여부
- isFinite(): 유한 값 여부

### Math 오브젝트

- Math 함수 목록
- sinh(): 쌍곡 사인
- asinh(): 쌍곡 아크사인
- cosh(): 쌍곡 코사인
- acosh(): 쌍곡 아크코사인
- tanh(): 쌍곡 탄젠드
- atanh(): 쌍곡 아크탄젠드
- log2(): 2를 밑으로 한 로그 값
- log10(): 10을 밑으로 한 로그 값
- log1p(): 로그(1 + 값)
- expm1(): 자연로그 상수의 x승  - 1
- hypot(): 제곱근
- cbrt(): 세제곱근
- sign(): 사인 값
- trunc(): 소수를 제외한 정수
- imul(): 32비트로 반환
- clz32(): 32비트 값에서 0비트 수
- fround(): 32비트 유동 소수 값

### String 오브젝트

- Unicode
- formCodePoint(): 코드 포인트 문자 반환
- codePointAt(): 코드 포인트 값 반환
- includes(): 문자열 포함 여부
- startsWith(): 문자열 시작 여부
- endsWith(): 문자열 종료 여부
- repeat(): 문자열 복제
- normalize(): 유니코드 정규화 형식 변환

### Template 리터럴

- 개요
- tagged Template
- String.raw
- String.raw(): 문자열 전개, 조합

### Array 오브젝트

- from(): Array 오브젝트 생성
- of(): 배열 엘리먼트 설정
- copyWithin(): 범위 값 복사, 설정
- fill(): 범위 값 변경
- entries(): 이터레이터 오브젝트 생성
- keys(): Key 이터레이터 오브젝트 생성
- values(): value 이터레이터 오브젝트 생성
- find(): 엘리먼트 값 비교, 반환
- findIndex(): 배열 인덱스 반환

### RegExp 오브젝트

- unicode 플래그
- sticky 플래그

### Generator 오브젝트

- 개요
- function* 선언문
- function* 표현식
- GeneratorFunction(): 제너레이터 함수 생성
- yield: 제네레이터 함수 실행, 멈춤
- next(): yield 단위로 실행
- next() 활용
- next()의 다양한 형태
- return(): 이터레이터 종료
- throw(): Error 발생
- yield* 키워드

### Class 오브젝트

- Class 선언문
- Class 표현식
- 클래스 특징
- constructor
- constructor 반환 값 변경
- getter, setter
- 상속
- extends 키워드
- super 키워드
- 빌트이 오브젝트 상속
- Object 에서 super 사용
- static 키워드
- Class 호이스팅
- computed name
- this
- 제너레이터
- new.target
- Image 오브젝트 상속
- Class 방향성

### Symbol 오브젝트

- primitive
- Symbol(): Symbol 값 생성
- Symbol 값 변경
- Symbol 오브젝트 생성
- 오브젝트에서 Symbol 사용
- Symbol 사용 형태

### Symbol 프로퍼티

- Well-Known Symbol
- toStringTag
- isConcatSpreadable
- unscopables
- species 개녕
- species
- 다른 Class 반환
- null 반환
- toPrimitive
- 이터레이터
- 제너레이터
- match(): match 결과 반환

### Symbol 메서드

- for(): Symbol 값 저장
- keyFor(): key 값 반환
- toString(): 문자열로 변환
- valueOf(): Symbol 프리미티브 값
- getOwnPropertySymbols(): Symbol 프로퍼티 반환
- JSON.stringify(): JSON 형태로 변환

### Map 오브젝트

- 개요
- new Map(): Map 인스턴스 생성
- set(): key 와 value 설정
- get(): key 가 같은 value 반환
- has(): key 존재 여부
- entries(): 이터레이터 오브젝트 생성
- keys(): key 반환 이터레이터 오브젝트 생성
- values(): value 반환 이터레이터 오브젝트 생성
- forEach(): 엘리먼트마다 콜백 함수 호출
- delete(): 엘리먼트 삭제
- clear(): 모든 key, value 지움
- Symbol.iterator: 이터레이터 오브젝트 생성

### WeakMap 오브젝트

- 개요
- new WeakMap(): WeakMap 인스턴스 생성
- set(): key, value 설정
- get(): key가 같은 value 반환
- has(): key 존재여부
- delete(): 엘리먼트 삭제

### Set 오브젝트

- 개요
- new Set(): Set 인스턴스 생성
- add(): value 추가
- has(): value 존재 여부
- entries(): 이터레이터 오브젝트 생성
- values(): value 반환 이터레이터 오브젝트 생성
- keys(): key 반환 이터레이터 오브젝트 생성
- forEach(): 엘리먼트마다 콜백 함수 호출
- delete(): 엘리먼트 삭제
- clear(): 모든 value 지움
- Symbol.iterator: 이터레이터 오브젝트 생성

### WeakSet 오브젝트

- 개요
- new WeakSet(): WeakSet 인스턴스 생성
- add(): value 추가
- has(): value 존재여부
- delete(): 엘리먼트 삭제

### Proxy 오브젝트

- 개요
- 트랩, 핸들러

### Proxy Trap

- new Proxy(): Proxy 인스턴스 생성
- set(): key, value 설정
- this와 트랩
- get(): 프로퍼티 값 반환
- has(): 키 존재 여부
- defineProperty(): 프로퍼티 추가, 값 변경
- deleteProperty(): 프로퍼티 삭제
- preventExtensions(): 프로퍼티 추가 금지
- isExtensible(): 프로퍼티 추가 기능 여부
- getPrototypeOf(): prototype 반환
- setPrototypeOf(): __proto__ 에 prototype 설정
- ownKeys(): 프로퍼티 키 반환
- getOwnPropertyDescriptor(): 디스크립터 반환
- construct(): 인스턴스 생성
- apply(): 함수 호출
- revocable(): Proxy 무효화

### Reflect 오브젝트

- 개요
- get(): 프로퍼티 값 반환
- set(): key, value 설정
- has(): 키 존재 여부
- apply(): 함수 호출
- construct(): 인스턴스 생성
- defineProperty(): 프로퍼티 추가, 값 변경
- deleteProperty(): 프로퍼티 삭제
- getOwnPropertyDescriptor(): 디스크립터 반환
- getPrototypeOf(): prototype 반환
- setPrototypeOf(): __proto__ 에 prototype 설정
- preventExtensions(): 프로퍼티 추가 금지
- isExtensible(): 프로퍼티 추가 기능 여부
- ownKeys(): 프로퍼티 키 반환

### Promise 오브젝트

- 개요
- Promise 상태
- new Promise(): Promise 인스턴스 생성
- then(): 성공, 실패 핸들러
- catch(): 실패 핸들러
- resolve(): 성공 상태의 인스턴스 반환
- reject(): 실패 상태의 인스턴스 반환
- all(): 모두 성공이면 핸들러 실행
- race(): 처음 한 번만 핸들러 호출

### ArrayBuffer 오브젝트

- Typed Array
- Typed Array 구현 요소
- ArrayBuffer 개요
- new ArrayBuffer(): ArrayBuffer 인스턴스 생성
- slice(): 지정 범위 복사
- isView(): TypedArray, DataView 여부
- Symbol.species: constructor 반환

### TypedArray 오브젝트

- 개요
- 비트 값 구성
- new TypedArray(length): 엘리먼트 수로 TypedArray 생성
- new TypedArray(TypedArray): TypedArray로 TypedArray 생성
- new TypedArray(object): 오브젝트로 TypedArray 생성
- new TypedArray(ArrayBuffer): ArrayBuffer로 TypedArray 생성
- BYTES_PER_ELEMENT: 엘리먼트의 바이트 수
- buffer: 사용한 ArrayBuffer 반환
- byteOffset: ArrayBuffer 의 오프셋 값
- from(): TypedArray 생성
- of(): TypedArray 생성 및 값 설정
- set(): TypedArray에 값 설정
- subarray(): ArrayBuffer 값 복사
- Symbol.iterator(): 이터레이터 오브젝트 생성
- Symbol.species(): constructor 반환
- copyWithin(): 범위 값 복사
- 구조체

### DataView 오브젝트

- 개요
- new DataView(): DataView 생성
- 엔디언
- getInt8(): 사인 부호가 있는 8비트 값 반환
- setInt8(): 사인 부호가 있는 8비트 값 설정
- setUnit(): 사인 부호가 없는 8비트 값 설정
- setInt16(): 사인 부호가 있는 16비트 값 설정



