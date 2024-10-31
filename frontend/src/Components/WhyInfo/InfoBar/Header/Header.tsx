import React from 'react'
import style from "./styles.module.css"
import { ReactComponent as MyIcon } from '../../../../assets/icons/bullseye.svg';

interface HeaderProps {
    Text: string;
    Align: boolean;
}

function Header({ Text, Align }: HeaderProps) {
    const props = {
        "--why-header-align": Align ? 'left' : 'right',
    } as React.CSSProperties;
    return (
        <>
            {Align ? (
                <h2 className={style.headerOpt} style={props}><span className='me-2'> <MyIcon width="30" height="30" /></span>{Text}</h2>
            ) : (
                <h2 className={style.headerOpt} style={props}>{Text}<span> <MyIcon width="30" height="30" /></span></h2>
            )}

        </>
    )
}

export default Header