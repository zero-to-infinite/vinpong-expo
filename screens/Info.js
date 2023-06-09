import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Info() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View>
        <Text>
          로그아웃, 프로필 사진 변경, 닉네임 변경, 소개, 스타일 등을 지정하는 화면을 만들 것임..</Text>
        <Text>프로필 관리 화면~~</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
