import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Search() {
  const [isStyleOpen, setIsStyleOpen] = useState(true); // 스타일 버튼이 선택된 상태로 시작
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const stylesList = ["Casual", "Formal", "Sports", "Vintage"];
  const categoryList = ["전체", "상의", "하의", "신발", "악세사리"];

  const handleStylePress = () => {
    setIsStyleOpen(true);
    setIsCategoryOpen(false);
  };

  const handleCategoryPress = () => {
    setIsCategoryOpen(true);
    setIsStyleOpen(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />

      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="검색어를 입력하세요" />
        <Feather name="search" size={24} color="#777" style={styles.icon} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, isStyleOpen && styles.selectedButton]} onPress={handleStylePress}>
          <Text style={styles.buttonText}>Style</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, isCategoryOpen && styles.selectedButton]} onPress={handleCategoryPress}>
          <Text style={styles.buttonText}>Category</Text>
        </TouchableOpacity>
      </View>

      {isStyleOpen && (
        <View style={styles.options}>
          {stylesList.map((style, index) => (
            <TouchableOpacity key={index} style={styles.option}>
              <Text>{style}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {isCategoryOpen && (
        <View style={styles.options}>
          {categoryList.map((category, index) => (
            <TouchableOpacity key={index} style={styles.option}>
              <Text>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    fontWeight: "bold",
  },
  options: {
    flexDirection: "column",
    backgroundColor: "#eee",
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "40%",
    alignItems: "flex-start",
    marginLeft: 5,
    marginTop: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#ddd",
  },
  checkbox: {
    marginRight: 10,
  },
});
