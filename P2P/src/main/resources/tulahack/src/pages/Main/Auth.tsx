import React, { useState, useCallback } from 'react';
import { BackgroundStars } from '../../components/BackgroundStars/BackgroundStars';
import { Header } from '../../components/Header/Header';
import { useAppSelector  } from '../../hooks/hooks'
import { SignIn } from '../../components/SignIn/SignIn';
import { SignUp } from '../../components/SignUp/SignUp';
import { cn } from '@bem-react/classname';

import './Auth.scss';

const cnAuth = cn('Auth');
const authCn = cnAuth();
const authHeaderCn = cnAuth('Header');
const authBaseCn = cnAuth('Base');

export const Auth = () => {
    const { base } = useAppSelector(state => state.base);

    const renderBase = useCallback(() => {
        const baseEl = base === 'Info' ? renderInfo() : base === 'SignIn' ? renderSignIn() : renderSignUp();
        return (
            <div className={authBaseCn}>
                {baseEl}
            </div>
        )
    }, [base]);

    const renderInfo = () => {
        return (
            <div style={{color: 'white'}}>
                <img 
                    src="../img/Decentralization_diagram.svg" 
                    alt="how it works" 
                    height="87"
                    width="100"
                />
                {/* <DecSvg /> */}
            </div>
        )
    }

    const renderSignUp = () => {
        return <SignUp />
    }

    const renderSignIn = () => {
        return <SignIn />
    }

    return (
        <div className={authCn}>
            <Header />
            {renderBase()}
        </div>
    )
}