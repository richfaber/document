![hash](https://lh3.googleusercontent.com/YOk64siDgr1InpoK7MHX4CdddzqHqbSRpvpd6kWFhwJ7ZVrLVbe1tSBhzAiGuo0qMHbTFgSoTvO-sgvDYvPa7J1oo5DOJhdMbUERz0eA7uG_gAKZfew6FnCCezkUMDw4HrDLtm_ZZNVaizCZtREGEKOEXvRt6TN8SKi5_mgmdztAf-8XTIwqmwl8ldddlfwGzEaJ4EpLKvvqo_O8IcTrUMS0kO5p2f8NoQP8tonURf8aTIdnGpcOV_B0NZkgxzAAuhsRZPK1NUh4knwkvl7865GEfPsEnsCSF7nDeLYQPjzunaLe0fXBSvbni4-crqdR-uGxdN37e8r92tefh5Jz2I-zFPmso4QZXRIc1WGldFVIsLCDKGMtq4HebCwY9rjQ-AV6lecZyo3tIsiYIDUz8PpQf0VfttpSYUQjgr1RYq9md4avVzbEK0vvJA7zygzU4SmsiQrTyW0Kv8QbFYXRiabDPVMcpjMAYLB0-7ZshzgiS7GLNaVX9ABWQ-7eBiZJaj8TQMutBslmVMDhmvyE0kLnjWGobDO0MV4pydP5xp3O7ZUrqdYrHCczt0H_yTX89Y_YEmNmg2oxlVPcT2J3THSEGna5UyqOlz_-DrBTOVDxWnDXdvNliFF9Cwbpp48X3ca016kJb4hanyeEzdUSSmoIBLBqZ5b3tYgEv5K5IBlPjawvwBb5Bj-V7QE=w1280-h720-no?authuser=0)

# hash를 이용한 URL 페이지 제어

- `hashchange` 이벤트를 이용해서, hash url 을 관리함.

## 용도

- `팝업` 이라던지, `사이드메뉴` 등의 현재 페이지에서 유일한 URL을 구현할 수 있는 방법중에 하나로 사용
- url hash를 이용하면 레이어가 동작한 후에 `back` 키를 눌렀을 경우, 페이지 리로딩을 하지 않기 때문에, 페이지의 URL을 고유하게 유지할 수 있다.

## 사용법

```javascript
const sideNavHandler = {
    open() {
        console.log('open');
    },
    
    close() {
        console.log('close');        
    }    
}

// Action : 해당 URL 진입시 동작
// Leave : 해당 URL 이탈시 동작
window['observeHash'].register({string: hashURL},{function: Action}, {function: Leave});

// sample
window['observeHash'].register('#openSideMenu', sideNavHandler.open, sideNavHandler.close);
```

## 소스코드

```javascript
(function( global ) {

    function hashChangeAction() {

        let route = global['observeHash']['route'];

        if (route[location.hash]) {

            route[location.hash].action.forEach(function( callback ) {
                callback();
            });

        }

        if(global['observeHash'].currentHash != location.hash) {

            if(route[global['observeHash'].currentHash]) {

                let leave = route[global['observeHash'].currentHash].leave;
                if(leave.length) {
                    leave.forEach(function( callback ) {
                        callback();
                    });
                }

            }
        }

        global['observeHash'].currentHash = location.hash;
    }

    if( 'observeHash' in global ) return;

    global['observeHash'] = {
        route: {},
        currentHash: null,
        register(url, callback, reset) {

            if(this.route[url]) {
                this.route[url].action.push(callback);
            } else {
                this.route[url] = {};
                this.route[url].action = [callback];
            }

            if (reset) {
                if(this.route[url].leave) {
                    this.route[url].leave.push(reset);
                } else {
                    this.route[url].leave = [reset];
                }

            }

            return this;
        },

        unregister() {

        },

        notify() {

        }

    };

    global.addEventListener('hashchange', hashChangeAction);
    global.addEventListener('load', hashChangeAction);

})(window);
```

