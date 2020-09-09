import { Component, OnInit, Input } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RoomsService } from 'src/app/services/rooms.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  waitingRooms: any[] = [];
  personnel: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredPersonnel: Observable<string[]>;
  searchTerm: string = '';
  profileSelected: string = null;
  pageSize: number = 10;
  ColumnMode = ColumnMode;

  // FORM
  roomForm: FormGroup;
  acceptPayments: boolean = false;
  role: string = 'professionals';

  control = new FormControl();

  constructor(private formBuilder: FormBuilder, private roomsService: RoomsService) {
    this.waitingRooms = [
      {
        id: 12345,
        name: 'Sala de Espera 1',
        description: 'desc 1',
        url: 'www.crisaty.com',
        payments: true,
        isActive: true,
      },
    ];
  }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      name: ['', Validators.required],
      appointmentPrice: [0, [Validators.pattern(/^[0-9]{1,5}([\\.][0-9]{1,2})?$"/)]],
      description: ['', null],
      personnelName: ['', null],
    });
    this.filteredPersonnel = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.personnel.filter((street) => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  addPersonnel() {
    console.log('test');
  }

  createWaitingRoom() {
    const roomObject = {
      name: this.roomForm.get('name').value,
      appointmentPrice: this.roomForm.get('appointmentPrice').value || 0,
      description: this.roomForm.get('description').value,
    };

    this.roomsService.createWaitingRoom(roomObject).subscribe(
      () => {
        console.log('room created');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
