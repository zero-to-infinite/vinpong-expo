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
		      로그인
	      </Text>

      </TouchableOpacity>

      <TouchableOpacity >
        <Text style={stylesud.underline}>
		      회원가입
	      </Text>

      </TouchableOpacity>
      
      
    </View>
  );
}

const stylesud = StyleSheet.create({
  ///
  underline: {
    textDecorationLine: 'underline',
  },
});

const hhgy = StyleSheet.create({
  container: {
    color:"black",
    fontSize: 15, 
	  fontWeight: "600",
    
  }
});


const content = StyleSheet.create({
  container: {
    backgroundColor: '#91B391', 
	  borderRadius: 25, 
	  marginHorizontal: 20, 
	  marginBottom: 12, 
	  paddingHorizontal: 40, 
	  paddingVertical: 10, 
	  alignItems: "center", 
    marginTop: 250
  }
});



const login = StyleSheet.create({
  container: {
    color:"white",
    fontSize: 15, 
	  fontWeight: "600",
    marginTop: 1 
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
    marginTop: 200
  }
});
