import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

const experiences = [
    {
        title: 'Expérience 1',
        description: "Description de l'expérience 1",
        image: 'url_image_experience_1',
        cssClass: 'bgColor1'
    },
    {
        title: 'Expérience 2',
        description: "Description de l'expérience 2",
        image: 'url_image_experience_2',
        cssClass: 'bgColor2'
    },
    {
        title: 'Expérience 3',
        description: "Description de l'expérience 3",
        image: 'url_image_experience_3',
        cssClass: 'bgColor3'
    }
];

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                background: 'black',
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translate(0, -50%)',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                zIndex: 1,
                cursor: 'pointer'
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                background: 'black',
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translate(0, -50%)',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                zIndex: 1,
                cursor: 'pointer'
            }}
            onClick={onClick}
        />
    );
}

const CarouselExperiences: React.FC = () => {
    const [experienceIndex, setExperienceIndex] = useState(0);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        beforeChange: (oldIndex: number, newIndex: number) => {
            setExperienceIndex(newIndex);
        }
    };

    return (
        <div
            style={
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                } as React.CSSProperties
            }
        >
            <div
                className={`coloredBG ${experiences[experienceIndex].cssClass}`}
            ></div>
            <div>
                <h2>Mes Expériences</h2>
                <div
                    style={{
                        position: 'relative',
                        maxWidth: 'min(800px, 100vw)',
                        margin: '0 auto'
                    }}
                >
                    <Slider {...settings}>
                        {experiences.map((experience, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: '10px'
                                }}
                            >
                                <img
                                    src={experience.image}
                                    alt={experience.title}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                                <h3>{experience.title}</h3>
                                <p>{experience.description}</p>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default CarouselExperiences;
