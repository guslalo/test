import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from './../../../../../../services/medicalRecord.service';
import { DocumentService } from './../../../../../../services//document.service';
import { CurrentUserService } from './../../../../../../services/current-user.service';
import { UserLogin } from './../../../../../../models/models';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mi-salud',
  templateUrl: './mi-salud.component.html',
  styleUrls: ['./mi-salud.component.scss'],
})
export class MiSaludComponent implements OnInit {
  public UserLogin: UserLogin;
  public user: any;
  public antecedentes: any;
  public exams: any;
  public modelAntecedente: any;
  public addExamen: FormGroup;
  public agregarItem: FormGroup;
  public category: any;
  public base64: any;
  public nameFile: any;
  public downloadUrl: any;
  public elemento: string;
  public booleanDelete: boolean;
  public antecedente: string;
  public elemntoId: string;
  public elemntoValue: string;
  public textInputFile: any;
  public addValidator: boolean;
  public access_token: any;

  sicknessIsCollapsed: boolean = true;
  familiarHistoryIsCollapsed: boolean = true;
  healthHabitsIsCollapsed: boolean = true;
  medicinesIsCollapsed: boolean = true;
  occupationalIsCollapsed: boolean = true;
  othersIsCollapsed: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private documentService: DocumentService,
    private medicalRecordService: MedicalRecordService
  ) {}

  ngOnInit(): void {
    this.textInputFile = 'seleccionar archivo';
    this.user = new UserLogin(
      JSON.parse(localStorage.getItem('currentUser')).id,
      JSON.parse(localStorage.getItem('currentUser')).email,
      JSON.parse(localStorage.getItem('currentUser')).name,
      JSON.parse(localStorage.getItem('currentUser')).lastName,
      JSON.parse(localStorage.getItem('currentUser')).access_token,
      JSON.parse(localStorage.getItem('currentUser')).expires_in,
      JSON.parse(localStorage.getItem('currentUser')).internalCode,
      JSON.parse(localStorage.getItem('currentUser')).administrativeData,
      JSON.parse(localStorage.getItem('currentUser')).administrativeDataContext,
      JSON.parse(localStorage.getItem('currentUser')).role
    );
    console.log(this.user.id);
    this.getMedicalRecord();

    this.addValidator = false;
    this.addExamen = this._formBuilder.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      data: [null, [Validators.required]],
    });

    this.agregarItem = this._formBuilder.group({
      item: [null, [Validators.required]],
    });

    this.access_token = JSON.parse(localStorage.getItem('token'));
    this.downloadUrl = this.documentService.download();
  }

  clear(modelAntecedente) {
    this.modelAntecedente = '';
    this.addValidator = true;

    this.agregarItem.controls.item.reset;
    console.log(modelAntecedente);
    this.modelAntecedente = this.agregarItem.controls.item.value;
  }

  categoryChangue(category?) {
    this.addValidator = false;
    console.log(category);
    this.modelAntecedente = '';
    //console.log(category);
    this.category = category;
    //return category
  }

  add(category) {
    console.log(this.modelAntecedente);
    this.putAddAntecedent(category, this.modelAntecedente);
  }

  addExamenPost() {
    console.log(this.addExamen);
    const formObject = {
      name: this.nameFile,
      type: this.addExamen.controls.type.value,
      file: this.base64.split(',')[1],
    };
    this.putAddExamen(formObject, this.user.id);
  }

  putAddExamen(object, id: string) {
    this.medicalRecordService.putAddExamen(object, id).subscribe(
      (data) => {
        console.log(data);
        this.getMedicalRecord();
      },
      (error) => {
        console.log(error);
      }
    ); /**/
  }

  putAddAntecedent(antecedent, object) {
    this.medicalRecordService.putAddAntecedent(antecedent, object).subscribe(
      (data) => {
        console.log(data);
        this.category = '';
        this.getMedicalRecord();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //borrar antecedente
  preDelete(item, event) {
    let antecedent = event.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log(antecedent);
    this.antecedente = antecedent;
    this.elemntoId = item.id;
    this.elemntoValue = item.value;
  }

  delete() {
    this.medicalRecordService.deleteAntecedent(this.antecedente, this.elemntoId).subscribe(
      (data) => {
        console.log(data);
        this.getMedicalRecord();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMedicalRecord() {
    this.medicalRecordService.getByUserId().subscribe(
      (data) => {
        // console.log(data);
        this.exams = data.payload.exams;
        this.antecedentes = data.payload.antecedent;
        // console.log(this.antecedentes);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  resetValue() {
    this.textInputFile = 'seleccionar archivo';
  }

  hasAntecedents(antecedent, boolean) {
    this.medicalRecordService.hasAntecedents(antecedent, boolean).subscribe(
      (data) => {
        this.medicalRecordService.getByUserId().subscribe((data) => {
          this.exams = data.payload.exams;
          this.antecedentes = data.payload.antecedent;
        });
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
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
}
