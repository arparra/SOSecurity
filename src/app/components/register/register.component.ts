import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUser = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  passwordsMismatch = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  checkPasswordMatch(): void {
    this.passwordsMismatch = this.registerUser.password !== this.registerUser.confirmPassword;
  }

  hasSpecialCharacters(password: string): boolean {
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharacters.test(password);
  }

  register(): void {
    if (this.passwordsMismatch || !this.hasSpecialCharacters(this.registerUser.password)) {
      console.log('Las contraseñas no coinciden o no cumplen los requisitos mínimos');
      return;
    }

    this.authService.register(this.registerUser.email, this.registerUser.password);
  }

}
