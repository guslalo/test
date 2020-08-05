import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../models/models';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent implements OnInit {
  public UserLogin: UserLogin;
  public users: any;

  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    //this.user = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(this.UserLogin);
    this.getUsers();
  }

  //getUsers
  getUsers() {
    this.usersService.getusers().subscribe(
      (data) => {
        this.users = data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
