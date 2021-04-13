# 웹 프로그래밍의 이해

[![B5790464800_l](https://lh3.googleusercontent.com/-nlHQHqoACvE/Wx5TK_hL5xI/AAAAAAAAUG8/f3QlopRFT-MhqN3PS74AhCo4rwe2t8E5ACHMYCw/I/B5790464800_l.jpg)](http://www.yes24.com/24/Goods/17295239?Acode=101)

## 웹 프로그래밍이란?

간단하게 얘기해서 HTTP 프로토콜로 통신하는 클라이언트와 서버를 개발하는 것이다.

브라우저로 네이버에 접속하면 웹 프로그래밍이 동작하게 되는데, 브라우저가 웹 클라이언트 이고, 네이버 서버가 웹서버 이다.

사용자는 브라우저에서 로그인을 위해 아이디와 비밀번호를 입력하고 나서, 로그인 버튼을 누를 것이다. 버튼을 누른 순간 웹서버에 요청을 넣었다고 할 수 있고, 그에 따라 서버는 클라이언트로 적절한 응답을 해주게 되는 것이 기본 구조라고 생각하면 된다.

## 다양한 웹 클라이언트

브라우저를 통한 서버요청 이외에 다른 방법을 알아 보자.

### 웹 브라우저를 사용하여 요청

웹 브라우저 주소에 `www.example.com` 이라고 `http` 요청을 넣으면, 서버는 응답을 받게 되고, 결과를 브라우저에 출력해 준다.

### 리눅스 curl 명령을 사용하여 요청

`curl` 명령은 `HTTP/HTTPS/FTP` 등의 여러가지 프로토콜을 사용하여 데이터를 송수신 할 수 있는 명령어 이다.

```command
$ curl http://www.example.com
```

서버의 응답결과인 `HTML` 태그가 출력되는 것을 확인할 수 있다. 브라우저는 이렇게 출력된 `HTML` 태그를 해석해서 화면에 출력하는 것이고, 리눅스의 터미널에서 한 결과는 해석은 하지 않고, 단순히 텍스트를 출력했다는 것을 알 수 있다.

### Telnet을 사용하여 요청

리눅스의 `telnet` 명령어로 `HTTP` 요청을 보낼 수 있다.

```command
$ telnet www.example.com 80
```

### 직접 만든 클라이언트로 요청

이번에는 파이썬 파일을 하나 만들어서 웹요청을 넣는 것을 해보자.

```python
# example.py
import urllib2
print urllib2.urlopen("http://www.example.com").read()
```

파일을 작성 후 파이썬으로 실행해 보자

```command
python example.py
```

실행하면 요청에 의한 `HTML` 태그가 화면에 출력되는 것을 확인할 수 있다.

이렇듯이 꼭 브라우저가 아니더라고 `HTTP 요청` 을 넣을 수 있다는 것을 알아 보았다.

## HTTP 프로토콜

`HTTP (Hypertext Transfer Protocol)` 은 웹서버와 웹클라이언트 사이에 데이터를 주고받기 위한 통신 방식으로 `TCP/IP` 프로토콜 기반으로 동작 한다.

`TCP/IP` 는 상호통신을 위해 필수적으로 `IP` 주소를 가져야 함을 의미하기도 한다.

`HTTP`는 말그대로 텍스트를 전송하기 위한 프로토콜 이지만, `XML, 이미지, 음성, 동영상, 자바스크립트, PDF, 각종 오피스파일 등` 컴퓨터로 다룰 수 있는 대부분의 데이터를 지원한다.

### HTTP 메시지의 구조

![httpatomoreillycomsourceoreillyimages96840](https://lh3.googleusercontent.com/-sWe8crVEiwE/Wx50XoZu2mI/AAAAAAAAUHI/uBJRS3vZdYAS1wKaPAcpFKQSd5A9UgX_ACHMYCw/I/httpatomoreillycomsourceoreillyimages96840.png)

![3-3](https://lh3.googleusercontent.com/-j4m6gEb4Hsw/Wx51Xu_8zfI/AAAAAAAAUHQ/TP1DB3wVmIEy-RodnDDijjHglj4F26tRwCHMYCw/I/3-3.png)

클라이언트에서 서버로 보내는 요청 메시지와 서버에서 클라이언트로 보내는 응답 메시지 2가지는 위와 같은 구조를 기본으로 가진다.

- 스타트라인 (start line) : 요청 메시지일 경우 요청라인(request line), 응답 메시지일 경우 상태라인(status line) 이라 한다.
- 헤더(Header) : 생략 가능하고, 각 행의 끝에는 `CRLF (Carriage Return Line Feed)` 인 줄바꿈 문자가 있다.
- 바디(Body) : 생략 가능하고, 텍스트 및 바이너리 데이터를 주고 받을 수 있다.

만약 Body를 생략해서 요청(Request)을 넣는 경우라면,

```text
GET /book/shakespeare HTTP/1.1
Host: example.com:8080
```

첫번째 줄은 요청라인(Request - start line) 으로 `요청방식(method), 요청 URI, 프로토콜 버전` 으로 구성했다.

두번째 줄은 헤더(Header) 로 `이름:값` 으로 표현되었다.

`Host` 항목은 필수값 으로, 요청라인에 넣든, 헤더에 넣든 필수로 표시되어야 한다. 
만약 헤더를 생략했다면, 요청라인에 넣어야만 한다.

```text
GET http://example.com:8080/book/shakespeare HTTP/1.1
```

다음은 응답 메시지의 예시 이다.

```text
HTTP/1.1 200 OK
Content-Type: application/xhtml+xml; charset=utf-8

<html>
...
</html>
```

- 상태라인(status line) : `프로토콜 버전, 상태 코드, 상태 텍스트` 로 표현되고 상태코드가 200 이므로, 정상처리 되었음을 의미한다.
- 헤더(Header) : 비어있고, Body 와 Header 사이에 빈 줄(blank line) 으로 구별되기 때문에 한줄 건너 띄어져 있다.
- 바디(Body) : `HTML` 이 포함되 있다.

이렇듯 요청과 응답은, 전달되는 값이 다를 뿐 실상 구조는 동일하다고 생각해야 한다.

### HTTP 처리 방식

클라이언트는 서버에게 원하는 처리방식을 요청하게 되는데, 8가지가 정의되어 있다.

- GET : 리소스 취득, Read(조회)
- POST : 리소스 생성, 리소스 데이터 추가, Create(생성)
- PUT : 리소스 변경, Update(변경)
- DELETE : 리소스 삭제, Delete(삭제)
- HEAD : 리소스의 헤더(메타데이터) 취득
- OPTIONS : 리소스가 서포트하는 메소드 취득
- TRACE : 루프백 시험에 사용
- CONNECT : 프록시 동작의 터널 접속으로 변경

`GET 방식` 은 지정한 URI의 정보를 가져오는 가장 많이 사용되는 메소드로, 브라우저를 이용해서 웹페이지,이미지,동영상 등을 가져온다고 할 때 사용된다.

`POST` 는 대표적 리소스를 생성하는 것으로, 글을 등록하는데 사용되고, `PUT`은 등록된 글에 변경에 사용된다.

`DELETE` 는 말 그대로 리소스를 삭제하는 메소드 이다.

### GET 과 POST 메소드

제일 많이 사용되는 `GET, POST` 는 방식에 차이가 있다.

```text
GET http://docs.djangoproject.com/search/?q=forms&release=1 HTTP/1.1
```

이렇듯 `GET` 은 `URI` 뒤에 `?` 를 붙이고 나서 `키=값` 으로 이어붙여 보낸다.

반면에 `POST` 는

```text
POST http://docs.djangoproject.com/search/ HTTP/1.1
Content-Type: application/x-www-form-urlencoded

q=forms&release=1
```

이렇게 요청 메시지의 바디로 전송 된다. 
`GET` 방식은 `URI` 의 길이제한이 있기 때문에, 많은 정보를 보낼 수 없지만 `POST` 는 그렇지 않다.

### 상태 코드

서버에서 처리 결과에 대한 응답 메시지에 대해서 상태라인(status line)에 코드로 표기된다.

- 1.x.x : Informational(정보제공) : 임시적인 응답으로, 현재 클라이언트의 요청까지 처리되었으니 계속 진행하라는 의미
- 2.x.x : Success(성공) : 클라이언트의 요청이 서버에서 성공적으로 처리되었다는 의미
- 3.x.x : Redirection(리다이렉션) : 완전한 처리를 위해서 추가적인 동작을 필요로 하는 경우. 주로 서버의 주소 또는 요청한 URI 문서가 이동되었으니, 그 주소로 재시도를 하라는 의미로 사용한다.
- 4.x.x : Client Error(클라이언트 에러) : 없는 페이지를 요청하는 것처럼 클라이언트의 요청 메시지 내용이 잘못된 경우
- 5.x.x : Server Error(서버 에러) : 서버측 사정으로 메시지 처리에 문제가 발생한 경우, 서버부하, DB 처리과정 오류, 예외처리등의 문제등이 해당 한다.

[* 자주 사용되는 상태 코드](https://namu.wiki/w/HTTP/%EC%9D%91%EB%8B%B5%20%EC%BD%94%EB%93%9C)

## URL 설계

고객의 요구사항이 정리되면 화면 UI를 설계하고, URL을 설계하게 된다. 웹 클라이언트에게 웹서버가 가지고 있는 기능을 명시해주는 중요한 단계로, 차후 로직이 변경 되더라도 URL 변경이 최소화할 수 있도록 유연한 설계가 필요하다.

![](https://lh3.googleusercontent.com/-sEjHrrEu5tk/WzDaNo_kxtI/AAAAAAAAUSM/Ytln6jgP9PsEeDB4pZYH2aLhlApKfu1NACHMYCw/I/15299282455431.png)

1. URL스킴 : 사용된 프로토콜을 의미
2. 서브도메인 : 도메인을 구별할 수 있는 단서로, www가 일반적이나 필수는 아니다.
3. 도메인 : 유일한 값으로 도메인의 최고레벨 이다.
4. TOP-LEVEL 도메인 : 도메인의 특성을 의미하는 것으로 현재는 100가지가 넘는다. (com -> company, org -> organization 등)
5. 포트번호 : 웹 서버 내의 서비스 포트번호로 생략하면 http는 80을 사용하고, https는 443을 사용한다.
6. 경로 : 파일이나 애플리케이션 경로를 의미한다.
7. 쿼리스트링 : 질의 문자열로, `&` 로 구분되며 `키=값` 으로 표현한다.
8. 프라그먼트 : 문서 내의 앵커 등을 가르킨다.

### URL을 바라보는 측면

URL은 웹 클라이언트 관점에선, 웹서버에 존재하는 애플리케이션에 대한 `API(Application Programming Interface)` 라고 할 수 있다.

이러한 API의 명명 규칙을 정하는 방법이 두 가지로 분류 되는데, `RPC(Remote Procedure Call)` 방식이고, 다른 하나는 `REST(Representational State Transfer)` 로 바라보는 방식 이다.

`RPC`란 클라이언트가 네트워크 상에서 원격에 있는 서버가 제공하는 API 함수를 호출하는 방식이다. 이 방식은 URL의 경로를 API 함수명과 매칭하고, 쿼리 파라미터를 함수의 인자로 간주한다.

이 방식은 웹개발 초기부터 사용된 방식으로 `REST` 방식이 나오면서 사용 빈도가 줄어드는 추세이다.

```text
http://blog.example.com/search?q=test&debug=true
```

또 다른 `REST` 방식은 웹서버에 존재하는 모든 요소를 리소스 라고 정의하고, URL을 통해 특정 리소스를 표현한다는 개념이다.

리소스는 시간이 지남에 따라 상태가 변할 수 있기 때문에 `리소스 상태의 교환(Representational State Transfer)` 으로 간주하고, 리소스에 대한 조작을 `GET, POST, PUT, DELETE` 등의 HTTP 메소드로 매핑 한다.

즉 `http://blog.example.com/blog/delete/1` 등으로 상태표시를 함으로써, URL을 설계하는 것이다.

### 간편 URL

REST 방식의 URL 개념을 기반으로 간단하면서 사용자에게 친숙한 URL을 표현하려는 노력이 진행되었고, `간편(Clean) URL` 이 탄생하게 되었다.

간편 URL은 쿼리스트링 없이 경로만 가진 간단한 구조의 URL 이다. 검색 엔진 처리의 최적화를 위해 생겨났고, 기억하기 쉽다는 부수적 장점도 있으며, 검색엔진 친화적, 사용자 친화적 이라고 부르기도 한다.

```text
http://example.com/index.php?page=foo ---> http://example.com/foo
http://example.com/products?category=2&pid=25 ---> http://example.com/products/2/25
```

## 웹 애플리케이션 서버

클라이언트의 요청을 받아서 처리하는 서버를 통칭하여 웹서버라고 부르는데, 2가지로 세부화가 가능하다.

- 웹서버 : 클라이언트의 요청을 받고 처리결과는 응답한다. 주로 HTML,이미지,CSS,자바스크립트 등의 파일들이다. (Apache httpd, Nginx, lighttpd, IIS등)
- 웹 애플리케이션 서버 : 웹 서버로부터 동적 페이지 요청을 받아서 요청을 처리하고, 그 결과를 웹서버로 보낸다. 주로 동적페이지 생성을 위한 프로그램 실행과 데이터베이스 연동 기능등을 처리한다. (Apache Tomcat, JBoss, WebLogic, WebSphere, Jetty, Jeus등)

### 정적 페이지 vs 동적 페이지

`정적 페이지` 라는 것은, 누가, 언제 요구하더라도 항상 같은 내용을 표시하는 웹페이지를 말한다. 즉 동일한 리소스 요청에 대해 항상 동일한 내용의 페이지를 반환한다. 주로 HTML, 자바스크립트, CSS, 이미지 만으로 이루어진 페이지가 해당된다.

`동적 페이지` 는 동일한 리소스에 대한 요청이 누가, 언제, 어떻게 요구했는지에 따라 다른 내용이 반환되는 페이지를 말한다. 온라인 쇼핑 사이트에서 사용자마다 다른 카트 내용등이 예제가 될 수 있다.

동적페이지는 프로그래밍 코드가 포함되어 있어서, 페이지 요청 시점에 `HTML`을 만들어 낸다는 차이가 있다.

초창기 웹은 정보성 컨텐츠를 하이퍼링크로 연결하는 것에 목적이 있었고, 이후 발전을 하여 데이터베이스 처리에 대한 요구가 많아지면서 웹서버와는 별도의 프로그램이 필요하게 되었다.

이러한 별도의 프로그램과 웹 서버 사이에 정보를 주고 받는 규칙을 정의한 것이 `CGI (Common Gateway Interface)` 규격 이다.

### CGI 방식의 단점

CGI 자체는 웹 서버와 독립적인 프로세스 사이에 정보를 주고받는 규격이였고, 어떤 언어를 사용해도 CGI 프로그램을 개발할 수 있다. 일반적으로 웹서버가 `C, C++, Perl, PHP` 등으로 만들어진 CGI 프로그램을 직접 호출하고, 그에 해당하는 결과를 클라이언트에게 내려주는데, 문제는 요청 하나에 독립적인 프로세스가 생성되었고, 요청이 많아질수록 메모리점유가 커지게 되면서, 시스템 부하의 주요 원인이 되었다.

이에 여러가지 대안기술이 나오게 된다.

### CGI 방식의 대안 기술

대안 기술 중 하나는 `Perl, PHP` 등을 웹서버가 자체적으로 해석하게 내장하고(인터프리터) 별도의 프로세스를 가동시키는 부하의 원인을 해소하자는 방식이다.

또 다른 방식은 애플리케이션을 처리하는 프로세스를 미리 가상으로 실행시켜 놓은 후, 웹서버의 요청을 가상머신에게 처리하게 하는 것이다.

이 방식은 발전하여, 애플리케이션 전용 가상화인 애플리케이션 서버 방식으로 발전했고, `JSP(Java Server Page), ASP(Active Server Page)` 에서 이 방식을 사용한다.

### 애플리케이션 서버 방식

이 방식은 웹서버가 직접 프로그램을 호출한다기 보다는 웹 애플리케이션 서버를 통해서 간접적으로 웹 애플리케이션 프로그램을 실행 한다.

즉 웹애플리케이션 서버는 간접적으로 웹 애플리케이션 프로그램을 실행하고, 그 결과를 웹서버에 전달해 준다. 웹서버는 그 내용을 웹 클라이언트에게 전송한다.

이렇게 분리된 서버인 웹애플리케이션 서버는 동적 페이지처리를 위한 역할로써 사용 되고, 웹서버는 정적인 페이지 처리를 위한 역할이 되었다.




