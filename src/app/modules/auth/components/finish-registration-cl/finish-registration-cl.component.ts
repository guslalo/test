import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterService } from '../../services/register.service';

import { environment } from '../../../../../environments/environment';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
  NgbTimepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { registerUser } from '../../../../models/registerUser';
import { UsersService } from 'src/app/services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomDateAdapter } from 'src/app/shared/utils';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './finish-registration-cl.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class FinishRegistrationCLComponent implements OnInit {
  constructor(
    private router: Router,
    private registerUser: RegisterService,
    private _formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    private config: NgbDatepickerConfig,
    private routerAct: ActivatedRoute,
    private userService: UsersService,
    private patientService: PatientsService,
    private spinner: NgxSpinnerService
  ) {}
  public userRegister: registerUser;
  public placement = 'bottom';
  model: NgbDateStruct;
  date: { year: number; month: number };

  states: any = [];
  cities: any = [];
  countries: any = [];
  breeds: any = [];
  educations: any = [];
  familiarSituations: any = [];
  issuingEntities: any = [];

  public password: any;
  public user: any = {};
  public errorMsg: string;

  dateAdapter = new CustomDateAdapter();

  isLinear = false;
  isForeign: boolean = false;
  identificationData: FormGroup;
  personalData: FormGroup;
  birthData: FormGroup;
  addressData: FormGroup;
  passwordData: FormGroup;
  termsAccepted: boolean = false;
  privacyAccepted: boolean = false;
  consentAccepted: boolean = false;
  previsionHealth: any = [];
  public clinic: string;
  form = [];
  minDate = undefined;
  maxDate = undefined;
  public useTerm: any;
  public privacyTerms: any;
  public telemedicineConsent: any;
  prePatientId = this.routerAct.snapshot.queryParamMap.get('patient');

  public errorCepString: string;
  public errorCep: boolean = false;
  public ufObject: any;
  public cityObject: any;
  public neighborhood: any;
  public street: any;

  public mayorEdad: boolean;

  ngOnInit(): void {
    this.politicas();
    this.identificationData = this._formBuilder.group({
      document: [null, Validators.required],
      idDocumentNumber: [null, Validators.required],
      passport: ['', null],
    });
    this.personalData = this._formBuilder.group({
      name: [null, [Validators.required]],
      lastName: ['', null],
      secondLastName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required, Validators.minLength(2)]],
      gender: [null, [Validators.required, Validators.minLength(2)]],
      phoneNumber: [null, [Validators.required]],
      healthInsurance: [null, Validators.required],
    });
    this.birthData = this._formBuilder.group({
      birthdate: [null, Validators.required],
      municipalityBirth: [null, null],
      nacionality: [null, Validators.required],
    });
    this.addressData = this._formBuilder.group({
      uf: [null, Validators.required],
      city: [null, Validators.required],
      street: ['', Validators.required],
      streetNumber: [null, [Validators.required, Validators.pattern(/^(?=.*[0-9])/)]],
      complement: ['', null],
      zipcode: ['', null],
    });
    this.passwordData = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-ZÁÉÍÓÚÜÑ])/),
          Validators.pattern(/^(?=.*[a-záéíóúüñ])/),
          Validators.pattern(/^(?=.*[0-9])/),
          Validators.pattern(/^(?=.*[!@#\$%\^&\*\?_~\.\-\(\)\/])/),
          Validators.pattern(/^.{8,16}$/),
        ]),
        confirmPassword: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^(?=.*[A-ZÁÉÍÓÚÜÑ])/),
            Validators.pattern(/^(?=.*[a-záéíóúüñ])/),
            Validators.pattern(/^(?=.*[0-9])/),
            Validators.pattern(/^(?=.*[!@#\$%\^&\*\?_~\.\-\(\)\/])/),
            Validators.pattern(/^.{8,16}$/),
          ])
        ),
      },
      {
        validators: this.confirmPass.bind(this),
      }
    );

    this.getIssuingEntities();
    this.getUfs();
    this.getCities();
    this.getCountries();
    this.getBreeds();
    this.getPrevissions();
    //this.getLocationDataFromCep();

    this.form.push(
      this.identificationData.controls,
      this.personalData.controls,
      this.birthData.controls,
      this.addressData.controls,
      this.passwordData.controls
    );

    // console.log(this.prePatientId);
    this.getPrePatientData(this.prePatientId);
  }
  politicas() {
    this.useTerm = ['/terms-and-conditions'];
    this.privacyTerms = ['/privacy'];
    this.telemedicineConsent = ['/consent'];
  }
  ufSelect(id) {
    let idSelected = id.value.split(':');
    console.log(idSelected[1]);
    this.getCitiesforId(idSelected[1].trim());
  }
  getCitiesforId(stateId) {
    this.userService.getCitiesForUf(stateId).subscribe(
      (data) => {
        console.log(data);
        this.cities = data.payload;
        //this.citiesFilter = data.payload;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  validateForm() {
    // console.log(console.log(this.form[0]));

    this.identificationData.clearValidators();
    console.log(this.identificationData.valid);
    if (this.isForeign) {
      this.identificationData.get('passport').setValidators([Validators.required]);
      this.identificationData.get('idDocumentNumber').setValidators(null);
      this.identificationData.get('passport').enable();
      this.identificationData.get('document').disable();
      this.identificationData.get('idDocumentNumber').disable();
      this.identificationData.get('idDocumentNumber').reset();
      this.identificationData.get('document').reset();
    } else {
      this.identificationData.get('document').setValidators([Validators.required]);
      this.identificationData.get('idDocumentNumber').setValidators([Validators.required]);
      this.identificationData.get('passport').setValidators(null);
      this.identificationData.get('document').enable();
      this.identificationData.get('idDocumentNumber').enable();
    }

    if (this.identificationData.get('document').value === 'rgRegistry') {
      this.identificationData.get('idDocumentNumber').enable();
      this.identificationData.get('issuingBody').enable();
    } else {
      this.identificationData.get('passport').reset();
      this.identificationData.get('issuingBody').disable();
    }

    this.identificationData.updateValueAndValidity();
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  mostrarForm(form) {
    console.log(form.controls);
  }

  confirmPass(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  crearCuenta() {
    console.log(this.form);
    this.spinner.show();
    const formObject = {
      clinicId: '5f236fc966fbb0054894b780',
      identificationData: {
        ...(this.form[0].document.value === 'run' && { run: this.form[0].idDocumentNumber.value || '' }),
        passport: this.form[0].passport.value || '',
        isForeign: this.isForeign,
      },
      personalData: {
        name: this.form[1].name.value,
        lastName: this.form[1].lastName.value || '',
        secondLastName: this.form[1].secondLastName.value,
        gender: this.form[1].gender.value,
        phoneNumber: this.form[1].phoneNumber.value,
        email: this.form[1].email.value,
        birthdate: this.dateAdapter.toModel(this.form[2].birthdate.value),
        nacionality: this.form[2].nacionality.value,
        healthInsurance: this.form[1].healthInsurance.value || '',
      },
      addressData: {
        uf: this.form[3].uf.value,
        city: this.form[3].city.value,
        street: this.form[3].street.value,
        streetNumber: parseInt(this.form[3].streetNumber.value),
        complement: this.form[3].complement.value,
        zipcode: this.form[3].zipcode.value,
      },
      password: this.form[4].password.value,
    };

    if (formObject) {
      console.log(formObject);

      this.registerUser
        .registerUser(
          formObject.clinicId,
          formObject.identificationData,
          formObject.personalData,
          formObject.addressData,
          formObject.password,
          this.prePatientId
        )
        .subscribe(
          (data) => {
            console.log(data);
            this.spinner.hide();
            this.router.navigate(['confirm-account/' + data.id]);
          },
          (err) => {
            this.errorMsg = err.error.message || '';
            this.spinner.hide();
            console.log(err);
          }
        );
    }
  }

  getIssuingEntities() {
    this.userService.getIssuingEntities().subscribe((data) => {
      // console.log(data);
      this.issuingEntities = data.payload;
    });
  }

  getLocationDataFromCep() {
    this.errorCep = false;
    this.addressData.get('cep').valueChanges.subscribe((x) => {
      console.log(x);
      if (x.length >= 9) {
        this.userService.getLocationDataFromCep(x).subscribe(
          (data) => {
            console.log(data.payload);
            if (data.payload.error) {
              this.errorCepString = data.payload.error;
              this.errorCep = true;
            } else {
              this.ufObject = data.payload.uf._id;
              this.cityObject = data.payload.city._id;
              this.neighborhood = data.payload.neighborhood;
              this.street = data.payload.street;
              this.errorCep = false;
              console.log(data);
              this.addressData.get('uf').setValue(this.ufObject, { emitEvent: false });
              this.addressData.get('city').setValue(this.cityObject);

              this.addressData.get('uf').enable();
              this.addressData.get('city').enable();
              this.addressData.get('neighborhood').enable();
              this.addressData.get('street').enable();
              this.addressData.get('streetNumber').enable();
              this.addressData.get('complement').enable();
              this.addressData.get('neighborhood').setValue(this.neighborhood, { emitEvent: false });
              this.addressData.get('street').setValue(this.street, { emitEvent: false });

              this.addressData.get('uf').valueChanges.subscribe((x) => {
                this.getCitiesforId(this.ufObject);
              });
            }
          },
          (error) => {
            console.log(this.errorCep);
            console.log(this.errorCep, 'error');
            this.errorCep = true;
            console.log(error);
          }
        );
      }
    });

    /*
    this.userService.getLocationDataFromCep(cep).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )*/
  }

  getUfs() {
    this.userService.getStates().subscribe((data) => {
      // console.log(data);
      this.states = data.payload;
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
      this.countries = data.payload;
    });
  }

  getBreeds() {
    this.userService.getBreeds().subscribe((data) => {
      // console.log(data);
      this.breeds = data.payload;
    });
  }

  getPrevissions() {
    this.userService.getPrevissions().subscribe((data) => {
      this.previsionHealth = data.payload;
    });
  }

  getPrePatientData(prePatiendId: string) {
    this.patientService.getPrePatient(prePatiendId).subscribe(
      (patient) => {
        console.log(patient);
        this.personalData.get('name').setValue(patient.name);
        this.personalData.get('lastName').setValue(patient.lastName);
        this.personalData.get('secondLastName').setValue(patient.secondLastName);
        this.personalData.get('email').setValue(patient.email);
        this.personalData.get('gender').setValue(patient.gender);
        this.personalData.get('phoneNumber').setValue(patient.phoneNumber);
        const current = new Date();

        if (environment.checkAge === false) {
          this.mayorEdad = false;
          this.maxDate = {
            year: current.getFullYear(),
            month: current.getMonth(),
            day: current.getDate(),
          };
        } else {
          this.mayorEdad = true;
          this.maxDate = {
            year: current.getFullYear() - 18,
            month: current.getMonth() + 1,
            day: current.getDate(),
          };
        }
      },
      (error) => console.log(error)
    );
  }
}
