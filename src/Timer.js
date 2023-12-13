import React, { useState, useEffect } from 'react';
import PauseIcon from '@mui/icons-material/Pause';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RefreshIcon from '@mui/icons-material/Refresh';

const Timer = () => {
  const [initialMinutes, setInitialMinutes] = useState('');
  const [minutes, setMinutes] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let countdown;

    if (isRunning && secondsRemaining > 0) {
      countdown = setInterval(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [isRunning, secondsRemaining]);

  const startTimer = () => {
    if (minutes !== '' && !isNaN(minutes)) {
      setSecondsRemaining(parseInt(minutes, 10) * 60);
      setIsRunning(true);
    } else {
      alert('Invalid input. Please enter a valid number of minutes.');
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(initialMinutes);
    setSecondsRemaining(0);
  };

  const handleChange = (event) => {
    setMinutes(event.target.value);
  };

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const displayTime = () => {
    const formattedMinutes = formatTime(Math.floor(secondsRemaining / 60));
    const formattedSeconds = formatTime(secondsRemaining % 60);
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="Timer text-center mt-8">
        <div className="text-4xl mb-4 text-yellow-50">{displayTime()}</div>
        <div className="mb-8">
            <input type="text" placeholder="Enter minutes" value={minutes} onChange={handleChange} className="text-white border border-y-4 border-x-4 border-gray-300 rounded-md p-4 bg-slate-800"/>
        </div>
        {isRunning ? (
          <button onClick={pauseTimer} className="bg-red-500 text-white py-2 px-4 rounded m-2"> <PauseIcon/> Pause </button>
        ) : (
          <button onClick={startTimer} className="bg-blue-500 text-white py-2 px-4 rounded m-2"> <PlayCircleIcon/> Play </button>
        )}
        <button onClick={resetTimer} className="bg-gray-500 text-white py-2 px-4 rounded m-2"> <RefreshIcon/> Reset </button>
    </div>
  );
};

export default Timer;
