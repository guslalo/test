import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
})
export class RecoveryComponent implements OnInit {
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

  @ViewChild('content') myModal: any;

  constructor(private authenticationService: AuthenticationService, private modalService: NgbModal) {}

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
}
