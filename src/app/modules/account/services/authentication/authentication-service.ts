import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://home-appapi.herokuapp.com/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  postNewKitchenUsersList //SaveUserInformation : API
    (user: any) {
    return this.http.post(AUTH_API + '/updatetasks', user);
  }


  setUser(res: Object) {
    this.user = res;
  }

  public user: Object;
  revokeAdmin() {
    this.isAdmin = false;
  }
  userLoggedIn: boolean = false;
  isAdmin: boolean = false;


  constructor(private http: HttpClient) {
  }
  logout() {
    this.user = {};
    this.isAdmin = false;
    this.http.get(AUTH_API + "/SignOut");
  }

  getUser() {
    return this.user;
  }


  login(userData: any): Observable<any> {
    let obj = {
      email: userData.email,
      password: userData.password,
    }
    return this.http.post(AUTH_API + '/Login', obj, httpOptions);
  }
  setRoleAdmin() {
    this.isAdmin = true;
  }
  getRoleAdmin() {
    return this.isAdmin;
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
    return this.http.post(AUTH_API + '/Register',
      obj);
  }

  //ConfirmEmail:API
  confirmUserEmail(userId, code) {
    return this.http.get(AUTH_API + '/ConfirmEmail', {
      params: {
        userId: userId,
        code: code
      }
    });
  }

  getUserProfile() {
    let header = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
    );

    return this.http.get(AUTH_API + "/GetUsers", { headers: header });
  }

  //SaveUserInformation : API
  updateProfile(myProfileModel: any) {
    var body = {
      FirstName: myProfileModel.value.FirstName,
      LastName: myProfileModel.value.LastName,
      Email: myProfileModel.value.Email,
      Role: myProfileModel.value.Role,
      UserID: myProfileModel.value.UserID,
    };


    return this.http.post(AUTH_API + '/SaveUserInformation', body);
  }

  getKitchenUserList() {
    return this.http.get(AUTH_API + '/getKitchenTask');
  }
}