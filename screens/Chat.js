import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text,StyleSheet } from 'react-native';
import io from 'socket.io-client';

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 소켓 연결 설정
    const socket = io('http://192.168.35.157:3000'); // 실제 백엔드 서버 주소로 변경해야 함
    setSocket(socket);

    // 메시지 수신 이벤트 핸들러
    socket.on('message', (data) => {
      console.log('Received message:', data);
      // 받은 메시지도 화면에 표시하기 위해 메시지 배열 상태를 업데이트합니다.
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up 함수
    return () => {
      if (socket) {
        socket.disconnect(); // 컴포넌트 언마운트 시 소켓 연결 해제
      }
    };
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.content}</Text>
      </View>
    );
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return; // 빈 메시지는 전송하지 않음

    const message = {
      id: Date.now().toString(), // 메시지 고유 ID 생성
      content: inputText,
      sender: 'user', // 사용자 구분 값
    };

    socket.emit('sendMessage', message); // 상대방에게 메시지 전송

    // 받은 메시지도 화면에 표시하기 위해 메시지 배열 상태를 업데이트합니다.
    setMessages((prevMessages) => [...prevMessages, message]);

    setInputText(''); // 입력 필드 초기화
  };

  return (
    <View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="메시지 입력"
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messageList: {
    flex: 1,
    paddingTop: 16,
  },
  messageItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  messageBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  messageText: {
    fontSize: 16,
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#3370FF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default Chat;

