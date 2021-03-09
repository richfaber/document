# Django의 핵심 기능 - Admin 사이트 꾸미기

[![B5790464800_l](https://lh3.googleusercontent.com/-nlHQHqoACvE/Wx5TK_hL5xI/AAAAAAAAUG8/f3QlopRFT-MhqN3PS74AhCo4rwe2t8E5ACHMYCw/I/B5790464800_l.jpg)](http://www.yes24.com/24/Goods/17295239?Acode=101)

## Admin 사이트 꾸미기

장고의 Admin 사이트는 데이터베이스에 있는 데이터를 생성, 조회, 변경, 삭제 하는 기능을 제공한다. Admin 이라는 용어 때문에 프로세스의 상태조회, 기동, 정지 등의 기능을 떠올리기도 하는데, 데이터베이스에 집중되어 있다.

### 데이터 입력 및 수정

우선 이전의 예제에서 만들었던 사이트를 구동하고

```command
quesbank> python manage.py runserver
```

아이디를 만들지 않았다면

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

신규 아이디를 생성하고 로그인 하면, 이전에 만들었던 `Users, Group` 과 `Questions, Choices` 가 나옵니다.

![1](https://lh3.googleusercontent.com/-znuG-xf2Y8Q/XA--cgPdc8I/AAAAAAAAVXw/JqnAWh0pxX07OEcNcSU1YjoBwRgtJXCmwCHMYCw/I/1.gif)

Questions 테이블에서 테스트를 위해 몇개 데이터를 등록해 보자.

![2](https://lh3.googleusercontent.com/-yRRzaxRwbBA/XA--gP4n3RI/AAAAAAAAVX0/7ze-UGGf1kkWtBm8Lwh7jbUDtLJlH1WPwCHMYCw/I/2.gif)

이 화면에 나오는 필드들은 `polls/models.py` 안에 있는 내용들을 바탕으로 자동생성된 결과이다.

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

`question_text` 이 변수가 `Question text` 필드의 라벨로 나오고 우측에 있는 `models.CharField(max_length=200)` 의 것을 참고하여 우측에 INPUT 박스가 생성된다.
그 아래에 `models.DateTimeField` 을 참고하여 날짜시간 위젯이 나온다.

이건 기본으로 제공되는 것이고, 실제로 UI를 변경하려면 `admin.py` 파일을 수정해야 한다.

### 필드 순서 변경하기

이전 예제에서 `Question, Choice`를 관리자화면에 보여주기 위해 아래의 내용을 추가했었다.

**polls/admin.py**

```python
from django.contrib import admin
from polls.models import Question, Choice

admin.site.register(Question)
admin.site.register(Choice)
```

필드의 순서를 변경하기 위해 코드를 바꾸자

```python
from django.contrib import admin
from polls.models import Question, Choice

class QuestionAdmin(admin.ModelAdmin):
    fields = ['pub_date', 'question_text'] # 필드 순서 변경

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
```

위와 같이 `QuestionAdmin` 클래스를 만들고 그 클래스를 `register` 의 인자로 전달한다. 그러면 필드의 위치가 변경된 것을 확인할 수 있다.

![3](https://lh3.googleusercontent.com/-YT-qfRpQDvc/XA--kW8aUfI/AAAAAAAAVX4/O03BQDIrB2oPTk53CMXEyd_S8Gxz01nZgCHMYCw/I/3.gif)

### 각 필드를 분리해서 보여주기

각 필드를 분리해서 보여줄 수 있다.

**polls/admin.py**

```python
from django.contrib import admin
from polls.models import Question, Choice

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [ # 필드 분리해서 보여주기
        ('Question Statement', {'fields': ['question_text']}),
        ('Date Information', {'fields': ['pub_date']})
    ]

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
```

![4](https://lh3.googleusercontent.com/-8bqgnCS_RPk/XA--oBIdCRI/AAAAAAAAVX8/AkuYp8n6CRY-_Hw73gCQAhj1pBDqQYOrQCHMYCw/I/4.gif)

### 필드 접기

항목이 많을 경우 필드접기를 추가할 수 있다.

**polls/admin.py**

```python
from django.contrib import admin
from polls.models import Question, Choice

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [ # 필드접기 옵션 추가
        ('Question Statement', {'fields': ['question_text']}),
        ('Date Information', {'fields': ['pub_date'], 'classes':['collapse']})
    ]

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
```

![5](https://lh3.googleusercontent.com/-MRq8EKzpMuU/XA--1J6fWoI/AAAAAAAAVYI/aACn6JGY__Yx-FBSQio8MuDCWycBfRg0wCHMYCw/I/5.gif)

### 외래키 관계 화면

외래키 관계설정이 되어있는 `Choice 모델 클래스` 는 1:N 관계로 이어져 있기 때문에, 이번에는 `Choice` 에 대한 변경을 해보자

관리자 화면에서 `Choice` 테이블의 아이템 추가(add)를 선택하면

![6](https://lh3.googleusercontent.com/-yabJcYxvr-A/XA--5blO-TI/AAAAAAAAVYQ/zqveMq3edb4eq6P2BbxpH3ptCsSNEEkWACHMYCw/I/6.gif)

와 같이 나오고, 첫번째 `Question 셀렉트박스` 가 보인다. 이것은 외래키정의로 인해서 자동생성 되는 부분이다.

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

`question = models.ForeignKey('Question', on_delete=models.CASCADE)` 이 코드다.

셀렉트박스 선택을 통해 `Question`의 특정질문과 연결이 되고, `Choice text` 를 통해서 항목을 입력하는데, 답변은 보통 3개 이상 넣는다고 보기 때문에, 3개 항목을 등록하기 위해서, 이 페이지를 3번 들어와야 한다.

답변항목을 늘릴 수 있는 `(+)` 버튼 같은게 있으면 좋을거 같다.

### Question 등록 시 Choice 를 한 화면에서 변경하기

**polls/admin.py**

```python
from django.contrib import admin
from polls.models import Question, Choice

class containQuestion(admin.StackedInline):
    model = Choice
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [ # 필드 분리하고, 날짜메뉴 접힌상태
        ('Question Statement', { 'fields': ['question_text'] }),
        ('Date Information', { 'fields': ['pub_date'], 'classes':['collapse'] })
    ]
    inlines = [ containQuestion ] # 질문 등록시 Choice 테이블도 같이 본다

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
```

이렇게 설정을 하면 질문등록시에 선택항목을 3개(extra값) 필드가 기본설정 되고, 추가할 수 있는 버튼도 생성된다.

![7](https://lh3.googleusercontent.com/-PgM8t1tPzcE/XA-_BS_XQ-I/AAAAAAAAVYU/RLNqCa54_Q0yCrkiiPFMQ0pQhGmNbJb-QCHMYCw/I/7.png)

다른 형태의 UI도 제공해 주는데 테이블 형식으로 보여줄 수 있다. `admin.TabularInline`

**polls/admin.py**

```python
from django.contrib import admin
from polls.models import Question, Choice

class containQuestion(admin.TabularInline):
    model = Choice
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [ # 필드 분리하고, 날짜메뉴 접힌상태
        ('Question Statement', { 'fields': ['question_text'] }),
        ('Date Information', { 'fields': ['pub_date'], 'classes':['collapse'] })
    ]
    inlines = [ containQuestion ] # 질문 등록시 Choice 테이블도 같이 본다

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
```

![8](https://lh3.googleusercontent.com/-6SQpTKwDoUw/XA-_EZTOI8I/AAAAAAAAVYY/65YGAF9me8I-v6V52jf8vhjVGr0szBCdACHMYCw/I/8.png)

### 레코드 목록 항목 지정하기

Admin 사이트의 첫 페이지에서 테이블을 클릭하면 해당 테이블의 레코드 목록이 나오는데, 이것은 기본으로 `models.py` 에 정의되어 있는 `__unicode()__` 함수의 리턴값을 레코드의 제목으로 사용한다.

![9](https://lh3.googleusercontent.com/-qkkwDrSRwhs/XA-_G9jxjuI/AAAAAAAAVYg/IA2QZANhE9gz_sg6TFBfBLwfYwPPCsyjwCHMYCw/I/9.png)

위와 같이 `Question` 이라는 컬럼이름에 단일컬럼이 보이는데, 컬럼을 추가할 수 있다.
`list_display = ('question_text', 'pub_date')`

**polls/admin.py**

```python
from django.contrib import admin
from polls.models import Question, Choice

class containQuestion(admin.TabularInline):
    model = Choice
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [ # 필드 분리하고, 날짜메뉴 접힌상태
        ('Question Statement', {'fields': ['question_text']}),
        ('Date Information', {'fields': ['pub_date'], 'classes':['collapse']})
    ]
    inlines = [containQuestion] # 질문 등록시에 Choice 테이블도 같이 본다
    list_display = ('question_text', 'pub_date') # 레코드 목록 항목 지정

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
```

![10](https://lh3.googleusercontent.com/-T7HvNUNf0yw/XA-_MZRFtHI/AAAAAAAAVYk/vdUctnXTf8MVQfyoz3uLht4YoHJr9fMYwCHMYCw/I/10.png)

### list_filter 필터

UI의 filter 사이드바도 붙일 수 있다.

`list_filter = ['pub_date']`

**polls/admin.py**

```python
from django.contrib import admin
from polls.models import Question, Choice

class containQuestion(admin.TabularInline):
    model = Choice
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [ # 필드 분리해서 보여주기
        ('Question Statement', {'fields': ['question_text']}),
        ('Date Information', {'fields': ['pub_date'], 'classes':['collapse']})
    ]
    inlines = [containQuestion] # 질문 등록시에 Choice 테이블도 같이 본다
    list_display = ('question_text', 'pub_date') # 레코드 목록 항목 지정
    list_filter = ['pub_date'] # 필터 사이드바 추가

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
```

![11](https://lh3.googleusercontent.com/-OB3MTsR4NDk/XA-_QDAH_hI/AAAAAAAAVYo/-UR9CtOjfskbTNf2ecGg_JgyKF5_rRq6wCHMYCw/I/11.png)

필터에서 선택할 수 있는 항목들은 장고가 타입에 따라서 적절한 항목을 보여주는데, `pub_date` 필드의 타입이 `DateTimeField` 이므로, `Any date, Today` 등의 옵션 항목을 제공해 주고 있다.

### search_fields

UI 화면에 검색 박스도 표시할 수 있다.

`search_fields = ['question_text']`

**polls/admin.py**

```python
from django.contrib import admin
from polls.models import Question, Choice

class containQuestion(admin.TabularInline):
    model = Choice
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [ # 필드 분리해서 보여주기
        ('Question Statement', {'fields': ['question_text']}),
        ('Date Information', {'fields': ['pub_date'], 'classes':['collapse']})
    ]
    inlines = [containQuestion] # 질문 등록시에 Choice 테이블도 같이 본다
    list_display = ('question_text', 'pub_date') # 레코드 목록 항목 지정
    list_filter = ['pub_date'] # 필터 사이드바 추가
    search_fields = ['question_text'] # 검색 박스 추가

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
```

![12](https://lh3.googleusercontent.com/-gbIB4kJv26g/XA-_Tey7FoI/AAAAAAAAVYw/y07W1ZXMLuoUAz3_iKXRiQMlLfDuonCewCHMYCw/I/12.png)


### Admin 사이트 템플릿 수정

Admin 사이트 또한 장고의 템플릿 시스템을 사용하고 있는데, 이를 수정하기 위해서는 `장고의 기본 Admin 템플릿` 파일을 복사해 와야 한다.

보통 파이썬을 설치하고 그 경로에 `/lib/site-packages/django` 가 설치되기 떄문에 이 경로에 기본 admin 템플릿 파일들이 있다.

나는 `/c/python37/lib/site-packages/django/` 이 경로에 장고가 설치 되었기 때문에, `/c/python37/lib/site-packages/django/contrib/admin/templates/admin/base_site.html` 이 파일을 지금 실습하고 있는 폴더에 `/quesbank/templates/admin` 에 복사해 넣었다.

이렇게 복사한 파일은 그냥 두면 장고가 인식 못하고, 경로설정을 해 주어야 하는데, 이전 실습을 하면서 `templates` 설정을 해두었기 때문에 따로 할 필요는 없다.

**poll/settings.py**

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [ os.path.join(BASE_DIR, 'templates') ], # 이 부분이 템플릿 폴더 설정 부분
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

이제 파일의 일부분을 수정해서 잘 보이는지 확인해 보자.

**templtes/admin/base_site.html**

```html
{% extends "admin/base.html" %}

{% block title %}{{ title }} | {{ site_title|default:_('Django site admin') }}{% endblock %}

{% block branding %}
<h1 id="site-name"><a href="{% url 'admin:index' %}">Survey Administration</a></h1>
{% endblock %}

{% block nav-global %}{% endblock %}
```

로고 부분만 바꿔보았다.

![13](https://lh3.googleusercontent.com/-so3I_nfllqI/XA-_jtMVgDI/AAAAAAAAVZI/rxQ960tvULIJ68LZh1SHQ8rkXqKbHLeGACHMYCw/I/13.png)



