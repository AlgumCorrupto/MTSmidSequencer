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
  //no more red lines, mom!!!
  generateEDOnoteTable(baseFreq:number, numOfIntervals:number){
    let lowestNoteFreq:number = baseFreq;
    let highestNoteFreq:number = baseFreq;
    let threshold: number = 0;
    let octCont: number = 0;
    let idCont: number = 0;
    let octaveBank: FreqbankInterface[] = [];
    let noteBank: FreqbankInterface[] = [];

    //find lowest note
    while(lowestNoteFreq >= 20) {
      lowestNoteFreq /= 2;
    }
    threshold = lowestNoteFreq;

    //find highest note
    while(highestNoteFreq >= 22000) {
      highestNoteFreq *= 2;
    }

    //fill octBank with values of the frequencies of the octave.
    while(threshold <= highestNoteFreq) {
      let valueBuffer: FreqbankInterface = {freq: threshold, octave: octCont, id: idCont}
      octaveBank.push(valueBuffer);
      threshold*= 2;
      idCont++;
      octCont++;
    }
    //fill noteBank with all the notes of the EDO scale then return it.
    idCont = 0;
    for(let octave = 0; octave < octaveBank[octCont-2].octave; octave++) {
      for(let interval = 0; interval < numOfIntervals; interval++) {
        let frequency = octaveBank[octave].freq * Math.pow(2, interval/numOfIntervals)
        let valueBuffer: FreqbankInterface = {freq:frequency, octave: octave, id: idCont}
        noteBank.push(valueBuffer);
        idCont++;
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
