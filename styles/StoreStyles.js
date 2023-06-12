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
  },

  infoBox: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 10,
  },

  userImage: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 80,
    width: 100,
    height: 100,
    marginVertical: 10,
  },

  gearIcon: {
    position: "absolute",
    top: "10%",
    right: 30,
  },

  userInfo: {
    //backgroundColor: "pink",
    flex: 1,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  storeInfo: {
    width: "50%",
    justifyContent: "center",
  },

  selectedItemsContainer: {
    //marginLeft: 5,
    marginBottom: 10,
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

  bioBox: {
    height: 45,
    borderColor: "#91B391",
    borderWidth: 1,
    borderRadius: 15,
    padding: 12,
    marginRight: 15,
  },

  storeText: {
    color: "black",
    fontWeight: "bold",
    paddingBottom: 10,
  },

  followBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 28,
  },

  follow: {
    flexDirection: "row",
  },

  followText: {
    fontWeight: "bold",
    paddingHorizontal: 5,
  },

  buttonBox: {
    flexDirection: "row",
  },

  nonClickedButton: {
    alignItems: "center",
    width: "50%",
    padding: 15,
    backgroundColor: "#91B391",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  clickedButton: {
    alignItems: "center",
    width: "50%",
    padding: 15,
    backgroundColor: "#669066",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  btnText: {
    fontWeight: "bold",
    color: "white",
  },

  itemBox: {
    flexWrap: "wrap",
    flexDirection: "row",
  },

  item: {
    justifyContent: "center",
    alignItems: "center",
    //borderWidth: 1,
    //borderColor: "white",
    //borderBottomColor: "black",
    //borderRightColor: "black",
    width: (SCREEN_WIDTH * 1) / 3,
    height: (SCREEN_WIDTH * 1) / 3,
  },
});

export default styles;
