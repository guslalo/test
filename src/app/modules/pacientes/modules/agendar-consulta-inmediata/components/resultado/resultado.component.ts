import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {
  public reserva:any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initCall();
    console.log(JSON.parse(localStorage.getItem('reserva')));
    this.reserva =  JSON.parse(localStorage.getItem('reserva'));
  }

  
  initCall(): void {
    this.route.params.subscribe(params => {
     const id = params.id;
   });
  
  
  }
}
