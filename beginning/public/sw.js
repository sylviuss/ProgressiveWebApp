//app.js와 다른점 : 브라우저가 아닌 별도의 컨텍스트에서 동작(node js와 가깝다)
// sw : service worker..

var fileToCache = [
    '/',
    '/index.html',
    '/css/main.css'
]

//addEventListener는 Invoke 서비스가 아니라 특정 이벤트가 발생하면 반응하는 형태다
//아래 3개 이벤트는 필수(install&activate&fetch; 각 이벤트에 대응하는 코드 만들어줘야 함;콜백)
self.addEventListener('install', (event) => {
    console.log('install event generated..' + event)
    event.waitUntil( // 인스톨 이벤트 시작 전 발생하는 이벤트(캐싱)
        caches.open('rootCache')
            .then(caches => {
                console.log('Service Worker, Catching App Shell')
                return caches.addAll(fileToCache); //크롬검사 Application탭-Cache Storage에 추가됨
            })
    )
})

self.addEventListener('activate', (event) => {
    console.log('activate event generated..' + event)
})

//fetch = request+response, PWA의 필수 이벤트이다.
//모든 요청과 응답이 fetch 이벤트를 거침
self.addEventListener('fetch', (event) => {
    console.log('fetch event generated..' + event)
    event.respondWith(
        caches.match(event.request, {ignoreSearch:true}) //네트워크Site로 요청하기 전에 캐쉬에 있는지 확인(비동기로 이루어짐)
            .then(response => {
                return response || fetch(event.request) // OR 연산자 - 앞에것이 참이면 앞에것만 실행. 아래처럼 쓰지 않아도 됨
            // if(response){ //js에서 null은 undefined라고 나옴. 값 체크는 bool타입으로 이렇게 받는다
            //     return response
            // }else{
            //     return fetch(event)
            // }
        })
    )
})

