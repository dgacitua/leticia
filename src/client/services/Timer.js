import TinyTimer from 'tiny-timer';

import { store } from '../modules/store';
import EventBus from '../modules/eventBus';

const UPDATE_INTERVAL = 1000;

class TimerService {
  constructor(totalTimeSec) {
    this.timer = new TinyTimer({ interval: UPDATE_INTERVAL, stopwatch: false });
    this.duration = totalTimeSec * UPDATE_INTERVAL;

    this.timer.on('tick', (ms) => this.updateCallback(ms));
    this.timer.on('done', () => this.timeoutCallback());
    this.timer.on('statusChanged', (status) => this.statusChangedCallback(status));

    store.commit({ type: 'setTimerTime', time: this.duration });
    store.commit({ type: 'setTimerDuration', time: this.duration });
  }

  start() {
    this.timer.start(this.duration);
  }

  stop() {
    this.timer.stop();
    this.clear();
  }

  pause() {
    this.timer.pause();
  }

  resume() {
    this.timer.resume();
  }

  clear() {
    store.commit({ type: 'setTimerTime', time: null });
    store.commit({ type: 'setTimerDuration', time: null });
    store.commit({ type: 'setTimerStatus', status: null });
  }

  getStatus() {
    return this.timer.status;
  }

  timeoutCallback() {
    this.clear();
    console.log(`Timer Finished!`);
    EventBus.$emit('leticia-timeout');
  }

  updateCallback(ms) {
    let remainingTime = Math.round(ms / UPDATE_INTERVAL);
    store.commit({ type: 'setTimerTime', time: remainingTime });
    //console.log(`Timer Update!`, `Remaining Time: ${remainingTime}`);
  }

  statusChangedCallback(timerStatus) {
    store.commit({ type: 'setTimerStatus', status: timerStatus });
    console.log(`Timer Status Changed! ${timerStatus}`);
  }
}

// OLD TIMER SERVICE - DEPRECATED
/*
class TimerService {
  constructor(totalTimeSec, refreshSec, isGlobal = false) {
    this.totalTime = totalTimeSec;
    this.countdown = refreshSec;
    this.refreshRate = refreshSec * MILLISECOND_FACTOR;
    this.isGlobal = isGlobal;
    this.isPaused = false;
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
      //console.log(`${this.timerType} UPDATE!`, `RemainingTime: ${this.getCurrentTime()}s`, `TotalTime: ${this.totalTime}s`, `RefreshInterval: ${this.countdown}s`);
      //EventBus.$emit('leticia-time', { detail: this.getCurrentTime() });
    }
    else if (this.getCurrentTime() === 0) {
      //console.log(`${this.timerType} TIMEOUT!`, `RemainingTime: ${this.getCurrentTime()}s`, `TotalTime: ${this.totalTime}s`, `RefreshInterval: ${this.countdown}s`);
      this.stop();
      EventBus.$emit('leticia-timeout', { detail: this.timeoutMsg });
    }
    else {
      this.stop();
    }
  }

  getCurrentTime() {
    return this.isGlobal ? store.state.globalRemainingTime : store.state.remainingTime;
  }
}
*/

export default TimerService;