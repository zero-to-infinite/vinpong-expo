import { FIRESTORE_DB } from "../firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getUserUid, getUserInfo, getUserInfoByUid } from "../services/firestore_user";

// 채팅방을 생성하여 DB에 저장
export async function addChatRoom(src, name, seller, navigation) {
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
    navigation.navigate("ChatRoom");
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
      const chatRoom = doc.data();
      //console.log(chatRoom)

      const chatRoomData = {
        id: doc.id,
        date: chatRoom.date,
        participant: chatRoom.participant,
        participantName: chatRoom.participantName,
        productImage: chatRoom.productImage,
        productName: chatRoom.productName,
      };

      return chatRoomData;
    });

    return chatRoomList;
  } catch (err) {
    console.log(err);
  }
}

// 메시지를 DB로 전송
export async function sendMsg(roomId, content) {
  const uid = await getUserUid();
  const userInfo = await getUserInfo();
  const userName = userInfo.name;

  const messageRef = collection(FIRESTORE_DB, `ChatRoom/${roomId}/Message`);
  try {
    await addDoc(messageRef, {
      date: new Date(),
      fromId: uid,
      fromName: userName,
      content: content,
    });
  } catch (err) {
    console.log(err);
  }
}