import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

const AUTH_API = 'http://hometaskapi.local';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userLoggedIn: boolean = false;


    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

    //My profile model with Reactive Form Approach/Validation
  myProfileModel = this.formBuilder.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', [Validators.email, Validators.required]],
    Role: [''],
    UserID: ['']
  });
    
    
    login(userData: any): Observable<any> {
        let obj = {
            email: userData.email,
            password: userData.password,
        }
        console.log('Login Object: ' + obj.email + ' ' + obj.password);
        return this.http.post(AUTH_API + '/api/login', obj, httpOptions);
    }

    // isLoggedIn(allowedRoles:boolean) {
    //     // const token = localStorage.getItem('token');
    //     // if (token) {
    //     //     const payload = atob(token.split('.')[1]);

    //     //     const parsedPayload = JSON.parse(payload);

    //     //     // checking expiration time / date
    //     //     return parsedPayload.exp > Date.now() / 1000;        //TODO: Token remaining
    //     // }

    //     var isMatch = false;
    //     var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    //     var userRole = payload.role;
    //     allowedRoles.forEach(element =>{
    //         if(userRole == element){
    //             isMatch = true;
    //             return false;
    //         }
    //     });
    //     return isMatch;
    // }

    roleMatch(allowedRoles): boolean {
        var isMatch = false;
        var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        var userRole = payLoad.role;
        allowedRoles.forEach(element => {
          if (userRole == element) {
            isMatch = true;
            return false;
          }
        });
        return isMatch;
      }

    register(userData: any): Observable<any> {

        let obj = {
            firstname: userData.firstName,
            lastname: userData.lastName,
            email: userData.email,
            phonenumber: userData.phoneNumber,
            password: userData.password,
            birthdate: userData.birthdate,
            // username: userData.username,

        }
        console.log('Register Object: ' + obj);
        return this.http.post(AUTH_API + '/api/Register',
            obj);
    }

    //ConfirmEmail:API
    confirmUserEmail(userId,code){
        return this.http.get(AUTH_API + '/api/ConfirmEmail',{
            params:{
                userId:userId,
                code:code
            }
        });
    }

    getUserProfile(){
        return this.http.get(AUTH_API +"/api/GetUsers");
    }

    //SaveUserInformation : API
  updateProfile() {
    var body = {
      FirstName: this.myProfileModel.value.FirstName,
      LastName: this.myProfileModel.value.LastName,
      Email: this.myProfileModel.value.Email,
      Role: this.myProfileModel.value.Role,
      UserID: this.myProfileModel.value.UserID,
    };

    return this.http.post(AUTH_API + '/api/SaveUserInformation', body);
  }

}