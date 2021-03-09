![](https://lh3.googleusercontent.com/-A0YiWn8kOXI/W6tGgBLZtTI/AAAAAAAAU5M/P5Z8y8zEjF8S9lwdrK1S0ocCeVaHn6PjgCHMYCw/I/15379513585037.png)

# HTML5 추가 혹은 변경 태그들

`Shadow DOM` 표준이 나오면서 부터 사용자 태그를 허용하는 것이고, 개발자가 `Shadow DOM` 을 이용해서, 사용자 태그 만으로 웹페이지를 구성 했을때 잘못된 문법 이라고 말할 수가 없는 상황 이라는 생각에 한 동안 태그에 의미에 대해 외면했다. 

`SPA` 개발방법 으로 작성하는 대부분의 프레임워크는 `Shadow DOM` 을 사용해서 직접 태그를 생성하는 것을 가정하고 있다. 이미 `body` 에 자식요소 부터 일반적으로 사용하던 `div` 등이 아니고, 프레임워크가 제공하는 태그가 들어온다. 물론 설정으로 변경을 할 수 있지만, 이런 기초적인 설계가 태그의 의미에 대해서는 일단 접고 들어가는 느낌이 든다.

그 동안 `html5` 추가된 태그에 대해서, 기껏 써봐야 `figure, section, header, footer, article` 등이 전부 였기 때문에, 돌아보기도 할 겸, 까먹어버린 것들도 상당히 있어서, 정리할 생각이 들었다.

> 참조 : https://www.w3schools.com/tags/default.asp

## address (*)

작성자와 소유자에 대한 연락처 정보를 정의 한다. 

다만 `article` 요소에 있다면, 해당 아티클의 연락처 정보를 의미한다.
(현재 기사의 작성자나 연락처정보 등)

`footer` 태그에 포함되어 작성되는게 일반적이다.

```css
address { 
    display: block;
    font-style: italic;
}
```

## article (*)

독립적인 컨텐츠를 지정 한다. 

- 포럼 게시물
- 블로그 게시물
- 뉴스 기사
- 논평

전에 메인화면 하단에 `독립적 배너(?)` 라고 `article` 을 적용 하는걸 본적이 있는데, `article` 자체는 말그대로 독립적 컨텐츠를 의미하는 것으로, 여기서부터 여기까지는 배너, 여기서 여기까지는 게시판 등의 `division` 의 의미가 아니라서, 구분할 필요가 있다.

보통 독립적인 컨텐츠의 의미 이기 때문에, `section` 태그를 자식으로 구성되는 경우가 많다. 

```css
article { 
    display: block;
}
```

## aside (*)

현재 페이지와 연관된 내용 외에 일부 내용을 정의한다. 
정의상의 의미로 주변 컨텐츠와 조금 이라도 연관이 되어 있어야 한다. 

즉 사이드바에 별도의 컨텐츠(배너라던지, 퀵메뉴라던지) 를 표현하는 목적이 아니라 현재글과 연관글 이라던지, 상단의 메뉴에 주메뉴가 아닌 별도의 메뉴구성 이라던지 하는 등의 컨텐츠가 표현된다. 

완전히 별도의 영역은 `division` 을 사용하면 된다.

```css
aside { 
    display: block;
}
```

## audio (*)

음악, 기타 오디오 스트림과 같은 사운드를 정의하고, 브라우저마다 각기 다르게 구현된 플레이어를 보여준다. 

모든 브라우저가 지원하는 포맷은 `MP3` 이고, `WAV, OGG` 는 일부 지원한다.

`audio` 태그 사이의 텍스트는 `audio` 태그를 지원하지 않는 브라우저에서 나타난다.

- autoplay {autoplay} : 페이지 진입시 자동재생 여부
- control {controls} : 재생/정지 같은 버튼의 표시 여부
- loop {loop} : 재생목록이 끝나고, 자동으로 다시 재생 여부
- muted {muted} : 재생시 무음을 기본으로 할지 여부
- preload {auto|metadata|none} : 스트리밍으로 할지, 전체 다운로드 후 재생할지 여부
- src {URL} : 오디오의 URL 정보

## b

HTML5 사양에서는 강조 텍스트를 `em, strong, mark` 를 권고하고, 이와 별도로 마지막 수단으로 `b` 를 사용하라고 명시되어 있다.

강조 또는 중요 또는 더 중요한 것(?) 을 의미적으로 어떻게 구분하겠는가. `b` 태그는 시대의 흐름에 사라질 줄 알았지만 여전히 건재하다.

```css
b { 
    font-weight: bold;
}
```

## bdi (*)

Bi-Directional Isolation Element 의 약자로 텍스트의 방향을 브라우저가 판단하게 할 목적으로 사용한다. 히브리어나 아랍어 등의 오른쪽에서 왼쪽으로 흐르는 언어를 가진 언어를 위한 구별자로 사용된다.

```html
<ul>
  <li>상품이름 : <bdi>hrefs</bdi></li>
  <li>상품이름 : <bdi>jdoe</bdi></li>
  <li>상품이름 : <bdi>إيان</bdi></li>
</ul>
```

위에 3번째 언어는 브라우저가 자체판단 하여 우측에서 좌측으로 표현 되어야 한다. 

하지만 영어권 등의 언어가 섞여 있을때는 잘못 나오기도 하는 등, 완벽히 언어를 판별하여 보여주는 것은 아직 기술적 미흡이 있다고 한다.

## bdo

Bi-Directional Override 의 약자로 xhtml 에서도 지원하던 텍스트의 방향을 지정하는 목적이 있다. 현재 방향을 덮어 써서 변경한다.

```html
<bdo dir="rtl">
This text will go right-to-left.
</bdo>
```

```css
bdo { 
    unicode-bidi: bidi-override;
}
```

## blockquote

다른 자원에서 인용된 컨텐츠를 정의 한다.

```html
<blockquote cite="http://www.worldwildlife.org/who/index.html">
For 50 years, WWF has been protecting the future of nature. The world's leading conservation organization, WWF works in 100 countries and is supported by 1.2 million members in the United States and close to 5 million globally.
</blockquote>
```

`<q>십 년이면 강산도 변한다</q>라는 말이 있습니다.` 등의 짧은 인용문은 `q` 태그를 권고하고 있다. 

xhtml 에서는 긴 인용문을 정의하는 것으로 명시됬지만, html5 에서는 인용문에 대한 섹션이라고 명시되어 있다. 

```css
blockquote {
    display: block;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 40px;
    margin-right: 40px;
}
```

## canvas (*)

스크립트 태그를 이용해서 그래픽을 그리는데 사용한다.

```html
<canvas id="myCanvas"></canvas>

<script>
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 80, 80);
</script>
```

## cite

작품 제목(책, 노래, 영화, TV 프로그램, 그림, 조각품) 등을 정의 한다.
(사람 이름은 작품의 제목이 아님)

`blockquote` 의 속성으로 `cite` 가 있는데, 사전적 의미로 `인용문` 이라는 의미인데, xhtml 에서는 인용문의 정의로 명시되었는데, html5 에서 저작의 제목으로 정의한다. (혼란~)

```html
<p><cite>The Scream</cite> by Edward Munch. Painted in 1893.</p>
```

```css
cite { 
    font-style: italic;
}
```

## col

`colgroup` 의 자식요소로만 사용되고, 테이블 셀(cell)에 대해 속성을 지정할 수 있다.

```html
<table>
  <colgroup>
    <col span="2" style="background-color:red">
    <col style="background-color:yellow">
  </colgroup>
  <tr>
    <th>ISBN</th>
    <th>Title</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>3476896</td>
    <td>My first HTML</td>
    <td>$53</td>
  </tr>
</table>
```

xhtml 에서 허용되던 `align, char, charoff, valign, width` 속성 등은 더이상 지원하지 않는다. `width` 속성 미지원에 유의

```css
col { 
    display: table-column;
}
```

## data (*)

주어진 내용에 대해서, 기계가 해석할 수 있는 단서를 연결 한다. 
만약 주어진 내용에 대한 단서로 날짜 또는 시간일 경우는 `time` 태그를 사용한다.

```html
<ul>
  <li><data value="21053">Cherry Tomato</data></li>
  <li><data value="21054">Beef Tomato</data></li>
  <li><data value="21055">Snack Tomato</data></li>
</ul>
```

## datalist (*)

`input` 요소에 예상되는 값에 대한 옵션을 지정한다.
자동완성 으로 적합한 태그다. 

```html
<input list="browsers">

<datalist id="browsers">
  <option value="Internet Explorer">
  <option value="Firefox">
  <option value="Chrome">
  <option value="Opera">
  <option value="Safari">
</datalist>
```

```css
datalist { 
    display: none;
}
```

## dl, dt, dd

해당 요소는 여전히 많은 웹페이지 에서 잘못 사용되고 있다.

- dl (definition list - 용어 목록)
- dt (definition term - 용어 제목)
- dd (definition description - 용어 설명)

로그인 아이디와 입력창을 연결하는 데에 많이 사용되는 듯 하다. 

```html
<dl>
    <dt>로그인 아이디</dt>
    <dd><input ~ /></dd>
    <dt>로그인 비밀번호</dt>
    <dd><input ~ /></dd>    
</dl>
```

의미 구분이 아닌 레이아웃 구분으로 태그를 이용한 대표적인 잘못된 사례다.

일단 이 태그를 사용하려면 `용어` 여야 한다. 일반적인 웹페이지에서 `용어` 에 대한 정의가 필요한 경우는 거의 없다. 예를 들어 회사소개 페이지 에서 그 회사만의 용어를 만들었다고 치면 사용할 수 있다.

```html
<dl>
    <dt>쿠팡맨</dt>
    <dd>쿠팡에 근무하며, 고객과의 접점이 있는 배송과 관련한 일을 한다.연봉은 타사에 비해 가장 높다. 오랜시간 중노동에 시달리지만 상응하는 복지도 마련하기 위해 회사에서 노력한다.</dd>
    <dt>NASA</dt>
    <dd>NASA.gov brings you the latest news, images and videos from America's space agency, pioneering the future in space exploration, scientific</dd>    
</dl>
```

일반적 상업사이트에서 `dl - 용어목록` 을 사용할 일은 거의 없다고 생각한다.

## del, ins

삭제 되거나 삽입된 텍스트에 대해서 정의 한다. 
의미가 있음에도 불구하고 표현에 집중한 태그는 사용하면 안된다는 탓에 표준이 아니라는 오해를 불러 일으키는 태그 이다.  

해당글에 대해서 이력을 남길 목적으로 사용되기도 하지만, 쇼핑몰에서 할인가격과 정상가격 등에도 사용된다.

```html
<p>My favorite color is <del>blue</del> <ins>red</ins>!</p>
```

특이하게 2가지 속성값을 더 가지는데

- cite {URL} : 삭제된 이유를 명시하고 있는 페이지의 URL
- datetime {TIME} : 삭제된 시간

이렇게 단서를 좀 더 구체화 할 수 있다.

## details (*)

사용자에 의해 보거나 숨길 수 있는 정보를 정의 한다.

```html
<details>
  <summary>Copyright 1999-2018.</summary>
  <p> - by Refsnes Data. All Rights Reserved.</p>
  <p>All content and graphics on this web site are the property of the company Refsnes Data.</p>
</details>
```

예를 들어 `FAQ - 자주묻는질문` 같은 경우 제목만 노출하고 답변은 숨김상태로 두는게 일반적인데, 이렇게 제목정의를 하고 해당 내용은 숨겨도 되는 컨텐츠에 사용한다.

만약 `open` 속성을 주면 열린 상태로 보여준다.

```css
details { 
    display: block;
}
```

## dialog (*)

사전적 의미로 `대화` 라는 의미를 가진다. 해당 단어에 대해서 부가적 설명이 필요한 경우나, 추가적으로 전달할 컨텐츠가 있을 경우 유용하다.

레이어 팝업으로 부가설명을 하는 툴팁 등이 해당 태그의 의미로 적합하다.

```html
<table>
<tr>
  <th>January <dialog open>This is an open dialog window</dialog></th>
  <th>February</th>
  <th>March</th>
</tr>
<tr>
  <td>31</td>
  <td>28</td>
  <td>31</td>
</tr>
</table>
```

`open` 속성이 있으면 열린 상태로 표현된다.

## embed (*)

외부 응용프로그램을 정의 한다. HTML5 에서 새로 추가된 요소인데, `embed` 태그는 많은 브라우저가 지원하고 있었으나, 표준은 아니였다는 얘기다.

```html
<embed src="helloworld.swf">
```

```css
embed:focus { 
    outline: none;
}
```

## figure, figcaption (*)

`figure` 태그는 독립적 컨텐츠를 표현할 목적을 가지고 있다.

주로 이미지나 삽화, 도표, 코드 조각 등에 사용되고, `figcaption` 태그에 설명을 넣는다.

제거된 경우에도 문서의 흐름에 영향을 미치지 않아야 할 정도로, 주 컨텐츠와는 관련이 적은 내용 이여야 한다. `aside` 는 주 내용과 조금 이라도 관련이 있어야 하는데, `figure` 는 있으면 도움이 되지만, 없어도 컨텐츠 흐름에 전혀 문제가 없어야 한다.

```html
<!-- figure 만 사용 -->
<figure>
  <img src="https://developer.cdn.mozilla.net/media/img/mdn-logo-sm.png" alt="An awesome picture">
</figure>
<p></p>
<!-- figcaption 을 함께 사용 -->
<figure>
  <img src="https://developer.cdn.mozilla.net/media/img/mdn-logo-sm.png" alt="An awesome picture">	
  <figcaption>Fig1. MDN 로고</figcaption>
</figure>

<figure>
  <figcaption>navigator를 이용하여 브라우저 정보 얻기</figcaption>
  <pre>
function NavigatorExample() {
  var txt;
  txt = "Browser CodeName: " + navigator.appCodeName;
  txt+= "Browser Name: " + navigator.appName;
  txt+= "Browser Version: " + navigator.appVersion ;
  txt+= "Cookies Enabled: " + navigator.cookieEnabled;
  txt+= "Platform: " + navigator.platform;
  txt+= "User-agent header: " + navigator.userAgent;
}            
  </pre>
</figure>

<figure>
  <figcaption><cite>Edsger Dijkstra :-</cite></figcaption>
  <p>"If debugging is the process of removing software bugs, <br /> then programming must be the process of putting them in"</p>
</figure>
```

## footer (*)

바닥글을 정의 한다. 일반적으로 아래와 같은 정보를 표현한다.

- 저자 정보
- 저작권 정보
- 연락처 정보
- 사이트 맵
- 위로 가기 링크
- 관련된 문서

연락처 정보가 들어갈 경우 `address` 태그를 `footer` 안에 포함하자.

```css
footer { 
    display: block;
}
```

## header (*)

소개내용 또는 탐색 링크 모음을 위해서 사용한다. 일반적으로 다음의 컨텐츠가 포함되어 진다.

- 하나 이상의 제목요소
- 로고 또는 아이콘
- 저자 정보

> 하나의 문서에 여러개의 `header` 요소를 포함할 수 있다.
> `footer, address, header` 요소 내에 배치될 수 없다.

```css
header { 
    display: block;
}
```

## main (*)

문서의 주요 내용을 지정 한다.

> 문서에 고유한 내용 이여야 한다. 사이드바, 탐색 링크, 저작권 정보, 사이트 로고 및 검색양식과 같이 문서 전반에 걸쳐 반복되는 내용이 포함되어서는 안된다.
> `article, aside, footer, header, nav` 의 하위 요소여서는 안된다.

```html
<main>
  <h1>Web Browsers</h1>
  <p>Google Chrome, Firefox, and Internet Explorer are the most used browsers today.</p>

  <article>
    <h1>Google Chrome</h1>
    <p>Google Chrome is a free, open-source web browser developed by Google,
    released in 2008.</p>
  </article>

  <article>
    <h1>Internet Explorer</h1>
    <p>Internet Explorer is a free web browser from Microsoft, released in 1995.</p>
  </article>

  <article>
    <h1>Mozilla Firefox</h1>
    <p>Firefox is a free, open-source web browser from Mozilla, released in 2004.</p>
  </article>
</main>
```

## mark (*)

텍스트 강조용으로 새로 추가된 태그 이다. 다른 강조태그와 다른점은 `background-color` 가 지정된다는 것이다. 형광펜으로 색칠한 강조의 의미로 알려지는 듯 하다.

```css
mark {
    background-color: yellow;
    color: black;
}
```

## meter (*)

주어진 범위의 데이터를 나타낸다.

```html
<meter value="2" min="0" max="10">2 out of 10</meter><br>
<meter value="0.6">60%</meter>
```

> 디스크 사용량 이라던지, 해당 업무의 진척도 등에 활용할 수 있다.
> 로딩중 같은 동적인 진행형을 위해서는 `progress` 를 사용한다.

## menu (*)

`ul` 과 마찬가지로 순서가 없는 목록을 의미한다. 

`ul, nav` 과의 차이점은 현재 페이지 에서 실행이 가능한 상호작용 아이템을 포함 한다는 것에 있다. 
현재는 html 5.1에 제안되었고, 채택은 진행중인 것으로 보이고, 모든 브라우저에서 작동하지 않는다.(??)

```html
<!-- Learn about this code on MDN: https://developer.mozilla.org/ko/docs/Web/HTML/Element/menu -->

<!-- A button, which displays a menu when clicked. -->
<button type="menu" menu="dropdown-menu">
  Dropdown
</button>

<menu type="context" id="dropdown-menu">
  <menuitem label="Action">
  <menuitem label="Another action">
  <hr>
  <menuitem label="Separated action">
</menu>
```

## nav (*)

일련의 탐색 링크를 정의 한다.

> 모든 링크가 `nav` 요소 내에 있어야만 하는 것은 아니고, 주요 탐색 링크만 사용하면 된다. 대표적으로 `Global Navigation` 이 적합하고, 그 외에 일반적이고 대표적인 링크에 적합하다.

```css
nav {
    display: block;
}
```

## object

오디오, 비디오, Java 애플릿, ActiveX, PDF, Flash 등의 멀티미디어 컨텐츠를 포함할 수 있다.

```html
<object width="400" height="400" data="helloworld.swf"></object>
```

`param` 태그로 `object`에 대한 파라미터를 지정할 수 있다.

`embed` 태그와 사용법의 차이는 있지만, 용도는 같다.

## output (*)

계산결과를 표시 한다. 서버를 거쳐서 값을 얻을 필요가 없는 일반적 계산 할 때 사용하기 좋다.

```html
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0
  <input type="range" id="a" value="50">100
  +<input type="number" id="b" value="50">
  =<output name="x" for="a b"></output>
</form>
```

`output` 의 `for` 속성에 복수의 id가 부여되었는데, 혹시나 해서 `label` 에 복수지정이 가능한가 하였지만, 되지 않는다.

## picture, source (*)

개발자를 위한 태그로 이미지 자원을 효율적으로 표현하기 위해 나왔다. `media` 속성을 통해서 미디어쿼리를 직접 지정할 수 있다. 

최근 레티나 모니터에 대응하기 위해 `img` 태그에 자바스크립트를 이용해 두배 이미지를 사용할 수 있도록 하는 기법을 사용하는데, 이 태그를 사용하면 그럴 필요가 없다.

```html
<picture>
  <source media="(min-width: 650px)" srcset="img_pink_flowers.jpg">
  <source media="(min-width: 465px)" srcset="img_white_flower.jpg">
  <img src="img_orange_flowers.jpg" alt="Flowers" style="width:auto;">
</picture>
```

하나 이상의 `source` 태그와, 하나의 `img` 태그를 포함한다.

`source` 태그는 몇가지 속성을 사용한다.

- srcset (필수) - 표시 할 이미지의 URL
- media - 유효한 미디어 쿼리
- sizes - 조건을 포함한 너비를 설정
- type - MIME 유형을 정의

`sizes` 속성은 너비에 대한 지정을 할 수 있는데, `media` 속성으로 디바이스에 대한 조건을 설정한다면, `sizes` 를 통해서 어떤 크기(정확히 너비:width) 를 보여줄 지를 정할 수 있다. (물론 css로도 가능)

예를 들어

```html
<picture>
  <source
    media="(min-width: 650px)"
    sizes="80vw"
    srcset="images/kitten-stretching.png,
            images/kitten-stretching@1.5x.png 1.5x,
            images/kitten-stretching@2x.png 2x">
  <source
    media="(min-width: 465px)"
    srcset="images/kitten-sitting.png,
            images/kitten-sitting@1.5x.png 1.5x
            images/kitten-sitting@2x.png 2x">
  <img
    src="images/kitten-curled.png"
    srcset="images/kitten-curled@1.5x.png 1.5x,
            images/kitten-curled@2x.png 2x"
    alt="a cute kitten">
</picture>
```

처음 `source` 태그의 조건을 해석하면 `min-width: 650px` 일 경우 `80vw` 로 표현이라고 해석된다. 물론 `80%` 도 할 수 있다. 미디어 조건문을 이용해서 `(max-width: 30em) 100vw, (max-width: 50em) 50vw, calc(33vw - 100px)` 이런 값을 지정하는 것도 가능하다. (-_-!!!!)

여기에 `srcset` 속성 안에 밀도 서술자(Pixel density descriptor) 를 추가로 지정할 수가 있는데, 이는 모니터의 밀도에 대한 지정이다. (-_-??;;)

정리하면 3가지 조건을 조합할 수 있다.

- 미디어 쿼리
- 상대적 크기 혹은 미디어쿼리 조건을 이용한 너비지정
- 모니터 배율에 대한 지정

## progress (*)

작업 진행율을 나타낸다. 현재 정해진 계측 같은 것들 - 하드디스크의 잔여용량 등의 진행율의 표현은 `meter` 를 사용하고, `progress` 는 현재 진행을 표현할 때 사용한다.

```html
<progress value="22" max="100"></progress>
```

## ruby, rt, rp (*)

루비 텍스트를 표현하는데 사용한다.

루비 문자라는 것은 문장 내의 임의의 발음기호, 혹은 단어에 대한 설명, 혹은 일반적 읽기 방법 등에 대한 것이다.

![](https://lh3.googleusercontent.com/-o07jmayvty4/W6tBIABBECI/AAAAAAAAU5A/OTydynB6b3k5Hf5i83fEGyaObGR9SzrtACHMYCw/I/15379499828294.jpg)

```html
<ruby>
韓國<rp>(</rp><rt>한국</rt><rp>)</rp>
</ruby>
```

위에 한자에 대한 읽는법을 `rt` 태그에서 `한국` 으로 표현했고, `ruby` 태그를 지원하지 않는 브라우저 에서는 `rp` 태그가 보인다. 

역으로 지원하지 않는 브라우저에서는 `rp` 태그가 보여지게 되므로 화면에는 `韓國(한국)` 으로 표현된다.

## s

xhtml 에서는 취소선의 의미로 사용되었으나, html5 에서는 더이상 정확하지 않거나 관련성이 없는 텍스트를 정의한다. html5에서 삭제된 텍스트를 정의하려면  `del` 을 사용한다.

## section (*)

문서의 장, 머리글, 바닥 글 또는 문서의 다른 섹션과 같은 `문서의 섹션` 을 정의한다.

`div` 태그와 구분하기가 모호한 점이 있는데, 컨텐츠에 제목(h1~h6) 등이 필요해 보이면 `section` 이고, 아니면 `div` 를 사용하면 된다. 즉 `section`은 문서이고, 구분할 때 사용하는 것이다.

```css
section { 
    display: block;
}
```

## svg (*)

svg 그래픽을 위한 컨테이너를 정의 한다. `canvas` 는 스크립트를 통해서 그린다면 `svg` 는 실제 태그로 그림을 그린다.

```html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
```

`svg` 에 좌표를 직접 코딩하는 것은 말이 안되고, 변환기가 보통 있고, 이미지를 사용하지 않고 화면을 그려야 할 경우 사용하게 되는거 같다.

## template (*)

숨은 컨텐츠를 정의한다. 주로 숨어 있다가 자바스크립트 등으로 보여주게 하는 것들에 사용 한다.

```html
<h1>The template Tag</h1>

<p>Click the button to get the content from a template, and display it in the web page.</p>

<button onclick="showContent()">Show content</button>

<template>
  <h2>Flower</h2>
  <img src="img_white_flower.jpg" width="214" height="204">
</template>

<script>
function showContent() {
  var temp = document.getElementsByTagName("template")[0];
  var clon = temp.content.cloneNode(true);
  document.body.appendChild(clon);
}
</script>
```

`details` 태그는 `summary` 가 있어서, 컨텐츠가 표현되어야 하는 것에 사용한다면 `template` 는 버튼같은 동작이 이루어 질 때 보여줄 목적으로 사용 한다.

## time (*)

요소의 날짜와 시간을 정의 한다.

```html
<p>We open at <time>10:00</time> every morning.</p>

<p>I have a date on <time datetime="2008-02-14 20:00">Valentines day</time>.</p>
```

`datetime` 속성은 기계가 알 수 있는 포맷으로 값을 넣는다.

## video (*)

무비 클립이나 다른 비디오 스트림과 같은 비디오를 정의 한다.

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  Your browser does not support the video tag.
</video>
``` 

`embed, object, audio` 등과 같이 미디어를 위해서 나온 태그인데, 뭔가 통합되길 희망해 본다.

## wbr (*)

Word Break Opportunity 의 약자로 줄바꿈의 위치를 지정할 수 있다.

```html
<p>
To learn AJAX, you must be familiar with the XML<wbr>Http<wbr>Request Object.
</p>
```

한 문장을 지정하는건 과해 보이고, 개행의 시작이 되는 단어를 지정하는게 좋을 거 같다. 이거 정말 필요하지만 왠지 없어질거 같은 느낌?

