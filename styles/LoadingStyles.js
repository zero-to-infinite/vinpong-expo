import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
  
    title: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  
    titleText: {
      color: "#91B391",
      fontSize: 40,
      fontWeight: "600",
    },
  
    footer: {
      marginBottom: 30,
      alignItems: "center",
    },
  
    login: {
      backgroundColor: "#91B391",
      paddingHorizontal: 35,
      paddingVertical: 15,
      borderRadius: 25,
    },
  
    loginText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
  
    signUpText: {
      textDecorationLine: "underline",
      marginTop: 10,
    },
  });
  

export default styles;