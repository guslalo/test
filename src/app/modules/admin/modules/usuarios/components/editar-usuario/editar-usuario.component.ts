import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { SpecialtiesService } from 'src/app/services/specialties.service';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { UsersService } from 'src/app/services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomDateAdapter } from 'src/app/shared/utils';
import { RoomsService } from 'src/app/services/rooms.service';

const current = new Date();

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
  profilesForm: FormGroup;
  waitingRoomForm: FormGroup;
  profileDataForm: FormGroup;
  specialitiesForm: FormGroup;
  professionalForm: FormGroup;
  passwordForm: FormGroup;
  showPassword: boolean;
  professionalPhoto: any;

  profileSelected: any;
  roomSelected: any;

  states: any = [];
  cities: any = [];
  countries: any = [];
  breeds: any = [];
  educations: any = [];
  familiarSituations: any = [];
  issuingEntities: any = [];

  specialitiesData: any;

  currentDate = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
    day: current.getDate(),
  };

  maxDate = {
    year: current.getFullYear() - 18,
    month: current.getMonth() + 1,
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
  profile: any = {};
  profiles: any = [];
  profilesAssigned: any = [];
  waitingRooms: any = [];
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
    private roomsService: RoomsService,
    private calendar: NgbCalendar,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.getUser(this.userType, this.userId);

    this.clinicId = localStorage.getItem('clinic');

    this.getProfiles();
    this.getRooms();
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
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZµùàçéèçÇ\s]*$/)]],
      lastName: ['', Validators.pattern(/^[a-zA-Z0-9µùàçéèçÇ\s]*$/)],
      motherName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9µùàçéèçÇ\s]*$/)]],
      secondLastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9µùàçéèçÇ\s]*$/)]],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]],
      gender: ['male', Validators.required],
      birthdate: [null, null],
      ufBirth: [null, null],
      municipalityBirth: [null, null],
      nacionality: [null, Validators.required],
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

    this.profilesForm = this.formBuilder.group({
      role: [this.roles[0].value, Validators.required],
      profile: [null, Validators.required],
    });

    this.waitingRoomForm = this.formBuilder.group({
      waitingRoom: [null, Validators.required],
    });

    this.profileDataForm = this.formBuilder.group({
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
      professionalRegistryType: [null, null],
      professionalRegistry: [null, null],
      ufProfessionalRegistry: [null, null],
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
          Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])
        ),
      },
      {
        validators: this.confirmPass.bind(this),
      }
    );

    this.formUser.push(
      this.identificationData,
      this.personalData,
      this.profilesForm,
      this.profileDataForm,
      this.professionalForm,
      this.passwordForm
    );

    this.inmigrationDate = this.calendar.getToday();

    setTimeout(() => {
      this.validateForm();
      this.spinner.hide();
    }, 1000);
  }

  validateForm() {
    this.identificationData.clearValidators();

    if (this.identificationData.get('document').value === 'rgRegistry') {
      this.identificationData.get('idDocumentNumber').enable();
      this.identificationData.get('issuingBody').enable();
    } else {
      this.identificationData.get('issuingBody').disable();
    }

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
    } else {
      this.identificationData.get('document').setValidators([Validators.required]);
      this.identificationData.get('idDocumentNumber').setValidators([Validators.required]);
      this.identificationData.get('passport').setValidators(null);
      this.identificationData.get('document').enable();
      this.identificationData.get('extraDocument').enable();
      this.identificationData.get('idDocumentNumber').enable();
      this.identificationData.get('extraIdDocument').enable();
      this.identificationData.get('passport').reset();
    }

    this.identificationData.updateValueAndValidity();
  }

  async getUser(userType, userId) {
    this.adminService.getUserById(userType, userId).subscribe(
      (user) => {
        console.log(user);

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

        // USER DATA
        this.identificationData
          .get('idDocumentNumber')
          .setValue(user.identificationData.cpf || user.identificationData.cns || user.identificationData.rgRegistry);

        if (user.identificationData.rgRegistry)
          this.identificationData.get('issuingBody').setValue(user.identificationData.issuingBody || null);

        this.isForeign = user.identificationData.isForeign;
        if (user.identificationData.isForeign) {
          this.identificationData.get('passport').setValue(user.identificationData.passport);
          this.personalData.get('originCountry').setValue(user.personalData.originCountry);
          this.inmigrationDate =
            this.dateAdapter.fromModel(user.personalData.inmigrationDate) || this.calendar.getToday();
          this.personalData.get('inmigrationDate').setValue(this.inmigrationDate);
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

        this.isSchool = user.personalData.isSchool;
        this.personalData.get('name').setValue(user.personalData.name);
        this.personalData.get('lastName').setValue(user.personalData.lastName);
        this.personalData.get('secondLastName').setValue(user.personalData.secondLastName);
        this.personalData.get('email').setValue(user.personalData.email);
        this.personalData.get('phoneNumber').setValue(user.personalData.phoneNumber);
        this.personalData.get('gender').setValue(user.personalData.gender);
        this.birthDate = this.dateAdapter.fromModel(user.personalData.birthdate);
        this.personalData.get('birthdate').setValue(this.birthDate);
        this.personalData.get('ufBirth').setValue(user.personalData.ufBirth || null);
        this.personalData.get('municipalityBirth').setValue(user.personalData.municipalityBirth || null);
        this.personalData.get('nacionality').setValue(user.personalData.nacionality);
        this.personalData.get('breed').setValue(user.personalData.breed);
        this.personalData.get('education').setValue(user.personalData.education || null);
        this.personalData.get('familySituation').setValue(user.personalData.familySituation || null);
        this.personalData.get('motherName').setValue(user.personalData.motherName);

        this.personalData.get('cep').setValue(user.addressData.cep);
        this.personalData.get('uf').setValue(user.addressData.uf);
        this.personalData.get('city').setValue(user.addressData.city);
        this.personalData.get('neighborhood').setValue(user.addressData.neighborhood);
        this.personalData.get('street').setValue(user.addressData.street);
        this.personalData.get('streetNumber').setValue(user.addressData.streetNumber);

        this.waitingRoomsAssigned = user.waitingRooms || [];
        // console.log(this.waitingRoomsAssigned);

        // PROFILES
        if (this.userType !== 'patients') {
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
        }

        this.professionalPhoto = user.photo;
        this.profileDataForm.get('biography').setValue(user.professionalData?.biography || '');
        this.professionalForm.get('professionalTitle').setValue(user.professionalData?.professionalTitle);
        this.professionalForm.get('university').setValue(user.professionalData?.university);
        this.professionalForm.get('course').setValue(user.professionalData?.course);
        this.professionalForm.get('ufRegistry').setValue(user.professionalData?.ufRegistry);

        this.specialitiesData = this.specialities?.reduce((obj, value: any) => {
          obj[value._id] = value;
          return obj;
        }, {});

        if (user.specialities?.length) {
          for (const sp of user.specialities) {
            this.specialtiesService.getSpecialtiesId(sp).subscribe((data) => {
              this.specialitiesAssigned.push(data.payload);
            });
          }
        }

        // console.log(this.specialitiesAssigned);
        if (user.professionalData?.professionalRegistry.length) {
          for (const rg of user.professionalData.professionalRegistry) {
            this.professionalRegistry.push(rg);
          }
        } else {
          this.professionalRegistry = [];
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
        const role = this.profilesForm.value.role;
        this.profiles = data.filter((profile) => {
          if (profile.role !== 'patient' && role === profile.role && profile.isActive) {
            return profile;
          }
        });
        // console.log(this.profiles);
        this.profileSelected = this.profiles[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addProfile() {
    console.log(this.profileSelected);

    // console.log(form);
    if (this.profilesAssigned.some((profile) => profile.role === this.profileSelected.role)) {
      alert(`El rol ${this.profileSelected.role} ya esta asignado al usuario`);
    } else {
      this.profilesAssigned.push({
        id: this.profileSelected.id,
        clinic: this.clinicId,
        role: this.profileSelected.role,
        name: this.profileSelected.profileName,
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
    const data = this.roomSelected;
    if (this.waitingRoomsAssigned.some((room) => room._id === data._id)) {
      alert(`La lista de espera ${data.roomDetails.name} ya esta asignada al usuario`);
    } else {
      this.waitingRoomsAssigned.push(data);
    }
    console.log(this.waitingRoomsAssigned);
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
        _id: data._id,
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
    // console.log(this.formUser[0], this.formUser[1], this.formUser[3], this.formUser[4], this.formUser[5]);

    switch (this.userType) {
      case 'admins':
      case 'coordinators':
        if (this.formUser[0].valid && this.formUser[1].valid) {
          return true;
        } else {
          return false;
        }

      case 'professionals':
        if (
          this.formUser[0].valid &&
          this.formUser[1].valid &&
          this.formUser[4].valid &&
          this.professionalRegistry.length
        ) {
          return true;
        } else {
          return false;
        }
      case 'patients':
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

  updateUser() {
    //console.log(this.waitingRoomsAssigned);
    (<HTMLInputElement>document.getElementById('submit-button')).disabled = true;

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
      return map._id;
    });

    console.log(this.formUser[2]);

    this.userObject = {
      id: this.userId,
      identificationData: {
        ...(this.formUser[0].value.document === 'cpf' && { cpf: this.formUser[0].value.idDocumentNumber || '' }),
        ...(this.formUser[0].value.document === 'cns' && { cns: this.formUser[0].value.idDocumentNumber || '' }),
        ...(this.formUser[0].value.document === 'rgRegistry' && {
          rgRegistry: this.formUser[0].value.idDocumentNumber || '',
        }),
        passport: this.formUser[0].value.passport || '',
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
        phoneNumber: this.formUser[1].value.phoneNumber,
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
        biography: this.formUser[3].value.biography,
        professionalTitle: this.formUser[4].value.professionalTitle,
        university: this.formUser[4].value.university,
        course: this.formUser[4].value.course,
        ufRegistry: this.formUser[4].value.ufRegistry,
        professionalRegistry: this.professionalRegistry,
      },
      password: this.formUser[5].value.password,
      confirmPassword: this.formUser[5].value.confirmPassword,
    };

    // console.log(this.formUser[0].value.birthdate);
    console.log(this.userObject);

    if (this.userType !== 'patients') {
      if (this.profilesAssigned.length && this.waitingRoomsAssigned.length) {
        this.adminService.updateUser(this.userType, this.userObject).subscribe(
          (res) => {
            this.spinner.hide();
            console.log(res);
          },
          (err) => {
            this.spinner.hide();
            console.log(err);
            (<HTMLInputElement>document.getElementById('submit-button')).disabled = false;
          },
          () => {
            (<HTMLInputElement>document.getElementById('submit-button')).disabled = false;
            this.location.back();
          }
        );
      } else {
        this.spinner.hide();
        (<HTMLInputElement>document.getElementById('submit-button')).disabled = false;
        alert('Complete el formulario con todos los datos necesarios');
      }
    } else {
      this.adminService.updateUser(this.userType, this.userObject).subscribe(
        (res) => {
          // console.log(response);
          this.spinner.hide();
          console.log(res);
        },
        (err) => {
          this.spinner.hide();
          console.log(err);
          (<HTMLInputElement>document.getElementById('submit-button')).disabled = false;
        },
        () => {
          (<HTMLInputElement>document.getElementById('submit-button')).disabled = false;
          this.location.back();
        }
      );
    }
  }

  getRooms() {
    this.roomsService.getWaitingRooms().subscribe((data) => {
      console.log(data);
      this.waitingRooms = data.payload;
    });
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
