// @author : Louis Painter
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

const vertex = `
varying vec2 vUv;
void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    vUv = uv;
}`;

const fragment = `
    uniform vec2 iResolution;
    uniform float iTime;
    varying vec2 vUv;

    void main() {
        vec2 fragCoord = vUv * iResolution;
        vec2 p = (2.0*fragCoord-iResolution.xy)/iResolution.y;

        float time = 0.4*iTime;
        vec2 cc = 1.2*vec2( 0.5*cos(0.1*time) - 0.25*cos(0.2*time), 
                            0.5*sin(0.1*time) - 0.25*sin(0.2*time));

        vec4 dmin = vec4(1000.0);
        vec2 z = p;
        for( int i=0; i<64; i++ )
        {
            z = cc + vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y );

            dmin=min(dmin, vec4(abs(0.0+z.y + 0.5*sin(z.x)), 
                                abs(1.0+z.x + 0.5*sin(z.y)), 
                                dot(z,z),
                                length( fract(z)-0.5) ) );
        }
        
        vec3 col = vec3( dmin.w );
        col = mix( col, vec3(0.68,0.5, 0.661),   min(1.0,pow(dmin.x*0.25,0.20)) );
        col = mix( col, vec3(0.4,0.135,0.8),     min(1.0,pow(dmin.y*0.10,0.50)) );
        col = mix( col, vec3(0,0.788,0.655), 1.0-min(1.0,pow(dmin.z*1.00,0.15) ));

        col = 1.25*col*col;
        col = col*col*(3.0-2.0*col);
        
        gl_FragColor = vec4(col,1.0);
    }
    `;

const Plane: React.FC = () => {
    const materialRef = useRef<any>();
    const { size, viewport } = useThree();

    const uniforms = useMemo(
        () => ({
            iTime: {
                type: 'f',
                value: 1.0
            },
            iResolution: {
                type: 'v2',
                value: new THREE.Vector2(4, 3)
            }
        }),
        []
    );

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.material.uniforms.iTime.value =
                clock.getElapsedTime() + 50;
            materialRef.current.iResolution = (size.width, size.height);
        }
    });
    return (
        <mesh ref={materialRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertex}
                fragmentShader={fragment}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};
const FractalesShader: React.FC = () => {
    return (
        <>
            <Canvas style={{ width: '100vw', height: '100vh' }}>
                <Plane />
            </Canvas>
        </>
    );
};

export default FractalesShader;
