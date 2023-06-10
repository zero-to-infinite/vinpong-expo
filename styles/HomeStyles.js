import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
  
    menuBar: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 50,
      marginRight: 10,
    },
  
    menuIcon: {
      padding: 3,
    },
  
    body: {
      flex: 1,
      marginHorizontal: 10,
      marginVertical: 12,
    },
  
    bodyText: {
      alignSelf: "flex-start",
      marginTop: 20,
      marginBottom: 5,
      marginLeft: 10,
    },
  
    banner: {
      alignItems: "center",
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 25,
      paddingVertical: 60,
    },
  
    productContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
  
    product: {
      justifyContent: "center",
      alignItems: "center",
      borderColor: "white",
      borderWidth: 1,
      borderRadius: 15,
      width: (SCREEN_WIDTH - 38) * 0.3,
      height: (SCREEN_WIDTH - 38) * 0.3,
      margin: 3,
    },
  
    scrollIcon: {
      width: "10%",
      alignItems: "center",
    },
  
    footer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-evenly",
      backgroundColor: "#91B391",
      paddingBottom: 35,
      paddingTop: 15,
    },
  });
  

export default styles;