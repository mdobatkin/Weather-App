import React from 'react';
import {Button, TextInput} from 'react-materialize';

interface AuthComponentInterface {
    onChangeEmail(email: string): void,
    onChangePassword(password: string): void,
    signInUser(): void,
    redirectSignUp(): void
}

export const AuthComponent = ({
onChangeEmail,
onChangePassword,
redirectSignUp,
signInUser,
}: AuthComponentInterface): JSX.Element => {
    return (
    <div className='auth-container'>
        <TextInput
        email
        id="TextInput-39"
        label="Email"
        validate
        onChange={(e) => onChangeEmail(e.target.value)}
        />
        <TextInput
        id="TextInput-42"
        label="Password"
        password
        onChange={(e) => onChangePassword(e.target.value)}
        />
        <div className='auth-container-btn-group'>
            <Button
            className='auth-btn'
            node="button"
            waves="light"
            onClick={signInUser}
            >
                Sign in
            </Button>
            <Button
            className='auth-btn'
            node="button"
            waves="light"
            onClick={redirectSignUp}
            >
                Sign up
            </Button>
        </div>
    </div>
    )
}
