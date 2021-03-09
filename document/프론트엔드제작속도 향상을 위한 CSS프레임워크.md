
# 프론트엔드 제작속도 향상을 위한 스타일 프레임워크

디자인은 항상 다르지만, 스타일로 옮길 때, 처음부터 끝까지 작업하는 것보다, 형태가 유사한 사전 작성된 코드를 옮겨서 수정하는 것으로 작업효율을 높일 수 있다. 
(프레임워크의 지원만으로 100% 제작하는 것은 실상 불가능 하지만, 작업시간의 30% 라도 단축할 수 있다면 의미가 있다.)

즉 재사용성과 확장성이 좋은 스타일 프레임워크를 도입하면, 작업효율을 높일 수 있다.


## 작업방법 분석


### 일반적 작업단계

1. PSD 를 연다
2. 스타일가이드 집합페이지를 브라우저로 열고, 디자인과 유사한 마크업과 스타일을 찾는다
3. 새로 작성할 html 을 생성하고, 가이드의 마크업과 스타일을 붙인다
4. 디자인을 맞추기 위한 마크업, 스타일을 수정한다
5. 새로운 디자인이 있을 경우 신규로 스타일을 작성한다
6. 기획서의 기능을 확인 후 작성한다


### 단위별 분류

- 기획서 확인 : 효율기대 0%
- 마크업 작성 : 효율기대 50%
- 스타일 작성 : 효율기대 50%
- 자바스크립트 작성 : 효율기대 50%
- 테스트코드 작성 : 효율기대 0%
- 리팩토링 : 효율기대 0%

`기획서 확인, 테스트코드, 리팩토링` 은 어쩔수 없이 시간을 들여야 하는 부분이라, 효율을 기대하기는 어렵고, `마크업, 스타일, 자바스크립트` 같은 경우 프레임워크의 도움을 받을 수 있다.


## 스타일 프레임워크

잘 알려진 스타일 프레임워크는 아래와 같다.

