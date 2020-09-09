import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-sala',
  templateUrl: './editar-sala.component.html',
  styleUrls: ['./editar-sala.component.scss'],
})
export class EditarSalaComponent implements OnInit {
  // FORM
  acceptPayments: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  updateRoom() {
    console.log('test');
  }

  validRoom() {
    return true;
  }

  addUser() {}
}
