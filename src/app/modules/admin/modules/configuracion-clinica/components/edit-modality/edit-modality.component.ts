import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-modality',
  templateUrl: './edit-modality.component.html',
  styleUrls: ['./edit-modality.component.scss'],
})
export class EditModalityComponent implements OnInit {
  modalityForm: FormGroup;
  waitingRooms: Array<any>;
  immediateData: any;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private modalRef: BsModalRef) {
    this.modalityForm = this.formBuilder.group({
      description: ['', null],
      waiting_room: ['', null],
    });
  }

  ngOnInit(): void {
    this.adminService.getWaitingRooms().subscribe((data) => {
      this.waitingRooms = data.payload.map((e) => {
        return { name: e.roomDetails.name, _id: e._id };
      });
    });
    this.adminService.getImmediateData().subscribe(
      (data) => {
        this.immediateData = data.payload;
        this.modalityForm.get('waiting_room').setValue(this.immediateData.moduleDetails.waitingRoom);
        this.modalityForm.get('description').setValue(this.immediateData.moduleDetails.description);
      },
      (err) => {
        console.log('Error al obtener data modality', err);
      }
    );
  }

  closeModal() {
    this.modalRef.hide();
  }

  updateModality() {
    let modalityData = {
      description: this.modalityForm.get('description').value,
      waitingRoom: this.modalityForm.get('waiting_room').value,
    };
    this.adminService.updateModalityItem(modalityData).subscribe(
      (d) => {
        this.modalRef.hide();
      },
      (err) => {}
    );
  }
}
