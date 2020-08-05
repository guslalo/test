import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from './../../../services/current-user.service'
import {NgbRatingConfig, NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioPComponent implements OnInit {
  //public userCurrent:any;
  public userCurrent = { }
  currentRate = 4;

  constructor(
    public currentUserService: CurrentUserService,
    config: NgbRatingConfig , config2: NgbRatingConfig
    ) { 

      config.max = 5;
      config.readonly = true;

     /* config2.justify = 'center';
      config2.type = 'pills';*/
    }

  ngOnInit(): void {
    this.userCurrent = this.currentUserService.currentUser
  }

}
