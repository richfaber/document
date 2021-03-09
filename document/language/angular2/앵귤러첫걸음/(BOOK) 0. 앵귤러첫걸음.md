# 앵귤러 첫걸음 - 조우진


[![thumbs](https://lh3.googleusercontent.com/-DP_1WlcsJxw/WWHQ9TJixuI/AAAAAAAASKE/ndaT8Dslq1Ivom24xHoYd9w_eQObvMQwwCHMYCw/I/thumbs.jpg)](http://www.yes24.com/24/Goods/41070512?Acode=101)

사람마다 학습을 하는 방식은 제각각 다를텐데, 나는 한글자 한글자 들여다보며 정리하고, 따로 실습 하고, 학습하는 부분에서 단 한가지라도 이해가 가지 않으면, 기억조차 나지 않는 신기한 현상이 일어나기 때문에, 하나를 학습 하는데 많은 시간과 노력을 들여야 하는 전형적인 공부 못하는 체질 이다. ㅋㅋㅋㅋ

이러한 이유로 나에게 가이드가 되어 지는 책이 아주 중요한데, Angular2 이상 버전의 가이드가 될 만한 것이 `사막` 인 지금 상황에서 이책은 나에게 아주 단비같은 책이다.

우선 앵귤러2 상위버전의 책이 2권이 있는데, 그중 이 책이 독자평이 상당히 좋게 올라와 있고, ebook 으로 잠시 봤었는데, 내가 아는 지식을 나열 한다는 느낌 보다는, 읽는 독자의 이해를 돕기 위해 노력했다는 느낌이 전해져 왔기에 선택 하게 되었다.
(이런 책을 볼때마다 흥분 되고 기쁨을 감출 수 없는 것은 변태라는 증거일까?)

현재는 대충 React, Vue.js 와 AngularJS(2버전 이후부터는 Angular로 개명) 로 정리된듯 하다. 언제 뭐가 튀어나올지 모르겠지만, 나는 이상하게도 앵귤러가 끌린다.
하지만 다른 프레임워크에 비해 예상한 대로 결과가 나오지 않는 것은 기분탓 이겠지.

서평에서 저자는 앵귤러의 높은 러닝커브를 잘 이해하고 있고, 앵귤러가 어떻게 굴러 가는지 조금 이라도 도움이 되고 싶어서 책을 쓰게 되었다고 한다. 
독자의 대상을 어떻게 두었는지도 상당히 중요한데, 백엔드개발을 하면서 프론트엔드를 하는 개발자를 염두에 두었다고 한다. (이 얘기는 HTML,CSS 빼고, 서버환경, 라우터구성, 데이터모델링 까지 한다는 얘기다.)

총 500페이지 이고, 근래에는 적어도 한달안에 책을 다 봐야 이 수많은 기술들을 빠르게 체득할 수 있기 때문에, 한주에 적어도 100페이지는 읽어야 5주안에 끝날 수 있다.
즉 한 주에 100 페이지 정도 보면 되고, 일주일에 한 챕터를 끝내면 된다.(술만 안 먹으면 할 수 있어... 못하겠군.)


## 목차

### 기초 다지기

#### 앵귤러 준비하기

- Node.js 

- NPM 다루기
    - 패키지 설치
    - 실습: welcome-msg-app
    - 패키지와 의존 관계
    - 로컬 환경과 전역 환경
    - package.json

- 마치며

#### 앵귤러 시작하기

- 타입스크립트
    - 타입 언어
    - 상위 언어
    - 열린 언어
    - 에디터 설정

- Hello, Angular
    - ng new
    - ng serve
    - ng test
    - 타입 선언 정보

- 마치며

#### 앵귤러 아키텍쳐

- 뷰를 구성하는 요소
    - 컴포넌트와 템플릿
    - 컴포넌트 생명 주기
    - 컴포넌트 트리
    - 데이터 바인딩
    - 마치며

- 애플리케이션을 완벽하게 만드는 요소
    - 서비스와 의존성 주입
    - 상태 관리 및 공유
    - 지시자
    - 파이프
    - 모듈

- 머티리얼 패키지 적용

- 마치며

### 기본기 향상하기

#### 뷰를 구성하는 기초

- 컴포넌트
    - 컴포넌트의 선언
    - 메타데이터
    - 부트스트래핑
    - 컴포넌트 트리
- 템플릿
    - 절차적 방식과 선언적 방식
    - 데이터 바인딩
    - 지시자
    - 파이프
- 마치며

#### 견고한 애플리케이션 만들기

- 서비스
    - 서비스의 생성과 사용
    - 실습: 마우스 위치 로거
    - 싱글턴으로서의 서비스

- 의존성 주입
    - Injecttable, Inject 데코레이터
    - providers
    - 의존성 주입기 트리
    - Host, Optional 데코레이터

- 테스트 코드작성
    - 서비스 테스트
    - 컴포넌트 테스트

- 디버깅

- 마치며

#### 컴포넌트 고급

- 독립된 요소: 컴포넌트
    - 웹 컴포넌트
    - 컴포넌트와 스타일 정보
    - 컴포넌트의 독립성을 깨뜨리는 안티패턴

- 컴포넌트 간 상태 공유와 이벤트 전파
    - 부모-자식 컴포넌트 간의 통신
    - 실습: 컴포넌트 통신 V2
    - 다양한 상태 공유 시나리오
    - 싱글턴 서비스를 이용한 상태 공유

- 앵귤러 방식의 템플릿 요소 탐색
    - ViewChild를 사용한 요소 탐색
    - 템플릿 참조 변수와 ElementRef
    - Content Projection과 ContentCHild를 사용한 요소 탐색

- 컴포넌트 생명 주기
    - ngOninit과 ngOnDestroy
    - ngAfterContentInit과 ngAfterViewInit
    - ngOnChanges
    - ngDoCheck
    - ngAfterContentChecked와 ngAfterViewchecked
    - 지시자의 생명 주기

- 마치며

#### HTTP 통신과 RxJS

- HttpModule과 http 서비스 기초
    - 실습: 초간단 사용자 조회 애플리케이션
    - angular-in-memory-web-api 활용

- RxJS
    - 왜 RxJS 인가?
    - RxJS 원리
    - RxJS 연산자 활용
    - RxJS를 활용한 마우스 위치 로거 코드 개선

- 게이트웨이 기반 Http 서비스 활용
    - ApiGateway 서비스
    - 실습: 사용자 관리 애플리케이션
    - HTTP 통신 관련 중복 코드 제거

- 마치며

#### 폼다루기

- 폼의 구성
    - 폼 모델
    - AbstractControl과 폼의 값 상태
    - 폼 지시자
    - 실습: NgModel과 FormControl

- 템플릿 주도 폼
    - ngModel과 양방향 바인딩
    - 실습: 템플릿 주도 폼
    - 폼 유효성 검증
    - 커스텀 Validator 지시자 작성

- 반응형 폼(모델 주도 폼)
    - ReactiveFormsModule
    - FormBuilder
    - 실습: 반응형 폼
    - 실습: 동적 폼

- 마치며

#### 앵귤러 동작 원리

- 부트스트랩과 컴파일
    - 애플리케이션의 최초 진입정
    - JIT 컴파일
    - AOT 컴파일
    - 부트스트랩 과정 분석

- Zone.js 와 변화감지
    - 앵귤러를 움직이게 만드는 세 가지 이벤트
    - Zone.js 를 활용한 비동기 코드 감지
    - 상태 변화를 일으키는 세가지 이벤트
    - 변화 감지 트리와 변화 감지 전략

- 마치며

### 깊이 들어가기

#### 프로젝트: 상품 관리 애플리케이션 구성

- 애플리케이션 설계
     - 기능 정의 및 도메인 모델
     - 컴포넌트 트리

- 프로젝트 구성

- 프로젝트 구현1: 기본 레이아웃 구현
    - 주요 컴포넌트 생성
    - 컴포넌트 구현 코드
    - 라우터 없이 사이드바 기능 구현

- 마치며

#### 모듈과 라우터

- 모듈의 분리
    - 기능 모듈
    - 핵심 모듈
    - 모듈의 imports, exports
    - 프로젝트 구현2: 도메인별 기본 구현

- 라우터 기본
    - 라우터 설정: Route
    - Routes 등록
    - RouterLink, RouterLinkActive
    - 프로젝트 구현3: 라우터 설정
    - 라우터 사용의 장점

- 라우터 활용
    - 상태 관리
    - Router
    - ActivatedRoute
    - 가드의 설정

- 모듈별 라우터
    - 컴포넌트 경로
    - 라우팅 설정 분리하기
    - 프로젝트 구현4: 라우터 설정 분리

- 마치며

#### 프로젝트: 파이어베이스 사용

- 파이어베이스 사용
    - 프로젝트 생성
    - 파이어베이스 CLI
    - 파이어베이스 연동

- 프로젝트 구현5
    - 도메인 모델 클래스 구현
    - 사용자 세션 기능 구현

- 프로젝트 구현6
    - 실시간 데이터베이스 사용
    - NoCounterService 구현
    - DataStoreService 구현
    - 파이어베이스 보안 규칙 설정

- 마치며

#### 프로젝트: 상품 관리 애플리케이션 구현 최종

- 프로젝트 구현7
    - 카테고리 관리 뷰
    - CategoryDetailComponent
    - CategoryDetailResolverService
    - CategoryItemComponent
    - CategoryManagemenetComponent
    - CategoryListResolverService
    
- 프로젝트 구현8
    - 상품 관리 뷰
    - ProductDetailComponent
    - ProductDetailResolverService
    - ProductlistComponent
    - ProductListResolverService
    - CheckedProductSetService
    - ButtonGroupComponent
    - ProductBulkUpdaterService
    - ProductManagemenetComponent

- 프로젝트 최종 구현
    - MainDashboardComponent
    - 스피너
    - 상품 상태 파이프
    - CanDeactivate 가드 설정
    - 세션 카드

- 마치며

#### 부록

- ES6 표준의 의미
- 모듈 시스템
- 모듈 번들러
- 실습: area-calculator


