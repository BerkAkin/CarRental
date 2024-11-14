import React from "react";
import Slider from "react-slick";
import './styles.css'


interface SliderProps<T> {
    header: string;
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    slidesToShow: number;

}


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



export default function SimpleSlider<T>({ header, items, renderItem, slidesToShow }: SliderProps<T>) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        adaptiveHeight: true,
        nextArrow: <SampleArrow />,
        prevArrow: <SampleArrow />
    };

    return (
        <>
            <div className="container mt-4 pt-5">
                <div className="row mb-3 ms-1">
                    <h2>{header}</h2>
                </div>
                <div className="row">
                    <Slider {...settings}>
                        {items.map((item, index) => (
                            <div key={index} className={`my-5 px-2 `}>
                                {renderItem(item)}
                            </div>
                        ))}
                    </Slider>
                </div>

            </div>
        </>

    );
}