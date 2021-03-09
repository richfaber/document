# 주석으로 스타일 가이드를 만들 수 있는 Living Style Guide Generator

## 동기

개발자는 각각 코드를 작성하는 방식이 다르기 때문에, 공동작업을 위해서 서로 어느 정도는 규약을 맞추게 되는데, 이것이 가이드의 시작이 되는듯 하다.

또한 새로운 사람이 팀의 구성원 으로 들어왔을 때, 그의 작성코드가 `팀` 또는 `팀간의 협업팀` 과의 온도차이가 있는 코드라면, 왜 했는지를 고민해야 하고, 그것을 다시 재정립 하는 데에 시간이 걸리게 된다.

다른 코드를 다시 고민함 으로써, 있던 코드를 업데이트 할 수 있다는 장점이 있지만, 효율적인 부분만 따진다면 가이드는 아주 적합한 방법 이다.

보통의 개발자가 혼자 일할 수 있는 환경을 선호하지만, 막상 그런 경우는 아예(?) 없기 때문에, 가이드를 작성할 수 밖에 없고, 그렇다면 몇가지 작전을 만들어야 한다.

1. 대상은 누구인가. (사용자)
2. 어디서 어디까지를 작성해야 하는가. (범위)
3. 어느정도 걸릴 것인가. (기간)

를 정하게 되고, 시작하고 나면 사용자에 눈높이에 맞는지를 타진 하면서 작성이 된다.

가이드의 목적은 정보를 전달하는 것을 목적으로 하기 때문에, 작성 후에 사용자가 사용을 하지 않으면, 버려지게 된다. 이런 이유 때문에 사용자의 눈높이를 맞추는 과정에 생각보다 시간을 소진하게 된다.

그렇게 잘 만들어진 가이드로 정보전달이 효율적으로 되었다면 이것은 아주 좋은 가이드 역할을 하게 된다.  

이런 과정을 거치는 가이드는 보통 `통합가이드` 를 작성할 때에 하는 것들 이고, 프로젝트를 할 때마다 매번 가이드를 작성해야 할 때도 있다.

대표적으로 대행사(에이전씨, SI)의 작업물 들은 프로젝트를 마칠 때마다 산출물로 가이드를 작성해야 하는데, 이렇게 매번 가이드를 작성해야 할 때는, 통합가이드를 만들 때 처럼 다시 과정을 겪지 않는다.
 
왜냐하면 통합가이드를 기반으로 작성된 프로젝트 산출물 이기 때문에, 다시 고민할 여지가 크지 않은 것이다.

이런 형태의 가이드는 약간은 노동 같은 느낌이 든다. 고민할 부분이 적고, 붙여넣기 하는 부분이 상당히 더 있기 때문에, 기계적인 일이 되기 때문이다.

이러한 기계적 가이드를 만들지 않고, 통합가이드를 참고하시면 됩니다. 라고 할 수 있는데, 미묘하게 프로젝트마다 다른점 들이 존재하기 때문에, 작성할 수 밖에 없고, 좀 더 편하게 할 수 있는 방법이 없을까를 찾게 되었다.

내가 작성한 코드를 분석해서 자동으로 가이드를 만들어 주는 것이 제일 좋은데, 그런 인공지능 방법은 찾지 못했고, 주석을 활용한 스타일 가이드로 **리빙 스타일 가이드 제너레이터** 라는 것을 보게 되었다. 

이것은 주석을 정밀하게 작성하면 자동으로 아래와 같은 스타일 사이트를 만들어 준다.

