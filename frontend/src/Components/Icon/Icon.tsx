import React, { useState } from 'react'
import styles from './styles.module.css'
import Tooltip from '../Tooltip/Tooltip';

interface IIcon {
    children: React.ReactNode;
    TooltipText: string;
}

function Icon({ children, TooltipText }: IIcon) {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <div className={styles.iconWrapper} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
                {children}
                <Tooltip Text={TooltipText} isVisible={visible} />
            </div>
        </>
    )
}

export default Icon