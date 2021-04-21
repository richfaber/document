# CSS Grid 사용하기

![](https://usefulpa.s3.amazonaws.com/images/2017/grid-layouts-examples-2.png)

@참조 : 
- http://www.usefulparadigm.com/2017/03/31/a-few-ways-to-make-a-grid-layout/
- https://hackernoon.com/the-ultimate-css-battle-grid-vs-flexbox-d40da0449faf
- https://www.w3schools.com/cssref/pr_grid.asp
- https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout
- https://blog.sonim1.com/198

`grid` 는 css 로 레이아웃을 구현을 도와준다. 이전에 `table` 태그로 레이아웃을 설계했을 때처럼, 중앙정렬 이라던지, 격자형태의 레이아웃 구현을 가능하게 한다.

현재의 레이아웃 구현방식은 `block element` 에 높이나 너비를 조정하고, `float` 나 `position` 을 통해서 해당요소를 배치하는 형태이다.

`grid` 는 `flex` 와 성격이 비슷한 부분이 있기 때문에, 비교대상이 된다.

## 호환성

대부분의 새로운 스펙들은 모바일에서는 빠르게 받아들이기 때문에, 데스크탑 OS를 살펴보면 최소지원 범위를 알기 쉽다.

[![](https://lh3.googleusercontent.com/DL-TnPY8WZ3XqVAE7hzauXDEM9mtFC6O50bmo3HZtzEWXq5CfhuhRgzTmzOyuDZFiNWHcModjUtDl6KLeCS0YVFIe6Jd0B7-NDv8tUhcY4d39IqaPc1XC4HC5QDqAMhWy0UpTv10LPxeL89jes2qu37Hu7Joa8RXxgoHEMpAXm6Vdz-EpSNwVUBrR6Ft75wafZndXZ1rvoLrDIZATtnm3tvPfdVlYBZ6NprhSkLRnWXfTQePUHOqeGQxa5Eei7kDclkgH9XotQCoGiH_WNQe6lDDB8r94ghNKY9NkMBKXKr3FqbiA6oVLI_V0F1aLLWVVv_RsT8vlJGKNsbPqBWhoYv6g7p667xd353jYVLsCAje9q9ygEXhbuxqZnOGWV2JHYkXzemIWFnMjxszKaCHmpdb3a5Wkn0p4S5xVy8JIlvSaor9dcao3J8xcKpPhpYYx7pDxGnF7d9FeuY9pm-wgHfIkSBo2bDwIj6Ykw1Azx0Mo-HHh4BzadN9AmW_1mCfpUxJ1jh2C87GatcyQUBwkLsCMzZSuWs3U81UyD9IqPcdQtVwMFRdHO_yp-057GkhCy8ojm9UT7U6NH_tYA6jNHVp5UVi54LDaRh88P_g4z0szHshFlJPDdfVbCFtOEnGDxVyVaQRiXCy328c0M5RIQ9dzLToPEb_=w1974-h1164-no)](https://caniuse.com/#search=grid)

매번 문제가 되는 IE10 도 지원을 하고 있다.(-ms- 프리픽스를 붙여야 동작함.)
보니 안드로이드도 4버전(아이스크림 샌드위치), 오페라, 블랙베리, 바이두, QQ 등의 브라우저는 지원이 안되는 것으로 확인이 된다.

개발의 사양으로 해당브라우저가 포함되어 있다면, 고려해 보아야 한다.

## `grid` 와 `flex`

`flex`와 `grid`가 박스모델을 배치한다는 성격의 유사함 때문일까? 표준문서에서도 이를 서두부터 비교하고 있다. (https://www.w3.org/TR/css-grid/#intro)

![](https://www.w3.org/TR/css-grid/images/grid-layout.png)

`flex` 가 `가로축 혹은 세로축 기준의 1차원배열식` 으로 나열 한다면, `grid` 는 `가로,세로축을 가지는 2차원배열식` 으로 나열하는 방식이다.

즉 한방향으로 배치하는 것(가로축 혹은 세로축)에는 `flex` 가 맞다.

![](https://cdn-images-1.medium.com/max/1600/1*h6dcLWRp0lXeWklPAFK8cA.png)

가로세로축을 생각해야 하는 배치에는 `grid` 가 더 어울린다.

![](https://cdn-images-1.medium.com/max/2000/1*AxItLokVtaF56WMo_ZF6Pw.png)

`flex와 grid는 분명한 용도의 차이` 가 있고, 성격적으로 보자면, 구글의 이미지검색 서비스처럼, 적층식으로 나열하는 방식에는 `flex` 가 어울리고, `2차원 형태의 레이아웃 구현` 을 위해서는 `grid` 가 좋아 보인다.

예제로 비교해 보자

```html
<!doctype html>
<html>
<head></head>
<body>
<header> 
    <div>홈</div> 
    <div>검색</div> 
    <div>로그 아웃</div> 
</header>
<style>
* { margin:0; padding:0; }
header { background: gold; }
div { color:hotpink; padding:10px; }
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/uem1kJHBx2WME4R_Lii1faPNtPs43z1IhbfEVjCayceT-SjAZFNc14KTCyqt9nz-XZ9agSSUM4rNMUUuUVb7SR5gotZUS7DqdFF8wtQzs-j4IuonvOmRWlZEU5bfRGPGdh3GyTbqLPJsOMc28fxSTosOOH6AjyJg-XVrYKDHIOH5sxaeaQYWGYAs6qxzU-jOgh_s5kswFm0FP858rNdx1PEAPEaaoTuuYw0KNsYFa12vYp6msCFyGXfBARBNJhd18Z0lHOx2w9969KjUpnJ44AubkzXuLsMeKpbhLGuXfOe59FhYYsB6rmfY185eCiD-zCESqO2_lt5j6MBqqaQINVEj_qJIdMmb9JLri9zbq-HaILmWoIBJlaHV6QtVKwbuJ8rM0hJMnc4GD66UOt1HYXlKNds9Q-2exPEn2VhABimWG9qLuakr31DfAZ0c1k6NKBxJfHEsORSPkpvnGWRCWQLNZAgJxhMYYxPStBMnt3ihsZBz7IAyr2GUCSCXH2ofMQMjQE6UlaeGZjoEH7XVSxcWp-CQ0a6C0vW3zjlBmbvuXxa6NYFgM3y7nFZakxnxzA5G0Ep_Z9VO0A_KqbABFn2lKJVZW3XME7L-Qq0pC3LCN-pTIH6yMiS7Y6CSD7oG9Vahw6I8uA4iZfySLRjLYKJxwOneWphx=w1438-h1244-no)

여기에 `flex` 를 적용하자

```html
<!doctype html>
<html>
<head></head>
<body>
<header> 
    <div>홈</div> 
    <div>검색</div> 
    <div>로그 아웃</div> 
</header>
<style>
* { margin:0; padding:0; }
header { display:flex; background: gold; }
div { color:hotpink; padding:10px; }
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/nG0P925dveiNFUtR5QVFcxCbEyB-wlS2_cE9nBMeWxa2-1O8UvktMnDtrh3dcYVxnJ-nDViuuEUjDUGCvqEnwPAqF9x9L-ScNOIIFPdCFK-TBdWGTMmwYxbS0K61GMXZfWNtm2pFI9HFEPjoENwyHZHc0IDPZMGhHr3neT-6vG-5ZcamKMrBVQU0PMg0dCxizY8jWHD9Szw6fMeuVY7KLfYgTJbsgR4xjb2fj4PQpz3PPfTocIdtQ6HjhkJuSDsDMkteOgj3Y_VMHVHBVEAoJ3uZAoQOMy38B380w8uT-5DoswLggzpDHJ90bF0zoh0CEJxllCuFTEaQWO_x_0lSMJ4KumUVxdj606ScCJkjT6vuJz0QNFLAbDoNgsAbV2h6MrMieQfy4EbOD5pe4206_ZtD6vTj7yyS9kiI43t2A6XfCUfjC8NOqslUbzG-Hl118tjReGnux2oPBcKFFTThFRbaEn188Nvh80eZEq_OTRnJoD748Ve82YPJfi60BZzss_q8ucVD1kTUFSELFU6MuiDWGvBqaG3gDqNfizsQtmZQg5V33oIiGAZMl5bchCiv6Ck9ZVOzypgOzGqKg0Uh72sjIM2zhRLrfYcyMsAtr0sVI9YWidsI8vAiHnwChOGJViTCCCjR-2_k2ZzwQiC_8nQO6xh_9-VW=w1526-h1332-no)

여기서 `로그아웃` 버튼을 우측에 배치한다면 아래와 같은 코드가 될 것이다.

```html
<!doctype html>
<html>
<head></head>
<body>
<header> 
    <div>홈</div> 
    <div>검색</div> 
    <div>로그 아웃</div> 
</header>
<style>
* { margin:0; padding:0; }
header { display:flex; background: gold; }
div { color:hotpink; padding:10px; }
div:nth-child(3) { margin-left: auto; }
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/5o6GnaYkMfIyTWEj6dvQdw-rDsbkrH7L6aKrpbpvzE9eeRdCd2ifY_YwO755Csf7qXbJVtKK64Y6fCifWcU7NJ3mdWQaceBaSEc3Hl5OT4RLAqcalFIJpZlJvtfGuz-m8zLmKEqzKjx3d0NvpfsuvrUDye4jtKB2f1eSIMcGjO0U5cjjMmlLhdchTXvaSu-c8gtgIe5mhlwUfyzsSBSyRxHA-_7eT2xB6HMHOI3l5x626nKrB0QUrcQZf3hekYChaPeG5NSIH8hCsMvJ3K6sNO3WbuCeQj3nb7VvydM6YttUkkaSaR-N8idUbrlkzYJ71UNUvAjSrvjjP2eNt3P58yKWfI__NeYdDHfnKnxcIXjLaqrrTcCLEn7-Kr4yjDyaIrofZa4EQq-zw546t8uby_-bcVnSVf21PRehIt--bGgiL25UHpJ32gXhT3UA1c0lImmWD5zAB4cQLKruSbLGGqjrhiyN1Voo2TltPYBenb-E5w44gOENqbzDrUgpDC1KxIINZAG33SlzXIo3E8BXq2D1CekBcaNgy86_BKEpLJO1N73lPFgyX2maRdSzOHNRiQ2VHEfqFDifs2640gCBaaDUV84jLHrCorWsIby0x3FICf32ykrFVfvAkSfMh2UI2FXqoZhSbPkc6ZtRkATm6JFqlrM0p0sS=w1526-h1332-no)

가로형 배치에 대해서 예제를 보았다. 이것을 `grid` 로 변경하면 다음과 같이 된다.

```html
<!doctype html>
<html>
<head></head>
<body>
<header> 
    <div>홈</div> 
    <div>검색</div> 
    <div>로그 아웃</div> 
</header>
<style>
* { margin:0; padding:0; }
header { 
    display:grid; grid-template-columns : repeat(10, 1fr); 
    background: gold; 
}
div { color:hotpink; padding:10px; }
div:nth-child(3) { grid-column: 10; }
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/TKrW0v2AFqjoZXy7an_WF62jHoH4eYdRlBTC3BxZVjRQX5zrW_uSDK5IKSstiKTaGGypc7xvTTGe3S_dfFv9TJVWlXtlXRRaw9_dXKd-iWBTpT75mTLQdAKc05sQQkk34ZujfgBBR88SJw7IktKTb-V4xM03OJzNL3ECI5OEQJhFA7yA794D_bM43KODxcv87etPrwQ032VFHaJ3VDgo8ALgjWKZPwm65jq76CRb4N8b-QgdMj6Owj8ZgXu8bL-TPRQ50qxbkz140LxFn4-tRRM9d4tgh3gowCgvJbnaPpNIPq_4AZLcjV--y5OSvwtK1myfO7Q9DtbQNA3Zf1O-PTsYN2IL06nbLQHo9opvPPipt7yHn9J_jtik_pKdF0nxv3Fo6uTkTnnUJtUkW54qIl9XMkd5ncDCvD5iOsR_bs2VKPhBFxbFgIXyoytulQFJ_eu6AtuM2D2YdYYQHILRidQVvlYBHfWQ7ZnQglFX37HqFynXREEFultcyhkVy8Ta4Yu21pnpW5jdOTIzt5xiBykJ049986bcCWa6E4WSsj6DZyn4OAS_T_pb0p-o7aDsx2C0cZtYyojG8H9XWtles1FZC22ebD1c3w_E1kc50HHPTj7qkJh7cmS_WQdcylYFgfMMcOlG8ch3TPVsddGc39MqZUD0Gn4g=w1566-h1468-no)

`grid` 는 사용할 때, `column` 을 어떻게 나눌지를 `grid-template-columns` 를 사용해서 지정한다. `flex` 는 해당 컬럼을 어떻게 나눌지 지정을 안해도 자동으로 배치되는 것과 다르다.

만약 `grid-template-columns` 를 지정하지 않으면, `column`에 대한 지정이 없으므로, 종렬로 자동 등분된다.

```html
<!doctype html>
<html>
<head></head>
<body>
<header> 
    <div>홈</div> 
    <div>검색</div> 
    <div>로그 아웃</div> 
</header>
<style>
* { margin:0; padding:0; }
header { 
    display:grid; 
    background: gold; 
}
div { color:hotpink; padding:10px; }
div:nth-child(3) {  }
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/NNIovZg-zSUhr2ubOr_pXYSum7879ZE3sdkuy30l-D1D__XSuRcdoBA8Ev1karPiScq2typ37jA6Zcut1oIfXNdJVjZH7kbdduaXIs_nMss94W7xXt4UfglUdpBqNVd-di1y76cfxlq3FBY5krtB5G3Agxl5aEC1gp5XQ_w4G4WQ2yTU7d9dBB4EuVqadbmOYnEHRtwFXp3jU8T-_tGCJU0rVjmfk25AkHR0CNt5LCpXrQiClmZaYPiFnwJyDYWm7MUIh2UJ0B6PV9hvQoTlnGPwRDfJ_WGcraDkw-BPHlk3iT_pnsOyGk2B2ErZq6ZVWLcMWKWe-SLpZSBEkTDp3mrCgKXZEMriACUN46FF_NP0FqLJV3xWZzHjWe906i1ueEHXvptvgdnQ_rHVcOwNS9dN7_DRpGkNQXuz4BlMopGFswSyIIl_wqoRItKTNRUosfyhYWUeqIXiw6B9uuetC0DpNcqVUUA6l0ChjPG1d646Ye8MXKgGlrqdqIp4Ck5ZHRyB58EqJhrk-gWMaO2zLSnUDfm0vBOkngelZcoEmjl4b5je42fa_mG1etOanSWyC3_yS8tUs9gu0CykrQn4uA1TZBh1Q2rQgOq8iurA4eutNG1i7QuSnyyoTd5KFnNR2WF48UsNsP5HpS5T-tMA5kunYOeu0v3_=w1566-h1468-no)

본격적으로 `grid` 의 속성들을 들여다보자.

## grid 컨테이너가 가지는 속성

`display: grid` 를 설정하면 `grid` 속성을 사용할 수가 있다.

이 속성은 6가지 다른 속성에 대한 축약형이고, 기본값은 `none` 이다.

- grid-template-rows : 세로축 지정하기
- grid-template-columns : 가로축 지정하기
- grid-template-areas : 미리지정된 그리드영역의 이름을 이용해서 배치
- grid-auto-rows : 배치되는 아이템의 높이 지정
- grid-auto-columns : 배치되는 아이템의 너비 지정
- grid-auto-flow : 배치의 흐름을 지정한다.

`grid: none|grid-template-rows / grid-template-columns|grid-template-areas|grid-template-rows / [grid-auto-flow] grid-auto-columns|[grid-auto-flow] grid-auto-rows / grid-template-columns|initial|inherit;`

### grid-template, grid-template-rows, grid-template-columns

그리드 아이템들의 `너비,높이` 를 어떻게 가져갈 것인가에 있다.

```html
<!doctype html>
<html>
<head></head>
<body>
<div class="grid"> 
    <div class="grid-item">1</div> 
    <div class="grid-item">2</div> 
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>
    <div class="grid-item">1000000</div> 
</div>
<style>
* { margin:0; padding:0; }
.grid { 
    display:grid; 
    grid-template-columns : 20px 20px 100px 20px 30px; 
    background: gold; 
}
.grid-item { 
    color:hotpink; 
    padding:10px; 
}
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/MDclbrc783ohuwHci8TFgGULo127fDJzug-oo66lRk8EQC5R3adSV_uYIdBLnWWvI2VnZrmhE-WBQ-NT0v2cCfpufu1GUxADUNJJFIQcDa9Kx6LyhEbu2KwJKDh-u8IyIZz5Nj5oeOwU2zGU-8K05YH85e7--9F_tj20MScue0uVxMOEwe3gdSa466qj4550f2KJspNnX04bayGUo_AUCXWuCWru82r4dJzgy4W1IF3oFmIZQU3SRJqkcYc9ur2JWCVtfzoIheRsPg18OoXx_uTtK3h3tnYxjW5D9Zt3hkXod-NE7aNdbEqrw2NoTtPWUeYQr2ATLFZxlmkk0vZP2zRa7eU041au3YszoVfVhZlARptdOvkTw6xHxWqnuRcM_lND_P9iFLNUIGkIJdFJBdIkWdGzusPp3eKGuvJw_pmRJAhefpUiHNfjqJ4NyLPZKV4oUwrNAucsPFZ3nyhy093Sgu70ccRN6JYVRl1ewHCRH2diJS2c7wO5DryC8mTwTylzDL5rhyJ0JddaLSjUrKEsdOjGHcg0nilNP6vExJ4QgLZABN13vSt_y4UldutMKgDE7kIwgFkGXjkQDFWGu24JZaHGz3PMMY5Pu8F5G1KxWlvGCeTgCwci60OiMSzxMtNbSpGdRo-k8ocMcViyj9rxhbFMbRcb=w1566-h1468-no)

`grid-template-columns` 에 5가지를 대입하였기 때문에, `.grid-item` 의 배치들이 5컬럼으로 표현되었다.

`grid-template-rows` 를 대입해 보자.

```html
<!doctype html>
<html>
<head></head>
<body>
<div class="grid"> 
    <div class="grid-item">1</div> 
    <div class="grid-item">2</div> 
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>
    <div class="grid-item">1000000</div> 
</div>
<style>
* { margin:0; padding:0; }
.grid { 
    display:grid; 
    grid-template-columns : 20px 20px 100px 20px 30px; 
    grid-template-rows : 50px 50px 50px;
    background: gold; 
}
.grid-item { 
    color:hotpink; 
    padding:10px; 
}
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/P_LB1EfqrX2j8YJZVUgTVDcUPrrVzZkA_ExyEeg78D-qn2pH5aYyp7_sID4bHwXMvmVtLD-g3imA6X509Z-A0a5S3cQBQ8Rm7YlT82FtTI0O5Xzzbvelg00WW8CEjguNEsCWzm17LKY2ViSo4qY1-RTh_m5L6d7tuDDEvuJHqIulF17Q_l0NC8YBGkJmijsMu0UhLtUElBIa6hFGfV5PYAJ1EVjDFL4aZiQ6__JNigyi25DzRZwGCd9VutLAKCHbsIiWe1mLrjU8_9eOycqmlDw4yITJVQfHIq5Dkvntqk-CBAqdkNivp9lSnOaQR6NUkj_l1mQqLhzaaovmW2lwLvzcxJdUg6QiBe5BjnmY1KiEuREj9l7njTUpX_wTlXkodcyhIqhmC28dGg4eVMBnFRaFjMnP6btF0SwQM2e4jO5pKSszNLXafvWaWa9_Rgp5ADQvCTVBBsRAztMqc2Dp8fYKB2FnYlJ87aLWVT8Axkzwm96pC2lheYnKQpLoc6_3kzomTM4ru8AkLWU4hLArTgoK9_f4bObMNGPW9JL_YYuljuXa3E8vfl-20Zy9p5Up7IpEktWIpbL4coC_jDMzeA3DUgGS3sYc-plwcZ8z9hnnEh_u1hvg_n5BCrv80G_hrRyYiWT3DtBeT5LZxzjwNViA0HLb_d4r=w1566-h1468-no)

`rows` 로 3가지를 지정했더니, `50px` 3줄이 생겼다.

`auto` 값도 가능한데, 중간에 `auto` 를 넣어보면,

```html
<!doctype html>
<html>
<head></head>
<body>
<div class="grid"> 
    <div class="grid-item">1</div> 
    <div class="grid-item">2</div> 
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>
    <div class="grid-item">1000000</div> 
</div>
<style>
* { margin:0; padding:0; }
.grid { 
    display:grid; 
    grid-template-columns : 20px auto 100px auto 30px; 
    grid-template-rows : 50px 50px 50px;
    background: gold; 
}
.grid-item { 
    color:hotpink; 
    padding:10px; 
}
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/B4I9EZy_U_3eN4GOhHmvtM0PA1_JuNYComYtZIuC15I-6QpHzk4yCjoIZmJbum4KVnFSIg-UGT6wi2jq9KEkLc-lE_ClkwPUENyLnURr5vUkz331DOoaGDvBNtLTfIKn4ew1GZVf2hm8aP75OrW9IyL5PYiE8OMWnZmuDr18BnG0l-oHS3vAvC_IAa0LRDsR6n6L0d21ZwVvIdDvCOJoZ0pOj4gPZ9gbM255R62YY2EQs-GKjKY1Z37pPvTTur1dn7nf7ORlUumM0tO1DjE7PVeyzXBPto32RV8FGvBF1dqUTKHGpN6fuDTZABzERWx7bIXh3b6WXoBzEOBVpB7DAe4Y_9SoTpgo-ETC1cCibASHRkoVm2E4Ab99UVjBi48MfniYafCq68nMJsZ-L05ckvw11RCTAaYPRxUQUg9Hjok0tc5Q5VtQLlnGuXtfFSj1aUa_j2Q3xKyBX96tfVFUKnVXT29pAPAm8tJxRwV5uZ8ADYGj7Un0_73gkwppBdqQmRVCX-mqYUiMEkijoxwLYYWMmmzMOK_vDRDRUM2NXEmr279dCF_Acqo0imkmgrItoTgZoL0q5XggUAsBpKx6otSMo6r_vsf4o19TCE3QATef2FUWoObZqC5-rKDV74ECmKMu2u6idmtReixd6UBAfP1LwE61heU2=w1566-h1468-no)

이와 같이 명시된 `px` 외에는 자동으로 너비를 넓혀주고 있는데, 2번째와 4번째의 너비가 동일하다는 것을 주의깊게 보자. 나머지 `auto` 적용되는 요소들은 남은 너비를 등분해서 가져같다는 것을 확인할 수 있다.

`grid-template-rows` 도 동일한 공식이 적용된다.

기타 속성값으로 `max-content, min-content` 등을 지정할 수 있는데, 해당컬럼 혹은, 해당로우에 최대값 혹은 최소값 기준으로 적용된다.

이 외에 값에 대한 단위로 `fr` 단위를 쓰는 경우가 있다. 분수(fraction) 를 표현하는 단위로 `grid` 로 설정된 아이템들에게 적용된다. 쉽게 얘기해서 남는 공간에 대한 비율이다.

```css
.grid {
    display: grid;
    grid-template-columns: auto 100px 1fr 2fr;
}
```

3번쨰는 `1/3` 공간을 차지하고, 4번째는 `2/3` 공간을 차지하는데, `grid-template-columns: auto 100px 200px auto;` 라고 했을때 `auto` 는 남는공간을 같은 크기로 등분하는데 반해 `fr` 단위를 사용했을 때에 `auto` 적용하는 부분은 최대값으로 너비가 결정되는 차이가 있다. 이렇게 단위가 충돌함으로 인해, 계산이 변칙적인 성격을 가지게 되면 오류의 요소를 찾기 어렵기 때문에, `auto와 fr`은 혼용해서 사용하지 않는 것이 좋다.

축약표현으로 `grid-template: 150px / auto auto auto;` 이렇게도 사용한다. 
`grid-template: rows / cols`

### grid-auto-columns, grid-auto-rows

`grid-template-columns` 가 일일히 칸을 지정한다면 `grid-auto-columns`는 한번에 지정한다.

```html
<!doctype html>
<html>
<head></head>
<body>
<div class="grid"> 
    <div class="grid-item">1</div> 
    <div class="grid-item">2</div> 
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>
    <div class="grid-item">1000000</div> 
</div>
<style>
* { margin:0; padding:0; }
.grid { 
    display:grid; 
    grid-auto-columns: 60px;
    background: gold; 
}
.grid-item { 
    color:hotpink; 
    padding:10px; 
}
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/PYmLtdicBn9AjPWjb1dGPeO25rRoUn5fC_MUfJPv82sXSSAnyaWzwjNjLeH6lSgeIrSJaiI9snxaRJgnTX_st8UAFjMFz7NsJWmtTqT12kmkPg4rSjELMnhMnR-WGnOnKzWCHVznS9C45OMtTa0A_GADMNrs8QKkmN8EHrsVUdq2Yo4TThZ_ShnHw9iRb81r6_NXeZyPcyqZnZ2eeL7MvqWmb3EOiqeDgGAMMOVERO192t5mTDetN0A1XR5kdOwsqm7ZZ1ckIPOLHKq32zTOpXVdNFxGrHAktWZChmogPCUgstiPHk2Ys654JBR4zdoy6QW6O7JY0tl-Jbnve82T9591u4HZRW8g1YWBL2ccpZR5S8H4fRiPgWBrZVnBhP8iOY6me4OpKRGOa7qiAZEZ3toJqplGIGrc8w1X4Zqq1YoCa1E_JsOIEdSU4IosNefsFw0UkHNuT_XBw84AFSia9HQGs5stykyEDx1ZT5Qx4hvcPEsLAqvYyuoc3kfxN-Rvyv7uPFPeXOqPUuuYu9GstqWanE7KuQmHGD5BAD_8itYfmCNbQreQj3uM7AA6cl5OKT5LENp49KKFwGlymMhvQmZJME90GJlB2_9L-wyemzgb5EafAhYxNfZrJWkzNeG0o5QeVy_OgeKKHS2O6vtcX9GeAKykcgVQ=w1566-h1468-no)

`columns` 를 지정했는데, 가로로 배치되지가 않았다. 그래서 이 속성은 혼자서 사용할 수 없다. 그리드를 좀더 구체화 할 수 있는 다른속성과 같이 사용해야 한다.

예를들어 그리드아이템에 적용할 수 있는 `grid-column` 같은 속성과 같이 사용하면 너비를 참조해서 렌더링 해준다.

```html
<!doctype html>
<html>
<head></head>
<body>
<div class="grid"> 
    <div class="grid-item">1</div> 
    <div class="grid-item">2</div> 
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>
    <div class="grid-item">1000000</div> 
</div>
<style>
* { margin:0; padding:0; }
.grid { 
    display:grid; 
    grid-auto-columns: 60px;
    background: gold; 
}
.grid-item {
    color:hotpink; 
    padding:10px; 
    grid-column: 2/4;
}
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/PiBfWRih4cJv6SHA1QNj9-Hx8ButsrjbExV2QaDOfpxdMGYg2cbSqyiV_LnZp2qnNrtKGP8sKtqHoC2Qc1Iy8WykmEvsjcw3wSUtMv8AH7fFLuGZq_GmPERyWwOeJlc0qdGoit9FzM6Ms1A-0gKIE7xhPa8hdcF5Hz4tcSTLTdtmkKBfpryutQ-CeiH9m5w-doOefW1GWIXlcMINJQocZOFNpWWjF8MUNGtXzfWHEdojmV_HMOvPiK6AdlCYsIh-xCr6brwOgZTBo37apnhT69Me8UrOECZEXJfrLn8vpPwC_OtqJAerh7W2w02_M5wJwbMLh-es6Rm_E_Cpaj5nn8WvJjYRCEhVRyiPr9-8_OGCvPIJ5nQUn561BRogPi3uJ5U6BCmAtyYWXT0IHiqG2lykC3eelcWz2SZ3Fyil40I5vg2EcM6wX_J7JWqvPWzd1-WmAN0nOO65VV6ECTK5jY_U0TASAXGj9HWEx8VfEpqmk-l0Tkvt5DJwy4U9PxgCFJz8XegUuNw7d55IVdaHySgz5K4PJdYltRCfT0hjrfNi_sDKwz26RexRsVXzDq70ic9uUECip3RpR39CFzzE4SXqkgv-v1WZI9CJQpyLsLFQ02FFM-UdW8Akh9XzveQkv51ze7luDZlSV8qf9IDJ--37LF5wD9dn=w1566-h1468-no)

`grid-auto-columns` 에 지정된 `60px` 을 기준으로 2칸을 차지하였다.

`grid-auto-columns, grid-auto-rows` 는 그리드의 남는 공간을 채우는 하나의 옵션으로 이해하면 될 거 같다.

### grid-auto-flow

그리드의 흐름을 정한다. 기본값은 `row` 이다.

```html
<!doctype html>
<html>
<head></head>
<body>
<div class="grid"> 
    <div class="grid-item">1</div> 
    <div class="grid-item">2</div> 
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>
    <div class="grid-item">1000000</div> 
</div>
<style>
* { margin:0; padding:0; }
.grid { 
    display: grid; 
    grid-auto-flow: row;
    grid-template-columns: 50px 50px 50px;
    background: gold; 
}
.grid-item {
    color:hotpink; 
    padding:10px; 
}
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/GLXa3eivSsHiptcXEj7Q5bmxSEWbj2uhi9_r9eaJl3YJGkoHbjgNh0VTFMGvmctMEa5EM75-SgBdncMGdaKQ4wAG7NGRR6ogaP2xWMZOOGaLAwFEiGPkirEjRos9rvBsq3_qMApKp8YzCOY78huDrKGmj_0JJOtR969ml74G7pnyBPmzCv8t4ZMLh8c7qVWJIDae3ZsWh_jEq33oX6OSwP6rxR6LtusTGSqY5cSW8aQOGeGpx-X9w7-pI94zjqiTqm58BxAI7P8kVe05hwdXJw9-aUfXBTVxKaKemi4CzQurKHRLnZos5FvH2SDLrS-XXqHFr5fQf8V7uCrDG-h-pAE688k11QM-VK1EdQL8YMrYaUlCv5DqcYw0OrZLeFHEeIaH9GHPd3L6iRdCbW02Gq6DjHnn6W48Rzv6Rb6wTNOtGMXe3XjBUM-H_S4EaCjdAEMF8lFTdSxOPBgodraUJxf8auT4VpsKRzKQGt1SgvUqombRgEBGpG_XEa1l91wR01wIslf1sPJB0bnzMpcIVEzlS8TTmfBQJm8YBS7bx2N3oM8zm9_qRotjFlxlsNusfBDpCCeq5yUKqdgGcvQ8boD0kcAArLdnpKvNBWQZvwMr0WemyPZ5Uiu5xxOk8JwCauozmIekBHlxM0hPueD80RIrsd4sFFpL=w1258-h1180-no)

이게 기본이라면 `column` 으로 지정하면 배치가 달라진다.

![](https://lh3.googleusercontent.com/1PiYMO3ndb5IQedZNuTUBXNLWhfTdLbOmRWL0cdDhNP_YIIx1GqOijnQHc0btf53Nq_TtOTumXrCkrIn80p5lWcwyHOetEwjp1wUqgVCVJ577FTDg5XgKsKzR1TeBJdOZg34Kvd0kJ17hj4pU8rqoemYdnZoCeCmXwChuYHAs7kYNgcHD4pWJ4wb5ayeJgsM48z78SBMo-1_5BTgfJEF3FH9ssJDtDzlELKxn1E8XXD2hr0x71p3gaOCOay4C_y3uLyx-Ttqa2M-XnHSXHrTmJWFyGeINinLoTZOQGPsfApuQ2SMgdbs4BHZA1XnsAue6Hu_2aoZP6YuykmqK3pIXzo2VB147FJmJsV2Ay8DgRwqHolOt9xeNfsOevkAYSpTTXByOCwvVNSon-NvrLrbARgDKTCHtOWl1DFfsDu644JXtb81XNaT47_Mbl62mVqLSNmV2W2CfcE2vbFnlSKQU2NQZk_fVB-6MkgePFcEqS66tycQYR6q4NueengcQrLcw_Qsd3sOreIj4Vrk0DRG_NWaJyustKuizgf8yIBZuectACfVmChpe-ghAQIYJYCIE57w7l2tsjHw1zj69XVvRi_Af6hzXjFqSmXiIzef_0e-ymyvTjn4GEK66Rga5Uzq3fxcp9rhvsaeaLMb0z88MqQxUd_VTqhq=w1258-h1180-no)

위와 같이 자식으로 있는 그리드아이템이 지정된 그리드영역에 배치되는 흐름에 대한 설정이다.

`dense` 속성값이 있는데, 이것은 배치하다가 남는 공간을 기준으로 자동배치 인데, `row dense` 와 `column dense` 같은 `row 기준에 남는공간배치` 와 `column 기준에 남는공간배치` 같은 개념이 있다. 

만약에 `100px 100px 100px` 이 있을 경우에 해당 그리드 아이템이 `100px`을 넘으면 넘길거야? 같은 옵션으로 생각하면 된다. 

이것은 그리드에 대한 명시가 명확하지 않고, 논리적으로 지정하는 그리드에서 사용이 용이하다. 예를 들어 `grid-column, grid-row` 같이 논리적 배치에 대한 단서가 제공될 때 배치를 어떻게 가져갈 것인가에 대해서 활용도가 있다. (반응형 설계에 적합)

이 배치방법은 그리드를 통한 반응형 예제를 통해 따로 살펴봐야 겠다.

`grid` 가 되는 `그리드 컨테이너` 가 가질 수 있는 속성에 대해서 알아보았다. 위에 속성들을 축약해서 `grid: 100px/ 70px 70px 70px` 로 표현할 수 있다.

```css
.grid { 
    display: grid; 
    grid: 100px/ 70px 70px 70px;
    background: gold; 
}

.grid { 
    display: grid; 
    grid-template-columns: 70px 70px 70px;
    grid-template-rows: 100px;
    background: gold; 
}
```

`grid: none|grid-template-rows / grid-template-columns|grid-template-areas|grid-template-rows / [grid-auto-flow] grid-auto-columns|[grid-auto-flow] grid-auto-rows / grid-template-columns|initial|inherit;`

이 공식에 맞춰서 다른 설정되지 않는 것들은 기본값으로 설정된다.

### grid-gap, grid-column-gap, grid-row-gap

이 외에 그리드 컨테이너가 가지는 속성중에서 이 속성은 그리드 사이에 여백을 지정하는 방법이다.

```html
<!doctype html>
<html>
<head></head>
<body>
<div class="grid"> 
    <div class="grid-item">1</div> 
    <div class="grid-item">2</div> 
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>
    <div class="grid-item">1000000</div> 
</div>
<style>
* { margin:0; padding:0; }
.grid { 
    display: grid; 
    grid-auto-flow: row;
    grid: 100px/ 70px 70px 70px;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    background: gold; 
}
.grid-item {
    color:hotpink; 
    padding:10px; 
}
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/yrFcjlRUbsUusVNhZasPVr410IFgBn0VhIQCwHRP422EM1mtQ_MDCwyeyIyrNWVxz6kWHrMDEwD3mI4q4NTFHcSGvWGg7jhpMR6CfEzvd_xoHz3gIWULiE0f8omuf6twGqG6-aEoJExPsXC_gIVYRWiisi79Qe2bWlIscjjNDoawjlWsBx3CV4xDH7fUIDL-sV-cltEEVWKGv0x6912Tfk8a8gJsa3ZDfC7o5I98YZ8ElRNbOhyWAS0n5lVQuRa9dUwfYPzUsg8G5gW_9pWABzAVrfPGQCGLW4SrAE-mnCWiwhzShpBfJQp-AfFOSPXk9Jt2gc67sfkyCoqVfGjfz2Xq3lSHmn144AQxuljN4cmLfX1fDQiFDbjh7jGc6u6Geu2Npm6tCTfw0veqxTkjueEB2JJQbMtJ857EUgArkjLUPPKKMBsHOADlOPr3UOT_QsFGdh8ro4OIM-pHkuQ-ScsO1yI35_fCbGc6bcooVORJluy34TJylBRQiPJmkE4WKoHyW7HeVt8-puyAZhtDGzhm-rS1-fmTUBcRVzrj-GgknvnTFUkyIsx8a25DI2TR54Qw24UxtSMSXVGho3l7lfneUcXwMDBSo_FWgYobJ_K7IjauRCGK0pOvpVajl2StHs1IMWXVz2M0bnSIgmh6F14HqLqw-lk-=w1258-h1180-no)

위에 설정은 축약형으로 `grid-gap: 10px;` 으로 할 수 있다.

그리드아이템이 가지는 속성에 대해서 알아보자.

## grid 아이템이 가지는 속성

- grid-area
- grid-column
- grid-row

### grid-area, grid-column, grid-row

grid 영역에 대한 이름을 지정한다. 예를 들어 그리드아이템에

```css
.header {
    grid-area: hd;
}
.footer {
    grid-area: ft;
}
.content {
    grid-area: main;
}
.sidebar {
    grid-area: sd;
}
```

이런 이름을 지정하고,

```css
.grid {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-areas: 
      "hd hd hd hd   hd   hd   hd   hd   hd"
      "sd sd sd main main main main main main"
      "ft ft ft ft   ft   ft   ft   ft   ft";
}
```

위와 같이 나누어진 그리드의 영역을 배치하는 것이다.

```html
<!doctype html>
<html>
<head></head>
<body>
<div class="grid">
    <div class="header">Header</div>
    <div class="sidebar">Sidebar</div>
    <div class="content">Content</div>
    <div class="footer">Footer</div>
</div>
<style>
* { margin:0; padding:0; }
.grid { 
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: 200px auto 100px;
    grid-template-areas: 
      "hd hd hd hd   hd   hd   hd   hd   hd"
      "sd sd sd main main main main main main"
      "ft ft ft ft   ft   ft   ft   ft   ft"; 
}

.header {
    grid-area: hd;
    background: goldenrod;
}
.footer {
    grid-area: ft;
    background: goldenrod;
}
.sidebar {
    grid-area: sd;
    background:indianred;
}
.content {
    grid-area: main;
    background: grey;
}
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/LUZJlKNL-6eSow45QihGw0qLrTyUauYQGb6q4oKn6xRR_tQwFQdtpzLF3wLIQ41mlCP3eO9IQeDww5REnAqZGPzYIhGIj9YdTC8RluwRxjftdk3IAiffQs_NXgneE8SxBvxfDDbCJ6GFjrOxrtNP8XPcWVc8qxlAV4hFnNiM6Bya433cRdO-RqMWybAbUbsamEHrxRXB-6AHVJT3R-bj_MNSP_DAjBzVJbRO4gOWZqmrIe3BwYbogjqI_MaqbO8BtyyVPtJmNsZyRq0JyGek3cNTa4ye6g63ZLcvhMzzZjtfblV1Powp1txLMJ4i6vL3aCS7jGK2vjxJJK6eY-I2dylEBsTwWWPoIG8rKC_f1XbMVGqepAe9DARmfWWzcbfb5RdRSKK9M_ou9p1UnwVbv3cD5BZv9gJIhzrtuAFnpcuKbubfagOrGQ6rJ_73SRUrIv9B5_e1RrkP7guJ0ITG2BM9xOH58DSEJ3x-plGNEZBchCQngfwDshmVvGGuivN6p9F5f6qNyy57toqKJyoMCMBlvSjxMIfI0-Uz8rU_zVpySUWq2j90YBrvyEYuD6vIKIubiWJUYUP1W1Qnb9T3OikEruoSZi5tN8oYgfzdIB9DUjtZGzk5IEuRakmVaM8y1v_ofIC-wglohOuhRV1XBADgM5nUIn0C=w1258-h1180-no)

위의 예제는 모든배치를 지정한 것이지만, 필요한 부분만 지정해두고, 해당 미디어쿼리에서 배치순서를 변경할 수 있다는 것이 장점이다.

위와 같이 이름을 지정할 수도 있지만, 숫자로의 지정도 된다. 지정법은 `grid-column: start/end` 이다.

```html
<!doctype html>
<html>
<head></head>
<body>
<div class="grid">
    <div class="header">Header</div>
    <div class="sidebar">Sidebar</div>
    <div class="content">Content</div>
    <div class="footer">Footer</div>
</div>
<style>
* { margin:0; padding:0; }
.grid { 
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: 100px auto 50px;
}

.header {
    grid-column: 2/5;
    background: goldenrod;
}
.footer {
    grid-column: 1/11;
    background: goldenrod;
}
.sidebar {
    grid-column: 4/7;
    background:indianred;
}
.content {
    grid-column: 4/7;
    background: grey;
}
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/6_AlF-1UAyftsoPIowzd_W9gQvaw1Oc8Pu5MEgfoOKgtJQBvGDbpKcdXJeSSOhHq5_Rov9VIMCgpEmDBG6d2f45I6sF7LS3J39oQVNnygcBtwMhqVumigIC58C9rGqlAgSsCFOkb6hm-raohgvKLQaM7g2QQ4-NyjrvzO8reIMCLlZGwpP3IYDC12_R5pT7apKjJhZ9ovzfI6DqpGmFDNcm4CUBNY8rsaZHihqo36w4_8T4eVqf3FO3j_TUFayTn4Os4xpWKzs7LVDUF6xb86S6MNfZR0tlCLo7uvxxVoElP26oR1-f1k1X8pHhwMeiM1RmYlQT-pHpOr4-O5ynHNtgJpmh6K6Z1P2gtkYyp9TmTc6sH3PkfglY5C7D8vkIvYEkw5j06BeNTjUPprTx9UI3IvbiKlXZAtUtsqD-2bvU3zxumpgiH6afQC0ck_byVaPQXvFNRJ6PXJJSP0hwAlo3aVVE_GJtPgKeMomgS4ReXRWEH5k28nzX6FoDo2MOyyl72B7BHSI7xspZ9DqBsiYc5RvqJPqVd_vfZjFxiDX7Yx4NVKOBeSBndhu5hU8ZMJHUOWVzmjQQ_MXTBBzE9dnt96mwtiJztOKvomqxUd3NmaREk8Wu0q2VCUL1G_-brEmGKLtTBjmhQw4onq6DeL2ztnekdx0B9=w1258-h1180-no)

