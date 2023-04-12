import './Timer.css';
import React from 'react';
import { differenceInMilliseconds, format } from 'date-fns';

export type setCurrTime = (id: number, currTime: number) => void;

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

export default class Timer extends React.Component<TimerProps, unknown> {
  interval = -1 as never as NodeJS.Timer;

  componentDidMount() {
    this.turnTimerOn();
  }

  turnTimerOn(isInit = true) {
    if (!this.props.timer.isStopped && !isInit) return;
    if (!isInit) {
      this.props.updateTimer(this.props.id, { ...this.props.timer, isStopped: false });
    }

    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  turnTimerOff(isInit = true) {
    if (this.props.timer.isStopped && !isInit) return;
    if (!isInit) {
      this.props.updateTimer(this.props.id, { ...this.props.timer, isStopped: true });
    }
    clearInterval(this.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  calculateTimer() {
    const { startDiapason, diffInMS, isStopped } = this.props.timer;
    const diapason = isStopped ? diffInMS : differenceInMilliseconds(new Date(), startDiapason);
    return format(new Date(diapason), 'mm:ss');
  }

  render() {
    return (
      <span className="description">
        <button className="icon icon-play" onClick={() => this.turnTimerOn(false)} />
        <button className="icon icon-pause" onClick={() => this.turnTimerOff(false)} />
        {this.calculateTimer()}
      </span>
    );
  }
}
