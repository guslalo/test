import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterService } from '../../services/register.service';
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

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  constructor(
    private router: Router,
    private registerUser: RegisterService,
    private _formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    private config: NgbDatepickerConfig,
    private userService: UsersService,
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
  // public form:any;
  onClick(index: number): void {
    // this.selectedIndex = index;
  }

  ngOnInit(): void {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };

    this.maxDate = {
      year: current.getFullYear() - 18,
      month: current.getMonth(),
      day: current.getDate(),
    };

    this.identificationData = this._formBuilder.group({
      document: [null, Validators.required],
      idDocumentNumber: ['', Validators.required],
      passport: ['', null],
      rgRegistry: ['', null],
      issuingBody: [null, null],
      extraDocument: [null, null],
      extraIdDocument: ['', null],
    });
    this.personalData = this._formBuilder.group({
      checkAge: [null, [Validators.requiredTrue]],
      name: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, null],
      secondLastName: [null, [Validators.required, Validators.minLength(2)]],
      motherName: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.email, Validators.required, Validators.minLength(2)]],
      gender: [null, [Validators.required, Validators.minLength(2)]],
      confirmEmail: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
      breed: [null, Validators.required],
    });
    this.birthData = this._formBuilder.group({
      birthdate: ['', Validators.required],
      ufBirth: [null, Validators.required],
      municipalityBirth: [null, null],
      nacionality: ['', Validators.required],
    });
    this.addressData = this._formBuilder.group({
      cep: ['', Validators.required],
      uf: [null, Validators.required],
      city: [null, Validators.required],
      neighborhood: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
    });
    this.passwordData = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])/),
          Validators.pattern(/^(?=.*[a-z])/),
          Validators.pattern(/^(?=.*[0-9])/),
          Validators.pattern(/^(?=.*[$@$!%*?&])/),
          Validators.pattern(/^.{8,16}$/),
        ]),
        confirmPassword: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])
        ),
      },
      {
        validators: this.confirmPass.bind(this),
      }
    );

    // REACTIVE FORM
    this.identificationData.get('document').valueChanges.subscribe((val) => {
      if (val === 'rgRegistry') this.identificationData.get('issuingBody').enable();
      else this.identificationData.get('issuingBody').disable();
      this.identificationData.get('idDocumentNumber').enable();
    });

    this.identificationData.get('extraDocument').valueChanges.subscribe((val) => {
      this.identificationData.get('extraIdDocument').enable();
    });

    this.getIssuingEntities();
    this.getUfs();
    this.getCities();
    this.getCountries();
    this.getBreeds();

    this.form.push(
      this.identificationData.controls,
      this.personalData.controls,
      this.birthData.controls,
      this.addressData.controls,
      this.passwordData.controls
    );
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  mostrarForm(form) {
    console.log(form.controls);
  }

  confirmEmail(formGroup: FormGroup) {
    const { value: email } = formGroup.get('password');
    const { value: confirmEmail } = formGroup.get('confirmPassword');
    return email === confirmEmail ? null : { passwordNotMatch: true };
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
        passport: this.form[0].passport.value,
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
        phoneNumber: parseInt(this.form[1].phoneNumber.value),
        email: this.form[1].email.value,
        breed: this.form[1].breed.value,
        birthdate: this.form[2].birthdate.value.toString(),
        ufBirth: this.form[2].ufBirth.value,
        municipalityBirth: this.form[2].municipalityBirth.value,
        nacionality: this.form[2].nacionality.value,
      },
      addressData: {
        cep: this.form[3].cep.value,
        uf: this.form[3].uf.value,
        city: this.form[3].city.value,
        neighborhood: this.form[3].neighborhood.value,
        street: this.form[3].street.value,
        streetNumber: parseInt(this.form[3].streetNumber.value),
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
          formObject.password
        )
        .subscribe(
          (data) => {
            console.log(data);
            this.spinner.hide();
            this.router.navigate(['confirm-account/' + data.id]);
          },
          (error) => {
            this.spinner.hide();
            console.log(error);
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

  submit() {
    console.log(this.form);
  }
}
