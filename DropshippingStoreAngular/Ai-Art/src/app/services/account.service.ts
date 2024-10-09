import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable ({
    providedIn: 'root'
})

export class AccountService {
    private apiUrl = `http://localhost:5095/api/User`;

    constructor(private readonly http: HttpClient){}

    getUserInfo(userName: string): Observable <any>{
        return this.http.get(`${this.apiUrl}/${userName}`);
    }

    updateUserInfo(userName: string, userInfo: any): Observable<any>{
return this.http.put(`${this.apiUrl}/${userName}`, userInfo)
    }
}