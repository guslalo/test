import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ficha-consulta',
  templateUrl: './ficha-consulta.component.html',
  styleUrls: ['./ficha-consulta.component.scss'],
})
export class FichaConsultaComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  tomorrow = new Date(2020, 9, 20, 14, 34);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params
      console.log(params);
    });
  }
}
