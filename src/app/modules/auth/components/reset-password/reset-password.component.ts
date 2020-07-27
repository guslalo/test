import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'  

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public user: any = { };
  @ViewChild('content') myModal : any;

  constructor(
    private authenticationService:AuthenticationService,
    private router:Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
  
  }

  resetPass(pass){
    this.route.params.subscribe(params => {
      let token  = params.token
      let id  = params.id
      this.authenticationService.resetPassword(token, pass, id).subscribe(
        data => { 
          console.log(data);
          this.modalService.open(this.myModal,  { centered: true });

        },
        error => {
          console.log(error);
        }
      )
    });  
  }
}
