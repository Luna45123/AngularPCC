import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThDatePipe } from './th-date.pipe';



@NgModule({
  declarations: [
    ThDatePipe
  ],exports:[
    ThDatePipe
  ],
  providers: [ThDatePipe],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
