> webpack.github.io > Document > DOCS > API > [Dev Tools](https://webpack.github.io/docs/webpack-dev-server.html)
> 2016/12월 기준 으로 작성 되었고, 의역 하였고, 오역이 있을 수 있습니다.

# WEBPACK DEV SERVER

webpack-dev-server 는 webpack-bundle 을 제공 하기 위해 [webpack-dev-middleware](https://webpack.github.io/docs/webpack-dev-middleware.html) 를 사용하는 작은 Node.js [Express](http://expressjs.com/) 서버 입니다. 또한 Sock.js 를 통해 서버에 연결된 약간의 런타임이 있습니다.

서버는 컴파일 상태에 대한 정보를 클라이언트에 보내고, 클라이언트는 해당 이벤트에 반응 합니다. 필요에 따라 다른 모드를 선택할 수 있습니다.

다음 설정 파일을 예로 들어 보겠습니다.
(webpack.config.js):

```javascript
var path = require("path");
module.exports = {
  entry: {
    app: ["./app/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  }
};
```

webpack은 위의 설정대로, app/main.js 파일을 로드하여, output의 path의 위치인 build 폴더에 bundle.js 로 컴파일 후 저장될 것입니다.

참고 : webpack dev 서버는 별도의 NPM 패키지 입니다. 다음 명령으로 설치할 수 있습니다 : 

```command
npm install webpack-dev-server
```

## Content Base

webpack-dev-server는 특정 디렉토리를 구성 하지 않는 한 현재 디렉토리에 있는 파일을 기준으로 작동 합니다.

```command
$ webpack-dev-server --content-base build/
```

이 옵션을 통해서 webpack-dev-server 는 빌드 폴더에서 static 파일을 참조 합니다. 소스 파일을 감시하고 변경될 때마다 번들은 다시 컴파일 됩니다.

이 수정 된 번들은 publicPath (API 참조)에 지정된 relative 경로에 기록된 위치에 저장 됩니다. 구성된 output 디렉토리 에는 아직 기록되지 않습니다. 번들이 이미 동일한 URL 경로에 있는 경우 메모리의 번들이 우선순위가 높습니다 (default 설정).

위의 구성을 사용하면 번들은 webpack.config.js의 publicPath 설정대로 `localhost:8080/assets/bundle.js` 에서 사용할 수 있습니다.
실제 구동을 하고 위에 주소를 입력해 보시면, 컴파일된 js 파일이 출력 되는 것을 확인할 수 있습니다.
(주의 : webpack-dev-server 에서 compile 되고 읽혀지는 파일은 실제 물리적 파일로 저장되는 것이 아니라 메모리상 에서 컴파일 되어 읽고 있다는 것을 주의 하십시요.)

번들 파일을 로드 하려면 static 파일이 제공 되는 build 폴더에 index.html 파일을 만들어야 합니다. (--content-base 옵션의 설정대로). 
다음은 index.html 의 예입니다.
현재 폴더에서 build 폴더를 만든 후, 그 안에 아래의 index.html 을 넣으십시요.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <script src="assets/bundle.js"></script>
  <p>index file</p>
</body>
</html>
```

기본으로 설정되는 `localhost:8080/` 으로 이동 하여 앱을 확인 하십시오. 

## Automatic Refresh

webpack-dev-server는 여러 모드를 지원 하여 자동으로 페이지를 새로 고칩니다.

- Iframe 모드 (페이지가 iframe 에 삽입 되고 변경시 다시로드 됨)
- inline 모드 (변경시 페이지를 새로 고치는 작은 webpack-dev-server 클라이언트 항목이 번들에 추가됨)

각 모드는 hot-module 교체를 지원 합니다. 핫 모듈을 교체 할 때 전체 페이지를 다시 로드하는 대신 변경 사항이 발생 했음을 번들!! 에 알립니다. 핫 모듈 교체 런타임은 업데이트 된 모듈을 실시간 로드 하여 실행중인 응용 프로그램에 삽입 합니다.

### Iframe mode

iframe 모드를 사용 하려면 추가 구성이 필요하지 않습니다. 브라우저에서 `http://«host»:«port»/ webpack-dev-server /«path»` 로 이동 하십시오.

위의 설정 : `http://localhost:8080/webpack-dev-server/index.html`

- 설정을 변경할 필요가 없습니다.
- 앱 상단에 멋진 정보 표시 줄. (?)
- 앱의 URL 변경 사항은 브라우저의 URL 표시 줄에 반영 되지 않습니다.

### Inline mode

Inline 모드를 사용 하려면

- 명령 행에 --inline을 지정 하십시오.
- webpack.config.js 에서 devServer : { inline : true } 를 지정하십시오.

webpack-dev-server 클라이언트 엔트리 포인트가 webpack 설정에 추가 됩니다. 필요한 URL에는 변화가 없습니다. 그냥 `http://«호스트»:«포트»/«경로»` 로 이동 하십시오.

위의 구성 : `http://localhost:8080/index.html`

- 설정 옵션 또는 명령 행 플래그가 필요합니다.
- 콘솔의 상태 정보 및 브라우저 콘솔 로그 제공 (간단한)
- 앱의 URL 변경 사항이 브라우저의 URL 표시 줄에 반영 됩니다.

### Inline mode with Node.js API

webpack-dev-server 모듈 에는 webpack 설정에 대한 액세스 권한이 없으므로, webpack-dev-server 설정 `inline:true` 플래그를 Nodejs 와 연결할 수 없습니다. 
대신 사용자는 webpack-dev-server 클라이언트 엔트리 포인트를 webpack을 통해서 추가 해야 합니다.

이렇게 하려면 모든 엔트리 포인트에 다음을 추가하면 됩니다. 
`webpack-dev-server/client? http://«경로»:«포트»/`

위의 구성으로 :

```javascript
var config = require("./webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {...});
server.listen(8080);
```

### Inline mode in HTML

webpack-dev-server 클라이언트 스크립트에 대한 참조를 HTML 페이지에 추가 하는 옵션도 있습니다.

```html
<script src="http://localhost:8080/webpack-dev-server.js"></script>
```

## Hot Module Replacement

webpack-dev-server 로 핫 모듈 교체를 활성화 하려면 명령 행에서 --hot 을 지정하십시오. 그러면 Webpack 구성에 HotModuleReplacementPlugin 이 추가됩니다.

핫 모듈 교체를 webpack-dev-server 와  함께 사용하는 가장 쉬운 방법은 인라인 모드를 사용하는 것입니다.

CLI 에서 인라인 모드로 핫 모듈 교체

더 필요한 것은 없습니다. `--inline --hot` 옵션을 지정하면, 모든 관련 작업은 자동으로 수행 됩니다. 
webpack-dev-server 의 CLI는 당신이 구성한 엔트리포인트에 특별한 `webpack/hot/dev-server` 를 자동으로 추가 합니다.

그냥 `http://«host»:«port»/«path»` 로 이동 하여 마술을 경험 하십시오.

브라우저 로그에 다음 메시지가 표시됩니다.

```command
[HMR] Waiting for update signal from WDS...
[WDS] Hot Module Replacement enabled.
```

[HMR] 이라는 접두사가 붙은 메시지는 `webpack/hot/dev-server` 모듈에서 비롯 됩니다. 접두사가 [WDS] 인 메시지는 `webpack-dev-server` 클라이언트에서 생성 됩니다.

올바른 output.publicPath 를 지정하는 것이 중요합니다. 그렇지 않으면 최신 업데이트 청크를로드 할 수 없습니다.

### Hot Module Replacement with node.js API

Inline 모드와 마찬 가지로 사용자는 웹팩 설정을 변경 해야합니다.

세 가지 변경이 필요합니다.

- webpack 구성에 엔트리 포인트를 추가하십시오 : `webpack/hot/dev-server`
- webpack 구성에 새로운 webpack.HotModuleReplacementPlugin()을 추가하십시오.
- hot : webpack-dev-server 구성에 true를 추가하여 서버 에서 HMR을 활성화합니다.

위의 구성으로 :

```javascript
var config = require("./webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
  hot: true
  ...
});
server.listen(8080);
```

## "Safe write"를 지원하는 editors/IDE

많은 에디터가 "safe write" 기능을 지원하고 기본적으로 활성화 되어있어 dev 서버가 파일을 제대로 볼 수 없게 됩니다. "safe write"는 변경 사항이 원래 파일에 직접 쓰여지지 않고 임시 파일에 직접 쓰여지지 않음을 의미 합니다. 

저장 작업이 성공적으로 완료되면 이름이 바뀌고 원본 파일이 바뀝니다. 이 문제는 원래 파일이 제거 되었기 때문에 파일 감시자의 추적을 잃게 합니다. 이 문제를 방지 하려면 편집기 에서 "safe write"기능을 비활성화 해야합니다.

- VIM - set : set backupcopy = yes ([문서 참조](http://vimdoc.sourceforge.net/htmldoc/options.html#'backupcopy'))
- IntelliJ - 설정 ▶ 시스템 설정 ▶ 동기화 ▶ safe write 금지 (다양한 IntelliJ IDE 에서 다를 수 있지만 검색 기능을 이용하십시요)

## Proxy

Webpack dev 서버는 http-proxy-middleware를 사용하여 선택적 요청을 별도의 외부 백엔드 서버에 프록시 합니다. 샘플 구성은 다음과 같습니다.

```JSON
proxy: {
  '/api': {
    target: 'https://other-server.example.com',
    secure: false
  }
}

// In webpack.config.js
{
  devServer: {
    proxy: {
      '/api': {
        target: 'https://other-server.example.com',
        secure: false
      }
    }
  }
}

// Multiple entry
proxy: [
  {
    context: ['/api-v1/**', '/api-v2/**'],
    target: 'https://other-server.example.com',
    secure: false
  }
]
```

사용 가능한 설정에 대해서는 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#options) 옵션 설명서를 참조 하십시오.

일부 URL을 proxy 하는 것은 다양한 구성에 유용 할 수 있습니다. 

한 가지 예는 로컬 개발 서버에서 JavaScript 파일 및 기타 정적 애셋을 제공 하지만 외부 백엔드 개발 서버에 API 요청을 계속 보내는 것입니다. 

또 다른 예는 인증 백엔드와 애플리케이션 백엔드와 같은 두 개의 별도 백엔드 서버간에 요청을 분할 하는 것입니다.

## Bypass the Proxy

(v1.13.0에서 추가됨) 프록시는 함수의 return 에 따라서 선택적으로 Bypass 할 수 있습니다. 
이 함수는 HTTP 요청, 응답 및 모든 프록시 옵션을 검사 할 수 있습니다. 요청을 계속 프록시하는 대신 제공될 false 또는 URL 경로를 반환 해야합니다.

예를 들어 아래 구성 에서는 브라우저에서 보낸 HTTP 요청을 프록시 처리하지 않습니다. 
이는 historyApiFallback 옵션과 유사 합니다. 브라우저 요청은 HTML 파일을 정상적으로 수신하지만 API 요청은 백엔드 서버로 프록시 됩니다.

```JSON
proxy: {
  '/some/path': {
    target: 'https://other-server.example.com',
    secure: false,
    bypass: function(req, res, proxyOptions) {
      if (req.headers.accept.indexOf('html') !== -1) {
        console.log('Skipping proxy for browser request.');
        return '/index.html';
    }
  }
}
```

## Rewriting URLs of proxy request

(v1.15.0에 추가됨) 프록시에 대한 요청은 함수를 제공 하여 선택적으로 다시 쓸 수 있습니다. 이 함수는 HTTP 요청을 검사하고 변경할 수 있습니다.

예를 들어 아래의 구성은 HTTP 요청을 다시 작성하여 URL 시작 부분에 있는 `/api` 부분을 제거 합니다.

```json
proxy: {
  '/api': {
    target: 'https://other-server.example.com',
    pathRewrite: {'^/api' : ''}
  }
}
```

pathRewrite는 http-proxy-middleware 의 기능 이므로 더 자세한 구성을 위해 [문서](https://github.com/chimurai/http-proxy-middleware#http-proxy-middleware-options)를 확인하십시오.

## Proxying local virtual hosts

http-proxy-middleware 가 로컬 호스트 이름을 localhost 로 미리 결정한 것처럼 보이면 프록시 요청을 수정 하기 위해 다음 구성이 필요 합니다.

```JSON
var server = new webpackDevServer(compiler, {
  quiet: false,
  stats: { colors: true },
  proxy: {
    "/api": {
      "target": {
        "host": "action-js.dev",
        "protocol": 'http:',
        "port": 80
      },
      ignorePath: true,
      changeOrigin: true,
      secure: false
    }
  }
});
server.listen(8080);
```

## webpack-dev-server CLI

```command
$ webpack-dev-server <entry>
```

모든 webpack CLI 옵션은 webpack-dev-server CLI 에도 유효 하지만, <output> 기본 인수는 없습니다. webpack-dev-server CLI 의 경우 webpack.config.js (또는 --config 옵션으로 전달 된 파일) 만이 허용 됩니다.

몇 가지 추가 옵션이 있습니다.

- --content-base `<file/directory/url/port>` : 내용의 기본 경로.
- --quiet : 콘솔에 아무것도 출력하지 않습니다.
- --no-info : 지루한 정보를 숨 깁니다.
- --colors : 일부 색상을 출력에 추가합니다.
- --no-colors : 출력에 색상을 사용하지 않습니다.
- - 압축 : gzip 압축을 사용합니다.
- --host `<hostname/ip>` : 호스트 이름 또는 IP. 0.0.0.0은 모든 호스트에 바인드됩니다.
- --port `<number>` : 포트.
- --inline : webpack-dev-server 런타임을 번들에 포함 합니다.
- --hot : HotModuleReplacementPlugin 을 추가하고 서버를 핫 모드로 전환합니다. 참고 : HotModuleReplacementPlugin 을 두 번 추가하지 마십시오.
- --hot --inline도 `webpack/hot/dev-server` 항목을 추가합니다.
- --public : 클라이언트에 대해 --inline 모드 에서 사용되는 호스트 및 포트를 겹쳐 씁니다 (VM 또는 Docker에 유용함).
- - lazy :watch 하지 않고 요청에 따라 컴파일합니다 (--hot과 결합 할 수 없습니다).
- --https : HTTPS 프로토콜을 통해 webpack-dev-server를 제공합니다. 요청을 처리 할 때 사용되는 자체 서명 인증서가 포함됩니다.
- --cert, --cacert, - key : 인증서 파일 경로 입니다.
- --open : 기본 브라우저에서 URL을 엽니다 (webpack-dev-server 버전> 2.0).
- --history-api-fallback : 내역 API 대체를 지원합니다.
- --client-log-level : 브라우저에 표시된 콘솔 로그 메시지를 제어합니다. error, warning, info or none 을 사용하십시오.

## Additional configuration options

CLI를 사용할 때 구성 파일에서 devServer 키 아래의 webpack-dev-server 옵션을 사용할 수 있습니다. CLI 인수를 통해 전달 된 옵션은 구성 파일의 옵션보다 우선합니다. devServer의 옵션은 다음 섹션을 참조하십시오.

예

```javascript
module.exports = {
  // ...
  devServer: {
    hot: true
  }
}
```

## API

```javascript
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

var compiler = webpack({
  // configuration
});
var server = new WebpackDevServer(compiler, {
  // webpack-dev-server options

  contentBase: "/path/to/directory",
  // Can also be an array, or: contentBase: "http://localhost/",

  hot: true,
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is sent to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does. 

  historyApiFallback: false,
  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.

  compress: true,
  // Set this if you want to enable gzip compression for assets

  proxy: {
    "**": "http://localhost:9090"
  },
  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use "**" to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).

  setup: function(app) {
    // Here you can access the Express app object and add your own custom middleware to it.
    // For example, to define custom handlers for some paths:
    // app.get('/some/path', function(req, res) {
    //   res.json({ custom: 'response' });
    // });
  },

  // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
  staticOptions: {
  },

  clientLogLevel: "info",
  // Control the console log messages shown in the browser when using inline mode. Can be `error`, `warning`, `info` or `none`.

  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  lazy: true,
  filename: "bundle.js",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  // It's a required option.
  publicPath: "/assets/",
  headers: { "X-Custom-Header": "yes" },
  stats: { colors: true }
});
server.listen(8080, "localhost", function() {});
// server.close();
```

미들웨어 옵션에 대한 문서는 [webpack-dev-middleware](https://webpack.github.io/docs/webpack-dev-middleware.html)를 참조하십시오.

webpack 설정이 WebpackDevServer API 에 전달되지 않으므로 webpack 구성의 devServer 옵션은 이 경우에 사용되지 않습니다. 또한 WebpackDevServer API 에는 인라인 모드가 없습니다. `<script src="http://localhost:8080/webpack-dev-server.js"></ script>`을 HTML 페이지에 수동으로 삽입 해야 합니다.

### historyApiFallback 옵션

HTML5 history API 를 사용하는 경우 `historyApiFallback:true` 를 설정 하여 404 응답 대신 index.html 을 제공해야 합니다. 그러나 Webpack 구성 에서 output.publicPath 를 수정 한 경우 리디렉션 할 URL을 지정해야 합니다. 이 작업은 historyApiFallback.index 옵션을 사용 하여 수행 됩니다.

```JSON
// output.publicPath: '/foo-app/'
historyApiFallback: {
  index: '/foo-app/'
}
```

rewrites 를 사용하면 이 기능을 사용하여 정적 페이지를 제공 할 수도 있습니다.

```JSON
historyApiFallback: {
    rewrites: [
        // shows views/landing.html as the landing page
        { from: /^\/$/, to: '/views/landing.html' },
        // shows views/subpage.html for all routes starting with /subpage
        { from: /^\/subpage/, to: '/views/subpage.html' },
        // shows views/404.html on all other pages
        { from: /./, to: '/views/404.html' },
    ],
},
```

### 기존 서버와 결합

개발시 백엔드 서버 또는 모의 서버를 실행할 수도 있습니다. webpack-dev-server를 백엔드로 사용하면 안됩니다. 유일한 목적은 static resource(webpack에 의한) 를 제공 하는 것입니다.

그렇지만 두 개의 서버를 side-by-side 로 실행할 수 있습니다 : webpack-dev-server와 backend 서버.

이 경우 백엔드 서버가 보낸 HTML 페이지에서 실행 중일 때라도 webpack 생성 애셋을 webpack-dev-server 에 요청 해야 합니다. 
반면에 webpack-dev-server 의 resource를 가리키는 스크립트 태그를 포함하는 HTML 페이지를 생성 하도록 백엔드 서버 또한 알려줘야 합니다. 
또한 재 컴파일시 재로드를 연결 하기 위해 webpack-dev-server 와 webpack-dev-server 런타임 사이에 연결이 필요합니다.

webpack-dev-server 에 요청 (청크 로딩 또는 HMR 용)을 수행 하도록 webpack 에게 알려주려면 output.publicPath 옵션에 전체 URL을 제공해야 합니다.

webpack-dev-server 와 런타임을 최상으로 연결 하려면 `--inline` 과 함께 인라인 모드를 사용하십시오. 
webpack-dev-server CLI 에는 WebSocket 연결을 설정 하는 엔트리 포인트가 자동으로 포함됩니다. (webpack-dev-server의 백엔드 서버에 --content-base를 지정하면 iframe 모드를 사용할 수도 있습니다. 백엔드 서버에 websocket 연결이 필요한 경우 iframe 모드를 사용해야합니다.

Inline 모드를 사용하면 웹 브라우저에서 백엔드 서버 URL을 열면 됩니다. iframe 모드를 사용하는 경우 webpack-dev-server의 `/webpack-dev-server/prefixed` URL을 엽니 다.

요약 및 예 :

- 8080 포트의 webpack-dev-server.
- 포트 9090의 백엔드 서버.
- `<script src = "http://localhost:8080/assets/bundle.js">`를 사용하여 HTML 페이지를 생성하십시오.
- webpack 설정 `output.publicPath="http://localhost:8080/assets/"`
- 배포를 위한 파일을 컴파일 할 때 `--output-public-path /assets/` 옵션을 사용하십시오.
- 인라인 모드 :
	- `--inline`
	- `http://localhost:9090` 을 엽니다.
- iframe 모드 :
	- webpack-dev-server `contentBase="http://localhost:9090/"` `(--content-base)`
	- `http://localhost:8080/webpack-dev-server/` 에서 확인하십시요. 

아니면 프록시 옵션을 사용하십시오 ...


