import { db } from '@/firebase/firebase';
import { collection, deleteDoc, doc, getCountFromServer, getDocs, limit, or, query, setDoc, updateDoc, where } from 'firebase/firestore';

export default function useStudent() {
  const addStudent = async (student) => {
    try {
      // generate email from student id
      const email = `${student.student_id}.stu-noti@gmail.com`;

      await setDoc(doc(db, "users", email), { ...student, role: 'student', email, initialized: false });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log('Auth Error:', errorCode, errorMessage);
    }
  };

  const updateStudent = async (studentId, student) => {
    try {
      await updateDoc(doc(db, "users", studentId), student);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      await deleteDoc(doc(db, "users", studentId));
    } catch (error) {
      console.log(error);
    }
  }

  const getStudents = async (department = null, search = '') => {
    try {
      const filters = [where('role', '==', 'student'), limit(50)];

      if (department) {
        filters.push(where('department', '==', department));
      }

      if (search != '') {
        filters.push(or(where('name', '==', search), where('student_id', '==', search)));
      }

      const q = query(collection(db, "users"), ...filters);

      const querySnapshot = await getDocs(q);
      const students = [];

      querySnapshot.forEach((doc) => {
        students.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return students;
    } catch (error) {
      console.log(error);
    }
  };

  const getStudentCount = async (department = null) => {
    try {
      const extraFilters = [];

      if (department) {
        extraFilters.push(where('department', '==', department));
      }

      const q = query(collection(db, "users"), where('role', '==', 'student'), ...extraFilters);

      const snapshot = await getCountFromServer(q);
      return snapshot.data().count;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    addStudent,
    updateStudent,
    deleteStudent,
    getStudents,
    getStudentCount
  }
}
