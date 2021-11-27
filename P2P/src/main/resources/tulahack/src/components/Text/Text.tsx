import * as React from 'react';
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';

import './Text.scss';

export interface ITextProps extends IClassNameProps {
    xxl?: boolean,
    xl?: boolean,
    l?: boolean,
    m?: boolean,
    s?: boolean,

    // жирный
    b?: boolean,
    //серый
    g?: boolean,

    firstLetter?: boolean,
    left?: boolean
    center?: boolean;
    onClick?: () => void;
}

export const cnText = cn('Text');
export const Text: React.FC<ITextProps> = ({ className, children, onClick, ...mods }) => (
    <div onClick={ onClick } className={cnText({ ...mods }, [className])}>
        {children}
    </div>
);