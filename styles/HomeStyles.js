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
    borderColor: "#669066",
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 100,
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
    width: (SCREEN_WIDTH - 40) * 0.3,
    height: (SCREEN_WIDTH - 40) * 0.3,
    margin: 3,
  },

  scrollIcon: {
    width: "10%",
    alignItems: "center",
  },

  weatherBox: {
    height: 100,
    width: "100%",
    //backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  weatherInner: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  weatherLeft: {
    height: 100,
    width: "27%",
    marginRight: "1%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A7BEDA",
    borderRadius: 15,
  },

  weatherRight: {
    height: 100,
    width: "70%",
    marginLeft: "1%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#A7BEDA",
    borderWidth: 1,
    borderRadius: 15,
  },

  city: {
    fontWeight: "bold",
    color: "white",
    fontSize: 12,
  },
  weather: {
    fontWeight: "bold",
    color: "white",
    fontSize: 12,
  },
  temp: {
    fontWeight: "bold",
    color: "white",
    fontSize: 28,
  },

  dressText: {
    color: "#777",
    marginTop: 7,
  },

  dressIcon: {
    fontSize: 38,
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
