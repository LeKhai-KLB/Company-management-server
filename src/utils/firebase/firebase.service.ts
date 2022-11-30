import { firebaseStorage } from "./firebase";
import { ref, deleteObject } from "@firebase/storage";

export const deleteFile = (url?: string) => {
  if (!url) {
    return;
  }
  return new Promise((resolve) => {
    const currentRef = ref(firebaseStorage, url);
    deleteObject(currentRef)
      .then(() => {
        resolve(currentRef);
      })
      .catch((err: any) => {
        console.error(err?.message);
      });
  });
};

export const deleteGroupStorage = (groupId: string) => {
  return new Promise((resolve) => {
    const currentRef = ref(firebaseStorage, "directory/" + groupId);
    deleteObject(currentRef)
      .then(() => {
        resolve(currentRef);
      })
      .catch((err: any) => {
        console.error(err?.message);
      });
  });
};
