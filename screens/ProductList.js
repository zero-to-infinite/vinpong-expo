import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ProductList({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TopBar navigation={navigation} />

      <View style={styles.body}>
        <Text>추천 상품</Text>
        <ScrollView style={styles.itemBox}></ScrollView>
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  body: {
    flex: 1,
  },
});