이렇게 컬럼의 시작과 끝을 지정해서 배치할 수도 있고, `grid-row` 를 넣으면 겹치게도 가능해진다.

```html
<!doctype html>
<html>
<head></head>
<body>
<div class="grid">
    <div class="header">Header</div>
    <div class="sidebar">Sidebar</div>
    <div class="content">Content</div>
    <div class="footer">Footer</div>
</div>
<style>
* { margin:0; padding:0; }
.grid { 
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: 100px auto 50px;
}

.header {
    grid-column: 2/5;
    grid-row: 1/4;
    background: goldenrod;
}
.footer {
    grid-column: 1/11;
    background: goldenrod;
}
.sidebar {
    grid-column: 4/7;
    grid-row: 2/7;
    background:indianred;
}
.content {
    grid-column: 4/7;
    background: grey;
}
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/JXiDF_6ubNoIvFbei4WBApsmudpbY2zFQhDNwXOGeDcL6fHDURIv5Bijv8-pgMAbtpA2Iq_oXBaGZ6mQaU5Ow_bGFiV9o8RAX17in5EMtHqi2LJ8BUEx1BtgaZc7Z8HzZuBuFiWlw01aP9gg-bRrLySFtCiV7h1tAWot-jdl-d-50tM3yeLuzZ2tX_c9DXHWPGXYC6b3Bgf1SK419YIYMGeeu5CDiwqSYBAQMKDLSFsg4BpnwyoPclyu4GyGJterw-0psAZJmUT_aI8QwxVMuuB10NyIoXM1Nhiw8cSUzrBYtpu9RjET2RQI9sBWivaC948gfjMk5Q9Va1z1t9qpT_Fy76nYtA3ppBMwmLTXm1aB89bHbK--g3CaYxIMugc33SVkFbuz5cOBjBy9lRvBlzw60GzltiRAe84rFZAKU1Q_uKXFhcQ-y-xgCjw9aCyqxDYWrFluGfNFXmRczv79vyUrMsl-f_IGJEjeMyiiRUJJajPXKQ7iPQMYeM4ki5-aF2OyxPVumF7engb040GX0p5xUz31SrBhFWbgiGLYah3nbIJn9K6UZA8b_hJNMhJ3Z-5eHR5ZaIpcxrFT3p80DcQ2IJ56nXqSUzW0vlQmTlV5dy-N-HnpfD26Sw58mU8rDfSclNGWxrgyrcV3YyA1NDY6JTnLrbGQ=w1258-h1180-no)

위를 축약형으로 사용하면 `grid-area: grid-row-start / grid-column-start / grid-row-end / grid-column-end | itemname;` 이렇게 된다.


## grid를 통한 일반적인 레이아웃 예제

그리드에 대한 속성은 다 보았고, 실제로 적용할 레이아웃을 만들어 보자.

일반적인 레이아웃은 `상단헤더, 좌측메뉴, 우측컨텐츠, 하단푸터` 이므로, 이것을 기준으로 하면

우선 `html,body` 에 `높이 100%` 를 주고, `.grid에 height:100%` 가 높이를 상속받도록 한다. 

컬럼은 10컬럼으로 나누고 `header, footer` 만 우선 배치해보자

```html
<!doctype html>
<html>
<head></head>
<body>
<div class="grid">
    <div class="header">Header</div>
    <div class="sidebar">Sidebar</div>
    <div class="content">Content</div>
    <div class="footer">Footer</div>
