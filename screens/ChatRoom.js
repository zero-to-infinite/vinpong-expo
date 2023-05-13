import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FlatList, Image } from "react-native";
import io from "socket.io-client";
import { useEffect } from "react";

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

const ChatRoom = ({ navigation }) => {
  useEffect(() => {
    // 소켓 연결 설정
    const socket = io("YOUR_BACKEND_SERVER_URL");

    // 메시지 수신 이벤트 핸들러
    socket.on("chatMessage", (message) => {
      console.log("Received message:", message);
      // TODO: 받은 메시지를 적절히 처리하는 로직을 구현
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      socket.disconnect();
    };
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate("Chat")}
      >
        <Image
          style={styles.itemImage} //source={require('./Images/product1.png')}
        />
        <View style={styles.itemInfoContainer}>
          <View style={styles.itemTitleContainer}>
            <Text
              style={styles.itemTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.product.title}
            </Text>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
          <Text
            style={styles.itemLastMessage}
            numberOfLines={1}
            ellipsizeMode="tail"
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
        <Icon name="search" size={24} color="#fff" />
        <Icon name="bell" size={24} color="#fff" />
        <Icon name="shopping-basket" size={24} color="#fff" />
      </View>
      <View style={styles.chatList}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    backgroundColor: "#91B391",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    marginTop: 30,
  },
  chatList: {
    flex: 1,
    backgroundColor: "##91B391",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: "#d9d9d9",
    borderBottomWidth: 1,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  itemInfoContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 16,
  },
  itemTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 4,
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    color: "#999",
  },
  itemLastMessage: {
    color: "#666",
  },
});
