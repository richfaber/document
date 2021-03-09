# heroku 에서 git push heroku master 에러 나는 경우

```command
> git push heroku master

Username for 'https://git.heroku.com/':abcdef@abc.com
Password for 'https://git.heroku.com/':
remote: !       WARNING:
remote: !       Do not authenticate with username and password using git.
remote: !       Run 'heroku login' to update your credentials, then retry the git command.
remote: !       See documentation for details: https://devcenter.heroku.com/articles/git#http-git-authentication
fatal: Authentication failed for 'https://git.heroku.com/docker.git/'
```

제대로 입력을 했음에도 불구하고, 계속해서 Authentication failed 메세지가 나오면서 push를 거절하는 상황이다.

원인은 모르지만, 확실히 해결 되었다.

```command
> heroku auth:token
dkd383e6-2dj6-493f-123f-abcdefghijk

> git push heroku master
Username for 'https://git.heroku.com/':
Password for 'https://git.heroku.com/':dkd383e6-2dj6-493f-123f-abcdefghijk
....
```

위에 절차 대로 auth:token으로 나온 키코드를 복사해 두었다가, push 할때 Username을 엔터키로 비워둔채 넘어가고, Password 에 해당 코드를 붙여 넣으면, 제대로 push 된다.

이후엔 위에 절차 없이 ```git push heroku master``` 만으로 정상 push 확인이 되었다.

만세~


