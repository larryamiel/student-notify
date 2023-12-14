import React, { useContext, useEffect, useState } from 'react'
import { auth, signInWithEmailAndPassword } from '../firebase/firebase';

const AuthContext = React.createContext({
    isAuth: false,
    isLoading: true,
    user: null,
    login: () => {},
    logout: () => {}
});

const AuthProvider = ({ children }) => {  
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    
    useEffect(() => {
        setIsLoading(true);
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsAuth(true);
                setUser(user);
            } else {
                setIsAuth(false);
                setUser(null);
            }
            setIsLoading(false);
        });
    }, []);

    const login = (email, password) => {
        console.log('logging in:', email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setIsAuth(true);
                setUser(user);

                console.log('logging in:', user);
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

    if (isLoading) {
        return <div className='flex h-screen justify-center items-center'>Initializing Auth</div>
    }

    return (
        <AuthContext.Provider value={{ isAuth, isLoading, user, login, logout }}>
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