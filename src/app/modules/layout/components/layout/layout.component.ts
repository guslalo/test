import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../../../services/current-user.service'
import { UserLogin } from '../../../../models/models';
import { slideInAnimation } from '../../../../shared/animations';  
import { SharedModule } from '../../../../shared/shared.module';

import { TourService } from 'ngx-tour-md-menu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  //animations: [ slideInAnimation ]
})

export class LayoutComponent implements OnInit {

  public UserLogin: UserLogin;

  constructor(public currentUser: CurrentUserService) { }
  public user:any; 
  public tourService: TourService;
  public userCurrent:any;

  ngOnInit(): void {
    this.user  = new UserLogin(
      JSON.parse(localStorage.getItem('currentUser')).id,
      JSON.parse(localStorage.getItem('currentUser')).email,
      JSON.parse(localStorage.getItem('currentUser')).name,
      JSON.parse(localStorage.getItem('currentUser')).lastName,
      JSON.parse(localStorage.getItem('currentUser')).access_token,
      JSON.parse(localStorage.getItem('currentUser')).expires_in,
      JSON.parse(localStorage.getItem('currentUser')).internalCode,
      JSON.parse(localStorage.getItem('currentUser')).administrativeData
    );
    //this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
  }

  /*
  OnboardingTour() {
    this.tourService.initialize ([{
      route: 'app-pacientes',
      anchorId: 'some',
      content: 'Some content',
      title: 'First'
    }, {
      anchorId: 'otro.anchor.id',
      route: 'app-pacientes',
      content: 'Some content',
      title: 'First'
    }]);
    this.tourService.start()
  }
  

   // tutorial web
   /*
   OnboardingTour() {
    this.tourService.initialize([{
        anchorId: 'sidebar',
        content: 'Acá podrá contratar servicios, realiopciones.',
        title: '¡Le damos la bienvenida!',
        route: 'app-paciente',
        endBtnTitle: 'Saltar tutorial',
        enableBackdrop: true,
        preventScrolling: true,
        nextBtnTitle: 'Comenzar',
        prevBtnTitle: 'Anterior'
      },
      {anchorId: 'paso1',
        content: 'Acá podrá visualizar la información de la empresa que escogió anteriormente.  Si desea cambiar de empresa sólo haga click en este campo.',
        title: 'Empresa seleccionada',
        route: 'app-paciente',
        endBtnTitle: 'Saltar tutorial',
        enableBackdrop: true,
        preventScrolling: true,
        stepId: 'paso1',
        prevBtnTitle: 'Anterior',
        nextBtnTitle: 'Siguiente'
      },
      {anchorId: 'navegacion',
        content: 'Haga click en las diferentes opciones que se encuentran en el menú para poder ingresar a la sección que requiera.',
        title: 'Nuevo menú',
        route: 'app-paciente',
        enableBackdrop: true,
        preventScrolling: false,
        endBtnTitle: 'Saltar tutorial',
        prevBtnTitle: 'Anterior',
        placement: 'right',
        nextBtnTitle: 'Siguiente',
        stepId: 'paso2'
      },
      {anchorId: 'notificacionesDropDown',
        content: 'Visualice y configure todas sus notificaciones en un solo lugar.',
        title: 'Notificaciones',
        route: 'app-paciente',
        enableBackdrop: true,
        preventScrolling: true,
        endBtnTitle: 'Saltar tutorial',
        nextBtnTitle: 'Siguiente',
        prevBtnTitle: 'Anterior'
      },
      {anchorId: 'configuracionDropDown',
        content: 'Desde acá podrá personalizar su perfil, modificar su contraseña y administrar sus notificaciones y alertas.',
        title: 'Configuración',
        route: 'app-paciente',
        enableBackdrop:true,
        preventScrolling: true,
        endBtnTitle: 'Saltar tutorial',
        nextBtnTitle: 'Siguiente',
        prevBtnTitle: 'Anterior'
      },
      {anchorId: 'contraer',
        content: 'Presione la flecha inferior para plegar o desplegar el menú principal. Utilice esta modalidad para ampliar la visión del contenido.',
        title: 'Minimizar menú principal',
        route: 'app-paciente',
        enableBackdrop: true,
        preventScrolling: true,
        endBtnTitle: 'Saltar tutorial',
        nextBtnTitle: 'Siguiente',
        prevBtnTitle: 'Anterior'
      },
      {anchorId: 'opcionesextras',
        content: 'Desde este punto despliegue la opción para cambiar a Sucursal Virtual Persona. También tendrá a su alcance la acción “cerrar sesión” para mantener protegida su cuenta.',
        title: 'Cambio de Sucursal Virtual',
        route: 'perfil',
        enableBackdrop: true,
        preventScrolling: true,
        endBtnTitle: 'Saltar tutorial',
        nextBtnTitle: 'Siguiente',
        prevBtnTitle: 'Anterior'
      },
      {anchorId: 'final',
        content: 'Le damos la bienvenida a la nueva Sucursal Virtual Empresas. Ahora puede comenzar a disfrutar de su nuevo espacio de trabajo.',
        title: '¡Ya estamos listos!',
        route: 'app-paciente',
        enableBackdrop: true,
        preventScrolling: true,
        endBtnTitle: 'Finalizar Tutorial',
        prevBtnTitle: 'Anterior'
      }]);
    this.tourService.start();
    sessionStorage.setItem('tour', 'realizado');
  }*/
}
