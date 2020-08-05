import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha-consulta',
  templateUrl: './ficha-consulta.component.html',
  styleUrls: ['./ficha-consulta.component.scss'],
})
export class FichaConsultaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  tomorrow = new Date(2020, 9, 20, 14, 34);
}
