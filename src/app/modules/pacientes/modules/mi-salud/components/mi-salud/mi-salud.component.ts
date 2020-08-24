import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from './../../../../../../services/medicalRecord.service';
import { CurrentUserService } from './../../../../../../services/current-user.service';
import { UserLogin } from './../../../../../../models/models';

import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-mi-salud',
  templateUrl: './mi-salud.component.html',
  styleUrls: ['./mi-salud.component.scss'],
})
export class MiSaludComponent implements OnInit {
  public UserLogin: UserLogin;
  public user: any;
  public antecedentes:any;
  public modelAntecedente:any = {}
  public addExamen: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private currentUserService:CurrentUserService,
    private medicalRecord:MedicalRecordService) {}

  ngOnInit(): void {
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

    this.addExamen = this._formBuilder.group({
      fileName: [null, [Validators.required]],
      documentType: [null, [Validators.required]],
      madeBy: [null, [Validators.required]],
      file: [null, [Validators.required]],
    });

  }

  /*
  getUser(id){
    this.currentUserService.currentUser(id).subscribe(
      data => {
        console.log(data)
        this.getMedicalRecord(data.id);
      },
      error => {
        console.log(error)
      }
    )

  }*/

  add(antecedent){
    console.log(antecedent);
    console.log(this.modelAntecedente);
    this.putAddAntecedent(antecedent, this.modelAntecedente);
  }

  addExamenPost(){
    console.log(this.addExamen);
    this.putAddExamen(this.addExamen);
  }


  putAddExamen(object){
    this.medicalRecord.putAddExamen(object).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error)
      }
    )
  }


  putAddAntecedent(antecedent, object){
    this.medicalRecord.putAddAntecedent(antecedent, object).subscribe(
      data => {
        console.log(data);
        this.getMedicalRecord();
      },
      error => {
        console.log(error)
      }
    )
  }

  getMedicalRecord(){
    this.medicalRecord.getByUserId().subscribe(
      data => {
        this.antecedentes = data.antecedent.sickness;
        console.log(data.antecedent)
      },
      error => {
        console.log(error)
      }
    )
  }


}
