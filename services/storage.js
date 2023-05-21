import { FIREBASE_STORAGE } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// storage에 이미지를 업로드하는 함수
export async function uploadImage(file, name, date) {
  const filePath = `${date}${name}`;

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
