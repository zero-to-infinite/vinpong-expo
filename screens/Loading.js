import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View>
        <Text style={vvp.container}> Vintage Ping Pong </Text>
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
  }
});

const vvp = StyleSheet.create({
  container: {
    color:"#91B391",
    fontSize: 30, 
	  fontWeight: "600", // 폰트 두께는 600
  }
});
