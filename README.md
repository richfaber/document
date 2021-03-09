# MarkDown Publish tool

## 소개

마크다운(md) 파일을 로컬에서 편집하고, 블로그에 포스팅 하는 도구. 

## 시작 하기

### 파일 복제 하기

```command
> git clone https://github.com/richfaber/markdown-puslish.git
```

### 개발 의존성 모듈 설치하기

```command
> npm install
```

### 프로그램 구동

```command
> npm run start
```

## 설명서

현재는 Viewer 만 구현되어 있습니다.  
`/view/` 에 파일을 복사하고, `http://localhost:3000/sample` 이라고 하면, 볼 수 있습니다.

## 주요 기능 (로드맵)

- 편집
- 미리보기
- 이미지 붙이기

## 버그 & 기능개선

- 블로그 포스팅 연동
- 이미지 클라우드 연동 (google photo)

## 서버

- [NodeJS](https://nodejs.org/ko/)
- [Express](https://expressjs.com/ko/)

## 의존성 모듈

### Server Side

- [nunjucks](https://mozilla.github.io/nunjucks/)
- [showdown](https://github.com/showdownjs/showdown)
- [directory-tree](https://github.com/mihneadb/node-directory-tree)

### Client Side

- [jQuery](https://code.jquery.com/)
- [font Awosome Free 4.7](https://fontawesome.com/v4.7.0)
- [Simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor)
