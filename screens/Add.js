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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";
import BottomNav from "../components/BottomNav";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { addProduct } from "../services/productFirestore";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Add({ navigation }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [size, setSize] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState(null);

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

  const complete = () => {
    addProduct(name, price, condition, size, detail, image, navigation);
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
      </View>

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
    alignItems: "center",
    marginVertical: 20,
  },

  pic: {
    position: "relative", // 사진 삭제 버튼 겹치게 하기 위함
    justifyContent: "center",
    alignItems: "center",
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

  inputBox: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    //marginHorizontal: 10,
    marginVertical: 12,
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
    //marginHorizontal: 10,
    marginVertical: 12,
  },

  inputArea: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    padding: 5,
  },

  checkbox: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
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

  hr: {
    marginVertical: 10,
  },
});