</div>
<style>
* { margin:0; padding:0; }
html,body { height:100%; }

.grid {
    height: 100%;
    display: grid;
    grid-template: 100px auto 50px / repeat(10, 1fr);
}

.header {
    background: goldenrod;
    grid-area: 1/1/1/11;
}
.sidebar {
    background:indianred;
}
.content {
    background: grey;
}
.footer {
    background: goldenrod;
    grid-area: 3/1/3/11;
}
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/zM8X9h2tSR4FyoxXfAZDQ9PRw3KSbqPOxNQbEMXAmPzOcb9ATDDfVvVGcYPIdboSWdjYPyDG6xCJZA9RMTjEosiQgiiXnQNX7PyWheId4xDrN2IaSRJDEKRV-PmcnjkGILY4hdPw-jG2OecXMQ7cbE8XF2OaSpzjioSr-iMmEonDIFG8x2hnjWAfHL40ErhOyEUp2SzB8ZUvWdt55-TJCKHd_kDnwr-uJtYjP08JafcErcxPkENGYtbD5gmv4m6RClmgw476F8_WHazBJJBMYX_sCshaIzXWEmar5z84uYAU2xDJfhQegyS-GkDODK2n_hwl-6uw_29HtkgyeFsXartRoMFgreB-5HGmh3i1Md9P79p-s7fW_E0noxXC3wnF9vjUpvFMVM234c0OEoBGXpMF6Xbj-Jru53iNmaAGpivu5uTMHWwnP1VM-xE2_mrXNno6ZsHiHYA_SqZ7wkC7-MVxR3NVFiG2HwKXQ9t_STY_9H39OK3VJ8pIdCdDg2W9TtEjLLxWQbIFkaxbAOdP5OoZUvGcbHqj7g3frYwNGgOUUxS8MNA7KSO3DuIT1AdnCtNC-B792xYb5KM912N02mrnTGMRzBPLuKDTvh-gYhvauarKZqfvs1zYSUefDOpb4HF2i-pn35P-XOuEzp5Cgfbwk3jmvgr2=w1258-h1180-no)

