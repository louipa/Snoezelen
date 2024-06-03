import React, { useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

export class Worm {
    width: number;
    length: number;
    headPosition: { x: number; y: number };
    headDirection: { x: number; y: number };
    headMomentum: { x: number; y: number };
    body: THREE.Vector2[];
    speed: number;
    color: string;

    constructor(
        width: number,
        length: number,
        headPosition: { x: number; y: number },
        headDirection: { x: number; y: number },
        headMomentum: { x: number; y: number },
        body: THREE.Vector2[],
        speed: number,
        color: string
    ) {
        this.width = width;
        this.length = length;
        this.headPosition = headPosition;
        this.headDirection = headDirection;
        this.headMomentum = headMomentum;
        this.body = body;
        this.speed = speed;
        this.color = color;
    }

    copy() {
        return new Worm(
            this.width,
            this.length,
            { ...this.headPosition },
            { ...this.headDirection },
            { ...this.headMomentum },
            [...this.body],
            this.speed,
            this.color
        );
    }

    movePosition() {
        this.headDirection.x =
            0.9 * this.headDirection.x + 0.1 * this.headMomentum.x;
        this.headDirection.y =
            0.9 * this.headDirection.y + 0.1 * this.headMomentum.y;

        this.headPosition.x += this.headDirection.x * this.speed;
        this.headPosition.y += this.headDirection.y * this.speed;
        this.body.unshift(
            new THREE.Vector2(this.headPosition.x, this.headPosition.y)
        );
        if (this.body.length > this.length) {
            this.body.pop();
        }
    }
}

export default function Fluid(props: {
    fieldVector: { x: number; y: number }[][];
    numberWorms: number;
    wormLength: number;
    wormWidth: number;
}) {
    const fieldChunk = props.fieldVector.length;

    const { camera, size } = useThree();
    const [bounds, setBounds] = useState<
        { width: number; height: number } | undefined
    >(undefined);

    const [allWorm, setAllWorm] = useState<Worm[]>(
        Array.from(
            { length: props.numberWorms },
            () =>
                new Worm(
                    props.wormWidth,
                    Math.max(
                        Math.floor(
                            ((1 + Math.random()) * props.wormLength) / 2
                        ),
                        2
                    ),
                    { x: 40000000, y: 40000000 },
                    { x: 0, y: 0 },
                    { x: 0, y: 0 },
                    [],
                    6,
                    'white'
                )
        )
    );

    useEffect(() => {
        if (camera instanceof THREE.OrthographicCamera) {
            setBounds({
                width: camera.top - camera.bottom + 1000,
                height: camera.right - camera.left + 600
            });
        }
    }, [camera, size]);

    useFrame(() => {
        if (bounds) {
            setAllWorm((prevWorms) =>
                prevWorms.map((worm) => {
                    let i = Math.floor(
                        (worm.headPosition.x + bounds.width / 2) /
                            (bounds.width / fieldChunk)
                    );
                    let j = Math.floor(
                        (worm.headPosition.y + bounds.height / 2) /
                            (bounds.height / fieldChunk)
                    );
                    if (
                        i < 0 ||
                        i > fieldChunk - 1 ||
                        j < 0 ||
                        j > fieldChunk - 1
                    ) {
                        i = 0;
                        j = 0;
                        worm.headPosition = {
                            x: Math.random() * bounds.width - bounds.width / 2,
                            y: Math.random() * bounds.height - bounds.height / 2
                        };
                        worm.body = [];
                        worm.headDirection = { x: 0, y: 0 };
                    }
                    worm.headMomentum = props.fieldVector[i][j];

                    const newWorm = worm.copy();
                    newWorm.movePosition();
                    return newWorm;
                })
            );
        }
    });

    return (
        <group>
            {allWorm.map((worm, index) => (
                <Line
                    key={index}
                    points={
                        worm.body.length >= 2
                            ? worm.body
                            : [
                                  [0, 0],
                                  [0, 0]
                              ]
                    }
                    color={worm.color}
                    lineWidth={worm.width}
                />
            ))}
        </group>
    );
}
