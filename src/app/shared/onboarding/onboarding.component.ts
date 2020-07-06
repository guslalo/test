import { Component, OnInit } from '@angular/core';
import { TourService } from 'ngx-tour-md-menu';
import { Routes, RouterModule,  } from '@angular/router';


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  constructor(
    public tourService:TourService
  ) { }

  ngOnInit(): void {
    this.OnboardingTour();
   
  }

  OnboardingTour() {
    this.tourService.initialize([{
        stepId: 'bienvenido',
        anchorId: 'sidebars',
        content: 'Acá podrá contratar servicios, realizar múltiplesboletas y gastos empresariales, entre otras opciones.',
        title: '¡Le damos la bienvenida!',
        route: 'app-paciente',
        endBtnTitle: 'Saltar tutorial',
        enableBackdrop: true,
        preventScrolling: true,
        nextBtnTitle: 'Comenzar',
        prevBtnTitle: 'Anterior'
      },
      {anchorId: 'agendar',
        content: 'Le damos la bienvenida a la nue su nuevo espacio de trabajo.',
        title: '¡Ya estamos listos!',
        route: 'app-paciente',
        enableBackdrop: true,
        preventScrolling: true,
        endBtnTitle: 'Finalizar Tutorial',
        prevBtnTitle: 'Anterior'
      }]);
    this.tourService.start();
    sessionStorage.setItem('tour', 'realizado');
  }

}
