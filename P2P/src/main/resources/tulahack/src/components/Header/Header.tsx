import React from 'react'
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../hooks/hooks';
import { BaseType, setBase } from '../../pages/Main/AuthSlice';

import './Header.scss';

interface HeaderProps extends IClassNameProps {

}

const cnHeader = cn('Header');
const headerCn = cnHeader();

export const Header = (props: HeaderProps) => {
    const dispatch = useAppDispatch();

    const changeBase = (base: BaseType) => {
        dispatch(setBase(base));
    }

    return (
        <div className={headerCn}>
            <Button onClick={() => changeBase('Info')} variant="outlined" style={{marginRight: '5px'}}>
                Info
            </Button>
            <Button onClick={() => changeBase('SignIn')} variant="outlined" style={{marginRight: '5px'}}>
                Sign In
            </Button>
            <Button onClick={() => changeBase('SignUp')} variant="outlined" style={{marginRight: '5px'}}>
                Sign Up
            </Button>
        </div>
    )
}