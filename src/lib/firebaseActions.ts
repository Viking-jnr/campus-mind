import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { auth, db, storage } from "./firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const UploadNote = async (fileData: string, fileName: string, metaData: any) => {
    // Upload PDF to firebase
    const storageRef = ref(storage, `notes/${Date.now()}_${fileName}`);
    await uploadString(storageRef, fileData, "base64");

    const fileURL = await getDownloadURL(storageRef);

    const docRef = await addDoc(collection(db, "notes"), {
        title: metaData.title,
        topic: metaData.topic.toLowerCase(),
        author: metaData.author,
        priceHbar: metaData.priceHbar,
        fileURL: fileURL,
        description: metaData.description,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}