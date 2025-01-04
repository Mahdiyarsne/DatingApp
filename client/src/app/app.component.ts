import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'DatingApp';
  private http = inject(HttpClient);
  baseUrl = "http://localhost:5001/api/users";
  users:any; 


  ngOnInit(): void {
    this.http.get(this.baseUrl).subscribe({
      next: response => this.users =response,
      error: error => console.log(error),
      complete: () => console.log("Completed")
    })
  }
}
