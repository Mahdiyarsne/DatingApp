import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5001/api/users';
  users: any;
  registerMode = false;


ngOnInit(): void {
  this.getUsers();
}

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.http.get(this.baseUrl).subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.log(error),
      complete: () => console.log('Completed'),
    });
  }

  cancelRegisterMode(event : boolean){
this.registerMode = event;
  }
}
