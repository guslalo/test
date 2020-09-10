import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RoomsService } from 'src/app/services/rooms.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  waitingRooms: any[] = [];
  tempWaitingRooms: any[] = [];
  professionals: any[] = [];
  professionalsData: any[] = [];
  coordinators: any[] = [];
  coordinatorsData: any[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  ColumnMode = ColumnMode;

  // FORM
  roomForm: FormGroup;
  requirePayment: Boolean = false;
  role: string = 'professionals';
  professionalSelected = new FormControl();
  coordinatorSelected = new FormControl();
  @Input() value: any;
  @Output() valueChange = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private roomsService: RoomsService) {
    this.roomForm = this.formBuilder.group({
      name: ['', Validators.required],
      appointmentPrice: [null, [Validators.pattern(/^[0-9]{1,5}([\\.][0-9]{1,2})?$/)]],
      description: ['', null],
    });
  }

  ngOnInit(): void {
    this.fetchRooms();

    this.roomsService.getProfessionals().subscribe((data) => {
      // console.log(data);
      this.professionals = data.payload;
    });
    this.roomsService.getCoordinators().subscribe((data) => {
      // console.log(data);
      this.coordinators = data.payload;
    });
  }

  public getDisplayFn() {
    return (val) => this.display(val);
  }

  private display(user): string {
    //access component "this" here
    return user ? user.personalData.name : user;
  }

  public selected(user) {
    this.value = user;
    //send to parent or do whatever you want to do
    this.valueChange.emit(user);
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

  fetchRooms(): void {
    this.roomsService.getWaitingRooms().subscribe((data) => {
      console.log(data);
      this.tempWaitingRooms = [...data.payload];
      this.waitingRooms = data.payload;
    });
  }

  validRoom() {
    if (this.roomForm.valid && this.professionalsData.length && this.coordinatorsData.length) {
      return true;
    } else {
      return false;
    }
  }

  createWaitingRoom() {
    const _professionals = this.professionalsData.map((map) => {
      return map.userId;
    });
    const _coordinators = this.coordinatorsData.map((map) => {
      return map.userId;
    });

    let _appointmentPrice = '0';

    if (this.requirePayment) _appointmentPrice = this.roomForm.get('appointmentPrice').value;

    const roomObject = {
      name: this.roomForm.get('name').value,
      requirePayment: this.requirePayment,
      appointmentPrice: _appointmentPrice,
      description: this.roomForm.get('description').value,
      professionals: _professionals,
      coordinators: _coordinators,
    };

    this.roomsService.createWaitingRoom(roomObject).subscribe(
      () => {
        console.log('room created');
        setTimeout(() => {
          this.fetchRooms();
        }, 1000);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilters() {
    const searchTerm = this.searchTerm.toLowerCase();
    const temp = this.tempWaitingRooms
      // SEARCH FILTER
      .filter((item) => {
        console.log(item);
        return (
          item.roomDetails.name.toString().toLowerCase().indexOf(searchTerm) !== -1 ||
          item.roomDetails.description.toString().toLowerCase().indexOf(searchTerm) !== -1 ||
          !searchTerm
        );
      });
    this.waitingRooms = temp;

    // console.log(temp);
  }
}
