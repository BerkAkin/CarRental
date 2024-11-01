import React from 'react';
import style from './styles.module.css';

interface ParagraphProps {
    Text: string;
    Align?: boolean | 'center';
}

function Paragraph({ Text, Align }: ParagraphProps) {
    const props = {
        "--why-paragraph-align": Align === 'center' ? 'center' : Align ? 'left' : 'right',
    } as React.CSSProperties;

    return (
        <p className={style.paragraphOpt} style={props}>
            {Text}
        </p>
    );
}

export default Paragraph;
