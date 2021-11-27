import React from 'react';
import { TextField, Button } from '@mui/material';
import { cn } from '@bem-react/classname';

import './SignIn.scss';

const cnSignIn = cn('SignIn');
const signInCn = cnSignIn();

const fontColor = {style: {color: 'white'}};

export const SignIn: React.FC = () => {
    return (
        <div className={signInCn}>
            <TextField inputProps={fontColor} label="Login" variant="filled" color="secondary" focused />
            <TextField inputProps={fontColor} label="Password" variant="filled" color="secondary" focused type='password' />
            <Button style={{marginTop: '10px'}} variant="outlined">
                login
            </Button>
        </div>
    )
}