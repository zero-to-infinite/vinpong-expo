import { FIRESTORE_DB, FIREBASE_AUTH } from "../firebaseConfig";
import {
  doc,
  getDocs,
  setDoc,
  getDoc,
  collection,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
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

// 이미지를 클릭하면 특정 유저의 정보 가져옴
export async function getUserByImg(src) {
  const userRef = collection(FIRESTORE_DB, "User");
  const q = query(userRef, where("image", "==", src));
  try {
    const querySnapshot = await getDocs(q);
    const userPromises = querySnapshot.docs.map((doc) => {
      const user = doc.data();
      const userInfo = {
        uid: doc.id, // 판매자의 uid
        name: user.name,
        bio: user.bio,
        style: user.style,
      };
      return userInfo;
    });
    const users = await Promise.all(userPromises);
    return users[0];
  } catch (err) {
    console.log(err);
  }
}
