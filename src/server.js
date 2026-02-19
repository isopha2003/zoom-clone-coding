import http from "http"; // Node.js 기본 HTTP 서버 모듈
import express from "express"; // 웹 프레임워크
import WebSocket from "ws"; // 웹소켓 라이브러리

const app = express(); 
app.set("view engine", "pug"); // 뷰 엔진으로 pug 사용
app.set("views", __dirname + "/views"); // 템플릿 파일 위치 설정
app.use("/public", express.static(__dirname + "/public")); // 정적 파일(JS, CSS) 경로 설정
// 사용자에게 보여줄 화면(UI)과 정적 파일들을 어떻게 처리할지 정의

app.get("/", (_, res) => res.render("home")); 
// 사용자가 http://localhost:3000/에 접속하면 home.pug 파일을 그러셔(render) 보여줌

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// 서버 통합
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
// server 라는 변수에 HTTP와 WebSocket이 모두 담겨 있음
// 이렇게 하면 3000번 포트 하나로 웹 사이트 접속(HTTP)과 실시간 통신(WS)을 동시에 할 수 있음

wss.on("connection", (socket) => {
    console.log("Connected to Browser");
    socket.on("close", () => {
        console.log("Disconnected from the Browser");
    });
    socket.on("message", (message) => {
        console.log(message.toString("utf-8"));
    })
    socket.send("hello");
});
// 새로운 클라이언트가 웹소켓 연결을 시도해서 성공하면 함수를 실행

server.listen(3000, handleListen);