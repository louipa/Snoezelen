import React, { useRef } from 'react';
import './about.css';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import CatImage from '/cat.png';
import Room1Image from '/room-1.png';
import Room2Image from '/room-2.png';
import Room3Image from '/room-3.png';
import Clement from '/clement.jpeg';
import Antoine from '/antoine.webp';
import Louis from '/Louis.png';
import { Link, useNavigate } from 'react-router-dom';

export default function About() {
    const parallax = useRef<IParallax>(null!);
    const navigate = useNavigate();
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background:
                    'linear-gradient(0deg, rgba(63,94,251,1) 0%, rgba(148,83,186,1) 36%, rgba(161,81,176,1) 52%, rgba(149,99,146,1) 69%, rgba(252,70,107,1) 100%)'
            }}
        >
            <Parallax ref={parallax} pages={3}>
                <ParallaxLayer
                    offset={0}
                    speed={0}
                    factor={3}
                    style={{
                        backgroundImage: `url(${Room1Image})`,
                        backgroundSize: 'contain',
                        height: 'auto',
                        width: 'auto',
                        filter: 'blur(1px)'
                    }}
                    onClick={() => parallax.current.scrollTo(1)}
                />
                <ParallaxLayer
                    offset={1}
                    speed={1}
                    style={{
                        backgroundImage: `url(${Room2Image})`,
                        backgroundSize: 'contain',
                        width: 'auto',
                        height: 'auto'
                    }}
                    onClick={() => parallax.current.scrollTo(2)}
                />
                <ParallaxLayer
                    offset={2}
                    speed={0}
                    style={{
                        backgroundImage: `url(${Room3Image})`,
                        backgroundSize: 'contain',
                        width: 'auto',
                        height: 'auto'
                    }}
                    onClick={() => parallax.current.scrollTo(0)}
                />

                <ParallaxLayer
                    offset={2}
                    speed={500}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none'
                    }}
                >
                    <img
                        src={CatImage}
                        style={{
                            width: '30%',
                            bottom: '0px',
                            position: 'absolute'
                        }}
                    />
                </ParallaxLayer>

                <ParallaxLayer
                    offset={0}
                    speed={0.1}
                    onClick={() => parallax.current.scrollTo(1)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div className="card project">
                        <h1>Snoezelen</h1>
                        <h3>Vous connaissez ?</h3>
                        <p>
                            C&apos;est une approche multisensorielle qui vise à
                            stimuler les sens de manière douce et contrôlée,
                            souvent utilisée pour les personnes ayant des
                            troubles du développement, des handicaps, ou des
                            besoins particuliers. Elle se déroule généralement
                            dans une salle aménagée avec des lumières douces,
                            des sons apaisants, et des objets tactiles, créant
                            ainsi un environnement relaxant et sécurisant.
                        </p>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={1}
                    speed={0.1}
                    onClick={(e) => {
                        if (
                            (e.target as HTMLElement).className ===
                            'prevent-scroll'
                        )
                            return;
                        parallax.current.scrollTo(2);
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div className="card">
                        <h1 style={{ marginBottom: '40px' }}>La team</h1>
                        <div
                            style={{
                                display: 'flex',
                                gap: '50px',
                                justifyContent: 'center'
                            }}
                        >
                            <Link
                                className="user"
                                to="https://www.linkedin.com/in/cl%C3%A9ment-galiot-2b4524279/"
                                target="blank"
                            >
                                <div className="prevent-scroll">
                                    <p className="prevent-scroll">Clément</p>
                                    <img
                                        className="prevent-scroll"
                                        src={Clement}
                                    />
                                </div>
                            </Link>
                            <Link
                                className="user"
                                to="https://www.linkedin.com/in/antoine-otegui-b5ba91237/"
                                target="blank"
                            >
                                <div className="prevent-scroll">
                                    <p className="prevent-scroll">Antoine</p>
                                    <img
                                        className="prevent-scroll"
                                        src={Antoine}
                                    />
                                </div>
                            </Link>
                            <Link
                                className="user"
                                to="https://www.linkedin.com/in/louis-painter-a2ba32277/"
                                target="blank"
                            >
                                <div className="prevent-scroll">
                                    <p className="prevent-scroll">Louis</p>
                                    <img
                                        className="prevent-scroll"
                                        src={Louis}
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={2}
                    speed={0}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => navigate('/')}
                >
                    <div className="card">
                        <h1>Commencer l&apos;expérience !</h1>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    );
}
