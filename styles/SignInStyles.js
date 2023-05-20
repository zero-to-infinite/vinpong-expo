import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },

  header: {
    flexDirection: "row",
    backgroundColor: "#91B391",
    height: 100,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 2,
  },

  body: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
  },

  input: {
    flex: 1,
    borderRadius: 10,
    borderColor: "#91B391",
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 6,
  },

  textContainer: {
    width: 50,
    alignItems: "center",
  },

  signUpBtn: {
    backgroundColor: "#91B391",
    borderColor: "#91B391",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 50,
  },
});

export default styles;
