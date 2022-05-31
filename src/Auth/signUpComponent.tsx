import React from 'react';
import {Button, TextInput} from 'react-materialize';

interface SignUpComponentInterface {
    onEmailChange(email: string): void,
    onPasswordChange(password: string): void,
    confirmPasswordHandler(confirmPassword: string): void,
    createUser(): void,
    redirectToSignIn(): void,
}

export const SignUpComponent = ({
onEmailChange,
onPasswordChange,
confirmPasswordHandler,
createUser,
redirectToSignIn,
}:SignUpComponentInterface): JSX.Element => {
    return (
    <div className='signUp-container'>
        <TextInput
        id="TextInput-33"
        label="First Name"
        onChange={(e) => onEmailChange(e.target.value)}
        />
        <TextInput
        id="TextInput-36"
        label="Password"
        password
        onChange={(e) => onPasswordChange(e.target.value)}
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
                Sign up
            </Button>
            <Button
            className='auth-btn'
            node="button"
            waves="light"
            onClick={redirectToSignIn}
            >
                Back
            </Button>
        </div>
    </div>
    )
}
