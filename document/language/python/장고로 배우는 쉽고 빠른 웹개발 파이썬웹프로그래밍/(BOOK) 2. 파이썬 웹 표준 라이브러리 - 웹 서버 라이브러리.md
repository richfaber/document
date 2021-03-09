# 파이썬 웹 표준 라이브러리 - 웹 서버 라이브러리

[![B5790464800_l](https://lh3.googleusercontent.com/-nlHQHqoACvE/Wx5TK_hL5xI/AAAAAAAAUG8/f3QlopRFT-MhqN3PS74AhCo4rwe2t8E5ACHMYCw/I/B5790464800_l.jpg)](http://www.yes24.com/24/Goods/17295239?Acode=101)

## 웹 서버 라이브러리

프레임워크는 개발자가 웹 서버 프로그램을 개발 하기 쉽도록 저수준의 기능을 이미 만들어 놓은 기반 프로그램으로, 웹 서버 개발자는 프레임워크를 활용하여 응용 로직만 개발하면 되기 때문에 효율적 이다.

### 간단한 웹 서버

웹 서버의 역할은 http 통신에서 클라이언트 요청을 받아서 결과를 되돌려 주는 것이다.

```python
[myhttpserver.py]

from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler

class MyHandler(BaseHTTPRequestHandler):
	def do_GET(self):
		self.wfile.write("Hello World")

if __name__ == '__main__':
	server = HTTPServer( ('', 8888), MyHandler)
	print "Started WebServer on port 8888..."
	server.serve_forever()

```

> - BaseHTTPServer
>   - 기반 서버 클래스용으로, HTTPServer 정의
>   - 핸들러 클래스용으로, BaseHTTPRequestHandler 정의
>   - 테스트용 웹 서버를 실행하는 함수, test() 정의
>   - 기반 클래스로, HTTP 프로토콜 처리
> 
> - SimpleHTTPServer
>   - 기반 서버 클래스인 HTTPServer 를 임포트하여 사용
>   - 핸들러 클래스용으로, SimpleHTTPRequestHandler 정의
>   - 테스트용 웹 서버를 실행하는 함수, test() 정의
>   - GET 과 HEAD 메소드 처리 가능
> 
> - CGIHTTPServer
>   - 기반 서버 클래스인 HTTPServer를 임포트하여 사용
>   - 핸들러 클래스용으로 CGIHTTPRequestHandler 정의
>   - 테스트용 웹 서버를 실행하는 함수, test() 정의
>   - POST 와 CGI 처리 가능

파이썬은 위와 같이 웹 서버를 만드는데 필요한 라이브러리를 3개의 모듈로 나누어 정의하고 있다.

### BaseHTTPServer 모듈

웹서버를 만드는 기반이 되는 클래스는 `HTTPServer, BaseHTTPRequestHandler` 이고, 이 클래스들은 `BaseHTTPServer` 모듈에 정의되어 있기 때문에, import 하면 사용할 수 있다.

### SimpleHTTPServer 모듈

앞선 예제 에서는 자신의 핸들러를 코딩 하였는데, `SimpleHTTPServer` 모듈 에는 `SimpleHTTPRequestHandler` 클래스가 정의 되어 있고, 그 안에 `do_GET(), do_HEAD()` 메소드가 정의 되어 있어서 GET 및 HEAD 방식을 처리 할 수 있다.
(하지만 POST 등 그 외에 HTTP 메소드는 처리할 수 없다.)

이러한 이유로 간단하게 바로 웹서버를 구동할 수 있다.

```python
$ python -m SimpleHTTPServer 8888
```

### CGIHTTPServer 모듈

`SimpleHTTPServer` 모듈과 마찬가지로, `CGIHTTPRequestHandler` 핸들러가 구현되어 있어서, 즉시 웹서버를 실행할 수 있다.

`CGIHTTPRequestHandler` 클래스에는 `do_POST()` 메소드가 정의되어 있어서 POST 방식을 처리할 수 있다.

게다가 `SimpleHTTPRequestHandler` 를 상속받고 있기 때문에, GET, HEAD 방식을 처리할 수도 있다.

```python
python -m CGIHTTPServer 8888
```

### xxxHTTPServer 모듈 간의 관계

모든 HTTP 웹서버는 BaseHTTPServer 모듈의 HTTPServer 클래스를 사용하여 작성하고, 웹서버에 사용되는 핸들러는 BaseHTTPServer 모듈의 BaseHTTPRequestHandler를 상속받아 작성 한다.

즉, `BaseHTTPServer` 모듈이 기본이고, 확장한 것이 `SimpleHTTPServer` 모듈이고, **CGIHTTPServer** 모듈은 `SimpleHTTPServer` 모듈을 확장하여 작성된 것이다.

## CGI/WSGI 라이브러리

파이썬은 `WSGI(Web Server Gateway Interface)` 규격을 정의하고, 웹서버는 이를 준수해야 한다.

이것은 웹서버와 웹애플리케이션을 연결해 주는 규격 이고, 장고(Django) 와 같은 파이썬 웹프레임워크를 개발 하거나, 웹프레임워크를 아파치와 같은 웹서버와 연동할 때 사용 한다.

### CGI 관련 모듈

사용자의 요청은 웹 서버에 있는 파일을 있는 그대로 요청 하는 정적요청(Static Request)과 현재의 시간을 요청하는 것처럼 동일한 요청 이라도 시점에 따라 응답 내용이 달라지는 동적요청(Dynamic Request) 로 구분 된다.

동적 요청은 웹서버에서 처리하지 않고, 별도의 애플리케이션에서 처리하는 것이 보통으로, 동적요청을 처리하는 애플리케이션에게 넘겨주고 결과를 받는 기능이 필요 하다.

이렇게 웹 서버와 애플리케이션 간에 데이터를 주고받기 위한 규격이 `CGI(Common Gateway Interface)` 이다.

파이썬 표준 라이브러리 에서는 CGIHTTPServer 모듈과 cgi 모듈로 이 기능을 제공하고 있다.

### WSGI 개요

CGI 방식은 요청이 들어올 때마다 처리를 하기 위한 프로세스를 생성하기 떄문에, 짧은 시간에 수천, 수만 건과 같은 다량의 요청을 받는 경우 서버의 부하가 높아지고, 프로세스가 멈추거나 다운될 수 있다.

이것을 해결하기 위한 방법으로 Fast CGI, 쓰레드 처리 방식, 외부 데몬 프로세스 방식 등 여러가지가 사용 되고 있다.

하지만 개발자들이 이와 같은 연동방식을 맞추는데 어려움이 있기에, 중간에 이런 까다로운 처리를 장고와 같은 웹 프레임워크가 대신해 준다.

또한 웹 애플리케이션을 한번만 작성하면 다양한 웹서버에서 동작이 가능하도록 `웹서버와 웹애플리케이션 간의 연동규격`을 정의한 것이 `WSGI 규격` 이다.

### WSGI 서버의 애플리케이션 처리 과정

WSGI 규격에 따라 애플리케이션을 작성하고, 해당 애플리케이션에서 웹 클라이언트의 요청을 처리하는 과정을 알아 보자.
 
이 과정은 **웹 서버에서 클라이언트의 요청을 받아서 WSGI 서버로 처리를 위임**하고, WSGI 서버는 **애플리케이션을 실행하여 그 결과를 웹서버**에게 되돌려주고, 웹서버는 **클라이언트에게 응답하는 일련의 과정**이다.

    1. Request
    2. Request URL 분석
    3. WSGIScriptAlias에 정의된 URL이면, WSGI 서버에 처리 위임
    4. 파라미터 전달
    5. WSGIScriptAlias 에 정의된 wsgi.py 실행
    6. application(environ, start_response) 함수 호출
    7. call
    8. environ 환경변수 처리
    9. 뷰 처리, HTTPRequest 객체 생성
    10. start_response() 함수 호출
    11. return HTTPResponse
    12. return
    13. 표준 출력(stdout) 결과 출력
    14. 처리 결과
    15. Response

