import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { cn } from '@bem-react/classname';
import axios from 'axios';
import { baseUrl } from '../../utils/urls';
import { useAppDispatch, useShowAlertMessage } from '../../hooks/hooks';
import { generateRSA } from '../../utils/rsaModule';
import { setPage } from '../../AppSlice';
import { setLogin as reduxSetLogin} from '../../pages/Main/AuthSlice';

import './SignIn.scss';

const cnSignIn = cn('SignIn');
const signInCn = cnSignIn();

const fontColor = {style: {color: 'white'}};


export const SignIn: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const showAlertMessage = useShowAlertMessage();
    const dispatch = useAppDispatch();

    const onSignInClick = () => {
        let publicKey = localStorage.getItem('publickKey');

        const request = (publicKey: string) => {
            axios(`${baseUrl}auth`, { params: {login, password, public_key: publicKey }})
            .then(response => {
                if (response.data.status === 'ok') {
                    showAlertMessage('Authorization succeed!');
                    dispatch(setPage('chat'));
                    dispatch(reduxSetLogin(login));
                } else {
                    showAlertMessage(response.data.message);
                }
            })
        }
        
        if (publicKey) {
            request(publicKey)
        } else {
            generateRSA().then(pair => {
                const pubKey = JSON.stringify(pair.pubKey);
                localStorage.setItem('publicKey', pubKey);
                localStorage.setItem('privateKey', JSON.stringify(pair.privKey));
                request(pubKey);
            })
        }
    }

    return (
        <div className={signInCn}>
            <TextField onChange={(e) => setLogin(e.target.value)} inputProps={fontColor} label="Login" variant="filled" color="secondary" focused />
            <TextField onChange={(e) => setPassword(e.target.value)} inputProps={fontColor} label="Password" variant="filled" color="secondary" focused type='password' />
            <Button onClick={onSignInClick} style={{marginTop: '10px'}} variant="outlined">
                Sign In
            </Button>
        </div>
    )
}