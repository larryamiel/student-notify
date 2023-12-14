import { db } from '@/firebase/firebase';
import { collection, deleteDoc, doc, getDocs, or, query, setDoc, updateDoc, where } from 'firebase/firestore';

export default function useAdministrator() {
  const addAdministrator = async (administrator) => {
    try {
      console.log('adding administrator', administrator);
      await setDoc(doc(db, "users", administrator.email), { ...administrator, role: 'administrator', initialized: false });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log('Auth Error:', errorCode, errorMessage);
    }
  };

  const updateAdministrator = async (administratorId, administrator) => {
    try {
      await updateDoc(doc(db, "users", administratorId), administrator);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAdministrator = async (administratorId) => {
    try {
      await deleteDoc(doc(db, "users", administratorId));
    } catch (error) {
      console.log(error);
    }
  }

  const getAdministrators = async (department = null, search = '') => {
    try {
      const filters = [where('role', '==', 'administrator')];

      if (department) {
        filters.push(where('department', '==', department));
      }

      if (search != '') {
        filters.push(or(where('name', '==', search), where('administrator_id', '==', search)));
      }

      const q = query(collection(db, "users"), ...filters);

      const querySnapshot = await getDocs(q);
      const administrators = [];

      querySnapshot.forEach((doc) => {
        administrators.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return administrators;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addAdministrator,
    updateAdministrator,
    deleteAdministrator,
    getAdministrators
  }
}
