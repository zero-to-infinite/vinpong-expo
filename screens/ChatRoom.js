import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, FlatList, Image } from "react-native";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar";
import styles from "../styles/ChatRoomStyles";
import { getChatRoom } from "../services/firestore_chat";
import { getUserInfo } from "../services/auth";

export default function ChatRoom({ navigation }) {
  const [chatRooms, setChatRooms] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userInfo = await getUserInfo();
        setName(userInfo.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchChatRoomData = async () => {
      const chatRoomData = await getChatRoom();
      setChatRooms(chatRoomData);
    };

    fetchChatRoomData();
  }, []);

  // 판매자 이름을 가져오는 함수
  const getOtherName = (userList) => {
    try {
      const other = userList.find((user) => user !== name); // name이 아닌 다른 값을 찾음
      return other;
    } catch (err) {
      console.log(err);
    }
  };

  // 채팅 목록을 보여주는 함수
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.chatContainer}
        onPress={() =>
          navigation.navigate("Chat", {
            other: getOtherName(item.participantName),
          })
        }
      >
        <Image style={styles.chatImage} source={{ uri: item.productImage }} />
        <View style={styles.chatInfoContainer}>
          <View style={styles.chatTitleContainer}>
            <Text
              style={styles.chatTitle}
              numberOfLines={1} // 보여질 최대 줄 수
              ellipsizeMode="tail" // 텍스트가 길어지면 ...으로 표시
            >
              {item.productName}
            </Text>
            <Text style={styles.chatName}>
              {getOtherName(item.participantName)}
            </Text>
          </View>
          <Text
            style={styles.chatLastMessage}
            numberOfLines={1} // 보여질 최대 줄 수
            ellipsizeMode="tail" // 텍스트가 길어지면 ...으로 표시
          >
            새로운 메시지
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
          data={chatRooms}
          renderItem={renderItem}
          keyExtractor={(item) => item.date}
        />
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
}
