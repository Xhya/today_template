import React from 'react';
import './App.css';
import AuthModal from './components/AuthModal/authModal.component';
import Header from './components/Header/header.component';
import Homepage from './components/Homepage/homepage.component';
import { AuthProvider } from './contexts/Firebase/Auth.context';
import { StorageProvider } from './contexts/Firebase/Storage.context';

function App() {
    return (
        <div className='App'>
            <AuthProvider>
                <StorageProvider>
                    <Header></Header>
                    <Homepage></Homepage>
                    {/* <AuthModal></AuthModal> */}
                </StorageProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
