
## 리액트 훅

- useContext: 공용 props 주입

- useState
- useReducer:

- useEffect: [] 마운트 될때만, [a,b] 변경될때마다, 없으면 맨날 실행, 브러우저 변경사항 반영
- useLayoutEffect: 리액트가 DOM 업데이트 전에 발생, 브라우저 변경전 발생, 동기적 발생(완료 할떄까지 hold됨)

- useRef: 템플릿 요소 집어오기
- ?useImperativeHandle: 주입된 ref 를 제어

- useMemo: 갱신제한 (기대값기준)
- ?useCallback: 갱신제한 (콜백기준)

- useLayoutEffect
- useDebugValue
- 커스텀 훅 만들기


## 라우터 훅

<Link />
<NavLink />
<Navigate />

- useParams
- useSearchParams
- useLocation
- useNavigate


## 기타

- useSWR
- React Query
- Redux / Mobx
