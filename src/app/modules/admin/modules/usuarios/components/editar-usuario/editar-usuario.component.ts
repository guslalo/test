import { Location } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { SpecialtiesService } from 'src/app/services/specialties.service';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { UsersService } from 'src/app/services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {
  clinicId: string;
  userType = this.routerAct.snapshot.queryParamMap.get('userType');
  userId = this.routerAct.snapshot.queryParamMap.get('userId');

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

  birthDate: NgbDateStruct;
  inmigrationDate: NgbDateStruct;
  formUser: any = [];
  userObject: any = {};

  roles: any = [
    { name: 'Administrador', value: 'admin' },
    { name: 'Coordinador', value: 'coordinator' },
    { name: 'Profesional', value: 'professional' },
  ];
  profile: any = {};
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
    this.getUser(this.userType, this.userId);
    this.clinicId = localStorage.getItem('clinic');

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
      lastName: ['', Validators.required],
      motherName: ['', Validators.required],
      socialName: ['', null],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: [null, Validators.required],
      gender: ['male', Validators.required],
      birthdate: [null, Validators.required],
      ufBirth: [null, null],
      municipalityBirth: [null, null],
      nacionality: ['', Validators.required],
      originCountry: [null, null],
      inmigrationDate: ['', null],
      breed: [null, Validators.required],
      education: [null, null],
      familySituation: [null, null],
      cep: ['', Validators.required],
      uf: [null, Validators.required],
      city: [null, Validators.required],
      neighborhood: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: [0, Validators.required],
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
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}$/),
        ]),
        confirmPassword: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])
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

    this.birthDate = this.calendar.getToday();
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

    this.birthDate = this.calendar.getToday();

    this.getSpecialties();
  }

  async getUser(userType, userId) {
    this.adminService.getUserById(userType, userId).subscribe(
      (user) => {
        // console.log(user);

        // MAIN IDENTIFICATION
        if (user.identificationData.cpf) this.identificationData.get('document').setValue('cpf');
        if (user.identificationData.cns) this.identificationData.get('document').setValue('cns');
        if (user.identificationData.rgRegistry) this.identificationData.get('document').setValue('rgRegistry');
        // SECONDARY IDENTIFICATION
        if (user.identificationData.cbo) this.identificationData.get('extraDocument').setValue('cpf');
        if (user.identificationData.pasep) this.identificationData.get('extraDocument').setValue('pasep');
        if (user.identificationData.ctps) this.identificationData.get('extraDocument').setValue('ctps');
        if (user.identificationData.idDocumentNumber)
          this.identificationData.get('extraDocument').setValue('idDocumentNumber');
        if (user.identificationData.professionalUfNumber)
          this.identificationData.get('extraDocument').setValue('professionalUfNumber');

        // USER DATA
        this.identificationData
          .get('idDocumentNumber')
          .setValue(user.identificationData.cpf || user.identificationData.cns || user.identificationData.rgRegistry);

        if (user.identificationData.rgRegistry)
          this.identificationData.get('issuingBody').setValue(user.identificationData.issuingBody);

        this.isForeign = user.identificationData.isForeign;
        if (user.identificationData.isForeign)
          this.identificationData.get('passport').setValue(user.identificationData.passport);

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

        this.isSchool = user.personalData.isSchool;
        this.personalData.get('name').setValue(user.personalData.name);
        this.personalData.get('lastName').setValue(user.personalData.lastName);
        this.personalData.get('socialName').setValue(user.personalData.socialName);
        this.personalData.get('email').setValue(user.personalData.email);
        this.personalData.get('phoneNumber').setValue(user.personalData.phoneNumber);
        this.personalData.get('gender').setValue(user.personalData.gender);
        this.personalData.get('birthdate').setValue(user.personalData.birthdate);
        this.personalData.get('ufBirth').setValue(user.personalData.ufBirth);
        this.personalData.get('municipalityBirth').setValue(user.personalData.municipalityBirth);
        this.personalData.get('nacionality').setValue(user.personalData.nacionality);
        this.personalData.get('originCountry').setValue(user.personalData.originCountry);
        this.personalData.get('inmigrationDate').setValue(user.personalData.inmigrationDate || '');
        this.personalData.get('breed').setValue(user.personalData.breed);
        this.personalData.get('education').setValue(user.personalData.education);
        this.personalData.get('familySituation').setValue(user.personalData.familySituation);
        this.personalData.get('motherName').setValue(user.personalData.motherName);
        // this.personalData.get('isSchool').setValue(user.personalData.isSchool);
        this.personalData.get('cep').setValue(user.addressData.cep);
        this.personalData.get('uf').setValue(user.addressData.uf);
        this.personalData.get('city').setValue(user.addressData.city);
        this.personalData.get('neighborhood').setValue(user.addressData.neighborhood);
        this.personalData.get('street').setValue(user.addressData.street);
        this.personalData.get('streetNumber').setValue(user.addressData.streetNumber);

        this.waitingRoomsAssigned = user.waitingRooms || [];
        this.specialitiesAssigned = user.specialities || [];

        for (const specialty of this.specialitiesAssigned) {
          // this.getSpecialtyById(specialty);
        }

        // PROFILES CRUD
        for (const item of user.administrativeData) {
          this.adminService.getProfileById(item.profile).subscribe((p) => {
            this.profilesAssigned.push({
              clinic: item.clinic,
              id: p._id,
              role: p.role,
              name: p.profileName,
            });
          });
        }
        // console.log(this.profilesAssigned);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProfiles() {
    this.adminService.getProfiles().subscribe(
      (data) => {
        const role = this.profileForm.value.role;
        this.profiles = data.filter((profile) => {
          if (profile.role !== 'patient' && role === profile.role) return profile;
        });
        // console.log(this.profiles);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addProfile(form) {
    // console.log(form);
    if (this.profilesAssigned.some((profile) => profile.role === form.role)) {
      alert(`El rol ${form.role} ya esta asignado al usuario`);
    } else {
      this.profilesAssigned.push({
        id: form.profile.id,
        clinic: this.clinicId,
        role: form.role,
        name: form.profile.profileName,
      });
    }
    // console.log(this.profilesAssigned);
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
    console.log(data);

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
    if (this.userType !== 'professional') {
      if (this.formUser[0].valid) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.formUser[0].valid && this.formUser[1].valid && this.formUser[2].valid) {
        return true;
      } else {
        return false;
      }
    }
  }

  confirmPass(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  updateUser() {
    //console.log(this.waitingRoomsAssigned);
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

    // console.log(_waitingRooms);

    this.userObject = {
      id: this.userId,
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
        socialName: this.formUser[1].value.socialName,
        email: this.formUser[1].value.email,
        phoneNumber: parseInt(this.formUser[1].value.phoneNumber),
        birthdate: this.formUser[1].value.birthdate.toString(),
        ufBirth: this.formUser[1].value.ufBirth || '',
        municipalityBirth: this.formUser[1].value.municipalityBirth || '',
        gender: this.formUser[1].value.gender,
        nacionality: this.formUser[1].value.nacionality,
        originCountry: this.formUser[1].value.originCountry || '',
        inmigrationDate: this.formUser[1].value.inmigrationDate.toString() || '',
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
      profileData: {
        profileImg: '',
        biography: this.formUser[2].value.biography,
      },
      specialities: _specialities,
      professionalData: {
        professionalTitle: this.formUser[3].value.professionalTitle,
        university: this.formUser[3].value.university,
        course: this.formUser[3].value.course,
        ufRegistry: this.formUser[3].value.ufRegistry,
        professionalRegistry: this.professionalRegistry,
      },
      password: this.formUser[4].value.password,
      confirmPassword: this.formUser[4].value.confirmPassword,
    };

    // console.log(this.formUser[0].value.birthdate);
    console.log(this.userObject);

    if (this.userType !== 'patient') {
      if (this.profilesAssigned.length && this.waitingRoomsAssigned.length) {
        this.adminService.updateUser(this.userType, this.userObject).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
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
      this.adminService.updateUser(this.userType, this.userObject).subscribe(() => {
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

  addProfessionalRegistry() {
    if (this.professionalRegistry.some((pro) => pro.type === this.professionalForm.value.professionalRegistryType)) {
      alert(`El registro ${this.professionalForm.value.professionalRegistryType} ya esta asignado al profesional`);
    } else {
      this.professionalRegistry.push({
        type: this.professionalForm.value.professionalRegistryType,
        registry: this.professionalForm.value.professionalRegistry,
        uf: this.professionalForm.value.ufProfessionalRegistry._id,
      });
    }
  }

  removeRegistry(index) {
    this.professionalRegistry.splice(index, 1);
  }
}
