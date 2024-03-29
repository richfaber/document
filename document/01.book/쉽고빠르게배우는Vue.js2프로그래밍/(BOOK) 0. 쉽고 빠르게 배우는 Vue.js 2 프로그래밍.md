# (BOOK) 0. 쉽고 빠르게 배우는 Vue.js 2 프로그래밍 - 알렉스 키리아키디스, 코스타스 매니아티스/박창주

[![9791158390754](https://lh3.googleusercontent.com/-Xh-CwPEt9k8/Wh4ziawNEFI/AAAAAAAATFk/aaG1Y6IaoWU1E2uXh-S8IuABLj6k7NoFwCHMYCw/I/9791158390754.png) 쉽고 빠르게 배우는 Vue.js 2 프로그래밍](http://www.yes24.com/24/goods/44271600?scode=032&OzSrank=1)

자바스크립트 프레임워크가 사용되기 시작한 것이 꽤 되어서 이제 사용자층이 조금은 두터워 진거 같다. 서버사이드에서 클라이언트사이드로 넘어가는 시점이라는 생각이 든다. 하지만 제이쿼리 같이 **당연히 할 줄 알아야 되는거 아닌가?** 라는 생각이 들 정도의 사용자층이 두꺼운 것은 아니다.

(어떤 기술이 대중화 되기 전에 그렇듯이 선진적으로 학습한 개발자들 중에, 극소수 개발자들은 신기술을 모른다며 무시하고 막말을 던지는 블로그글이나 유튜브가 나오는 상태랄까. 자신이 가진게 얼마나 없으면, 검색하면 1시간이면 알 수 있는 지식들을, 엄청 대단할 걸 알았다는 듯이 비하글과 영상을 찍어올리는지, 자랑까지만 하면 잘했다-대단하다 할텐데, 못난 너희들은 지금까지 뭘했냐는 듯 얘기하는건 밥맛이다. 휴우~)

프레임워크는 Angular, React, Vue로 정리되는듯 보이고, Vue의 학습비용이 다소 적다는 이유로 최근에 각광을 받고 있다.

개인적으로 앵귤러를 좋아하지만, Vue를 알고는 있어야겠다 싶어 책으로 공부하는걸 좋아하는 나는 검색해봤지만, 거의 없다. 아무래도 [Vue 사이트의 document](https://kr.vuejs.org/v2/guide/index.html) 가 한글정리로 잘 되어 있는 이유도 있을거 같고, 사용자층이 얕은 탓도 있을거 같다.

초판버전이 2014년2월 이니까 Vue.js는 나온지 꽤 됐다. [위키백과에 나오는 글](https://ko.wikipedia.org/wiki/Vue.js)을 인용하면

> Vue.js는 웹 개발을 단순화하고 정리하기 위해 개발된 대중적인 자바스크립트 프론트엔드 프레임워크이다.
> 
> 이 프로젝트는 웹 UI 개발(컴포넌트, 선언형 UI, 핫 리로딩, 타임 트래블 디버깅 등)의 아이디어를 더 접근 가능하도록 만드는데 초점을 둔다. 덜 독선적이도록 시도하고 있기 때문에 개발자들이 익히기에 더 쉽다.
> 
> 점진적으로 채택 가능한 구조를 갖추고 있다. 코어 라이브러리는 선언형 렌더링과 컴포넌트 구성에 초점을 두며 기존 페이지에 임베드가 가능하다. 라우팅, 상태 관리, 빌드 도구화와 같이 복잡한 애플리케이션에 필요한 고급 기능들은 공식적으로 유지 보수되는 지원 라이브러리와 패키지를 통해 제공된다. 

올해는 깃허브의 스타카운터가 Jquery, Angular1.x를 넘어섰다고 하니, Vue에 대한 관심이 뜨거워지고 있다는 것을 알 수 있다.

이 책은 

![Alex-Kyriakidis_1](https://lh3.googleusercontent.com/-thQf1FGnI-s/Wh45z6hI7OI/AAAAAAAATF0/_3CaTDzP1wocsJ3DYFMihd1u-asZCgY9wCHMYCw/I/Alex-Kyriakidis_1.jpg)
알렉스 키리아키디스(부들부들)

![WtLhSrQO_400x400](https://lh3.googleusercontent.com/-N0U3gCw1m4Y/Wh46Q0VwBdI/AAAAAAAATF4/6VNauifqaFAj7UcJeBABFBeRRHkznjllgCHMYCw/I/WtLhSrQO_400x400.jpg)
코스타스 매니아티스(오.. 훈남)

의 글을 박창주님이 옮겼다 한다.

어려운 내용을 최대한 쉽게 설명하기 위해 기술했다고 하니, 설명이 친절할 것으로 예상된다. 대충 훑어 보기에는 섹션분리를 정말 잘해뒀다는 느낌이 들었다. 그것은 곧 개념이 머리에서 완벽히 정리된 상태에서 쓰였다는 의미이기도 하며, 좋은 책일거 같다는 생각에 두근두근 해졌다.

목차는

## 1부 Vue.js 기초

- Vue.js 소개
- 다른 프레임워크와의 비교
- 들어가며

### 1장 Vue.js 설치

- 독립 실행 버전
- npm 사용
- bower 사용

### 2장 시작하기

- 안녕하시나이까 전하!
- 양방향 바인딩
- jQuery와의 비교

### 3장 디렉티브

- v-show
- v-if
- v-else
- v-if vs v-show

### 4장 리스트 렌더링

- 부트스트랩 설치와 사용
- v-for
- 배열 렌더링
- v-for를 이용한 객체 프로퍼티 순회

### 5장 상호작용

- 이벤트 처리
- 이벤트 한정자
- 키 한정자
- 계산된 프로퍼티

### 6장 필터

- 필터링된 결과
- 결과 정렬
- 사용자 정의 필터
- 유틸리티 라이브러리

### 7장 컴포넌트

- 컴포넌트란?
- 컴포넌트 사용하기
- 템플릿
- 프로퍼티
- 재사용성

### 8장 사용자 정의 이벤트

- 발생과 청취
- 부모-자식간 통신
- 인자 전달
- 비부모 자식 간 통신
- 이벤트 리스너 제거
- 이야기로 돌아가서

### 9장 클래스와 스타일 바인딩

- 클래스 바인딩
- 스타일 바인딩
- 바인딩 예제

## 2부 API 사용하기

### 10장 API 사용하기

- CRUD
- API

### 실제 데이터 활용하기

- 비동기로 데이터 가져오기
- 리팰터링
- 데이터 갱신
- 데이터 제거

### HTTP 클라이언트 활용

- 개요
- vue-resource
- axios
- axois 사용하기
- 기능 개선

### 페이지 처리

- 구현
- 페이지 처리 링크

## 3부 대규모 애플리케이션 구축

###  ECMAScript 6

- 소개
- 변수 선언
- 화살표 함수
- 모듈
- 클래스
- 기본 매개변수 값
- 템플릿 리터럴

### 고급 워크플로우

- Babel을 이용한 es6 컴파일
- Gulp를 이용한 워크플로우 자동화
- Webpack을 이용한 모듈 번들링

### 단일 파일 컴포넌트

- vue-cli
- Webpack 템플릿
- vue 파일 만들기

### 중복 상태 제거

- 프로퍼티를 이용한 공유
- 전역 저장소

### 컴포넌트 교체

- 동적 컴포넌트

### Vue 라우터

- 설치
- 사용법
- 이름을 가지는 라우트
- 히스토리 모드
- 중첩 라우트
- 자동 active 클래스 설정
- 라우트 객체
- 동적 세그먼트
- 라우트 별칭
- 라우트 푸시
- 트랜지션
- 내비게이션 가드

그 외에 부록들이 있다.

크흑.. 라우터가 마지막에 있네, 끝까지 다 읽어야 하는구나 =_=

작정하고 4일동안 다 보기로 결정했다. 하루에 1부를 봐야하고 대략 120페이지 정도 되며, 1시간에 20페이지 볼 수 있다고 치면, 6시간 봐야 한다. 크흙 화이팅.




