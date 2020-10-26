import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditModalityComponent } from '../edit-modality/edit-modality.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/modules/admin/services/admin.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  infoForm: FormGroup;
  modalRef: BsModalRef;
  modalities: Array<any>;
  currentUser: any;
  clinicId: string;
  clinicData: any;

  //checkboxes
  paymentCB: boolean;
  scheduleCB: boolean;
  immediateCB: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private adminService: AdminService
  ) {
    this.infoForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', null],
      clinicPhone: ['', null],
      supportPhone: ['', null],
      workingDays: ['', null],
      address: ['', null],
      email: ['', null],
    });
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.clinicId = localStorage.getItem('clinic');
    console.log('currentuser', this.currentUser);
    this.adminService.getClinic(this.clinicId).subscribe(
      (data) => {
        let clinicData = data.payload;
        this.clinicData = clinicData;
        this.paymentCB = clinicData.accessMode.payment;
        this.scheduleCB = clinicData.accessMode.schedule;
        this.immediateCB = clinicData.accessMode.immediate;
        this.infoForm.get('name').setValue(clinicData.clinicName);
        this.infoForm.get('description').setValue(clinicData.description);
        this.infoForm.get('clinicPhone').setValue(clinicData.phone);
        this.infoForm.get('supportPhone').setValue(clinicData.supportPhone);
        this.infoForm.get('workingDays').setValue(clinicData.horary);
        this.infoForm.get('address').setValue(clinicData.address);
        this.infoForm.get('email').setValue(clinicData.email);
      },
      (err) => {}
    );
  }

  updateClinicInfo() {
    let clinicData = {
      clinicName: this.infoForm.get('name').value,
      description: this.infoForm.get('description').value,
      phone: this.infoForm.get('clinicPhone').value,
      supportPhone: this.infoForm.get('supportPhone').value,
      horary: this.infoForm.get('workingDays').value,
      address: this.infoForm.get('address').value,
      email: this.infoForm.get('email').value,
    };
    this.adminService.updateClinicInfo(this.clinicId, { ...this.clinicData, ...clinicData }).subscribe(
      (d) => {
        console.log('Clínica actualizada', d);
      },
      (err) => {
        console.log('Error al actualizar la clinica', err);
      }
    );
  }

  uploadTerms($event) {
    console.log('Terms file', $event.target.files[0]);
    this.adminService.uploadTerms($event.target.files[0], this.clinicId);
  }

  uploadPrivacy($event) {
    this.adminService.uploadPrivacy($event.target.files[0], this.clinicId);
  }

  uploadAgreement($event) {
    this.adminService.uploadAgreement($event.target.files[0], this.clinicId);
  }

  immediateOnChange(value: boolean) {
    if (value) {
      this.modalRef = this.modalService.show(EditModalityComponent, {
        class: 'modal-lg modal-dialog-centered',
      });
    }
    this.adminService.updateAccesMode(this.clinicId, 'immediate', value).subscribe(
      (data) => {},
      (err) => {}
    );
  }

  scheduleOnChange(value: boolean) {
    this.adminService.updateAccesMode(this.clinicId, 'schedule', value).subscribe(
      (data) => {},
      (err) => {}
    );
  }

  lastItemOnChange(value: boolean) {
    this.adminService.updateAccesMode(this.clinicId, 'payment', value).subscribe(
      (data) => {},
      (err) => {}
    );
  }
}
