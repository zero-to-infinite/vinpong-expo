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
import { useFocusEffect } from "@react-navigation/native";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar";
import { getImages } from "../services/storage";
import {
  getUserInfo,
  getUserUid,
  getUserByImg,
} from "../services/firestore_user";
import styles from "../styles/StoreStyles";
import { FontAwesome } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Store({ navigation, route }) {
  // true이면 판매 중, false이면 판매 완료인 상품 보여줌
  const [isSelling, setIsSelling] = useState(true);

  const [uid, setUid] = useState(null); // "현재 로그인"한 유저의 uid
  const [isMyStore, setIsMyStore] = useState(false); // 내 상점인지 여부

  const [sellerUid, setSellerUid] = useState(null); // "판매자"의 uid
  const [sellerName, setSellerName] = useState(""); // "판매자"의 닉네임
  const [sellerImage, setSellerImage] = useState(null); // "판매자"의 이미지
  const [sellerStyle, setSellerStyle] = useState([]); // "판매자"의 스타일
  const [sellerBio, setSellerBio] = useState(null); // "판매자"의 소개

  // 판매 중인 상품 데이터
  const [sellingItem, setSellingItem] = useState([]);
  // 판매 완료한 상품 데이터
  const [soldItem, setSoldItem] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserInfo = async () => {
        try {
          const myUid = await getUserUid(); // 현재 로그인한 유저의 uid 가져옴
          setUid(myUid);

          console.log(route?.params?.src);

          if (route?.params?.src) {
            // 다른 사람 상점이면
            const userInfo = await getUserByImg(route?.params?.src);

            setSellerUid(userInfo.uid);
            setSellerName(userInfo.name);
            setSellerBio(userInfo.bio);
            setSellerImage(route?.params?.src);
            if (userInfo.style) setSellerStyle(userInfo.style);

            const imagesList = await getImages(userInfo.uid);
            setSellingItem(imagesList);
          } else {
            // 내 상점이면
            const myInfo = await getUserInfo();
            setIsMyStore(true);

            setSellerUid(uid);
            setSellerName(myInfo.name);
            setSellerBio(myInfo.bio);
            setSellerImage(myInfo.image);
            if (myInfo.style) setSellerStyle(myInfo.style);

            const imagesList = await getImages(myUid);
            setSellingItem(imagesList);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchUserInfo();
    }, [])
  );

  // 스타일 태그를 나타냄
  const renderSelectedStyles = () => {
    return (
      <ScrollView horizontal style={styles.selectedItemsContainer}>
        {sellerStyle.map((item, index) => (
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

      <TopBar navigation={navigation} />

      <ScrollView style={styles.body}>
        <View style={styles.infoBox}>
          <View style={styles.userInfo}>
            {sellerImage == null ? (
              <View style={styles.userImage}></View>
            ) : (
              <Image style={styles.userImage} source={{ uri: sellerImage }} />
            )}

            {isMyStore ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Info");
                }}
                style={styles.gearIcon}
              >
                <FontAwesome name="gear" size={16} color="darkgray" />
              </TouchableOpacity>
            ) : null}

            <Text style={styles.storeText}>{sellerName}</Text>
          </View>

          <View style={styles.storeInfo}>
            <View>
              <Text style={styles.storeText}>스타일</Text>
              <View>{renderSelectedStyles()}</View>
            </View>

            <View>
              <Text style={styles.storeText}>소개</Text>
              <TextInput
                editable={false}
                placeholder="상점 소개가 없습니다 :("
                multiline={true}
                numberOfLines={3}
                ellipsizeMode="tail"
                value={sellerBio}
                style={styles.bioBox}
              />
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
