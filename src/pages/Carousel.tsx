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
        bgColor1: 'blue',
        bgColor2: 'yellow'
    },
    {
        title: 'Expérience 2',
        description: "Description de l'expérience 2",
        image: 'url_image_experience_2',
        bgColor1: 'red',
        bgColor2: 'green'
    },
    {
        title: 'Expérience 3',
        description: "Description de l'expérience 3",
        image: 'url_image_experience_3',
        bgColor1: 'red',
        bgColor2: 'yellow'
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
                    background:
                        'linear-gradient(351deg, var(--myColor1), var(--myColor2))',

                    transition: '--myColor1 1s, --myColor2 1s, background 1s',
                    '--myColor1': experiences[experienceIndex].bgColor1,
                    '--myColor2': experiences[experienceIndex].bgColor2
                } as React.CSSProperties
            }
        >
            <div>
                <h2>Mes Expériences</h2>
                <div
                    style={{
                        position: 'relative',
                        maxWidth: '800px',
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
