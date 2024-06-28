import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import { Link } from 'react-router-dom';
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
import AboutButton from '/info.png';

const experiences = [
    {
        title: 'OPTIC FIBER',
        image: OpticFiber,
        cssClass: 'bgColor1',
        link: '/opticfiber'
    },
    {
        title: 'CHAOS FRACTAL',
        image: ChaosGame,
        cssClass: 'bgColor2',
        link: '/fractales'
    },
    {
        title: 'LAVA LAMP',
        image: LavaLamp,
        cssClass: 'bgColor3',
        link: '/lavalamp'
    },
    {
        title: 'PARTICLES',
        image: Particles,
        cssClass: 'bgColor4',
        link: '/particles'
    },
    {
        title: 'FLUID',
        image: Fluid,
        cssClass: 'bgColor5',
        link: '/fluid'
    },
    {
        title: 'FRACTALS',
        image: Fractal,
        cssClass: 'bgColor6',
        link: '/fractales2'
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
            <Link to="/about">
                <img
                    src={AboutButton}
                    style={{
                        zIndex: 1000,
                        position: 'fixed',
                        width: '50px',
                        height: '50px',
                        bottom: '10px',
                        right: '10px'
                    }}
                />
            </Link>

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
                                <div className="thumbnail">
                                    <Link to={experience.link}>
                                        <img
                                            src={experience.image}
                                            alt={experience.title}
                                            style={{
                                                width: '100%',
                                                height: 'auto'
                                            }}
                                        />
                                    </Link>
                                </div>
                                <h3>
                                    <Link to={experience.link}>
                                        {experience.title}
                                    </Link>
                                </h3>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default CarouselExperiences;
