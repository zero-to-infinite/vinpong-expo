import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import BottomNav from "../components/BottomNav";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { signOut } from "../services/auth";
import styles from "../styles/InfoStyles";
import { getUserInfo, updateUserInfo } from "../services/firestore_user";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Info({ navigation }) {
  const [name, setName] = useState(""); // 닉네임
  const [bio, setBio] = useState(""); // 유저 소개
  const [image, setImage] = useState(null); // 사용자가 설정한 이미지
  const [isLoading, setIsLoading] = useState(false); // 프로필 변경 성공 여부

  // 선택된 스타일 태그들
  const [selectedStyles, setSelectedStyles] = useState([]);

  // 스타일 모달이 보이는지 여부
  const [styleModalVisible, setStyleModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setName(userInfo.name);
        if (userInfo.bio) setBio(userInfo.bio);
        if (userInfo.image) setImage(userInfo.image);
        if (userInfo.style) setSelectedStyles(userInfo.style);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

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
    Alert.alert("Update", "프로필을 변경하시겠습니까?", [
      { text: "아니옹..." },
      {
        text: "네!",
        style: "default",
        onPress: async () => {
          if (!isLoading) {
            setIsLoading(true);
            await updateUserInfo(image, name, selectedStyles, bio);
            setTimeout(() => setIsLoading(false), 1000);
          }
        },
      },
    ]);
  };

  const close = () => {
    Alert.alert("Close", "저장하지 않은 변경 내용은 모두 사라집니다.", [
      { text: "취소" },
      {
        text: "네 괜찮아요!",
        style: "default",
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
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

      {/*상단바*/}
      <View style={styles.menuBar}>
        <TouchableOpacity onPress={close} style={styles.menuIcon}>
          <AntDesign name="close" size={28} color="black" />
        </TouchableOpacity>

        <Text style={styles.menuText}>내 프로필</Text>
        <TouchableOpacity onPress={complete} style={styles.menuIcon}>
          {/*완료 누르면 내 상점으로 이동하도록 추후 변경*/}
          <Text style={styles.menuText}>완료</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator color="black" size="large" />
      ) : (
        <KeyboardAwareScrollView>
          <ScrollView style={styles.body}>
            {/*사용자 이미지 공간*/}
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

            {/*사용자 닉네임 공간*/}
            <View style={styles.inputBox}>
              <View style={styles.labelBox}>
                <Text style={styles.label}>닉네임</Text>
              </View>
              <TextInput
                onChangeText={setName}
                value={name}
                returnKeyType="done"
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => alert("준비 중입니다 :(")}
                style={styles.nameBtn}
              >
                <Text>중복 확인</Text>
              </TouchableOpacity>
            </View>

            {/*사용자 스타일 설정 공간*/}
            <View style={styles.inputBox}>
              <View style={styles.labelBox}>
                <Text style={styles.label}>스타일</Text>
              </View>

              {/*스타일 플러스 버튼*/}
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
                        내 상점의 스타일 태그를 선택해주세요!
                      </Text>
                    )}
                  </View>
                </View>
              </Modal>
            </View>

            {/*상점 소개 작성 공간*/}
            <View style={styles.inputAreaBox}>
              <View style={styles.labelBox}>
                <Text style={styles.label}>소개</Text>
              </View>
              <TextInput
                onChangeText={setBio}
                value={bio}
                multiline={true}
                placeholder="상점 소개를 적어주세요 :D"
                returnKeyType="done"
                blurOnSubmit={true}
                style={styles.inputArea}
              />
            </View>
          </ScrollView>

          {/*로그아웃 버튼*/}
          <TouchableOpacity
            onPress={() => signOut(navigation)}
            style={styles.logOutBtn}
          >
            <Text>로그아웃</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      )}

      <BottomNav navigation={navigation} />
    </View>
  );
}
