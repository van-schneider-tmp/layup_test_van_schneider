import styled from 'styled-components';
import { Canvas } from '@react-three/fiber'
import { Button } from 'antd'

export const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

export const GrassyCanvas = styled(Canvas)`
  background-color: rgb(104, 135, 76);
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between; 
    gap: 10px;  
    position: absolute;
    top: 10px;
    right: 10px;
`;

export const InfoDisplay = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  color: white;
`;

export const SpeedYawDisplay = styled.h2`
  margin: 0;
`;

export const CompassContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 20px;
  color: white;
`;

export const Compass = styled.div<{ yawDegrees: number }>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid white;
  position: relative;
  text-align: center;
  line-height: 150px;
  box-sizing: border-box;
  overflow: hidden;
  transform: rotate(${props => -props.yawDegrees}deg);
`;

export const PlaneIcon = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
`;

export const DirectionalHeading = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 6px;
  background-color: red;
  transform: translateX(-50%);
`;