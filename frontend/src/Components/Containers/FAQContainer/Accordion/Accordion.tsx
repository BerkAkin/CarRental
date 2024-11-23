import React, { useEffect, useState } from 'react';
import AccordionItem from './Item/AccordionItem';
import apiService from '../../../../api/apiService';
import { endpoints } from '../../../../api/apiConfig';

interface AccordionItemData {
    title: string;
    content: string;
}


function Accordion() {


    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiService(endpoints.faq, "GET");
                setData(data);
                console.log(data);
            }
            catch (err) {
                setError(`${err}`);
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleItemClick = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (loading) return <p>Yükleniyor</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            {data.map((item: AccordionItemData, index: number) => (
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
