import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar";
import { AntDesign } from "@expo/vector-icons";
import { getAllImages, getAllUserImages } from "../services/storage";
import * as Location from "expo-location";
import styles from "../styles/HomeStyles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "9aebfd2a3e3ba2172d0b6aa7582d3ca9"; // openweathermap api key

export default function Home({ navigation }) {
  const [productImages, setProductImages] = useState([]); // 홈에 보일 상품 이미지들
  const [storeImages, setStoreImages] = useState([]); // 홈에 보일 상점 이미지들

  const [city, setCity] = useState(""); // 현재 위치한 도시
  const [weather, setWeather] = useState(""); // 오늘 날씨
  const [temp, setTemp] = useState(""); // 현재 온도

  const [ok, setOk] = useState(true); // 위치 정보 수집 허용 여부

  const recommendDress = (temp, weather) => {
    if (temp < 5) {
      var text = "패딩과 두꺼운 코트, 목도리를 추천합니다 :)";
    } else if (5 <= temp && temp < 9) {
      var text = "코트, 히트텍, 두꺼운 니트를 추천합니다 :)";
    } else if (9 <= temp && temp < 12) {
      var text = "트렌치코트, 자켓, 니트를 추천합니다 :)";
    } else if (12 <= temp && temp < 17) {
      var text = "자켓, 가디건, 조끼를 추천합니다 :)";
    } else if (17 <= temp && temp < 20) {
      var text = "얇은 니트, 맨투맨, 후드티를 추천합니다 :)";
    } else if (20 <= temp && temp < 23) {
      var text = "셔츠, 긴팔티, 청바지를 추천합니다 :)";
    } else if (23 <= temp && temp < 28) {
      var text = "반팔티, 반바지, 얇은 셔츠를 추천합니다 :)";
    } else if (28 <= temp) {
      var text = "민소매, 반팔, 반바지를 추천합니다 :)";
    }

    var weatherLower = weather.toLowerCase();

    if (weatherLower.includes("clear")) {
      var icon = "☀️";
    } else if (weatherLower.includes("rain")) {
      var icon = "🌧️";
    } else if (weatherLower.includes("cloudes")) {
      var icon = "💨";
    } else if (weatherLower.includes("thunderstorm")) {
      var icon = "⚡️";
    } else if (weatherLower.includes("snow")) {
      var icon = "❄️";
    } else if (weatherLower.includes("mist")) {
      var icon = "🌫️";
    } else {
      var icon = "☺️";
    }
    return (
      <View style={styles.weatherInner}>
        <View style={styles.weatherLeft}>
          <Text style={styles.city}>{city}</Text>
          <Text style={styles.weather}>{weather}</Text>
          <Text style={styles.temp}>{Math.round(temp)}°</Text>
        </View>
        <View style={styles.weatherRight}>
          <Text style={styles.dressIcon}>{icon}</Text>
          <Text style={styles.dressText}>{text}</Text>
        </View>
      </View>
    );
  };

  // 현재 유저의 위치 정보를 수집하고 날씨 정보를 가져오는 함수
  const getWeather = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        setOk(false);
      }
      // 현재 위치의 위도, 경도 수집
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      // 위도, 경도를 가지고 주소지로 변환
      const location = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      );
      setCity(location[0].city);
      // 날씨 api 가져오기
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
        );
        const json = await response.json();
        setWeather(json.weather[0].main);
        setTemp(json.main.temp);
      } catch (e) {
        console.log(e);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

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
            uri: "https://firebasestorage.googleapis.com/v0/b/vinpong-3a05c.appspot.com/o/banner3.jpg?alt=media&token=3401f32e-8f7b-4efc-afcd-8e528485fbf6",
          }}
          style={styles.banner}
        />
        {Platform.OS !== "web" ? (
          <View style={styles.weatherBox}>
            {temp === "" ? (
              <View>
                <ActivityIndicator color="black" size="large" />
              </View>
            ) : (
              <View>{recommendDress(Math.round(temp), weather)}</View>
            )}
          </View>
        ) : null}

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
          <TouchableOpacity
            onPress={() => alert("오른쪽으로 스크롤을 넘겨보세요!")}
            style={styles.scrollIcon}
          >
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
          <TouchableOpacity
            onPress={() => alert("오른쪽으로 스크롤을 넘겨보세요!")}
            style={styles.scrollIcon}
          >
            <AntDesign name="rightcircle" size={24} color="#91B391" />
          </TouchableOpacity>
        </View>
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
}
