import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://192.168.2.18/api/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {
        return this.http.post(AUTH_API + 'signin', {
            username,
            password
        }, httpOptions);
    }

    register(userData: any): Observable<any> {

        let obj = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            password: userData.password,
        }
        console.log(obj);
        return this.http.post(AUTH_API + 'Register/Register', {
            obj
        }, httpOptions);
    }
}