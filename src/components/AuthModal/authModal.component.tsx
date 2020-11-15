import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/Firebase/Auth.context';
import './authModal.style.css';

function AuthModal() {
  const { state, doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword} = useAuthContext();
  
  const [signUpForm, setSignUpForm] = useState({ email: "", password: "", errorMessage: "" });
  const [signInForm, setSignInForm] = useState({ email: "", password: "", errorMessage: "" });

  async function onclickSubmitSignUp(event: MouseEvent<HTMLButtonElement>): Promise<void> {
    try {
      await doCreateUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    } catch (error: any) {
      setSignUpForm(prevState => ({ ...prevState, errorMessage: error.message }));
    }
  }

  async function onclickSubmitSignIn(event: MouseEvent<HTMLButtonElement>): Promise<void> {
    try {
      const test = await doSignInWithEmailAndPassword(signInForm.email, signInForm.password);
      console.log(':: test', test);
    } catch (error: any) {
      setSignInForm(prevState => ({ ...prevState, errorMessage: error.message }));
    }
  }

  function onChangeSignUpEmail(event: ChangeEvent<HTMLInputElement>): void {
    setSignUpForm(prevState => ({ ...prevState, email: event.target.value }));
  }
  function onChangeSignUpPassword(event: ChangeEvent<HTMLInputElement>): void {
    setSignUpForm(prevState => ({ ...prevState, password: event.target.value }));
  }
  function onChangeSignInEmail(event: ChangeEvent<HTMLInputElement>): void {
    setSignInForm(prevState => ({ ...prevState, email: event.target.value }));
  }
  function onChangeSignInPassword(event: ChangeEvent<HTMLInputElement>): void {
    setSignInForm(prevState => ({ ...prevState, password: event.target.value }));
  }

  return (
    <div className="component-auth-modal">
      <div className="background"></div>

      <div className="container">

        <div>
            <input
              placeholder="email"
              type="email"
              onChange={onChangeSignUpEmail}
              />

            <input
              placeholder="password"
              type="password"
              onChange={onChangeSignUpPassword}
              />
            
            <button onClick={onclickSubmitSignUp}>Valider</button>

            <p className="text-error-message">{signInForm.errorMessage}</p>
          </div>

          <div>
            <input
              placeholder="email"
              type="email"
              onChange={onChangeSignInEmail}
              />

            <input
              placeholder="password"
              type="password"
              onChange={onChangeSignInPassword}
              />
            
            <button onClick={onclickSubmitSignIn}>Valider</button>

            <p className="text-error-message">{signUpForm.errorMessage}</p>
          </div>
      </div>

    </div>
  );
}

export default AuthModal;
