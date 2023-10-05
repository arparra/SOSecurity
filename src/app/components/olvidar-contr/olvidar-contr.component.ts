import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-olvidar-contr',
  templateUrl: './olvidar-contr.component.html',
  styleUrls: ['./olvidar-contr.component.scss']
})
export class OlvidarContrComponent implements OnInit {
  registerUser: any;

  constructor() {
    this.registerUser = {
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
  }

  register(user: any): void {
  }
}

