import { Component } from '@angular/core';
import { SynthClassService } from '../synth/synth-class.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  constructor(SynthService: SynthClassService){

  }
  getNotes(){
    return
  }
}
