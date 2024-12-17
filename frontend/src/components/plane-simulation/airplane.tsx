import { useFrame } from "@react-three/fiber";
import React from "react";
import { useRef } from "react";
import { ConeGeometry } from "three";
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';

// Plane Model 
const Airplane = ({ yaw, speed, setPlanePosition }: { yaw: number, speed: number, setPlanePosition: React.Dispatch<React.SetStateAction<{ x: number, y: number }>> }) => {
    const planeRef = useRef<any>(null);

    useFrame(() => {
        if (planeRef.current) {
            planeRef.current.rotation.z = yaw;
            planeRef.current.position.x += -Math.sin(yaw) * speed;
            planeRef.current.position.y += Math.cos(yaw) * speed;
            planeRef.current.position.z = 5
            setPlanePosition({ x: planeRef.current.position.x, y: planeRef.current.position.y });
        }
    });

    const cone1 = new ConeGeometry(2.5, 5, 6);
    const cone2 = new ConeGeometry(1.5, 8, 3);
    const mergedGeometry = mergeGeometries([cone1, cone2]);

    return (
        <mesh ref={planeRef} geometry={mergedGeometry}>
            <meshStandardMaterial />
        </mesh>
    );
};

export default Airplane