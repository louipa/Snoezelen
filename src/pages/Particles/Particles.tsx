import React, { useContext, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { randomFieldVectors } from './perlin.js';
import * as THREE from 'three'; // Import the THREE object from the three package
import { Points } from '@react-three/drei';
import SidebarContext from '../../components/sidebarContext.js';
import ParamSlider from '../../components/parameters/paramSlider.js';
import ParamCheckBox from '../../components/parameters/paramCheckBox.js';

function randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SetBackgroundColor = ({ color }) => {
    const { scene } = useThree();

    useEffect(() => {
        scene.background = new THREE.Color(color); // Use the THREE object to set the background color
    }, [color, scene]);

    return null;
};

const randomPosition = (width: number, height: number): THREE.Vector3 =>
    new THREE.Vector3(
        randomInteger(width / -2, width / 2 - 1),
        randomInteger(height / -2, height / 2 - 1),
        0
    );

interface IParticles {
    width: number;
    height: number;
    speed: number;
    nbParticles: number;
    particleSize: number;
    randomBorderPlacement?: number;
    changeVectors?: boolean;
    maxSteps?: number;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const Generator: React.FC<IParticles> = ({
    width,
    height,
    speed,
    nbParticles,
    particleSize = 2,
    randomBorderPlacement = 5,
    maxSteps = 10,
    changeVectors = false
}) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [interpolationProgress, setInterpolationProgress] = useState(-1);
    const vectorsDivider = 4;
    const vectors = useRef<THREE.Vector3[][]>(
        randomFieldVectors(Math.min(width, height) / vectorsDivider)
    );
    const previousVectors = useRef<THREE.Vector3[][]>(vectors.current);
    const transitionSteps = useRef(0);
    const maxTransitionSteps = maxSteps;
    const [particles] = useState(() => {
        const buffer = new Float32Array(nbParticles * 3);
        for (let i = 0; i < nbParticles; i++) {
            const i3 = i * 3;
            const position = randomPosition(width, height);
            buffer[i3] = position.x;
            buffer[i3 + 1] = position.y;
            buffer[i3 + 2] = position.z;
        }
        return buffer;
    });

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useFrame((state) => {
        const mouse = new THREE.Vector3(
            (mousePosition.x * width) / 2,
            (mousePosition.y * height) / 2,
            0
        );

        if (changeVectors) {
            transitionSteps.current =
                state.clock.getElapsedTime() % maxTransitionSteps;

            if (interpolationProgress >= 0.99) {
                console.log('change');
                transitionSteps.current = 0;
                const newVectors = randomFieldVectors(
                    Math.min(width, height) / vectorsDivider
                );
                previousVectors.current = vectors.current;
                vectors.current = newVectors;
                setInterpolationProgress(0);
            }
        }

        for (let i = 0; i < particles.length / 3; i++) {
            const i3 = i * 3;
            const xIdx = Math.floor(
                (particles[i3] + width / 2) * (vectors.current.length / width)
            );
            const yIdx = Math.floor(
                (particles[i3 + 1] + height / 2) *
                    (vectors.current.length / height)
            );
            let progress = 1 - Math.abs(interpolationProgress);
            if (changeVectors) {
                progress *= 2.5;
            }
            const v0 = previousVectors.current[xIdx][yIdx];
            const v1 = vectors.current[xIdx][yIdx];
            const v = new THREE.Vector3(
                lerp(v0.x, v1.x, progress),
                lerp(v0.y, v1.y, progress),
                0
            );

            if (progress < 0.1) {
                progress = 0.1;
            }
            const toMouse = new THREE.Vector3(
                mouse.x - particles[i3],
                mouse.y - particles[i3 + 1],
                0
            ).normalize();
            particles[i3] +=
                v.x * speed * progress + toMouse.x * (2 * speed + 0.08);
            particles[i3 + 1] +=
                v.y * speed * progress + toMouse.y * (speed + 0.08);
            particles[i3 + 2] = 0;

            if (Math.random() * 100 < randomBorderPlacement) {
                const position = randomPosition(width, height);
                particles[i3] = position.x;
                particles[i3 + 1] = position.y;
            } else {
                if (particles[i3] >= width / 2) particles[i3] = -width / 2 + 1;
                if (particles[i3] <= -width / 2) particles[i3] = width / 2 - 1;
                if (particles[i3 + 1] >= height / 2)
                    particles[i3 + 1] = -height / 2 + 1;
                if (particles[i3 + 1] <= -height / 2)
                    particles[i3 + 1] = height / 2 - 1;
            }
        }
        if (changeVectors) {
            setInterpolationProgress(
                transitionSteps.current / (maxTransitionSteps / 2) - 1
            );
        }
    });

    return (
        <Points positions={particles}>
            <pointsMaterial size={particleSize} color="white" />
        </Points>
    );
};

export default function Particles() {
    const [width, setWidth] = useState(310);
    const [height, setHeight] = useState(162);
    const nbParticles = 20000;
    const [speed, setSpeed] = useState(0.1);
    const [blur, setBlur] = useState(false);
    const [animationChange, setAnimationChange] = useState(true);
    const [animationSpeed, setAnimationSpeed] = useState(10);
    const [randomSpawn, setRandomSpawn] = useState(1);
    const [particleSize, setParticleSize] = useState(2);
    const { setElementSidebar } = useContext(SidebarContext);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setElementSidebar(
            <div className="parameter-container">
                <h3>Personalize your experience</h3>

                <ParamCheckBox
                    name="Blur"
                    defaultValue={blur}
                    onChange={(e) => setBlur(Boolean(e.currentTarget.checked))}
                />
                <ParamCheckBox
                    name="Change Animation"
                    defaultValue={animationChange}
                    onChange={(e) =>
                        setAnimationChange(Boolean(e.currentTarget.checked))
                    }
                />
                <ParamSlider
                    name="Animation Frame Time"
                    min="1"
                    max="20"
                    step="0.1"
                    defaultValue={String(animationSpeed)}
                    onChange={(e) =>
                        setAnimationSpeed(Number(e.currentTarget.value))
                    }
                />
                <ParamSlider
                    name="Particles Speed"
                    min="0"
                    max="3"
                    step="0.02"
                    defaultValue={String(speed)}
                    onChange={(e) => {
                        setSpeed(Number(e.currentTarget.value));
                    }}
                />
                <ParamSlider
                    name="Chances of Particles Spawning Randomly"
                    min="0"
                    max="1"
                    step="0.1"
                    defaultValue={String(randomSpawn)}
                    onChange={(e) =>
                        setRandomSpawn(Number(e.currentTarget.value))
                    }
                />
                <ParamSlider
                    name="Particle Size"
                    min="0.1"
                    max="10"
                    step="0.1"
                    defaultValue={String(particleSize)}
                    onChange={(e) =>
                        setParticleSize(Number(e.currentTarget.value))
                    }
                />
            </div>
        );
        return () => {
            setElementSidebar(<></>);
        };
    }, [setElementSidebar, blur, animationChange, animationSpeed, randomSpawn]);
    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <Canvas
                orthographic
                camera={{ zoom: 5 }}
                style={{
                    filter: `blur(${blur ? 1 : 0}px)`,
                    background: 'black'
                }}
            >
                <SetBackgroundColor color="#222222" />
                <Generator
                    nbParticles={nbParticles}
                    width={width}
                    height={height}
                    speed={speed}
                    particleSize={particleSize}
                    changeVectors={animationChange}
                    maxSteps={animationSpeed}
                    randomBorderPlacement={randomSpawn}
                />

                <ambientLight />
            </Canvas>
            <div
                className="size100p"
                style={{
                    position: 'absolute',
                    background: 'linear-gradient(to left, red, blue)',
                    width: '100%',
                    height: '100%',
                    mixBlendMode: 'multiply',
                    top: '0'
                }}
            ></div>
        </div>
    );
}
