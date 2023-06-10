import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomNav from "../components/BottomNav";
import styles from "../styles/SearchStyles";
import { Feather } from "@expo/vector-icons";

export default function Search({ navigation }) {
  const [isStyleOpen, setIsStyleOpen] = useState(true); // 스타일 버튼이 선택된 상태로 시작
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState([]); // 선택된 스타일 목록
  const [selectedCategories, setSelectedCategories] = useState([]); // 선택된 카테고리 목록
  
  // 스타일 태그
  const stylesList = [
    "Casual",
    "Formal",
    "Sports",
    "Vintage",
    "Sportswear",
    "Classic",
    "Travel",
    "Bohemian",
    "Streetwear",
    "Preppy",
    "Chic",
    "Minimalist",
    "Tomboy",
    "Rocker",
    "Safari",
  ];
  //카테고리 태그
  const categoryList = [
    "상의",
    "바지",
    "원피스/치마",
    "신발",
    "악세사리",
    "아우터",
    "언더웨어",
    "스포츠/레저",
    "라이프",
    "뷰티",
  ];
  // 임시 인기 검색어 데이터
  const popularList = [
    { id: 1, name: "운동화" },
    { id: 2, name: "후드티" },
    { id: 3, name: "반팔티" },
    { id: 4, name: "나이키" },
    { id: 5, name: "아디다스" },
  ];
  // 스타일 탭 눌렀을 때 동작하는 함수
  const handleStylePress = () => {
    setIsStyleOpen(true);
    setIsCategoryOpen(false);
  };
  // 카테고리 탭 눌렀을 때 동작하는 함수
  const handleCategoryPress = () => {
    setIsCategoryOpen(true);
    setIsStyleOpen(false);
  };
  // 스타일 옵션 눌렀을 때 동작하는 함수
  const handleStyleOptionPress = (style) => {
    if (selectedStyles.includes(style)) {
      // 이미 클릭된 스타일이었으면 selectedStyles 리스트에서 제거
      setSelectedStyles(
        selectedStyles.filter((selectedStyle) => selectedStyle !== style)
      );
    } else {
      // 클릭되지 않은 스타일이었으면 selectedStyles 리스트에 추가
      setSelectedStyles([...selectedStyles, style]);
    }
  };
  // 카테고리 옵션 눌렀을 때 동작하는 함수
  const handleCategoryOptionPress = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(
          (selectedCategory) => selectedCategory !== category
        )
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  // 선택된 검색 태그를 검색창 밑에 보여주는 컴포넌트
  const renderSelectedItems = () => {
    const selectedItems = [...selectedStyles, ...selectedCategories]; // 선택된 스타일 + 카테고리를 담은 리스트

    return (
      <ScrollView horizontal style={styles.selectedItemsContainer}>
        {selectedItems.map((item, index) => (
          <View key={index} style={styles.selectedItem}>
            <Text style={styles.selectedItemText}>{item}</Text>
            <TouchableOpacity
              onPress={() => {
                // X 버튼 누르면 리스트에서 삭제
                if (selectedStyles.includes(item)) {
                  handleStyleOptionPress(item);
                } else {
                  handleCategoryOptionPress(item);
                }
              }}
            >
              <Feather name="x" size={16} color="white" style={styles.icon} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };
  // 스타일 탭 안에서 스타일 옵션을 보여줌
  const renderStyleOptions = () => {
    return (
      <View style={styles.optionsContainer}>
        {stylesList.map((style, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedStyles.includes(style) ? styles.selectedOption : null, // 선택됐으면 옵션 색깔 변경
            ]}
            onPress={() => handleStyleOptionPress(style)}
          >
            <Text>{style}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  // 카테고리 탭 안에서 카테고리 옵션을 보여줌
  const renderCategoryOptions = () => {
    return (
      <View style={styles.optionsContainer}>
        {categoryList.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedCategories.includes(category) ? styles.selectedOption : null, // 선택됐으면 옵션 색깔 변경
            ]}
            onPress={() => handleCategoryOptionPress(category)}
          >
            <Text>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="auto" />

      {/* 검색창 */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="검색어를 입력하세요"
        />
        <TouchableOpacity>
          <Feather name="search" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* 검색창 밑에 선택된 태그들 보여줌! */}
      <View>{renderSelectedItems()}</View>

      {/* 스타일-카테고리 탭 전환 버튼 (이 아래로 스크롤 뷰) */}
      <ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isStyleOpen && styles.selectedButton]}
            onPress={handleStylePress}
          >
            <Text style={styles.buttonText}>Style</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isCategoryOpen && styles.selectedButton]}
            onPress={handleCategoryPress}
          >
            <Text style={styles.buttonText}>Category</Text>
          </TouchableOpacity>
        </View>

        {/* 스타일-카테고리 탭 내부에서 보여주는 옵션들 */}
        {isStyleOpen && renderStyleOptions()}
        {isCategoryOpen && renderCategoryOptions()}

        {/* 인기 검색어 */}
        <View style={styles.popularContainer}>
          <Text style={styles.popularTitle}>인기 검색어</Text>
          {popularList.map((keyword, index) => (
            <View key={index} style={styles.popularItem}>
              <Text style={styles.popularRank}>{index + 1}</Text>
              <Text style={styles.popularName}>{keyword.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
}