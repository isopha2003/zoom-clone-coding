const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);
// 브라우저에서 방금 만든 백엔드 서버로 실시간 연결을 요청하는 첫 번째 단계

socket.addEventListener("open", () => {
    console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from the Server");
});

function handleSubmit(event) {
    event.preventDefault(); // 웹 페이지의 새로고침 방지
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);