import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';

export default function Search() {
  const [isStyleOpen, setIsStyleOpen] = useState(true); // 스타일 버튼이 선택된 상태로 시작
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const stylesList = ["Casual", "Formal", "Sports", "Vintage", "Sportswear", "Classic", "Travel"];

  const categoryList = ["전체", "상의", "하의", "신발", "악세사리","아우터"];

  const popularList = [
    { id: 1, name: "운동화" },
    { id: 2, name: "후드티" },
    { id: 3, name: "반팔티" },
    { id: 4, name: "나이키" },
    { id: 5, name: "아디다스" },
  ];

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
        <View style={[styles.options, styles.styleOptions]}>
          {stylesList.map((style, index) => (
            <TouchableOpacity key={index} style={styles.option}>
              <Text>{style}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {isCategoryOpen && (
        <View style={[styles.options, styles.categoryOptions]}>
          {categoryList.map((category, index) => (
            <TouchableOpacity key={index} style={styles.option}>
              <Text>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.popularContainer}>
        <Text style={styles.popularTitle}>인기 검색어</Text>
        {popularList.map((keyword, index) => (
          <View key={index} style={styles.popularItem}>
            <Text style={styles.popularRank}>{index + 1}</Text>
            <Text style={styles.popularName}>{keyword.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.menuIcon}>
          <Feather name="home" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => navigation.navigate("Search")}>
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
    flex: 1, // 1:1 비율로 화면 차지
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
  selectedButton: {
    backgroundColor: "#91B391",
  },
  chartContainer: {
    backgroundColor: "#eee",
    borderRadius: 5,
    margin: 5,
    padding: 10,
  },
  chartTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  chartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  chartRank: {
    fontWeight: "bold",
    marginRight: 10,
  },
  chartText: {
    fontSize: 16,
  },

  popularContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  popularTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  popularRank: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 8,
  },
  popularName: {
    fontSize: 14,
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
