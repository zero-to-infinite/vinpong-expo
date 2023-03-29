import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Loading() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View>
        <Text style={vvp.container}> Vintage Ping Pong </Text>
      </View>

      <TouchableOpacity style={content.container}>
	      <Text style={login.container}>
		      login
	      </Text>

      </TouchableOpacity>

      
      
    </View>
  );
}

const content = StyleSheet.create({
  container: {
    backgroundColor: '#91B391', 
	  borderRadius: 25, // 테두리를 둥글게 만드는 속성(숫자가 클수록 타원에 가까워짐)
	  marginHorizontal: 20, 
	  marginBottom: 12, 
	  paddingHorizontal: 40, //좌우 길이
	  paddingVertical: 10, 
	  alignItems: "center", 
  }
});

const login = StyleSheet.create({
  container: {
    color:"white",
    fontSize: 15, 
	  fontWeight: "600", 
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  }
});

const vvp = StyleSheet.create({
  container: {
    color:"#91B391",
    fontSize: 40, 
	  fontWeight: "600", 
  }
});
