![](https://lh3.googleusercontent.com/MWlX7ajBtTE4WC9M7nwRW_ZuSD_YrwCDC6gRPrcq3XxCZdyrttWEDGuvZQ2L2kr62gkc5o-zBfOsXX4PmmUX98y3HtP3kWojAijAgRQgFL8ycfQNJrIoOox39_8IYFtjIGTGHS6pV15H9rq4e78_iTGLWmYWNBAa_lUq7vB3mTfF3GiUzpc2nhPh2Ps3Z-EatSgIjAgy1ESS6vUdZxmh0sRfOdUsVTHeDCB5cInRddpyE0Ae_bWPVvTL1YsPwXxCbtZZJL1K5UxRphb1sp-XIoWC6UPZyQ1GTA6-_j7h-rAelRPuvS0daiKhJ2spJNPbIiEvugaL_DUDazkRRRjwNDPlyYG3BKPk5rgkOfIMGfmVdkBGyP-KnhUrrceZ4dxb6wNCSri6TYEVXWIX_jRRPzUH2KsLLEyXsRqAMHJFgx9Rs7c-1eilvyE64b_bTj5OCE5FzNOC-A84MmXqKUU0INTbObfUhhVlCKgNGtw5RHCCsJ6xjnsgz7coORwGEKxx4bJjhtvVs3RfoM17rZZZdCXzqJL7QL59Mn_4FpIEbTt25DrZMNZ6BjHduMtUZgbtrHoQZDWty8SYSW-Sl8PJ5XCg-mhfd5ko7j75TpZb8cLE21kMcYKbcmHN80Fbi6bpHPCMGyXb3evAjH9UI6mJu12zqm7krdYc=w543-h325-no)

# (TIP) jqueryUI 의 resizable 적용된 DOM 이 iframe 을 만나면 이벤트가 작동 안하는 현상

@refer: 
- https://stackoverflow.com/questions/13473396/jquery-ui-resizable-resize-a-div-placed-over-an-iframe
- https://webdir.tistory.com/506
- https://developer.mozilla.org/ko/docs/Web/CSS/pointer-events

jqueryUI 의 resizable 함수 사용시 `iframe` 위에서 이벤트를 잃어버리는 현상이 있다. 
iframe 외에 영역에서 iframe으로 진입 시 다른 frame 이라서 이벤트를 다르게 취급하는듯 하다.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jQuery UI Resizable - Default functionality</title>
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
<body>
 
<div id="resizable" class="ui-widget-content">
  <h3 class="ui-widget-header">Resizable</h3>
</div>
 
<iframe class="iframe" src="https://fr.wikipedia.org/wiki/Main_Page"></iframe>

<script>
    $( function() {
        $( "#resizable" ).resizable();
    } );
</script>

<style>
    #resizable { width: 150px; height: 150px; padding: 0.5em; z-index:100; }
    #resizable h3 { text-align: center; margin: 0; }

    .iframe { position: absolute; left:200px; top:200px; width:500px; height:500px; }
</style>
      
</body>
</html>
```

![](https://lh3.googleusercontent.com/9dVu-gmTelg-nYTvwJnDhs5VLzT7TLehOxR-fZJY0szDUEFnH2j5o0TfEcSHvus-cbyPplwY-AqvZkzgdbkeuC7sbXs-UjhQrOayY97Mnx5A45Lk5WA5ufT7byTFllEs8TH43Co3g1NfR5PsfGrcLOCh4dTsq6mXbjYlylhiF8NVmXa8wWjF1OVYK02m-8MhTFDNpmE9XCoAcJj20vyipeZL7l-bomXIOvDqDCTEf096M2DB9IxUckxMBJGSButzatZO98lEUF5jikNQXc8A2-FSdcjHLK8uXBD6BqOjUvKI2O_218EaLJWn7_0kazmWRFJ8moKaziDXmYOIB61GT58_vVlzriWK0QqzhuVNFtYlGEUa9vF0Ca_-eC9OpPVNsye2hN_XdXi5p9y8DpnOLVhn-QKUskof-QSRQWCxZJDb5OHC0YtkgM2iPu-mq62PeJ0hqbxx6hf-04XXajXSpH6vOi6I6Ry4SPDikHqIdtrGDnkLat0p9nCQuyPaIhVLrN0V1NuQppvj9kVNeaxZYEUbB4Jpyn5AYnTKIcoXka4JOE2nUZEaWaUf3LasA8C4pAchYXkyzrkI1HRerUR9ZVQb5i5UHyTxRnIsXSYMBt7dSJCFuGunoHDIXdkBoF9XnzrDEfQ1zz-bIQWxTw__KGnfQCKyegS4=w1482-h720-no)

위의 그림과 같이 iframe 페이지 내에 이벤트가 있는 경우(마우스오버 같은) 바닥에 있는 DOM에 `resize` 이벤트가 제대로 동작하지 않는다.

예상으로는 `iframe` 과 이벤트를 다르게 취급하기 때문에, 포커스가 넘어가는거 아닐까 하는 생각이다.

이것을 해결하는 방법이 2가지가 있는데, `Stack Overflow` 에 해법으로 첫번째로는 `iframe` 위에 가상의 레이어를 올려서, 이벤트를 막아내는 방법을 제안하고 있고, 두번째로는 `pointer-events` 스타일을 이용하는 방법을 얘기하고 있다.

## iframe 위에 레이어로 이벤트를 방어하기

resizable의 옵션으로 제공되는 `start, stop` 을 이용해서 `iframe` 위에 하나의 레이어를 얹힌다.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jQuery UI Resizable - Default functionality</title>
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
<body>
 
<div id="resizable" class="ui-widget-content">
  <h3 class="ui-widget-header">Resizable</h3>
</div>
 
<iframe class="iframe" src="https://fr.wikipedia.org/wiki/Main_Page"></iframe>

<script>
    $( function() {
        $( "#resizable" ).resizable({

            start: function(event, ui) {
                $('<div class="ui-resizable-iframeFix" style="background: #fff;"></div>')
                    .css({
                        width:'100%', height: '100%',
                        position: "absolute", opacity: "0.001", zIndex: 10
                })
                    .appendTo("body");
            },
            stop: function(event, ui) {
                $('.ui-resizable-iframeFix').remove()
            }

        });
    } );
</script>

<style>
    #resizable { width: 150px; height: 150px; padding: 0.5em; z-index:100; }
    #resizable h3 { text-align: center; margin: 0; }

    .iframe { position: absolute; left:200px; top:200px; width:500px; height:500px; }
</style>
      
</body>
</html>
```

`resize` 가 가끔 멈추기는 하는거 같은데, 잘 작동한다.

## pointer-events 스타일 이용해서 이벤트 전파 막기

![](https://lh3.googleusercontent.com/mwd2ZCI8uPLUq2XofO8RDPC6a2o3uSr2R02xzZP4mGq6pBHr0wJ8jsFf8fIkPSTsI1vkaXf9rUUaSPRgN5CRfBhNzx0A4wgGeWeBukKHwHEjL_BmOYcHpU4Q4sZUzEkuaJNMvwnX89rh8xBR85MPptqY28gWsRjASgUq22F6TcZvoZnNhToN_XAM4Okv3y2unYNzfBufb5NkderD62Gy7E_M7N-OiIW52yHF1WH9d9YlNjaqjcitTZBvixoRnFw67zgYD9Bx6qxN1Sfn4Gj-fPVcV3FOdFZgx2i65QVgnYRSTOQXQd9euObkwVb6EjZ4huntRizRLOIb06K4e-jXzftUps2P16X-BLgaIAxDtGyQYY0hsjBSXZvtmazUKXGutgjvQkAPBjqsSxN_eqhK-iOc1_-B3Iz47Q1f_KjxT4-zKBO1ncMeYpO2AbvO2ojoaIA3MY7R9ei47Pwf95MWx9tZ9leY2Gv4Ki8XekONwSLO4bS0wl0d9Q2GJ4LwA5NlN91ElCDt1-f4khXD3P6rxzj0scO-RHrXx4zvQ9sSk8-uKOK693emNhErNUBjV7RVs1gf6y836MM1E2oMfBIEYzEeAbNLBydTxmxNTJUjrkbcfKCQ4eRzwAKv-RbHguPxSupRE0d01L20CCt0_vsjPYQ_cAOqNtH1=w604-h235-no)

https://caniuse.com/#search=pointer-events

최신브라우저 모두 지원한다. 개인적으로는 `css`를 이용해서 기능의 제한을 둘수 있다는것이 뭔가 마음에 들지는 않다.

이 속성은 상속이 되고, 지정된 `DOM`을 포함해서 자식까지의 모든 이벤트가 작동하지 않게 된다.

기본값은 `auto` 이고, `none` 속성하면, 모든 이벤트가 막힌다. 심지어 `a` 태그 링크도 막힌다.
(https://developer.mozilla.org/ko/docs/Web/CSS/pointer-events)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jQuery UI Resizable - Default functionality</title>
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
<body>
 
<div id="resizable" class="ui-widget-content">
  <h3 class="ui-widget-header">Resizable</h3>
</div>
 
<iframe class="iframe" src="https://fr.wikipedia.org/wiki/Main_Page"></iframe>

<script>
    $( function() {
        $( "#resizable" ).resizable({

            start: function(event, ui) {
                $('iframe').css('pointer-events','none');
            },
            stop: function(event, ui) {
                $('iframe').css('pointer-events','auto');
            }

        });
    } );
</script>

<style>
    #resizable { width: 150px; height: 150px; padding: 0.5em; z-index:100; }
    #resizable h3 { text-align: center; margin: 0; }

    .iframe { position: absolute; left:200px; top:200px; width:500px; height:500px; }
</style>
      
</body>
</html>
```

아주 `iframe` 안에 모든 이벤트가 작동하지 않는다. 

유용하지만, 왜.. `css 가 이런것을 담당하고 있지?` 하는 의문이 남는다.


