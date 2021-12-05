# SSR (Server Side Rendering) + APP 빌드

## 참고

- [Using NuxtJS to Build an iOS and Android App - Server Side Up](https://serversideup.net/using-nuxtjs-to-build-an-ios-and-android-app/)

- https://capacitorjs.com/



## 서두

SSR 기반의 웹소스에 APP 빌드 까지 하고 싶었다.

하나의 소스로 다양한 배포를 하고 싶다.



접근은 `Vue 기반` 으로 시작했고, `nuxt` 프레임워크가 `SSR` 빌드를 지원하기 때문에, `nuxt` 로 정했고,  `APP` 빌드를 위해 검색해서 찾은 것은, `CapacitorJS` 였다.

아이오닉 기반으로 동작하는데, 차이점이라고 따져보자면, 아이오닉은 자바스크립트로 `Native app` 크로스플랫폼 앱빌드가 목표라고 한다면, `CapacitorJS` 는 `웹 우선구축 후 앱빌드` 가 목표라고 되어 있다. 

목표가 다르니, 설명하는 문서의 형태가 다를 것이고, 괜찮다고 생각하여 테스트 해보았다.

(구글한글번역 또한 거의 훌륭하게 번역되어, 문서보는 데에는 어려움이 없었다.)

- [Capacitor - build cross platform apps with the web](https://capacitorjs.com/)

## 설치

앱빌드 부분에서 Android 는 `안드로이드 SDK` 가 설치되는 환경 이여야 하고, ios 는 `XCODE` 가 설치가능한 환경 이여야 한다.

(맥에서 안드로이드 sdk를 설치하는 방법이 있고, 윈도우 에서도 xcode 설치하는 방법이 있었다.)

맥북이 없고, 윈도우 기반에서 작업하고 있으므로, 안드로이드 환경부터 시작해 보았다.

### 안드로이드 앱빌드 환경 구축

가이드는 `안드로이드 SDK` 설치에 대해서 간략하게 되어 있다. 

안드로이드 스튜디오를 설치하고, 스튜디오 도구에서 SDK 를 설치하면 됩니다. 정도이다.



설명이 부족한게, 샘플로 생성되는 환경은 gradle 설치가 되어 있는 상태여야 했고, 안드로이드 스튜디오 SDK 가 동작하기 위해서 Java 설치가 되어 있어야 했다.

그리고 그 과정에서 오류나는 부분들 해결은 본인의 몫이였다.

이러한 부분들이 `Docker` 의 위대함을 증명해 주는 것이지 않을까?

(윈도우 환경변수 설정 및 기타 의존성 프로그램 등등) 



순서대로 정리를 해보았다. 



이후 각 도구들의 버전으로 호환성 문제가 있을수도 있으니, 버전을 기록해 둔다.

- java sdk 1.8

- gradle 7.3.1

- Android sdk v 11.0

- Android Virtual Device Manager > Pixel 2 API 30

- capacitor v3

#### JAVA 설치

앱빌드시 JAVA 는 최신버전 에서는 문제가 있었고, 8 버전 설치했을 때, 앱빌드 문제가 없었다.



- JAVA Version: 8

- Operating System: Windows

- ARCHITECTURE: x86 x64bit



1. [OpenJDK Downloads | Download Java JDK 8 & 11 | OpenLogic](https://www.openlogic.com/openjdk-downloads?field_java_parent_version_target_id=416&field_operating_system_target_id=436&field_architecture_target_id=391&field_java_package_target_id=All) -> 8u262-b10 버전 msi 설치패키지로 다운로드 후 설치

2. [windows에서 JAVA 환경변수 설정하기](https://marobiana.tistory.com/163) -> 환경변수 설정

#### gradle 설치

`gradle` 은 빌드도구 이다. 안드로이드앱 빌드에 사용된다. `maven` 과 비교되는 도구인데, 안드로이드 앱빌드 공식도구로 `gradle` 이 채택되어 있다고 한다.

(maven 도 되지 않을까? 하는 호기심은 재빨리 접었다.)



- [Gradle | Releases](https://gradle.org/releases/) -> 최신버전 설치

- [Gradle, Windows에 설치부터 실행까지!](https://itbellstone.tistory.com/101) -> 환경변수 설정

- [Maven과 Gradle의 차이](https://hyojun123.github.io/2019/04/18/gradleAndMaven/) -> 참고

#### 안드로이드 스튜디오 설치

- https://developer.android.com/studio/install?hl=ko -> 스튜디오 설치

- [안드로이드 스튜디오 SDK 환경변수 설정하는 방법 (SDK 폴더 경로) :: 하루플스토리](https://haruple.tistory.com/154) -> 환경변수 설정

#### 환경설정 정리

최종적으로 해당 환경변수 들이 등록되어 있으면, 빌드 시 문제가 없었다.

##### 환경변수 > 시스템변수

* GRADLE_HOME
  * C:\gradle\gradle-7.3
* JAVA_HOME 
  * C:\Program Files\OpenJDK\jdk-8.0.262.10-hotspot
* ANDROID_SDK_ROOT 
  * C:\Users\\[username]\AppData\Local\Android\Sdk
* Path
  * %JAVA_HOME%\bin
  * %ANDROID_SDK_ROOT%\bin
  * %ANDROID_SDK_ROOT%\tools
  * %ANDROID_SDK_ROOT%\platform-tools
  * %GRADLE_HOME%\bin

## 프로젝트 환경 구축하기

사전설치가 끝났다면 이제 설치다.

### nuxt 프로젝트 환경 설치



### 


















