이제 `sidebar, content` 자리만 잡으면 된다.

```html
<!doctype html>
<html>
<head></head>
<body>
<div class="grid">
    <div class="header">Header</div>
    <div class="sidebar">Sidebar</div>
    <div class="content">Content</div>
    <div class="footer">Footer</div>
</div>
<style>
* { margin:0; padding:0; }
html,body { height:100%; }

.grid {
    height: 100%;
    display: grid;
    grid-template: 100px auto 50px / repeat(10, 1fr);
}

.header {
    background: goldenrod;
    grid-area: 1/1/1/11;
}
.sidebar {
    background:indianred;
    grid-area: 2/1/2/3;
}
.content {
    background: grey;
    grid-area: 2/3/2/11;
}
.footer {
    background: goldenrod;
    grid-area: 3/1/3/11;
}
</style>
</body>
</html>
```

`grid-area` 의 `row-start/column-start/row-end/column-end` 지정법이 조금 헷갈리긴 하는데, 이렇게 간단한 설정만으로도 `100% 레이아웃` 을 구성했다는 것에 상당히 만족스럽다. 혹여 `html,body의 100%` 높이지정으로 인해, 컨텐츠가 안밀려 내려가지 않을까 했는데, 다행이 아주 정상적으로 밀려 내려갔다.

