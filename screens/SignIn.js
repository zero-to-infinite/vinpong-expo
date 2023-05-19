import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const signIn = async () => {
    if (email == "") {
      alert("이메일은 필수 입력입니다!");
    } else if (pw == "") {
      alert("비밀번호는 필수 입력입니다!");
    } else {
      try {
        const curUser = await signInWithEmailAndPassword(
          FIREBASE_AUTH,
          email,
          pw
        );
        if (curUser) {
          alert("로그인 성공!");
          navigation.navigate("Home");
        }
      } catch (err) {
        if (
          err.code == "auth/invalid-email" ||
          err.code == "auth/wrong-password"
        ) {
          alert("이메일 혹은 패스워드가 일치하지 않습니다.");
        } else {
          alert("로그인 실패...");
        }
        console.log(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={34} color="white" />
        </TouchableOpacity>
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

      <TouchableOpacity onPress={signIn} style={styles.signUpBtn}>
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
    flexDirection: "row",
    backgroundColor: "#91B391",
    height: 100,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom:2,
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
