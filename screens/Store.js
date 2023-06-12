import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar";
import { getImages } from "../services/storage";
import { getUserInfo, getUserUid } from "../services/firestore_user";
import styles from "../styles/StoreStyles";
import { FontAwesome } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Store({ navigation }) {
  // true이면 판매 중, false이면 판매 완료인 상품
  const [isSelling, setIsSelling] = useState(true);
  const [name, setName] = useState(null);
  // 판매 중인 상품 데이터
  const [sellingItem, setSellingItem] = useState([]);
  // 판매 완료한 상품 데이터
  const [soldItem, setSoldItem] = useState([]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userInfo = await getUserInfo();
        setName(userInfo.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const uid = await getUserUid();
        const imagesList = await getImages(uid);
        setSellingItem(imagesList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImages();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TopBar navigation={navigation} />

      <ScrollView style={styles.body}>
        <View style={styles.infoBox}>
          <View style={styles.userInfo}>
            <View style={styles.userImage}></View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Info");
              }}
              style={styles.gearIcon}
            >
              <FontAwesome name="gear" size={16} color="darkgray" />
            </TouchableOpacity>
            <Text>{name}</Text>
          </View>

          <View style={styles.storeInfo}>
            <View style={styles.storeRating}>
              <Text style={styles.storeText}>평점</Text>
              <Text style={styles.storeText}>★★★★★</Text>
            </View>

            <View>
              <Text style={styles.storeText}>스타일</Text>
              <Text style={styles.storeText}>#빈티지 #유니크</Text>
            </View>

            <View>
              <Text style={styles.storeText}>소개</Text>
              <TextInput style={styles.bioInput} />
            </View>
          </View>
        </View>

        <View style={styles.followBox}>
          <TouchableOpacity style={styles.follow}>
            <Text style={styles.followText}>Followers</Text>
            <Text>10</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.follow}>
            <Text style={styles.followText}>Following</Text>
            <Text>15</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.buttonBox}>
            <TouchableOpacity
              onPress={() => setIsSelling(true)}
              style={
                isSelling == true
                  ? styles.clickedButton
                  : styles.nonClickedButton
              }
            >
              <Text style={styles.btnText}>Selling</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsSelling(false)}
              style={
                isSelling == false
                  ? styles.clickedButton
                  : styles.nonClickedButton
              }
            >
              <Text style={styles.btnText}>Sold</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.itemBox}>
            {isSelling == true
              ? sellingItem.map((value, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Detail", { src: value })
                    }
                    key={index}
                    style={styles.item}
                  >
                    <Image style={styles.item} source={{ uri: value }} />
                  </TouchableOpacity>
                ))
              : soldItem.map((value, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Detail", { src: value })
                    }
                    key={index}
                    style={styles.item}
                  >
                    <Text>{value}</Text>
                  </TouchableOpacity>
                ))}
          </View>
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
}
