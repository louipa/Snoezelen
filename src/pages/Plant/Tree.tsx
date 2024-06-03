import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

// Assume generateTree is defined elsewhere and imported correctly
import { generateTree } from './struct';
import { randomInteger } from '../../utils';

export const Tree: React.FC<{ depth: number }> = ({ depth }) => {
    const tree = useMemo(() => generateTree(depth), [depth]);

    const getPositions = (
        node,
        depth = 1,
        x = 0,
        y = -3,
        z = 0,
        positions = [],
        colors = [],
        leaves = []
    ) => {
        const length = 1;
        const angle = Math.PI / 4;
        const color = new THREE.Color(
            `hsl(${(node.order / depth) * 360}, 100%, 50%)`
        );

        // Add leaves to the current node
        const leafDistance = 0.01;
        const leftLeafPosition = [x - leafDistance, y, z];
        const rightLeafPosition = [x + leafDistance, y, z];

        // Define orientation and scaling for the leaves
        const leftLeafOrientation = {
            rotation: [0, 0, Math.PI / 4],
            scale: [1, 1, 0]
        };

        const rightLeafOrientation = {
            rotation: [0, 0, -Math.PI / 4],
            scale: [1, 1, 0]
        };

        leaves.push({
            position: leftLeafPosition,
            color: color,
            ...leftLeafOrientation
        });
        leaves.push({
            position: rightLeafPosition,
            color: color,
            ...rightLeafOrientation
        });

        if (node.children.length > 0) {
            node.children.forEach((child, index) => {
                const branchAngle = angle * (index === 0 ? -1 : 1);
                const newX =
                    x +
                    length *
                        Math.sin(branchAngle) *
                        randomInteger(index === 0 ? -1 : 1, depth);
                const newY =
                    y +
                    length * Math.cos(branchAngle) * randomInteger(1, depth);
                const newZ = z;

                positions.push(x, y, z, newX, newY, newZ);
                colors.push(
                    color.r,
                    color.g,
                    color.b,
                    color.r,
                    color.g,
                    color.b
                );

                getPositions(
                    child,
                    depth + 1,
                    newX,
                    newY,
                    newZ,
                    positions,
                    colors,
                    leaves
                );
            });
        }

        return { positions, colors, leaves };
    };

    const { positions, colors, leaves } = useMemo(() => {
        const { positions, colors, leaves } = getPositions(tree);
        return {
            positions: new Float32Array(positions),
            colors: new Float32Array(colors),
            leaves
        };
    }, [tree]);

    return (
        <group>
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={positions}
                        itemSize={3}
                        count={positions.length / 3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        array={colors}
                        itemSize={3}
                        count={colors.length / 3}
                    />
                </bufferGeometry>
                <lineBasicMaterial attach="material" vertexColors />
            </lineSegments>
            {leaves.map((leaf, index) => (
                <mesh
                    key={index}
                    position={leaf.position}
                    rotation={leaf.rotation}
                    scale={leaf.scale}
                >
                    <planeGeometry args={[0.2, 1]} />{' '}
                    {/* Width 0.2, Height 1 */}
                    <meshBasicMaterial
                        color={leaf.color}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </group>
    );
};
