import { Component, OnInit } from '@angular/core';
import { SynthClassService } from '../synth/synth-class.service';
import { FreqbankInterface } from '../synth/FreqbankInterface';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  notes: FreqbankInterface[] = [];
  currentNotes: FreqbankInterface[] = [];
  currentOctave:number = 0;
  nOffset: number = 0
  constructor(private synthService: SynthClassService){ }

  ngOnInit(): void {
    this.currentNotes = this.setCurrentOctave(7);
  }

  getNotes(){
    if(this.synthService.noteTable !== null)
      this.notes = this.synthService.noteTable;
  }

  setCurrentOctave(octave:number): FreqbankInterface[] {
    this.currentOctave = octave;

    let offset: number | undefined;
    let octaveBuffer: FreqbankInterface[] = []
    for(let i = 0; i<this.notes.length; i++) {
      if(this.notes[i].octave === octave) {
        octaveBuffer.push(this.notes[i]);
        if (offset === undefined)
          offset = i;
      }
    }

    if(offset !== undefined)
      this.nOffset = offset;

    return octaveBuffer;
  }
}
