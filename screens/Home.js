import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar";
import { AntDesign } from "@expo/vector-icons";
import { getAllImages, getAllUserImages } from "../services/storage";
import { getUserInfo } from "../services/firestore_user";
import styles from "../styles/HomeStyles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [productImages, setProductImages] = useState([]);
  const [storeImages, setStoreImages] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchImages = async () => {
        try {
          const productImagesList = await getAllImages();
          const storeImageList = await getAllUserImages();
          setProductImages(productImagesList);
          setStoreImages(storeImageList);
        } catch (error) {
          console.log(error);
        }
      };

      fetchImages();
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TopBar navigation={navigation} />

      <View style={styles.body}>
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/vinpong-3a05c.appspot.com/o/banner.jpg?alt=media&token=19f08c73-a082-4a08-8ce8-87831d7b8ceb&_gl=1*1x55dtp*_ga*MjAzNjMwMTE2Mi4xNjgzODkxNjAx*_ga_CW55HF8NVT*MTY4NjQ5NzEyOC40MS4xLjE2ODY0OTcxNDguMC4wLjA.",
          }}
          style={styles.banner}
        />

        <Text style={styles.bodyText}>추천 상품</Text>
        <View style={styles.productContainer}>
          <ScrollView pagingEnabled horizontal>
            {productImages.map((value, key) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Detail", { src: value })}
                style={styles.product}
                key={key}
              >
                <Image style={styles.product} source={{ uri: value }} />
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
            {storeImages.map((value, key) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Store", { src: value })}
                style={styles.product}
                key={key}
              >
                <Image style={styles.product} source={{ uri: value }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.scrollIcon}>
            <AntDesign name="rightcircle" size={24} color="#91B391" />
          </TouchableOpacity>
        </View>
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
}
