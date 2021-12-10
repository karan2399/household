import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const AUTH_API = 'https://hometaskapp.azurewebsites.net';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userLoggedIn: boolean = false;


    constructor(private http: HttpClient) { }

    login(userData: any): Observable<any> {
        let obj = {
            email: userData.email,
            password: userData.password,
        }
        console.log('Login Object: ' + obj.email + ' ' + obj.password);
        return this.http.post(AUTH_API + '/api/login', obj, httpOptions);
    }

    isLoggedIn() {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = atob(token.split('.')[1]);

            const parsedPayload = JSON.parse(payload);

            // checking expiration time / date
            return parsedPayload.exp > Date.now() / 1000;        //TODO: Token remaining
        }

    }

    register(userData: any): Observable<any> {

        let obj = {
            firstname: userData.firstName,
            lastname: userData.lastName,
            email: userData.email,
            phonenumber: userData.phoneNumber,
            password: userData.password,
            birthdate: userData.birthdate,
            username: userData.username,

        }
        console.log('Register Object: ' + obj);
        return this.http.post(AUTH_API + '/api/Register',
            obj);
    }
}