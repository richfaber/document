![regex](https://lh3.googleusercontent.com/-kN-Cp7myxfo/Wd7CKQBNyzI/AAAAAAAAS64/Vo6eZKjuYJMXg558E0PzGcIsy9tlnXtHwCHMYCw/I/regex.png)

# (정규식) event.keyCode를 이용해서 숫자값일 경우를 체크

키보드 입력 시의 `keycode` 를 활용해서 숫자값일 경우만 체크

```javascript
function onlyNumberKey(keyCode) {
	return /[0-9]|\./.test(String.fromCharCode(keyCode))
}

document.getElementById(selector).addEventListener('keydown', function(e) {
	var isNumberKey = onlyNumberKey(e.keyCode);
	console.log(isNumberKey);
});
```

