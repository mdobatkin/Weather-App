import React, { useState } from 'react';
import { auth } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { SignUpComponent } from './signUpComponent';
import './style/style.css';

export const SignUpContainer = (): JSX.Element => {
    const [confirmPassword, setConfirmPassword] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    function onEmailChange(email: string) {
        setEmail(email)
    }

    function onPasswordChange(password: string) {
        setPassword(password)
    }

    function confirmPasswordHandler(password: string) {
        setConfirmPassword(password)
    }

    function redirectToSignIn() {
        navigate('/auth')
    }

    async function createUser(): Promise<void> {
        try {

            if(password === confirmPassword && confirmPassword !== '') {
                await auth.createUserWithEmailAndPassword(email, password)
                navigate('/auth')
            } else {
                console.log('пароли не совпадают или что-то пошло не так, попробуйте позже')
            }

        } catch (err) {
            JSON.stringify(err)
            console.log('query is rejected', err)
        }
    }

    return (
        <SignUpComponent
        onPasswordChange={onPasswordChange}
        createUser={createUser}
        redirectToSignIn={redirectToSignIn}
        confirmPasswordHandler={confirmPasswordHandler}
        onEmailChange={onEmailChange}
        />
    )
}
