import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-onework',
  templateUrl: './onework.component.html',
  styleUrls: ['./onework.component.scss']
})
export class OneworkComponent implements OnInit {

  num:number = 10;

  usernum:number = 0;
  usernum2:number = 0;

  username:string = '-';

  value1: FormControl = new FormControl();

  myformgroup = new FormGroup({
    user: new FormControl('sunny',Validators.required),
    pass: new FormControl('5044',Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    let result:number = this.usernum + this.usernum2;
    alert('show Text: ' + result);
  } 
  onClick2(){
    let result:number = this.usernum + this.usernum2;
    alert('show Text: ' + result);
  }
  onClick3(){
    this.value1.setValue('-');
    alert('value: ' + this.value1.value);
  }
  onClickFormgroup(){
    this.myformgroup.setValue({
      user: 'hello',
      pass: '1234'
    });
    let userObj = this.myformgroup.value;
   
    console.log(userObj.user + " : " + userObj.pass);
  }
}
