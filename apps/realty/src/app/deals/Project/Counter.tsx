import React, { useState, useEffect } from 'react';
import styles from "./Project.module.css"

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date('2024-04-01') - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
        <ul className={styles.list}>
            <li>
                <h4> {timeLeft.days}</h4>
                <p>Días</p>
            </li>
            <li>:</li>
            <li>
                <h4> {timeLeft.hours}</h4>
                <p>Hrs</p>
            </li>
            <li>:</li>
            <li>
                <h4> {timeLeft.minutes}</h4>
                <p>Min</p>
            </li>
            <li>:</li>
            <li>
                <h4> {timeLeft.seconds}</h4>
                <p>Seg</p>
            </li>
        </ul>
    </div>
  );
};

export default CountdownTimer;
