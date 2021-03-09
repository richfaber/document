# 14장 브라우저 창 스크립팅



브라우저와 브라우저의 창, 프레임을 제어하는데 사용할 수 있는 `Window` 객체의 속성과 메서드들을 살펴 보자

## 타이머

전역함수로 제공되는 `setTimeout(), clearTimeout(), setInterval(), clearInterval()` 등이 있다.

- setTimeout(fn, sec) : 초 이후 호출 후 종료
- clearTimeout() : setTimeout 타이머를 중지
- setInterval(fn, sec) : 초 이후 반복 호출
- clearInterval() : setInterval 타이머를 중지

## 브라우저 Location과 History

### URL 파싱

창(또는 프레임) 의 location 속성은 Location 객체에 대한 참조인데, 이 객체는 현재 창 안의 표시된 문서의 URL을 나타낸다.

 다양한 속성들을 제공해 주는데 `search` 라는 속성이 흥미롭다.

이 속성은 URL에 질의 무낮열의 일종인 물음표로 시작하는 부분이 있다면 표기된다.

- https://typora.io/?A=1&B=2 : 이렇게 쿼리가 담겨 있을 경우 `search` 속성이 표기됨.

### 새 문서 불러오기

location 속성에서 주의깊게 보이는 것이 `reload(), replace()` 함수가 있다.

- location.reload() : 현재 문서를 다시읽기 한다.
- location.replace(url) : 현재 문서를 `url` 로 변경한다. `location.href` 로도 페이지 이동을 할 수 있지만 이것은 함수가 아니기 때문에, 되도록이면 `replace` 속성을 사용하자

### History 객체

`History` 객체는 브라우저 창의 최근 페이지 목록을 방문한 URL 들의 배열로 모델링 하도록 되어 있는데, 이것이 사생활 보호와 시스템 보안 측면에서 과거 방문 목록을 접근하는 것이 문제라는 것을 인지하고, 페이지목록을 접근할 수 있는 부분은 접근할 수 없도록 교정 되었다.

하지만 3가지 메서드를 지원한다.

- history.back() : 최근 목록에서 바로 전으로 이동한다.
- history.forward() : 최근 목록에서 바로 앞으로 이동한다.
- history.go(n) : 최근 방문 목록중에 앞 또는 뒤에 `n` 만큼 전진한다.

## 창, 화면, 브라우저에 대한 정보 얻기

### 창 위치와 크기

```javascript
// 데스크톱에 띄운 브라우저 창의 전체 크기
var windowWidth = window.outerWidth;
var windowHeight = window.outerHeight;

// 데스크톱에 띄운 브라우저 창의 위치
var windowX = window.screenX;
var windowY = window.screenY;

// HTML 문서가 표시되는 화상 표시 영역인 뷰포트(viewport)의 크기
// 이것은 브라우저 창 크기에서 메뉴바, 툴바, 스크롤바 등의 크기를 뺀 나머지이다.
var viewportWidth = window.innerWidth;
var viewportHeight = window.innerHeight;

// 다음의 값들은 수평, 수직 스크롤바의 위치를 나타내며,
// 문서 좌표와 창 좌표를 상호 변환하는데 사용된다.
// 이 값들은 화면의 좌측 상단 모서리에 문서의 어느 부분이 위치하는지 나타낸다.
var horizontalScroll = window.pageXOffset;
var verticalScroll = window.pageYOffset;

```

이 속성들은 다 읽기 전용으로 수정할 수는 없다. 수정하기 위한 메서드는 따로 제공된다.

### Screen 객체

디스플레이 해상도와 표현 가능한 색 수 등의 정보를 담고 있다. 

- width, height : 픽셀단위로 디스플레이의 너비와 높이를 보여준다.
- availWidth, availHeight : 실제 사용할 수 있는 디스플레이의 크기, 이것은 작업표시줄 등에 의해 사용되는 공간은 제외된다.

### Navigator 객체

