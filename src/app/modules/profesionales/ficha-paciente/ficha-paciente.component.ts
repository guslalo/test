import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-ficha-paciente',
  templateUrl: './ficha-paciente.component.html',
  styleUrls: ['./ficha-paciente.component.scss']
})

export class FichaPacienteComponent implements OnInit {
  public users:any;

  constructor(public usersService:UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  
  //getUsers
  getUsers(){
    this.usersService.getusers().subscribe(
      data => {
        this.users = data.data.filter(u => u.id === 1);
      },
      error => {
        console.log(error);
      }
    )
  }

}
