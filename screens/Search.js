import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function Search({ }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="검색어를 입력하세요"
        />
        <Feather name="search" size={24} color="#777" style={styles.icon} />
      </View>

      
    </View>
  );
}

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
    marginTop: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  icon: {
    marginLeft: 5,
  },

  // 이하 생략
});