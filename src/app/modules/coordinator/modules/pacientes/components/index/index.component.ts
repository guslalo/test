import { Component, OnInit } from '@angular/core';
import { PatientsService } from './../../../../../../services/patients.service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public patients:any;

  constructor( private patientsService:PatientsService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(){
    this.patientsService.getPatients().subscribe(
      data => {
        this.patients = data;
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

}
