import React, { useEffect } from 'react';
import { useState } from 'react';
import { MeshStandardMaterial, Shape, ExtrudeGeometry } from 'three';

// Terrain Component (manages render distance)
const Terrain = ({ planePosition, speed }: { planePosition: { x: number, y: number }, speed: number }) => {
    const [blobs, setBlobs] = useState<Map<string, JSX.Element>>(new Map());
    const innerRadius = 30; // Inner radius for the smaller circle
    const outerRadius = 35; // Outer radius for the larger circle
    const blobRemovalDistance = outerRadius;
    const maxBlobs = 25;

    // Function to generate a blob at a random position in the annular region
    const generateBlob = (x: number, y: number, color: string): JSX.Element => {
        const shape = new Shape();
        const numPoints = Math.floor(Math.random() * 6) + 5;
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const radius = 3 + (Math.random() - 0.5) * 2 * 0.5;  // Randomize radius within a certain range
            const xOffset = Math.cos(angle) * radius;
            const yOffset = Math.sin(angle) * radius;

            // Move to the first point (or line to the next point)
            if (i === 0) {
                shape.moveTo(x + xOffset, y + yOffset);
            } else {
                shape.lineTo(x + xOffset, y + yOffset);
            }
        }
        shape.closePath();
        const geometry = new ExtrudeGeometry(shape, { depth: 0.1, bevelEnabled: false });
        const material = new MeshStandardMaterial({ color });
        return (
            <mesh key={`${x}-${y}`} position={[0, 0, 0]} geometry={geometry} material={material} />
        );
    };

    // Function to generate random blobs within annular region around plane (outer circle - inner circle)
    const generateBlobsInAnnularRegion = (centerX: number, centerY: number, speed: number): Map<string, JSX.Element> => {
        const newBlobs = new Map<string, JSX.Element>();

        const numBlobs = Math.min(maxBlobs, Math.floor(speed * 5))
        // Randomized position within the annular region
        for (let i = 0; i < numBlobs; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = innerRadius + Math.random() * (outerRadius - innerRadius);

            // polar to cartesian
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            const color = Math.random() < 0.3 ? 'rgb(185,132,94)' : Math.random() < 0.5 ? 'green' : 'lightgrey'; // Colors to resemble terrain
            const key = `${x}&${y}`;

            // Add the generated blob to the map
            newBlobs.set(key, generateBlob(x, y, color));
        }

        return newBlobs;
    };

    // Function to remove blobs that are out of the outer circle
    const removeOutOfRangeBlobs = (centerX: number, centerY: number, blobs: Map<string, JSX.Element>): Map<string, JSX.Element> => {
        const newBlobs = new Map(blobs);

        newBlobs.forEach((blob, key) => {
            const [x, y] = key.split('&').map(Number);
            const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

            if (distance > blobRemovalDistance) {
                newBlobs.delete(key);
            }
        });

        return newBlobs;
    };

    useEffect(() => {
        // Generate blobs just outside of render distance
        const newBlobs = generateBlobsInAnnularRegion(planePosition.x, planePosition.y, speed);
        setBlobs((prevBlobs) => {
            // Remove out-of-range blobs
            const updatedBlobs = removeOutOfRangeBlobs(planePosition.x, planePosition.y, prevBlobs);

            newBlobs.forEach((blob, key) => {
                if (!updatedBlobs.has(key)) {
                    updatedBlobs.set(key, blob);
                }
            });

            return updatedBlobs;
        });
    }, [planePosition, speed]);

    return (
        <>
            {Array.from(blobs.values())}
        </>
    );
};

export default Terrain