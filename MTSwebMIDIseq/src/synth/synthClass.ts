import { FreqbankInterface } from "./FreqbankInterface";

//sound synthetizer
class Synth {
  audioContext = new window.AudioContext()
  oscList = [];
  masterGainMode = null;
  noteFreq: number[][] | undefined;
  inited: boolean = false;
  init() {
    if (!this.inited)
      this.inited = true;
  }

  generateEDOnoteTable(baseFreq:number, numOfIntervals:number){
    let lowestOctave:number = baseFreq;
    let highestOctave:number = baseFreq;
    let threshold: number = 0;
    let cont: number = 0;
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
      let valueBuffer: FreqbankInterface = {freq: threshold, octave: cont}
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

  
    
  }

  constructor(){
  }


}
