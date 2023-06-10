import { FIRESTORE_DB, FIREBASE_AUTH } from "../firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { uploadImage } from "./storage";
import { getUserUid, getUserInfo, getUserInfoByUid } from "../services/auth";

// 채팅방을 생성하여 DB에 저장
export async function addChatRoom(src, name, seller) {
  const uid = await getUserUid();
  const myInfo = await getUserInfo();
  const sellerInfo = await getUserInfoByUid(seller);

  const chatRoomData = {
    productImage: src,
    productName: name,
    participant: [seller, uid],
    participantName: [myInfo.name, sellerInfo.name],
    date: new Date(),
  };

  try {
    await addDoc(collection(FIRESTORE_DB, "ChatRoom"), chatRoomData);
  } catch (err) {
    console.log(err);
  }

  console.log(chatRoomData);
  alert("채팅방 생성!");
}

// 내가 포함된 채팅방을 가져옴
export async function getChatRoom() {
  const uid = await getUserUid();
  const chatRoomRef = collection(FIRESTORE_DB, "ChatRoom");
  const q = query(chatRoomRef, where("participant", "array-contains", uid));
  try {
    const querySnapshot = await getDocs(q);
    const chatRoomList = querySnapshot.docs.map((doc) => {
      const chatRoomData = doc.data();
      return chatRoomData;
    });

    return chatRoomList;
  } catch (err) {
    console.log(err);
  }
}
