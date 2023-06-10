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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";
import BottomNav from "../components/BottomNav";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { addProduct, getProduct } from "../services/firestore_product";
import styles from "../styles/AddStyles";

export default function Detail({ navigation, route }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState(0);
  const [size, setSize] = useState(0);
  const [style, setStyle] = useState([]);
  const [category, setCategory] = useState([]);
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

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const productInfo = await getProduct(route.params.src);
        console.log(productInfo);
        setName(productInfo.name);
        setPrice(productInfo.price);
        const conNum = conditionCheckboxGroup.find(
          (obj) => obj.text === productInfo.condition
        ).id;
        setCondition(conNum);
        const sizeNum = sizeCheckboxGroup.find(
          (obj) => obj.text === productInfo.size
        ).id;
        setSize(sizeNum);
        setStyle(productInfo.style);
        setCategory(productInfo.category);
        setDetail(productInfo.detail);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProductInfo();
  }, []);

  // 스타일 태그를 나타냄
  const renderSelectedStyles = () => {
    return (
      <ScrollView horizontal style={styles.selectedItemsContainer}>
        {style.map((item, index) => (
          <View key={index} style={styles.selectedItem}>
            <Text style={styles.selectedItemText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };
  // 카테고리 태그를 나타냄
  const renderSelectedCategories = () => {
    return (
      <ScrollView horizontal style={styles.selectedItemsContainer}>
        {category.map((item, index) => (
          <View key={index} style={styles.selectedItem}>
            <Text style={styles.selectedItemText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
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
          {/*완료 말고 다른 텍스트로 바꿔야겠다*/}
          <Text style={styles.menuText}>완료</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body}>
        <Image style={styles.pic} source={{ uri: route.params.src }} />

        <View style={styles.hr} />

        <View style={styles.inputBox}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>상품명</Text>
          </View>
          <TextInput editable={false} value={name} style={styles.input} />
        </View>

        <View style={styles.inputBox}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>가격</Text>
          </View>
          <Text>{price} ￦</Text>
        </View>

        <View style={styles.inputBox}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>상태</Text>
          </View>
          <BouncyCheckboxGroup
            initial={condition}
            data={conditionCheckboxGroup}
            style={styles.checkbox}
          />
        </View>

        <View style={styles.inputBox}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>사이즈</Text>
          </View>
          <BouncyCheckboxGroup
            initial={size}
            data={sizeCheckboxGroup}
            style={styles.checkbox}
          />
        </View>

        <View style={styles.inputBox}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>카테고리</Text>
          </View>
          <View>{renderSelectedCategories()}</View>
        </View>

        <View style={styles.inputBox}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>스타일</Text>
          </View>
          <View>{renderSelectedStyles()}</View>
        </View>

        {/*키보드가 input을 가리는 버그 해결 필요!*/}
        <View style={styles.inputAreaBox}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>상세 설명</Text>
          </View>
          <TextInput
            value={detail}
            editable={false}
            multiline={true}
            placeholder="상세 설명이 없습니다 :("
            style={styles.inputArea}
          />
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
}
