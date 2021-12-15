import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string | null = null;
  password: string | null = null;
  constructor(private router: Router, private authService: AuthService) { 

    this.authService.checkTheUserOnTheFirstLoad().then(reason => {
      console.log('Login Status:', reason)
      if (reason !== null) {
        this.router.navigateByUrl('/home')
      }
    });

  }
  
  ngOnInit() {
    
  }
  login(): void {
    this.authService.login(this.email!, this.password!).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
