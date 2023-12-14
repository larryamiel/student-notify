// auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };