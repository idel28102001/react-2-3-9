import './Timer.css';
import React, { FC, useEffect, useRef, useState } from 'react';
import { differenceInMilliseconds, format } from 'date-fns';

export interface TimerInterface {
  startDiapason: Date;
  diffInMS: number;
  isStopped: boolean;
}

export type UpdateTimerType = (id: number, obj: TimerInterface) => void;

interface TimerProps {
  id: number;
  updateTimer: UpdateTimerType;
  timer: TimerInterface;
}

const Timer: FC<TimerProps> = ({ timer, updateTimer, id }) => {
  const ref = useRef(-1 as never as NodeJS.Timer);
  const calculateTimer = (timer: TimerInterface) => {
    const { startDiapason, diffInMS, isStopped } = timer;
    const diapason = isStopped ? diffInMS : differenceInMilliseconds(new Date(), startDiapason);
    return format(new Date(diapason), 'mm:ss');
  };
  const [currentTime, setCurrentTime] = useState(calculateTimer(timer));
  const turnTimerOn = (timer: TimerInterface, isInit = true) => {
    if (!timer.isStopped && !isInit) return;
    if (!isInit) {
      updateTimer(id, { ...timer, isStopped: false });
    }

    clearInterval(ref.current);
    ref.current = setInterval(() => {
      setCurrentTime(() => calculateTimer(timer));
    }, 1000);
  };

  const turnTimerOff = (timer: TimerInterface, isInit = true) => {
    if (timer.isStopped && !isInit) return;
    if (!isInit) {
      updateTimer(id, { ...timer, isStopped: true });
    }
    clearInterval(ref.current);
  };
  useEffect(() => {
    turnTimerOn(timer);
    return () => {
      clearInterval(ref.current);
    };
  }, [timer]);

  return (
    <span className="description">
      <button className="icon icon-play" onClick={() => turnTimerOn(timer, false)} />
      <button className="icon icon-pause" onClick={() => turnTimerOff(timer, false)} />
      {currentTime}
    </span>
  );
};
export default Timer;
