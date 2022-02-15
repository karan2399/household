import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../../services/authentication/authentication-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute,
    private router : Router,
    public authService:AuthService,
    private toastrService:ToastrService) { }


  userId:string = "";
  code:string = "";
  encodedCode:string = "";
  isAccountActivated:boolean = false;
  serverResponseMessage:string = "";
  isShowAccountActivationResponseBlock:boolean = false;

  ngOnInit(){
    //Get url query string parameter
    console.log('YOYO');
    this.activeRoute.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.code = params['code'];
    });
    //encoding the code to send appropriately for verfication
    this.encodedCode = encodeURIComponent(this.code);
    this.confirmEmail(this.userId, this.encodedCode)
  }

  confirmEmail(userId,code){
    console.log('action called');
    this.authService.confirmUserEmail(userId,code).subscribe(
      (res:any)=>{
        if (res.success == true){
          this.isShowAccountActivationResponseBlock = true;
          this.isAccountActivated = true;
          this.serverResponseMessage = res.message;
        }
        else{
          this.isShowAccountActivationResponseBlock = true;
          this.isAccountActivated = false;
          this.serverResponseMessage = res.message;
        }
      },
      err=>{
        this.isShowAccountActivationResponseBlock = true;
        this.isAccountActivated = false;
        this.serverResponseMessage= "unable to Verify Account";
      },
    )
  }

}
