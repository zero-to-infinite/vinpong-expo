import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

export default function SignUp({ navigation }) {
    
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [name, setName] = useState("");

  const [emailMessage, setEmailMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pwCheckMessage, setPwCheckMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");

  const signUp = () => {
    if (pw !== pwCheck) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      alert(`가입을 축하드립니다!\n이메일: ${email}\n비밀번호: ${pw}\n닉네임: ${name}`);
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.email}>
        <Text style={styles.text}>이메일</Text>
        <TextInput
          placeholder="이메일을 입력하세요."
          onChangeText={setEmail}
          value={email}
          style={styles.input}
        />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text}>인증 요청</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.auth}>
        <TextInput style={styles.input} />
        <Text style={styles.text}>4:39</Text>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text}>인증 확인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hr} />

      <View style={styles.pw}>
        <Text style={styles.text}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호를 입력하세요."
          secureTextEntry={true}
          onChangeText={setPw}
          value={pw}
          style={styles.input}
        />
      </View>

      <View style={styles.pw}>
        <Text style={styles.text}>비밀번호 확인</Text>
        <TextInput
          placeholder="비밀번호를 입력하세요."
          secureTextEntry={true}
          onChangeText={setPwCheck}
          value={pwCheck}
          style={styles.input}
        />
      </View>

      <View style={styles.hr} />

      <View style={styles.name}>
        <Text style={styles.text}>닉네임</Text>
        <TextInput
          placeholder="닉네임을 입력하세요."
          onChangeText={setName}
          value={name}
          style={styles.input}
        />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text}>중복 확인</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={signUp} style={styles.signUp}>
        <Text style={styles.text}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  email: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 5,
  },

  auth: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 5,
  },

  pw: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 5,
  },

  name: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 5,
  },

  input: {
    flex: 1,
    borderRadius: 10,
    borderColor: "#91B391",
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 5,
  },

  btn: {
    backgroundColor: "#91B391",
    borderColor: "#91B391",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },

  text: {
    marginHorizontal: 5,
  },

  signUp: {
    backgroundColor: "#91B391",
    borderColor: "#91B391",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },

  hr: {
    width: "90%",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
});
