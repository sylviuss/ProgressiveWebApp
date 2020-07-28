
console.log('안녕하세요');


//서비스 워커를 등록하는 작업..
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
        .then(() => {
            console.log('service worker registered')
        })
        .catch((err)=>{
            console.log('registration failed...'+err)
        })
    console.log('end of code..')
    //비동기 식이라서 7번 으로 워커 등록되고 9번 로그찍은 다음 8번 then()이 실행됨

}
//js는 기본적으로 모두 비동기식이라 속도가 느린게 단점(지금은 성능 이슈가 적다)