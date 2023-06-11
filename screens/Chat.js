import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
} from "react-native";
import { sendMsg } from "../services/firestore_chat";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import { FIRESTORE_DB } from "../firebaseConfig";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function Chat({ navigation, route }) {
  const [messages, setMessages] = useState([]); // 채팅 메시지 리스트
  const [inputText, setInputText] = useState(""); // 입력란의 텍스트

  // DB에서 메시지 가져오기
  const getMsg = () => {
    const messageRef = collection(
      FIRESTORE_DB,
      `ChatRoom/${route.params.roomId}/Message`
    );
    const q = query(messageRef, orderBy("date"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const msgs = [];
        querySnapshot.forEach((doc) => msgs.push(doc.data()));
        setMessages(msgs);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    getMsg();
  }, []);

  // 메시지 전송 함수
  const send = async () => {
    try {
      await sendMsg(route.params.roomId, inputText);
      Keyboard.dismiss();
      setInputText("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBackBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="angle-left" size={36} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{route.params.other}</Text>
      </View>

      {/* 대화 내역이 보이는 공간 */}
      <ScrollView>
        <View style={styles.chatInfo}>
          <Image
            style={styles.chatImage}
            source={{ uri: route.params.productImage }}
          />
          <Text style={styles.chatText}>{route.params.productName}</Text>
        </View>

        <View style={styles.messageContainer}>
          {messages.map((value, key) => (
            <View
              key={key}
              style={
                value.fromName !== route.params.other
                  ? styles.myMessage
                  : styles.otherMessage
              }
            >
              <Text
                style={
                  value.fromName !== route.params.other
                    ? styles.myMessageText
                    : styles.otherMessageText
                }
              >
                {value.content}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            returnKeyType="done"
            onChangeText={setInputText}
            placeholder="메시지를 입력하세요."
            blurOnSubmit={true}
            onSubmitEditing={send}
          />

          <TouchableOpacity onPress={send} style={styles.sendBtn}>
            <Text style={styles.sendBtnText}>전송</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.hr}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  goBackButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  header: {
    backgroundColor: "#91B391",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 53,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },

  headerText: {
    flex: 1, // 이름 부분이 가운데로 정렬되도록 flex 속성 추가
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  messageContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    //alignItems: "flex-end",
  },

  myMessage: {
    backgroundColor: "#91B391",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#91B391",
    marginBottom: 10,
    alignSelf: "flex-end",
  },

  otherMessage: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: "#91B391",
    borderWidth: 1,
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  myMessageText: {
    fontWeight: "600",
    color: "white",
  },

  otherMessageText: {
    fontWeight: "600",
    color: "#91B391",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },

  input: {
    flex: 1,
    height: 40,
    borderColor: "#91B391",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 10,
  },

  sendBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  sendBtn: {
    backgroundColor: "#91B391",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },

  chatInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },

  chatImage: {
    backgroundColor: "#91B391", // 이미지 위치 확인 위해 임시로 배경색 지정
    width: 60,
    height: 60,
    borderRadius: 15,
    marginLeft: 25,
    marginRight: 20,
  },

  chatText: {
    fontWeight: "bold",
  },

  hr: {
    height: 30,
  },
});