브라우저의 버전, 출력 가능한 데이터 포맷들의 목록 등 웹 브라우저 전반에 대한 정보를 담고 있다.

하지만 매번 새 브라우저가 나올때마다 정보가 갱신되기 때문에, 논란이 있다.

- appName : 웹 브라우저의 간단한 이름
- appVersion : 브라우저의 버전 숫자 또는 기타 정보
- userAgent : `appName, appVersion` 보다 더 상세한 정보
- appCodeName : 브라우저의 코드 네임
- platform : 브라우저가 실행되고 있는 하드웨어 플랫폼

```javascript
var browser = "BROWSER INFORMATION:\n";
for (var propname in navigator) {
    browser += propname + ": " + navigator[propname] + "\n"
}
alert(browser);
```

이 정보를 통해 브라우저를 구별했으나, 웹표준 문법과 브라우저의 버전업으로 현재는 모바일을 구별하거나 할 때에 주로 사용된다. 

[http://hgoebl.github.io/mobile-detect.js/](http://hgoebl.github.io/mobile-detect.js/)

## 창 열고 조작하기

### 창 열기

Window 객체의 `open()` 메서드를 이용해서 새로운 브라우저 창을 열 수 있다. 현대에는 팝업차단 기능들이 잘 제공되고 있어서 새창을 띄우지 않고, 레이어로 대체하는 추세이다.

4가지 인자를 제공한다.

- var w = window.open("small.html", "smallwin", "width=400, height=350, status=yes, resizable=yes");

첫번째는 페이지 URL A이고, 두번째는 창의 이름이고, 세번째는 열리는 창의 옵션이다. 세번째 옵션의 제공되는 값들이 많았으나, 여러가지 보안 문제로 많이 줄어 들었다.

네번째 인자는 팝업이 하나 떠 있고, 이름도 같을 때, 다시 열릴 경우에 대한 옵션이다. (기본값은 false)

만약 같은 URL과 같은 브라우저창 이름이 있는 팝업이 떠 있는 상태에서, `true` 옵션으로 팝업을 열게 되면, 열려있는 창의 열어본 페이지 목록에 현재 항목이 덮어씌여 진다.

### 창 닫기

- window.close() 

창을 닫을 용도로 사용하지만, 사용자의 의도와 상관없이 자바스크립트로 창이 강제로 닫히는 경우가 사용성을 저해한다는 이유로, 브라우저마다 창을 정말 닫을것 인지를 물어보는 인터페이스가 제공되는 추세이다.

### 창 위치와 크기

Window 객체는 창의 위치를 옮기고 크기를 조절하기 위한 메서드를 정의하고 있다. 하지만 이 메서드를 사용하는 것은 굉장히 바람직하지 않은 일로 여겨지고 있다. 왜냐하면 창의 위치조절은 사용자에게 위임되어야 하기 때문이다.

- window.moveTo(left, top) : 창의 좌측 상단 기준으로 창을 이동한다.
- window.moveBy(left, top): 스크린의 좌측 상단 기준으로 창을 이동한다.

```javascript
function openWin() {
    myWindow = window.open('', '', 'width=200, height=100');    // Opens a new window
    myWindow.document.write("<p>This is 'myWindow'</p>");       // Some text in the new window
}

function moveToWin() {
    myWindow.moveTo(10, 10);                                 // Moves the new window 
    myWindow.focus();                                          // Sets focus to the new window
}

function moveByWin() {
    myWindow.moveBy(250, 250);                                 // Moves the new window 
    myWindow.focus();                                          // Sets focus to the new window
}

```

- window.resizeTo(width, height) : 창 사이즈 크기를 width, height 만큼 키운다.
- window.resizeBy(width, height) : 창 사이즈 크기를 width, height 로 변경한다.

```javascript
function openWin() {
    myWindow = window.open('', '', 'width=200, height=100');    // Opens a new window
    myWindow.document.write("<p>This is 'myWindow'</p>");       // Some text in the new window
}

function resizeToWin() {
    myWindow.resizeTo(250, 250);                             // Resizes the new window
    myWindow.focus();                                        // Sets focus to the new window
}

function resizeByWin() {
    myWindow.resizeBy(10, 10);                             // Resizes the new window
    myWindow.focus();                                        // Sets focus to the new window
}
```

### 키보드 포커스와 가시성

- focus() : 시스템에게 키보드 포커스를 해당요소에 위치하도록 요청
- blur() : 반대로 포커스를 잃도록 한다.

```html
<!DOCTYPE html>
<html>
<head>
<style>
a:focus, a:active {
    color: green;
}
</style>
</head>
<body>

<a id="myAnchor" href="https://www.w3schools.com">Visit W3Schools.com</a>

<p>Click the buttons to give focus and/or remove focus from the link above.</p>

<input type="button" onclick="getfocus()" value="Get focus">
<input type="button" onclick="losefocus()" value="Lose focus">

<script>
function getfocus() {
    document.getElementById("myAnchor").focus();
}

function losefocus() {
    document.getElementById("myAnchor").blur();
}
</script>

</body>
</html>
```

### 스크롤

- scrollBy(n) : 지정된 `n` 만큼 상하로 이동한다.
- scrollTo(n) : 최상단을 기준으로 `n` 위치로 이동한다.

위의 방법 외에 스크롤을 움직이는 방법에는 `hash` 가 있다.

```html
window.location.hash = "#top";
```

`top` 이라는 `name` 속성값 요소로 이동한다.

이것은 스크롤을 이동시킨다는 느낌 보다는 문서를 그 위치로 이동시킨 다는 의미로 생각하면 된다.

## 간단한 대화 상자

- alert() : 메시지를 표시하고 대화 상자를 닫을 때 까지 기다린다.
- confirm() : 사용자에게 확인 또는 취소 동작을 받을 수 있다. 
- prompt() : 사용자의 문자열 입력을 받을 수 있다.

지금은 다른 방법으로 사용자의 입력을 주로 받기 때문에, 이용빈도는 많이 줄어있고, 대화 상자에 출력되는 내용은 아주 단순한 문자임에 유의 하자.

만약에 줄바꿈을 하고 싶을 땐 `\n` 을 사용하면 된다.

```html
<!DOCTYPE html>
<html>
<body>

<p>Click the button to display an alert box.</p>

<button onclick="myFunction()">Try it</button>

<script>
function myFunction() {
    alert("Hello!\nI am an alert box!");
}
</script>

</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<body>

<p>Click the button to display a confirm box.</p>

<button onclick="myFunction()">Try it</button>

<script>
function myFunction() {
    confirm("Press a button!");
}
</script>

</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<body>

<p>Click the button to demonstrate the prompt box.</p>

<button onclick="myFunction()">Try it</button>

<p id="demo"></p>

<script>
function myFunction() {
    var person = prompt("Please enter your name", "Harry Potter");
    if (person != null) {
        document.getElementById("demo").innerHTML =
        "Hello " + person + "! How are you today?";
    }
}
</script>

</body>
</html>
```

## 상태 표시줄 스크립팅

웹브라우저의 하단에 상태 표시줄이 있는데, 이 상태 표시줄은 브라우저가 사용자에게 전할 메시지를 표시하는데 사용 한다. 예를 들어 사용자가 마우스를 링크걸린 텍스트 위에 올리면 링크 URL이 표시된다.

현대의 상태표시줄은 고정으로 있지 않고, 생겼다가 사라지는 형태이기 때문에, 이전처럼 상태표시줄을 활용하지는 않는다.

```html
<html>
<head>
<title>A Simple Page</title>
<script language="JavaScript">

var msg = "Thanks for visiting our Web site! ... ";
function scrollMsg()
{
    window.status = msg;
    msg = msg.substring(1,msg.length) + msg.substring(0,1);
    setTimeout("scrollMsg()",150);
}

</script>
</head>
<body onload="scrollMsg()">

</body>
</html>
```

