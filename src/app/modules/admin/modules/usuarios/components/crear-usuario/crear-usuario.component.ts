import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, Form } from '@angular/forms';
import { Location } from '@angular/common';

// EXTRAS
import { AdminService } from '../../../../services/admin.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import { SpecialtiesService } from 'src/app/services/specialties.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomDateAdapter } from 'src/app/shared/utils';

const current = new Date();

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss'],
})
export class CrearUsuarioComponent implements OnInit {
  isForeign: boolean = false;
  isSchool: boolean = false;
  identificationData: FormGroup;
  personalData: FormGroup;
  profileForm: FormGroup;
  waitingRoomForm: FormGroup;
  profileDataForm: FormGroup;
  specialitiesForm: FormGroup;
  professionalForm: FormGroup;
  passwordForm: FormGroup;

  states: any = [];
  cities: any = [];
  countries: any = [];
  breeds: any = [];
  educations: any = [];
  familiarSituations: any = [];
  issuingEntities: any = [];

  minDate = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
    day: current.getDate(),
  };

  maxDate = {
    year: current.getFullYear() - 18,
    month: current.getMonth(),
    day: current.getDate(),
  };

  dateAdapter = new CustomDateAdapter();
  birthDate: NgbDateStruct;
  inmigrationDate: NgbDateStruct;

  formUser: any = [];
  userObject: any = {};

  roles: any = [
    { name: 'Administrador', value: 'admin' },
    { name: 'Coordinador', value: 'coordinator' },
    { name: 'Profesional', value: 'professional' },
  ];
  profiles: any = [];
  profilesAssigned: any = [];

  waitingRooms: any = [
    { id: '1', name: 'Sala de Espera 1', description: 'desc 1' },
    { id: '2', name: 'Sala de Espera 2', description: 'desc 2' },
    { id: '3', name: 'Sala de Espera 3', description: 'desc 3' },
  ];
  waitingRoomsAssigned: any = [];

  specialities: any = [];
  specialitiesAssigned: any = [];

  professionalRegistry: any = [];

  // FOR CUSTOM FORM
  public userType = this.routerAct.snapshot.queryParamMap.get('userType');

  constructor(
    private location: Location,
    private routerAct: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private userService: UsersService,
    private specialtiesService: SpecialtiesService,
    private calendar: NgbCalendar,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.hide();
    this.getProfiles();
    this.getIssuingEntities();
    this.getUfs();
    this.getCities();
    this.getCountries();
    this.getBreeds();
    this.getEducations();
    this.getFamiliarSituations();
    this.getSpecialties();

    this.identificationData = this.formBuilder.group({
      document: [null, Validators.required],
      idDocumentNumber: ['', Validators.required],
      passport: ['', null],
      rgRegistry: ['', null],
      issuingBody: [null, null],
      extraDocument: [null, null],
      extraIdDocument: ['', null],
    });

    this.personalData = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', null],
      motherName: ['', Validators.required],
      secondLastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]],
      gender: ['male', Validators.required],
      birthdate: [null, null],
      ufBirth: [null, null],
      municipalityBirth: [null, null],
      nacionality: ['', Validators.required],
      originCountry: [null, null],
      inmigrationDate: [null, null],
      breed: [null, Validators.required],
      education: [null, null],
      familySituation: [null, null],
      cep: ['', Validators.required],
      uf: [null, Validators.required],
      city: [null, Validators.required],
      neighborhood: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: [null, [Validators.required, Validators.pattern(/^(?=.*[0-9])/)]],
    });

    this.profileForm = this.formBuilder.group({
      role: [this.roles[0].value, Validators.required],
      profile: [null, Validators.required],
    });

    this.waitingRoomForm = this.formBuilder.group({
      waitingRoom: [null, Validators.required],
    });

    this.profileDataForm = this.formBuilder.group({
      profileImg: [null],
      biography: ['', Validators.required],
    });

    this.specialitiesForm = this.formBuilder.group({
      speciality: [null, Validators.required],
    });

    this.professionalForm = this.formBuilder.group({
      professionalTitle: ['', Validators.required],
      university: ['', Validators.required],
      course: ['', Validators.required],
      ufRegistry: [null, Validators.required],
      professionalRegistryType: [null, Validators.required],
      professionalRegistry: ['', Validators.required],
      ufProfessionalRegistry: [null, Validators.required],
    });

    this.passwordForm = new FormGroup(
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
          Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])
        ),
      },
      {
        validators: this.confirmPass.bind(this),
      }
    );

    this.formUser.push(
      this.identificationData,
      this.personalData,
      this.profileForm,
      this.professionalForm,
      this.passwordForm
    );

    this.birthDate = this.maxDate;
    this.inmigrationDate = this.calendar.getToday();

    // REACTIVE FORM
    this.identificationData.get('document').valueChanges.subscribe((val) => {
      if (val === 'rgRegistry') this.identificationData.get('issuingBody').enable();
      else this.identificationData.get('issuingBody').disable();
      this.identificationData.get('idDocumentNumber').enable();
    });

    this.identificationData.get('extraDocument').valueChanges.subscribe((val) => {
      this.identificationData.get('extraIdDocument').enable();
    });
  }

  getProfiles() {
    this.adminService.getProfiles().subscribe(
      (data) => {
        const role = this.profileForm.value.role;
        this.profiles = data.filter((profile) => {
          if (profile.role !== 'patient' && role === profile.role) {
            return profile;
          }
        });
        // console.log(this.profiles);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addProfile(form) {
    if (this.profilesAssigned.some((profile) => profile.role === form.role)) {
      alert(`El rol ${form.role} ya esta asignado al usuario`);
    } else {
      this.profilesAssigned.push({
        id: form.profile.id,
        role: form.role,
        name: form.profile.profileName,
      });
    }
    this.isProfessional();
  }

  removeProfile(index) {
    // console.log(index);
    this.profilesAssigned.splice(index, 1);
    this.isProfessional();
  }

  addWaitingRoom() {
    const data = this.waitingRoomForm.value.waitingRoom;
    if (this.waitingRoomsAssigned.some((room) => room.name === data.name)) {
      alert(`La lista de espera ${data.name} ya esta asignada al usuario`);
    } else {
      this.waitingRoomsAssigned.push({
        id: data.id,
        name: data.name,
        description: data.description,
      });
    }
    // console.log(this.waitingRoomsAssigned);
  }

  addAllWaitingRooms() {
    this.waitingRoomsAssigned = [];
    this.waitingRooms.forEach((item) => {
      this.waitingRoomsAssigned.push(item);
    });
  }

  removeWaitingRoom(index) {
    // console.log(index);
    this.waitingRoomsAssigned.splice(index, 1);
  }

  addSpeciality() {
    const data = this.specialitiesForm.value.speciality;
    if (this.specialitiesAssigned.some((sp) => sp.specialtyName === data.specialtyName)) {
      alert(`La especialidad ${data.specialtyName} ya esta asignada al usuario`);
    } else {
      this.specialitiesAssigned.push({
        id: data._id,
        specialtyName: data.specialtyName,
      });
    }
  }

  removeSpeciality(index) {
    // console.log(index);
    this.specialitiesAssigned.splice(index, 1);
  }

  isProfessional() {
    if (this.profilesAssigned.some((profile) => profile.role === 'professional')) {
      return true;
    } else {
      return false;
    }
  }

  formUserValid() {
    // console.log(this.formUser[0], this.formUser[1], this.formUser[2], this.formUser[3]);

    switch (this.userType) {
      case 'admins':
      case 'coordinator':
        if (this.formUser[0].valid && this.formUser[1].valid) {
          return true;
        } else {
          return false;
        }

      case 'professional':
        if (this.formUser[0].valid && this.formUser[1].valid && this.formUser[3].valid) {
          return true;
        } else {
          return false;
        }
      case 'patient':
        if (this.formUser[0].valid && this.formUser[1].valid) {
          return true;
        } else {
          return false;
        }

      default:
        return false;
    }
  }

  confirmPass(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  createUser() {
    // console.log(this.profilesAssigned);]
    this.spinner.show();

    const _profiles = this.profilesAssigned.map((map) => {
      return map.id;
    });
    /* TODO
    const _waitingRooms = this.waitingRoomsAssigned.map((map) => {
      return map.id;
    });
    */
    const _specialities = this.specialitiesAssigned.map((map) => {
      return map.id;
    });

    this.userObject = {
      identificationData: {
        ...(this.formUser[0].value.document === 'cpf' && { cpf: this.formUser[0].value.idDocumentNumber || '' }),
        ...(this.formUser[0].value.document === 'cns' && { cns: this.formUser[0].value.idDocumentNumber || '' }),
        ...(this.formUser[0].value.document === 'rgRegistry' && {
          rgRegistry: this.formUser[0].value.idDocumentNumber || '',
        }),
        passport: this.formUser[0].value.passport,
        issuingBody: this.formUser[0].value.issuingBody || '',
        ...(this.formUser[0].value.extraDocument === 'cbo' && { cbo: this.formUser[0].value.extraIdDocument || '' }),
        ...(this.formUser[0].value.extraDocument === 'pasep' && {
          pasep: this.formUser[0].value.extraIdDocument || '',
        }),
        ...(this.formUser[0].value.extraDocument === 'ctps' && {
          ctps: this.formUser[0].value.extraIdDocument || '',
        }),
        ...(this.formUser[0].value.extraDocument === 'idDocumentNumber' && {
          idDocumentNumber: this.formUser[0].value.extraIdDocument || '',
        }),
        ...(this.formUser[0].value.extraDocument === 'titleVote' && {
          titleVote: this.formUser[0].value.extraIdDocument || '',
        }),
        ...(this.formUser[0].value.extraDocument === 'professionalUfNumber' && {
          professionalUfNumber: this.formUser[0].value.extraIdDocument || '',
        }),
        isForeign: this.isForeign,
      },
      personalData: {
        isSchool: this.isSchool,
        name: this.formUser[1].value.name,
        lastName: this.formUser[1].value.lastName,
        motherName: this.formUser[1].value.motherName,
        secondLastName: this.formUser[1].value.secondLastName,
        email: this.formUser[1].value.email,
        phoneNumber: parseInt(this.formUser[1].value.phoneNumber),
        birthdate: this.dateAdapter.toModel(this.formUser[1].value.birthdate),
        ufBirth: this.formUser[1].value.ufBirth || '',
        municipalityBirth: this.formUser[1].value.municipalityBirth || '',
        gender: this.formUser[1].value.gender,
        nacionality: this.formUser[1].value.nacionality,
        originCountry: this.formUser[1].value.originCountry || '',
        inmigrationDate: this.dateAdapter.toModel(this.formUser[1].value.inmigrationDate),
        breed: this.formUser[1].value.breed,
        education: this.formUser[1].value.education || '',
        familySituation: this.formUser[1].value.familySituation || '',
      },
      addressData: {
        cep: this.formUser[1].value.cep,
        uf: this.formUser[1].value.uf,
        city: this.formUser[1].value.city,
        neighborhood: this.formUser[1].value.neighborhood,
        street: this.formUser[1].value.street,
        streetNumber: parseInt(this.formUser[1].value.streetNumber),
      },
      profiles: _profiles,
      waitingRooms: this.waitingRoomsAssigned,
      specialities: _specialities,
      professionalData: {
        professionalPhoto: '',
        biography: this.formUser[2].value.biography,
        professionalTitle: this.formUser[3].value.professionalTitle,
        university: this.formUser[3].value.university,
        course: this.formUser[3].value.course,
        ufRegistry: this.formUser[3].value.ufRegistry,
        professionalRegistry: this.professionalRegistry,
      },
      password: this.formUser[4].value.password,
      confirmPassword: this.formUser[4].value.confirmPassword,
    };

    console.log(this.userObject);

    if (this.userType !== 'patient') {
      if (this.profilesAssigned.length && this.waitingRoomsAssigned.length) {
        this.adminService.createUser(this.userType, this.userObject).subscribe(
          (res) => {
            this.spinner.hide();
            console.log(res);
          },
          (err) => {
            this.spinner.hide();
            console.log(err);
          },
          () => {
            this.location.back();
          }
        );
      } else {
        this.spinner.hide();
        alert('Complete el formulario con todos los datos necesarios');
      }
    } else {
      this.adminService.createUser(this.userType, this.userObject).subscribe(() => {
        // console.log(response);
        this.spinner.hide();
        this.location.back();
      });
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

  getSpecialties() {
    this.specialtiesService.getSpecialties().subscribe((data) => {
      // console.log(data);
      this.specialities = data;
    });
  }

  validProfessionalRegistry() {
    if (
      this.professionalForm.value.professionalRegistryType !== null &&
      this.professionalForm.value.professionalRegistry !== null &&
      this.professionalForm.value.professionalRegistry.trim() !== '' &&
      this.professionalForm.value.ufProfessionalRegistry !== null
    ) {
      return false;
    } else {
      return true;
    }
  }

  addProfessionalRegistry() {
    if (this.professionalRegistry.some((pro) => pro.type === this.professionalForm.value.professionalRegistryType)) {
      alert(`El registro ${this.professionalForm.value.professionalRegistryType} ya esta asignado al profesional`);
    } else {
      this.professionalRegistry.push({
        type: this.professionalForm.value.professionalRegistryType,
        registry: this.professionalForm.value.professionalRegistry,
        uf: this.professionalForm.value.ufProfessionalRegistry.name,
      });
    }
  }

  removeRegistry(index) {
    this.professionalRegistry.splice(index, 1);
  }
}

/*
    this.identificationData = this.formBuilder.group({
      document: [null, Validators.required],
      idDocumentNumber: ['123', Validators.required],
      passport: ['front_test', [Validators.required]],
      rgRegistry: ['front_test', Validators.required],
      issuingBody: [null, null],
      extraDocument: [null, null],
      extraIdDocument: ['123', null],
    });

    this.personalData = this.formBuilder.group({
      name: ['front_test', Validators.required],
      lastName: ['front_test', Validators.required],
      motherName: ['front_test', Validators.required],
      secondLastName: ['front_test', null],
      email: ['front_test@mail.com', [Validators.email, Validators.required]],
      phoneNumber: [123, Validators.required],
      gender: ['male', Validators.required],
      birthdate: [null, Validators.required],
      ufBirth: [null, null],
      municipalityBirth: [null, null],
      nacionality: ['test', Validators.required],
      originCountry: [null, null],
      inmigrationDate: ['', Validators.required],
      breed: [null, Validators.required],
      education: [null, null],
      familySituation: [null, null],
      cep: ['front_test', Validators.required],
      uf: [null, Validators.required],
      city: [null, Validators.required],
      neighborhood: ['front_test', Validators.required],
      street: ['front_test', Validators.required],
      streetNumber: [123, Validators.required],
    });

    this.profileForm = this.formBuilder.group({
      role: [this.roles[0].value, Validators.required],
      profile: [null, Validators.required],
    });

    this.waitingRoomForm = this.formBuilder.group({
      waitingRoom: [null, Validators.required],
    });

    this.profileDataForm = this.formBuilder.group({
      profileImg: [null],
      biography: ['front_test', Validators.required],
    });

    this.specialitiesForm = this.formBuilder.group({
      speciality: [null, Validators.required],
    });

    this.professionalForm = this.formBuilder.group({
      professionalTitle: ['front_test', Validators.required],
      university: ['front_test', Validators.required],
      course: ['front_test', Validators.required],
      ufRegistry: [null, Validators.required],
      professionalRegistryType: [null, Validators.required],
      professionalRegistry: ['123', Validators.required],
      ufProfessionalRegistry: [null, Validators.required],
    });

    this.passwordForm = new FormGroup(
      {
        password: new FormControl('Ab.123456', [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}$/),
        ]),
        confirmPassword: new FormControl(
          'Ab.123456',
          Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])
        ),
      },
      {
        validators: this.confirmPass.bind(this),
      }
    );
    */
