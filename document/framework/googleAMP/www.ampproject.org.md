# AMP 에 대하여

@refer: https://www.ampproject.org/ko

AMP는 HTML,CSS,JS 를 활용하는 일종의 라이브러리 이고, AMP 라이브러리가 제공하는 몇가지 규칙을 통해서 적용할 수 있다.

AMP (Accelerated Mobile Pages) 의 목적은 속도 향상에 기인한다. 

구글은 예전부터 웹OS 에 관심을 보여왔고, 형태는 다르지만 하나의 꾸준한 목표를 향해 가고 있다. 지금은 크롬 브라우저가 OS에 상관없이 탑재되어 크롬도구 들을 모든 인터넷 사용자가 사용하게 만들겠다는 느낌이 든다.

그런 구글의 수많은 노력들 중에 AMP 는 웹페이지 속도를 향상시키는 연구에 대한 결과물로 보인다.

웹사이트에서 개발자에게 몇가지 설계원칙을 얘기해 주고 있다.

- 불확실한 경우, 페이지 제작자나 라이브러리 개발자가 구현이 어렵다 하더라도, 최종 사용자 경험에 가장 적합한 것을 하십시요.
- AMP에 60fps 에서 안정적으로 동작하지 않는 기능이나 컴포넌트 도입 등의 즉각적인 로딩경험을 방해하는 기능을 넣지 마십시요.
- 더 빠른 브라우저가 나올 것이라는 가정 하게 설계하지 마십시요.
- AMP는 세련된 사용자경험 제공을 위한 기능들도 제공하지만, 그것이 사용자경험 관점에서 끔찍한 경험이 된다면, 개발을 중단할 수도 있습니다.
- 단계적 축소를 제공해야 합니다. AMP캐시 기능을 사용한다 하더라도, AMP 캐시없이도 동작할 수 있어야 합니다.
- 보안 또는 성능상의 이유로 필요한 경우를 제외하고는 특정사이트, 도메인 또는 출처에 대해 특별한 처리를 하지 않을 것입니다.
- 서버사이드에서 사용자 환경을 개선하는 것이 맞음에도 불구하고, 클라이언트 사이드에서 모든것을 해결하려고 하면 안됩니다.

이렇게 7가지 원칙을 두고 있다.

번역이라서 그런지는 모르겠지만, 개발자에게 얘기하는듯 하더니, 나는 이렇게 하겠다는 느낌이여서 혼란스러웠는데, 

"구글을 이런 원칙들을 지켜나가려고 한다. 다만 이의 사용자들도 같이 이 원칙들을 공유하길 바란다" 로 받아들였다.

## AMP가 성능을 향상시키는 방식

- 비동기 스크립트만 허용
: 브라우저 특성상 자바스크립트를 만나면 모든것을 중지하고 해석하기 때문에, 비동기 방식으로 로딩하는 것을 지향한다.

- 모든 리소스의 크기를 정적으로 지정
: 모든 HTML에 크기(width, height)를 명시해야 한다. 명시를 해두면 브라우저는 해당 객체의 높이너비를 계산할 시간을 줄일 수 있다.

- 확장 메커니즘이 렌더링을 차단하지 않도록 함
: AMP는 확장 메커니즘(라이브박스, 인스타그램, 트위터) 등이 페이지에 포함될 경우에, 페이지 렌더링을 차단하거나 하지는 않는다. 다만 사용자지정태그(Custom Tag) 를 사용해야 한다면 (예를들어 `amp-iframe`) AMP에게 알려줘야 한다.

`<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>`

- 모든 타사 Javascript를 주요 경로에서 제거
: AMP는 샌드박싱된 iframe 에서만 타사의 Javascript 를 허용한다. 외부의 스크립트 파일이 오류가 나더라도 iframe으로 샌드박싱 되었기 때문에, 현재 페이지에 영향을 끼치지 않게 된다. 덧붙여 자바스크립트 로드에 따라 DOM을 재해석하는 비용을 어느정도 줄인다.

