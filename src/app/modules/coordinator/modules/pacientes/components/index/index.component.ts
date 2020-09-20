import { Component, OnInit } from '@angular/core';
import { PatientsService } from './../../../../../../services/patients.service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public patient:any;
  public patients = [ ]
  public age:any;

  constructor( private patientsService:PatientsService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(){
    this.patientsService.getPatients().subscribe(
      data => {
        for(let item of data){
          this.patient = {
            _id:item.userData[0]._id,
            name:`${item.personalData.name} ${item.personalData.lastName}`,
            age: this.calcularEdad(item.personalData.birthdate),
            gender:item.personalData.gender,
            phoneNumber:item.personalData.phoneNumber
          }
          this.patients.push(this.patient);
        }
        console.log(this.patients)
      },
      error => {
        console.log(error)
      }
    )
  }

  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad; 
  }


}
