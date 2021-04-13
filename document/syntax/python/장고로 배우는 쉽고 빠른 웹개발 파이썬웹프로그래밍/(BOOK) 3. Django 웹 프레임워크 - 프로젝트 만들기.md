# Django 웹 프레임워크 - 프로젝트 만들기

[![B5790464800_l](https://lh3.googleusercontent.com/-nlHQHqoACvE/Wx5TK_hL5xI/AAAAAAAAUG8/f3QlopRFT-MhqN3PS74AhCo4rwe2t8E5ACHMYCw/I/B5790464800_l.jpg)](http://www.yes24.com/24/Goods/17295239?Acode=101)

## 프로젝트 뼈대 만들기
* 
간단한 투표용 프로젝트를 만들어보자. 아래의 뼈대는 개별적으로 폴더를 생성해서 만들지 않고, `django-admin.py` 를 이용해서 만들것이다.

- quesbank
    - db.sqlite3 - SQLite3 데이터베이스 파일
    - manage.py - 장고의 명령어를 처리하는 파일
    - mysite - 프로젝트명으로 만들어진 디렉토리, 프로젝트 관련 파일들이 있음
        - _init_.py - 이 파일이 있으면 파이썬 패키지로 인식
        - settings.py - 프로젝트 설정파일
        - urls.py - 프로젝트 레벨의 URL 패턴 정의
        - wsgi.py - Apache 같은 상용 웹서버와 WSGI 규격으로 연동하기 위한 파일
    - polls 
        - _init_.py
        - admin.py - Admin 사이트에 모델 클래스를 등록해 주는 파일
        - migrations
            - _init_.py
        - models.py - 데이터베이스 모델 클래스를 정의
        - tests.py - 단위 테스트용 파일
        - views.py - 뷰 함수를 정의하는 파일
 
파이썬만 설치하고, 장고를 설치하지 않았다면 장고를 먼저 설치해야 한다.
 
```command
> pip install django
```

파이썬이 정상적으로 설치되었다면 pip(파이썬 패키지 관리자) 명령어를 실행할 수 있고, `pip install django` 를 통해서 장고를 설치하자.

정상적으로 설치가 되었다면, 장고명령어를 통해서 프로젝트를 만들어 보자.

```command
> django-admin.py startproject poll
> mv poll quesbank
> cd quesbank
``` 

`poll` 이라는 폴더가 생기고, 그 안에 또 `poll` 폴더가 생기는데, 바깥의 `poll` 폴더는 다른 이름으로 바꿔도 무방하다. 초기에 같은 폴더명으로 생기는 듯(?) 하다.

나는 가독성을 위해서 `quesbank` 라는 이름으로 바꿨다.

이제 `polls` 라는 애플리케이션을 만들어 보자

```command
> cd quesbank
quesbank> python manage.py startapp polls 
```

이렇게 하면 `polls` 라는 폴더를 만들고 그에 필요한 파일을 자동으로 생성해 준다.ㄴ

### 데이터베이스 변경사항 반영

Oracle, MySQL, MongoDB 등 어떤 데이터베이스든 상관은 없는데, 장고는 기본으로 `SQLite3` 데이터베이스를 사용한다고 가정하고 관련파일들을 만든다. 물론 이것들은 `settings.py` 를 이용해서 바꿀 수 있다.

나중에 바꾼다 치고, 데이터베이스 설계나 테이블을 만들지도 않았는데, 뜬금없이 데이터베이스를 왜 신경써야 할까?

장고는 개발 시 사용자와 사용자의 그룹 테이블이 필요하다고 가정하고 설계되어 있다.

개발자가 테이블을 안만들었더라도, 사융자 및 사용자그룹 테이블을 만들어 주기 위해 한번 실행해 줘야 하는 것이 있다.

```command
quesbank> python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying sessions.0001_initial... OK
```

실행하고 나면 `SQLite3` 용 데이터베이스 파일인 `db.sqlite3` 파일이 생성된다. 

아무것도 안했지만 서버를 구동해 보자.

```command
quesbank> python manage.py runserver
Performing system checks...

System check identified no issues (0 silenced).
November 18, 2018 - 06:06:01
Django version 2.1.3, using settings 'poll.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

브라우저를 열고 `http://127.0.0.1:8000/` 접속해 보자.

![](https://lh3.googleusercontent.com/-k8LSAS_1K2s/W_EBocQFRMI/AAAAAAAAVOA/uuyBI3uLFJwvNTXTRMh7Cb4CzrRRVNpHwCHMYCw/I/15425212471400.jpg)

정상적으로 열렸다면 장고가 기본으로 제공하고 있는 `admin` 사이트에 접속해 보자.

`http://127.0.0.1:8000/admin`

![](https://lh3.googleusercontent.com/-tUJrG0l6wkw/W_EB5AxSMQI/AAAAAAAAVOI/Qbe7xJZNkWgP-JjYjAqVuqPjOJvjcU26wCHMYCw/I/15425213153953.jpg)

로그인은 할 수 없다. 계정생성을 해야 한다.

```command
quesbank> python manage.py createsuperuser
Username (leave blank to use 'user'): admin
Email address:
Password: admin1234
Password (again): admin1234
This password is too common.
Bypass password validation and create user anyway? [y/N]: y
Superuser created successfully.
```

비밀번호가 너무 일반적이라고 경고를 먹었(?)지만, 이제 접속해 보자.

![](https://lh3.googleusercontent.com/-vGJ06G6b21A/W_EGAB0g2sI/AAAAAAAAVOU/aMQk0XRmuwgBUsi-2JOx6KcMk7v6BatUgCHMYCw/I/15425223668001.jpg)

![](https://lh3.googleusercontent.com/-nZ1Yh-Qe1cI/W_EGKcv_qqI/AAAAAAAAVOY/5jg4195NGxILOmI4EoitIToQl6P3A2CKQCHMYCw/I/15425224079246.jpg)

`Users` 를 클릭해서 들어갔더니, 방금 만들었던 `admin` 계정이 나왔다. 이 admin 사이트를 통해서 `Users` 와 `Groups` 테이블을 포함하여 데이터 입력, 변경, 삭제 등의 작업을 할 수 있다.

## 애플리케이션 개발하기 - 설계

이제 해볼 예제는 질문을 보여주고, 선택하고 나면, 결과가 나오는 애플리케이션 이다.

- index.html : 최근에 조사하고 있는 질문의 목록
- detail.html : 질문에 대한 객관식 선택항목
- result.html : 투표 결과를 보여준다

간단히 테이블설계를 해보면 아래와 같다.

**Question 테이블 설계**

| 컬럼명        | 타입         | 제약 조건                  | 설명           |
|---------------|--------------|----------------------------|----------------|
| id            | integer      | NotNull, PK, AutoIncrement | Primary Key    |
| question_text | varchar(200) | NotNull                    | 질문 문장      |
| pub_date      | datetime     | NotNull                    | 질문 생성 시각 |

**Choice 테이블 설계**

| 컬럼명      | 타입         | 제약 조건                        | 설명           |
|-------------|--------------|----------------------------------|----------------|
| id          | integer      | NotNull, PK, AutoIncrement       | Primary Key    |
| choice_text | varchar(200) | NotNull                          | 단변 항목 문구 |
| votes       | integer      | NotNull                          | 투표 카운드    |
| question_id | integer      | NotNull, FK (Question.id), Index | Foreign Key    |

* Question 테이블 : 질문 저장 테이블
* Choice 테이블 : 질문볍 답변 저장 테이블
* 모든 컬럼은 Null을 담을 수 없다
* Primary Key는 자동 증가 속성
* Choice 테이블의 question_id 컬럼은 Question 테이블과 Foreign Key 와 관계를 맺고, Index를 생성하도록 한다.

## 애플리케이션 개발하기 - Model 코딩

장고는 `객체 관계 매핑(ORM, Object-Relational Mapping)` 를 지원하기 때문에, 설계된 테이블을 직접 생성하지 않고, 장고에게 위탁할 것이다.

이제 편집기로 해당 파일들을 편집해 보자

### 데이터베이스 지정

장고는 기본으로 `SQLite3` 데이터베이스 엔진을 사용하도록 지정되어 있는데, `MySQL, Oracle` 같은 다른 데이터베이스로 변경을 하고 싶을 땐 `settings.py` 파일을 수정하면 된다.

여기서는 `quesbank > poll > settings.py` 파일이 해당된다.

파일 중간쯤에 `SQLite3` 로 기본셋팅된 항목을 발견할 수 있다.

![](https://lh3.googleusercontent.com/-tiEFaeGr1Ow/W_ERoqEVVgI/AAAAAAAAVOk/JqqYuPh9kVcMoY5EIBrHow68P2QREh4KQCHMYCw/I/15425253453619.jpg)

이 파일에 프로젝트 진행에 필요한 몇가지 설정을 해보자

**생성한 polls 애플리케이션 등록하기**

![](https://lh3.googleusercontent.com/-y3wv9ks-a-0/W_ESAk6B5qI/AAAAAAAAVOs/bvyrIhs-1AA8vjnitQNjZYvsifmlRuKJwCHMYCw/I/15425254422128.jpg)

`INSTALLED_APPS` 변수 마지막에 `polls`를 추가했다.

**타임존을 한국 시간으로 변경**

![](https://lh3.googleusercontent.com/-My1Q-AiyY9w/W_ESTlA4ZdI/AAAAAAAAVO0/8pxvxbFFC7kZnszivjjcErtG1_G3rUylACHMYCw/I/15425255179149.jpg)

### 테이블 정의

이제 `polls 애플리케이션` 의 테이블 정의를 해보자. 해당 파일은 `quesbank > polls > models.py` 파일을 수정하면 된다.

**polls/models.py**

```python
from django.db import models

# Create your models here.

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self): 
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey('Question', on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text
```

(`python2.x` 버전과 `python3.x` 버전의 약간의 문법 차이가 있음. 해당예제는 `python3.x` 이다.)

- PK(Primary Key)는 클래스에 지정해주지 않아도 기본으로 (Not Null, Autoincrement) 로 설정된다.
- DateTimeField() 에 정의된 `date_published` 는 `pub_date` 컬럼에 대한 레이블로, admin 사이트에서 문구를 볼 수 있다
- FK (Foreign Key) 는 항상 다른 테이블의 `PK` 에 연결되므로, `Question 클래스` 의 `question_id` 까지 지정할 필요 없이 `Question 클래스` 만 지정하면 된다.
- `__str__` 함수는 객체를 스트링으로 표현할 때 사용되고, 테이블명을 보여줘야 되는 Admin 사이트 등에서 표시된다. 만약 없으면 제대로 된 이름이 표시되지 않는다. (에러를 뿜지는 않음)

### Admin 사이트에 테이블 반영

Admin 사이트를 다시 접속해 보자. 별차이가 없다. 이제 models.py 에 정의된 테이블을 Admin 에 등록해 보자

`quesbank > polls > admin.py` 

```python
from django.contrib import admin
from polls.models import Question, Choice

admin.site.register(Question)
admin.site.register(Choice)
```

admin에 노출 하려면 이렇게 `admin.py` 파일에 등록하는 것을 기억하자. 정상등록 됬다면 화면에서 볼 수 있다.

![](https://lh3.googleusercontent.com/-OMvKBjFoS_c/W_EX8RAEdqI/AAAAAAAAVPA/bisc4uqodSszJ5ssmm7bQmKX-mfj_c3EQCHMYCw/I/15425269600781.jpg)

### 데이터베이스 변경사항 반영

테이블의 신규 생성, 정의변경 등 데이터베이스에 변경이 있으면, 이를 데이터베이스에 실제로 반영하는 작업을 해야 한다. 

```command
quesbank> python manage.py makemigrations
Migrations for 'polls':
  polls/migrations/0001_initial.py
    - Create model Choice
    - Create model Question
    - Add field question to choice

quesbank> python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, polls, sessions
Running migrations:
  Applying polls.0001_initial... OK
```

마이그레이션(migration) 이란 용어는 장고 1.7 부터 사용된 개념으로, 테이블 및 필드의 생성, 삭제, 변경등과 같은 데이터베이스에 변경사항을 기록하는 개념이다.

`makemigrations` 명령으로 `polls/migrations` 하위폴더가 생기고, `python3 manage.py migrate` 명령어를 실행하면 `polls/migrations` 의 내용을 반영한다.

여기까지 하면 데이터테이블이 준비된 것이다.

## 애플리케이션 개발하기 - View 및 Template 코딩

이제 URL을 구성하고, 화면을 만들어 보자

### 목록 페이지 만들기

| URL 패턴          | 뷰 이름     | 뷰가 처리하는 내용                             |
|-------------------|-------------|------------------------------------------------|
| /polls/           | index()     | index.html 템플릿을 보여준다                   |
| /polls/5          | detail()    | detail.html 템플릿을 보여준다                  |
| /polls/5/vote/    | vote()      | detail.html에 있는 폼을 POST 방식으로 처리한다 |
| /polls/5/results/ | results()   | results.html 템플릿을 보여준다                 |
| /admin/           | (장고 기능) | admin 사이트를 보여준다                        |

URL 구상이 되었고, 실제 반영을 해보자

URL 을 구성하기 전에, views 를 먼저 만들어 보자

**polls/views.py**

```python
from django.shortcuts import render
from polls.models import Question

def index(request):
    latest_question_list = Question.objects.all().order_by('-pub_date')[:5]
    context = {'latest_question_list': latest_question_list}
    return render(request, 'polls/index.html', context)
```

**Question 테이블 설계**

| 컬럼명        | 타입         | 제약 조건                  | 설명           |
|---------------|--------------|----------------------------|----------------|
| id            | integer      | NotNull, PK, AutoIncrement | Primary Key    |
| question_text | varchar(200) | NotNull                    | 질문 문장      |
| pub_date      | datetime     | NotNull                    | 질문 생성 시각 |

**Choice 테이블 설계**

| 컬럼명      | 타입         | 제약 조건                        | 설명           |
|-------------|--------------|----------------------------------|----------------|
| id          | integer      | NotNull, PK, AutoIncrement       | Primary Key    |
| choice_text | varchar(200) | NotNull                          | 단변 항목 문구 |
| votes       | integer      | NotNull                          | 투표 카운드    |
| question_id | integer      | NotNull, FK (Question.id), Index | Foreign Key    |

- 단축함수인 `render()` 함수를 `import` 한다.
- `Question` 테이블을 사용하기 위해 `import` 한다.
- `index` 함수명으로 뷰를 정의하고, `request` 필수 인자를 받는다.
- 템플릿에 넘겨줄 `latest_question_list` 를 정의하고 있다. `Question` 테이블의 모든 필드를 집어든 후에,  `pub_date` 컬럼을 역순으로 5개를 가져와서 `latest_question_list` 변수에 담는다.
- `render()` 함수를 통해서, `request - HttpResponse` 와 전달대상 뷰파일 `polls/index.html` 을 지정하고, 마지막으로 추출된 데이터인 `context` 변수를 전달한다. 이렇게 전달된 데이터는 `view` 화면에서 `latest_question_list` 변수로 접근할 수 있다.

이제 템플릿 파일에서 전달된 변수를 사용해 보자. 장고의 템플릿 파일은 기본설정 으로 `templates` 폴더 에서 참조하게 되어 있는데, 현재 폴더의 `templates` 가 아니라 엄한(? 장고가 설치된 하위?) 곳을 찾기 때문에, `settings.py` 를 수정해 줘야 한다.

**poll/settings.py**

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [ os.path.join(BASE_DIR, 'templates') ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

위에 `DIRS` 속성에 `templates` 를 지정해 주자. 그러면 현재 프로젝트 폴더의 하위 디렉토리 `templates` 를 참조하게 된다.

이제 설정이 되었으니, 폴더 만들고 html 도 만들자.

**templates/polls/index.html**

`templates` 폴더를 만들고, 해당 경로에 `index.html` 을 만들자

```python
{% if latest_question_list %}
    <ul>
        {% for question in latest_question_list %}
        <li><a href="/polls/{{ question.id }}">{{ question.question_text }}</a></li>
        {% endfor %}

    </ul>
{% else %}
<p>No polls are available.</p>
{% endif %}
```

이제 `url` 구성을 해보자

**poll/urls.py**

```python
from django.contrib import admin
from django.urls import path
from polls import views

urlpatterns = [
    path('polls/', views.index, name='pollIndex'),
    path('admin/', admin.site.urls),
]
```

`polls` 의 `views` 를 import 하고, `urlpatterns` 에서 `views 안에 있는 index` 함수를 `polls/` URL에 연결한다. 이 URL 의 축약이름은 `pollIndex` 로 정했다.

이제.. `http://127.0.0.1:8000/polls/` 를 브라우저 에서 열어보자.

![](https://lh3.googleusercontent.com/-Mmp2lbaMIOU/W_EiG20-52I/AAAAAAAAVPM/DN7B8m7K_Xw3PImJ_CjTR0S1rqdooZaeQCHMYCw/I/15425295617397.jpg)

데이터가 없기 때문에, 아무것도 나오지 않는다. 여기서 다시 `template` 를 볼 필요가 있다.

```python
{% if latest_question_list %}
    <ul>
        {% for question in latest_question_list %}
        <li><a href="/polls/{{ question.id }}">{{ question.question_text }}</a></li>
        {% endfor %}

    </ul>
{% else %}
<p>No polls are available.</p>
{% endif %}
```

`latest_question_list` 는 `polls/views.py` 에서 넘겨줬기 때문에 그렇다 치고, 
`{% for question in latest_question_list %}` 이것도 뭐.. 배열로 넘어와서 `for` 문 돌아가나보다 치고,
그 안에 `question.id` 가 있는데, `polls/models.py` 에선 `Question 함수 내에 id` 속성이 없음을 확인할 수 있는데, `id` 는 `PrimaryKey` 로 자동으로 부여된다는 것을 확인하자. (따로 부여해 주지 않아도 자동생성)

**polls/models.py**

```python
from django.db import models

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self): 
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey('Question', on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text
```

즉 테이블을 의미하는 클래스명(Question, Choice) 에 속성들이 `column` 이 되는데, `id` 컬럼은 따로 지정해 두지 않아도 자동으로 생성 된다는 것을 기억하자.

### 보기 페이지 만들기

목록페이지를 만들기 전에, `http://127.0.0.1:8000/admin/` 에 접속하여 질문을 하나 등록해서 목록에 제대로 나오는지 확인해 보자.

![](https://lh3.googleusercontent.com/-2kzqu8z1LgU/W_pSwrglmoI/AAAAAAAAVQ8/4MRBSSg1FAkJaeTeY4RbSzqNmaKURNGwQCHMYCw/I/15431318398378.jpg)

Questions 의 `+Add` 버튼을 눌러서 질문을 추가하자

![](https://lh3.googleusercontent.com/-iNFU9Gujmv8/W_pTEydYo1I/AAAAAAAAVRE/8CQauL48elEl-EdCIxONrUVHxgVifEiaQCHMYCw/I/15431319229928.jpg)

`SAVE` 를 하고 나면 질문이 하나 추가되었고, `http://127.0.0.1:8000/polls/` 을 열어보면

![](https://lh3.googleusercontent.com/-ZYAKMAWsIF4/W_pTStiZauI/AAAAAAAAVRI/iH3a9ERjpeM71RSI9kdlZsw63bbXRi5SQCHMYCw/I/15431319774473.jpg)

이렇게 등록된 하나의 질문이 목록으로 나온다.

해당 목록페이지를 만들었고 확인도 했기 때문에, 목록에서 선택 후 `보기화면` 으로 들어가는 화면을 만들어 보자.
보기화면은 해당질문에 대해서 선택할 수 있는 답변이 나오고, 선택을 할 수 있도록 하는 페이지 이다.

우선 `보기화면` 을 위해서 `views.py` 를 수정한다.

**polls/views.py**

```python
from django.shortcuts import get_object_or_404, render
from polls.models import Question, Choice

def index(request):
    latest_question_list = Question.objects.all().order_by('-pub_date')[:5]
    showme = Choice.objects.all()
    context = {'latest_question_list': latest_question_list, 'showme': showme}
    return render(request, 'polls/index.html', context)

def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question} )
``` 

`detail` 함수를 정의했다. 

- `detail` 함수의 2번째 인자로 받고 있는 `question_id` 는 `URLconf` 에서 얻게 된다.
- `get_object_or_404` 함수는 첫번째 인자로 `model` 을 받고, 두번째 인자로 `검색조건` 을 넣으면 해당조건에 맞는 객체를 return 해준다. 만약 검색조건에 맞지 않으면 `HTTP404` 에러를 발생시킨다. `Question` 테이블에 `pk` 필드가 `question_id`와 일치하면 해당 `row` 를 return 해준다.
- 마지막에는 그렇게 만들어진 `question` 객체를 템플릿으로 전달해 준다.
- `get_object_or_404` 함수를 사용하기 위해 첫라인에 `import`를 해준다.

이제, `question_id` 를 전달할 수 있는 `url` 을 구성하자.

**poll/urls.py**

```python
from django.contrib import admin
from django.urls import path

from polls import views

urlpatterns = [
    path('polls/', views.index, name='pollIndex'),
    path('polls/<int:question_id>', views.detail, name='pollDetail'),
    path('admin/', admin.site.urls),
]
```

`urlpatterns` 의 2번째 라인에 `<타입:변수명>` 이렇게 설정하고, `details` 함수를 지정해서, 해당변수가 전달 되도록 했다.

이제 `views.py` 에서 지정했던 'polls/detail.html' 템플릿 파일을 만들 차례이다.

**templates/polls/detail.html**

```html
<h1>{{ question.question_text }}</h1>

{% if error_message %}<p><strong>{{ error_message }}</strong></p>{% endif %}

<form action="" method="post">
    {% for choice in question.choice_set.all %}
    <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}" />
        <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br>
    {% endfor %}
    <input type="submit" value="제출">
</form>
```

이제 `목록페이지 http://127.0.0.1:8000/polls/` 에서 해당 질문을 선택하고 목록 화면을 확인해보자

![](https://lh3.googleusercontent.com/-5MVxOmxUPwA/W_pXiYsM_nI/AAAAAAAAVRg/6yziF1MxTtoKUDHHJYaSzEtYoeeJI7ztgCHMYCw/I/15431330652674.jpg)

선택할 수 있는 항목이 아무것도 보이지 않는다. 템플릿 파일에 보면

```html
    {% for choice in question.choice_set.all %}
    <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}" />
    <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br>
    {% endfor %}
```

여기  `question.choice_set.all` 이게 아무것도 없기 때문이다. 이 부분이 중요한데,

`poll/models.py` 를 다시한번 들여다 볼 필요가 있다.

**poll/models.py**

```python
from django.db import models

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self): 
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey('Question', on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text
```

`Choice` 클래스에 `models.ForeignKey('Question', on_delete=models.CASCADE)` 이렇게 `Question` 테이블과 `외래키` 로 설정되어 있으면, `Question` 하나에 `Choice` 한개가 할당되는 `1:N` 관계가 설정되고, 이렇게 설정되면 `N 테이블` 이라는 의미의 `xxx_set` 속성이 기본으로 제공된다. 

정리하면, `Question 테이블에 연결된 Choice 테이블을 가져오라` 정도 되는거 같다. (알쏭달쏭)

```python
from django.db import models

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    choice_set = ???? <---- Choice의 외래키(ForeignKey) 설정에 의해 보이지 않는 기본 속성이 추가된다.

    def __str__(self): 
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey('Question', on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text
```

위와같이 `Question` 테이블에 보이지 않는 속성인 `choice_set` 속성으로 접근하면 `Choice` 테이블에 연결되고, `question.choice_set.all` 은 해당 `choice` 테이블을 가지고 오라는 의미가 된다. 즉 `
(알쏭달쏭)

다시 템플릿 파일로 돌아와서, `polls/views.py` 의 `detail 함수` 에서 가져오기로 한 객체인 `question`

**templates/polls/detail.html**

```python
from django.shortcuts import get_object_or_404, render
from polls.models import Question, Choice

def index(request):
    latest_question_list = Question.objects.all().order_by('-pub_date')[:5]
    showme = Choice.objects.all()
    context = {'latest_question_list': latest_question_list, 'showme': showme}
    return render(request, 'polls/index.html', context)

def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id) <-- 이것
    return render(request, 'polls/detail.html', {'question': question} )
```

의 자동생성된 속성 `choice_set` 이 아무것도 존재하지 않는 상태다.

**templates/polls/detail.html**

```html
<h1>{{ question.question_text }}</h1>

{% if error_message %}<p><strong>{{ error_message }}</strong></p>{% endif %}

<form action="" method="post">
    {% for choice in question.choice_set.all %}
    <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}" />
        <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br>
    {% endfor %}
    <input type="submit" value="제출">
</form>
```

위에 `question.choice_set.all` 가 아무것도 없기 때문에, 화면에 뿌려줄 아이템이 없는 것이다. 

이 아이템을 보여주기 위해 `Admin` 에 접속하여 해당 아이템을 등록하자.

![](https://lh3.googleusercontent.com/-yDMQ_mBum0Q/W_paPC2exRI/AAAAAAAAVRs/vKn9YnkItrgbYPCxXpQisYl8-wy6Z8cJwCHMYCw/I/15431337545262.jpg)

`Choice` 테이블 오른쪽에 `+Add` 버튼을 누르고,

![](https://lh3.googleusercontent.com/-QxpL7BSO8h0/W_paaWmpGvI/AAAAAAAAVRw/ZDp9_Z7mba4PObjyfWVBBBr1DP2QwXTgQCHMYCw/I/15431338005090.jpg)

위와같이 입력후 `SAVE` 버튼을 누르고 나면 `http://127.0.0.1:8000/polls/1` 에서 해당항목이 화면에 나오는 것을 확인할 수 있다.

![](https://lh3.googleusercontent.com/-dkXLr7OMXx0/W_pah6gbLbI/AAAAAAAAVR4/m4bkFhLiBq8u714Yx5DquO9F5OC0PXlzQCHMYCw/I/15431338310039.jpg)

선택할 수 있는 답변을 몇개 더 등록하자

![](https://lh3.googleusercontent.com/-9OdAK_fXBgQ/W_paxS0OqMI/AAAAAAAAVSA/rvm5WpoZ_i0XigQZGLj6bmYumrn5y74ggCHMYCw/I/15431338923298.jpg)

`ADD CHOICE+` 버튼을 눌러서 과학 아이템을 추가하자

![](https://lh3.googleusercontent.com/-1Hdng5Sr13E/W_pa4bU_4zI/AAAAAAAAVSI/lPqAW1TdPWsjHZ6W7V6DgP9LJV1ITUj1ACHMYCw/I/15431339212827.jpg)

![](https://lh3.googleusercontent.com/-QwOHqYcsi80/W_pa9S6PotI/AAAAAAAAVSM/A9GRdRPKsVgwbbJsOsqmJ4NtsizKZXVjACHMYCw/I/15431339404269.jpg)

이제 보기화면을 들어가면

![](https://lh3.googleusercontent.com/-5A8qLPNxi0s/W_pbDn98W4I/AAAAAAAAVSQ/IADfjeOSiawSQnRq65MOxJkDqtAMyO6kQCHMYCw/I/15431339666085.jpg)

이렇게 아이템 2개가 추가되었다.

다시 템플릿 파일로 돌아와서

**templates/polls/detail.html**

```html
<h1>{{ question.question_text }}</h1>

{% if error_message %}<p><strong>{{ error_message }}</strong></p>{% endif %}

<form action="" method="post">
    {% for choice in question.choice_set.all %}
    <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}" />
        <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br>
    {% endfor %}
    <input type="submit" value="제출">
</form>
```

정상적으로 `for` 문이 돌고 해당 객체를 `choice` 로 받아서 순회문이 수행되고 있다.

- `forloop.counter` 는 `for`의 `index` 로 `1` 부터 시작한다.
- `choice.id` 는 아이템의 `Primary Key` 로 아이템이 생성될 때마다 자동으로 카운트가 증가한다.

이제, 이렇게 보여진 화면에서 선택 후 등록하는 페이지로 연결하기 위해 몇가지 수정을 해야 한다.

**templates/polls/detail.html**

```html
<h1>{{ question.question_text }}</h1>

{% if error_message %}<p><strong>{{ error_message }}</strong></p>{% endif %}

<form action="{% url 'polls:vote' question.id %}" method="post">
    {% csrf_token %}
    {% for choice in question.choice_set.all %}
        <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}" />
        <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br>
    {% endfor %}
    <input type="submit" value="제출">
</form>
```

- `action={% url 'polls:vote' question.id %}` form 제출을 위해 `action` 속성으로 `polls:vote` url 을 가지고 오라는 의미인데, 지금 `URLConf` 설정을 하지 않아서, 에러가 날 것이다.
- `{% csrf_token %}` 는 `Cross Site Request Forgery` 공격을 방어하기 위한 코드를 자동으로 심어준다.

`polls:vote` 를 제대로 수행하기 위해 `URLConf` 를 수정할 건데, 지금까지는 **poll/urls.py** 에 모든 `URL`을 넣었으나, `polls:vote 같은 namespace 방식` 을 적용하기 위해 `urls.py` 를 분리해야 한다.

1. `polls/urls.py` 파일을 생성한다.

 **polls/urls.py**
 
```python
from django.contrib import admin
from django.urls import path

from polls import views

app_name = "polls"
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```

2. `poll/urls.py` 파일을 수정한다.

**poll/urls.py**

```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls', namespace='polls')),
    path('admin/', admin.site.urls),
]
```

**poll/urls.py** 에 있던 `url`을 `polls/urls.py` 로 옮기면서, 눈에 띄는 구문이 `include` 이다.

이걸로 애플리케이션 마다 `urls.py`를 분기함으로써, 관리하기에 이득을 볼 수 있고, `namespace` 에 이름을 설정해서 축약이름을 지정할 수 있다. `polls/urls.py` 에 `app_name` 의 값과 `namespace` 의 값이 일치하지 않아도 되지만, 관례적으로 같은 값으로 넣는다는 점을 기억하자.

이렇게 하면 `template/polls/detail.html` 에 있는 `polls:vote` URL이 `question.id`와 조합되어 `/polls/1/vote/` 이렇게 표현된다.

이대로 두면 `polls/urls.py` 에 있는 `views.vote` 함수가 없어서 에러 난다. `vote` 함수를 넣자

**polls/views.py**

```python
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from polls.models import Question, Choice
from django.urls import reverse

def index(request):
    latest_question_list = Question.objects.all().order_by('-pub_date')[:5]
    showme = Choice.objects.all()
    context = {'latest_question_list': latest_question_list, 'showme': showme}
    return render(request, 'polls/index.html', context)

def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question} )

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # 설문 투표 폼을 다시 보여준다
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # POST 데이터를 정상적으로 처리하였으면, 항상 HttpResponseRedirect를 반환하여 리다이렉션 처리함
        return HttpResponseRedirect( reverse('polls:results', args=(question.id,)) )
```

- 리다이렉트와 reverse 를 사용하기  위해 `HttpResponseRedirect, reverse` 를 `import` 했다.
- 1번째 라인은 `detail` 과 마찬가지로 `primaryKey` 필드가 `question_id` 와 같은 `row`를 가져온다.
- `selected_choice = question.choice_set.get(pk=request.POST['choice'])` 는 해당 속성의 특정한 조건을 가져오라는 의미이고 `request.POST['choice']` 는 제출된 폼의 데이터를 담고 있는 객체로, `detail.html` 에서 `form`의 `input[type=name]` 으로 `choice` 가 있는것을 확인하자. 즉 `제출된 form의 choice` 값의 `value`값을 가지고 와서, `choice` 테이블에 해당 `row`를 `selected_choice` 에 대입한다.
- 만약 `question.choice_set.get(pk=request.POST['choice'])` 이 과정에서 오류가 생기면 그 다음 `exception` 으로 넘어가게 되고, `Choice.DoesNotExist` 오류객체를 가지고 `polls/detail.html` 로 페이지 전환한다. `detail.html` 에 `{% if error_message %}<p><strong>{{ error_message }}</strong></p>{% endif %}` 이 부분이 이때 사용된다.
- 정상적으로 수행되었다면 `selected_choice의 votes 속성에 1증가` 하고, `Choice` 테이블에 저장한다.
- return 으로 `HttpResponseRedirect` 를 주는 이유는 `POST` 처리후 일반적으로 `HttpResponseRedirect` 객체를 리턴한다. (??)

`HttpResponseRedirect( reverse('polls:results', args=(question.id,)) )` 여기에 `reverse` 함수가 사용되었는데, `polls:results` 에 전달변수로 `question.id`를 넣으면 해당 url이 나오는 역순 URL 구하기(?) 이다. 그냥 URL구할 때 변수전달을 할 수 있다는 정도로 기억했다.

이제 `results` 페이지를 만들지 않았기 때문에, `http://127.0.0.1:8000/polls/1/` 에서 항목을 선택하고 나면 페이지는 넘어가지만, `results` 없다는 페이지를 보게 된다.

![](https://lh3.googleusercontent.com/-Lrr3bcCEE_o/W_pvo5P7yWI/AAAAAAAAVSk/EvtpxPzwowEWa1CZJ4UavDFSn73BN7AbQCHMYCw/I/15431392336643.jpg)

### 결과 페이지 만들기

이제 다왔다. 우선 `views.py`를 수정하고

**polls/views.py**

```python
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from polls.models import Question, Choice
from django.urls import reverse

def index(request):
    latest_question_list = Question.objects.all().order_by('-pub_date')[:5]
    showme = Choice.objects.all()
    context = {'latest_question_list': latest_question_list, 'showme': showme}
    return render(request, 'polls/index.html', context)

def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question} )

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # 설문 투표 폼을 다시 보여준다
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # POST 데이터를 정상적으로 처리하였으면, 항상 HttpResponseRedirect를 반환하여 리다이렉션 처리함
        return HttpResponseRedirect( reverse('polls:result', args=(question.id,)) )

def result(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render( request, 'polls/result.html', {'question': question} )
```

이렇게 `result` 함수 만들고, `urls.py` 에 패턴추가 하자.

**polls/urls.py**

```python
from django.contrib import admin
from django.urls import path

from polls import views

app_name = "polls"
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
    path('<int:question_id>/vote/result', views.result, name='result'),
]
```

그리고 마지막으로 템플릿 파일 추가하자.

**templates/polls/result.html**

```html
<h1>{{ question.question_text }}</h1>

<ul>
    {% for choice in question.choice_set.all %}
        <li>{{ choice.choice_text }} - {{ choice.votes }} vote{{ choice.votes|pluralize }}</li>
    {% endfor %}
</ul>

<a href="{% url 'polls:detail' question.id %}">Vote again?</a>
```

-`{{ choice.votes|pluralize }}` 는 복수일 경우에 `s` 를 자동으로 붙여주는 필터이다.  

이렇게 하면 목록을 만들고, 투표후, 결과보기 까지가 완료되었다.

이해해야 하는 개념이 그렇게 많지는 않아서, 제대로 사용법만 안다면 정말로 금방 사이트를 만들 수 있겠다는 생각을 했다.

