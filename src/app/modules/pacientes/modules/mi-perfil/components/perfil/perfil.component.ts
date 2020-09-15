import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { AccountService } from './../../../../../../services/account.service';
import { UsersService } from 'src/app/services/users.service';
import { error } from 'protractor';




@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})

export class PerfilComponent implements OnInit {
  public identificationDataGet: any;
  isForeign: boolean = false;
  public identificationData: FormGroup;
  personalData: FormGroup;
  birthData: FormGroup;
  addressData: FormGroup;
  passwordData: FormGroup;
  public geFormData:any;
  public addressDataModel:any;
  public foto:any;
  public base64: any;
  public nameFile: any;
  public textInputFile: any;

  states: any = [];
  cities: any = [];
  countries: any = [];
  breeds: any = [];
  educations: any = [];
  familiarSituations: any = [];
  issuingEntities: any = [];
  cuidadActual:any;

  constructor(private accountService:AccountService, private _formBuilder: FormBuilder, private userService: UsersService) {

  }

  ngOnInit(): void {

  
    this.getUser();
    this.getIssuingEntities();
    this.getUfs();
    this.getCities();
    this.getCountries();
    this.getBreeds();
    this.getEducations();



    this.identificationData = this._formBuilder.group({
      document: [, Validators.required],
      idDocumentNumber: [, Validators.required],
      passport: ['', ],
      rgRegistry: ['', ],
      issuingBody: [, ],
      extraDocument: [, ],
      extraIdDocument: ['', ],
    });

    this.personalData = this._formBuilder.group(
      { 
        education: new FormControl(),
        phoneNumber: [, [Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]],
      }
    );
    this.birthData = this._formBuilder.group({
  
      ufBirth: [, ],
      municipalityBirth: [, ],
      nacionality: [, ],
    });
    this.addressData = this._formBuilder.group({
      cep: ['', ],
      //uf: [, ],
      city: [, ],
      neighborhood: ['', ],
      street: ['', ],
      streetNumber: [, [ Validators.pattern(/^(?=.*[0-9])/)]],
    });

  }

  getUser(){
    this.accountService.getUser().subscribe(
      data => {
        this.geFormData = data;
        console.log(data);
        this.identificationDataGet = data.identificationData;
        console.log(this.identificationData)
        this.cuidadActual = this.geFormData.addressData.city;
       },
      error => {
        console.log(error)
      }
    )
  }

  updateData(){
    /*
    this.personalData = this._formBuilder.group(
      {
        phoneNumber: this.form[1].name.value,
      }
    );
    this.addressData = this._formBuilder.group({
      cep: ['', ],
      uf: [, ],
      city: [, ],
      neighborhood: ['', ],
      street: ['', ],
      streetNumber: [, [ Validators.pattern(/^(?=.*[0-9])/)]],
    });*/

    const formObject = { 
      personalData: {
        education: this.personalData.controls.education.value,
        phoneNumber: this.personalData.controls.phoneNumber.value,
      },
      addressData: this.addressData.value
    } 
    console.log(formObject);
    
    this.accountService.updateUser(formObject).subscribe(
      data => {
        console.log(data);
        this.getUser();
      },
      error => {
        console.log(error)
      }
    )/**/

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
      this.foto = this.base64.split(',')[1];
      console.log(this.base64.split(',')[1]);
    };
    this.putPhotos(this.foto);
  }


  putPhotos(foto){
    this.accountService.putPhoto(foto).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

  getIssuingEntities() {
    this.userService.getIssuingEntities().subscribe((data) => {
      // console.log(data);
      this.issuingEntities = data.payload;
    });
  }

  getUfs() {
    this.userService.getStates().subscribe((data) => {
      // console.log(data);
      this.states = data.payload;
    });
  }

  getEducations() {
    this.userService.getEducations().subscribe((data) => {
      // console.log(data);
      this.educations = data.payload;
    });
  }

  

  getCities() {
    this.userService.getCities().subscribe((data) => {
      // console.log(data);
      let ciuidadActual = this.cities.filter(a => a._id === this.cuidadActual);
      console.log(ciuidadActual);
      this.cities = data.payload;
    });
  }

  getCountries() {
    this.userService.getCountries().subscribe((data) => {
      // console.log(data);
      this.countries = data.payload;
    });
  }

  getBreeds() {
    this.userService.getBreeds().subscribe((data) => {
      // console.log(data);
      this.breeds = data.payload;
    });
  }


}
