import { FIRESTORE_DB, FIREBASE_AUTH } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

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