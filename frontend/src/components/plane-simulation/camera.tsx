import { useFrame, useThree } from "@react-three/fiber";

const Camera = ({ planePosition, z }: { planePosition: { x: number, y: number }, z: number }) => {
    const { camera } = useThree();

    // Adjust the camera to follow the plane
    useFrame(() => {
        camera.position.x = planePosition.x;
        camera.position.y = planePosition.y;
        camera.position.z = z;
        camera.lookAt(planePosition.x, planePosition.y, 0);
    });

    return null
};

export default Camera