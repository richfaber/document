![Mock Service](https://2.bp.blogspot.com/-CP1JUIVL3Kw/WDfxYpx7YKI/AAAAAAAAPpQ/2iFrhIZ8dnMu4Ws8akvTkYD71SpewdqWgCLcB/s640/isolate_single_service_with_mockserver.png)

# Angular 1.x 에서 mock service 만들기

- Backend 서비스가 개발되기 이전에, Frontend 기능 개발을 위해서, Mock service를 하는 방법.

## 적용하기
ngMockE2E 에 포함된 $httpbackend 을 사용해서, 가상으로 응답을 구성함.

### 예제

([DEMO](https://cdn.rawgit.com/richfaber/study-angular/master/angular1/tip/ngMockE2E_%24httpbackend_MockService.html))

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-mocks.js"></script>
    <script>
        angular
                .module('mockService', [
                    'ngMockE2E'
                ])
                .run(function ($httpBackend) {

                    $httpBackend.whenGET(/baconipsum.com\/api\/.*$/).passThrough();
//                    $httpBackend.whenPUT().passThrough();
//                    $httpBackend.whenPOST().passThrough();

                    $httpBackend.whenGET(/test\/1/).respond(function (method, url) {
                        console.log(method, url);

                        return [200, {
                            request: 'GET',
                            results: [{
                                a: 1, b: 2
                            }, {
                                a: 3, b: 4
                            }]
                        }];
                    });

                    $httpBackend.whenPUT(/test\/1/).respond(function (method, url, data) {
                        console.log(method, url, data);

                        return [200, {
                            request: 'PUT',
                            results: [{
                                a: 5, b: 6
                            }, {
                                a: 7, b: 8
                            }]
                        }];
                    });

                    $httpBackend.whenPOST(/test\/1/).respond(function (method, url, data) {
                        console.log(method, url, data);

                        return [200, {
                            request: 'POST',
                            results: [{
                                a: 9, b: 10
                            }, {
                                a: 11, b: 12
                            }]
                        }];
                    });
                })
                .controller('testController', function ($http, $scope) {

                    $scope.methodGET = {};
                    $scope.methodPUT = {};
                    $scope.methodPOST = {};

                    $scope.openGET = function () {
                        $http.get('/test/1').then(function (res) {
                            $scope.methodGET = res.data;
                        });
                    };

                    $scope.openPUT = function () {
                        $http.put('/test/1', {
                            params: { _bb : 10, _bbb : 100 }
                        }).then(function (res) {
                            $scope.methodPUT = res.data;
                        });
                    };

                    $scope.openPOST = function () {
                        $http.post('/test/1', {
                            params: { _zz : 20, _zzz : 200 }
                        }).then(function (res) {
                            $scope.methodPOST = res.data;
                        });
                    }
                    $scope.externalCall = function() {
                        $http
                            .get('http://baconipsum.com/api/?callback=?', { 'type':'meat-and-filler', 'start-with-lorem':'1', 'paras':'3' })
                            .then(function (res) {
                                $scope.externalData = res.data;
                            });
                    }
                });
    </script>

</head>
<body>

<div ng-app="mockService">
    <div ng-controller="testController">
        <button type="button" ng-click="openGET()"><span>GET 요청</span></button> : {{ methodGET['request'] }}
        <div ng-repeat="data in methodGET['results']"> {{ data.a }} {{ data.b }}</div>

        <button type="button" ng-click="openPUT()"><span>PUT 요청</span></button> : {{ methodPUT['request'] }}
        <div ng-repeat="data in methodPUT['results']"> {{ data.a }} {{ data.b }}</div>

        <button type="button" ng-click="openPOST()"><span>POST 요청</span></button> : {{ methodPOST['request'] }}
        <div ng-repeat="data in methodPOST['results']"> {{ data.a }} {{ data.b }}</div>

        <button type="button" ng-click="externalCall()">Mock service에서 제외되는 요청</button>
        {{ externalData }}
    </div>
</div>

</body>
</html>
```

내가 설정한 `$httpbackend` 외에 것들은 정상적으로 요청 되었으면 좋겠는데, 그렇지가 않다. 
angular-mock.js 를 사용하면 모든 요청을 `$httpbackend`로 집중하고, `$httpbackend`에 설정 되어 있지 않으면 에러가 발생 한다.

그래서 추가적으로 passThrough 메소드를 이용해서 예외 처리를 해주어야 한다.

```javascript
$httpBackend.whenGET(/baconipsum.com\/api\/.*$/).passThrough();
```

> whenGET 안에 URL 패턴은 정규식도 되고, 문자열도 된다. 기왕이면 정규식 패턴을 추천 한다.
> whenPOST, whenPUT 설정도 덧붙여서 해주지 않는다면, 실무에서 모든 개발자들이 소리  지를 것이다
> 
> "Fuck, Ajax 통신이 하나도 안되잖아.. 뭐가 문제지? 두시간째 삽질 중이야."



