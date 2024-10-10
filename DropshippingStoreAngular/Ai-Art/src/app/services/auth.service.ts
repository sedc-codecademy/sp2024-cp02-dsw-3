import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { Artist } from '../types/artist.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ovoj signal oznacuva dali sme avtenticirani ili ne za da vlagame vo rutite.

  isAuth = signal<boolean>(false);

  constructor(private readonly http: HttpClient, private readonly router: Router) { }


  register(firstName: string, lastName: string, userName: string, email: string, cardNo: string, expireDate: string, password: string) {
    return this.http.post('http://localhost:5095/api/User/register', {
      firstName,
      lastName,
      userName,
      email,
      cardNo,
      expireDate,
      password
    }).pipe(
      catchError((error) => {
        if (error) {
          console.log(error)
        }
        return of(null)
      })
    )
  };



  login(userName: string, password: string) {

    return this.http.post<{
      token: string,
    }>('http://localhost:5095/api/User/login', {
      userName,
      password
    }).pipe(
      tap((response) => {
        console.log('auth-response', response);
        localStorage.setItem('token', response.token);

        this.isAuth.set(true);
      }),
      switchMap(() => this.getMe()),
      catchError((error) => {
        if (error) {
          console.log(error)
        }
        this.isAuth.set(false)
        return of(null)
      })
    )

  };


  getMe() {
    return this.http.get<{ userInfo: Artist, }>('http://localhost:5095/api/User/userInfo', { 
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      } }).pipe(
      map((response) => {
        console.log('GetME:', response);
        console.log("RESPONSE.USERINFO:", response.userInfo);
        return response.userInfo
      }),
      catchError((error) => {
        if (error) {
          console.log(error)
        }
        return of(null)
      })
    )
  };

  logout() {
    localStorage.removeItem('token');
    this.isAuth.set(false);
    this.router.navigate(['/login']);
  };


}
