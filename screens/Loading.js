import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "../styles/LoadingStyles";

export default function Loading({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.title}
      >
        <Image
          style={styles.titleImg}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/vinpong-3a05c.appspot.com/o/title3.jpg?alt=media&token=79ad77ee-aa8d-4449-b21d-99ffcc468abf&_gl=1*xuh8sg*_ga*MjAzNjMwMTE2Mi4xNjgzODkxNjAx*_ga_CW55HF8NVT*MTY4NjUwNjUxOC40My4xLjE2ODY1MDcxOTIuMC4wLjA.",
          }}
        />
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signUpText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
