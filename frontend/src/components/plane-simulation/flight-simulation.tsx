import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { OrbitControls } from '@react-three/drei';
import Airplane from './airplane.tsx'
import Camera from './camera.tsx'
import Terrain from './terrain.tsx'
import * as Styled from './flight-simulation.styles.tsx'
import { Button } from 'antd';

const FlightSimulation = () => {
    const [yaw, setYaw] = useState(0);
    const [speed, setSpeed] = useState(0.4);
    const [planePosition, setPlanePosition] = useState({ x: 0, y: 0 });

    const [keys, setKeys] = useState({
        up: false,
        down: false,
        left: false,
        right: false
    });

    const [cameraZ, setCameraZ] = useState(20);
    const [buttonText, setButtonText] = useState('Show Render Distance');

    // Handle key events for controlling the plane
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp') {
            setKeys(prevState => ({ ...prevState, up: true }));
        } else if (event.key === 'ArrowDown') {
            setKeys(prevState => ({ ...prevState, down: true }));
        } else if (event.key === 'ArrowLeft') {
            setKeys(prevState => ({ ...prevState, left: true }));
        } else if (event.key === 'ArrowRight') {
            setKeys(prevState => ({ ...prevState, right: true }));
        }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp') {
            setKeys(prevState => ({ ...prevState, up: false }));
        } else if (event.key === 'ArrowDown') {
            setKeys(prevState => ({ ...prevState, down: false }));
        } else if (event.key === 'ArrowLeft') {
            setKeys(prevState => ({ ...prevState, left: false }));
        } else if (event.key === 'ArrowRight') {
            setKeys(prevState => ({ ...prevState, right: false }));
        }
    };

    useEffect(() => {
        // Set up event listeners for keypresses
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            // Clean up event listeners
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Update speed and yaw based on key presses
    useEffect(() => {
        if (keys.up) setSpeed(prevSpeed => Math.min(prevSpeed + 0.01, 1.2));
        if (keys.down) setSpeed(prevSpeed => Math.max(prevSpeed - 0.01, 0.2));
        if (keys.left) setYaw(prevYaw => prevYaw + 0.05);
        if (keys.right) setYaw(prevYaw => prevYaw - 0.05);
    }, [keys]);

    const speedInKnots = speed.toFixed(2);
    const yawDegrees = ((yaw * 180) / Math.PI).toFixed(0);

    const toggleCameraZ = () => {
        if (cameraZ === 100) {
            setCameraZ(20);
            setButtonText('Show Render Distance');
        } else {
            setCameraZ(100);
            setButtonText('Back to Simulation');
        }
    };

    return (
        <Styled.Container>
            <Styled.GrassyCanvas>
                <ambientLight />
                <Airplane yaw={yaw} speed={speed} setPlanePosition={setPlanePosition} />
                <Camera planePosition={planePosition} z={cameraZ} />
                <Terrain planePosition={planePosition} speed={speed} />
                <OrbitControls enableZoom={true} enablePan={true} />
            </Styled.GrassyCanvas>

            <Styled.ButtonContainer>
                <Button onClick={toggleCameraZ}>
                    {buttonText}
                </Button>
                <Link to='./layup-sequence'>
                    <Button>
                        Task 2
                    </Button>
                </Link>

            </Styled.ButtonContainer>

            {/* Speed and Yaw Display */}
            <Styled.InfoDisplay>
                <Styled.SpeedYawDisplay>Speed: {speedInKnots} knots</Styled.SpeedYawDisplay>
                <Styled.SpeedYawDisplay>Yaw: {-yawDegrees % 360}°</Styled.SpeedYawDisplay>
            </Styled.InfoDisplay>

            {/* Mini-Map / Compass */}
            <Styled.CompassContainer>
                <Styled.Compass yawDegrees={yawDegrees}>
                    {/* Plane Icon */}
                    <Styled.PlaneIcon>^</Styled.PlaneIcon>

                    {/* Directional Heading */}
                    <Styled.DirectionalHeading />
                </Styled.Compass>
            </Styled.CompassContainer>
        </Styled.Container>
    );
};


export default FlightSimulation;
