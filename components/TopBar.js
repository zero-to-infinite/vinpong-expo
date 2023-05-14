import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function TopBar({ navigation }) {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
        style={styles.topIcon}
      >
        <Icon name="search" size={26} color="#91B391" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.topIcon}>
        <Icon name="bell" size={26} color="#91B391" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.topIcon}>
        <Icon name="shopping-basket" size={26} color="#91B391" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 50,
    marginRight: 10,
  },

  topIcon: {
    padding: 3,
  },
});
