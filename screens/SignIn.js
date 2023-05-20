import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { signIn } from "../services/auth";
import styles from "../styles/SignInStyles";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  // 로그인 버튼 누를 시 동작하는 함수
  const handleSignIn = () => {
    signIn(email, pw, navigation);
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

      <TouchableOpacity onPress={handleSignIn} style={styles.signUpBtn}>
        <Text>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}
