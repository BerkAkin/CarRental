import React, { useState, useMemo } from 'react';
import SliderCard from './SliderCard/SliderCard';
import styles from './styles.module.css';
import Button from '../Button/Button';


const cards = [
    {
        Comment: 'Aylık ödediğim bedele ek ücret yansıtmadan Oto yıkama Vale gibi hizmetleri de sağlıyor olmaları benim farklı bir kiralama deneyimi yaşamamı sağladı',
        Person: 'Berk A.',
        StarCount: "★★★★★",
        Type: 'Flexper Abonesi'
    },
    {
        Comment: 'Flexper projesini ilk defa duyduğumda heyecanlanmıştım. Gayet ekonomik bir çözüm olduğunu söyleyebilirim ',
        Person: 'Ali K.',
        StarCount: "★★★★",
        Type: 'Flexper Abonesi'
    },
    {
        Comment: 'Dönemsel olarak ekonomik koşullarda araç kiralayabilme imkanı sağlamaları bu projeyi tercih etmemi sağladı',
        Person: 'Semiha D.',
        StarCount: "★★★",
        Type: 'Flexper Abonesi'
    },
    {
        Comment: 'Araç abonelik rahatlığını ben de yaşamak istedim. Hiçbir şeyi düşünmüyorum benim için düşünenler var, her zaman arayabileceğim kişiler var. Bundan çok memnundum',
        Person: 'Onur A.',
        StarCount: "★★",
        Type: 'Flexper Abonesi'
    },
];

function Slider() {
    const [startIndex, setStartIndex] = useState(0);
    const itemsToShow = 3;

    const displayedCards = useMemo(() => {
        const wrappedCards = [...cards.slice(startIndex), ...cards.slice(0, startIndex)];
        return wrappedCards.slice(0, itemsToShow);
    }, [startIndex]);

    const handleNext = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const handlePrevious = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    };

    return (
        <>
            <div className='container-fluid d-flex justify-content-center align-items-center mt-5 pt-5'>
                <div className='row '>
                    <Button Func={handlePrevious} Height="50px" Text='<' Width='25px' BgColor="#1A2B48" Color="white" Padding='0px' CrRd='10%' aria-label="Önceki" />
                </div>
                <div className='container ms-2 me-2'>
                    <div className='  row'>
                        <h1 className={styles.headerSizing}>Flexper için neler dediler</h1>
                    </div>
                    <div className={`${styles.sliderContainerRowSizing}   row mt-4`}>
                        {displayedCards.map((card, index) => (
                            <SliderCard key={index} Comment={card.Comment} Person={card.Person} StarCount={card.StarCount} Type={card.Type} />
                        ))}
                    </div>
                    <div className='container d-flex justify-content-end mt-3'>
                        <div className='row'>
                            <Button Height="35px" Text='Daha Fazlasını Oku' Width='150px' BgColor="#E00000" Color="white" Padding='0px' CrRd='3px' aria-label="DahaFazla" />

                        </div>
                    </div>
                </div>
                <div className='row'>
                    <Button Func={handleNext} Height="50px" Text='>' Width='25px' BgColor="#1A2B48" Color="white" Padding='0px' CrRd='10%' aria-label="Sonraki" />
                </div>
            </div>

        </>
    );
}

export default Slider;