- 모든 CSS는 인라인이어야 하며 크기가 한정되어야 한다.
: AMP HTML은 외부 CSS를 허용하지 않습니다. 또한 스타일시트의 최대 크기는 50KB로 제한합니다. 이는 CSS가 모든 렌더링을 차단하고, 페이지 로드를 차단하며, 팽창되는 경향이 있기 때문이다.

- 글꼴 트리거는 효율적이어야 한다.
: 웹폰트가 포함된 일반적인 웹사이트에서 브라우저는 방대한 용량의 웹폰트의 다운로드가 완료되기를 지속적으로 기다린다. AMP 시스템은 이런 대기시간이 없는데, 이유는 모든 스크립트가 비동기방식이고, 인라인스타일만 있기 때문에, 외부자원을 다운로드할 경우의 방해요소가 없기 떄문이다.

- 스타일 재계산 최소화
: 브라우저는 특정요소 한개만 바뀌어도 전체화면렌더링을 재계산 하기 때문에, 이를 보완하기 위해, Write보다 Read에 우선순위가 먼저 발생하도록 유도한다.

- GPU 가속 애니메이션만 실행
: GPU 가속이 사용되는 애니메이션 CSS만을 허용한다.

- 리소스 로드의 우선순위 지정
: AMP는 모든 리소스 다운로드를 제어하고, 우선순위를 지정하며, 필요한 최소한의 리소스를 다운로드 하고, 무거은 리소스는 뒤에 배치한다.

- 즉시 페이지 로드
: HTTP 요청 시 최대한 빠르게 수행되도록 보장하기 위해서 `preconnect API` 가 자주 사용됩니다. 이를 이용해서 사용자가 실제로 페이지에 접근해서 사용할 때쯤 이미 페이지가 로딩되어 있을 것이다.

- 여러분의 도움이 AMP를 더 빠르게 합니다.
: AMP는 오픈소스 작업이므로, 여러분의 도움이 AMP페이지를 더 빠르게 만듭니다.

그렇다면 이런 철학을 바탕으로 AMP 에 적용하기 위한 HTML,CSS,JS 방법에 대해서 알아보자

아래의 내용들은 전부 `https://www.ampproject.org/ko/docs/` 에서 확인이 된다.

## AMP 프로젝트 시작하기

처음에는 지원되는 모든 HTML,CSS,JS 의 스펙을 한눈에 보고 싶었는데, 따로 모아져 있는건 없고, 컴포넌트 목록들이 모아져 있다. 해당 스펙을 보고 제공하는 컴포넌트들을 사용하면 된다.

`https://www.ampproject.org/ko/docs/reference/components`

AMP 페이지 샘플로 나온 최소한의 적용코드는 아래와 같이 제안하고 있다.

```html
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>안녕하세요. AMP입니다.</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>모바일 웹에 오신 것을 환영합니다.</h1>
  </body>
</html>
```

정상적으로 로드가 되었다면 콘솔에 `Powered by AMP ⚡ HTML – Version 1811272154520` 이런 메세지가 출력된다.

> 외부 CSS와 JS를 쓰지 않기 때문에, 모두 inline 으로 박아 놓아야 한다. 물론 이렇게 페이지를 만든다는건, 기존의 방식으로는 안되고, minify를 수동으로 한다는건 상상도 할 수 없는 일이다.
> 
> **GULP 활용도구**
> 
> - https://www.npmjs.com/package/gulp-amperize
> - https://www.npmjs.com/package/gulp-amphtml-validator
> - https://blog.pagepro.co/2016/11/22/creating-amp-boilerplate-with-sass/
> 
> 도구의 힘을 빌리자! 

특징을 살짝 보면

```html
<html amp lang="en">
```
amp 속성 추가

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

구글의 amp용 스크립트 로딩

```html
<link rel="canonical" href="http://example.ampproject.org/article-metadata.html">
```
canonical 은 검색엔진 같은 문서해독하는 알고리즘이 참조할 수 있는 메타데이터 인데, `원본페이지` 의 의미를 가진다. AMP 에서는 원본페이지가 없다면 자기자신을 가르키고 있으면 된다고 권고하고 있다.

