import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { FIRESTORE_DB } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.headerText}>Sign In</Text>
      </View>

      <View style={styles.body}>
        {/* 이메일 입력창 */}
        <View style={styles.form}>
          <View style={styles.textContainer}>
            <Text>이메일</Text>
          </View>
          <TextInput
            placeholder="이메일을 입력하세요."
            onChangeText={setEmail}
            value={email}
            style={styles.input}
          />
        </View>

        {/* 비밀번호 입력창 */}
        <View style={styles.form}>
          <View style={styles.textContainer}>
            <Text>비밀번호</Text>
          </View>
          <TextInput
            placeholder="비밀번호를 입력하세요."
            secureTextEntry={true}
            onChangeText={setPw}
            value={pw}
            style={styles.input}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.signUpBtn}
      >
        <Text>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },

  header: {
    backgroundColor: "#91B391",
    height: 100,
    width: "100%",
    justifyContent: "flex-end",
  },

  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 15,
  },

  body: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
  },

  input: {
    flex: 1,
    borderRadius: 10,
    borderColor: "#91B391",
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 6,
  },

  textContainer: {
    width: 50,
    alignItems: "center",
  },

  signUpBtn: {
    backgroundColor: "#91B391",
    borderColor: "#91B391",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 50,
  },
});
