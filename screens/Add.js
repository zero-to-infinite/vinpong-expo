import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BottomNav from "../components/BottomNav";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { addProduct } from "../services/firestore_product";
import styles from "../styles/AddStyles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Add({ navigation }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [size, setSize] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState(null);
  // 선택된 스타일 태그들
  const [selectedStyles, setSelectedStyles] = useState([]);
  // 선택된 카테고리 태그들
  const [selectedCategories, setSelectedCategories] = useState([]);
  // 스타일 모달이 보이는지 여부
  const [styleModalVisible, setStyleModalVisible] = useState(false);
  // 카테고리 모달이 보이는지 여부
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false); // 상품 추가시 로딩 여부

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
  // 카테고리 태그
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

  const checkboxStyles = {
    fillColor: "#91B391",
    unfillColor: "white",
    textStyle: {
      textDecorationLine: "none",
    },
  };

  const conditionCheckboxGroup = [
    {
      id: 0,
      text: "최상",
      ...checkboxStyles,
    },
    {
      id: 1,
      text: "상",
      ...checkboxStyles,
    },
    {
      id: 2,
      text: "중",
      ...checkboxStyles,
    },
    {
      id: 3,
      text: "하",
      ...checkboxStyles,
    },
  ];

  const sizeCheckboxGroup = [
    {
      id: 0,
      text: "L",
      ...checkboxStyles,
    },
    {
      id: 1,
      text: "M",
      ...checkboxStyles,
    },
    {
      id: 2,
      text: "S",
      ...checkboxStyles,
    },
  ];

  // 이미지 추가하는 함수
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const deleteImage = async () => {
    if (image) {
      setImage(null);
    }
  };

  const complete = async () => {
    setIsLoading(true);
    await addProduct(
      name,
      price,
      condition,
      size,
      selectedCategories,
      selectedStyles,
      detail,
      image,
      navigation
    );
    setIsLoading(false);
  };

  // 스타일 태그 눌렀을 때 동작하는 함수
  const handleStyleTagPress = (style) => {
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
  // 카테고리 태그 눌렀을 때 동작하는 함수
  const handleCategoryTagPress = (category) => {
    if (selectedCategories.includes(category)) {
      // 이미 클릭된 카테고리였으면 selectedCategories 리스트에서 제거
      setSelectedCategories(
        selectedCategories.filter(
          (selectedCategory) => selectedCategory !== category
        )
      );
    } else {
      // 클릭되지 않은 카테고리였으면 selectedCategories 리스트에 추가
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // 선택된 스타일 태그를 나타냄
  const renderSelectedStyles = () => {
    return (
      <ScrollView horizontal style={styles.selectedItemsContainer}>
        {selectedStyles.map((item, index) => (
          <View key={index} style={styles.selectedItem}>
            <Text style={styles.selectedItemText}>{item}</Text>
            <TouchableOpacity
              onPress={() => {
                handleStyleTagPress(item);
              }}
            >
              <Feather name="x" size={16} color="white" style={styles.icon} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };
  // 선택된 카테고리 태그를 나타냄
  const renderSelectedCategories = () => {
    return (
      <ScrollView horizontal style={styles.selectedItemsContainer}>
        {selectedCategories.map((item, index) => (
          <View key={index} style={styles.selectedItem}>
            <Text style={styles.selectedItemText}>{item}</Text>
            <TouchableOpacity
              onPress={() => {
                handleCategoryTagPress(item);
              }}
            >
              <Feather name="x" size={16} color="white" style={styles.icon} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };

  // 모달 내에서 스타일 태그들을 보여줄 함수
  const renderStyleTagButtons = () => {
    return (
      <View style={styles.modalItemContainer}>
        {stylesList.map((style) => (
          <TouchableOpacity
            onPress={() => handleStyleTagPress(style)}
            key={style}
            style={[
              styles.modalItem,
              selectedStyles.includes(style) ? styles.selectedModalItem : null, // 선택됐으면 옵션 색깔 변경
            ]}
          >
            <Text>{style}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // 모달 내에서 카테고리 태그들을 보여줄 함수
  const renderCategoryTagButtons = () => {
    return (
      <View style={styles.modalItemContainer}>
        {categoryList.map((category) => (
          <TouchableOpacity
            onPress={() => handleCategoryTagPress(category)}
            key={category}
            style={[
              styles.modalItem,
              selectedCategories.includes(category)
                ? styles.selectedModalItem
                : null, // 선택됐으면 옵션 색깔 변경
            ]}
          >
            <Text>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.menuBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.menuIcon}
        >
          <AntDesign name="close" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcon}>
          {/*완료 누르면 내 상점으로 이동하도록 추후 변경*/}
          <Text onPress={complete} style={styles.menuText}>
            완료
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator color="black" size="large" />
      ) : (
        <KeyboardAwareScrollView>
          <ScrollView style={styles.body}>
            {image == null ? (
              <View style={styles.pic}>
                <TouchableOpacity onPress={pickImage}>
                  <Feather name="camera" size={18} color="black" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.pic}>
                {image && <Image source={{ uri: image }} style={styles.pic} />}
                <TouchableOpacity
                  onPress={deleteImage}
                  style={styles.deletePic}
                >
                  <AntDesign name="close" size={18} color="white" />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.hr} />

            <View style={styles.inputBox}>
              <View style={styles.labelBox}>
                <Text style={styles.label}>상품명</Text>
              </View>
              <TextInput
                onChangeText={setName}
                value={name}
                returnKeyType="done"
                style={styles.input}
              />
            </View>

            <View style={styles.inputBox}>
              <View style={styles.labelBox}>
                <Text style={styles.label}>가격</Text>
              </View>
              <TextInput
                onChangeText={setPrice}
                value={price}
                keyboardType="number-pad"
                returnKeyType="done"
                style={styles.input}
              />
            </View>

            <View style={styles.inputBox}>
              <View style={styles.labelBox}>
                <Text style={styles.label}>상태</Text>
              </View>
              <BouncyCheckboxGroup
                onChange={(ICheckboxButton) => {
                  setCondition(ICheckboxButton.text);
                }}
                data={conditionCheckboxGroup}
                style={styles.checkbox}
              />
            </View>

            <View style={styles.inputBox}>
              <View style={styles.labelBox}>
                <Text style={styles.label}>사이즈</Text>
              </View>
              <BouncyCheckboxGroup
                onChange={(ICheckboxButton) => {
                  setSize(ICheckboxButton.text);
                }}
                data={sizeCheckboxGroup}
                style={styles.checkbox}
              />
            </View>

            <View style={styles.inputBox}>
              <View style={styles.labelBox}>
                <Text style={styles.label}>카테고리</Text>
              </View>

              <TouchableOpacity
                onPress={() => setCategoryModalVisible(true)}
                style={styles.addTagBtn}
              >
                <AntDesign name="plus" size={16} color="white" />
              </TouchableOpacity>
              {/* 선택한 카테고리 태그들을 나열해서 보여줌 */}
              <View>{renderSelectedCategories()}</View>
              {/* 카테고리 태그 선택하는 모달 */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={categoryModalVisible}
                onRequestClose={() => setCategoryModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalInner}>
                    <View style={styles.modalHeader}>
                      <Text>카테고리 태그</Text>
                      <TouchableOpacity
                        onPress={() => {
                          if (selectedCategories.length <= 2)
                            setCategoryModalVisible(false);
                        }}
                      >
                        <Text style={styles.closeModalButtonText}>완료</Text>
                      </TouchableOpacity>
                    </View>
                    {renderCategoryTagButtons()}
                    {selectedCategories.length > 2 ? (
                      <Text style={styles.maxSelectionText}>
                        최대 2개의 카테고리 태그를 선택할 수 있습니다!
                      </Text>
                    ) : (
                      <Text style={styles.selectionText}>
                        상품의 카테고리 태그를 선택해주세요!
                      </Text>
                    )}
                  </View>
                </View>
              </Modal>
            </View>

            <View style={styles.inputBox}>
              <View style={styles.labelBox}>
                <Text style={styles.label}>스타일</Text>
              </View>

              <TouchableOpacity
                onPress={() => setStyleModalVisible(true)}
                style={styles.addTagBtn}
              >
                <AntDesign name="plus" size={16} color="white" />
              </TouchableOpacity>
              {/* 선택한 스타일 태그들을 나열해서 보여줌 */}
              <View>{renderSelectedStyles()}</View>
              {/* 스타일 태그 선택하는 모달 */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={styleModalVisible}
                onRequestClose={() => setStyleModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalInner}>
                    <View style={styles.modalHeader}>
                      <Text>스타일 태그</Text>
                      <TouchableOpacity
                        onPress={() => {
                          if (selectedStyles.length <= 3)
                            setStyleModalVisible(false);
                        }}
                      >
                        <Text style={styles.closeModalButtonText}>완료</Text>
                      </TouchableOpacity>
                    </View>
                    {renderStyleTagButtons()}
                    {selectedStyles.length > 3 ? (
                      <Text style={styles.maxSelectionText}>
                        최대 3개의 스타일 태그를 선택할 수 있습니다!
                      </Text>
                    ) : (
                      <Text style={styles.selectionText}>
                        상품의 스타일 태그를 선택해주세요!
                      </Text>
                    )}
                  </View>
                </View>
              </Modal>
            </View>

            {/*키보드가 input을 가리는 버그 해결 필요!*/}
            <View style={styles.inputAreaBox}>
              <View style={styles.labelBox}>
                <Text style={styles.label}>상세 설명</Text>
              </View>
              <TextInput
                onChangeText={setDetail}
                value={detail}
                multiline={true}
                placeholder="상세 설명을 적어주세요 :D"
                returnKeyType="done"
                blurOnSubmit={true}
                style={styles.inputArea}
              />
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      )}

      <BottomNav navigation={navigation} />
    </View>
  );
}
