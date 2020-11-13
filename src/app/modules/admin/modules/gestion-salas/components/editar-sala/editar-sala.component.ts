import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RoomsService } from 'src/app/services/rooms.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { NgxPermissionsService } from 'ngx-permissions';
import * as _ from "lodash";

@Component({
  selector: 'app-editar-sala',
  templateUrl: './editar-sala.component.html',
  styleUrls: ['./editar-sala.component.scss'],
})
export class EditarSalaComponent implements OnInit {
  // FORM
  roomForm: FormGroup;
  roomId: string;
  requirePayment: Boolean = false;
  role: string = 'professionals';
  professionals: any[] = [];
  tempProfessionals: any[] = [];
  professionalsData: any[] = [];
  coordinators: any[] = [];
  tempCoordinators: any[] = [];
  coordinatorsData: any[] = [];
  createdAt: any;
  createdBy: any;

  professionalSelected = new FormControl();
  coordinatorSelected = new FormControl();
  @Input() value: any;
  @Output() valueChange = new EventEmitter();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private roomsService: RoomsService,
    private location: Location
  ) {
    this.roomForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', null],
      appointmentPrice: [null, [Validators.pattern(/^[0-9]{1,5}([\\.][0-9]{1,2})?$/)]],
    });
  }


  _sort(prop, arr) {
    prop = prop.split('.');
    var len = prop.length;

    arr.sort(function (a, b) {
      var i = 0;
      while (i < len) { a = a[prop[i]]; b = b[prop[i]]; i++; }
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    return arr;
  };

  ngOnInit(): void {
    this.roomId = this.router.url.split('/').pop();
    // console.log(roomId);
    this.roomsService.getWaitingRooms(this.roomId).subscribe((data) => {
      console.log(data.payload);

      this.roomForm.get('name').setValue(data.payload.roomDetails?.name);
      this.roomForm.get('description').setValue(data.payload.roomDetails?.description);
      this.requirePayment = data.payload.administrativeDetails?.requirePayment;
      this.roomForm.get('appointmentPrice').setValue(data.payload.administrativeDetails?.appointmentPrice);

      this.professionalsData = _.orderBy(data.payload.personnelDetails?.professionals, [item => item.personalData.name.toLowerCase()], ['asc']);

      this.coordinatorsData = _.orderBy(data.payload.personnelDetails?.coordinators, [item => item.personalData.name.toLowerCase()], ['asc'])

      this.createdAt = moment(data.payload.administrativeDetails.createdAt).format('DD-MM-YYYY');

      if (data.payload.administrativeDetails.createdBy.length)
        this.createdBy =
          data.payload.administrativeDetails.createdBy[0]?.personalData.name +
          ' ' +
          data.payload.administrativeDetails.createdBy[0]?.personalData.lastName;
      else this.createdBy = 'S/R';

      this.roomsService.getProfessionals().subscribe((data) => {
        // console.log(data);
        this.tempProfessionals = [...data.payload];
        this.professionals = data.payload;
      });
      this.roomsService.getCoordinators().subscribe((data) => {
        // console.log(data);
        this.tempCoordinators = [...data.payload];
        this.coordinators = data.payload;
      });

      this.professionalSelected.valueChanges.subscribe((newValue) => {
        var search = '';
        if (typeof newValue === 'object') search = `${newValue.personalData?.name} ${newValue.personalData?.lastName}`;
        else search = newValue;
        this.professionals = this.filterAutocompleteProfessionals(search);
      });

      this.coordinatorSelected.valueChanges.subscribe((newValue) => {
        var search = '';
        if (typeof newValue === 'object') search = `${newValue.personalData?.name} ${newValue.personalData?.lastName}`;
        else search = newValue;
        this.coordinators = this.filterAutocompleteCoordinators(search);
      });

      // console.log(this.roomForm);
    });
  }

  public getDisplayFn() {
    return (val) => this.display(val);
  }

  private display(user): string {
    //access component "this" here
    return user ? user.personalData.name + ' ' + user.personalData.lastName : user;
  }

  filterAutocompleteProfessionals(search: string) {
    return this.tempProfessionals.filter(
      (value) =>
        value.personalData.name.toLowerCase().indexOf(search.toLowerCase()) === 0 ||
        value.personalData.lastName.toLowerCase().indexOf(search.toLowerCase()) === 0
    );
  }

  filterAutocompleteCoordinators(search: string) {
    return this.tempCoordinators.filter(
      (value) =>
        value.personalData.name.toLowerCase().indexOf(search.toLowerCase()) === 0 ||
        value.personalData.lastName.toLowerCase().indexOf(search.toLowerCase()) === 0
    );
  }

  addPersonnel() {
    // console.log(this.professionalSelected.value);
    if (this.role === 'professionals') {
      if (this.professionalsData.some((pro) => pro.userId === this.professionalSelected.value.userId)) {
        alert(`${this.professionalSelected.value.personalData.name} ya esta asignado a esta sala de espera`);
      } else {
        this.professionalsData.push(this.professionalSelected.value);
      }
    }
    if (this.role === 'coordinators') {
      if (this.coordinatorsData.some((pro) => pro.userId === this.coordinatorSelected.value.userId)) {
        alert(`${this.coordinatorSelected.value.personalData.name} ya esta asignado a esta sala de espera`);
      } else {
        this.coordinatorsData.push(this.coordinatorSelected.value);
      }
    }
  }

  removeProfessional(index) {
    this.professionalsData.splice(index, 1);
  }

  removeCoordinator(index) {
    this.coordinatorsData.splice(index, 1);
  }

  validRoom() {
    if (this.roomForm.valid) {
      return true;
    } else {
      return false;
    }
  }

  updateWaitingRoom() {
    const _professionals = this.professionalsData.map((map) => {
      return map.userId;
    });
    const _coordinators = this.coordinatorsData.map((map) => {
      return map.userId;
    });

    const roomObject = {
      name: this.roomForm.get('name').value,
      requirePayment: this.requirePayment,
      appointmentPrice: this.roomForm.get('appointmentPrice').value || 0,
      description: this.roomForm.get('description').value,
      professionals: _professionals,
      coordinators: _coordinators,
    };

    this.roomsService.updateWaitingRoom(roomObject, this.roomId).subscribe(
      () => {
        console.log('room updated');
        this.location.back();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
