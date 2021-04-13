출처 : 
[![thumbs](https://lh3.googleusercontent.com/-DP_1WlcsJxw/WWHQ9TJixuI/AAAAAAAASKE/ndaT8Dslq1Ivom24xHoYd9w_eQObvMQwwCHMYCw/I/thumbs.jpg)](http://www.yes24.com/24/Goods/41070512?Acode=101)

# (BOOK) 6. 컴포넌트 고급#2 - 앵귤러 방식의 템플릿 요소 탐색, 컴포넌트 생명 주기

## 앵귤러 방식의 템플릿 요소 탐색

앵귤러에서 제공하는 DOM 탐색의 방법은 2가지 특징이 있다.

- 탐색의 대상은 자신의 컴포넌트 내에 템플릿에 한정됨. (이를 벗어날 수 없음)
- 탐색된 DOM 대상은 `ElementRef` 라는 타입의 객체로 반환된다.

이러한 특징은 컴포넌트에서 벗어나는 로직을 방지하려는 설계상의 선택이다. 

화면을 배치하고 조정하는 것을 앵귤러가 맡아 하고, 선언적방식의 컴포넌트-템플릿 코딩방식과, 앵귤러가 제공하는 DOM 요소를 통해서 DOM을 직접 제어하는 것을 원천적으로 제거하는 것이 목표 이다.

### ViewChild를 사용한 요소 탐색

`ng` 명령어로 두 개의 컴포넌트를 만들어 보자.

```command
> ng g component TestChild
  create src/app/test-child/test-child.component.css (0 bytes)
  create src/app/test-child/test-child.component.html (29 bytes)
  create src/app/test-child/test-child.component.spec.ts (650 bytes)
  create src/app/test-child/test-child.component.ts (284 bytes)
  update src/app/app.module.ts (410 bytes)
> ng g component TestParent
  create src/app/test-parent/test-parent.component.css (0 bytes)
  create src/app/test-parent/test-parent.component.html (30 bytes)
  create src/app/test-parent/test-parent.component.spec.ts (657 bytes)
  create src/app/test-parent/test-parent.component.ts (288 bytes)
  update src/app/app.module.ts (510 bytes)
```

그리고 소스를 수정하면

```html
<!-- // filename : [app/app.component.html] -->
<test-parent></test-parent>
```

```typescript
// filename : [app/test-child.component.ts]
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test-child',
  templateUrl: './test-child.component.html',
  styleUrls: ['./test-child.component.css']
})
export class TestChildComponent implements OnInit {
  myOpenState: string = 'let it be'
  private _internalState: string = 'not authorized';

  constructor() { }

  ngOnInit() {
  }

  foo() {
    console.log('foo');
  }

  private bar () {
    console.log('bar');
  }

}
```

```typescript
// filename : [app/test-parent.component.ts]
import { Component, OnInit, ViewChild } from '@angular/core';
import { TestChildComponent } from '../test-child/test-child.component';

@Component({
  selector: 'test-parent',
  template: '<test-child></test-child>'
})
export class TestParentComponent implements OnInit {
  @ViewChild(TestChildComponent) testChild: TestChildComponent;

  constructor() { }

  ngOnInit() {
  }


}
```

TestParentComponent가 자식요소를 탐색할 수 있도록 `ViewChild` 데코레이터를 통해서 `testChild` 라는 속성으로 선언을 하였다.

자식요소를 탐색할 수 있다는 의미에는 해당 컴포넌트의 **공개된 속성 및 메소드** 를 사용할 수 있다는 의미이기도 하다.

즉 `TestChildComponent`의 `myOpenState` 속성과 `foo` 메소드는 접근이 가능하지만, `_internalState` 속성과 `bar` 메소드는 접근이 불가하다.

테스트를 위해 `test-parent.component`를 수정하면

```typescript
// filename : [app/test-parent.component.ts]
import { Component, OnInit, ViewChild } from '@angular/core';
import { TestChildComponent } from '../test-child/test-child.component';

@Component({
  selector: 'test-parent',
  template: '<test-child></test-child>'
})
export class TestParentComponent implements OnInit {
  @ViewChild(TestChildComponent) testChild: TestChildComponent;

  constructor() { }

  ngOnInit() {
    window.test = this.testChild;
    console.log(this.testChild);
    console.log(this.testChild.myOpenState);
    // console.log(this.testChild._internalState);
  }

}
```

위와 같이 콘솔 출력을 해보면 분명 `testChild` 안에 `_internalState` 속성이 할당 되어 있는걸 확인할 수 있고, 접근할 수 있게 보이지만(빌드된 결과물에선 실제로도 접근할 수 있다.) 소스에서 `this.testChild._internalState` 를 접근 하려고 하면, 컴파일 오류가 난다.

노파심에 `constructor` 에서도 해봤지만 안된다.

### 템플릿 참조 변수와 ElementRef

이번에는 컴포넌트를 전달받는 것이 아닌, `ElementRef` 라는 타입을 주입받아서 DOM 에 접근해 보자.

```typescript
// filename : [src/app/app.component.ts]
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  elementRef: ElementRef

  constructor(ef: ElementRef) {
    this.elementRef = ef;
    console.log(this.elementRef.nativeElement);
  }

}
```

이러면 현재 컴포넌트의 Root에 해당하는 `DOM 요소` 를 얻을 수 있다.

이 방법외에 템플릿 참조 변수를 선언하는 방법으로도 할 수 있는데,

```html
<!-- filename : [src/app/test-child/test-child.component.html] -->
<div>
  <input type="text" id="n-1" #myInput />
  <input type="text" id="n-2" ref-myInput />
</div>
```

위와 같이 `#` 또는 접두어 `ref-` 를 붙이면 `ViewChild, ViewChildren` 데코레이터를 통해서 바인딩 할 수 있다.

```typescript
// filename : [src/app/test-child/test-child.component.ts]
import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'test-child',
  templateUrl: './test-child.component.html',
  styleUrls: ['./test-child.component.css']
})
export class TestChildComponent implements OnInit {
  @ViewChild('myInput') myInput: ElementRef;
  @ViewChildren('myInput') myInputs: QueryList<ElementRef>;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log(this.myInput, this.myInputs);
  }

}
```

`constructor` 에서 `root element`를 주입받아 자식을 제어하는 방법 보다는 편리해 보인다.

`this.myInput.nativeElement` 로 순수 DOM을 얻을 수 있고, `this.myInputs` 에는 `_results` 속성 안에 해당 요소들이 배열로 담겨 있다.

`ViewChild` 데코레이터가 요소를 하나 건져오는 용법 이라면, `ViewChildren` 은 여러 요소를 건져오는 용법이라 반복적으로 생성되는 요소를 건져올 때 적합하다.

```html
<!-- filename: [app/test-child/test-child.component.html] -->
<ul>
  <li *ngFor="let item of items" #listItems>{{ item.content }}</li>
</ul>
```

```typescript
// filename : [app/test-child/test-child.component.ts
import { Component, AfterViewInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'test-child',
  templateUrl: './test-child.component.html',
  styleUrls: ['./test-child.component.css']
})
export class TestChildComponent {
  items: any[];
  @ViewChildren('listItems') listItems: QueryList<ElementRef>;

  constructor() {

    this.items = [
      { content:1 },
      { content:2 },
      { content:3 },
      { content:4 },
      { content:5 }
    ];
    
  }

  ngAfterViewInit() {
    console.log(this.listItems);
  }

}
```

`listItems` 의 `_results` 속성 안에 `li` 요소들이 담겨진다.

주의할 점은 뷰의 초기화가 끝나기 전에는 얻어올 수 없기 때문에, `ngOnInit` 이나 `constructor` 에서는 해당 요소를 얻어올 수 없다.

이렇게 가지게 된 참조 변수를 템플릿 안에서도 활용할 수 있다.

```html
<!-- filename: [app/test-child/test-child.component.html] -->
<div>
  <input type="text" id="n-1" #keyInput (keyup)="leaveKeyLog($event, keyInput.value)" />
  <div>Input[id="{{keyInput.id}}"] your current input: {{keyInput.value}}</div>
  <div>Input[id="{{keyInput.id}}"] all inputs: {{logs | json}}</div>
</div>

<div>
  more attributes of INPUT[id="{{keyInput.id}}"] <br />
  type: {{keyInput.type}} <br />
  isRequired: {{keyInput.required}} <br />
  isDisabled: {{keyInput.disabled}} <br />
  ...

</div>
```

```typescript
// filename : [app/test-child/test-child.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'test-child',
  templateUrl: './test-child.component.html',
  styleUrls: ['./test-child.component.css']
})
export class TestChildComponent {
  logs: number[];
  constructor() {

    this.logs = [];

  }

  leaveKeyLog(evt, num:number) {
    if(evt.keyCode === 13) {
      this.logs.push(num);
      evt.target.value = '';
    }
  }

}
```

위 예제와 같이 지정된 요소를 템플릿 안에서 자유롭게 사용하는 것이 가능하다.
(viewchildren 방식이 이거보다 좀 더 쉬운 형태였으면 좋겠다는 개인적인 생각을 해 본다.)

## 컴포넌트 생명 주기

컴포넌트는 생성되고 삭제될때 까지의 생명주기를 가지고 있으며, 이 인터페이스 들은 전부 `ng`가 붙는 메소드가 하나씩 선언되어 있다.

예를 들어 `OnInit` 생명주기는 `OnInit 인터페이스`가 존재하고, 이 인터페이스 안에는 `ngOnInit` 라는 메소드를 가지고 있다.

생명 주기는 생성부터 소멸까지 일련의 순서를 거친다.

![angular2-component-lifecycle](https://lh3.googleusercontent.com/-fKxW2UGb_YA/Wc3ZH-T2fxI/AAAAAAAAS1I/bB6BL1PPHNEx4I2u9odW2AWZo4gIpuwbwCHMYCw/I/angular2-component-lifecycle.png)

크게 보면 이렇게 5단계 이지만 세밀하게 보면,

`ngOnInit -> ngDoCheck` 
`ngAfterContentInit -> ngAfterContentChecked`
`ngAfterViewInit -> ngAfterViewChecked`

단계가 존재하고, 4번과 5번 사이에 반복 체크 되고 있는 `Event` 단계가 존재 한다.

`Event -> ngAfterViewChecked -> ngAfterContentChecked -> ngDoCheck -> ngOnChanges`

이벤트가 발생할 때마다 위와 같은 순서의 생명주기를 가진다.

컴포넌트가 종료되는 시점에는 `ngOnDestroy` 가 발생 한다.

### ngOnInit와 ngOnDestroy

`OnInit` 는 컴포넌트의 생성을 의미 한다. 그 앞 단계인 `ngOnChanges`가 있지만, 이것은 특정조건에서 발생하기 때문에 시작으로 보지 않는다. 컴포넌트가 초기화를 마치고 완전한 상태를 갖춘 시점을 `ngOnInit` 메소드가 호출되는 시점으로 본다.

`constructor`와의 차이점은 `constructor`는 해당 객체가 생성될 시점이기 때문에, 앵귤러에 바인딩 되는 속성이나 메소드 혹은 부모 컴포넌트로부터 상송받은 것들 등의 초기화 단계 이전이라고 본다.

즉 `constructor`는 해당 `class`가 생성되는 시점의 `es6` 문법에 정의되 있는 함수일 뿐, 앵귤러 프레임워크의 동작과는 무관하다고 보면 된다.

앵귤러가 제공하는 기능을 사용하고자 한다면 `ngOnInit` 호출단계 이후부터 사용해야만 한다.

`ngOnDestroy`는 컴포넌트 객체가 소멸하기 전에 호출되어 지는데, 소멸 전에 해야할 것이 있다면 이곳에서 작업하면 된다.

### ngAfterContentInit와 ngAfterViewInit

컴포넌트의 뷰가 초기화 되는 시점에 호출된다. 이 둘의 차이점은 `ViewChild, ContentChild` 와 관련이 있다. `content projection` 을 사용할 때에는 `ContentChild` 메소드를 이용 해야만 한다.

`ngAfterViewInit`는 컴포넌트의 템플릿이 완전히 초기화된 시점에 호출되며, 모든 속성이 정상적으로 바인딩 되었고, 뷰렌더링도 정상이 되었음을 의미한다.

### ngOnChanges

컴포넌트의 상태 변경을 뷰에 자동반영 할 수 있도록, 내부적으로 컴포넌트의 상태를 늘 감시하고 있다. 컴포넌트의 상태가 변경될 때 앵귤러는 `ngOnChanges` 혹은 `ngDoCheck`를 호출한다.

`ngOnChanges` 메서드를 구현했다고 해서 반드시 호출되는 것은 아니고, 컴포넌트가 속성바인딩을 통하여 부모 컴포넌트의 영향을 받는 상태에서만 호출 된다는 점을 주의하자.

예제를 보면서 확인해 보자.

```html
<!-- filename: [app/test-parent/test-parent.component.html] -->
<h2>OnChanges</h2>
myNum: <input type="number" [(ngModel)]="numVal" /><br />
myStr: <input type="text" [(ngModel)]="strVal" /><br />
<test-child [myNum]="numVal" [myStr]="strVal"></test-child>
```

```typescript
// filename: [app/test-parent/test-parent.component.ts]
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test-parent',
  templateUrl: './test-parent.component.html'
})
export class TestParentComponent implements OnInit {
  numVal: number;
  strVal: string;

  constructor() {
    this.numVal = 1;
    this.strVal = 'test';
  }

  ngOnInit() {
  }

}
```

부모 컴포넌트에서 속성 바인딩을 속해 값을 전달하고, 자식 컴포넌트 에서는

```html
<!-- filename: [app/test-child/test-child.component.html] -->
<h4>PropInputBind Test</h4>
<p>myNum: {{myNum}}</p>
<p>myStr: {{myStr}}</p>
```

```typescript
// filename: [app/test-child/test-child.component.ts]
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'test-child',
  templateUrl: './test-child.component.html',
  styleUrls: ['./test-child.component.css']
})
export class TestChildComponent {

  @Input() myNum: number;
  @Input() myStr: string;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.myNum && !changes.myNum.isFirstChange()) {
      console.log('change detected');
    }

    for (let propName in changes) {
      let change = changes[propName];
      if(change.isFirstChange()) {
        console.log(`first change: ${propName}`);
      } else {
        console.log(`prev: ${change.previousValue}, cr: ${change.currentValue}`);
      }
    }
  }

}
```

값이 변경될 때마다 `ngOnChanges` 메소드가 호출 되며, console에 값이 출력 되는 것을 확인할 수 있다.

예제에 보면 `ngOnChanges`에 하나의 전달인자가 있는 것을 확인할 수 있는데, 앵귤러가 제공하는 `SimpleChanges` 타입으로 지정되었기 때문에, 몇가지 메소드가 제공되어 진다는 것을 기억하자.

### ngDoCheck

컴포넌트의 상태 변경이 감지되면 항상 호출되는 메소드 이다.

기본적으로는 컴포넌트 초기화 후 `ngOnInit` 호출뒤에 바로 호출되고 이후에는 컴포넌트의 변경이 감지되면 무조건 호출 된다.

이 메소드는 호출빈도가 높기 때문에, 무거운 작업 보다는 꼭 필요한 작업만을 하기를 권장 한다.

이 예제는 jQuery의 Datepicker를 사용하여 앵귤러가 감지 못하는 상황을 예로 들었다.

예제링크 : [jQuery Datepicker 연동예제](https://embed.plnkr.co/3gLODm/)

### ngAfterContentChecked와 ngAfterViewChecked

이것은 `ngAfterContentInit, ngAfterViewInit` 와 쌍을 이루는 메서드로, `ngAfterContentInit` 호출 후에 `ngAfterContentChecked`가 호출되고, `ngAfterViewInit` 호출 후에 `ngAfterViewChecked` 메소드가 호출 된다.

주로 Init에서 뭔가를 변경하고, checked에서 확인을 하거나, 변경된 값을 다른쪽에 전달하거나 하는 등의 작업을 한다.

### 지시자의 생명 주기

지시자의 생명주기와 컴포넌트의 생명주기는 동일한데 차이가 있는 뿐은 뷰의 이벤트와 관련된 생명 주기 이다.

지시자는 뷰가 없기 때문에 뷰 관련 생명주기가 없다. 그 외에는 동일하다고 보면 된다.

