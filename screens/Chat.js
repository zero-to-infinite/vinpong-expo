import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Chat({ navigation, route }) {
  const [messages, setMessages] = useState(["안녕!", "응 안녕?"]); // 채팅 메시지 리스트
  const [inputText, setInputText] = useState(""); // 입력란의 텍스트

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
      <View style={styles.messageContainer}>
        {messages.map((value, key) => (
          <View key={key} style={styles.message}>
            <Text style={styles.myMessageText}>{value}</Text>
          </View>
        ))}
      </View>

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
          />

          <TouchableOpacity style={styles.sendBtn}>
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
    alignItems: "flex-end",
  },

  message: {
    backgroundColor: "#91B391",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 10,
  },

  myMessageText: {
    fontWeight: "600",
    color: "white",
  },

  otherMessageText: {
    fontWeight: "bold",
    color: "black",
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

  hr: {
    height: 30,
  },
});
