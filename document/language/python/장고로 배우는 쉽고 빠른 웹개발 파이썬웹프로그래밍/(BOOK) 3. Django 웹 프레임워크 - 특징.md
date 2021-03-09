# Django 웹 프레임워크 - 특징

[![B5790464800_l](https://lh3.googleusercontent.com/-nlHQHqoACvE/Wx5TK_hL5xI/AAAAAAAAUG8/f3QlopRFT-MhqN3PS74AhCo4rwe2t8E5ACHMYCw/I/B5790464800_l.jpg)](http://www.yes24.com/24/Goods/17295239?Acode=101)

웹서버를 개발하는 데 사용하는 파이썬 웹 프레임워크 중 가장 준비가 잘 되어 있는 프레임 워크로써, 제공하는 기능이 풍부하고, 사용자층도 두텁다.

## 일반적인 특징

2003년 로렌스 저널-월드 신문을 만들던 웹 개발팀의 내부 프로젝트로 시작하여 2005년 오픈소스 프로젝트로 공개 되었다. 결정적으로 구글의 앱 엔진에서 장고를 사용함에 따라 많은 사람들이 사용하게 되고, 대표적 파이썬 웹 프레임워크가 된다.

### MVC 패턴 기반 MTV

장고는 `MVC (Model-View-Controller)` 기반의 프레임 워크이지만 장고의 `View` 에는 `Template, Controller` 라는 개념을 가지고 있어서 명칭이 중복되는 이유 때문에, `MTV (Model-Template-View)` 라고 부른다.

### 객체관계 매핑

장고는 `객체 관계 매핑(ORM, Object-Relational Mapping)` 을 지원한다.
이것은 데이터베이스 시스템과 데이터 모델을 연결시키는 중간 다리역할을 하는데, 쉽게 얘기해서 모델을 정의하는 파이썬 코드를 작성하면, 데이터베이스 연결과 등록 삭제등의 쿼리들은 알아서 처리해 준다는 의미로, 개발자가 데이터베이스를 위한 쿼리를 작성하지 않아도 된다는 것을 의미 한다.
(물론 설정으로 일부 수정을 할 수 있다.)

> **ORM 이란**
> 
> 객체와 관계형데이터베이스(RDBMS)를 연결해 주는 역할을 한다.
> 
> 기존에 웹프로그래밍은 데이터베이스에 접근하기 위해 직접 SQL 언어를 사용해서 데이터를 요청했고, 개발자는 SQL, 데이터베이스에 접근하기 위한 드라이버API 등을 알아야 했는데, ORM이 지원되면 데이터베이스에 접근하지 않고, 객체를 사용해서 데이터를 관리할 수 있다.
> 
> 즉 웹개발자는 객체를 실행하면 ORM이 적절한 SQL 구문이나 데이터베이스 API를 호출해서 처리해 준다.


### 자동으로 구성되는 관리자 화면

장고는 프로젝트를 시작하는 시점에서 기본으로 관리자 화면을 제공해 준다. 이것을 통해 애플리케이션에서 사용하는 데이터들을 쉽게 `생성/변경` 할 수 있어서, 별도의 관리 기능을 개발할 필요가 없다.

### 우아한 URL 설계

장고는 웹 프로그래밍의 URL 디자인 개념중에 `일반적인 우아한(Elegant) URL` 방식을 채택하여 다른 프레임워크로 변경되더라도 그대로 사용할 수 있다. 덧붙여 URL 형태를 직접 결정할 수 있고, 각 URL 형태를 파이썬 함수에 직접 연결하도록 되어 있어 개발의 용이성과 가독성을 제공한다.

### 자체 템플릿 시스템

장고는 내부적으로 확장이 가능하고 디자인이 쉬운 강력한 템플릿 시스템을 가지고 있다. 이를 통해 디자인과 로직을 분리하여 독립적 개발이 가능하다.

### 캐시 시스템

동적인 페이지를 작성할 때 데이터베이스 쿼리를 수행한 후 템플릿을 해석과 동시에 관련 로직을 실행하면서 페이지를 생성하는 것은 서버에 부하를 주는 작업이다. 서버의 부하가 생긴다는 것은 사용자가 접속 후 화면을 보기까지의 시간이 길어진 다는 것을 의미한다.

이를 완벽히 해소할 수는 없지만, 일정부분 캐시 시스템을 통해 자주 이용하는 내용은 저장해 두었다가 재사용 하는데 이것이 캐시 시스템이다.

장고는 이 캐시 시스템을 메모리, 데이터베이스 내부, 파일 시스템 중 어디에나 저장할 수 있고, 사이트 전체 또는 특정 뷰의 결과, 템플릿의 일부 영역등을 선택해서 저장할 수 있다.

### 다국어 지원

동일한 소스코드를 다른 나라에서도 사용할 수 있도록 텍스트의 번역, 날짜/시간/숫자의 포맷, 타임존의 지정 등과 같은 다국어 환경을 제공 한다.

### 풍부한 개발 환경

개발에 도움이 될만한 여러 기능을 제공하는데, 테스트용 웹서버가 대표적인데, 개발 과정에서 아파치 등의 사용 웹 서버가 없어도 테스트를 진행할 수 있고, 이의 디버깅 모드를 사용해서 에러를 쉽게 파악하고 해결할 수 있다.

### 소스 변경사항 자동 반영

장고에서는 *.py 파일의 변경 여부를 감시하다가 변경이 되면 실행 파일에 내역을 바로 반영한다. 그래서 장고 테스트 웹서버를 실행 중인 상태에서 소스 파일을 수정할 경우에 웹서버를 다시 시작할 필요가 없다.

## 장고 프로그램 설치

장고의 설치 과정은 운영체제와 상관없이 동일하다.

### 기존 장고 프로그램 삭제

1.6.x 이하의 버전이라면 삭제하고 최신 버전을 설치하는 것이 좋다. 단 pip를 통해서 설치한 것은 자동으로 업그레이드 해주기 때문에 삭제과정을 불필요 하다.

일단 장고의 버전을 알고 싶다면 아래의 명령을 실행한다.

```command
> python -c "import sys; sys.path = sys.path[1:]; import django; print(django.__path__)"
```

ModuleNotFoundError 가 나오면 설치전이고, 다르게 나오면 버전을 확인하고 구버전이면 삭제한다.

```command
> cd /usr/lib/python2.7/site-packages
> rm -rf django
> rm -rf Django*
```

### pip 프로그램으로 장고 설치하기

`pip(Python Install Program)` 으로 파이썬의 오픈소스 저장소인 `PyPI(Python Package Index)` 의 SW 패키지를 설치하고 관리할 수 있다.

장고 또한 이것을 통해 쉽게 설치가 가능하다.

만약 `pip`가 설치되어 있지 않다면 `http://pip.pypa.io/en/latest/installing.html#install-pip` 사이트에 접속해서 다운받고 파이썬으로 다운받은 프로그램을 구동하면 설치가 된다.

```command
> python get-pip.py
```

`pip`를 실행할 수 있다면 이제 장고를 설치하자

```command
> pip install Django
```

설치가 진행되고, 장고는 파이썬이 설치된 폴더의 `site-packages` 하위에 설치 된다.

설치된 장고가 구버전이여서 버전업을 하려면 

```command
> pip install Django --upgrade
```

를 하면 버전업이 된다.

### 장고 프로그램 설치 확인

이제 설치된 장고를 확인해 보자

```command
> python
>>> import django
>>> print (django.get_version())
2.1.2
```

## 장고 에서의 애플리케이션 개발 방식

웹 사이트를 설계할 때 가장 먼저 하는 일은 프로그램이 해야 할 일을 적당한 크기로 나누어서 모듈화 하는 것이다. 

장고의 애플리케이션의 개념은 전체 프로그램을 `프로젝트(project)` 라고 하고, 모듈화된 단위 프로그램을 `애플리케이션(Application)` 이라고 한다. 즉 애플리케이션이 모여서 프로젝트가 된다는 개념이다.

### MTV 패턴

일반적인 `MVC (Model-View-Controller)` 패턴은 데이터(Model), 사용자 인터페이스(View), 데이터처리 로직(Controller) 를 구분지어 어떤 요소가 다른 요소에 영향을 주지 않는 방식으로 설계하는 것이다.

이렇게 개발함으로써 UI 디자이너는 데이터나 로직에 상관없이 UI를 설계작성 할 수 있고, 로직이나 데이터 설계하는 개발자도 디자인과 별도로 자신의 설계 및 개발 업무에 집중할 수 있게 된다. 파이썬도 MVC 개념을 그대로 받아들였으나, 단순히 용어만 다르게 사용한다.

* Model --> Model
* View --> Template
* Controller --> View

![](https://lh3.googleusercontent.com/-0qYCZb7inMc/W-Q0rEklpCI/AAAAAAAAVLs/DaQxwjSY3ec5mzDl11OQavUYs1fS7ePIgCHMYCw/I/15416823473103.jpg)

**장고의 MTV 모델 처리하는 과정**

1. 클라이언트로 요청을 받으면 URLconf 모듈을 이용하여 URL을 분석한다.
2. URL 분석 결과를 통해 해당 URL 에 대한 처리를 담당할 뷰를 결정한다.
3. 뷰는 자신의 로직을 실행하면서, 만일 데이터베이스 처리가 필요하면 모델을 통해 처리하고 그 결과를 반환받는다.
4. 뷰는 자신의 로직 처리가 끝나면 템플릿을 사용하여 클라이언트에 전송할 HTML 파일을 생성한다.
5. 뷰는 최종 결과로 HTML 파일을 클라이언트에게 보내 응답한다.

### Model - 데이터베이스 설계

모델이란 사용될 데이터에 대한 정의를 담고 있는 장고의 클래스 이다.

장고는 ORM 기법을 사용하여 데이터베이스를 클래스에 매핑해서 사용하는데, 하나의 모델 클래스는 하나의 테이블에 매핑되고, 모델 클래스의 속성은 테이블의 컬럼에 매핑 된다.

데이터베이스는 장고의 ORM 을 중간에 거치기 때문에, 만약 데이터베이스가 변경 되더라도 그에 필요한 설정들이 훨씬 간소화 된다.

#### ORM 기법 예제

```python
from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
```

```sql
CREATE TABLE myapp_person (
    "id" serial NOT NULL PRIMARY KEY,
    "first_name" varchar(30) NOT NULL,
    "last_name" varchar93) NOT NULL
);
```

장고는 테이블 및 컬럼을 자동생성 하기 위해 많은 규칙을 가지고 있는데, 위의 예제는 그중 아래의 규칙이 적용되었다.

- 테이블명은 애플리케이션명과 테이블 클래스명을 밑줄(_)로 연결하고, 모두 소문자로 표시한다. 원한다면 다른 이름으로 직접 지정할 수도 있다.
- Primary Key는 Person 클래스에서 정의하지 않아도 장고에서 자동으로 부여 한다. 개발자가 직접 지정할 수도 있다.

### Template - 화면 UI 설계

템플릿 파일은 *.html 확장자를 가지고, 장고의 템플릿 시스템 문법에 맞게 작성한다. 유의할 점은 템플릿 파일의 위치가 장고가 정해놓은 규칙에 맞아야 한다는 것이다.

장고에서 템플릿 파일을 찾을 때는 TEMPLATE_DIRS 와 INSTALLED_APPS 에서 검색할 수 있는데, 이 항목들은 `settings.py` 에 정의되어 있다.

만약 `settings.py` 가 아래와 같이 정의되어 있다면

```python
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'polls',
)
```

템플릿 파일은 다음과 같이 위치하게 된다.

```command
/home/shkim/pyBook/ch3/templates
/usr/lib/python2.7/site-packages/django/contrib/admin/templates
/usr/lib/python2.7/site-packages/django/contrib/auth/templates
/usr/lib/python2.7/site-packages/django/contrib/contenttypes/templates
/usr/lib/python2.7/site-packages/django/contrib/messages/templates
/usr/lib/python2.7/site-packages/django/contrib/staticfiles/templates
/home/shkim/pyBook/ch3/polls/templates
```

`TEMPLATE_DIRS` 를 찾고 나서 `INSTALLED_APPS` 항목을 찾는 다는 특징이 있다.

### URLconf - URL 설계

파이썬의 URL 지정방식은 자바나 PHP에 비해 직관적이고 이해하기 쉽다. 이런 방식을 우아한(Elegant) URL 이라 부르고, `urls.py` 파일에 처리부분을 작성할 수 있다.

```python
from django.conf.urls import patterns, url

from . import views

urlpatterns = patterns('', 
    url(r'^articles/2003/$', views.special_case_2003),
    url(r'^articles/(\d{4})/$', views.year_archive),
    url(r'^articles/(\d{4})/(\d{2})/$', views.month_archive),
    url(r'^articles/(\d{4})/(\d{2})/(\d+)/$', views.article_detail),
)
```

URL 자체에 처리 함수나 처리용 스크립트 파일 이름이 들어가면 변경이 어려워 지는데, 위와 같은 유연한 형태의 지정방식을 가지고 있다.

**장고의 URL 분석 순서**

- setting.py 파일의 ROOT_URLCONF 항목을 읽어 URLconf(urls.py)의 위치를 알아낸다.
- URLconf 모듈을 로딩하여 urlpatterns 변수에 지정되어 있는 URL 목록을 검사한다.
- 위에서부터 순서대로 URL 목록의 내용을 검사하면서 매치가 되면 검사를 종료한다.
- 매치가 된 URL의 뷰를 호출한다. 여기서 뷰는 함수 또는 클래스의 메소드 이다. 호출 시 HttpRequest 객체와 매칭할 때 추출된 단어들을 뷰에 인자로 넘겨 준다.
- 목록 끝까지 검사했는데도 매칭에 실패하면 에러를 처리하는 뷰를 호출한다.

### View - 로직 설계

장고의 뷰는 함수 또는 클래스의 메소드로 작성되고, 웹 요청을 받고 응답을 반환한다. 여기서 응답은 `HTML 데이터` 일 수도 있고, `리다이렉션 명령`일 수도 있고, `404 에러` 메시지일 수도 있다.

이러한 뷰는 보통 `views.py` 파일에 작성하지만, 원한다면 다른 파일에 작성해도 된다.

```python
from django.http import HttpResponse
import datetime

def current_datetime(request):
    now = datetime.datetime.new()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)
```

뷰 함수는 첫번째 인자로 `HttpResponse 객체(위에서는 request로 받음)` 를 받아서, 필요한 처리를 진행한 후에 `HttpResponse 객체`를 반환 한다.

만약 에러를 반환하고 싶을땐 `HttpResponseNotFound` 를 반환하면 된다.

```python
return HttpResponseNotFound('<h1>Page not found</h1>')
```

