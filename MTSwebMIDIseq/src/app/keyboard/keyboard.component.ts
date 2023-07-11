import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SynthClassService } from '../synth/synth-class.service';

import { FreqbankInterface } from '../synth/FreqbankInterface';
import { SequencerMapInterface } from '../synth/sequencerMapInterface';



@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  notes: FreqbankInterface[] = [];
  currentNotes: FreqbankInterface[] = [];
  currentOctave:number = 0;
  nOffset: number = 0;
  currentPlayingNotes: number[] = [];
  currentEDO: number = 0;
  sequencerMap: SequencerMapInterface[][] =  [];


  constructor(private synthService: SynthClassService,
              ){ }

  ngOnInit(): void {
    this.synthService.start();
    this.getNotes()
    this.currentNotes = this.setCurrentOctave(4);
    console.log("keyboard iniciou")
  }

  getNotes(){
    if(this.synthService.noteTable !== null)
      console.log("seu merda")
      this.notes = this.synthService.noteTable;
  }

  //select only one active octave
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

  //change the scale
  changeNoteTable(baseFreq: number, numOfIntervals: number, octave: number) {
    this.synthService.updateNoteTable(baseFreq, numOfIntervals);
    this.getNotes();
    this.currentNotes = this.setCurrentOctave(octave);
  }

  noteOn(note: FreqbankInterface){
    if(this.currentPlayingNotes.length != 0)
      for(let i = 0; i < this.currentPlayingNotes.length; i++) {
        if (note.freq == this.currentPlayingNotes[i])
          return;
      }
    console.log("Pressed note %d, Frequency: %d, octave: %d", note.id, note.freq, note.octave);
    this.synthService.playNote(note)
    this.currentPlayingNotes.push(note.freq);
  }

  noteOff(note: FreqbankInterface) {
    console.log("Released note %d, Frequency: %d, octave: %d", note.id, note.freq, note.octave);
    this.synthService.releaseNote(note);
    let toRemove: number = this.currentPlayingNotes.indexOf(note.freq)
    this.currentPlayingNotes.splice(toRemove, 1);
  }

  onClickSubmit(data: NgForm) {
    this.changeNoteTable(440, this.currentEDO, this.currentOctave)
    console.log(this.currentEDO)
  }

  //Ex. use table currentNotes and build 4 bars of 4/4
  buildSequencerMap(noteTable: FreqbankInterface, numBars: number, dividend: number, divisor: number) {

  }



}
