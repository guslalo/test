import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { MedicalRecordService } from 'src/app/services/medicalRecord.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/services/users.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DocumentService } from 'src/app/services/document.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ficha-paciente',
  templateUrl: './ficha-paciente.component.html',
  styleUrls: ['./ficha-paciente.component.scss'],
})
export class FichaPacienteComponent implements OnInit {
  userId = this.routerAct.snapshot.queryParamMap.get('userId');
  patientRecord: any = [];
  appointmentsRecord: any = [];
  antecedentsRecord: any = [];
  examsRecord: any = [];
  prescriptionsRecord: any = [];
  timelineRecord: any = [];
  identification: any = {};
  ufMap: any = [];
  cityMap: any = [];

  // EXTRAS
  moment: any = moment;
  ColumnMode = ColumnMode;
  downloadUrl: any;
  access_token: any;

  public fileForm: FormGroup;
  public base64: any;
  public nameFile: any;
  public textInputFile: any;

  constructor(
    private routerAct: ActivatedRoute,
    private formBuilder: FormBuilder,
    private medicalRecordService: MedicalRecordService,
    private userService: UsersService,
    private documentService: DocumentService,
    private spinner: NgxSpinnerService
  ) {}
  tomorrow = new Date(2020, 9, 20, 14, 34);

  ngOnInit(): void {
    this.getMedicalRecord(this.userId);
    this.access_token = JSON.parse(localStorage.getItem('token'));
    this.downloadUrl = this.documentService.download();

    this.fileForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      data: [null, [Validators.required]],
    });
  }

  getMedicalRecord(userId) {
    this.spinner.show();
    this.medicalRecordService.getByUserId(userId).subscribe(
      (data) => {
        // console.log(data.payload[0].patientData);
        this.patientRecord = data.payload.patientData;
        this.appointmentsRecord = data.payload.appointments;
        this.antecedentsRecord = data.payload.antecedent;
        this.examsRecord = data.payload.exams;

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

        this.getIdentification(this.patientRecord.identificationData);
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
    this.medicalRecordService.getTimeline().subscribe(
      (data) => {
        this.timelineRecord = data.payload;
        console.log(this.timelineRecord);
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

  openFile(event) {
    const file = event.target.files[0];
    this.nameFile = event.target.files[0].name;
    this.textInputFile = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      this.base64 = reader.result;
      this.base64.split(',')[1];
      console.log(this.base64.split(',')[1]);
    };
  }

  uploadFile() {
    console.log(this.fileForm);
    const formObject = {
      name: this.nameFile,
      type: this.fileForm.controls.type.value.toString(),
      file: this.base64.split(',')[1],
    };
    this.medicalRecordService.putAddExamen(formObject).subscribe(
      (data) => {
        console.log(data);
        this.getMedicalRecord(this.userId);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
