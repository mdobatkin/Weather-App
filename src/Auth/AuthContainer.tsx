import React, {useState} from 'react';
import {Button, TextInput} from 'react-materialize';
import {auth} from '../Firebase/firebase';
import firebase from 'firebase/compat/app';
import {useNavigate} from 'react-router-dom';
import './style/style.css';

export const AuthContainer = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState<firebase.User | null>(null)
    const navigate = useNavigate();

    function createEmail(email: string) {
        setEmail(email)
    }

    function createPassword(password: string) {
        setPassword(password)
    }

    function redirectSignUp() {
        return navigate('/signUp')
    }

    const userSignIn = async () => {
        try {
            const response: firebase.auth.UserCredential = await auth.signInWithEmailAndPassword(email, password)
            console.log('Аутентификация пройдена успешно:', response)
            if (response) {
            setUser(response.user)
                navigate('/');
            }
        } catch (err) {
            JSON.stringify(err)
            console.log('query is rejected', err)
        }
    }

    return (
            <div className='auth-container'>
                <TextInput
                    email
                    id="TextInput-39"
                    label="Email"
                    validate
                    onChange={(e) => createEmail(e.target.value)}
                />
                <TextInput
                    id="TextInput-42"
                    label="Password"
                    password
                    onChange={(e) => createPassword(e.target.value)}
                />
                <div className='auth-container-btn-group'>
                    <Button
                        className='auth-btn'
                        node="button"
                        waves="light"
                        onClick={userSignIn}
                    >
                        Sign in</Button>
                    <Button
                        className='auth-btn'
                        node="button"
                        waves="light"
                        onClick={redirectSignUp}
                    >
                        Sign up</Button>
                </div>
            </div>
        )
}

