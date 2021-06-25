![](https://1.bp.blogspot.com/-ZBIeRwYFt80/YIZQ8lgSRmI/AAAAAAAAZqI/saJIdRGcFswI4hrqhjsNc-xlQxyOvXG0QCNcBGAsYHQ/s0/props.png)


# Vue 컴포넌트 데이터 연동 정리

컴포넌트 라는건 기능들을 유형별로 구분하여, 코드를 작성하는 컴포넌트



Vue 개발 시 컴포넌트 간의 데이터 방법은 상당히 중요하다. 

v-model.sync ==> emit 'input' 을 날려야 바뀜
그 외에 .sync ==> emit 'update:prop' 날려야 함.
.sync의 emit 은 참조객체가 아니여야 한다.
.sync 없어도 참조되는 것이 v-model 이면 변경됨?