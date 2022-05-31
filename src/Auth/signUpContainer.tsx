import React, {useState} from 'react';
import {Button, TextInput} from 'react-materialize';
import {auth} from '../Firebase/firebase';
import {useNavigate} from 'react-router-dom';
import './style/style.css';

export const SignUpContainer = (): JSX.Element => {
    const [confirmPassword, setConfirmPassword] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    function createEmailHandler(email: string) {
        setEmail(email)
    }

    function createPasswordHandler(password: string) {
        setPassword(password)
    }
    function confirmPasswordHandler(password: string) {
        setConfirmPassword(password)
    }

    function backToAuthHandler() {
        return navigate('/auth')
    }

    async function createUser(): Promise<void> {
        try {
            if(password === confirmPassword && confirmPassword !== '') {
                await auth.createUserWithEmailAndPassword(email, password)
                navigate('/auth')
                console.log('регистрация успешна')
            }
            else {
                console.log('не сработало')
            }
        } catch (err) {
            JSON.stringify(err)
            console.log('query is rejected', err)
        }
    }

    return (
        <div className='signUp-container'>
            <TextInput
                id="TextInput-33"
                label="First Name"
                onChange={(e) => createEmailHandler(e.target.value)}
            />
            <TextInput
                id="TextInput-36"
                label="Password"
                password
                onChange={(e) => createPasswordHandler(e.target.value)}
            />
            <TextInput
                id="TextInput-36"
                label="Repeat"
                password
                onChange={(e) => confirmPasswordHandler(e.target.value)}
            />
            <div className='auth-container-btn-group'>
                <Button
                    className='auth-btn'
                    node="button"
                    waves="light"
                    onClick={createUser}
                >
                    Sign up</Button>
                <Button
                    className='auth-btn'
                    node="button"
                    waves="light"
                    onClick={backToAuthHandler}
                >
                    Back</Button>
            </div>
        </div>
    )
}