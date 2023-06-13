import { FIRESTORE_DB, FIREBASE_AUTH } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// 회원가입 (Firebase에 유저 정보를 삽입)
export async function signUp(
  email,
  pw,
  pwCheck,
  name,
  phone,
  address,
  navigation
) {
  if (email == "") {
    alert("이메일은 필수 입력입니다!");
  } else if (pw == "") {
    alert("비밀번호는 필수 입력입니다!");
  } else if (pw !== pwCheck) {
    alert("비밀번호가 일치하지 않습니다.");
  } else if (name == "") {
    alert("닉네임은 필수 입력입니다!");
  } else {
    try {
      // 새로운 유저 정보 생성 후 Authentication에 저장
      const createdUser = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        pw
      );

      // firestore의 User 컬렉션에 uid를 문서 이름으로 하는 유저 정보 삽입
      await setDoc(doc(FIRESTORE_DB, "User", createdUser.user.uid), {
        email: email,
        pw: pw,
        name: name,
        phone: phone,
        address: address,
      });
      //console.log("디비에 유저 정보 넣는것도 성공");
      alert(
        `가입을 축하드립니다!`
      );

      navigation.navigate("Home"); // 가입 후 Home 화면으로 이동
    } catch (err) {
      //console.log(err);
      switch (err.code) {
        case "auth/weak-password":
          alert("비밀번호는 6자리 이상이어야 합니다.");
          break;
        case "auth/invalid-email":
          alert("잘못된 이메일 주소 형식입니다.");
          break;
        case "auth/email-already-in-use":
          alert("이미 가입된 이메일입니다.");
          break;
      }
    }
  }
}

// 로그인 (기존에 가입되어 있는 유저인지 확인)
export async function signIn(email, pw, navigation) {
  if (email == "") {
    alert("이메일은 필수 입력입니다!");
  } else if (pw == "") {
    alert("비밀번호는 필수 입력입니다!");
  } else {
    try {
      const curUser = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        pw
      );
      if (curUser) {
        alert("로그인 성공!");
        navigation.navigate("Home");
      }
    } catch (err) {
      if (
        err.code == "auth/invalid-email" ||
        err.code == "auth/wrong-password"
      ) {
        alert("이메일 혹은 패스워드가 일치하지 않습니다.");
      } else {
        alert("로그인 실패...");
      }
      console.log(err);
    }
  }
}
// 로그아웃
export function signOut(navigation) {
  FIREBASE_AUTH.signOut();
  alert("로그아웃 되었습니다!");
  navigation.navigate("Loading");
}