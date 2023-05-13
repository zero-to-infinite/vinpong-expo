import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { io } from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]); // 채팅 메시지 배열
  const [inputText, setInputText] = useState(''); // 입력 필드의 텍스트
  const navigation = useNavigation();

  // 웹소켓 클라이언트 생성 및 서버에 연결
  useEffect(() => {
    const socket = io('http://localhost:3000'); // 서버의 주소로 수정해야 함

    // 메시지 수신 이벤트 핸들러
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      socket.disconnect();
    };
  }, []);

  // 메시지 전송 함수
  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const message = {
      id: Date.now().toString(),
      content: inputText,
      sender: 'user',
    };

    // 메시지 서버로 전송
    socket.emit('message', message);

    setMessages((prevMessages) => [...prevMessages, message]);
    setInputText('');
  };

  // 메시지 아이템 렌더링 함수
  const renderMessageItem = ({ item }) => {
    return (
      <View style={styles.messageItem}>
        <Text style={item.sender === 'user' ? styles.userMessageText : styles.otherMessageText}>
          {item.content}
        </Text>
      </View>
    );
  };

  // 뒤로가기 버튼 핸들러
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>상대방 이름</Text>
        <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.messageListContainer}>
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="메시지를 입력하세요..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
        <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  goBackButton: {
  
  },
  goBackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    height: 60,
    backgroundColor: '#91B391',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 공간을 균등하게 분배
    paddingHorizontal: 16,
    marginTop: 30,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // 이름 부분이 가운데로 정렬되도록 flex 속성 추가
  },
  messageListContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messageItem: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  userMessageText: {
    color: '#000',
  },
  otherMessageText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sendButton: {
    backgroundColor: '#91B391',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
});

export default Chat;
