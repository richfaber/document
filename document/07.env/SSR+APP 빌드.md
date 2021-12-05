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

npx 는 `node` 설치 시에 `npm` 과 같이 설치되는 응용프로그램이다. `Node Package Executor` 로 패키지를 설치하지 않고도 실행할 수 있도록 하는 명령어 이다.

정확한 동작원리는 모르겠는데, 현재폴더의 `node_modules` 조회 후 없으면, global 설치된 부분 조회하고, 그래도 없으면 온라인에서 조회 후 실행하는 것으로 추정된다.

nuxt 프로젝트 기본환경설치를 위해서 npx를 이용한다.

```shell
> npx create-nuxt-app <project-name>
? Project name: <project-name>
? Programming language: JavaScript
? Package manager: Npm
? UI framework: Vuetify.js
? Nuxt.js modules: Axios - Promise based HTTP client, Progressive Web App (PWA)
? Linting tools: ESLint
? Testing framework: None
? Rendering mode: Universal (SSR / SSG)
? Deployment target: Server (Node.js hosting)
? Development tools: jsconfig.json (Recommended for VS Code if you're not using typescript)
? Continuous integration: None
? Version control system: Git
```

(powershell 로 설치하면 커서로 해당옵션을 선택할 수 있다.)



생성된 프로젝트 폴더로 이동 후에 `nuxt.config.js` 파일을 열고, `build` 옵션의 `publicPath` 를 수정한다.

```json

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: '/nuxt/',
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
```

웹팩버전은 4버전으로 맞춘다.

```shell
project name> npm uninstall webpack
project name> npm install --save-dev webpack@4.46.0
```

sass 사용자라면 sass 추가해 준다.

```shell
project name> npm install --save-dev node-sass sass-loader
```

이제 빌드를 실행해 보자

```shell
project name> npm run build
> projectname@1.0.0 build
> nuxt build

i Production build                                                                            18:22:29
i Bundling for server and client side                                                         18:22:29
i Target: server                                                                              18:22:29
i Using components loader to optimize imports                                                 18:22:29
i Discovered Components: .nuxt/components/readme.md                                           18:22:29
√ Builder initialized                                                                         18:22:29
√ Nuxt files generated                                                                        18:22:30

√ Client
  Compiled successfully in 13.39s

√ Server
  Compiled successfully in 4.93s


Hash: 9d157b303b96a691ec50
Version: webpack 4.46.0
Time: 13388ms
Built at: 2021. 12. 05. 오후 6:22:44
                         Asset       Size   Chunks                                Chunk Names
../server/client.manifest.json   17.6 KiB           [emitted]
                    0b3816a.js    489 KiB        9  [emitted] [immutable]  [big]  vendors/app
                    10a2076.js   6.58 KiB        4  [emitted] [immutable]         components/tutorial
                    173abfd.js   5.13 KiB       10  [emitted] [immutable]
                    7fa868a.js    215 KiB        2  [emitted] [immutable]         commons/app
                    8fe1c4a.js  644 bytes        7  [emitted] [immutable]         pages/inspire
                    9c30163.js   12.6 KiB        0  [emitted] [immutable]         vendors/pages/index/pa
ges/inspire
                      LICENSES  407 bytes           [emitted]
                    a9e266d.js   2.36 KiB        8  [emitted] [immutable]         runtime
                    b7013cb.js   1.85 KiB        3  [emitted] [immutable]         components/nuxt-logo
                    bca6f50.js   55.9 KiB        1  [emitted] [immutable]         app
                    cc290d9.js  946 bytes        5  [emitted] [immutable]         components/vuetify-log
o
                    ea69820.js   22.3 KiB  6, 3, 5  [emitted] [immutable]         pages/index
 + 2 hidden assets
Entrypoint app = a9e266d.js 7fa868a.js 0b3816a.js bca6f50.js

WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  0b3816a.js (489 KiB)

Hash: 175a7a8548a8947c0f4d
Version: webpack 4.46.0
Time: 4933ms
Built at: 2021. 12. 05. 오후 6:22:49
                     Asset       Size   Chunks             Chunk Names
   components/nuxt-logo.js   6.36 KiB        1  [emitted]  components/nuxt-logo
    components/tutorial.js   7.21 KiB        2  [emitted]  components/tutorial
components/vuetify-logo.js   5.45 KiB        3  [emitted]  components/vuetify-logo
            pages/index.js   55.3 KiB  4, 1, 3  [emitted]  pages/index
          pages/inspire.js   18.8 KiB        5  [emitted]  pages/inspire
                 server.js    674 KiB        0  [emitted]  app
      server.manifest.json  667 bytes           [emitted]
 + 6 hidden assets
Entrypoint app = server.js server.js.map
i Ready to run nuxt start         
```

웹팩빌드가 정상적으로 넘어가면 설정이 잘 된것이다. 

에러가 발생한다면 에러조치 이후 다음단계로 넘어가야 한다.

### CapacitorJS 설치

해당 프로젝트 폴더로 이동 후에 패키지를 추가해 준다.

```shell
project name> npm install --save-dev @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
```

### CapacitorJS 초기화

Capacitor 초기화를 진행한다. 여기서 `Package ID` 는 구글스토어플레이 와 맥 앱스토어에 등록되는 ID로 중복이 불가하기 때문에, 유일한 값으로 해야 한다.

등록할 때 변경이 가능하다고 하니, 대충 등록하고 이후 수정하기로 했다.

Web asset directory 는 `dist` 로 설정한다.

```shell
project name> npx cap init
√ Package ID ... <Package ID>
[?] What is the web asset directory for your app?
    This directory should contain the final index.html of your app.
√ Web asset directory ... dist
√ Creating capacitor.config.ts in <Project Folder> in 4.42ms
[success] capacitor.config.ts created!
```

성공 후 `capacitor.config.ts` 생성이 된다. 

이 파일의 `webDir` 은 nuxt 빌드 시 생성되는 폴더와 일치해야 한다. 

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'package id',
  appName: 'project name',
  webDir: 'dist',
  bundledWebRuntime: false
};

export default config;
```

`ios, android` 플랫폼을 추가한다

```shell
project name> npx cap add ios
project name> npx cap add android
```

이제 `generate` 명령어로 `dist` 에 빌드파일을 생성한다. generate는 build 후에 해야함. 

유니버셜 모드 generate랑 spa generate랑 다르다 -_-_



이후

npx cap copy

로 적절한 위치에 andoid ios에 복사한다.



npx cap sync android 로 그래들의 뭔가를 동기화 한다.



npx cap open android 

로 안드로이드를 구동해 본다



안드로이드 스튜디오 열리고, gradle 빌드 성공 후에 avd 추가해서 열어본다

그럼 정상구동 되면 성공이다.



앱을 빌드하기 위한 최종 워크플로는 다음과 같습니다.

1. `npm run build` NuxtJS 앱을 빌드하려면
2. `npm run generate` 정적 배포를 위해 NuxtJS 앱 패키징
3. `npx cap copy` 빌드된 앱을 iOS 및 Android 작업 공간에 복사하려면
4. `npx cap open ios`또는 `npx cap open android`플랫폼용 기본 IDE에서 앱을 열고 디버그할 수 있습니다.
