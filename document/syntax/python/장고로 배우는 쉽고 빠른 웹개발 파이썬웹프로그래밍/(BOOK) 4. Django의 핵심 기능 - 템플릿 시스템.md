# Django의 핵심 기능 - 템플릿 시스템

[![B5790464800_l](https://lh3.googleusercontent.com/-nlHQHqoACvE/Wx5TK_hL5xI/AAAAAAAAUG8/f3QlopRFT-MhqN3PS74AhCo4rwe2t8E5ACHMYCw/I/B5790464800_l.jpg)](http://www.yes24.com/24/Goods/17295239?Acode=101)

## 템플릿 시스템

장고의 `M(Model) T(Template) V(View) 모델` 에서 `UI(User Interface)를 담당하고 있는 기능` 인  `Template` 에 대한 내용이다.

HTML코드와 파이썬코드가 섞여 있지만, 화면에 어떻게 보여줘야 하는지에 초점이 맞춰져 있고, 기본적인 템플릿 문법이 제공된다.

> DB를 가져오는 코드 라던지, 복잡한 수식의 파이썬코드 결과를 반환해야 한다면 `View 코드` 에서 작성해서 템플릿 으로 전달하는 것이 권장하는 방법이다.

### 템플릿 변수

템플릿 코드 안에서 `View 코드` 에서 전달하는 변수를 사용할 수 있다.

```python
{{ variable }}
```

- 문자, 숫자, 언더바(_) 를 사용하여 이름을 정의
- 변수에 속성에 접근하기 위한 dot(.) 표현도 가능
- 정의되지 않은 변수를 만나면 빈 문자열('')을 반환. 이것은 `settings.py` 의 `TEMPLATE_STRING_IF_INVALID` 에서 변경할 수 있다.

### 템플릿 필터

변수에 필터를 제공할 수 있다. 

```python
{{ name|lower }}
```

`name` 변수는 `lower` 메소드에 전달되어 `소문자` 로 변경되어 출력된다. 중복 필터 적용도 가능하다.

```python
{{ name|linebreaks|lower }}
```

이렇게 하면 `p태그로 감싸주고 소문자로 변경` 해준다.

이렇게 장고가 기본으로 제공하는 몇가지 필터가 있다.

- lower : 모두 소문자로 변경
- linebreaks : 해당문자를 `p` 태그로 묶어준다
- safe : 특수문자를 escape 하지 않고 출력. ex) <div>TEST</div> 의 특수문자 `<>` 를 변환하지 않고 출력
- truncatechars:5 : 앞에 5개 문자만 보여주고, 나머지는 말줄임
- truncatewords:5 : 앞에 5개 단어만 보여주고, 나머지는 말줄임
- default:"nothing" : 해당 변수 값이 `False 거나 없거나` 할때 보여주는 메세지
- length: 변수의 개수를 출력
- striptags : 변수의 html태그를 모두 삭제
- add:"2" : 만약 변수값이 4라면 2를 더해준다. 문자열더하기 이므로 문자 "4" 가 오면 "42"가 된다.

이외에도 기본필터들이 꽤 있다.

[장고제공 기본 필터](https://docs.djangoproject.com/ko/2.1/ref/templates/builtins/)

### 템플릿 태그

`{% tag %}` 의 형식을 가진다. `for, if` 등의 기본적인 구문들이 제공된다.

#### {% for %}

```python
<ul>
    {% for athlete in athlete_list %}
        <li>{{ athlete.name }}</li>
    {% endfor %}
</ul>
```

위의 구문은 `athlete_list` 객체를 순회하면서 `athlete.name` 값을 출력해 준다.

```python
<ul>
    {% for athlete in athlete_list %}
        <li>{{ athlete.name }} {{ forloop.counter }}</li>
    {% endfor %}
</ul>
```

위와 같이 내부에서 사용할 수 있는 몇가지 변수를 제공해 준다.

- forloop.counter : 현재까지 실행한 루프카운트 (1부터 시작)
- forloop.counter() : 현재까지 실핸한 루프카운트 (0부터 시작)
- forloop.revcounter : 루프 끝부터 몇번째인지 카운트 (1부터 시작)
- forloop.revcounter() : 루프 끝부터 몇번째인지 카운트 (0부터 시작)
- forloop.first : 루프에서 첫번째 실행이면 True
- forloop.last : 루프에서 마지막 실행이면 True
- forloop.parentloop : 다중 순회문에서 상위루프를 의미함

#### {% if %}

해당 평가값이 True 이면 수행한다.

```python
{% if athlete_list &}
    Number of athletes: {{ athlete_list|length }}
{% elif athlete_in_locker_room_list %}
    Athletes shoud be out of the locker room soon!
{% else %}
    No athletes.
{% endif %}
```

`{% if athlete_list|length > 1 %}` 와 같은 필터를 적용할 수도 있지만, 대부분의 필터가 문자를 반환하기 때문에 주의해야 한다. `length` 만 숫자를 반환한다.

`{% if %}` 안에서 사용할 수 있는 비교연산자는 아래와 같다.

- `and, or, not, and not, ==, !=, <, >, <=, >=, in, not in`

#### {% csrf_token %}

악의적 해킹코드를 방지하기 위해 `post` 방식의 `form` 작성시에는 `{% csrf_token %}` 구문을 적어줘야 한다.

```python
<form acion=".." method="post">
{% csrf_token %}
</form>
```

#### {% url %}

url 링크값을 반환해 준다.

```python
<form action="{% url 'polls:vote' question.id %}" method="post">
{% csrf_token %}
</form>
```

위와 같이 `url 반환` 을 알기 위해서는 `urls.py` 파일도 같이 봐야 한다.

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

위와 같은 `urls.py` 코드가 작성되어 있다면 템플릿 코드에서 `polls 의 name 이 vote` 와 연결되는 url 에 현재페이지의 `question.id` 에 맞는 url을 반환해 준다.

즉 위에 코드는 `/polls/3/vote` 가 나오게 된다.

위와 같은 코딩은 url이 하드코딩 되는 것을 방지하는 것으로, url패턴이 변경되더라도 템플릿코드의 url을 변경해 주지 않아도 된다.

#### {% with %}

특정값을 저장해 준다. 출력되는 변수가 길거나 할 때, 따로 변수에 할당해 준다고 생각하면 된다.

{% with %} 부터 {% endwith %} 까지 유효하다.

```python
{% with totalcount = business.employees.count %}
    {{ total }} people works at business
{% endwith %}
```

### 템플릿 주석

템플릿 에서의 주석은 `{# #}` 를 사용한다.

```python
{# {% if foo %}bar{% else %} #}
```

멀티라인 에서는 `{% comment %}` 를 사용해야 한다.

```python
{% comment "Legacy Code" %} 
    {% if foo %}bar
    {% else %} 
{% endcomment %}
```

### 템플릿 상속

다른 서버사이드 언어에서의 `include` 라고 생각하면 되는데, 형식이 조금 다르다. 장고 에서는 `include` 다른 언어에서 처럼 일부분을 끌고 들어오는 것이 아니라, 만들어진 템플릿에 끼어넣는 방식이다.

**base.html**

```python
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}title of base html{% endblock %}</title>
</head>
<body>
    <div id="sidebar">
        {% block sidebar %}
        <ul>
            <li><a href="/polls/">Select question</a></li>
            <li><a href="/polls/1/results/">Result of question that has id value as 1</a></li>
        </ul>
        {% endblock%}
    </div>

    <div id="content">
        {% block content %}
        content of base.html!
        {% endblock %}
    </div>
</body>
</html>
```

위와 같이 기본이 되는(base) 템플릿을 만들고 난 후에, `{% block %}` 을 만나면 해당템플릿을 끼워넣는다. 그럼 위와 같이 `{% block sidebar %}, {% block content %}` 는 어떻게 지정되는지 보자.

**child_template.html**

```python
{% extends 'base.html' %}

{% block title %}
title of child_template in polls APP
{% endblock %}

{% block content %}
content of child_template in polls APP
{% endblock %}
```

사용자가 페이지요청을 했을 때 `base.html` 을 읽는것이 아니라 `child_template.html`을 읽는다. 해당 페이지 내에 선언된 `block` 들을 들고 `base.html` 로 가서 조합한다.

`asp, jsp` 같은 경우는 위와 같이 `extends` 대신 `include` 로 모든 페이지에 집어넣는 구조로 작성되는데, 약간의 형식이 다르다는 것을 이해하면 된다.

만약 `base.html` 에서 해당 블럭을 읽을 수 없을 경우에는 `base.html 내에 block 안에 있는 내용` 을 출력하고 있으면 해당 내용으로 치환한다. 
(즉 해당블럭이 존재하면 base.html 의 `{% block sidebar %}` 안의 내용은 사라진다)