이 단서는 `http://www.example.com/page.html` 과 `http://www.example.com/page.html?param=1` 페이지의 내용이 동일함에도 검색엔진은 다르게 분류하기 때문에, 이런상황에 유용한 참조정보가 된다.

```json
<script type="application/ld+json">
{
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "headline": "Open-source framework for publishing content",
    "datePublished": "2015-10-07T12:02:41Z",
    "image": [
        "logo.jpg"
    ]
}
</script>
```

`Schema.org 정의` 가 되어 있는데, 선택적 메타정보이고, 필수는 아니지만 `구글주요뉴스` 에 포함이 되려면 필수입력 이라고 한다.

[Schema.org 에 대해서](https://www.twinword.co.kr/blog/schema-markup/)

간단히 생각하면 검색엔진이 태그의 의미를 죄다 알순 없고, 데이터로 뭉뚱그릴수 밖에 없기 때문에, 검색엔진에게 참조가 될 메타데이터를 정의하는 것으로 이해하면 된다.

```html
<style amp-boilerplate>
```

마지막으로 공통으로 사용할 스타일은 위와같이 `amp-boilerplate` 속성을 주어야 한다.

이렇게 하면 AMP가 필수적으로 포함해야 하는 최소한의 샘플페이지 완성이다.

### 이미지 포함하기

```html
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
```

AMP 페이지는 `amp-img` 페이지를 사용해야 한다. 덧붙여 `width, height` 속성또한 넣어줘야 한다. 브라우저가 렌더링 재계산을 줄이기 위한 방법이다.

### 스타일 포함하기

```html
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
</head>
```

스타일블럭은 한페이지에 하나만 사용할 수 있고, `head` 태그안에 포함되어야 하며, `amp-custom` 이라는 속성을 붙여야 한다. 엄밀히 `<style amp-boilerplate>` 를 하단에 두고 있기 때문에, 2개의 스타일블록을 허용한다고도 볼 수 있다. 
여기는 일반적으로 `reset.css` 에 해당하는 영역으로 생각하면 될거 같다.

### 미리보기 및 유효성 검사

검사를 하려면 간단한 웹서버를 띄어야 하는데, 파이썬3 은 아주 간단한 방법으로 현재 위치를 루트폴더로 작동할 수 있도록 하는 웹서버를 구동시킬 수 있다.

```command
> python -m http.server 8000
```

하면 현재 폴더가 웹서버 루트가 되고

`http://localhost:8000/amptest.html#development=1`

샘플페이지 경로를 입력할 때 `#development=1` 뒤에 해시태그같은 파라미터를 붙여주면 콘솔에 오류를 출력해 준다.

### 검색 및 배포를 위해 페이지 준비

AMP 페이지의 원본을 가지고 있을 때 사용하는 방법인데, AMP의 초기버전 이다보니, 화려한 현재의 웹페이지를 전부 구현할 수 없기에, 차선방법으로 제공하는 듯 해 보인다.

같은 컨텐츠의 페이지 + AMP 페이지 구성시 유용하다.

- 원본페이지에 `relation 값으로 amphtml` 로 AMP페이지 경로를 넣는다.

```html
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
```

- 원본페이지에 `relation 값으로 canonical` 으로 원본페이지 경로를 넣는다.

```html
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
```

AMP로 제공된 사이트 목록([showcase](https://www.ampproject.org/ko/learn/showcases/))이 제공되는데 실제로 빠른건지 안빠른건지 모르겠다. 

AMP는 신기술이 아니라, 나온기술들을 종합하여 속도를 높이는 것이다.

하지만 그러면 어떠한가. 원래 구글은 그런방식으로 설계해 왔는데.. 베타버전은 허접하지만 어느새인가 사용하고 있는 나를 느끼게 해주는 구글..

#### AMP 웹사이트

- https://www.vox.com/platform/amp/science-and-health/2017/7/25/16019892/solar-eclipse-2017-interactive-map
- https://www.myntra.com/amp/lipstick
- https://tasty.co/
- https://globalnews.qq.com/
- https://www.iene.mediaset.it/
- https://magebit.com/

#### 연관글

*나는 AMP를 좋아하지 않는다.* : https://blog.outsider.ne.kr/1285