```html
<!doctype html>
<html>
<head></head>
<body>
<div class="grid">
    <div class="header">Header</div>
    <div class="sidebar">Sidebar</div>
    <div class="content">Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content</div>
    <div class="footer">Footer</div>
</div>
<style>
* { margin:0; padding:0; }
html,body { height:100%; }

.grid {
    height: 100%;
    display: grid;
    grid-template: 100px auto 50px / repeat(10, 1fr);
}

.header {
    background: goldenrod;
    grid-area: 1/1/1/11;
}
.sidebar {
    background:indianred;
    grid-area: 2/1/2/3;
}
.content {
    background: grey;
    grid-area: 2/3/2/11;
}
.footer {
    background: goldenrod;
    grid-area: 3/1/3/11;
}
</style>
</body>
</html>
```

![](https://lh3.googleusercontent.com/qMBFrEdJuXTr5ojNksNDTkp6mqPgCUixZP6snZLI7jmaWRikmDnfxVjgKy_ZVacJDs6knl8gzcyeOmERkpKwc7xxjHfjvkXtlV_kgywcw3XFwnqiwddUrePLT1-5X-WfTkN2uXhjgQ_lDJKmE1ME6ivP2W543qWuMWOmYqvaHVzwIk-7h_0te5x8b4JgpBeOpi2Fx7nv_wwD5bNkOJpQAL-U3N313sllvzIDibpRafkzduRNt_jBdeFlt7MsZJ3qVNBSYCZjMsPQM1lFFudefP6FYqH1JKHbHp8VwXsTn7lRV3j_NU9FpHNSfUiUyDDSbjOu3kuvP8JIB0JQaeFI0rsJRT7fkrifDMsmJAPS_HutADoGZMcX75HV1Okmggabw4sRMFpzj6TLjf72t-dsnvUpEELlfd1hO2R4CtaasKK4zvJe19BJmt6j0YnbsB7GX19qh8tQl_HJ_cKQlQSOx1ji_WHtY174O65FqGOqzO8HhaWomDUx5TmQOjwiYiDXDb3n60IZr6o7N2pdNYgdaFYu7RKFX4aaBLBcP8Xb_LaeAoS-FFslEZF1KdW7uBuHRH2_miCsj_QaiaUTOHbkGCfkznWC7dHAIByetbeoKqfyLP6yzBTIzBcGfjFa7KGlpyAKobIalhH8DrNa0TS58tXW8FAePtPB=w1258-h1180-no)

이렇게 간단하게 사용할 수 있는 `grid` 를 사용하지 않을 이유가 없다.

![](https://lh3.googleusercontent.com/QOEuk3BYJOg2e99KL2mE5iOhuNz-VM1OVVUAIAIZTCdNQlGGrIn_6hSY3DGd-oif1G1a75zcIJc7iRg7V6seLH1crxQdsEJVMMKSWw0GpXd5H-qvpWIHX9RkxBvxFQt6xHQn23NHJAAuSyoP3x6SXDvImb8LPR_YNh7Xg1K5trxFfZPu2HWt9GETTY1V-XXouGtY4xU0MZJ-Xdwbq5j8Ee5gQrjaiDZQHxT9MSwxrBbFtIGTM1X0GsvYn_zB2S9AxcAgei7_fNaQMl69zoFxW1rqixKW7GtDo7ZW4M_NcUg1bIGSTbBdcp9_uzZAJ8hBvQIGvrCANXwgknKVs_3uyO7Xkhcf-q9vLASNMhUdpBQmdD0KMrB3q7yoPfWpVkEv5lARPg_tIvYPxaRCG7On93sSeArUCk75RTko8XO0KLHuFOGtZNW49ZVjA_K3G3MAAXOsw4Dg6jrstU4ljms_VtlzY-GBGPk91S8HFArTebpMc3lZvvurvRt-VtD4ff0rxvFCRpIhWy8N05HeB7TE73-iHpg-ndqJBpLt69i_N0iifG8d0jrhZPvTr6I5uC9n5q8oQXT35OKoKqOzlwLfTU_tTxFFNmh5SnS9htOj2j9_fwVFC4yvOWyJQLZ0VtKs6dkJ7yH3A-m7RMPwDwco330L8sNz6nT5=w1258-h1180-no)


