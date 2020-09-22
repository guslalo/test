import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-blocked-account',
  templateUrl: './blocked-account.component.html',
  styleUrls: ['./blocked-account.component.scss'],
})
export class BlockedAccountComponent implements OnInit {
  public user: any = {
    email: null,
  };
  public mError: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  @ViewChild('content') myModal: any;

  ngOnInit(): void {}

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
