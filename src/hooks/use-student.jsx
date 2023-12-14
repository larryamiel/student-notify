import { auth, createUserWithEmailAndPassword, db } from '@/firebase/firebase';
import { addDoc, collection, deleteDoc, getDocs, limit, or, orderBy, query, startAt, updateDoc, where } from 'firebase/firestore';

export default function useStudent() {
  const addStudent = async (student) => {
    try {
      // generate email from student id
      const email = `${student.student_id}.stu-noti@gmail.com`;

      // create user with email and password
      await createUserWithEmailAndPassword(auth, email, 'password');

      addDoc(collection(db, "students"), student);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStudent = async (studentId, student) => {
    try {
      await updateDoc(doc(db, "students", studentId), student);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      await deleteDoc(doc(db, "students", studentId));
    } catch (error) {
      console.log(error);
    }
  }

  const getStudents = async (department = null, page = 0, search = '') => {
    try {
      const filters = [orderBy("createdAt", "desc"), startAt(page * 10), limit(10)];
      if (department) {
        filters.push(where('department', '==', department));
      }

      if (search != '') {
        filters.push(or(where('name', '==', search), where('student_id', '==', search)));
      }

      const q = query(collection(db, "students"), ...filters);

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

  return {
    addStudent,
    updateStudent,
    deleteStudent,
    getStudents
  }
}
