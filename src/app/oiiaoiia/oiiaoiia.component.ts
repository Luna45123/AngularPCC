import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oiiaoiia',
  templateUrl: './oiiaoiia.component.html',
  styleUrls: ['./oiiaoiia.component.scss']
})
export class OiiaoiiaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.playsound();
  }

  playsound(){
    console.log("play")
    const audio = new Audio('assets/oiiaoiia.mp3');
    audio.play();
    audio.loop = true;
  }
}
