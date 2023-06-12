import { FIRESTORE_DB, FIREBASE_AUTH } from "../firebaseConfig";
import { doc, setDoc, getDoc, collection, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { uploadImage } from "./storage";

// 로그인한 유저의 uid 가져오기
export async function getUserUid() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        try {
          resolve(user.uid);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}

// 로그인한 유저의 정보 가져오기
export async function getUserInfo() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        try {
          // 현재 로그인한 유저의 uid와 이름이 동일한 문서를 가져옴
          const userData = await getDoc(doc(FIRESTORE_DB, "User", user.uid));
          // 가져온 문서에서 유저 정보를 읽음
          const userInfo = userData.data();
          resolve(userInfo);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}

// 특정 유저의 정보 가져오기
export async function getUserInfoByUid(uid) {
  try {
    const userData = await getDoc(doc(FIRESTORE_DB, "User", uid));
    // 가져온 문서에서 유저 정보를 읽음
    const userInfo = userData.data();
    return userInfo;
  } catch (error) {
    console.log(err);
  }
}

// 내 프로필 정보 DB에 업데이트
export async function updateUserInfo(image, name, style, bio) {
  try {
    const uid = await getUserUid();
    const userRef = doc(FIRESTORE_DB, "User", uid);

    if (image) {
      const date = new Date();

      const downloadURL = await uploadImage("User", image, uid, "image");
      console.log("유저 이미지 저장 성공!");

      await updateDoc(userRef, {
        image: downloadURL,
        name: name,
        style: style,
        bio: bio,
      });
    } else {
      await updateDoc(userRef, {
        image: null,
        name: name,
        style: style,
        bio: bio,
      });
    }
  } catch (err) {
    console.log(err);
  }
  alert("프로필이 성공적으로 변경되었습니다!");
}
