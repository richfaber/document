# Project Manager

현재 폴더를 열고 메뉴에 있는 `작업영역을 다른 이름으로 저장` 메뉴로 저장을 하고 나면, 다음에 생성된 파일을 열어서 작업영역을 복원할 수 있다. 

이 플러그인은 좌측에 `Activity Bar` 를 생성해서 관리를 도와주는 플러그인 이다. 기존에 바탕화면에 프로젝트 파일이 무수히 생기고 있었는데, 통합관리 되서 편리하게 작업을 할 수 있게 되었다.

**플러그인 주소** : [https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager](Project Manager)

**업데이트** : 	2018. 7. 5.

## 기본 명령어

기본제공 명령은 간단하다. 현재폴더를 새로 저장하거나, 저장된 목록을 보거나, 새창으로 열거나, 수동으로 수정하거나 정도이다.

- Project Manager > Save Project : 현재 폴더를 새 프로젝트로 저장
- Project Manager > Edit Project : 수동으로 프로젝트 수정 (projects.json)
- Project Manager > List Projects to Open : 저장된/감지된 모든 프로젝트를 나열하고, 하나를 선택하십시오.
- Project Manager > List Projects to Open in New Window : 저장된/감지된 프로젝트를 모두 나열하고 새 창에서 열어 볼 프로젝트를 선택하십시오.
- Project Manager > Refresh Projects : 캐시된 프로젝트 새로 고침

## 시작하기

플러그인을 설치하고 나면 처음으로 해야 할 것이 `Edit Project` 이다. 이 파일을 수정해야 `Activity Bar` 도 나타난다.

