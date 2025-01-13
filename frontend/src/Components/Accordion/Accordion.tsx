import { useState } from 'react';
import AccordionItem from '../AccordionItem/AccordionItem';
import { useFAQContext } from '../../Contexts/FAQContext';

interface AccordionItemData {
    title: string;
    content: string;
}
interface AccordionItems {
    data: AccordionItemData[];
}

function Accordion({ data }: AccordionItems) {

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleItemClick = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            {data?.map((item: AccordionItemData, index: number) => (
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
