import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from 'src/app/services/account.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  public identificationDataGet: any;
  isForeign: boolean = false;
  public identificationData: FormGroup;
  personalData: FormGroup;
  birthData: FormGroup;
  addressData: FormGroup;
  passwordData: FormGroup;
  public formData: any;
  public addressDataModel: any;
  public foto: any;
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
  countryMap: any = [];

  constructor(
    private accountService: AccountService,
    private _formBuilder: FormBuilder,
    private userService: UsersService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.getIssuingEntities();
    this.getUfs();
    this.getCities();
    this.getCountries();
    this.getBreeds();
    this.getEducations();

    this.getUser();

    this.identificationData = this._formBuilder.group({
      document: [, Validators.required],
      idDocumentNumber: [, Validators.required],
      passport: [''],
      rgRegistry: [''],
      issuingBody: [,],
      extraDocument: [,],
      extraIdDocument: [''],
    });

    this.personalData = this._formBuilder.group({
      education: [null, null],
      phoneNumber: [, [Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]],
    });
    this.addressData = this._formBuilder.group({
      cep: [''],
      uf: [''],
      city: [,],
      neighborhood: [''],
      street: [''],
      streetNumber: [, [Validators.pattern(/^(?=.*[0-9])/)]],
    });
  }

  getUser() {
    this.accountService.getUser().subscribe(
      (data) => {
        console.log(data);

        this.formData = data;
        this.personalData.get('phoneNumber').setValue(this.formData.personalData.phoneNumber);
        this.personalData.get('education').setValue(this.formData.personalData.education);

        this.addressData.get('cep').setValue(this.formData.addressData.cep);
        this.addressData.get('uf').setValue(this.formData.addressData.uf);
        this.addressData.get('city').setValue(this.formData.addressData.city);
        this.addressData.get('neighborhood').setValue(this.formData.addressData.neighborhood);
        this.addressData.get('street').setValue(this.formData.addressData.street);
        this.addressData.get('streetNumber').setValue(this.formData.addressData.streetNumber);

        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  updateData() {
    const formObject = {
      identificationData: this.formData.identificationData,
      personalData: {
        name: this.formData.personalData.name,
        lastName: this.formData.personalData.lastName,
        secondLastName: this.formData.personalData.secondLastName,
        motherName: this.formData.personalData.motherName,
        email: this.formData.personalData.email,
        gender: this.formData.personalData.gender,
        nacionality: this.formData.personalData.nacionality,
        education: this.personalData.controls.education.value || this.formData.personalData.education,
        phoneNumber: this.personalData.controls.phoneNumber.value || this.formData.personalData.phoneNumber,
      },
      addressData: this.addressData.value,
    };
    console.log(formObject);

    this.accountService.updateUser(formObject).subscribe(
      (data) => {
        console.log(data);
        this.getUser();
      },
      (error) => {
        console.log(error);
      }
    ); /**/
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
      // console.log(this.base64.split(',')[1]);
    };
    //this.putPhotos(this.foto);
  }

  updateProfilePhoto() {
    this.accountService.updateProfilePhoto(this.foto).subscribe(
      (data) => {
        this.foto = null;
        this.textInputFile = null;
        this.getUser();
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
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
      this.cities = data.payload;
    });
  }

  getCountries() {
    this.userService.getCountries().subscribe((data) => {
      // console.log(data);
      this.countryMap = data.payload.reduce((obj, item) => {
        obj[item._id] = item;
        return obj;
      }, {});
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
