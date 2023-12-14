import React from 'react'

export default function useMessage() {
  const sendMessage = async (message) => {
    try {
      await addDoc(collection(db, "messages"), message);
    } catch (error) {
      console.log(error);
    }
  }
}
