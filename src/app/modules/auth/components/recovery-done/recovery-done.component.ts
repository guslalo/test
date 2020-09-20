import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-recovery-done',
  templateUrl: './recovery-done.component.html',
  styleUrls: ['./recovery-done.component.scss'],
})
export class RecoveryDoneComponent implements OnInit {
  public user: any = {
    email: null,
  };
  showModal: boolean;
  UserId: string;
  Firstname: string;
  Lastname: string;
  Email: string;
  closeResult = '';
  public mError: boolean;

  email_format: string;

  @ViewChild('content') myModal: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private routerAct: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const email: string = this.routerAct.snapshot.params.email;
    var splitEmail = email.split('@');
    var domain = splitEmail[1];
    var name = splitEmail[0];
    this.email_format = name.substring(0, 3).concat('*********@').concat(domain);
  }

  openModal(mError?) {
    if (this.mError) {
      this.modalService.open(this.myModal, { centered: true });
    } else {
      this.modalService.open(this.myModal, { centered: true });
    }
  }

  recoveryPass(user) {
    const userEmail = {
      email: user,
    };
    console.log(userEmail);
    this.authenticationService.recoveryPassword(user).subscribe(
      (data) => {
        this.mError = false;
        this.openModal(this.mError);
      },
      (error) => {
        this.mError = true;
        this.openModal(this.mError);
        console.log(error);
      }
    );
  }

  backToLogin() {
    this.router.navigate(['']);
  }
}
