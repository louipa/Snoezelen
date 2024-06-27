import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import SunRays from '/SunRays.png';
import SeaWater from '/seaWater.jpg';
import Bubble from '/bubble.png';
import Fishs from '/fish.png';
import Stars from '/stars.png';
import ChaosGame from '/ChaosGame.webp';
import Fluid from '/Fluid.webp';
import Fractal from '/Fractal.webp';
import LavaLamp from '/LavaLamp.webp';
import OpticFiber from '/OpticFiber.webp';
import Particles from '/Particles.webp';
import Planete1 from '/firstPlanete.png';
import Planete2 from '/planete2.png';
import Planete3 from '/planete3.png';

const experiences = [
    {
        title: 'Expérience 1',
        description: "Description de l'expérience 1",
        image: OpticFiber,
        cssClass: 'bgColor1'
    },
    {
        title: 'Expérience 2',
        description: "Description de l'expérience 2",
        image: ChaosGame,
        cssClass: 'bgColor2'
    },
    {
        title: 'Expérience 3',
        description: "Description de l'expérience 3",
        image: LavaLamp,
        cssClass: 'bgColor3'
    },
    {
        title: 'Expérience 4',
        description: "Description de l'expérience 4",
        image: Particles,
        cssClass: 'bgColor4'
    },
    {
        title: 'Expérience 5',
        description: "Description de l'expérience 5",
        image: Fluid,
        cssClass: 'bgColor5'
    },
    {
        title: 'Expérience 6',
        description: "Description de l'expérience 6",
        image: Fractal,
        cssClass: 'bgColor6'
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
                className={`seaBackground ${experiences[experienceIndex].cssClass}`}
            >
                <div className={'seaWave'}>
                    <div
                        style={{
                            backgroundImage: `linear-gradient(to bottom, transparent, black), url(${SeaWater})`
                        }}
                    ></div>
                </div>
                <div className={'fishs'}>
                    <div
                        style={
                            {
                                '--backgroundFishs': `url(${Fishs})`
                            } as React.CSSProperties
                        }
                    ></div>
                    <div
                        style={
                            {
                                '--backgroundFishs': `url(${Fishs})`
                            } as React.CSSProperties
                        }
                    ></div>
                </div>
                <div className={'bubbles'}>
                    <div
                        style={
                            {
                                '--backgroundBubble': `url(${Bubble})`
                            } as React.CSSProperties
                        }
                    ></div>
                </div>
                <div className={'sunRays'}>
                    <div></div>
                </div>
                <div
                    className={'stars'}
                    style={{
                        backgroundImage: `url(${Stars})`
                    }}
                ></div>
                <div className={'planete'}>
                    <img src={Planete1}></img>
                    <img src={Planete2}></img>
                    <img src={Planete3}></img>
                </div>
            </div>
            <div className="backFrame"></div>
            <div>
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
