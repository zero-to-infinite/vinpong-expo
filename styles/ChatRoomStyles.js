import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
  
    header: {
      borderBottomWidth: 1,
      borderBottomColor: "lightgray",
      paddingBottom: 12,
    },
  
    body: {
      flex: 1,
      backgroundColor: "white",
      marginHorizontal: 10,
    },
  
    chatContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomColor: "lightgray",
      borderBottomWidth: 1,
    },
  
    chatImage: {
      backgroundColor: "#91B391", // 이미지 위치 확인 위해 임시로 배경색 지정
      width: 50,
      height: 50,
      borderRadius: 20,
      marginHorizontal: 16,
    },
  
    chatInfoContainer: {
      flex: 1,
      justifyContent: "center",
      marginLeft: 5,
    },
  
    chatTitleContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 4,
    },
  
    chatTitle: {
      flex: 1,
      fontWeight: "bold",
      fontSize: 16,
    },
  
    chatName: {
      color: "#999",
      marginRight: 18,
    },
  
    chatLastMessage: {
      color: "#666",
    },
  });
  

export default styles;