![](https://lh3.googleusercontent.com/-5b9gOFTMlK8/W9VAbj7FnQI/AAAAAAAAVGA/1sB-oCxBG8Q8_mcic5n4rWaHeBPlk8P6QCHMYCw/I/15407023135109.jpg)

장점 으로는 

- 스타일을 작성하지 않아도 된다.
- 데모 예제를 보여주기 편하다. (pre 태그로 씨름하지 않아도 되고, 편집기로 각각 예제를 집어 넣는때 생각보다 까다롭고 귀찮음.)
- 꼭 가이드를 보지 않더라도 주석만 으로도 대충 파악을 할 수 있다.
- 이러한 방법들은 대개 일반적으로 알려져 있는 방법을 활용하는 경우가 많은데, 자바스크립트 뿐만 아니라 다른 언어의 `표준주석방식` 이 적용되기 때문에, 활용방법이 대중적이다. (주석표준제안 중 KSS방식)

단점 으로는

- 결국 단서가 될만한 주석을 작성해야 한다. 코드분석 후 내 머릿속 가이드를 자동으로 만들어 주지는 못한다.
- 학습비용이 발생한다.

진입장벽 으로는

- 태스크 러너에 대한 이해도가 필요하다. (구동하기 위한 배경지식)

가이드 사이트를 만들 때 먼저 생각하는 부분이, 메뉴는 어디에 배치하고, 배경은 어떻게 색칠하고, 스크롤은 어떻게 해야하지? 라는 고민을 하다가 컨텐츠에 집중하지 못할 경우가 있는데, 주석방식은 컨텐츠만 생각하면 된다는 것에서 이점이 있고, 집중해서 생각할 포인트가 줄어든 다는 생각이 들어 긍정적이라는 생각을 했다.

## 시작

검색을 해보면 몇가지 나오는데, 스타일가이드용 페이지를 따로 작업해야 하는 것들이 있고, 스타일의 몇가지 주석규칙을 적용하여 그것을 기반으로 작업되는 것들이 있는데, 주석을 활용할 수 있는 부분에 집중했다.

- http://stylemark-bootstrap.surge.sh/
![스크린샷 2018-10-28 오후 3.02.37](https://lh3.googleusercontent.com/-ee6tym98kjE/W9VRFV5mqzI/AAAAAAAAVGw/Dj4DyryDTMwUyJAba0coXUrZO0u1b3xKgCHMYCw/I/%255BUNSET%255D)

- https://github.com/livingstyleguide/livingstyleguide
![](https://lh3.googleusercontent.com/-OMOuRZo06OY/W9VLubsIHQI/AAAAAAAAVGQ/z7GdA4fRiNc79jkb0UPz0QYylRo9ht6dgCHMYCw/I/15407052061924.jpg)

- https://documentcss.com/
![스크린샷 2018-10-28 오후 2.46.40](https://lh3.googleusercontent.com/-GEber1Kx2Ck/W9VNgEyWbSI/AAAAAAAAVGk/WWOEhtXfC9AVvaDhroqr619YQvcG3EYHQCHMYCw/I/%255BUNSET%255D)

위에 것들은 그들만의 주석 규칙을 적용하여 작성하는 것들이고, `gulp + sass` 를 지원하면서 소스에 직접 주석을 달면 가이드가 나오는 형태로 범위를 좁혀서 찾아봤다.

- http://styleguide.sc5.io/
![스크린샷 2018-10-28 오후 2.43.37](https://lh3.googleusercontent.com/-BMnEUhccZ30/W9VMnp3ftmI/AAAAAAAAVGY/ho7rPmxB9zoOICsZKvUg7dYFOWYX-fwZQCHMYCw/I/%255BUNSET%255D)

- http://warpspire.com/kss/
![스크린샷 2018-10-28 오후 8.39.29](https://lh3.googleusercontent.com/-IV5N4wG8i5Q/W9WgDI53gUI/AAAAAAAAVHI/mMFVLkt6nh8u_l12Rtp30gUoHV_HOis_ACHMYCw/I/%255BUNSET%255D)

- http://kss-node.github.io/kss-node/
![](https://lh3.googleusercontent.com/-FxIhgYmPJR8/W9WggN3VUJI/AAAAAAAAVHQ/2AJvFdTQwA8SRI494Xi9mBbTKgNjtp5oQCHMYCw/I/15407269050556.jpg)

- http://jacobrask.github.io/styledocco/
![](https://lh3.googleusercontent.com/-ECJ0D1MmBeI/W9Wg5C09hNI/AAAAAAAAVHY/BA0oaB4YfmYEVio6buSYoNIweqd5K6r5ACHMYCw/I/15407270093107.jpg)

- https://holidaypirates.github.io/nucleus/
![](https://lh3.googleusercontent.com/-ASEBsx6tvis/W9WhKr8G2eI/AAAAAAAAVHg/YQxSL3nV3SErJUf9JrnhkZPmWRofidZ1wCHMYCw/I/15407270805042.jpg)

- https://github.com/EightMedia/styleguide.js
![](https://lh3.googleusercontent.com/-02QXKN4LdMk/W9WhzJTqT6I/AAAAAAAAVHo/WZx67RbEp0IFxJE-6Fjfkeli2fx8UP7oQCHMYCw/I/15407272434885.jpg)

조사를 해본 결과 정확하지는 않지만 두가지의 성격으로 나뉘어 지는 듯 했다.

* 자체적으로 제공하는 주석규칙을 지키고, 가이드용 페이지를 따로 작성해야 하는 제너레이터
* KSS(Knyle Style Sheets) 주석방식 혹은 DSS(Documented Style Sheets) 주석방식을 기반으로 하는 제너레이터

자체적 주석방식은 그들만의 고유언어를 제공하는 것이고, KSS와 DSS는 주석에 관한 가이드라인 문서로 다른언어에도 적용할 목적으로 나온 것인데, 이 규칙을 주석에 적용하면 제너레이터를 통해서 가이드문서 가 나오게 된다.

아무래도 범용목적이 더 유리하다는 생각에 KSS 뜨는 DSS 기반 제너레이터를 찾아봤으나, 왜인지는 모르겠지만 DSS 기반의 방식은 거의 사라지거나 설치조차 되지 않아서, 어쩔 수 없이 KSS 기반의 제너레이터를 실험하게 되었다. 

### gulp-kss

버전문제일거 같긴 한데, 온전히 설치가 되지 않아서, `force` 옵션으로 설치를 해야 한다.

```command
> npm install gulp gulp-kss gulp-concat --save-dev --force
```

`gulp-concat` 은 `gulp-kss` 예제사이트에서 제공하고 있는 `gulpfile.js` 파일 내에 필요한 모듈이다.

#### 사이트에서 제공한 예제

설치가 되었으면, `gulpfile.js` 파일을 작성하자

```javascript
//gulefile.js
var gulp = require('gulp');
var gulpless = require('gulp-less');
var gulpkss = require('gulp-kss');
var gulpconcat = require('gulp-concat');

gulp.task("default", function() {
    
    // Generate styleguide with templates
    gulp.src(['styles/**/*.less'])
        .pipe(gulpkss({
            overview: __dirname + '/styles/styleguide.md'
        }))
        .pipe(gulp.dest('styleguide/'));
    
    // Concat and compile all your styles for correct rendering of the styleguide.
    gulp.src('styles/main.less')
        .pipe(gulpless())
        .pipe(gulpconcat('public/style.css'))
        .pipe(gulp.dest('styleguide/'));

});
```

제공한 `gulpfile.js` 를 보니, `style` 폴더 안의 `less` 파일을 기준으로 작성 되었나 보다. 
그래서 `styles` 폴더를 만들고 `main.less` 파일을 추가해 보자.

```less
/*
A button suitable for giving stars to someone.

:hover             - Subtle hover highlight.
.stars-given       - A highlight indicating you’ve already given a star.
.stars-given:hover - Subtle hover highlight on top of stars-given styling.
.disabled          - Dims the button to indicate it cannot be used.

Styleguide 2.1.3.
*/
a.button.star{
    display: inline-block;
    width: 100px;
    height: 50px;
    background: white;
    border:1px solid red;
}
a.button.star.stars-given{
    border-color: green;
}
a.button.star.disabled{
    border-color: yellow;
}
```

그리고 `overview` 옵션에 마크다운 파일이 있는것을 볼 수 있는데, `styles/styleguide.md` 라는 대충 만든 파일을 추가했다.

```markdown
# 이 파일은 개요 파일이 된다.
```

그리고 이제 `gulp` 를 실행했더니, `styleguide` 라는 폴더에 2개의 파일과 `public` 폴더가 만들어 졌다.

![](https://lh3.googleusercontent.com/-iHMR4lWzsBw/W96xSe5SVKI/AAAAAAAAVJM/jJDO8_pOX7w89PkYoIG2oywvk44kGDNUwCHMYCw/I/15413210310184.jpg)

`public` 폴더는 가이드를 위한 스타일이나 자바스크립트 파일이 포함되어 있고, 가이드 파일인 `section-2.html` 파일과 개요파일로 만들었던 `styleguide.md` 파일이 담겼다.

`section-2.html` 을 브라우저에서 열어봤더니

![](https://lh3.googleusercontent.com/-c4ALcF3s01Y/W96xrFKdPOI/AAAAAAAAVJU/RYHNZNgv-rMe8PS1Jn1UhMyErmqS-TsOwCHMYCw/I/15413211318710.jpg)

이렇게 주석에 내용이 담겨진 사이트가 만들어 졌음을 확인할 수 있다.

`gulp-kss` 는 정말로 단순하게 주석을 기반으로 사이트가 나온다는 것을 확인할 수 있었다. 흥미롭군.

이보다는 조금 더 많은 기능을 제공하는 `generator` 를 찾게 되었고, 

`SC5 Style Guide Generator`를 사용해 보기로 했다.

### SC5 Style Guide Generator

이 모듈은 작성된 스타일 파일을 분석하여 예제까지 해준다고 한다.

![](https://lh3.googleusercontent.com/-659ePCR1klU/W96yoifPzcI/AAAAAAAAVJc/USxMbqVZGeUYfjLMpGOHW1whQrx1dEvxgCHMYCw/I/15413213754320.jpg)

빌드된 예제 사이트 : http://demo.styleguide.sc5.io/

github에 들어가서 예제파일을 따라해 보자.

#### 사이트에서 제공한 예제

난 `gulp` 를 선호하기 때문에, `gulp` 사용법으로 제공된 부분을 따라해 보았다.

(도대체 뭐가 문제니 ㅠㅜ,, 이것도 설치가 거부당하여 --force 옵션으로 강제설치 하였다.)

```command
> npm install gulp gulp-sass sc5-styleguide --save-dev --force
```

제공된 `gulpfile.js` 를 추가하고,

```javascript
// gulpfile.js
var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var outputPath = 'output';

gulp.task('styleguide:generate', function() {
  return gulp.src('*.scss')
    .pipe(styleguide.generate({
        title: 'My Styleguide',
        server: true,
        rootPath: outputPath,
        overviewPath: 'README.md'
      }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src('main.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('watch', ['styleguide'], function() {
  // Start watching changes and update styleguide whenever changes are detected
  // Styleguide automatically detects existing server instance
  gulp.watch(['*.scss'], ['styleguide']);
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
```

좀더 `task` 가 더 복잡하다는 것을 알 수 있다. 
사이트 설명을 보면 `generate` 와 `applystyles` 의 두 부분으로 나뉘어 지는것을 알 수 있다.

- generate : 가이드와 관련된 옵션들을 제공하고, `overview` 를 통해서 가이드파일의 개요파일을 선택할 수 있다.
- applystyles : 실제로 분석에 사용될 파일을 지정한다. sass 등의 파일은 `import` 구문을 사용하여, 대부분의 것들을 포함시켜 버리기 때문에, 실제 `output` 되는 파일은 1~2객 파일 정도가 된다.

설정을 보니 루트에있는 파일을 기반으로 하고 있는 것을 확인해서 루트에 파일을 추가하기로 했고, 마침 `sc5 guide generator tutorial` 이란게 있는 것을 발견해서, 거기 있는 `src` 폴더를 그냥 복사해 넣었다.

- sc5 guide generator tutorial : https://github.com/SC5/sc5-styleguide-tutorial

![](https://lh3.googleusercontent.com/-cBSK165Cd1c/W963VUzSilI/AAAAAAAAVJw/GjbcU_f9COkpEHz7nzxh31tdCNRzM5dvwCHMYCw/I/15413225807809.jpg)

`tutorial` 있는 대로 `gulpfile.js` 도 조금 손을 보았다.

```javascript
var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var outputPath = 'output';

gulp.task('styleguide:generate', function() {
  return gulp.src('src/styles/*.scss')
    .pipe(styleguide.generate({
        title: 'My Styleguide',
        server: true,
        rootPath: outputPath,
        overviewPath: 'src/styles/README.md'
      }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src('src/styles/tutorial.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('watch', ['styleguide'], function() {
  // Start watching changes and update styleguide whenever changes are detected
  // Styleguide automatically detects existing server instance
  gulp.watch(['*.scss'], ['styleguide']);
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
```

이제 실행해 볼까~

```command
> gulp styleguide
[18:11:19] Using gulpfile ~/repository/github/setting/livingstyleguide/sc5-styleguide/gulpfile.js
[18:11:19] Starting 'styleguide:generate'...
[18:11:19] Starting 'styleguide:applystyles'...
[18:11:19] Finished 'styleguide:applystyles' after 488 ms
Express server listening on port 3000
[18:11:21] Finished 'styleguide:generate' after 1.61 s
[18:11:21] Starting 'styleguide'...
[18:11:21] Finished 'styleguide' after 47 μs
```

끼야~ 한번에 되었어.. 감동..눈물... 로컬서버도 바로 구동되네.. 브라우저에 `localhost:3000` 기쁜 마음으로 열어보았다.

![](https://lh3.googleusercontent.com/-b8HpE-wRXWw/W964zfablbI/AAAAAAAAVJ8/C3cSgt9Cv7YdvF4yK7IamWmeffCjnFAggCHMYCw/I/15413229540215.jpg)

오.. 훌륭한 가이드 사이트가 나왔다.

![](https://lh3.googleusercontent.com/-DTvHacVwKnQ/W966WiyTy-I/AAAAAAAAVKI/du92n1pDKF8DtmazVb_eyvfu4ulR1M7RACHMYCw/I/15413233509594.jpg)

마크업 예제와  css예제도 나오고, preview 도 나왔다.

생성된 `output` 파일을 열어보니

![](https://lh3.googleusercontent.com/-LX8senk_794/W966uxBH-xI/AAAAAAAAVKQ/oZpQNscD5roM9e01MgWnyAGfM0u67YcdgCHMYCw/I/15413234511953.jpg)

이렇게 생겼는데, 생성된 파일들이 절대경로를 바라보고 있어서, 브라우저에 그냥 드래그해서는 나오지 않았다. 분명 옵션이 있을텐데.. 그건 그렇다 치고.

주석을 표시하는 몇가지 규칙을 들여다 보았다. 물론 이 규칙은 `KSS` 문서에서 명시하고 있는 주석방식이다.

`src/styles/ATOM.SCSS` 파일을 열어 보았는데, 주석이 `//` 로 전부 앞에 달려있어서, 이게 귀찮아서 시작과 끝에 주석을 다는 방식으로 `/*     */` 이렇게 바꿨는데, 전혀 상관 없이 잘 바뀌었다.

- 가이드에 필요한 주석은 `/*    */` 을 써도 되고 `//` 를 써도 무방하다.
- 주석의 마지막은 `Styleguide 1.1` 이런 버전을 두고 있다. `1.1` 은 첫번째 뎁스의 첫번째 메뉴를 의미한다.
- 하나의 메뉴는 주석의 시작과 끝이 구분되어야 한다. `/* */` 이렇게 한메뉴, 다음 메뉴는 구별해야 한다. 만약 `//` 주석으로 메뉴를 구별했다면 끝나는 지점에 한줄 띄어야 한다.

```scss
/*
Atoms

This is the atoms chapter. Atoms are the only parts that contain actual
class and style definitions. The higher level abastractions are mere
composites of the existing atoms.

Styleguide 1.0
*/

/*
위와 같이 주석의 끝을 맺으면 한메뉴가 된다.
Styleguide 1.1
*/

```

```scss

// Atoms
//
// This is the atoms chapter. Atoms are the only parts that contain actual
// class and style definitions. The higher level abastractions are mere
// composites of the existing atoms.
//
// Styleguide 1.0

// 위와 같이 주석이 끝나는 부분을 한줄 띄어야 함
// Styleguide 1.1

```

파일을 들여다보니 

```scss
.eg-person-info_role_designer - the person is a designer
.eg-person-info_role_developer - the person is a software developer
default - a normal person

markup:
<div class="eg-person-info {$modifiers}">
  <div class="eg-person-info__name">Name of the person</div>
  <div class="eg-person-info__description">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut
    dignissim neque. Suspendisse semper eu metus a congue. Morbi ultrices
    venenatis eros at placerat. Mauris gravida lacinia justo sit amet
    sodales.
  </div>
</div>
```

이런 구문이 보이는데, 그 위에 있는 텍스트 들은 현재 페이지의 개요에 해당했고, 클래스 들은 `preview` 영역에 대한 예제가 자동생성 되었고, `markup` 예제는  `markup:` 부분을 참고하여 만들어 졌고, `css` 예제는 주석 아래에 선언된 스타일을 참고해서 자동생성 되었다.

몇가지 의문점 들이 생기긴 한다. 만약 이미지가 필요하다면? 자동생성된 디자인을 변경하고 싶을땐?? 등등의 것들이 의문인데, 뭔가 옵션이 있을 거라고 생각하고 작정하고 써봐야 겠다.


