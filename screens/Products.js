import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar";
import { getProductsByKeyword } from "../services/storage";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Products({ navigation, route }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async (keyword, style, category) => {
      try {
        const productList = await getProductsByKeyword(
          keyword,
          style,
          category
        );
        setProducts(productList);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts(
      route.params.keyword,
      route.params.style,
      route.params.category
    );
  }, []);

  const renderSelectedItems = () => {
    const selectedItems = [...route.params.style, ...route.params.category]; // 선택된 스타일 + 카테고리를 담은 리스트

    return (
      <ScrollView horizontal style={styles.selectedItemsContainer}>
        {selectedItems.map((item, index) => (
          <View key={index} style={styles.selectedItem}>
            <Text style={styles.selectedItemText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~상품들을 보여주는 컴포넌트~~~~~~~~~~~~~~~~~~~~~~~~
  const renderProducts = () =>
    products.map((value, key) => (
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { src: value.image })}
        style={styles.item}
        key={key}
      >
        <Image style={styles.itemImg} source={{ uri: value.image }} />
        <Text style={styles.itemName}>{value.name}</Text>
        <Text style={styles.itemPrice}>{value.price} ￦</Text>
      </TouchableOpacity>
    ));

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} />

      <View>{renderSelectedItems()}</View>
      <ScrollView style={styles.body}>
        <View style={styles.itemContainer}>{renderProducts()}</View>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },

  body: {
    flex: 1,
  },

  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
  },

  item: {},

  itemImg: {
    height: (SCREEN_WIDTH - 48) * 0.5,
    width: (SCREEN_WIDTH - 48) * 0.5,
    margin: 7,
    borderRadius: 20,
  },

  itemName: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#669066",
  },

  itemPrice: {
    textAlign: "center",
    marginBottom: 15,
    color: "gray",
  },

  selectedItemsContainer: {
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 20,
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
});
