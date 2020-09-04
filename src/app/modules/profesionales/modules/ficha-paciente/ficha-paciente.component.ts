import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { MedicalRecordService } from 'src/app/services/medicalRecord.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-ficha-paciente',
  templateUrl: './ficha-paciente.component.html',
  styleUrls: ['./ficha-paciente.component.scss'],
})
export class FichaPacienteComponent implements OnInit {
  userId = this.routerAct.snapshot.queryParamMap.get('userId');
  patientRecord: any = {};
  identification: any = {};
  ufMap: any = [];
  cityMap: any = [];

  // EXTRAS
  moment: any = moment;

  constructor(
    private routerAct: ActivatedRoute,
    private medicalRecordService: MedicalRecordService,
    private userService: UsersService,
    private spinner: NgxSpinnerService
  ) {}
  tomorrow = new Date(2020, 9, 20, 14, 34);

  ngOnInit(): void {
    this.getMedicalRecord(this.userId);
  }

  getMedicalRecord(userId) {
    this.spinner.show();
    this.medicalRecordService.getByUserId(userId).subscribe(
      (data) => {
        console.log(data);
        this.patientRecord = data;

        this.userService.getStates().subscribe((data) => {
          // console.log(data);
          this.ufMap = data.payload.reduce((obj, item) => {
            obj[item._id] = item;
            return obj;
          }, {});
        });

        this.userService.getCities().subscribe((data) => {
          // console.log(data);
          this.cityMap = data.payload.reduce((obj, item) => {
            obj[item._id] = item;
            return obj;
          }, {});
        });

        this.getIdentification(data.patientData.identificationData);
        // console.log(this.patientRecord.patientData.identificationData);
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  getIdentification(data) {
    for (const item of Object.keys(data)) {
      if (data[item]) {
        this.identification.type = item;
        this.identification.value = data[item];
      }
    }
  }
}
