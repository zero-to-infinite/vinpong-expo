import { FIRESTORE_DB, FIREBASE_AUTH } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export async function addProduct(
  name,
  price,
  condition,
  size,
  detail,
  navigation
) {
  if (name == "") {
    alert("상품명을 입력해주세요!");
  } else if (price == 0) {
    alert("가격을 입력해주세요!");
  } else if (condition == "") {
    alert("상태를 체크해주세요!");
  } else if (size == "") {
    alert("사이즈를 체크해주세요!");
  } else {
    try {
      const numericPrice = parseInt(price);

      await addDoc(collection(FIRESTORE_DB, "Product"), {
        name: name,
        price: numericPrice,
        condition: condition,
        size: size,
        detail: detail,
        date: new Date(), // 작성한 날짜와 시각
      });
      alert(`${name}\n판매글이 성공적으로 게시되었습니다!`);
      navigation.navigate("Store");
    } catch (err) {
      alert("올바르지 않은 접근입니다.\n로그인 후 다시 시도해주세요 :(");
      navigation.navigate("Loading");
      console.log(err);
    }
  }
}