`control + p` 를 입력하고 `> Project Manager: Edit Projects` 를 선택하자. 그럼 `projects.json` 파일이 열리게 된다.
![1](https://lh3.googleusercontent.com/-BjvJDlP8lWo/W5T9XnQcRdI/AAAAAAAAUxc/NUwhuGe-7O0GZjFx4cq3tZCD6VTIpjLYQCHMYCw/I/1.gif)

그러면 우측 하단에 설정된 프로젝트가 없다는 메시지와 함께 수정을 할 것인가를 묻는 대화창이 생긴다. 
![0](https://lh3.googleusercontent.com/-1fNwuyruiBw/W5T6_saKKnI/AAAAAAAAUwE/425dXvcoZucaWXlGm4dyvct-mNaE6z5NACHMYCw/I/0.gif)

클릭하면 샘플 JSON 파일이 열린다.

```json
[
	{
		"name": "Project Name",
		"rootPath": "Root Path",
		"paths": [],
		"group": ""
	}
]
```

아래와 같이 프로젝트 이름과 상위폴더를 기입하였다. `\` 같은 특수문자는 앞에 `\`를 추가해 주자.

```json
[
	{
		"name": "MARKDOWN Document",
		"rootPath": "C:\\Users\\richr\\Dropbox\\[00.Document]",
		"paths": [],
		"group": ""
	}
]
```

수정하고 나면 `Activity Bar` 가 생겨나고 클릭하면 나의 설정이 반영된 것을 확인할 수 있다.
(참고로 마지막에 자동으로 생기는 액티비티바를 제일 위로 드래그 해서 옮겼음.)
![2](https://lh3.googleusercontent.com/-UElseyF7bT8/W5T7ESniL6I/AAAAAAAAUwI/q2GkRilVMNozBd6MMAcwlJw8MzzLY-3OACHMYCw/I/2.gif)

이렇게 몇개를 등록하면 목록이 추가된다.

```json
[
	{
		"name": "MARKDOWN Document",
		"rootPath": "C:\\Users\\richr\\Dropbox\\[00.Document]",
		"paths": [],
		"group": ""
	},
	{
		"name": "Repository GIT",
		"rootPath": "C:\\Users\\richr\\repository\\github",
		"paths": [],
		"group": ""
	}
]
```
![3](https://lh3.googleusercontent.com/-2ITDr5NLDMI/W5T7IQwjM5I/AAAAAAAAUwM/7yowJTEB-S02TEJFRN_yX2vDGy16KbPWwCHMYCw/I/3.gif)

이렇게 추가된 목록을 선택하면 `탐색기` 바에 루트폴더가 표시되고, 최근까지 수정하던 파일들 까지 자동으로 열어준다. 선택 시 새창으로 열리는 것이 아니라는 것을 참고하자.
![4](https://lh3.googleusercontent.com/-tMb8QWuFQNc/W5T7LiK2NsI/AAAAAAAAUwQ/yBNl3Y3HOBk9OtJJAShebB3_C6rlKZ-DACHMYCw/I/4.gif)

> 새창을 열기 위해선 `Control + P` 하고 `> Project Manager > List Projects to Open in New Window` 를 선택하면 목록이 나오게 되고, 선택하면 새창으로 열린다.

`rootPath` 에 시스템 환경변수를 사용할 수 있다. `$home` 은 나의 홈폴더를 나타내기 때문에 아래와 같이 수정이 가능하다.

```json
[
	{
		"name": "MARKDOWN Document",
		"rootPath": "C:\\Users\\richr\\Dropbox\\[00.Document]",
		"paths": [],
		"group": ""
	},
	{
		"name": "Repository GIT",
		"rootPath": "$home\\repository\\github",
		"paths": [],
		"group": ""
	}
]
```

> 주의할 점은 이렇게 프로젝트가 로딩된 상태에서, `파일 > 작업영역에 폴더추가` 를 해서 폴더가 추가되면, 프로젝트 상태가 풀린다.
> `파일 > 폴더 닫기` 를 선택해도 프로젝트 상태가 풀린다.

### paths, group

- paths: "rootPath"에 지정되어 있는 `$home` 에 대한 경로를 참조한다. 만약 지정되어 있다면 `$home` 경로가 시스템변수를 참조하지 않는다. (해봤는데 안됨 -_-;;)
- group: 프로젝트 목록을 그룹별로 보여주는 옵션 설정시에 그룹명을 참조.

## 현재 열려있는 폴더와 작업파일을 저장

프로젝트를 닫는 명령이 따로 없기 때문에, `파일 > 폴더 닫기` 를 하고 나서 새롭게 폴더를 추가하고 실시간 저장을 해보자.
![6](https://lh3.googleusercontent.com/-WTvjAcZ1irg/W5T7QfY3GHI/AAAAAAAAUwU/CQlakHB_wHoDCaZvALwcFZNa26NsOUdlwCHMYCw/I/6.gif)

`파일 > 작업영역에 폴더 추가` 를 해서 임의의 원드라이브 폴더를 추가 하고, 테스트 파일을 하나 열었다.
![7](https://lh3.googleusercontent.com/-0kUPmyR7wV4/W5T7TvwUDFI/AAAAAAAAUwY/_N99FSH4DLYFhA0Zwu5MRwnbHk70xRiIACHMYCw/I/7.gif)

이 상태에서 `Control + p` 하고 `> Project Manager > Save Project` 를 선택하면, 자동으로 추천키워드 입력이 나온다.
![8](https://lh3.googleusercontent.com/-6FUhemXDzP0/W5T7XMxRDzI/AAAAAAAAUwg/ePJAekA-DmAMDEXvWrWu1QWNuh7UzC6EACHMYCw/I/8.gif)
![9](https://lh3.googleusercontent.com/-WAAo91Ecl8A/W5T7b--tl1I/AAAAAAAAUws/po-WQe8_oBEBnHGxPxwpZrDccBofGpWjACHMYCw/I/9.gif)

이름 입력까지 끝나면 우측 하단에 잘 저장되었다는 메세지가 나온다.
![10](https://lh3.googleusercontent.com/-Ib9cKdRZXpE/W5T7fHHKhYI/AAAAAAAAUww/0cIKT31ZqJYZzI0MPUax1xCxyQ0En6N3gCHMYCw/I/10.gif)

이제 `Activity Bar` 로 돌아가면 정상적으로 추가되어 있음을 확인할 수 있고, `projects.json` 파일에도 설정이 들어가 있는 것을 확인할 수 있다.
 
 ![11](https://lh3.googleusercontent.com/-_eUDDElW_4E/W5T7iQZG6SI/AAAAAAAAUw0/E4Pg7BHtmvo0oe5RN4TOHv5mc1GRRukdgCHMYCw/I/11.gif)

## 기타옵션

아래는 비쥬얼코드에 기본설정에 옵션을 설정하는 방법이다.
![5](https://lh3.googleusercontent.com/-YqLeGwX2tMA/W5T7p9Ola8I/AAAAAAAAUxA/Z8IJcmGr1lI0IPiXh_OH2FFo4sZjBFbpgCHMYCw/I/5.gif)

> "projectManager.sortList": "Name"

프로젝트 정렬방법을 설정할 수 있다.

- Saved: 프로젝트를 저장 한 순서
- Name: 프로젝트에 입력 한 이름
- Path: 프로젝트의 전체 경로
- Recent: 최근 사용 된 프로젝트


> "projectManager.groupList": true

프로젝트 목록을 종류(즐겨 찾기, VS 코드, Git, Mercurial 및 SVN)별로 그룹화 해서 보여줄 것인지를 선택.


> "projectManager.removeCurrentProjectFromList": true

현재 열려있는 프로젝트를 목록에서 숨기고 보여줄 것인지를 결정 (false 기본)


> "projectManager.checkInvalidPathsBeforeListing": false

프로젝트 목록에서 잘못된 경로를 식별할 것인지를 결정 (true 기본)


> "projectManager.filterOnFullPath": true    

전체 경로를 통해 프로젝트 필터링 (false기본)


> "projectManager.projectsLocation": "C\\Users\\myUser\\AppData\\Roaming\\Code\\User"

프로젝트 설정 파일 경로 (projects.json)
Stable 및 Insider 설치 간에 프로젝트를 공유 하려는 경우 또는 다른 위치 (클라우드 서비스)에 설정을 저장 하는 경우 파일의 대체 위치를 나타낼 수 있습니다


> "projectManager.git.baseFolders": [
>	"c:\\Projects\\code",
>	"d:\\MoreProjects\\code-testing",
>	"$home\\personal-coding"
> ]

프로젝트 자동 감지 (VSCode vscode, Git 자식, Mercurial 자식 및 SVN svn)
프로젝트가 포함 된 폴더를 정의하십시오.


> "projectManager.git.ignoredFolders": [
> 	"node_modules", 
> 	"out", 
> 	"typings", 
> 	"test"
> ],

무시할 폴더 정의 (BaseFolders 내부)


> "projectManager.git.maxDepthRecursion": 4

프로젝트 검색의 깊이 정의


> "projectManager.cacheProjectsBetweenSessions": false

자동으로 감지 된 프로젝트 캐시 (true기본)


> "projectManager.showProjectNameInStatusBar": true

상태 표시 줄에 프로젝트 이름 표시 (true기본)


> "projectManager.openInNewWindowWhenClickingInStatusBar": true

상태 표시줄을 클릭하면 새창에 프로젝트가 열립니다 (false기본).


