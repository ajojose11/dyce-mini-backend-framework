import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { tap, pluck, catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';




@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private http: HttpClient, private authService: AuthService) {}


 createNetwork(data): any {
  
    return this.http.post('/api/network/create', data)

 }




  /**
   * Let's try to get user's information if he was logged in previously,
   * thus we can ensure that the user is able to access the `/` (home) page.
   */

}
