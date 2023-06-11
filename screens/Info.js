import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";
import BottomNav from "../components/BottomNav";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { addProduct } from "../services/firestore_product";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Info({ navigation }) {
  const [name, setName] = useState("");
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
  const checkboxStyles = {
    fillColor: "#91B391",
    unfillColor: "white",
    textStyle: {
      textDecorationLine: "none",
    },
  };

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

  const complete = () => {
    addProduct(
      name,
      price,
      condition,
      size,
      selectedStyles,
      detail,
      image,
      navigation
    );
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

        <Text>프로필 수정 </Text>
        <TouchableOpacity style={styles.menuIcon}>
          {/*완료 누르면 내 상점으로 이동하도록 추후 변경*/}
          <Text onPress={complete} style={styles.menuText}>
            완료
          </Text>
        </TouchableOpacity>
      </View>

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
            <TouchableOpacity onPress={deleteImage} style={styles.deletePic}>
              <AntDesign name="close" size={18} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.hr} />

        <View style={styles.form}>
          <View style={styles.textContainer}>
            <Text>닉네임</Text>
          </View>
          <TextInput
            placeholder="원래 닉네임"
            onChangeText={setName}
            value={name}
            style={styles.input}
          />
          <TouchableOpacity style={styles.btn}>
            <Text>중복 확인</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputAreaBox}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>소개</Text>
          </View>
          <TextInput
            onChangeText={setDetail}
            value={detail}
            multiline={true}
            placeholder="소개를 적어주세요 :D"
            returnKeyType="done"
            blurOnSubmit={true}
            style={styles.inputArea}
          />
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
      </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },

  menuBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 20,
  },

  menuIcon: {
    padding: 3,
  },

  menuText: {
    fontSize: 17,
  },

  body: {
    flex: 1,
    marginVertical: 20,
  },

  pic: {
    position: "relative", // 사진 삭제 버튼 겹치게 하기 위함
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    width: 200, // 항상 고정된 크기
    height: 200,
  },

  deletePic: {
    position: "absolute", // 부모 컴포넌트 내에서 절대적 위치 지정
    backgroundColor: "#91B391",
    borderColor: "#91B391",
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    bottom: -10,
    right: -10,
  },

  footer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    backgroundColor: "#91B391",
    paddingBottom: 35,
    paddingTop: 15,
  },

  hr: {
    marginVertical: 10,
  },

  icon: {
    marginLeft: 5,
  },

  // 모달 안에 있는 태그들에 관한 스타일
  modalItemContainer: {
    padding: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  modalItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#777",
    margin: 5,
  },

  selectedModalItem: {
    backgroundColor: "#91B391",
    borderColor: "#91B391",
  },

  selectionText: {
    color: "black",
    alignSelf: "center",
    marginBottom: 20,
  },

  maxSelectionText: {
    color: "red",
    alignSelf: "center",
    marginBottom: 20,
  },
  form: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
  },

  input: {
    flex: 1,
    borderRadius: 10,
    borderColor: "#91B391",
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 6,
  },

  btn: {
    backgroundColor: "#91B391",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 3,
  },
  textContainer: {
    width: 65,
    alignItems: "center",
  },
  labelBox: {
    alignItems: "center",
    width: 65,
  },

  input: {
    flex: 1,
    borderColor: "white",
    borderBottomColor: "black",
    borderWidth: 1,
    marginRight: 15,
  },

  inputAreaBox: {
    flex: 1, // 세로로 flexible
    width: "95%",
    flexDirection: "row",
    marginVertical: 12,
  },

  inputArea: {
    flex: 1,
    height: 100,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    padding: 5,
  },

  addTagBtn: {
    backgroundColor: "#669066",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalInner: {
    borderColor: "#91B391",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    width: 340,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#91B391",
    padding: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },

  selectedItemsContainer: {
    marginLeft: 5,
  },

  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#91B391",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },

  selectedItemText: {
    color: "black",
  },

  footer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    backgroundColor: "#91B391",
    paddingBottom: 35,
    paddingTop: 15,
  },

  hr: {
    marginVertical: 10,
  },

  icon: {
    marginLeft: 5,
  },

  // 모달 안에 있는 태그들에 관한 스타일
  modalItemContainer: {
    padding: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  modalItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#777",
    margin: 5,
  },

  selectedModalItem: {
    backgroundColor: "#91B391",
    borderColor: "#91B391",
  },

  selectionText: {
    color: "black",
    alignSelf: "center",
    marginBottom: 20,
  },

  maxSelectionText: {
    color: "red",
    alignSelf: "center",
    marginBottom: 20,
  },
});

