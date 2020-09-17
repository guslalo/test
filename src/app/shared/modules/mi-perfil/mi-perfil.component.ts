import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from 'src/app/services/account.service';
import { UsersService } from 'src/app/services/users.service';
import { CustomDateAdapter } from '../../utils';

const current = new Date();

@Component({
  selector: 'app-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  public identificationDataGet: any;
  isForeign: boolean = false;
  isSchool: boolean = false;
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
  public alertSuccess: boolean;
  public alertError: boolean;
  messageError: string;

  user: any = {};
  states: any = [];
  cities: any = [];
  countries: any = [];
  breeds: any = [];
  educations: any = [];
  familiarSituations: any = [];
  issuingEntities: any = [];
  countryMap: any = [];

  currentDate = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
    day: current.getDate(),
  };

  dateAdapter = new CustomDateAdapter();
  inmigrationDate: NgbDateStruct;

  constructor(
    private accountService: AccountService,
    private _formBuilder: FormBuilder,
    private userService: UsersService,
    private spinner: NgxSpinnerService,
    private calendar: NgbCalendar
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.getIssuingEntities();
    this.getUfs();
    this.getCities();
    this.getCountries();
    this.getBreeds();
    this.getEducations();
    this.getFamiliarSituations();

    this.getUser();

    this.identificationData = this._formBuilder.group({
      document: [null, Validators.required],
      idDocumentNumber: ['', Validators.required],
      passport: ['', null],
      rgRegistry: ['', null],
      issuingBody: [null, null],
      extraDocument: [null, null],
      extraIdDocument: ['', null],
      inmigrationDate: [null, null],
    });

    this.personalData = this._formBuilder.group({
      isSchool: this.isSchool,
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', Validators.pattern(/^[a-zA-Z\s]*$/)],
      motherName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      secondLastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]],
      gender: ['male', Validators.required],
      birthdate: [null, null],
      ufBirth: [null, null],
      municipalityBirth: [null, null],
      nacionality: [null, Validators.required],
      originCountry: [null, null],
      breed: [null, Validators.required],
      education: [null, null],
      familySituation: [null, null],
    });
    this.addressData = this._formBuilder.group({
      cep: [''],
      uf: [''],
      city: [,],
      neighborhood: [''],
      street: [''],
      streetNumber: [, [Validators.pattern(/^(?=.*[0-9])/)]],
    });

    this.inmigrationDate = this.calendar.getToday();
  }

  getUser() {
    this.accountService.getUser().subscribe(
      (user) => {
        console.log(user);
        this.user = user;

        // MAIN IDENTIFICATION
        if (user.identificationData.cpf) this.identificationData.get('document').setValue('cpf');
        if (user.identificationData.cns) this.identificationData.get('document').setValue('cns');
        if (user.identificationData.rgRegistry) this.identificationData.get('document').setValue('rgRegistry');
        // SECONDARY IDENTIFICATION
        if (user.identificationData.cbo) this.identificationData.get('extraDocument').setValue('cbo');
        if (user.identificationData.pasep) this.identificationData.get('extraDocument').setValue('pasep');
        if (user.identificationData.ctps) this.identificationData.get('extraDocument').setValue('ctps');
        if (user.identificationData.idDocumentNumber)
          this.identificationData.get('extraDocument').setValue('idDocumentNumber');
        if (user.identificationData.professionalUfNumber)
          this.identificationData.get('extraDocument').setValue('professionalUfNumber');

        this.identificationData
          .get('idDocumentNumber')
          .setValue(user.identificationData.cpf || user.identificationData.cns || user.identificationData.rgRegistry);

        if (user.identificationData.rgRegistry)
          this.identificationData.get('issuingBody').setValue(user.identificationData.issuingBody);

        this.isForeign = user.identificationData.isForeign || false;
        if (user.identificationData.isForeign) {
          this.identificationData.get('passport').setValue(user.identificationData.passport);
          this.inmigrationDate =
            this.dateAdapter.fromModel(user.personalData.inmigrationDate) || this.calendar.getToday();
          this.identificationData.get('inmigrationDate').setValue(this.inmigrationDate);
        } else {
          this.identificationData.get('passport').setValue('N/A');
        }

        this.identificationData
          .get('extraIdDocument')
          .setValue(
            user.identificationData.cbo ||
              user.identificationData.pasep ||
              user.identificationData.ctps ||
              user.identificationData.idDocumentNumber ||
              user.identificationData.titleVote ||
              user.identificationData.professionalUfNumber
          );

        this.formData = user;

        this.isSchool = user.personalData.isSchool;
        this.personalData.get('name').setValue(user.personalData.name);
        this.personalData.get('lastName').setValue(user.personalData.lastName);
        this.personalData.get('secondLastName').setValue(user.personalData.secondLastName);
        this.personalData.get('email').setValue(user.personalData.email);
        this.personalData.get('phoneNumber').setValue(user.personalData.phoneNumber);
        this.personalData.get('gender').setValue(user.personalData.gender);
        this.personalData.get('birthdate').setValue(moment(user.personalData.birthdate).format('DD/MM/YYYY'));
        this.personalData.get('ufBirth').setValue(user.personalData.ufBirth || null);
        this.personalData.get('municipalityBirth').setValue(user.personalData.municipalityBirth || null);
        this.personalData.get('nacionality').setValue(user.personalData.nacionality);
        this.personalData.get('breed').setValue(user.personalData.breed);
        this.personalData.get('education').setValue(user.personalData.education || null);
        this.personalData.get('familySituation').setValue(user.personalData.familySituation || null);
        this.personalData.get('motherName').setValue(user.personalData.motherName);

        this.addressData.get('cep').setValue(this.formData.addressData.cep);
        this.addressData.get('uf').setValue(this.formData.addressData.uf);
        this.addressData.get('city').setValue(this.formData.addressData.city);
        this.addressData.get('neighborhood').setValue(this.formData.addressData.neighborhood);
        this.addressData.get('street').setValue(this.formData.addressData.street);
        this.addressData.get('streetNumber').setValue(this.formData.addressData.streetNumber);

        setTimeout(() => {
          this.validateForm();
          this.spinner.hide();
        }, 1000);
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  validateForm() {
    this.identificationData.clearValidators();

    if (this.isForeign) {
      this.identificationData.get('extraDocument').disable();
      this.identificationData.get('extraIdDocument').disable();
    } else {
      this.identificationData.get('extraDocument').enable();
      this.identificationData.get('extraIdDocument').enable();
    }

    this.identificationData.updateValueAndValidity();
  }

  updateData() {
    const formObject = {
      identificationData: {
        ...(this.identificationData.value.extraDocument === 'cbo' && {
          cbo: this.identificationData.value.extraIdDocument || '',
        }),
        ...(this.identificationData.value.extraDocument === 'pasep' && {
          pasep: this.identificationData.value.extraIdDocument || '',
        }),
        ...(this.identificationData.value.extraDocument === 'ctps' && {
          ctps: this.identificationData.value.extraIdDocument || '',
        }),
        ...(this.identificationData.value.extraDocument === 'idDocumentNumber' && {
          idDocumentNumber: this.identificationData.value.extraIdDocument || '',
        }),
        ...(this.identificationData.value.extraDocument === 'titleVote' && {
          titleVote: this.identificationData.value.extraIdDocument || '',
        }),
        ...(this.identificationData.value.extraDocument === 'professionalUfNumber' && {
          professionalUfNumber: this.identificationData.value.extraIdDocument || '',
        }),
      },
      personalData: {
        isSchool: this.isSchool,
        name: this.personalData.value.name,
        lastName: this.personalData.value.lastName,
        secondLastName: this.personalData.value.secondLastName,
        motherName: this.personalData.value.motherName,
        nacionality: this.personalData.value.nacionality,
        education: this.personalData.value.education,
        familySituation: this.personalData.value.familySituation,
        phoneNumber: this.personalData.value.phoneNumber,
        inmigrationDate: this.dateAdapter.toModel(this.identificationData.value.inmigrationDate),
      },
      addressData: this.addressData.value,
    };
    console.log(formObject);

    this.accountService.updateUser(formObject).subscribe(
      (data) => {
        console.log(data);
        this.alertSuccess = true;
        this.getUser();
      },
      (err) => {
        console.log(err);
        this.messageError = err.error.message;
        this.alertError = true;
      }
    );

    setTimeout(() => {
      this.alertSuccess = false;
      this.alertError = false;
    }, 5000);
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
        console.log(data);
        this.foto = null;
        this.textInputFile = null;
        this.alertSuccess = true;
        this.getUser();
      },
      (err) => {
        console.log(err);
        this.messageError = err.error.message;
        this.alertError = true;
      }
    );

    setTimeout(() => {
      this.alertSuccess = false;
      this.alertError = false;
    }, 5000);
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

  getFamiliarSituations() {
    this.userService.getFamiliarSituations().subscribe((data) => {
      // console.log(data);
      this.familiarSituations = data.payload;
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
