[![104515374](https://lh3.googleusercontent.com/lJdW39Non-jal3fVnjH6-GGmcvx42DzOSK2pAroPDmuO5hkbCG0a3gYiKgDayfMMTpDeZq6oJlDkxUuGjOJ0112jCkxRQb2f1hmWWDY4EiF3istxy_O_OotMOLRT0kIwnRLPsBOJtb-3-KYCAzJ1cth9Ah-3ZZqFJK_HkSbARqyUyRggGyhqVDqH0QBv-wtOKagcy78pF42fwCZA3fFSvjJAnri4axE4NADnr56OVvxjjtDTjqfBElDGKRaZddvLpM0X_XV-ZbDIp-CwnUf9jM2EZf8cWvUDijmOWt_IBhMk4KbOVcOno5TKQBo6Mcu472LsA7YUu1QYvZgIp95IFzUyfhO6KPhaeEXC9_L-8t8DIYonlLnNPxn6re0Kt2t7Dpe6YcKQv0Ls4ZF44yqDmAcXGr0erlZLb60WzbIliTorJc1WZcYqRVYkcBO0yU5NCacLEb7Tn5KIHZIkGF2nvIgXJEWHSeORbnUsh72cCSLF4UUOlH3Br3z8yNTdjInXNVNFBXIcPMqHbPR7uuHYWQzfljnrBDGwJYvB39ZYn6AxwZRcDIOdqFBp1AntYYm4tB9Or7DVp2nTN3Wv4DCiay77yqi-3KvEuRMfaGURi9tC0qD19HtangZLclVejib9pFsUQ2sMDUWXjLE-7tMwwwXQbQ8QSjeD=w500-h656-no)](http://www.yes24.com/Product/Goods/20103050?scode=032&OzSrank=1)

# RESTful Web API - 레오나르드 리처드슨. 마이크 애먼슨. 샘 루비

웹 프론트엔드 개발자는 `제공받은 API`를 이용해 사이트를 구축한다. 그러기 위해서는 `RESTful Web API`가 무엇인지를 정확히 알고 있어야 한다.

이 책은 `API`에 대해서 상당히 친절하고, 부드럽게 얘기해 주고 있다.

## 머리말

이 책은 API 클라이언트를 어떻게 작성하는지를 설명하는 책은 아니다. 

현존하는 대부분의 API 디자인이 수년전에 세워진 가설에 기반하고 있고, 이것의 가장 큰 문제점으로 한번 배포하고 나면, 변경하기 어렵다는 것에 있다.

웹의 스케일은 계속 커져가기 때문에, 변경할 수 있는 디자인의 필요성이 있고, 그것을 설명하는 것에 방점이 있다.

- 상업적으로 성공한 API는 수년간 유효할 것이다. 어떤 API는 수백 또는 수천명의 사용자가 있다. 문제의 도메인이 가끔 바뀌는 수준이라 할지라도 고객들에게 미치는 영향의 총합은 엄청나게 크다.
- 어떤 API 는 새 데이터 요소와 비즈니스 규칙이 계속 추가됨에 따라 항상 변화한다.
- 어떤 API는 각 고객이 필요에 따라 작업 흐름을 변경할 수 있다. API 자체는 결코 변화되지 않지만 각 고객마다 API를 사용하는 경험은 달라질 수 있다.
- 보통 API 클라이언트를 작성하는 사람들은 서버를 작성하는 사람과 다른 팀에서 일한다. 모든 오픈된 API는 이 카테고리에 속한다. 어떤 종류의 클라이언트가 있는지 잘 모른다면, 변화를 가하기 전에 매우 주의를 기해야만 한다. 아니면 모든 클라이언트를 망가뜨리지 않고 변화할 수 있는 디자인이 필요하다.

## 목차

### 웹서핑하기

이미 친숙한 RESTful 시스템인 웹 사이트를 통해 기본 용어를 설명한다

### 간단한 API

1장에서 다룬 웹사이트와 같은 기능을 수행하는 프로그래밍 가능한 API를 다룬다.

### 리소스와 표현

리소스는 HTTP 하부의 핵심 개념이고 표현은 REST 하부의 핵심 개념이다. 이 둘이 어떻게 연결되는지 설명한다.

### 하이퍼미디어

하이퍼미디어는 표현을 한데 모아 긴밀한 API로 만들어주는 필수 요소다. 하이퍼미디어가 어떤 일을 할 수 있는지를 친숙한 데이터 형식인 HTML 을 위주로 설명한다.

### 도메인 특화 설계

가장 명백한 전략은 처해 있는 그 문제를 해결하기 위해 완전히 새로운 표준을 디자인하는 것이다. Maze+XML 표준을 예로 들었다.

### 컬렉션 패턴

여러 패턴 중 컬렉션 패턴은 API 설계에서 반복해서 나온다. 이 패턴을 설명하기 위해 Collection+JSON과 AtomPub 라는 두 개의 다른 표준을 설명한다.

### 순수 하이퍼미디어 설계

컬렉션 패턴이 요구 사항에 맞지 않는다면 원하는 표현을 다목적의 하이퍼미디어포맷을 사용해 전송할 수 있다. 세 개의 다목적 하이퍼미디어 포맷(HTML, HAL, 사이렌)을 통해 어떻게 동작하는지 알아본다. 또, HTML 마이크로포맷과 마이크로데이터를 소개한다.

### 프로파일

프로파일은 (다양한 API가 사용할 수 있는) 데이터포맷과 특정 API 구현 사이를 메워준다. 추천하는 프로파일 포맷은 `ALPS` 이지만 `XMDP와 JSON-LD` 도 설명한다.

이 장에서 내 조언은 이 책이 쓰이는 시점의 최신 기술을 앞지른다. 충분한 포맷이 없어 이 책을 위해 `ALPS` 포맷을 작성했다. 하이퍼미디어 기반 디자인이 친숙하다면 8장까지는 건너뛰어도 좋지만 8장은 넘기지 말았으면 좋겠다.

9장부터 13장은 올바른 하이퍼미디어 포맷 선택하기, HTTP 프로토콜 최대한 활용하기 같은 실용적인 주제를 다룬다.

### 설계 절차

이 책에서 앞 장까지 다룬 모든 내용을 모아 RESTful API를 설계하는 단계적 가이드를 제시한다.

### 하이퍼미디어 동물원

하이퍼미디어가 어떤 것들을 할 수 있는지 보여주기 위해 20개의 표준화된 하이퍼미디어 데이터 포맷을 설명한다. 이들 대다수는 이 책의 다른 부분에서는 전혀 다루지 않는다.

### API를 위한 HTTP

API를 구현할 때 HTTP를 모범적으로 사용하는 방법을 알려준다. 또 HTTP 2.0 프로토콜을 포함해 HTTP 확장에 대해서도 설명한다.

### 리소스 설명과 연결된 데이터

연결된 데이터(Linked Data)는 REST에 대한 시맨틱 웹 커뮤니티의 접근법이다.
JSON-LD는 연결된 데이터 표준에서 가장 중요한 내용이다. 8장에서 간단히 다루었는데, 여기서 다시 설명한다. RDF 데이터 모델과 10장에서 다루지 못한 RDF 기반의 하이퍼미디어도 설명한다.

### CoAP: 임베디드 시스템을 위한 REST

HTTP를 전혀 사용하지 않는 RESTful 프로토콜인 CoAP를 다루며 책의 주요 부분을 마감한다.

## 주의 사항

이 책은 특정 언어에 매이지 않는다. 모든 코드는 네트워크 프로토콜(주로 http) 위에 보내지는 메시지 형태를 띤다.

저자는 독자가 안티패턴, 너비 우선 탐색 같은 일반 프로그래밍 개념에 친숙하며 월드와이드웹이 어떻게 돌아가는지 기존적 이해를 하고 있다고 가정하고 있다.

책에 제시되지는 않지만, `https://github.com/RESTful-Web-APIs` 에 `node.js` 기반의 예제코드를 볼 수 있다.

