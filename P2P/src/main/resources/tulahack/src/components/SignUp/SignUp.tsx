import React, { useCallback, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { cn } from '@bem-react/classname';
import axios from 'axios';
import _debounce from 'lodash/debounce';
import { useAppDispatch } from '../../hooks/hooks';
import { useShowAlertMessage } from '../../hooks/hooks';
import { baseUrl } from '../../utils/urls';

import './SignUp.scss';

const cnSignUp = cn('SignUp');
const signUpCn = cnSignUp();

const fontColor = {style: {color: 'white'}};

export const SignUp: React.FC = () => {
    const [login, setLogin] = useState('');
    const [takenLogin, setTakenLogin] = useState(false);
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');

    const showAlertMessage = useShowAlertMessage();

    const checkPassword = useCallback(() => {
        return password !== '' && password === repPassword;
    }, [password, repPassword])

    const getColor = useCallback(() => {
        if (repPassword === '') {
            return 'secondary';
        }
        return checkPassword() ? 'secondary' : 'error';
    }, [repPassword, checkPassword]);

    const onLoginChange = _debounce((value: string) => {
        setLogin(value);
        axios.get(`${baseUrl}check_login`, { params: { login: value }})
        .then(response => {
            console.log(response.data);
            setTakenLogin(response.data.status !== 'ok')
        });

    }, 200);

    const onSignUpClick = useCallback(() => {
        axios.get(`${baseUrl}registration`, { params: { login, password }})
        .then(response => {
            if (response.data.status === 'ok') {
                showAlertMessage('Registration succeed!');
            } else {
                showAlertMessage(response.data.message);
            }
        });
    }, [login, password, showAlertMessage])

    return (
        <div className={signUpCn}>
            <TextField
                inputProps={fontColor}
                onChange={(e) => onLoginChange(e.target.value)}
                label={!takenLogin ? "Login" : 'Login is taken'}
                variant="filled"
                color={!takenLogin ? "secondary" : 'error'}
                focused 
            />
            <TextField
                inputProps={fontColor}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="filled"
                color="secondary"
                type='password'
                focused 
            />
            <TextField 
                inputProps={fontColor}
                onChange={(e) => setRepPassword(e.target.value)}
                label={checkPassword() ? "RepeatPassword" : 'Not the same'}
                variant="filled"
                color={getColor()}
                type='password'
                focused 
            />
            <Button
                onClick={onSignUpClick}
                style={{marginTop: '10px'}}
                disabled={!checkPassword() || login === ''}
                variant="outlined"
            >
                Sign Up
            </Button>
        </div>
    )
}