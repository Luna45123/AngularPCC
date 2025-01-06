import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-forif',
  templateUrl: './forif.component.html',
  styleUrls: ['./forif.component.scss']
})

export class ForifComponent implements OnInit {
  @ViewChild('testModal') testModal!: ModalDirective

  num: number[] = [1, 2, 3, 4, 5]

  dayList = [{ day: 'จันทร์', col: 'เหลือง' },
  { day: 'อังคาร', col: 'ชมพู' },
  { day: 'พุธ', col: 'เขียว' },
  { day: 'พฤหัส', col: 'ส้ม' },
  { day: 'ศุกร์', col: 'ฟ้า' },
  { day: 'เสาร์', col: 'ม่วง' },
  { day: 'อาทิตย์', col: 'แดง' }
  ];

  name: any = '';

  date1: any;

  isBoolean: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    if (this.name == 'sunny') {
      alert('hello ' + this.name)
    } else {
      alert('No!!!!!!!!!!!!!!!!!!!!!');
    }
  }
  bsValue(){
    console.log(this.date1);
  }

  openModel(){
    this.testModal.show();
  }
  closeModel(){
    this.testModal.hide();
  }
  closeSave(){
    this.testModal.hide();
    console.log("Your Gay");
  }
}
