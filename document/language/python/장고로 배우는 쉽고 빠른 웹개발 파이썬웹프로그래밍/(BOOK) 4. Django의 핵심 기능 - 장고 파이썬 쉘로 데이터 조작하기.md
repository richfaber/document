# Django의 핵심 기능 - 장고 파이썬 쉘로 데이터 조작하기

[![B5790464800_l](https://lh3.googleusercontent.com/-nlHQHqoACvE/Wx5TK_hL5xI/AAAAAAAAUG8/f3QlopRFT-MhqN3PS74AhCo4rwe2t8E5ACHMYCw/I/B5790464800_l.jpg)](http://www.yes24.com/24/Goods/17295239?Acode=101)

## 장고 파이썬 쉘로 데이터 조작하기

장고는 Admin 관리자로 UI 화면의 데이터 조회,입력,수정,삭제할 수 있는 편리한 기능을 제공해 준다.
추가로 파이썬 쉘에서도 데이터를 관리할 수 있는 API를 제공해 준다.

```command
> python manage.py shell
```

![](https://lh3.googleusercontent.com/-KH6zYxm9W44/XDrs8sRrBQI/AAAAAAAAVqM/3wmdIbLgFy8rdAIP7kygMr5SvKHZ0_XjgCHMYCw/I/15473656173737.jpg)

### Create - 데이터 생성/입력

테이블에 데이터를 입력(레코드 생성)하기 위해서는 필드값을 지정하여 객체를 생성한 후에 `save()` 메소드를 호출하면 된다. (`save()` 전에는 메모리 에서만 변경된 것으로, 실제 db 에 값이 쓰여진 것은 아니다)

```command
> from polls.models import Question, Choice
> from django.utils import timezone
> q = Question(question_text="What's new?", pub_date=timezone.now())
> q.save()
```

![](https://lh3.googleusercontent.com/-T-CiKoFDQYU/XDruqS9p_II/AAAAAAAAVqY/a5itwTe_KCEhT8cCPmn-JFnkb9TE9iUkwCHMYCw/I/15473660557787.jpg)

위와 같이 `admin` 에 반영된 것을 확인할 수 있다.

### Read - 데이터 조회

데이터를 조회하기 위해서는 `QuerySet` 객체를 사용 해야 한다. 
`QuerySet` 은 데이터베이스 테이블을 꺼내 온 객체들의 콜렉션(객체의 모임)이다.

```command
> Question.objects.all()
<QuerySet [<Question: 자신있는 과목은?>, <Question: 당신의 취미는 무엇인가요?>, <Question: What's new?>]>
```

`QuerySet 객체`를 얻어오기 위해서 `objects` 객체를 사용한다. 위에 예시는 `Question 테이블의 레코드들 모두` 를 가져오라는 의미다.

특정조건을 사용할 수도 있다.

- filter() : 주어진 조건에 맞는 객체의 `QuerySet 객체 콜렉션` 반환
- exclude() : 주어진 조건에 맞지 않는 객체들을 담고 있는 `QuerySet 객체 콜렉션` 반환

`QuerySet 콜렉션` 을 반환하기 때문에, 체인식 호출도 가능하다.

```command
>  Question.objects.filter( question_text__startswith='What').exclude( pub_date__gte=timezone.now() ).filter( pub_date__gte=datetime.datetime(2005, 1, 30) )
```

만약 한개의 요소를 가져오기 위해서는 `get()` 메소드를 사용하면 된다.

```command
> one_entry = Question.objects.get(pk=1)
```

SQL의 `offset, limit` 처럼 범위를 지정할 수도 있다.

```command
> Question.objects.all()[:5]
> Question.objects.all()[5:10]
> Question.objects.all()[:10:2]
```

### Update - 데이터 수정

데이터를 수정해 보자

```command
> from polls.models import Question, Choice
> from django.utils import timezone
> q = Question.objects.get(question_text="What's new?")
> q.question_text = "자신에게 거짓말하기"
> q.save()
```

단일 컬럼에 대한 값을 변경해 보았다. 만약 여러개의 컬럼의 값을 변경할 때 `update()` 메소드를 사용한다.

```command
> q = Question.objects.filter(pub_date__year=2007).update(question_text='Everything is the same')
``` 

`update()` 는 바로 db에 내용이 반영된다. 따로 `save()` 를 할 필요가 없다.

### Delete - 데이터 삭제

데이터를 삭제해 보자

```command
> Question.objects.filter(pub_date__year=2019).delete()
```

`pub_date` 필드가 `2019` 년도인 것을 삭제하는 구문이다. 모든것을 지우고 싶을때는

```command
> Question.objects.all().delete()
```

하면 된다.

