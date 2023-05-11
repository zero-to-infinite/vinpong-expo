import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import BottomNav from "../components/BottomNav";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Store({ navigation }) {
  // 판매 중인 상품 데이터
  const [products, setProducts] = useState([
    "판매 중 1",
    "판매 중 2",
    "판매 중 3",
    "판매 중 4",
    "판매 중 5",
    "판매 중 6",
    "판매 중 7",
    "판매 중 8",
    "판매 중 9",
    "판매 중 10",
  ]);

  // 판매 완료한 상품 데이터
  const [stores, setStores] = useState([
    "판매 완료 1",
    "판매 완료 2",
    "판매 완료 3",
    "판매 완료 4",
    "판매 완료 5",
    "판매 완료 6",
    "판매 완료 7",
    "판매 완료 8",
    "판매 완료 9",
    "판매 완료 10",
  ]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.menuBar}>
        <TouchableOpacity style={styles.menuIcon}>
          <Feather name="search" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcon}>
          <Feather name="bell" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcon}>
          <Feather name="shopping-cart" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.infoBox}>
          <View style={styles.userInfo}>
            <View style={styles.userImage}></View>
            <Text>닉네임</Text>
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

        <View style={styles.post}>
          <View>
            <TouchableOpacity>
              <Text></Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text></Text>
            </TouchableOpacity>
          </View>

          <View style={styles.post}>
            <TouchableOpacity></TouchableOpacity>
          </View>
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
  },

  menuBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 50,
    marginRight: 10,
  },

  menuIcon: {
    padding: 3,
  },

  body: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 20,
  },

  infoBox: {
    flexDirection: "row",
  },

  userImage: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 80,
    width: 100,
    height: 100,
    marginVertical: 10,
  },

  userInfo: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  storeInfo: {
    width: "50%",
    justifyContent: "center",
  },

  storeRating: {
    flexDirection: "row",
  },

  bioInput: {
    borderColor: "white",
    borderBottomColor: "black",
    borderWidth: 1,
    marginRight: 15,
  },

  storeText: {
    padding: 2,
  },

  followBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10,
  },

  follow: {
    flexDirection: "row",
  },

  followText: {
    fontWeight: "bold",
    paddingHorizontal: 5,
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
