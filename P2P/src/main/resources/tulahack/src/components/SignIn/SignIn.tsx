import React from 'react';
import { TextField, Button } from '@mui/material';
import { cn } from '@bem-react/classname';

import './SignIn.scss';

const cnSignIn = cn('SignIn');
const signInCn = cnSignIn();

export const SignIn: React.FC = () => {
    return (
        <div className={signInCn}>
            <TextField label="Login" variant="filled" color="secondary" focused />
            <TextField label="Password" variant="filled" color="secondary" focused type='password' />
            <Button style={{marginTop: '10px'}} variant="outlined">
                login
            </Button>
        </div>
    )
}