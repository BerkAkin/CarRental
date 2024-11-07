import React from 'react'
import style from "./styles.module.css"
import { ReactComponent as Bullseye } from '../../../../../../assets/icons/bullseye.svg';

interface HeaderProps {
    Text: string;
    Align?: boolean | "center";
    Icon?: boolean;
}

function Header({ Text, Align, Icon }: HeaderProps) {
    const props = {
        "--why-header-align": Align === 'center' ? 'center' : Align ? 'left' : 'right',
    } as React.CSSProperties;
    return (
        <>
            {Align ?
                (
                    <h2 className={style.headerOpt} style={props}>{Icon && (<span className='me-2'> <Bullseye width="30" height="30" /></span>)}{Text}</h2>
                ) : (
                    <h2 className={style.headerOpt} style={props}>{Text}{Icon && (<span className='me-2'> <Bullseye width="30" height="30" /></span>)}</h2 >
                )
            }

        </>
    )
}

export default Header