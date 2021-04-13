![regex](https://lh3.googleusercontent.com/-kN-Cp7myxfo/Wd7CKQBNyzI/AAAAAAAAS64/Vo6eZKjuYJMXg558E0PzGcIsy9tlnXtHwCHMYCw/I/regex.png)

# (정규식) 입력받은 문자열에서 특수문자, 알파벳, 한글 제외하고, 숫자만 추출하여 return.

특수문자, 한글, 영문 검사 패턴

```javascript
function onlyNumber(str) {

    var pattern_special = /[~!@\#$%<>^&*\()\-=+_\’]/gi,
        pattern_kor = /[ㄱ-ㅎ가-힣]/g,
        pattern_eng = /[A-za-z]/g;

    if (pattern_special.test(str) || pattern_kor.test(str) || pattern_eng.test(str)) {
        return str.replace(/[^0-9]/g, "");
    } else {
        return false;
    }

}```

