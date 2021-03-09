# 장고 개발의 기본 사항

[![B5790464800_l](https://lh3.googleusercontent.com/zq1Ul_2dCxaHXkPgy4oyQTWqkHdYkxAbGtcZYEH2zNiKTi0vjqBGXeFfYy7whdxjl6y2taeQljJEjSu0BIT1m6Ajv6AJkpS_Mny_8c6KR1AHGg0q0xac0PjHnmz1X0Guq9J662yoxaVdyYfNZ7CCCRFpXqg_1sNr8EDkI6P5lNk3eDDDoyitIISs-67So_vd4YvxOVLJh2CaKbJ4pcrDx0SKnY0CFcSjh7B13MJAUc8lPNbKbDvpske0YLJz0qDfH5iRaiTZ05ZuglNTIyKTgvVSNY-C-RxU4sP8nxhjvyKa0lkxekM9NqIyyS5G_37DcYzEp7lpn527N4X2Kocd9QvK39COKEvEEpkqzyyGymsyW2QYigZQtCWyj8WkyKkZ4nq4iSPnP2yDIGXGr6E9zRRtvrvsfmqjnNrMoS9XyF2C5iuEPCxp_O2knIo6SJuSsDFuCNlqBActX3v4N_PfC2Onj3Jh0EJp4_97hcjIO5rz8XJhzaazdxhj8fqZszl3WixTmDxYJmlQSx3NL_39QSOmD_htoEkKdzsGzmglXj2QWPs8TKqnjjez1JA1p_2MewkOLQ8FDvxwfml-rgkbP4anU34-bKf04M8HDqz18XNi8YPgX8ing4ADfCaZnW9pDL17-H2VN5tJpNBzRyWhvJioc-LLHlL-=w467-h600-no)](http://www.yes24.com/Product/Goods/29331035)

장고는 프레임워크이고, 장고를 이용해서 웹서비스를 제작하는데 다른 언어에 비해 빠르게 제작할 수 있다는 것은, 웹을 개발하는데에 필요한 기본적인 것들이 잘 정리되어 있다는 의미 이기도 하다.

이것은 장고가 제공하고 있는 기본적인 것들만 잘 이해하고 있다면, 편하게 웹서비스를 개발할 수 있다는 의미다.

## MTV 개발 방식

웹 프로그래밍의 MVC 방식과 거의 동일한 개념이다.

- `모델(Model)` : 테이블 정의
- `템플릿(Template)` : 사용자가 볼 화면 정의
- `뷰(View)` : 애플리케이션의 제어 흐름 및 처리 조직 정의

이와 같은 개발방식은 각 역할별로 독립성을 유지하며, 소프트웨어 개발의 원칙중에 느슨한 결합(Loose Coupling) 설계를 가능하게 한다.

장고는 `startproject, startapp` 등의 명령을 통해서 자동으로 프로젝트 뼈대 파일을 만들 수 있다. 이런 장점은 개발자가 어떤파일을 어디에 위치해야 하는지의 고민을 덜어준다.

## MTV 코딩 순서

모델, 템플릿, 뷰 중에 어떤걸 먼저 코딩해야 한다는 법칙은 없다. 하지만 이 책은 `모델 > 뷰 > 템플릿` 순서로 설명을 진행한다.

## settings.py 주요 사항

`settings.py` 는 프로젝트 기본 설정 파일로 프로젝트에 필요한 다음과 같은 설정들이 포함되 있다.

- 데이터베이스 설정 : 기본으로 SQLite3 데이터베이스 엔진이 설정되 있다.
- 템플릿 항목 설정 : TEMPLATES 항목으로 지정할 수 있다.
- 정적 파일 항목 설정 : STATIC_URL 로 사용될 항목을 지정할 수 있다.
- 애플리케이션 등록 : 프로젝트에 포함되는 애플리케이션을 등록할 수 있다.
- 타임존 지정 : 최초 세계표준시(UTC) 로 설정되어 있다.

이 외에도 `루트 디렉토리, 각종 디렉터리 위치, 로그의 형식, 디버그 모드, 보안 관련사항` 등의 프로젝트 전반적인 사항들을 설정할 수 있다.

## models.py 주요 사항

테이블을 정의하는 파일이다. 

장고 특징중에 하나로 `데이터베이스 처리(ORM - Object Relation Mapping)` 기법을 사용하는데, 테이블 클래스를 매핑해서 테이블에 대한 `CRUD (Create, Read, Update, Delete)` 기능을 내부적으로 자동으로 데이터베이스에 반영해 준다.

하나의 클래스는 하나의 테이블과 매핑이 되고, 클래스의 속성은 테이블의 컬럼과 매핑 된다.

테이블의 신규생성 이라던지, 정의변경 등의 `models.py` 의 변경이 생기면, 이를 실제 데이터베이스에 반영을 해줘야 하는데, 이것이 `마이그레이션 개념` 이다. 이 개념에 의해서 각 애플리케이션 디렉터리 별로 `migrations/` 디렉터리 하위에 마이그레이션 정보들이 기록되어 있다.

## URLconf 주요 사항

URL과 뷰(함수 또는 메소드)를 매핑해 주는 `urls.py` 파일을 말한다.

`urls.py` 파일은 복수의 파일로 구성할 수도 있고, 단일 파일로 구성할 수도 있는데, 관리차원에서 복수파일로 구성하는 방식이 일반적이라고 할 수 있다.

## views.py 주요사항

뷰 로직을 코딩하는데 가장 중요한 파일로, 프로젝트 범위가 커질수록 점점 복잡해진다.

뷰 로직을 `함수형뷰, 클래스형뷰` 로 구분하는데, 함수 코딩인지, 클래스코딩인지에 따라 분류한다. 이는 개발자가 편한 방식으로 하면 된다.

## templates 주요 사항

웹 페이지별로 템플릿파일(html)이 하나씩 필요하기도 하고, 관리하는 차원에서도 한곳에 모아두는 것이 편하다.

`settings.py` 의 `TEMPLATES > DIRS` 설정에 디렉토리를 지정할 수 있다.

## Admin 사이트

장고에서 기본으로 제공되는 `Admin` 은 `DB 테이블의 열람,수정` 의 기능을 할 수 있는 곳이다. 프로젝트 진행시 사용자를 위한 어드민이 아니기 때문에, 구분을 할 필요가 있다.

## 개발용 웹서버 - runserver

코드를 실행하고 테스트를 할 수 있는 개발용 웹서버를 제공해 주는데, `runserver` 라는 명령어로 테스트로 사용할 로컬웹서버를 구동할 수 있다.

실제 사용웹서버에 비해서 처리능력도 떨어지고, 보안취약성도 가지지만 개발용으로는 문제가 없다.

