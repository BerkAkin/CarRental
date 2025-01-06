import { useState } from 'react';
import AccordionItem from '../AccordionItem/AccordionItem';
import { useFAQContext } from '../../Contexts/FAQContext';

interface AccordionItemData {
    title: string;
    content: string;
}

function Accordion() {

    const { FAQs } = useFAQContext();


    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleItemClick = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            {FAQs?.map((item: AccordionItemData, index: number) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isActive={activeIndex === index}
                    onClick={() => handleItemClick(index)}
                />
            ))}
        </div>
    );
};

export default Accordion;
