import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  /*
  const [emailMessage, setEmailMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pwCheckMessage, setPwCheckMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  */
  const signUp = () => {
    if (email == "") {
      alert("이메일은 필수 입력입니다!");
    } else if (pw == "") {
      alert("비밀번호는 필수 입력입니다!");
    } else if (pw !== pwCheck) {
      alert("비밀번호가 일치하지 않습니다.");
    } else if (name == "") {
      alert("닉네임은 필수 입력입니다!");
    } else {
      alert(
        `가입을 축하드립니다!\n이메일: ${email}\n비밀번호: ${pw}\n닉네임: ${name}`
      );
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.headerText}>Sign Up</Text>
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
          <TouchableOpacity style={styles.btn}>
            <Text>인증 요청</Text>
          </TouchableOpacity>
        </View>
        {/* 이메일 인증 코드 입력창 */}
        <View style={styles.form}>
          <TextInput style={styles.input} />
          <View style={styles.textContainer}>
            <Text>4:39</Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text>인증 확인</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hr} />

        {/* 비밀번호 입력창 */}
        <View style={styles.form}>
          <Text>비밀번호</Text>
          <TextInput
            placeholder="비밀번호를 입력하세요."
            secureTextEntry={true}
            onChangeText={setPw}
            value={pw}
            style={styles.input}
          />
        </View>
        {/* 비밀번호 확인 입력창 */}
        <View style={styles.form}>
          <Text>비밀번호 확인</Text>
          <TextInput
            placeholder="비밀번호를 입력하세요."
            secureTextEntry={true}
            onChangeText={setPwCheck}
            value={pwCheck}
            style={styles.input}
          />
        </View>

        <View style={styles.hr} />

        {/* 닉네임 입력창 */}
        <View style={styles.form}>
          <View style={styles.textContainer}>
            <Text>닉네임</Text>
          </View>
          <TextInput
            placeholder="닉네임을 입력하세요."
            onChangeText={setName}
            value={name}
            style={styles.input}
          />
          <TouchableOpacity style={styles.btn}>
            <Text>중복 확인</Text>
          </TouchableOpacity>
        </View>

        {/* 연락처 입력창 */}
        <View style={styles.form}>
          <View style={styles.textContainer}>
            <Text>연락처</Text>
          </View>
          <TextInput
            placeholder="휴대폰 번호를 입력하세요."
            onChangeText={setPhone}
            value={phone}
            style={styles.input}
          />
          <TouchableOpacity style={styles.btn}>
            <Text>인증 요청</Text>
          </TouchableOpacity>
        </View>

        {/* 주소 입력창 */}
        <View style={styles.form}>
          <View style={styles.textContainer}>
            <Text>주소</Text>
          </View>
          <TextInput
            placeholder="주소를 입력하세요."
            onChangeText={setAddress}
            value={address}
            style={styles.input}
          />
          <Feather name="search" size={24} color="#bbb" style={styles.icon} />
        </View>
      </View>

      <TouchableOpacity onPress={signUp} style={styles.signUpBtn}>
        <Text>회원가입</Text>
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

  btn: {
    backgroundColor: "#91B391",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 3,
  },

  textContainer: {
    width: 40,
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

  icon: {
    marginLeft: 5,
  },

  hr: {
    width: "90%",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
});
