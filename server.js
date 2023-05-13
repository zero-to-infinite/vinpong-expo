const http = require('http');
const socketIO = require('socket.io');

// HTTP 서버 생성
const server = http.createServer();
const io = socketIO(server);

// 클라이언트가 연결될 때 처리할 이벤트
io.on('connection', (socket) => {
  console.log('클라이언트가 연결되었습니다.');

  // 클라이언트로부터의 메시지를 받았을 때 처리할 이벤트
  socket.on('message', (data) => {
    console.log('메시지 받음:', data);

    // 클라이언트에게 메시지를 다시 전송
    io.emit('message', data);
  });

  // 클라이언트와의 연결이 종료될 때 처리할 이벤트
  socket.on('disconnect', () => {
    console.log('클라이언트와의 연결이 종료되었습니다.');
  });
});

// 서버를 특정 포트에서 실행
const port = 3000;
server.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행중입니다.`);
});