- [bootstrap](https://getbootstrap.com/) : 부동의 1위, 일반적이며, 사용자층도 높지만, 정교한 UI를 작성하는 데에는 어려움이 있다.
- [Materialize CSS](https://materializecss.com/) : 
- [Bulma](https://bulma.io/) : 기초적인 설계만 되어있다. 장점이라면 가볍다 정도로 보인다.
- [Semantic UI](https://semantic-ui.com/) : 직관적이고 이해하기 쉬운 네이밍룰, 다양한 예제, 풍부한 레퍼런스
- [Foundation](https://foundation.zurb.com/) : 많은 기능과 충분한 문서를 제공하고 있지만, 웬지 익숙하지 않은 사용법, 클래스명 조합방법 이나 의미부여 등이 낯설다.
- [Tailwind CSS](https://tailwindcss.com/) : 많은 기능이 제공되는데 사용이 어렵다. 하지만, 꽤 설계가 잘되어서 익숙해 지고 나면 효율적으로 사용이 가능하다.

사용해보고 괜찮게 사용할 수 있는 순위로 정리해 보았다.


### [Semantic UI](https://semantic-ui.com/)

직관적이고 이해하기 쉬운 네이밍룰, 다양한 예제, 풍부한 레퍼런스를 제공해 준다.

인상적인 것은 클래스네이밍 이나 사용법들이 메뉴얼을 보지 않고도, 대략 알 수 있었다.

![](https://lh3.googleusercontent.com/ibufPDAaaNYzEMhkA_G0YuInmZOLdfrJH9qhzoerK9hok2lLiQfKhxvqpnpcvq_Ng8cVaEbfkVVWhndrS2I0j1y72Uz9N_q8VhCoxDgUlfEF7ZbmxF_ORREoP763fRARY48507lKb_85UF5EO36_rzZtMMSb7OfjPthtfOq0rZwFENGWrjbHWWgJjOL_ObAMAM8TO6R7fTSLoN5kvegb6ibUsvOKKQjDREnWdhazGSG8VFhfOZ1ZX66A5X2I9eMPKlhnCwlT5_H_R5OoFAJdc_0LbXNPBPyw8OqLOx9MWbRLIP14exmG0DRuo_-XCMbnXjDqBvUydgGEKQ3JBUv3-_G4_HlUKp_R-Dz7jMNkeu-Axso8YZVooibh-buKP7uwRrG5Wpu2cXp1m1La1cKQgLuTX9iWpbTzIUn2NlyyD-6BSo7lt9_LattzFNpYa96b4tIcInxke93F-aPlA8B6Fj3VBT8CezMOhCe1Dh_Cv5N1laWqU8wnxoITxAqfpEe2hywaxGdGnHYlitXm4q3j764k49qEtg9lCJaev9POGD7e8ml1nZzeVWF5_BTtCFTRYUjLsc5tN0idWPBOFkuZXFVcZZG0JH7X09rvp0nW-dxdGb1CfLzKkH3zWHy1BSdnCbU2LAZ8GYIg9FUF1QIEpd7jqZXjLh-i=w223-h1057-no)


#### 특징

- [테마설계 제공](https://semantic-ui.com/usage/theming.html)
 
확장성을 위해 테마를 제공하는데, 테마는 상속구조로 `UI Defaults < Packaged Theme < Site Theme` 로 덥어쓰기 된다.


#### 그리드시스템

- [그리드 사용하기](https://semantic-ui.com/examples/grid.html)

그리드의 유형을 나눠서 사용법을 설명하고 있다.

- Container
- Text Container


#### 지원컴포넌트


#### 확장성



### [bootstrap](https://getbootstrap.com/) 

부동의 1위, 일반적이며, 사용자층도 높지만, 정교한 UI를 작성하는 데에는 어려움이 있다.


#### 그리드시스템


#### 지원컴포넌트


#### 확장성



### [Foundation](https://foundation.zurb.com/) 

많은 기능과 문서도 충분히 제공하고 있지만, 웬지 익숙하지 않은 사용법, 클래스명 조합방법이나 의미부여 등이 낯설다.


#### 그리드시스템

#### 지원컴포넌트

#### 확장성


### [Tailwind CSS](https://tailwindcss.com/) 


많은 기능이 제공되는데 사용이 어렵다. 하지만, 꽤 설계가 잘되어서 익숙해 지고 나면 효율적으로 사용이 가능하다.


#### 그리드시스템

#### 지원컴포넌트

#### 확장성


### [Materialize CSS](https://materializecss.com/) 

#### 그리드시스템

#### 지원컴포넌트

#### 확장성


### [Bulma](https://bulma.io/) 


기초적인 설계만 되어있다. 장점이라면 가볍다 정도로 보인다.


#### 그리드시스템

#### 지원컴포넌트

#### 확장성


## 결론


프레임워크의 러닝커브가 적으면서, 기능의 부족함이 없는 것을 기준으로 봤을 때 `Semantic UI` 가 가장 적절하다는 생각을 했다.

이 프레임워크의 설계자는 `사람 친화적 HTML 코드를 사용해서 개발할 수 있도록 도와주는 프레임워크` 라고 소개하고 있는데, 클래스명에 군더더기도 없고, 이해하기도 좋고, 사용을 조금만 해보아도 확실히 이해하기 좋은 설계방식과 작명 철학 으로 인해서, 금방 암기가 되어 암산이 될 정도로 러닝커브가 적다고 판단했다.

`친숙한 느낌, 이해하기 좋은 형태, 부족함 없는 기능` 이라는 생각이 들었다.

스타일 프레임워크가 설계하고 있는 그리드를 이해하고, 기본스타일이 어느정도 익숙해 지고 나면, 꽤 효율을 가져갈 수 있을것으로 생각한다. 
주의할 점은 스타일 프레임워크는 대부분 반응형을 기본설계로 가져가기 때문에, 데스크탑뷰와 모바일뷰를 상상하며 코드작성을 해야 한다.

