import React from 'react';
import FlightSimulation from './components/plane-simulation/flight-simulation.tsx'
import LayupSequence from './components/layup-sequence/layup-sequence.tsx'
import { Routes, Route } from 'react-router-dom';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<FlightSimulation />} />
      <Route path="/layup-sequence" element={<LayupSequence />} />
    </Routes>
  );
};

export default App;