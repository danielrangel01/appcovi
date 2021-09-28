import React,{createContext, useState, useEffect, useContext} from 'react'
import { auth } from '../../../firebase-config'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = (props) => {
  

    const [currentUser, setCurrentUser] = useState({});

    const [errorUser, setErrorUser] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        })
    }, [])

    const signup = (email,pasword) => {
        return auth.createUserWithEmailAndPassword(email, pasword);
    }

    const loguin = (email, pasword) => {
        return auth.signInWithEmailAndPassword(email, pasword);
    }

    const logout = () => auth.signOut();


    const value = {signup, loguin, logout, currentUser, errorUser, setErrorUser}

   

    return (
        <AuthContext.Provider
            value={value}
        >
            {props.children}
        </AuthContext.Provider>
    )
}