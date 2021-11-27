import React, { useCallback, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { cn } from '@bem-react/classname';

import './SignUp.scss';

const cnSignUp = cn('SignUp');
const signUpCn = cnSignUp();

export const SignUp: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');

    const checkPassword = useCallback(() => {
        return password !== '' && password === repPassword;
    }, [password, repPassword])

    const getColor = useCallback(() => {
        if (repPassword === '') {
            return 'secondary';
        }
        return checkPassword() ? 'secondary' : 'error'
    }, [repPassword, checkPassword]);

    const onLoginChange = useCallback(() => {
        //todo реализовать run-time проверку логина
    }, [])

    const onSignUpClick = useCallback(() => {

    }, [])

    return (
        <div className={signUpCn}>
            <TextField 
                onChange={(e) => setLogin(e.target.value)}
                label="Login"
                variant="filled"
                color="secondary"
                focused 
            />
            <TextField
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="filled"
                color="secondary"
                type='password'
                focused 
            />
            <TextField 
                onChange={(e) => setRepPassword(e.target.value)}
                label={checkPassword() ? "RepeatPassword" : 'Not the same'}
                variant="filled"
                color={getColor()}
                type='password'
                focused 
            />
            <Button
                style={{marginTop: '10px'}}
                disabled={!checkPassword() || login === ''}
                variant="outlined"
            >
                login
            </Button>
        </div>
    )
}