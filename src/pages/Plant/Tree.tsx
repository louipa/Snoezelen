import React, { useMemo } from 'react';
import { generateTree } from './struct';
import * as THREE from 'three';

export const Tree = ({ depth }) => {
    const tree = useMemo(() => generateTree(depth), [depth]);

    const getPositions = (
        node,
        x = 0,
        y = 0,
        z = 0,
        order = 1,
        positions = [],
        colors = []
    ) => {
        const length = 2;
        const angle = Math.PI / 4;
        const color = new THREE.Color(
            `hsl(${(node.order / depth) * 360}, 100%, 50%)`
        );

        if (node.children.length > 0) {
            node.children.forEach((child, index) => {
                const newX = x + length * Math.cos(angle * (index * 2 - 1));
                const newY = y - length;
                const newZ = z + length * Math.sin(angle * (index * 2 - 1));

                positions.push([x, y, z, newX, newY, newZ]);
                colors.push(color);

                getPositions(
                    child,
                    newX,
                    newY,
                    newZ,
                    child.order,
                    positions,
                    colors
                );
            });
        }

        return { positions, colors };
    };

    const { positions, colors } = useMemo(() => getPositions(tree), [tree]);

    return (
        <group>
            {positions.map(([x1, y1, z1, x2, y2, z2], index) => (
                <line key={index}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            array={new Float32Array([x1, y1, z1, x2, y2, z2])}
                            itemSize={3}
                            count={2}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial
                        attach="material"
                        color={colors[index]}
                    />
                </line>
            ))}
        </group>
    );
};
