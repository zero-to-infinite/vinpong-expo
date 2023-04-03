import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Home() {
  // 임시 상품 데이터
  const [products, setProducts] = useState([
    "상품 1",
    "상품 2",
    "상품 3",
    "상품 4",
    "상품 5",
  ]);

  // 임시 상점 데이터
  const [stores, setStores] = useState([
    "상점 1",
    "상점 2",
    "상점 3",
    "상점 4",
    "상점 5",
  ]);

  return (
    <View style={styles.container}>
      

      <View style={styles.footer}>
        <TouchableOpacity style={styles.menuIcon}>
          <Feather name="home" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcon}>
          <Feather name="search" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcon}>
          <Feather name="plus-circle" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcon}>
          <Feather name="message-square" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcon}>
          <FontAwesome name="user-circle-o" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

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

 

  footer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    backgroundColor: "#91B391",
    paddingBottom: 35,
    paddingTop: 15,
  },
});
