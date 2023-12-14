import React, { useContext, useEffect, useState } from 'react'
import { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase/firebase';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = React.createContext({
    isAuth: false,
    isLoading: true,
    user: null,
    login: () => {},
    logout: () => {}
});

const AuthProvider = ({ children }) => {  
    // check if user is logged in from local storage
    const localUser = localStorage.getItem('sn-user');
    
    let hasLocalUser = false;
    let localUserObject = null;
    if (localUser) {
        hasLocalUser = true;
        localUserObject = JSON.parse(localUser);
    }

    const [isAuth, setIsAuth] = useState(hasLocalUser);
    const [user, setUser] = useState(localUserObject);
    const [role, setRole] = useState(null);
    const [department, setDepartment] = useState(null);
    
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                // get user from firestore
                const userRef = doc(db, 'users', user.uid);
                const userData = await getDoc(userRef);

                const userObject = {
                    ...user,
                    ...userData.data()
                };

                setIsAuth(true);
                setUser(userObject);

                console.log('logging in:', userData.data(), user.uid);

                // store user and isauth in local storage
                localStorage.setItem('sn-user', JSON.stringify(userObject));
            } else {
                setIsAuth(false);
                setUser(null);

                // remove user and isauth from local storage
                localStorage.removeItem('sn-user');
            }
        });
    }, []);

    const login = async (username, password) => {
        // check for username
        if (!username || !password) {
            console.log('username or password is empty');
            return;
        }

        // check if username is email
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        let email = username;
        if (!emailRegex.test(email)) {
            // generate email from student id
            email = `${email}.stu-noti@gmail.com`;
        }

        // check if user is temporary_user
        const temporaryUserRef = doc(db, 'users', email);
        const temporaryUser = await getDoc(temporaryUserRef);

        console.log('email is:', email);

        if (temporaryUser.exists()) {
            // get temporary user
            const temporaryUserData = temporaryUser.data();

            console.log('temporary user exists', temporaryUserData);

            // check if initialized
            if (!temporaryUserData.initialized) {
                // create user in auth
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // remove old entry and create new one
                await deleteDoc(temporaryUserRef);

                // create new user
                await setDoc(doc(db, "users", user.uid), { ...temporaryUserData, initialized: true });
            }
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;

                // get user from firestore
                const userRef = doc(db, 'users', user.uid);
                const userData = await getDoc(userRef);

                const userObject = {
                    ...user,
                    ...userData.data()
                };

                setIsAuth(true);
                setUser(userObject);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log('Auth Error:', errorCode, errorMessage);
            });
    };

    const logout = () => {
        auth.signOut().then(() => {
            setIsAuth(false);
            setUser(null);
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    return (
        <AuthContext.Provider value={{ isAuth, user, role, department, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            `useAuth must be used within a AuthProvider`
        );
    }

    return context;
}

export { useAuth, AuthContext, AuthProvider };