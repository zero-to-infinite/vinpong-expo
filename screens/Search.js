import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

export default function Search() {
  const [isStyleOpen, setIsStyleOpen] = useState(true); // 스타일 버튼이 선택된 상태로 시작
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState([]); // 선택된 스타일 목록
  const [selectedCategories, setSelectedCategories] = useState([]); // 선택된 카테고리 목록
  const stylesList = ["Casual", "Formal", "Sports", "Vintage", "Sportswear", "Classic", "Travel","Bohemian","Streetwear","Preppy","Chic","Minimalist",
"Tomboy","Rocker","Classsic","Safari"];
  const categoryList = ["전체", "상의", "바지","원피스/치마", "신발", "악세사리", "아우터","언더웨어","스포츠/레저","라이프","뷰티"];
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

  const handleStyleOptionPress = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((selectedStyle) => selectedStyle !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const handleCategoryOptionPress = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((selectedCategory) => selectedCategory !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const renderSelectedItems = () => {
    const selectedItems = [...selectedStyles, ...selectedCategories];

    return (
      <View style={styles.selectedItemsContainer}>
        {selectedItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.selectedItem}
            onPress={() => {
              if (selectedStyles.includes(item)) {
                handleStyleOptionPress(item);
              } else {
                handleCategoryOptionPress(item);
              }
            }}
          >
            <Text style={styles.selectedItemText}>{item}</Text>
            <Feather name="x" size={16} color="#777" style={styles.icon} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderStyleOptions = () => {
    return (
      <ScrollView contentContainerStyle={styles.optionsContainer}>
        {renderSelectedItems()}
        <View style={styles.optionsRow}>
          {stylesList.map((style, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedStyles.includes(style) ? styles.selectedOption : null,
              ]}
              onPress={() => handleStyleOptionPress(style)}
            >
              <Text>{style}</Text>
              {selectedStyles.includes(style) && (
                <Feather name="x" size={16} color="#777" style={styles.icon} />
              )}
            </TouchableOpacity>
                        ))}
                        </View>
                      </ScrollView>
                    );
                  };
                
                  const renderCategoryOptions = () => {
                    return (
                      <ScrollView contentContainerStyle={styles.optionsContainer}>
                        {renderSelectedItems()}
                        <View style={styles.optionsRow}>
                          {categoryList.map((category, index) => (
                            <TouchableOpacity
                              key={index}
                              style={[
                                styles.option,
                                selectedCategories.includes(category) ? styles.selectedOption : null,
                              ]}
                              onPress={() => handleCategoryOptionPress(category)}
                            >
                              <Text>{category}</Text>
                              {selectedCategories.includes(category) && (
                                <Feather name="x" size={16} color="#777" style={styles.icon} />
                              )}
                            </TouchableOpacity>
                          ))}
                        </View>
                      </ScrollView>
                    );
                  };
                
                  return (
                    <View style={styles.container}>
                      <StatusBar backgroundColor="transparent" translucent={true} />
                
                      <View style={styles.searchContainer}>
                        <TextInput style={styles.searchInput} placeholder="검색어를 입력하세요" />
                        <Feather name="search" size={24} color="#777" style={styles.icon} />
                      </View>
                
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
                
                      {isStyleOpen && (
                        <View style={styles.optionsContainer}>
                          {renderStyleOptions()}
                        </View>
                      )}
                
                      {isCategoryOpen && (
                        <View style={styles.optionsContainer}>
                          {renderCategoryOptions()}
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
                
                        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate("Search")}>
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
                    justifyContent: "space-between", // 수정된 부분
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
                  searchInput:{
                  flex: 1,
                  fontSize: 16,
                  color: "#777",
                  marginLeft: 10,
                },
                icon: {
                  marginLeft: 10,
                },
                buttonContainer: {
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                },
                button: {
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 20,
                  backgroundColor: "#91B391",
                  marginRight: 10,
                },
                selectedButton: {
                  backgroundColor: "#5A8C5A",
                },
                buttonText: {
                  color: "white",
                  fontSize: 16,
                },
                optionsContainer: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginTop: 20,
                  paddingHorizontal: 20,
                },
                optionsRow: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                },
                option: {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: "#777",
                  marginRight: 10,
                  marginBottom: 10,
                },
                selectedOption: {
                  backgroundColor: "#91B391",
                  borderColor: "#91B391",
                },
                selectedItemsContainer: {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 10,
                },
                selectedItem: {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 15,
                  backgroundColor: "#91B391",
                  marginRight: 10,
                  marginBottom: 10,
                },
                selectedItemText: {
                  color: "white",
                  marginRight: 5,
                },
                popularContainer: {
                  paddingHorizontal: 20,
                  marginTop: 20,
                },
                popularTitle: {
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 10,
                },
                popularItem: {
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                },
                popularRank: {
                  marginRight: 10,
                  color: "#777",
                },
                popularName: {
                  color: "#777",
                },
                footer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    backgroundColor: "#91B391",
    paddingBottom: 35,
    paddingTop: 15,
    position: "fixed", // 수정된 부분
    bottom: 0, // 수정된 부분
  },
                menuIcon: {
                  justifyContent: "center",
                  alignItems: "center",
                },
              });
              
                
         
