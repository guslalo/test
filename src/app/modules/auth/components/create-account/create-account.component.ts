import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { ClinicService } from '../../../../services/clinic.service';
import { environment } from './../../../../../environments/environment';

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
import { error } from 'protractor';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['../login/login.component.scss']
})

export class CreateAccountComponent implements OnInit {
 
  public userRegister: registerUser;
  public placement = 'bottom';
  public cpfvalid: boolean = true;
  public setup:any;
  model: NgbDateStruct;
  date: { year: number; month: number };
  states: any = [];
  cities: any = [];
  citiesFilter: any = [];
  countries: any = [];
  breeds: any = [];
  educations: any = [];
  familiarSituations: any = [];
  issuingEntities: any = [];
  public password: any;
  public user: any = {};
  public errorMsg: string;
  public errorCepString:string;
  dateAdapter = new CustomDateAdapter();
  isLinear = false;
  isForeign: boolean = false;
  identificationData: FormGroup;
  personalData: FormGroup;
  birthData: FormGroup;
  addressData: FormGroup;
  passwordData: FormGroup;
  form = [];
  minDate = undefined;
  maxDate = undefined;
  showPassword: boolean;
  termsAccepted: boolean = false;
  privacyAccepted: boolean = false;
  consentAccepted: boolean = false;
  public clinic:string;
  public useTerm:any;
  public privacyTerms:any;
  public telemedicineConsent:any;
  documentTypeDefault:any;
  public errorCep:boolean = false;
  public ufObject:any;
  public cityObject:any;
  public neighborhood:any;
  public street:any;
  public mayorEdad:boolean;
  public brand: any;

  constructor(
    private router: Router,
    private registerUser: RegisterService,
    private _formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    private config: NgbDatepickerConfig,
    private userService: UsersService,
    private spinner: NgxSpinnerService,
    private clinicService:ClinicService
  ) { }

  onClick(index: number): void {
    // this.selectedIndex = index;
  }

  ngOnInit(): void {
    this.brand = environment.brand
    this.setup = environment.setup
    this.errorCep = false;
    this.clinic = '5f236fc966fbb0054894b780';
    this.politicas();
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };

    if(environment.checkAge === false){
      this.mayorEdad = false
        this.personalData = this._formBuilder.group(
          {
            checkAge: [null, ],
            name: ['', [Validators.required, ]],//Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/)
            lastName: ['', ], //Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/)
            motherName: ['', [Validators.required, ]],//Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/)
            secondLastName: ['', [Validators.required, ]],//Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/)
            email: [null, [Validators.email, Validators.required]],
            gender: [null, [Validators.required]],
            confirmEmail: ['', [Validators.required]],
            phoneNumber: [null, [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]],
            breed: [null, Validators.required],
          },
          {
            validators: this.confirmEmail.bind(this),
          }
        );
        this.maxDate = {
          year: current.getFullYear(),
          month: current.getMonth() + 1,
          day: current.getDate(),
        };
    } else {
      this.mayorEdad = true
      this.personalData = this._formBuilder.group(
        {
          checkAge: [null, [Validators.requiredTrue]], //
          name: ['', [Validators.required, ]],//Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/)
          lastName: ['', ], //Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/)
          motherName: ['', [Validators.required, ]],//Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/)
          secondLastName: ['', [Validators.required, ]],//Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/)
          email: [null, [Validators.email, Validators.required]],
          gender: [null, [Validators.required]],
          confirmEmail: ['', [Validators.required]],
          phoneNumber: [null, [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]],
          breed: [null, Validators.required],
        },
        {
          validators: this.confirmEmail.bind(this),
        }
      );
      this.maxDate = {
        year: current.getFullYear() - 18,
        month: current.getMonth() + 1,
        day: current.getDate(),
      };
    }
   
    this.identificationData = this._formBuilder.group({
      document:  new FormControl('cpf'),
      idDocumentNumber: [null, Validators.required],
      passport: ['', null],
      rgRegistry: ['', null],
      issuingBody: ['', null],
      extraDocument: ['', null],
      extraIdDocument: ['', null],
    });

