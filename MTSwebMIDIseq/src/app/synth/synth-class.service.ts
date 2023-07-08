import { Injectable} from '@angular/core';
import { FreqbankInterface } from './FreqbankInterface';

@Injectable({
  providedIn: 'root'
})
export class SynthClassService{
  audioContext = new window.AudioContext()
  oscList = [];
  masterGainMode = null;
  noteTable: FreqbankInterface[] = [];

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
    do{
      lowestNoteFreq /= 2;
    }while(lowestNoteFreq >= 20)
    threshold = lowestNoteFreq;

    //find highest note
    do {
      highestNoteFreq *= 2;
    }while(highestNoteFreq <= 5500)
    console.log(highestNoteFreq);

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
    console.log(noteBank.length)
    return noteBank;
  }

  start(){
    this.noteTable = this.generateEDOnoteTable(440, 12);
    console.log("synth iniciou!!")
  }

  constructor() {

  }
}
