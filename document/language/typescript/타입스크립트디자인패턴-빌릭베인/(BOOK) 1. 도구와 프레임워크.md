![타입스크립트 디자인 패턴](https://lh3.googleusercontent.com/-9rIL7BmyXH4/WjZKwIgcaLI/AAAAAAAATI8/GPFiMFtIqCwomkN34B-BHETdbk-whOAUACHMYCw/I/1492078251UdV8l4PZ.jpg)  
[타입스크립트 디자인 패턴](http://www.yes24.com/24/goods/38881387?scode=032&OzSrank=1)

자바스크립트는 크로스 플랫폼과 크로스 디바이스 어디서나 실행되는 유일한 언어가 되었고,(아직은 진행중이지만?) 웹에서의 상호작용은 점점 더 복잡해지고 비즈니스 로직은 백엔드에서 프론트엔드로 이동하고 있다.

하지만 자바스크립트가 갑작스러운 인기를 얻자, 자바스크립트 언어 자체로 큰 규모의 애플리케이션에 대해 효율적이지 않을 수 있음이 드러난다.

예컨데 

- 정적 타입 검사가 없다. : 코드 작성시 간단한 에러를 없애기 위해 디버깅이나 테스트에 의존해야 한다.
- 리팩토링은 고통스럽다. : 수많은 IDE 들이 할 수 있는 작업은 고작 로컬 변수의 이름변경이나 모듈 함수를 내보내는 것이다.
- 코드를 이해하기 어렵다. : 조각난 코드로 인해 객체의 속성이나, 프로토타입은 무엇인지 알아내기 위해 수동으로 검색해야 한다.

자바스크립트로 다수의 개발자가 작성한 코드는 파편화 되어 있고, 합의하에 규약을 정한다 해도 결국 생각이 다를수 밖에 없기 때문에, 소모적인 신경전(예컨데 개발자들은 자신이 지금껏 해오던 방식을 쉽게 바꾸려 하지 않고, 더 심하게는 자신의 방법은 바른 방법이고, 다른 방법은 틀린 방법 이라고 규정해 버린다.)을 벌여야 한다.

이것은 무엇이 잘못되었음을 따지기 이전에 소모적인 것은 분명하다.

# 도구와 프레임워크

## 사전 설치사항 

### Node.js 설치

- [Node.js 홈페이지에서 다운로드 받아 설치하기](https://nodejs.org/ko/download/)
- [패키지 매니저로 설치하기](https://nodejs.org/ko/download/package-manager/)

설치 후 터미널에서

```command
> node -v
x.x.x

> npm -v
x.x.x
```

이렇게 나오면 정상 설치 된 것이다.

### 타입스크립트 컴파일러 설치

타입스크립트를 컴파일 하기 위해 추가 설치를 한다.

```command
> npm install typescript -g
```

정상적으로 설치가 되었다면, 아래의 명령을 사용할 수 있다.

```command
> tsc -v
Version x.x.x
```

이러면 준비가 되었고, 파일을 하나 만들어서 컴파일을 해보자

```typescript
// filename : [test.ts]
function hello(name: string): void {
	console.log(`hello, ${name}!`);
}

hello('world');
```

이렇게 파일을 생성하고

```command
> tsc test.ts
```

하고 나면 `test.js` 파일이 생성된다. 이제 node로 실행해 보자

```command
> node test.js
hello, world!
```

끝!

책에선 에디터와 관련된 설정 설명들이 더 추가되어 있다.

## 워크플로우 작업

### 타입스크립트 프로젝트 구성

컴파일 하기 위한 옵션을 설정할 수 있는데, `tsconfig.json` 파일이다.

#### tsconfig.json 소개

총 3개의 큰 맥락이 있다.

- compilerOptions : 컴파일 옵션
- files : 대상폴더
- exclude : 제외폴더

```json
{
	"compilerOptions": {
		"target": "es5",
		"module": "commonjs",
		"rootDir": "src",
		"outDir": "out"
	},
	
	"files": [ "src/foo.ts", "src/bar.ts" ],
	
	"exclude": [ "out", "node_modules" ]
}
```

##### 컴파일러 옵션

- target : 어떤 표준을 따를지 지정한다.  * es5: ECMASCRIPT 5 * es6: ECMAScript 6/2015
- module : 자바스크립트 표준 모듈이 없기 때문에 범람하는 모듈로더 들이 있다. (commonjs, amd, umd, system) amd 한표 @_@!
- declaration : 자바스크립트 출력과 함께 .d.ts 선언파일을 생성하는 옵션이다. 
- sourceMap : 컴파일 하고나면 원본소스와 완전히 다른 `js` 파일이 나오기 때문에, 디버깅하기가 힘들다. 새로생성한 js에 대한 위치정보를 저장할 수 있다.
- jsx : 이 값을 `react` 로 지정하면 `.tsx` 파일들에 대해 `js` 파일로 컴파일 시도한다. 만약 `preserve` 로 지정하면 `.jsx` 파일을 생성하게 된다.
- noEmitOnError : 컴파일 오류를 무시한다. (없어져라 이런옵션! -_-?)
- noEmitHelpers : 하위 버전과의 호환성을 위해 `__extends, __awaiter` 같은 도우미를 같이 설치하는데, 이것을 생성하지 않을 수 있다. (하지마 이런옵션 따위!! 하지만 용량은 많이 줄겠군..)
- noImplictAny : 변수/파라미터의 타입 지정이 되어 있지 않고, 상황상 유추가 안될 경우 컴파일 오류를 발생시킨다.
- experimentalDecorators : 데코레이터의 사용 유무를 결정한다.
- emitDecoratorMetadata : 데코레이터를 사용할 지를 결정한다. 옵션이 활성화 될 경우 `Reflect.metadata() 데코레이터` 가 함께 포함된다.
- outDir : 컴파일이 되는 폴더를 지정한다.
- outFile : 하나의 파일로 컴파일되기 원할 때 사용한다.
- rootDir : 소스의 루트를 지정한다.
- preserveConstEnums : 열거형 타입을 사용할 지를 결정한다. 활성화하면 `enum` 타입을 변환하지 않는다.
- strictNullChecks : 타입스크립트 2.1 부터 `undefined, null` 타입을 명시적으로 선언할 수 있다. 활성화 하면 철저한 타입검사를 수행한다 (ㅠㅜ)
- stripInternal : 활성화 하면 주석으로 간주하지 않는 주석을 사용할 수 있다. `/** @internal */ (JSDoc annotation)`

#### 소스맵 지원

소스맵을 컴파일 후 생성한 파일에서도 사용하기 위해서는 추가 모듈을 설치해야 한다.

```command
> npm install source-map-support --save
```

설치 후 각 엔트리(entry) 파일은

```typescript
import 'source-map-support/register'
```

를 로드 해야 한다.

### typings를 이용한 선언 다운로드

타입스크립트를 해당 변수나 함수의 타입지정이 되어 있지 않으면, 컴파일이 되지 않는다. jQuery를 import 했다면 컴파일 과정에서 타입선언이 되어 있지 않다는 많은 버그를 보게 될 것이다. 

이를 위해 `.d.ts` 파일에 오류나는 것을 일일히 선언할 수는 없는 노릇. 자동으로 참조하게 도와주는 것이 `typings` 이다. 필수로 설치하는 것이 좋다.

#### typings 설치

```command
> npm install typings -g
```

#### 선언 파일 다운로드

`express` 를 사용한다고 가정하자

```typescript
import * as express from 'express';
```

이 파일을 컴파일 하려고 하면 `Cannot find module express` 라는 에러를 발생 시키는데, 컴파일러 `tsc` 가 express 모듈이 어떤 타입인지를 모르기 때문이다. 이런 부분이 참 번거롭다.

```command
> typings install env~node --global
> typings install express
```

설치하고 나면 `node.d.ts, express.d.ts` 등의 파일이 `typings` 폴더에 저장되고, 타입스크립트 컴파일러는 선언된 파일이 따로 없으면, 혹은 선언파일은 있지만 찾을 수 없는 경우, `typings` 폴더를 탐색하고 그래도 없으면 `Cannot find module express` 를 토해 한다.

### 모카와 이스탄불을 이용한 테스트

테스트는 프로젝트의 중요한 부분으로 기능의 일관성을 보장하고 버그를 일찍 발견할 수 있게 도와준다.

작성방법에 대해서는 논의가 있고, 테스트주도 개발(Test-Driven Development)이 힘을 얻고 있다.

#### 모카와 차이

모카는 자바스크립트에서 가장 널리 사용되는 테스트 프레임워크 중 하나이고, `차이(chai)` 는 `단언문(assertion)` 라이브러리로서 도우미 같은 것이다.

```command
> npm install mocha -g
> npm install chai --save-dev
```

#### 테스트 코드 작성

`mocha` 명령을 수행하면 자동으로 `test` 폴더를 참조하여 테스트를 시작한다.

```javascript
// filename: [test/starter.js]
require('chai').should();

describe('some feature', () => {
	it('should pass', () => {
		'foo'.should.not.equal('bar');
	});
	
	it('should error', () => {

		( () => {
			throw new Error();
		}).should.throw();
	});
	
});
```

`mocha` 를 실행하면 테스트 결과를 볼 수 있다.



