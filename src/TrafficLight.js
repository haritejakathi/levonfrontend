import React, { useState, useEffect } from 'react';
import './TrafficLight.css';

const TrafficLight = () => {
  const [currentLight, setCurrentLight] = useState('Green');
  const [countdown, setCountdown] = useState(10); // Green light starts with 10 seconds
  const [pedestrianRequested, setPedestrianRequested] = useState(false);

  useEffect(() => {
    const lightDurations = {
      Green: 10,
      Yellow: 3,
      Red: pedestrianRequested ? 10 : 7
    };

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    if (countdown === 0) {
      switch (currentLight) {
        case 'Green':
          setCurrentLight('Yellow');
          setCountdown(lightDurations.Yellow);
          break;
        case 'Yellow':
          setCurrentLight('Red');
          setCountdown(lightDurations.Red);
          break;
        case 'Red':
          setCurrentLight('Green');
          setCountdown(lightDurations.Green);
          setPedestrianRequested(false); // Reset pedestrian request
          break;
        default:
          break;
      }
    }

    return () => clearInterval(timer);
  }, [countdown, currentLight, pedestrianRequested]);

  const requestPedestrianCrossing = () => {
    if (!pedestrianRequested) {
      setPedestrianRequested(true);
    }
  };

  return (
    <div className="traffic-light">
      <div className={`light green ${currentLight === 'Green' ? 'active' : ''}`} />
      <div className={`light yellow ${currentLight === 'Yellow' ? 'active' : ''}`} />
      <div className={`light red ${currentLight === 'Red' ? 'active' : ''}`} />
      <div className="controls">
        <button onClick={requestPedestrianCrossing}>Pedestrian Request</button>
      </div>
      <div className="countdown">Time Left: {countdown}s</div>
    </div>
  );
};

export default TrafficLight;
