import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function BottomNav({ navigation }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.menuIcon}
      >
        <Feather name="home" size={28} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
        style={styles.menuIcon}
      >
        <Feather name="search" size={28} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Add")}
        style={styles.menuIcon}
      >
        <Feather name="plus-circle" size={28} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("ChatRoom")}
        style={styles.menuIcon}
      >
        <Feather name="message-square" size={28} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Store")}
        style={styles.menuIcon}
      >
        <FontAwesome name="user-circle-o" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    backgroundColor: "#91B391",
    paddingBottom: 35,
    paddingTop: 15,
  },

  menuIcon: {
    padding: 3,
  },
});
