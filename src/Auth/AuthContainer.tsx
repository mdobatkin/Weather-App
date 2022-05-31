import React, {useState} from 'react';
import firebase from 'firebase/compat/app';
import {auth} from '../Firebase/firebase';
import {useNavigate} from 'react-router-dom';
import {AuthComponent} from './authComponent';
import './style/style.css';


export const AuthContainer = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState<firebase.User | null>(null)
    const navigate = useNavigate();

    function onChangeEmail(email: string) {
        setEmail(email)
    }

    function onChangePassword(password: string) {
        setPassword(password)
    }

    function redirectSignUp() {
        return navigate('/signUp')
    }

    const signInUser = async () => {
        try {
            const response: firebase.auth.UserCredential = await auth.signInWithEmailAndPassword(email, password)

            if (response) {
            setUser(response.user)
            navigate('/');
            }

        } catch (err) {
            JSON.stringify(err)
            console.log('запрос отклонен, произошла ошибка', err)
        }
    }

    return (
        <AuthComponent
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            redirectSignUp={redirectSignUp}
            signInUser={signInUser}
        />
        )
}
