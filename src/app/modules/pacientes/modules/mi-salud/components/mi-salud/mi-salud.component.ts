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
  public antecedentesGeneral:any;
  public exams:any;
  public modelAntecedente:any = {}
  public addExamen: FormGroup;
  public category:any;
  public base64:any;

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


  categoryChangue(category?){
    //console.log(category);
    this.category = category;
    //return category
  }

  add(category){
    console.log(this.modelAntecedente);
    this.putAddAntecedent(category, this.modelAntecedente);
  }

  addExamenPost(){
    console.log(this.addExamen);
    const formObject = {
      fileName: this.addExamen.controls.fileName.value,
      documentType: this.addExamen.controls.documentType.value,
      madeBy: this.addExamen.controls.madeBy.value,
      file: this.base64
    };
    this.putAddExamen(formObject);
  }


  putAddExamen(object){
    
    this.medicalRecord.putAddExamen(object).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error)
      }
    )/**/
  }


  putAddAntecedent(antecedent, object){
    this.medicalRecord.putAddAntecedent(antecedent, object).subscribe(
      data => {
        console.log(data);
        this.category = '';
        this.getMedicalRecord();
      },
      error => {
        console.log(error)
      }
    )
  }

  delete(item, event){
    let antecedent = event.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log(antecedent);
    this.medicalRecord.deleteAntecedent(antecedent, item.id).subscribe(
      data => { 
        console.log(data);
        this. getMedicalRecord();
      },
      error => {
        console.log(error);
      }
    )
  }

  getMedicalRecord(){
    this.medicalRecord.getByUserId().subscribe(
      data => {
        this.exams = data.exams;
        console.log(this.exams )
        this.antecedentesGeneral = data.antecedent;
        this.antecedentes = data.antecedent.sickness;
        console.log(data.antecedent)
      },
      error => {
        console.log(error)
      }
    )
  }


  openFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      this.base64 = reader.result
      console.log(this.base64);
    };
  }
   

}
