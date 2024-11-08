import React from 'react';
import Button from '../../../../Button/Button';
import styles from './styles.module.css';

interface AccordionItemProps {
    title: string;
    content: string;
    isActive: boolean;
    onClick: () => void;
}

function AccordionItem({ title, content, isActive, onClick }: AccordionItemProps) {
    const bgColor = isActive ? '#E7F1FF' : 'white';
    const color = isActive ? '#0C63E4' : 'black';


    return (
        <>
            <div className='container border'>
                <div className='row'>
                    <Button tAlign='start' Padding='10px 0px 10px 15px' Height='50px' Text={title} Width='100%' BgColor={bgColor} Color={color} Func={onClick} />
                </div>
                <div className={`row ${styles.accordionContent} ${isActive ? styles.accordionContentActive : ''}`}>
                    <p className='m-3'>{content}</p>
                </div>
            </div>
        </>
    );
};

export default AccordionItem;
