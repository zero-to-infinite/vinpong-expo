import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function TopBar({ navigation }) {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.topBarLeft}
      >
        <Icon name="angle-left" size={36} color="#91B391" />
      </TouchableOpacity>
      <View style={styles.topBarRight}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 15,
  },

  topBarLeft: {
    marginLeft: 5,
  },

  topBarRight: {
    flexDirection: "row",
  },

  topIcon: {
    padding: 4,
  },
});
