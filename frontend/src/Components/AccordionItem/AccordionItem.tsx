import React from 'react';

import styles from './styles.module.css';

interface AccordionItemProps {
    title: string;
    content: string;
    isActive: boolean;
    onClick: () => void;
}

function AccordionItem({ title, content, isActive, onClick }: AccordionItemProps) {


    return (
        <>
            <div className='container border'>
                <div className='row'>
                    <button onClick={onClick} className={`${isActive ? styles.btn : styles.btnActive}`} >{title}</button>
                </div>
                <div className={`row ${styles.accordionContent} ${isActive ? styles.accordionContentActive : ''}`}>
                    <p className='m-3'>{content}</p>
                </div>
            </div>
        </>
    );
};

export default AccordionItem;
