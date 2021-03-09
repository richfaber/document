# 파이썬 웹 표준 라이브러리 - 웹 라이브러리 구성, 웹 클라이언트 라이브러리

[![B5790464800_l](https://lh3.googleusercontent.com/-nlHQHqoACvE/Wx5TK_hL5xI/AAAAAAAAUG8/f3QlopRFT-MhqN3PS74AhCo4rwe2t8E5ACHMYCw/I/B5790464800_l.jpg)](http://www.yes24.com/24/Goods/17295239?Acode=101)

파이썬 설치 시 표준라이브러리가 있는데, 웹 클라이언트 프로그래밍이냐 웹 서버 프로그래밍이냐에 따라 사용하는 라이브러리 모듈이 달리 구성된다.

## 웹 라이브러리 구성

```
- 사용자 프로그램/애플리케이션
    - 웹서버 프로그래밍
        - Web Framework
            - Django, Flask
            - Tornado, 등
        - http.cookie
        - http.server
            
    - 웹클라이언트 프로그래밍
        - urllib 패키지
            - urllib.parse
            - urllib.request
            - urllib.error
            - urllib.response
            - urllib.robotparser
        - http.client
        - http.cookiejar
```

urllib 패키지에는 웹클라이언트를 작성하는데 사용되는 모듈들이 있고, 자주 사용되는 것들의 집합이다.

웹프레임워크는 사용자 프로그램과 저수준의 http.server 라이브러리 중간에서 웹서비스 개발을 좀 더 편리하게 해주면서, 표준 라이브러리의 기능을 확장해 주는 역할을 한다.

웹 클라이언트 개발은 주로 urllib 패키지를 사용하며, http.client 모듈이 HTTP 프로토콜 처리와 관련된 저수준 클라이언트 기능을 제공하는 반면에 urllib 패키지의 모듈들은 HTTP 서버뿐 아니라 FTP 서버 및 로컬 파일 등, 클라이언트에서 중요한 함수와 클래스 등을 제공한다.

주로 URL 처리와 서버 액세스 관련 API를 제공하며, HTTP 프로토콜과 관련해서는 http.client 모듈의 API를 더 추상화하여 좀더 쉬운 고수준의 API를 제공한다.

## 웹 클라이언트 라이브러리

웹 브라우저 외에도 웹 서버에 요청을 보내는 애플리케이션은 모두 웹 클라이언트로 볼 수 있고, 즉 브라우저가 아닌 외부에 API 를 제공하는 OpenAPI 를 제공할 수 있는데, 대부분 `http/https 프로토콜` 을 사용하기 때문에 이런 클라이언트 프로그래밍을 할 수 있도록 여러 가지 라이브러리를 제공한다.

### urlparse 모듈

URL의 분해, 조립, 변경 등을 처리하는 함수를 제공한다.

```python
> python
Python 2.7.10 (default, Oct  6 2017, 22:29:07)
[GCC 4.2.1 Compatible Apple LLVM 9.0.0 (clang-900.0.31)] on darwin
Type "help", "copyright", "credits" or "license" for more information.

>>> from urlparse import urlparse
>>> result = urlparse("http://www.python.org:80/guide/python.html;philosophy?overall=3#n10");
>>> result
ParseResult(scheme='http', netloc='www.python.org:80', path='/guide/python.html', params='philosophy', query='overall=3', fragment='n10')
```
    
urlparse() 함수는 URL을 파싱하여 `ParseResult` 인스터스를 반환한다.

- scheme : URL에 사용된 프로토콜
- netloc : 네트워크 위치, `user:password@host:port` 형식
- path : 파일이나 애플리케이션 위치
- params : 전달된 매개변수
- query : 질의 문자열로, 앰퍼샌드(&) 로 구분된 `키=쌍` 형식으로 표시
- fragment : 문서 내의 앵커 등 조각을 지정

### urllib2 모듈

주어진 URL에서 데이터를 가져오는 기본 기능을 제공 한다.

기본 형식은 아래와 같다.

```python
urlopen(url, data=None, [timeout])
```

- url 인자로 지정한 URL을 연결하고, 유사 파일 객체를 반환한다. url 인자는 문자열이거나, Request 클래스의 인스턴스가 올 수 있다.
- url에 file 스킴을 지정하면 로컬 파일을 열 수 있다.
- 디폴트 요청 방식은 GET 이고, 웹서버에 전달할 파라미터가 있으면 질의 문자열을 url 인자에 포함해서 보낸다.
- 요청을 POST 로 보내려면 data 인자에 질의 문자열을 지정하면 된다.
- 옵션인 timeout 은 응답을 기다리는 타임아웃 시간을 초로 표시한다.

`urlopen()` 함수만 잘 다루어도 웬만한 웹 클라이언트는 대부분 작성할 수 있다.

```python
>>> from urllib2 import urlopen
>>> f = urlopen("http://www.example.com")
>>> print f.read(500)
```

위에 예제는 브라우저창에서 `www.example.com` 이라고 입력한 것과 같은 데이터를 웹서버로부터 수신한다. 이번에는 `POST` 방식으로 요청을 해보자.

설명을 위한 예제로 실제 동작을 위해서는 `POST 요청을 처리할 수 있는 서버` 가 필요하다.

```python
>>> from urllib2 import urlopen
>>> data = "query=python"
>>> f = urlopen("http://www.example.com", data)
>>> print f.read(300)
```

특정한 요청 헤더를 지정하고 싶은 경우에는 URL을 지정하는 방식을 변경한다.

즉 `Request` 객체를 생성하고 `add_header(), add_data()` 메소드로 서버요청을 하면 된다.

```python
>>> import urllib2
>>> req = urllib2.Request("http://www.example.com")
>>> req.add_header("Content-Type", "text/plain")
>>> req.add_data("query=python")
>>> f = urllib2.urlopen(req)
>>> print f.read(300)
```

인증 데이터나 쿠키 데이터 등의 조금 더 복잡한 요청을 보내보자.

이 예제는 urllib2 모듈에 정의되어 있는 `HTTPBasicAuthHandler` 클래스를 사용하여 인증데이터를 보내는 프로그램 이다.

```python
import urllib2

# HTTP 기본 인증 요청을 위한 핸들러 생성
auth_handler = urllib2.HTTPBasicAuthHandler()
auth_handler.add_password(realm="PDQ Application",
    uri="https://mahler:8092/site-updates.py",
    user="klem",
    passwd="kadidd!ehopper")
opener = urllib2.build_opener(auth_handler)

# 디폴트 오프너로 설정하면 urlopen() 함수로 요청 가능
urllib2.install_opener(opener)
u = urllib2.urlopen("http://www.example.com/login.html")    
```

다음은 `HTTPCookieProcessor` 클래스를 사용하여 쿠키 데이터를 같이 보내는 프로그램 이다.

```python
import urllib2

# 쿠키 핸들러 생성, 쿠키 데이터 처리는 디폴트로 CookieJar 객체를 사용함
cookie_handler = urllib2.HTTPCookieProcessor()

opener = urllib2.build_opener(cookie_handler)
urllib2.install_opener(opener)

# 쿠키 데이터와 함께 서버로 요청
u = urllib2.urlopen("http://www.example.com/login.html")
```

다음은 `ProxyHandler, ProxyBasicAuthHandler` 클래스를 사용하여 프록시 서버를 통과해서 웹 서버로 요청을 보내는 프로그램 이다.

```python
import urllib2

proxy_handler = urllib2.ProxyHandler({'http': 'http://www.example.com:3128/'})
proxy_auth_handler = urllib2.ProxyBasicAuthHandler()
proxy_auth_handler.add_password('realm', 'host', 'username', 'password')

opener = urllib2.build_opener(proxy_handler, proxy_auth_handler)

# install_opener(), urlopen() 함수 대신에 직접 open() 함수를 사용할 수도 있음
u = opener.open('http://www.example.com/login.html')
```

### httplib 모듈

대부분의 웹클라이언트 프로그램은 `urllib2` 모듈의 정의된 기능만으로도 작성이 가능하지만, `GET, POST` 이외에 방식으로 요청을 보내거나, 요청 헤더와 바디 사이에 타이머를 두어 시간을 지연시키는 등 `urllib2` 모듈로는 쉽게 처리할 수 없는 경우나 `HTTP 프로토콜 요청` 에 대한 더 세밀한 기능이 필요할 때 `httplib` 모듈을 사용할 수 있다.

`urllib2` 모듈도 `httplib` 모듈에서 제공하는 API를 사용해서 작성된 것으로, `urllib2` 의 모든것은 `httplib` 에도 사용이 가능하다.

> httplib 모듈 사용 시 코딩 순서
> 1. 연결 객체 생성 : conn=httplib.HTTPConnection("www.python.org")
> 2. 요청을 보냄 : conn.request("GET", "/index.html")
> 3. 응답 객체 생성 : response = conn.getresponse()
> 4. 응답 데이터를 읽음 : data = response.read()
> 5. 연결을 닫음 : conn.close()

httplib 모듈을 이용하여 GET 메소드 요청을 보내는 예제 이다.

```python
>>> import httplib
>>> conn = httplib.HTTPConnection("www.example.com")
>>> conn.request("GET", "/index.html")
>>> r1 = conn.getresponse()
>>> print r1.status, r1.reason
200 OK
>>> data1 = r1.read()
>>> conn.request("GET", "/parrot.spam")
>>> r2 = conn.getresponse()
>>> print r2.status, r2.reason
404 Not Found
>>> data2 = r2.read()
>>> conn.close()
```

- HTTPConnection() 클래스 생성시, 첫번째 인자는 url 이 아니라 host 이다. (http://www.example.com 으로 하면 에러)
- GET 방식을 명시적으로 선언한다. `request(method, url, body, headers)` 형식
- r1.msg 속성에는 응답 헤더 정보가 들어가 있다.

다음은 httplib 모듈을 사용하여 HEAD 메소드로 요청을 보내는 예제 이다.

```python
>>> import httplib
>>> conn = httplib.HTTPConnection("www.example.com")
>>> conn.request("HEAD", "/index.html")
>>> res = conn.getresponse()
>>> print res.status, res.reason
200 OK
>>> data = res.read()
>>> print len(data)
0
>>> data == ''
True
```

`HEAD` 요청을 넣었지만, `BODY` 응답이 없기 때문에 `data` 는 비어있다.

다음은 `POST 요청` 을 넣는 예제 이다.

```python
>>> import httplib, urllib
>>> params = urllib.urlencode({ '@number': 12524, '@type': 'issue', '@action': 'show'})
>>> headers = {'Content-type': 'application/x-www-form-urlencoded', 'Accept': 'text/plain' }
>>> conn = httplib.HTTPConnection('bugs.python.org')
>>> conn.request("POST", "", params, headers)
>>> response = conn.getresponse()
>>> print response.status, response.reason
302 Found
>>> data = response.read()
>>> data
'Redirecting to <a href="bugs.python.org/issue12524">http://bugs.python.org/issue12524</a>'
>>> conn.close()
```

- POST 요청으로 보낼 파라미터에 대해 URL 인코딩을 한다.
- POST 헤더를 지정한다
- bugs.python.org 사이트에 접속을 준비하고, HTTPConnection() 클래스 생성 시, 첫 번째 인자는 url이 아니라 host 이다.
- POST 방식임을 명시하고, 파라미터와 헤더를 보낸다.

다음은 `PUT 요청` 을 보내는 예제 이다.

```python
>>> import httplib
>>> BODY = "***filecontents***"
>>> conn. httplib.HTTPConnection("localhost", 8888)
>>> conn.request("PUT", "/file", BODY)
>>> response = conn.getresponse()
>>> print response.status, response.reason
200 OK
```



