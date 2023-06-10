import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
  
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#91B391",
      borderRadius: 30,
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginHorizontal: 20,
      marginTop: 60,
      marginBottom: 15,
    },
  
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: "white",
      marginLeft: 10,
    },
  
    icon: {
      marginLeft: 5,
    },
  
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 20,
    },
  
    button: {
      alignItems: "center",
      width: "50%",
      padding: 15,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      backgroundColor: "#91B391",
    },
  
    selectedButton: {
      backgroundColor: "#669066",
    },
  
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
  
    optionsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: "#91B391",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      marginHorizontal: 20,
      marginBottom: 10,
      padding: 20,
    },
  
    option: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#777",
      margin: 5,
    },
  
    selectedOption: {
      backgroundColor: "#91B391",
      borderColor: "#91B391",
    },
  
    selectedItemsContainer: {
      marginLeft: 20,
      marginBottom: 20,
    },
  
    selectedItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      backgroundColor: "#91B391",
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginHorizontal: 5,
    },
  
    selectedItemText: {
      color: "black",
    },
  
    popularContainer: {
      margin: 20,
    },
  
    popularTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
    },
  
    popularItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    },
  
    popularRank: {
      marginRight: 10,
      color: "#777",
    },
  
    popularName: {
      color: "#777",
    },
  });
  

export default styles;