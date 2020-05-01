import { store } from '../modules/store';

const MILLISECOND_FACTOR = 1000;

class TimerService {
  constructor(totalTimeSec, refreshSec, isGlobal = false) {
    this.totalTime = totalTimeSec;
    this.countdown = refreshSec;
    this.refreshRate = refreshSec * MILLISECOND_FACTOR;
    this.isGlobal = isGlobal;
    this.interval = null;
        
    if (this.isGlobal) {
      this.timerType = 'GlobalTimer';
      this.setTimeMutation = 'setGlobalTime';
      this.changeTimeMutation = 'changeGlobalTime';
      this.timeoutMsg = 'GlobalTimeout';
    }
    else {
      this.timerType = 'TaskTimer';
      this.setTimeMutation = 'setTime';
      this.changeTimeMutation = 'changeTime';
      this.timeoutMsg = 'TaskTimeout';
    }
  }

  start() {
    store.commit({ type: this.setTimeMutation, time: this.totalTime });
    this.interval = setInterval(() => this.update(), this.refreshRate);
    console.log(`${this.timerType} START!`, `RemainingTime: ${this.getCurrentTime()}s`, `TotalTime: ${this.totalTime}s`, `RefreshInterval: ${this.countdown}s`);
  }

  stop() {
    clearInterval(this.interval);
    console.log(`${this.timerType} STOP!`, `RemainingTime: ${this.getCurrentTime()}s`, `TotalTime: ${this.totalTime}s`, `RefreshInterval: ${this.countdown}s`);
  }

  update() {
    store.commit({ type: this.changeTimeMutation, amount: -(this.countdown) });
    
    if (this.getCurrentTime() > 0) {
      console.log(`${this.timerType} UPDATE!`, `RemainingTime: ${this.getCurrentTime()}s`, `TotalTime: ${this.totalTime}s`, `RefreshInterval: ${this.countdown}s`);
    }
    else {
      console.log(`${this.timerType} TIMEOUT!`, `RemainingTime: ${this.getCurrentTime()}s`, `TotalTime: ${this.totalTime}s`, `RefreshInterval: ${this.countdown}s`);
      this.stop();
      window.dispatchEvent(new CustomEvent('leticia-time', { detail: this.timeoutMsg }));
    }
  }

  getCurrentTime() {
    return this.isGlobal ? store.state.globalRemainingTime : store.state.remainingTime;
  }
}

export default TimerService;