    this.birthData = this._formBuilder.group({
      birthdate: [null, Validators.required],
      ufBirth: [null, null],
      municipalityBirth: [null, null],
      nacionality: [null, Validators.required],
    });
    this.addressData = this._formBuilder.group({
      cep: ['', Validators.required],
      uf: [null, Validators.required],
      city: [null, Validators.required],
      neighborhood: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: [null, [Validators.required, Validators.pattern(/^(?=.*[0-9])/)]],
      complement: ['', null],
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
    this.getLocationDataFromCep();

    this.addressData.get('uf').disable();
    this.addressData.get('city').disable();
    this.addressData.get('neighborhood').disable();
    this.addressData.get('street').disable();
    this.addressData.get('streetNumber').disable();
    this.addressData.get('complement').disable();

    this.form.push(
      this.identificationData.controls,
      this.personalData.controls,
      this.birthData.controls,
      this.addressData.controls,
      this.passwordData.controls
    );
  }

  politicas(){
    this.useTerm = ['/terms-and-conditions'];
    this.privacyTerms = ['/privacy'];
    this.telemedicineConsent = ['/consent'];
  }

  getLocationDataFromCep(){
    this.errorCep = false;
    this.addressData.get('cep').valueChanges.subscribe( x =>  {
      console.log(x);
      if(x.length >= 9) {
        this.userService.getLocationDataFromCep(x).subscribe(
          data => {
            console.log(data.payload);
            if(data.payload.error){
              this.errorCepString = data.payload.error
              this.errorCep = true; 
            } else {
              this.ufObject = data.payload.uf._id
              this.cityObject = data.payload.city._id
              this.neighborhood = data.payload.neighborhood
              this.street = data.payload.street
              this.errorCep = false;
              console.log(data)
              this.addressData.get('uf').setValue(this.ufObject, {emitEvent: false});
              this.addressData.get('city').setValue(this.cityObject);
              
              this.addressData.get('uf').enable();
              this.addressData.get('city').enable();
              this.addressData.get('neighborhood').enable();
              this.addressData.get('street').enable();
              this.addressData.get('streetNumber').enable();
              this.addressData.get('complement').enable();
              this.addressData.get('neighborhood').setValue(this.neighborhood, { emitEvent: false});
              this.addressData.get('street').setValue(this.street, {emitEvent: false});
  
              this.addressData.get('uf').valueChanges.subscribe( x =>  {
                this.getCitiesforId(this.ufObject);
              });
            }         
          },
          error => {
            console.log(this.errorCep)
            console.log(this.errorCep, 'error')
              this.errorCep = true;
            console.log(error)
          }
        )
      }
     }
    );
  }

  validateForm() {
    this.identificationData.clearValidators();
    if (this.isForeign) {
      this.identificationData.get('passport').setValidators([Validators.required]);
      this.identificationData.get('idDocumentNumber').setValidators(null);
      this.identificationData.get('passport').enable();
      this.identificationData.get('document').disable();
      this.identificationData.get('extraDocument').disable();
      this.identificationData.get('idDocumentNumber').disable();
      this.identificationData.get('extraIdDocument').disable();
      this.identificationData.get('idDocumentNumber').reset();
      this.identificationData.get('extraIdDocument').reset();
      this.identificationData.get('document').reset();
      this.identificationData.get('extraDocument').reset();
      this.identificationData.get('issuingBody').reset();
    } else {
      this.identificationData.get('document').setValidators([Validators.required]);
      this.identificationData.get('idDocumentNumber').setValidators([Validators.required]);
      this.identificationData.get('passport').setValidators(null);
      this.identificationData.get('document').enable();
      this.identificationData.get('extraDocument').enable();
      this.identificationData.get('idDocumentNumber').enable();
      this.identificationData.get('extraIdDocument').enable();
    }
    if (this.identificationData.get('document').value === 'rgRegistry') {
      this.identificationData.get('idDocumentNumber').enable();
      this.identificationData.get('issuingBody').setValidators([Validators.required]);
      this.identificationData.get('issuingBody').enable();
    } else {
      this.identificationData.get('passport').reset();
      this.identificationData.get('issuingBody').disable();
    }
    this.identificationData.updateValueAndValidity();
  }

  validCPF(cpf: string){
    this.cpfvalid = this.validateCPF(cpf);
    console.log(this.cpfvalid)
  }

  validateCPF(cpf: string){
    console.log(this.identificationData.get('document').value)
    if(this.identificationData.get('document').value != 'cpf' && this.identificationData.get('document').value != null) return true
    if(cpf.length <= 0) return false
    cpf = cpf.replace(/[^0-9]/, "").replace(/[^0-9]/, "").replace(/[^0-9]/, "")
    cpf.padStart(11,'0')
    if (cpf.length != 11) return false
    else if(cpf == '00000000000' || 
            cpf == '11111111111' || 
            cpf == '22222222222' || 
            cpf == '33333333333' || 
            cpf == '44444444444' || 
            cpf == '55555555555' || 
            cpf == '66666666666' || 
            cpf == '77777777777' || 
            cpf == '88888888888' || 
            cpf == '99999999999') return false
    else {
      for (let i = 9; i < 11; i++) {
        let j = 0, d = 0
        for (let h = 0; j < i; j++) {
          d += parseInt(cpf[j]) * ((i + 1) - j);  
        }
        d = ((10 * d) % 11) % 10;
        if(parseInt(cpf[j]) != d) return false
      }
      return true
    }
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  mostrarForm(form) {
    console.log(form.controls);
  }

  confirmEmail(formGroup: FormGroup) {
    const { value: email } = formGroup.get('email');
    const { value: confirmEmail } = formGroup.get('confirmEmail');
    return email === confirmEmail ? null : { emailsNotMatch: true };
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
        ...(this.form[0].document.value === 'cpf' && { cpf: this.form[0].idDocumentNumber.value || '' }),
        ...(this.form[0].document.value === 'cns' && { cns: this.form[0].idDocumentNumber.value || '' }),
        ...(this.form[0].document.value === 'rgRegistry' && {
          rgRegistry: this.form[0].idDocumentNumber.value || '',
        }),
        passport: this.form[0].passport.value || '',
        issuingBody: this.form[0].issuingBody.value || '',
        ...(this.form[0].extraDocument.value === 'cbo' && { cbo: this.form[0].extraIdDocument.value || '' }),
        ...(this.form[0].extraDocument.value === 'pasep' && {
          pasep: this.form[0].extraIdDocument.value || '',
        }),
        ...(this.form[0].extraDocument.value === 'ctps' && {
          ctps: this.form[0].extraIdDocument.value || '',
        }),
        ...(this.form[0].extraDocument.value === 'idDocumentNumber' && {
          idDocumentNumber: this.form[0].extraIdDocument.value || '',
        }),
        ...(this.form[0].extraDocument.value === 'titleVote' && {
          titleVote: this.form[0].extraIdDocument.value || '',
        }),
        ...(this.form[0].extraDocument.value === 'professionalUfNumber' && {
          professionalUfNumber: this.form[0].extraIdDocument.value || '',
        }),
        isForeign: this.isForeign,
      },
      personalData: {
        name: this.form[1].name.value,
        lastName: this.form[1].lastName.value || '',
        secondLastName: this.form[1].secondLastName.value,
        motherName: this.form[1].motherName.value,
        gender: this.form[1].gender.value,
        phoneNumber: this.form[1].phoneNumber.value,
        email: this.form[1].email.value,
        breed: this.form[1].breed.value,
        birthdate: this.dateAdapter.toModel(this.form[2].birthdate.value),
        ufBirth: this.form[2].ufBirth.value || '',
        municipalityBirth: this.form[2].municipalityBirth.value || '',
        nacionality: this.form[2].nacionality.value,
      },
      addressData: {
        cep: this.form[3].cep.value,
        uf: this.form[3].uf.value,
        city: this.form[3].city.value,
        neighborhood: this.form[3].neighborhood.value,
        street: this.form[3].street.value,
        streetNumber: parseInt(this.form[3].streetNumber.value),
        complement: this.form[3].complement.value,
      },
      password: this.form[4].password.value,
    };

    if (formObject) {
      this.registerUser
        .registerUser(
          formObject.clinicId,
          formObject.identificationData,
          formObject.personalData,
          formObject.addressData,
          formObject.password
        )
        .subscribe(
          (data) => {
            this.spinner.hide();
            this.router.navigate(['confirm-account/' + data.id, { email: formObject.personalData.email }]);
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
      this.issuingEntities = data.payload;
    });
  }

  getUfs() {
    this.userService.getStates().subscribe((data) => {
      this.states = data.payload;
    });
  }

  ufSelect(id){
    let idSelected = id.value.split(":");
    console.log(idSelected[1]);
    this.getCitiesforId(idSelected[1].trim());
  }
  getCitiesforId(stateId) {
    this.userService.getCitiesForUf(stateId).subscribe((data) => {
      console.log(data);
      this.citiesFilter = data.payload;
    },
    error => {
      console.log(error)
    }
    );
  }

  getCities() {
    this.userService.getCities().subscribe((data) => {
      this.cities = data.payload;
    });
  }

  getCountries() {
    this.userService.getCountries().subscribe((data) => {
      this.countries = data.payload;
    });
  }

  getBreeds() {
    this.userService.getBreeds().subscribe((data) => {
      this.breeds = data.payload;
    });
  }

  submit() {
    console.log(this.form);
  }

}
