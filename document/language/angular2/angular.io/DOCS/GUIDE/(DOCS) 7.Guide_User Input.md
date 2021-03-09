> angular.io > DOCS > GUIDE > [7. User Input](https://angular.io/docs/ts/latest/guide/user-input.html)
> 2016/12월 기준 으로 작성 되었고, 의역 하였고, 오역이 있습니다.

# USER INPUT

- User input은 DOM 이벤트를 트리거 합니다. 업데이트 된 model 값은 component 및 model에 전달하는 이벤트 바인딩을 통해서 전파/수신 됩니다.

링크 클릭, 버튼 누름 및 텍스트 입력과 같은 사용자 작업은 DOM 이벤트를 발생 시킵니다.
이 페이지 에서는 Angular 이벤트 바인딩 구문을 사용하여 해당 이벤트를 component 이벤트 핸들러에 바인딩하는 방법을 설명합니다.

[실제 예제](https://angular.io/resources/live-examples/user-input/ts/eplnkr.html)를 실행하십시오.

## 사용자 input 이벤트에 바인딩

Angular 이벤트 바인딩을 사용하여 모든 DOM 이벤트에 응답 할 수 있습니다.
많은 DOM 이벤트가 사용자 입력에 의해 트리거됩니다. 이벤트에 바인딩을 하면 사용자 로부터 입력을 받을 수 있습니다.

DOM 이벤트에 바인딩 하려면 DOM 이벤트 이름을 괄호로 묶고 따옴표 붙은 [템플릿 명령문](https://angular.io/docs/ts/latest/guide/template-syntax.html#template-statements)을 할당하십시오.

다음 예제는 클릭 핸들러를 구현하는 이벤트 바인딩을 보여줍니다.

```html
<button (click)="onClickMe()">Click me!</button>
```

등호 왼쪽의 `(click)` 은 바인딩의 대상인 버튼의 클릭 이벤트를 식별합니다. 등호 오른쪽의 따옴표로 묶인 텍스트는 component의 onClickMe 메서드를 호출하여 click 이벤트에 응답하는 템플릿문 입니다.

바인딩을 이해하려면 템플릿문 실행 컨텍스트를 알고 있어야 합니다.

템플릿 명령문의 식별자는 특정 컨텍스트 객체에 속하며, 일반적으로 템플릿을 제어하는 Angular component입니다.
위의 예는 한 줄의 HTML을 보여 주지만 HTML은 더 큰 component에 속합니다.

**[app/click-me.component.ts]**

```typescript
@Component({
  selector: 'click-me',
  template: `
    <button (click)="onClickMe()">Click me!</button>
    {{clickMessage}}`
})
export class ClickMeComponent {
  clickMessage = '';

  onClickMe() {
    this.clickMessage = 'You are my hero!';
  }
}
```

사용자가 버튼을 클릭하면 Angular는 ClickMeComponent에서 onClickMe 메서드를 호출 합니다.

## $event 객체 로부터 사용자 input 받기

DOM 이벤트는 component에 유용하게 활용할 수 있는 많은 양의 정보를 전달해 줍니다.
이 절에서는 input box의 keyup 이벤트에 바인딩 하여 각 키 입력 후 사용자의 입력을 얻는 방법을 보여줍니다.

다음 코드는 keyup 이벤트를 수신하고, component 이벤트 핸들러에게 전체 이벤트 정보($event)를 전달 합니다.

**[app/keyup.components.ts (template v.1)]**

```typescript
template: `
  <input (keyup)="onKey($event)">
  <p>{{values}}</p>
`
```

사용자가 키를 눌렀다 놓으면 keyup 이벤트가 발생 하고, Angular는 이 코드가 component의 onKey() 메서드에 매개 변수로 전달하고 있는, $event 변수에 해당 DOM 이벤트 객체를 제공 합니다.

**[app/keyup.components.ts (class v.1)]**

```typescript
export class KeyUpComponent_v1 {
  values = '';

  onKey(event:any) { // without type info
    this.values += event.target.value + ' | ';
  }
}
```

$event 객체의 속성은 DOM 이벤트 type에 따라 다릅니다. 예를 들어 마우스 이벤트가 발생하면 input box를 수정했을 때와는 다른 event 정보가 포함됩니다.

모든 표준 DOM 이벤트 객체 에는 대상 속성, 즉 이벤트를 발생시킨 요소에 대한 참조가 있습니다.
이 경우 target은 `<input>` 요소를 가르키고, event.target.value 는 해당 요소의 현재 내용을 return 합니다.

각 호출 후에 onKey() 메서드는 input 값의 내용을 component의 values 속성에 있는 목록에 추가하고, 그 뒤에 구분 문자 (|)를 추가합니다.
input box의 변경 내용을 보간법으로 values 속성의 누적된 변경사항을 표시합니다.

사용자가 문자 "abc" 를 입력 한 다음 백 스페이스를 하나씩 제거 한다고 가정합시다. 다음은 UI에 표시되는 내용입니다.

![](https://lh3.googleusercontent.com/-30ZP-XTvsGU/WEk_w3xfqAI/AAAAAAAAPtY/F1y-AtQN0Kw/I/keyup1-anim.gif)

> 또는 event.key 대신 event.target.value 를 사용하여 개별 키를 누적 할 수도 있습니다. 이 경우 동일한 사용자 입력이 생성됩니다.
> a | b | c | backspace | backspace | backspace |

### Type the $event

위의 예제는 $event의 타입을 any(모든유형) 으로 지정했습니다. 이는 단순한 코드를 만들어 주지만, 기타비용(성능문제등)이 들어갑니다.
(이벤트 객체의 속성을 표시하고, 어리석은 실수를 방지 할 수 있는 type 정보는 없습니다.)

다음 예제는 메서드와 type을 사용해서 다시 작성 되었습니다.

**[app/keyup.components.ts (class v.1 - typed )]**

```typescript
export class KeyUpComponent_v1 {
  values = '';


  onKey(event: KeyboardEvent) { // with type info
    this.values += (<HTMLInputElement>event.target).value + ' | ';
  }
}
```

`$event` 는 이제 KeyboardEvent로 특별해 졌습니다. 모든 요소가 value 속성을 가지고 있는 것은 아니므로 target을 input 요소로 바꾸었습니다.
OnKey 메서드는 템플릿 에서 예상되는 내용과 이벤트를 해석하는 방법을 보다 명확하게 표현하게 되었습니다.

### $event 전달은 모호한 관행 입니다.

전체 DOM 이벤트를 메소드에 전달하는 것은 중요한 의미가 있습니다. component는 템플릿 세부 정보를 너무 많이 받아 들입니다.
HTML 렌더링 구현을 할때, 필요 이상의 정보를 추출할 필요는 없습니다.
이것은 템플릿(사용자가 보는 것)과 component(프로그램이 사용자 데이터를 처리하는 방법) 간의 간극을 발생 시키고, 성능저하의 원인이 됩니다.

다음 섹션 에서는 템플릿 참조 변수를 사용하여 이 문제를 해결하는 방법을 보여줍니다.

## 템플릿 참조 변수 에서 사용자 입력 받기

사용자 데이터를 가져 오는 또 다른 방법은 Angular 템플릿 참조 변수를 사용 하는 것입니다.
이러한 변수는 템플릿 내에서 요소에 직접 접근 할 수 있게 해줍니다.
템플릿 참조 변수를 선언 하려면 식별자 앞에 해시(또는 파운드) 문자(#)를 붙이십시오.

다음 예제는 템플릿 참조 변수를 사용하여 간단한 템플릿에 키 입력 루프백을 구현 합니다.

**[app/loop-back.component.ts]**

```typescript
@Component({
  selector: 'loop-back',
  template: `
    <input #box (keyup)="0">
    <p>{{box.value}}</p>
  `
})
export class LoopbackComponent { }
```

`<input>` 요소 에서 선언된 box 라는 템플릿 참조 변수는 `<input>` 요소 자체를 참조 합니다.
이 코드는 box 변수를 사용하여 input 요소의 값을 가져 와서 `<p>` 태그 사이에 보간을 사용하여 표시 합니다.

템플릿에 완전히 포함되었습니다. 이로인해 component에 바인딩 되지 않았고, component는 아무 것도 하지 않습니다.

input box에 무언가를 입력하고, 각 키 입력으로 디스플레이를 업데이트 해보십시오.

![](https://lh3.googleusercontent.com/-c-S4E_6xflo/WEk_xAOCw7I/AAAAAAAAPtc/tbyrDbHDzC0/I/keyup-loop-back-anim.gif)

> 이벤트에 바인딩 하지 않는 한 전혀 작동하지 않습니다.
>
> Angular는 앱이 키 입력과 같은 비동기 이벤트에 응답하여 무언가를 수행하는 경우 에만 바인딩(따라서 화면)을 업데이트합니다. 이 예제 코드는 keyup 이벤트를 가능한 가장 짧은 템플릿 문인 숫자 0에 바인딩 합니다. 이 명령문은 아무런 효과가 없지만 Angular가 화면을 업데이트 하도록 Angular 의 요구 사항을 충족 시킵니다.

템플릿 참조 변수를 사용하여 input box에 $event 객체를 전달하는 것보다 쉽게 같은 결과를 얻을 수 있습니다.
다음은 템플릿 참조 변수를 사용하여 사용자의 입력을 받는 keyup 예제를 다시 작성한 것입니다.

**[app/keyup.components.ts (v2)]**

```typescript
@Component({
  selector: 'key-up2',
  template: `
    <input #box (keyup)="onKey(box.value)">
    <p>{{values}}</p>
  `
})
export class KeyUpComponent_v2 {
  values = '';
  onKey(value: string) {
    this.values += value + ' | ';
  }
}
```

이 접근법의 좋은 점은 component가 view에서 깨끗한 데이터 값을 얻는다는 점입니다.
더 이상 $event 및 구조에 대한 지식이 필요하지 않습니다.

## Key event filtering (with key.enter)

(keyup) 이벤트 핸들러는 모든 키 입력을 듣습니다.
사용자가 입력을 완료 했음을 알아야 하는 경우, Enter 키가 중요할 수 있습니다.
불필요한 코드를 줄이는 한 가지 방법은 모든 $event.keyCode 를 검사하고 키가 Enter 일 때만 조치를 취하는 것입니다.

더 쉬운 방법이 있습니다 : Angular의 `keyup.enter` 가상 이벤트에 바인딩하십시오.
그러면 Angular는 사용자가 Enter 키를 누를 때만 이벤트 핸들러를 호출합니다.

**[app/keyup.components.ts (v3)]**

```typescript
@Component({
  selector: 'key-up3',
  template: `
    <input #box (keyup.enter)="onEnter(box.value)">
    <p>{{value}}</p>
  `
})
export class KeyUpComponent_v3 {
  value = '';
  onEnter(value: string) { this.value = value; }
}
```

![](https://lh3.googleusercontent.com/-DX9oCej57BI/WEk_xGeR-XI/AAAAAAAAPtg/i4ujpl_jFoU/I/keyup3-anim.gif)

## On blur

앞의 예제에서, 사용자가 input box에 마우스를 클릭해서 진입한 후에, Enter 키를 누르지 않고 페이지의 다른 곳을 클릭하면,
input box의 현재 상태가 감지되지 않습니다. component의 value 속성은 사용자가 Enter 키를 누를 때만 업데이트됩니다.

이 문제를 해결하려면 Enter 키와 blur 이벤트를 모두 바이딩 하십시오.

**[app/keyup.components.ts (v4)]**

```typescript
@Component({
  selector: 'key-up4',
  template: `
    <input #box
      (keyup.enter)="update(box.value)"
      (blur)="update(box.value)">

    <p>{{value}}</p>
  `
})
export class KeyUpComponent_v4 {
  value = '';
  update(value: string) { this.value = value; }
}
```

## 모두 한곳에 모아라

이전 페이지 에서는 데이터를 표시하는 방법을 보여 주었습니다. 이 페이지 에서는 이벤트 바인딩 기술을 설명하겠습니다.

자, 영웅의 목록을 표시하고, 목록에 새로운 영웅을 추가 할 수 있는 기능을 소형 프로그램에 모두 넣어 보죠.
사용자는 input box에 영웅의 이름을 입력하고, Add를 클릭하여 영웅을 추가 할 수 있습니다.

아래는 "영웅의 작은 투어" component 입니다.

**[app/little-tour.component.ts]**

```typescript
@Component({
  selector: 'little-tour',
  template: `
    <input #newHero
      (keyup.enter)="addHero(newHero.value)"
      (blur)="addHero(newHero.value); newHero.value='' ">

    <button (click)=addHero(newHero.value)>Add</button>

    <ul><li *ngFor="let hero of heroes">{{hero}}</li></ul>
  `
})
export class LittleTourComponent {
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  addHero(newHero: string) {
    if (newHero) {
      this.heroes.push(newHero);
    }
  }
}
```

### Observations

- 템플릿 변수를 사용하여 요소 참조 - newHero 템플릿 변수는 `<input>` 요소를 참조합니다. `<input>` 요소의 형제 또는 자식에서도 newHero를 참조 할 수 있습니다.

- 요소가 아닌 값 전달 - newHero를 component의 addHero 메서드에 전달하는 대신 input box 값을 가져 와서 addHero 에 전달 합니다.

- 템플릿 문을 간단하게 유지 - (blur) 이벤트는 두 개의 JavaScript 문에 바인딩됩니다. 첫 번째 명령문은 addHero를 호출합니다. 두 번째 명령문 인 newHero.value = ''는 새 영웅이 목록에 추가 된 후 input box를 지웁니다.

## Source code

다음은 이 페이지에서 논의된 모든 코드 입니다.

**[click-me.component.ts]**

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'click-me',
  template: `
    <button (click)="onClickMe()">Click me!</button>
    {{clickMessage}}`
})
export class ClickMeComponent {
  clickMessage = '';
  onClickMe() {
    this.clickMessage = 'You are my hero!';
  }
}
```

**[keyup.components.ts]**

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'key-up1',
  template: `
    <input (keyup)="onKey($event)">
    <p>{{values}}</p>
  `
})
export class KeyUpComponent_v1 {
  values = '';
  /*
  onKey(event:any) { // without type info
    this.values += event.target.value + ' | ';
  }
  */
  onKey(event: KeyboardEvent) { // with type info
    this.values += (<HTMLInputElement>event.target).value + ' | ';
  }
}
//////////////////////////////////////////
@Component({
  selector: 'key-up2',
  template: `
    <input #box (keyup)="onKey(box.value)">
    <p>{{values}}</p>
  `
})
export class KeyUpComponent_v2 {
  values = '';
  onKey(value: string) {
    this.values += value + ' | ';
  }
}
//////////////////////////////////////////
@Component({
  selector: 'key-up3',
  template: `
    <input #box (keyup.enter)="onEnter(box.value)">
    <p>{{value}}</p>
  `
})
export class KeyUpComponent_v3 {
  value = '';
  onEnter(value: string) { this.value = value; }
}
//////////////////////////////////////////
@Component({
  selector: 'key-up4',
  template: `
    <input #box
      (keyup.enter)="update(box.value)"
      (blur)="update(box.value)">
    <p>{{value}}</p>
  `
})
export class KeyUpComponent_v4 {
  value = '';
  update(value: string) { this.value = value; }
}
```

**[loop-back.component.ts]**

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'loop-back',
  template: `
    <input #box (keyup)="0">
    <p>{{box.value}}</p>
  `
})
export class LoopbackComponent { }
```

**[little-tour.component.ts]**

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'little-tour',
  template: `
    <input #newHero
      (keyup.enter)="addHero(newHero.value)"
      (blur)="addHero(newHero.value); newHero.value='' ">
    <button (click)=addHero(newHero.value)>Add</button>
    <ul><li *ngFor="let hero of heroes">{{hero}}</li></ul>
  `
})
export class LittleTourComponent {
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  addHero(newHero: string) {
    if (newHero) {
      this.heroes.push(newHero);
    }
  }
}
```

## 개요

사용자 입력 및 제스처에 응답하기 위한 기본 프리미티브를 마스터 했습니다.

이러한 기술은 소규모 데모 에는 유용하지만 많은 양의 사용자 입력을 처리 할 때는 빠르지만 장황스러워 집니다.

양방향 데이터 바인딩은 데이터 입력 필드와 모델 속성간에 값을 이동 시키는 것보다 우아하고 간결한 방법 입니다.
다음 페이지 Forms 에서는 NgModel을 사용하여 양방향 바인딩을 작성하는 방법을 설명합니다.



