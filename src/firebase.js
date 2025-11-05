// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8S_aE5I52rQf1AIedW8MMgpeGmWzuBA0",
  authDomain: "edie-xu-backend.firebaseapp.com",
  projectId: "edie-xu-backend",
  storageBucket: "edie-xu-backend.firebasestorage.app",
  messagingSenderId: "49174602487",
  appId: "1:49174602487:web:b2f9c1e61c91aa196a466a",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Upload image to Firebase Storage
export const uploadImage = async (file, folder = "images") => {
  try {
    const timestamp = Date.now();
    const filename = `${folder}/${timestamp}-${file.name}`;
    const storageRef = ref(storage, filename);

    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const uploadVideo = async (file, folder = "videos", onProgress) => {
  const timestamp = Date.now();
  const filename = `${folder}/${timestamp}-${file.name}`;
  const storageRef = ref(storage, filename);

  // For progress tracking, you'd need uploadBytesResumable
  // But for simplicity, we'll use uploadBytes
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

// Delete image from Firebase Storage
export const deleteImage = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error("Error deletin  g image:", error);
    return false;
  }
};

export { storage };
