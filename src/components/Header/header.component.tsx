import React, { useEffect } from 'react';
import { useAuthContext } from '../../contexts/Firebase/Auth.context';
import './header.style.css';

function Header() {
    const { state } = useAuthContext();

    useEffect(() => {
        console.log('header user:', state.user);
    });

    return (
        <header className='component-header'>
            <p className='left-logo'>Vintoud</p>
            {state.user?.email ? (
                <p>{state.user?.email}</p>
            ) : (
                <button className='button-right-signin'>Se connecter {state.user?.email}</button>
            )}
        </header>
    );
}

export default Header;
