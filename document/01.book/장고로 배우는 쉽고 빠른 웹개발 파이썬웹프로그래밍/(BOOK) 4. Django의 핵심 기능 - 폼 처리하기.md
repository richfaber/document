# Django의 핵심 기능 - 폼 처리하기

[![B5790464800_l](https://lh3.googleusercontent.com/-nlHQHqoACvE/Wx5TK_hL5xI/AAAAAAAAUG8/f3QlopRFT-MhqN3PS74AhCo4rwe2t8E5ACHMYCw/I/B5790464800_l.jpg)](http://www.yes24.com/24/Goods/17295239?Acode=101)

## 폼 처리하기

### HTML 에서의 폼

폼은 사용자의 입력을 받기 위해서 필요한 것이고, HTML에는 `<form>` 태그를 사용해서 입력받아야 하는 항목을 나열한다.

다양한 폼관련 태그를 통해서 사용자의 입력을 받을 수 있고, 각종 기능들을 추가하기 위해 자바스크립트를 사용해서 기능을 붙이기도 한다.

사용자는 `<form>` 안에 들어 있는 폼요소 들을 입력하고 `submit` 버튼을 눌러서, 해당폼의 정보를 서버로 전송한다. 이때 서버의 어떤 `URL` 을 요청해야 하는지를 명시하는 `<form action="url">` 부분과 어떤 HTTP 메소드를 사용할 지를 명시하는 `<form method="GET|POST">` 등이 있는데, `GET` 으로 지정하면 서버로 전송시 url에 파라미터가 노출되기 때문에, 로그인폼 같은 경우에는 부적절 하다.

### 장고의 폼 기능

폼을 처리하는 과정은 다소 복잡할 수 있지만, 공통적 절차를 가지고 있기 때문에, 장고는 이런 기능들을 단순화 및 자동화 해서 빠르고 안전하게 할 수 있도록 도와준다.

- 폼 생성에 필요한 데이터를 폼 클래스로 구조화하기
- 폼 클래스의 데이터를 렌더링하여 HTML 폼 만들기
- 사용자로부터 제출된 폼과 데이터를 수신하고 처리하기

이것을 위해 장고는 `폼클래스` 를 제공한다.

장고의 모델(Model) 클래스 들이 데이터베이스의 필드들과 매핑이 되듯이, 폼클래스들의 필드들은 HTML 폼의 `input` 요소에 매핑 된다.

### 폼 화면 만들기 사전준비

백문이 불여일견이라, 간단한 예시를 보자

1. `registerProfile` 이라는 모듈을 셍성하자.

```command
quesbank> python manage.py startapp registerProfile

```

2. 장고가 등록된 앱을 알 수 있도록 `poll/settings.py` 에 새로 만든 `registerProfile` 을 등록하자

**poll/settings.py**

```python
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'polls',
    'registerProfile'
]
```

3. `url` 연결을 위해서 `poll/urls.py` 를 수정하자

**poll/urls.py**

```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls', namespace='polls')),
    path('registerProfile/', include('registerProfile.urls', namespace='registerProfile')),
    path('admin/', admin.site.urls),
]
```

4. 위에 설정한 대로 `include('registerProfile.urls', namespace='registerProfile'))` `registerProfile` 의 서브 url 을 지정하기 위해 새로운 파일을 추가하자

**registerProfile/urls.py**

```python
from django.contrib import admin
from django.urls import path

from registerProfile import views

app_name = "registerProfile"
urlpatterns = [
    path('', views.index, name='index')
]
```

5. `registerProfile` 의 index 함수를 만든다.

**registerProfile/views.py**

```python
from django.shortcuts import render

def index(request):
    context = {}
    return render(request, 'registerProfile/index.html', context)
```

6. 템플릿을 추가한다.

**templates/registerProfile/index.html**

```html
<p>Hello Register</p>
```

이렇게 하고 브라우저에서 `http://127.0.0.1:8000/registerProfile/` 열어보면 템플릿이 정상적으로 나온다.

위와 같이 6단계를 기계적(?)으로 추가하면 된다. 
(이것조차 자동화 되면 좋을거 같긴한데..)

### 폼 클래스로 폼 생성

생성한 템플릿 파일에 폼을 넣어보자

**templates/registerProfile/index.html**

```html
<form action="" method="post">
    <label for="yourName">Your name: </label>
    <input id="yourName" type="text" name="yourName" value="{{ current_name }}" />
    <input type="submit" value="OK" />
</form>
```

![](https://lh3.googleusercontent.com/-KOYk7O1v0T5nrleTLqm3t0cv01gfpV4oS5Ay3ZewHrcym8E2X0kfZjLSa12MMZcAhb0iU4x_IfRJg2smoVWhAkmh-wNFd3J1GRA8oZhH9abSe6U5nxBuEGrc4540_eAPL20dP34c97R7ZjyeaM0gy4CraHxz77oOmg0HWvr9d-rNSYBk09iRKjn3nrY7yA6I6WZvrRXfxMdkBgAGmfW-8Om-LG32SiHrhA0AU1wJbm5srM46NZA2Atz6L0Ef6rc3klNn00nT5VqWrI8Ex6q44o3mJM_O_ndE8fBIZk3uKxFO-9DtUtHzgHyNEi-O8OPvF0LP8aF43UYtaGthq38JjK4jG8_AJjtr2SNQb8DB0PlXx5HAQ3qx3Yf_uvzdckP3dJTF_6GVcoAZHdiGbAS38fmAzHKu8R7QpI-OdVwb6Ft4UOBE7TTT1DE8_FPDxe4EzeuyVfKu60BcQqtGpo1MvMqOh1vREf43Js6thE38GtSvegPfSSX6_VhJpYq_dcbsN7Q12exSR0vofWcLYx4YmCmXYpVWLMW-QTBU6riA6j6ofbcbkcF6A_e8gdFpnguFIaCn32a1hBelzkdAomxT3U0Zqzd0gvVjnNE-KqR9L3GFyxTdNPaal-CzF9MB-9y89PeWHPcRPpHqG4WBNoDrdtZROyPlQIl=w916-h680-no)

위에 `{{ current_name }}` 을 view 에서 보내주는데, 임시로 아무거나 입력하고 해당값이 정상적으로 전달되는지 확인해 보자.

**registerProfile/views.py**

```python
from django.shortcuts import render

def index(request):
    context = { 'current_name': '임시이름' }
    return render(request, 'registerProfile/index.html', context)
```

수정하면 아래와 같이 정상적으로 입력되었음을 확인할 수 있다.

![](https://lh3.googleusercontent.com/XS5gBV_wav-H0v8y4uxKFsTGIGKD2VMkDEtR-p5hkmfN1poxrwdTLePRA4Kq9jfYQpZ8MaRLr2RjlMTIO3D6Oz-i80Y8MIOZVc-i1mxXg9YsRfgG8tAOEnH1YEQjh6J62rBJNdb9RPKSvnIEiuQDU5rMeW3kBJPVgtHFmbf9plmH-JFuZVNq8LuGn0a8jIz1BxiyuGGxiGOKSeBQpSAZwoyyPlnEKLK3mHDjlg9PwBsGAvw_aj4wlzxYICO3AH40xQIpDDHGxMUpNxhdle8svJxaNF85UgTc_SD4jZVW27QFMzY-OwoC6obUlk_hl8L7DKJ3ONmZ_wuNOPnFXsEy-nvuYeVx5jhHIu0U9ZxnE08G-DIjSFEVeOi2lt5BEDz7OhOvDGMMl0g-eVC8yFZiYCO-r62s_Tg80d_vzfllOg5Y94wYeFLfqhu1umUNaH2JEJt1oOFYLqdk5wJwlTGeJQ4g8D_08efmfbiP9nj9EeEMVFD8cbQaODOCIMwHW3E3zX9tnFuAizid9I_FYgr_eaP72m0qMRZxjKtif0lMIwpjaml94ZZE1m0dkk_LNydyPGgGuVgMev-Acz_yvqzaF9GXCGlhEUfBUiCtrSN8-dP87M0l-oaSkGkKiueyAuIZqWGYupWLL_8aGfnebwjr9SOq7pJL6aEy=w916-h680-no)

사용자는 이름을 넣고 `OK` 버튼을 누르면, 서버로 해당데이터가 전달되는 기본 페이지를 작성하였다.

이렇게 `templates` 에 직접 하드 코딩을 해도 되지만, view에 `form` 클래스를 정의해서 사용할 수도 있다. 

이를 위해서 `view` 를 수정하자

**registerProfile/views.py**

```python
from django import forms
from django.shortcuts import render
from django.http import HttpResponseRedirect

class NameForm(forms.Form):
    yourName = forms.CharField(label="Your name", max_length=100, widget=forms.Textarea)

def index(request):
    form = NameForm()

    context = { 'current_name': '임시이름', 'form': form }
    return render(request, 'registerProfile/index.html', context)
```

위와 같이 `def index` 함수에서 `NameForm` 클래스를 호출하고, `NameForm` 클래스는 `forms` 클래스를 이용해서 폼태그를 만들었다.

이렇게 생성된 `form`을 템플릿에 `form` 이라는 속성으로 전달한다. 그리고 템플릿페이지에서 받는다.

**templates/registerProfile/index.html**

```html
<form action="" method="post">
    {% csrf_token %}
    {{ form }}
    <input type="submit" value="OK" />
</form>
```

위와 같이 템플릿 페이지를 수정하면 이전에 하드코딩과 다르게

![](https://lh3.googleusercontent.com/bPFpH4Mywsq0z4aBYGQdR8vKgpLNUIIDNisvyg9g10F-G-UT87ErFYyCIAf75ygPxSJZqs8u167QwVvIKqjJpu2DQhEr0H3_ixxxcG6xhc7zRID7tk5SdtPtLiZjfOa1R4mDDY0t7ccuv2LMMLxGO_42_3VJT4fubmZLCJeaWjgDX1OifgNNBPcFcRZozTlCAroSjVz_OVmX0QbIC-HQsxZWhKSyaobO4aka-Ez9-DX9hQ9rsjekoma8ffN0hgQEdIsyZe2F5zVTTwvSD8rnMHTZ096ffsbnLR_lhbkfHNGOrzF1TN6kufwARM_Mg1RxM6jxsCS44LbA1WbC0cNpeQ71EUy_V76GSDE4xWEIvUTLRNab6amdtKSofumuxrMhClAvloiWSnxfumtgVOTIVGUEPcye50-3wMtjzrmBZzy0AE5S7q2pKsPghi3yQybUAM25hLri05pkJCkq_FkaD3ze1Ztq991-83CU_1jD5oo7nkBFRWRZzVT50xNAFfeN6WRyLFwIPJNPgbcHrnzuV8PN1qeEpEynr4DbnMzhNl9HIx51EoO2ogsG6yWQl6xdbUutHfdydMFAbxmoxaFF8A8_yJGDkgGGJA70-5wFp9mkNVe7kgxlpkCuverK8nRsCVJ_8nHjNIM05zCzWbkLVbj5Zu7KpMQz=w916-h680-no)

이렇게 `input` 태그가 아닌 `textarea` 로 나오는 것을 확인할 수 있는데, `NameForm` 클래스에서 `widget` 의 값을 `Textarea`로 했기 때문이다.

폼클래스에 의해 만들어진 `form` 변수는 템플릿페이지에서 몇가지 추가기능을 가질수 있는데, 예를들어 `{{ form.as_p }}` 라고 하면 `p` 태그로 감싸준다.

**templates/registerProfile/index.html**

```html
<form action="" method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit" value="OK" />
</form>
```

이렇게 `form` 을 템플릿에 하드코딩 하지 않고, 변수로 이용했을 때, `유형별로 form 구성` 이 가능하다는 이점이 있다. 물론 태그를 자동으로 생성해 주기 때문에, 마크업의 제한은 있지만, 다른 페이지에서 같은 폼을 사용해야 할 경우는 그대로 재사용할 수 있기 때문에 이점이다.

## 마지막..

여기서는 `DB`를 위한 모델설정이나, 폼을 전송시에 `method` 등을 처리하고 있지는 않다. 이것은 이 책의 고급 버전에서 다룰것으로 예상된다.

책의 나머지는 `poll` 예제를 다듬어서 완성된 프로젝트 코드로 보여주는 예제파일과, 장고를 웹서버와 연동하는 방법에 대해서 얘기하고 있다.

책을 처음 시작할 때는 신기함(?)과 많은 용어들에 대한 낯설음, 코드작성에 대한 두려움 등이 있었는데, 하나의 예제를 통해서 약간은 친숙해진 느낌이 들었고, 이 정도로 만족스러움을 느낄 수 있어서 좋았다.

물론 이 책의 예제들은 파이썬 공식 홈페이지의 튜토리얼을 다시 옮겨놓은 정도이지만, 인터넷으로 한 챕터씩 온라인화면을 보면서 하는 방식이 익숙하지 않은 나에게는 좋은 기억 이였다.




