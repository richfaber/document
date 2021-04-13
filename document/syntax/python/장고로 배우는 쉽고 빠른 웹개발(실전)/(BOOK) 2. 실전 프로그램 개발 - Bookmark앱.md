# 실전 프로그램 개발 - Bookmark 앱

[![B5790464800_l](https://lh3.googleusercontent.com/zq1Ul_2dCxaHXkPgy4oyQTWqkHdYkxAbGtcZYEH2zNiKTi0vjqBGXeFfYy7whdxjl6y2taeQljJEjSu0BIT1m6Ajv6AJkpS_Mny_8c6KR1AHGg0q0xac0PjHnmz1X0Guq9J662yoxaVdyYfNZ7CCCRFpXqg_1sNr8EDkI6P5lNk3eDDDoyitIISs-67So_vd4YvxOVLJh2CaKbJ4pcrDx0SKnY0CFcSjh7B13MJAUc8lPNbKbDvpske0YLJz0qDfH5iRaiTZ05ZuglNTIyKTgvVSNY-C-RxU4sP8nxhjvyKa0lkxekM9NqIyyS5G_37DcYzEp7lpn527N4X2Kocd9QvK39COKEvEEpkqzyyGymsyW2QYigZQtCWyj8WkyKkZ4nq4iSPnP2yDIGXGr6E9zRRtvrvsfmqjnNrMoS9XyF2C5iuEPCxp_O2knIo6SJuSsDFuCNlqBActX3v4N_PfC2Onj3Jh0EJp4_97hcjIO5rz8XJhzaazdxhj8fqZszl3WixTmDxYJmlQSx3NL_39QSOmD_htoEkKdzsGzmglXj2QWPs8TKqnjjez1JA1p_2MewkOLQ8FDvxwfml-rgkbP4anU34-bKf04M8HDqz18XNi8YPgX8ing4ADfCaZnW9pDL17-H2VN5tJpNBzRyWhvJioc-LLHlL-=w467-h600-no)](http://www.yes24.com/Product/Goods/29331035)

## 애플리케이션 설계하기

애플리케이션 개발을 시작하기에 아래와 같은 설계가 필요하다.

- 사용자의 눈에 보이는 화면 UI : 화면의 메뉴나 디자인 등을 어떻게 할지..
- 화면에 접속하기 위한 URL : 접속하는 `URL` 은 어떻게 구성할지..
- 서버에서 필요한 테이블 & 처리로직 : DB 설계는 어떻게 할지..

프로젝트 만드는 것에 익숙하다면, 머리속에서 암산(?)이 되서 구성이 되겠지만, 하나하나 만들어 가면서 어떤 느낌인지 알아보자.

## 개발 코딩하기

`startproject` 프로젝트를 이용해서 프로젝트를 만들어보자. 프로젝트 이름은 `bbs` 라고 하자.

만약 장고가 설치되어 있지 않다면, 장고를 먼저 설치해야 한다.

[장고 설치하기](http://frontend.diffthink.kr/2018/11/book-3-django.html)

```command
> django-admin startproject bbs
> cd bbs
bbs> python manage.py runserver
Performing system checks...

System check identified no issues (0 silenced).

You have 15 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.

February 17, 2019 - 08:32:03
Django version 2.1.3, using settings 'bbs.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

여기 DB 반영이 안되어 있으니 `migrate 하세요` 안내글이 보인다. `Ctrl+C` 로 중지하고 `migrate` 하고 재구동 해보자

```command
February 17, 2019 - 08:32:03
Django version 2.1.3, using settings 'bbs.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.

^C

bbs> python manage.py migrate
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

bbs> python manage.py runserver
Performing system checks...

System check identified no issues (0 silenced).
February 17, 2019 - 08:34:16
Django version 2.1.3, using settings 'bbs.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

이렇게 생성된 프로젝트에는 프로젝트 이름과 동일한 `bbs` 라는 폴더가 있는데, 각종 개발설정을 하는 파일이 모여있는 곳이다. `bbs/bbs` 같은 중복된 이름이 마음에 들지 않기 때문에, `bbs/root` 라고 이름을 변경하자.

```command
bbs> mv bbs root
bbs> ls
db.sqlite3 manage.py  root

```

폴더를 변경했기 때문에, 설정 몇가지도 바꿔줘야 한다.

**bbs/manage.py**

```python
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'root.settings') # bbs 대신 root로 변경
```

**bbs/root/settings.py**

```python
ROOT_URLCONF = 'root.urls'
WSGI_APPLICATION = 'root.wsgi.application'
```

이렇게 3군데를 변경하고, `python manage.py runserver` 를 재구동 하자.

이제 브라우저를 열고 `http://127.0.0.1:8000` 을 열어보면 정상작동 하고 있는걸 확인할 수 있다.

![장고 구동 화면](https://lh3.googleusercontent.com/t6jzgoWboSD1BIgrUHC47GWjIl1eDtgGu-1WOokkIzOBsl-hUXRMwNI3I0FgGBQvSGt_CT9NkStqMtwAHmn8lTqB_o3_alDV6XEerxyiazA1cVJY7AEfm2kCRJc68f3bXtHXDQZHpLsWpiK3XkssjVq8Sf037YBSM4vpBNHDi2UPp6WsE_ysG7P8T97973ySFCVAfAo1f5oaQKlNqr1TDhebf2Wo6CWDAFEqH51_M50ZBGMfahyZzpAYdLDI5Di85QnWf0qFXcrlvyTcenzx2INUpypJ-o5y1eFqCKcSkKh1UPNrviRikwiVX_vuIYQmYHPasOBvw65IFroSBltPKj9INhGuYo7l1H8WCX0oXEsscxF83JZUyjPiATpvY5olF0S1mihlb7M_byoNicreOfs1FSbTt6OQ-g5dYaP_o53nY9xIieKaPrEOS-kDmmeuG3DBc0yRkLAUIVOKXE_gnyYg5-l-lhlNcyDsVzYCbaHrftNavysY-4HxEHIiJ430G0GAdrxBmUDDMDelbboNvAP_sET4al0rLVdt03Vsogq5z6xPRSkh4u-x1FTg9US4Ux5uGjOLjSLYIHctILpslT2Vz9fPgUrtz7N5t5Zr_EZVmHVacNVAbNkjy3wYGak3UsO6XqqvfQvKzM3iDOhIKyrtLJjvoVSZ=w1978-h1660-no)

`templates/` 디렉토리 하위에 `html` 파일을 만들고, 화면을 구성하면 된다.

참고로 프로젝트의 `settings.py` 를 보면, 템플릿파일의 위치지정 하는 부분이 있는데, 확인해 보자

**bbs/root/settings.py**

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

`DIRS` 부분이 비어 있는데, 위와 같이 없을 경우 현재 프로젝트의 `templates` 폴더를 검색하고 없으면, 장고가 설치된 곳의 `templates/` 를 찾게 된다.

책에서는 북마크앱을 만들것이기 때문에 `북마크 어플리케이션` 을 추가해 보자.

```command
bbs> django-admin startapp bookmark
```

위와 같이 하면 `bookmark` 라는 폴더와 관련파일이 자동생성 된다.

![](https://lh3.googleusercontent.com/i2tN1Pu6HNJj8khuyHnH8_ucKffqvExI19Ji7cVyDtg4gJNwhWwj5f5rspzpxUURG5qGitQ9Co6BhRsZmcPt3ujy8PYQADlDcHsZV3lSESTZK0-tqslW3s6AB_IcCv7jZhHKEsiIXuoxNCl93s6DrrARFvEfySOPyUkiFo_Wf-m4m4QYk1rY8pY2mW_RseLI1z55uURxWBEh8tGRCjmArqwiYr7h5UWTEiHZyhCLfxXhFCKGjT6hwoLaUESDD9zO9yn2Dpdz2L4q7FIYF7Dx1p_vCYt8gKprynFbeQSs_QgsSf8tDigC2UjiXyRKUqeZQqWTOkDpEtB6cxw_Or60UZx6Wvt5JGc-873on3iWyBb2EnZ1ZGqoh5IELRWvdaoVh0HK52S-P0NVgXxaPPVZlaVu1omNgA2Z4anheHfuULwg7ALxPcvvYz609n1PbiQbWdOnlJF4Vj96M7XF1UOwx9nsrTIWnKPbQAH6rvbW7FtwBWUwsXw_3d7EImdpD4LKrRdQNgxj-guLlye-E0DPPh5JBTvCQja9RtC6NxTIw9tYR6FRfrnd9P9y4ou6yZdmmoYbEpaEfqhD1XZJ3uPxxnRG0ArkJ4snR867ay0LPQzwksqhh79YSMBNTMrQzgzh-q5DrOCNlbCFF8m6DbfPIrINJHLWtbzg=w454-h992-no)

