import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";


const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Home({ navigation} ) {
  // 임시 상품 데이터
  const [products, setProducts] = useState([
    "상품 1",
    "상품 2",
    "상품 3",
    "상품 4",
    "상품 5",
  ]);

  // 임시 상점 데이터
  const [stores, setStores] = useState([
    "상점 1",
    "상점 2",
    "상점 3",
    "상점 4",
    "상점 5",
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
        <TouchableOpacity style={styles.banner}>
          <Text>배너</Text>
        </TouchableOpacity>

        <Text style={styles.bodyText}>추천 상품</Text>
        <View style={styles.productContainer}>
          <ScrollView pagingEnabled horizontal>
            {products.map((value, key) => (
              <TouchableOpacity style={styles.product} key={key}>
                <Text>{value}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.scrollIcon}>
            <AntDesign name="rightcircle" size={24} color="#91B391" />
          </TouchableOpacity>
        </View>

        <Text style={styles.bodyText}>인기 상점</Text>
        <View style={styles.productContainer}>
          <ScrollView pagingEnabled horizontal>
            {stores.map((value, key) => (
              <TouchableOpacity style={styles.product} key={key}>
                <Text>{value}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.scrollIcon}>
            <AntDesign name="rightcircle" size={24} color="#91B391" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.menuIcon}>
          <Feather name="home" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => navigation.navigate("Search")}>
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

  bodyText: {
    alignSelf: "flex-start",
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 10,
  },

  banner: {
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 60,
  },

  productContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  product: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    width: (SCREEN_WIDTH - 38) * 0.3,
    height: (SCREEN_WIDTH - 38) * 0.3,
    margin: 3,
  },

  scrollIcon: {
    width: "10%",
    alignItems: "center",
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
