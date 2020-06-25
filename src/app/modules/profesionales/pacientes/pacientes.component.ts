import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../models/models';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  public UserLogin: UserLogin;
  constructor() { }

  ngOnInit(): void {

    console.log(this.UserLogin);
  }

}
