import React from "react";
import Slider from "react-slick";
import './styles.css'
import SliderCard from "./SliderCard/SliderCard";

function SampleArrow(props: any) {

    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style }}
            onClick={onClick}
        />
    );
}

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


export default function SimpleSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleArrow />,
        prevArrow: <SampleArrow />
    };

    return (
        <>
            <div className="container mt-4 pt-5">
                <div className="row mb-3 ms-1">
                    <h2>Flexper için neler dediler?</h2>
                </div>
                <div className="row">
                    <Slider {...settings}>
                        {cards.map((card, index) => (
                            <div key={index} className={`sliderContainerRowSizing mt-4 px-2 `}>
                                <SliderCard
                                    Comment={card.Comment}
                                    Person={card.Person}
                                    StarCount={card.StarCount}
                                    Type={card.Type}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

            </div>
        </>

    );
}