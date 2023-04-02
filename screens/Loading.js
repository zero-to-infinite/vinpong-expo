import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Loading({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View>
        <Text style={styles.vvp}> Vintage Ping Pong </Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.content}>
	      <Text style={styles.login}>
		      로그인
	      </Text>

      </TouchableOpacity>

      <TouchableOpacity >
        <Text style={styles.underline}>
		      회원가입
	      </Text>

      </TouchableOpacity>
      
      
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
  underline: {
    textDecorationLine: 'underline',
  },
  hhgy: {
    color:"black",
    fontSize: 15, 
	  fontWeight: "600",
    
  },
  content: {
    backgroundColor: '#91B391', 
	  borderRadius: 25, 
	  marginHorizontal: 20, 
	  marginBottom: 12, 
	  paddingHorizontal: 40, 
	  paddingVertical: 10, 
	  alignItems: "center", 
    marginTop: 250
  },
  login: {
    color:"white",
    fontSize: 15, 
	  fontWeight: "600",
    marginTop: 1 
  },
  vvp: {
    color:"#91B391",
    fontSize: 40, 
	  fontWeight: "600",
    marginTop: 200
  }


});








