import React, { useEffect, useState } from 'react';
import FirebaseAuth from '../../services/Firebase/firebaseAuth.service';

const auth = new FirebaseAuth();

const initialState: any = {
    user: null,
};

export const AuthContext = React.createContext({
    state: initialState,
    doCreateUserWithEmailAndPassword: (email: string, password: string) => {},
    doSignInWithEmailAndPassword: (email: string, password: string) => {},
});

function AuthProvider(props: any) {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        auth.initOnAuthStateChanged((user) => {
            if (user) { 
                const formatedUser = {
                    email: user.email
                }
                setState((prevState: any) => ({ ...prevState, user: formatedUser }));
            }
        });
    }, []);

    function doCreateUserWithEmailAndPassword(email: string, password: string) {
        return auth.doCreateUserWithEmailAndPassword(email, password);
    }

    function doSignInWithEmailAndPassword(email: string, password: string) {
        return auth.doSignInWithEmailAndPassword(email, password);
    }

    const contextValue = { state, doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword };

    return <AuthContext.Provider value={contextValue} {...props} />;
}

function useAuthContext() {
    return React.useContext(AuthContext);
}

export { AuthProvider, useAuthContext };
