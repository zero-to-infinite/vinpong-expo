import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { signUp } from "../services/auth";
import styles from "../styles/SignUpStyles";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  // 회원가입 버튼 누를 시 동작하는 함수
  const handleSignUp = () => {
    signUp(email, pw, pwCheck, name, phone, address, navigation);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={34} color="white" />
        </TouchableOpacity>
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

      <TouchableOpacity onPress={handleSignUp} style={styles.signUpBtn}>
        <Text>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}