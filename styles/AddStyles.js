import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "space-between",
    },
  
    menuBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 50,
      marginHorizontal: 20,
    },
  
    menuIcon: {
      padding: 3,
    },
  
    menuText: {
      fontSize: 17,
    },
  
    body: {
      flex: 1,
      marginVertical: 20,
    },
  
    pic: {
      position: "relative", // 사진 삭제 버튼 겹치게 하기 위함
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 15,
      width: 200, // 항상 고정된 크기
      height: 200,
    },
  
    deletePic: {
      position: "absolute", // 부모 컴포넌트 내에서 절대적 위치 지정
      backgroundColor: "#91B391",
      borderColor: "#91B391",
      borderWidth: 1,
      borderRadius: 20,
      padding: 5,
      bottom: -10,
      right: -10,
    },
  
    inputBox: {
      width: "95%",
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 12,
    },
  
    labelBox: {
      alignItems: "center",
      width: 65,
    },
  
    input: {
      flex: 1,
      borderColor: "white",
      borderBottomColor: "black",
      borderWidth: 1,
      marginRight: 15,
    },
  
    inputAreaBox: {
      flex: 1, // 세로로 flexible
      width: "95%",
      flexDirection: "row",
      marginVertical: 12,
    },
  
    inputArea: {
      flex: 1,
      height: 180,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 10,
      marginRight: 10,
      padding: 5,
    },
  
    checkbox: {
      flex: 1,
      justifyContent: "space-evenly",
      alignItems: "center",
      flexWrap: "wrap",
    },
  
    addTagBtn: {
      backgroundColor: "#669066",
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 6,
    },
  
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  
    modalInner: {
      borderColor: "#91B391",
      borderWidth: 1,
      borderRadius: 20,
      backgroundColor: "white",
      width: 340,
    },
  
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#91B391",
      padding: 15,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
  
    selectedItemsContainer: {
      marginLeft: 5,
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
  
    footer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-evenly",
      backgroundColor: "#91B391",
      paddingBottom: 35,
      paddingTop: 15,
    },
  
    hr: {
      marginVertical: 10,
    },
  
    icon: {
      marginLeft: 5,
    },
  
    // 모달 안에 있는 태그들에 관한 스타일
    modalItemContainer: {
      padding: 30,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
  
    modalItem: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#777",
      margin: 5,
    },
  
    selectedModalItem: {
      backgroundColor: "#91B391",
      borderColor: "#91B391",
    },
  
    selectionText: {
      color: "black",
      alignSelf: "center",
      marginBottom: 20,
    },
  
    maxSelectionText: {
      color: "red",
      alignSelf: "center",
      marginBottom: 20,
    },
  });

  export default styles;