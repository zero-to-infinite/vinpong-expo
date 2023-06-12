import { FIREBASE_STORAGE, FIRESTORE_DB } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { getDocs, collection } from "firebase/firestore";

// storage에 이미지를 업로드하는 함수
export async function uploadImage(uid, file, name, date) {
  const filePath = `${uid}/${date}${name}`;

  const storageRef = ref(FIREBASE_STORAGE, filePath);

  try {
    const response = await fetch(file);
    const blob = await response.blob();
    const snapshot = await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (err) {
    console.log("이미지 업로드에 실패하였습니다 :(");
  }
}
// storage에서 모든 이미지 가져오는 함수
export async function getAllImages() {
  const docSnap = await getDocs(collection(FIRESTORE_DB, "Product"));
  const imagesList = [];
  docSnap.forEach((doc) => {
    imagesList.push(doc.data().image);
  });
  return imagesList;
}
// storage에서 특정 유저가 판매하는 상품의 이미지를 가져오는 함수
export async function getImages(uid) {
  try {
    // uid가 폴더명인 이미지 폴더를 참조
    const imagesRef = ref(FIREBASE_STORAGE, `${uid}`);
    const res = await listAll(imagesRef);
    // 폴더 내의 모든 이미지들의 다운로드 URL을 가져와 리스트로 반환
    const promises = res.items.map(async (itemRef) => {
      const path = itemRef.fullPath;
      try {
        const url = await getDownloadURL(ref(FIREBASE_STORAGE, path));
        return url;
      } catch (err) {
        console.log(err);
        return null;
      }
    });
    // 모든 프로미스가 완료될 때까지 기다린 후 리스트 생성
    const imagesList = await Promise.all(promises);
    // url이 null인 값을 리스트에서 제거
    return imagesList.filter((url) => url !== null);
  } catch (err) {
    console.log(err);
    // 에러가 나면 빈 리스트 반환
    return [];
  }
}

// storage에서 모든 유저의 이미지 가져오는 함수
export async function getAllUserImages() {
  const docSnap = await getDocs(collection(FIRESTORE_DB, "User"));
  const imagesList = [];
  docSnap.forEach((doc) => {
    if (doc.data().image) imagesList.push(doc.data().image);
  });

  return imagesList;
}
