import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Add({ navigation }) {
  const [image, setImage] = useState(null);

  const checkboxStyles = {
    fillColor: "#91B391",
    unfillColor: "white",
    textStyle: {
      textDecorationLine: "none",
    },
  };

  const condition = [
    {
      id: 0,
      text: "최상",
      width: "50%",
      paddingBottom: 10,
      ...checkboxStyles,
    },
    {
      id: 1,
      text: "상",
      width: "50%",
      paddingBottom: 10,
      ...checkboxStyles,
    },
    {
      id: 2,
      text: "중",
      width: "50%",
      ...checkboxStyles,
    },
    {
      id: 3,
      text: "하",
      width: "50%",
      ...checkboxStyles,
    },
  ];

  const size = [
    {
      id: 0,
      text: "L",
      width: "33%",
      ...checkboxStyles,
    },
    {
      id: 1,
      text: "M",
      width: "33%",
      ...checkboxStyles,
    },
    {
      id: 2,
      text: "S",
      width: "33%",
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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.menuBar}>
        <TouchableOpacity style={styles.menuIcon}>
          <AntDesign name="close" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcon}>
          {/*완료 누르면 내 상점으로 이동하도록 추후 변경*/}
          <Text style={styles.menuText}>완료</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        {image == null ? (
          <View style={styles.pic}>
            <TouchableOpacity onPress={pickImage}>
              <Feather name="camera" size={18} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {image && <Image source={{ uri: image }} style={styles.pic} />}
            <TouchableOpacity onPress={deleteImage} style={styles.deletePic}>
              <AntDesign name="close" size={18} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.inputBox}>
          <Text style={styles.label}>상품명</Text>
          <TextInput returnKeyType="done" style={styles.input} />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>가격</Text>
          <TextInput
            keyboardType="number-pad"
            returnKeyType="done"
            style={styles.input}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>상태</Text>
          <BouncyCheckboxGroup data={condition} style={styles.checkbox} />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>사이즈</Text>
          <BouncyCheckboxGroup data={size} style={styles.checkbox} />
        </View>

        {/*키보드가 input을 가리는 버그 해결 필요!*/}
        <View style={styles.inputAreaBox}>
          <Text style={styles.label}>상세 설명</Text>
          <TextInput
            multiline={true}
            placeholder="상세 설명을 적어주세요 :D"
            returnKeyType="done"
            blurOnSubmit={true}
            style={styles.inputArea}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.menuIcon}
        >
          <Feather name="home" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcon}>
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

  menuBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 15,
  },

  menuIcon: {
    padding: 3,
  },

  menuText: {
    fontSize: 17,
  },

  body: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
  },

  pic: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
    width: 200,
    height: 200,
  },

  deletePic: {
    backgroundColor: "#91B391",
    borderColor: "#91B391",
    borderWidth: 1,
    position: "absolute",
    borderRadius: 20,
    padding: 5,
    top: "80%",
    left: "50%",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 12,
  },

  label: {
    width: "30%",
  },

  input: {
    borderColor: "white",
    borderBottomColor: "black",
    borderWidth: 1,
    width: "70%",
  },

  inputAreaBox: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 12,
  },

  inputArea: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },

  checkbox: {
    width: "70%",
    flexWrap: "wrap",
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
