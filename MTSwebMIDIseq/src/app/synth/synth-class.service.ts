import { Injectable, OnInit } from '@angular/core';
import { FreqbankInterface } from './FreqbankInterface';

@Injectable({
  providedIn: 'root'
})
export class SynthClassService implements OnInit {
  audioContext = new window.AudioContext()
  oscList = [];
  masterGainMode = null;
  noteTable: FreqbankInterface[] = [];
  inited: boolean = false;
  init() {
    if (!this.inited)
      this.inited = true;
  }

  //see those red lines? i fucked up...
  generateEDOnoteTable(baseFreq:number, numOfIntervals:number){
    let lowestOctave:number = baseFreq;
    let highestOctave:number = baseFreq;
    let threshold: number = 0;
    let octCont: number = 0;
    let idCont: number = 0;
    let octaveBank: FreqbankInterface[] = [];
    let noteBank: FreqbankInterface[] = [];
    while(lowestOctave >= 20) {
      lowestOctave /= 2;
    }
    threshold = lowestOctave;
    while(highestOctave >= 22000) {
      highestOctave *= 2;
    }
    while(threshold <= 22000) {
      let valueBuffer: FreqbankInterface = {freq: threshold, octave: octCont}
      octaveBank.push(valueBuffer);
      cont++;
    }
    for(let octave = 0; octave < octaveBank[cont-2].octave; octave++) {
      for(let interval = 0; interval < numOfIntervals; interval++) {
        let frequency = octaveBank[octave].freq * Math.pow(2, interval/numOfIntervals)
        let valueBuffer: FreqbankInterface = {freq:frequency, octave: octave}
        noteBank.push(valueBuffer);
      }
    }
    return noteBank;
  }

  ngOnInit(){
    this.noteTable = this.generateEDOnoteTable(440, 12);
  }

  constructor() {

  }
}
