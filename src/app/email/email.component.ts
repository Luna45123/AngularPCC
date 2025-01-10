import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  email: string = '';
  emailValid: boolean | null = null;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  checkEmail() {
    this.http.post<{ valid: boolean }>('http://localhost:8778/sunvat/check-email', { email: this.email }).subscribe(
      (response) => {
        this.emailValid = response.valid;
      },
      (error) => {
        console.error('Error checking email', error);
        this.emailValid = false;
      }
    );
  }

}
