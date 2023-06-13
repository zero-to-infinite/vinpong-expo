import { FIREBASE_STORAGE, FIRESTORE_DB } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { getDocs, collection, query, where } from "firebase/firestore";

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

// 특정한 조건의 상품 이미지들을 가져오는 함수(키워드, 스타일, 카테고리에 따라)
export async function getProductsByKeyword(keyword, style, category) {
  const allProductList = [];

  const productRef = collection(FIRESTORE_DB, "Product");
  if (style.length > 0) {
    const styleQ = query(
      productRef,
      where("selectedStyles", "array-contains-any", style)
    );

    try {
      const querySnapshot = await getDocs(styleQ);
      const styleProductList = querySnapshot.docs.map((doc) => {
        const product = doc.data();

        const productData = {
          id: doc.id,
          image: product.image,
          name: product.name,
          price: product.price,
        };

        return productData;
      });

      allProductList.push(...styleProductList);
    } catch (err) {
      console.log(err);
    }
  }

  if (category.length > 0) {
    const categoryQ = query(
      productRef,
      where("selectedCategories", "array-contains-any", category)
    );

    try {
      const querySnapshot = await getDocs(categoryQ);
      const categoryProductList = querySnapshot.docs.map((doc) => {
        const product = doc.data();

        const productData = {
          id: doc.id,
          image: product.image,
          name: product.name,
          price: product.price,
        };

        return productData;
      });

      allProductList.push(...categoryProductList);
    } catch (err) {
      console.log(err);
    }
  }
  // 상품 배열 안에 중복되는 값들을 제거
  const productList = [...new Set(allProductList.map(JSON.stringify))].map(
    JSON.parse
  );

  return productList;
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
