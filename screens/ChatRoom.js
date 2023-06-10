import React, { useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import io from "socket.io-client";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar";
import styles from "../styles/ChatRoomStyles";

const DATA = [
  {
    id: "1",
    name: "김철수",
    product: {
      id: "p1",
      //image: require('/Images/product1.png'),
      title: "초코파이 팝니다.",
    },
    lastMessage: "배송 언제 해주나요?",
  },
  {
    id: "2",
    name: "이영희",
    product: {
      id: "p2",
      //image: require('./Images/product2.png'),
      title: "빵 몇 개 팔아요.",
    },
    lastMessage: "택배비 누가 부담합니까?",
  },
  {
    id: "3",
    name: "박민수",
    product: {
      id: "p3",
      //image: require('./Images/product3.png'),
      title: "자전거 팔아요.",
    },
    lastMessage: "상태 어떤가요?",
  },
  {
    id: "4",
    name: "홍길동",
    product: {
      id: "p4",
      //image: require('./Images/product4.png'),
      title: "의자 팝니다.",
    },
    lastMessage: "가격 어떻게 되나요?",
  },
];

export default function ChatRoom({ navigation }) {
  /** 채팅 기능 구현 부분 */
  useEffect(() => {
    // 소켓 연결 설정
    const socket = io("http://localhost:3000"); // 실제 백엔드 서버 주소로 변경해야 함

    // 메시지 수신 이벤트 핸들러
    socket.on("message", (data) => {
      console.log("Received message:", data);
      // TODO: 메시지를 적절히 처리하고 화면에 표시하는 로직을 구현합니다.
    });

    // 메시지 전송 함수
    const sendMessage = (message) => {
      socket.emit("message", message);
    };

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      socket.disconnect();
    };
  }, []);
  /** 지원 담당 */

  // 채팅 목록을 보여주는 함수
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.chatContainer}
        onPress={() => navigation.navigate("Chat")}
      >
        <Image
          style={styles.chatImage} //source={require('./Images/product1.png')}
        />
        <View style={styles.chatInfoContainer}>
          <View style={styles.chatTitleContainer}>
            <Text
              style={styles.chatTitle}
              numberOfLines={1} // 보여질 최대 줄 수
              ellipsizeMode="tail" // 텍스트가 길어지면 ...으로 표시
            >
              {item.product.title}
            </Text>
            <Text style={styles.chatName}>{item.name}</Text>
          </View>
          <Text
            style={styles.chatLastMessage}
            numberOfLines={1} // 보여질 최대 줄 수
            ellipsizeMode="tail" // 텍스트가 길어지면 ...으로 표시
          >
            {item.lastMessage}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TopBar navigation={navigation} />
      </View>

      <View style={styles.body}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
}