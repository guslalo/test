import { Location } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { SpecialtiesService } from 'src/app/services/specialties.service';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {
  clinicId: string;
  userType = this.routerAct.snapshot.queryParamMap.get('userType');
  userId = this.routerAct.snapshot.queryParamMap.get('userId');

  personalData: FormGroup;
  profileForm: FormGroup;
  waitingRoomForm: FormGroup;
  profileDataForm: FormGroup;
  specialitiesForm: FormGroup;
  educationForm: FormGroup;
  passwordForm: FormGroup;

  birthDate: NgbDateStruct;
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

  constructor(
    private location: Location,
    private routerAct: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private calendar: NgbCalendar,
    private specialtiesService: SpecialtiesService
  ) {
    this.personalData = this.formBuilder.group({
      cpf: [null, Validators.required],
      cns: [null, Validators.required],
      passport: [null, Validators.required],
      rgRegistry: [null, Validators.required],
      issuingBody: [null, Validators.required],
      extraIdDocument: [null, Validators.required],
      idDocumentNumber: [null, Validators.required],
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      socialName: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      phoneNumber: [null, Validators.required],
      birthdate: [null, Validators.required],
      ufBirth: [null, Validators.required],
      municipalityBirth: [null, Validators.required],
      genre: [null, Validators.required],
      nacionality: [null, Validators.required],
    });

    this.profileForm = this.formBuilder.group({
      role: [this.roles[0].value, Validators.required],
      profile: [null, Validators.required],
    });

    this.waitingRoomForm = this.formBuilder.group({
      waitingRoom: [null, Validators.required],
    });

    this.specialitiesForm = this.formBuilder.group({
      speciality: [null, Validators.required],
    });

    this.profileDataForm = this.formBuilder.group({
      profileImg: [null],
      biography: [null, Validators.required],
    });

    this.educationForm = this.formBuilder.group({
      professionalTitle: [null, Validators.required],
      university: [null, Validators.required],
      course: [null, Validators.required],
      professionalRegistry: [null, Validators.required],
      registryNumber: [null, Validators.required],
      extraIdDocument: [null, Validators.required],
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
  }

  ngOnInit(): void {
    this.getUser(this.userType, this.userId);
    this.clinicId = localStorage.getItem('clinic');
    console.log(this.clinicId);

    this.formUser.push(this.personalData, this.profileForm, this.educationForm, this.passwordForm);

    this.birthDate = this.calendar.getToday();

    this.getSpecialties();
  }

  async getUser(userType, userId) {
    const getUserAndProfiles = () => {
      let profiles = [];
      // GET USER
      return this.adminService.getUserById(userType, userId).pipe(
        map((user) => {
          _.each(user.administrativeData, (p) => {
            // GET DADA FROM PROFILES
            let profile = this.adminService.getProfileById(p.profile).pipe((data) => {
              // console.log(data);
              return data;
            });
            profiles.push(profile);
          });
          return { user, profiles };
        })
      );
    };

    getUserAndProfiles().subscribe(
      (result) => {
        // console.log(result);
        const user = result.user;

        // USER DATA
        this.personalData.get('cpf').setValue(user.identificationData.cpf);
        this.personalData.get('cns').setValue(user.identificationData.cns);
        this.personalData.get('passport').setValue(user.identificationData.passport);
        this.personalData.get('rgRegistry').setValue(user.identificationData.rgRegistry);
        this.personalData.get('issuingBody').setValue(user.identificationData.issuingBody);
        this.personalData.get('extraIdDocument').setValue(user.identificationData.extraIdDocument);
        this.personalData.get('idDocumentNumber').setValue(user.identificationData.idDocumentNumber);

        this.personalData.get('name').setValue(user.personalData.name);
        this.personalData.get('lastName').setValue(user.personalData.lastName);
        this.personalData.get('socialName').setValue(user.personalData.socialName);
        this.personalData.get('email').setValue(user.personalData.email);
        this.personalData.get('phoneNumber').setValue(user.personalData.phoneNumber);
        this.personalData.get('birthdate').setValue(user.personalData.birthDate);
        this.personalData.get('ufBirth').setValue(user.personalData.ufBirth);
        this.personalData.get('municipalityBirth').setValue(user.personalData.municipalityBirth);
        this.personalData.get('genre').setValue(user.personalData.genre);
        this.personalData.get('nacionality').setValue(user.personalData.nacionality);

        this.personalData.get('nacionality').setValue(user.personalData.nacionality);
        this.personalData.get('nacionality').setValue(user.personalData.nacionality);
        this.personalData.get('nacionality').setValue(user.personalData.nacionality);

        this.waitingRoomsAssigned = user.waitingRooms || [];
        this.specialitiesAssigned = user.specialities || [];

        for (const specialty of this.specialitiesAssigned) {
          this.getSpecialtyById(specialty);
        }

        let i = 0;
        // PROFILES CRUD
        for (const item of result.profiles) {
          item.subscribe((p) => {
            console.log(user.administrativeData[i].clinic);
            this.profilesAssigned.push({
              clinic: user.administrativeData[i].clinic,
              id: p._id,
              role: p.role,
              name: p.profileName,
            });
            i++;
          });
        }

        console.log(this.profilesAssigned);
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
    console.log(this.waitingRoomsAssigned);

    const _profiles = this.profilesAssigned.map((map) => {
      return {
        clinic: map.clinic,
        profile: map.id,
      };
    });
    const _waitingRooms = this.waitingRoomsAssigned.map((map) => {
      return map.id;
    });
    const _specialities = this.specialitiesAssigned.map((map) => {
      return map.id;
    });

    console.log(_waitingRooms);

    this.userObject = {
      id: this.userId,
      identificationData: {
        cpf: this.formUser[0].value.cpf,
        cns: this.formUser[0].value.cns,
        passport: this.formUser[0].value.passport,
        rgRegistry: this.formUser[0].value.rgRegistry,
        issuingBody: this.formUser[0].value.issuingBody,
        extraIdDocument: this.formUser[0].value.extraIdDocument,
        idDocumentNumber: this.formUser[0].value.idDocumentNumber,
      },
      personalData: {
        name: this.formUser[0].value.name,
        lastName: this.formUser[0].value.lastName,
        socialName: this.formUser[0].value.socialName,
        email: this.formUser[0].value.email,
        phoneNumber: this.formUser[0].value.phoneNumber,
        birthdate: this.formUser[0].value.birthdate.toString(),
        ufBirth: this.formUser[0].value.ufBirth,
        municipalityBirth: this.formUser[0].value.municipalityBirth,
        genre: this.formUser[0].value.genre,
        nacionality: this.formUser[0].value.nacionality,
      },
      profiles: _profiles,
      waitingRooms: _waitingRooms,
      profileData: {
        profileImg: '',
        biography: this.formUser[1].value.biography,
      },
      specialities: _specialities,
      educationData: {
        professionalTitle: this.formUser[2].value.professionalTitle,
        university: this.formUser[2].value.university,
        course: this.formUser[2].value.course,
        professionalRegistry: this.formUser[2].value.professionalRegistry,
        registryNumber: this.formUser[2].value.registryNumber,
        extraIdDocument: this.formUser[2].value.extraIdDocument,
      },
      password: this.formUser[3].value.password,
      confirmPassword: this.formUser[3].value.confirmPassword,
    };

    // console.log(this.formUser[0].value.birthdate);
    console.log(this.userObject);

    if (this.profilesAssigned.length && this.waitingRoomsAssigned.length) {
      this.adminService.updateUser(this.userType, this.userObject).subscribe(() => {
        // console.log(response);
        this.location.back();
      });
    } else {
      alert('Complete el formulario con todos los datos necesarios');
    }
  }

  getSpecialties() {
    this.specialtiesService.getSpecialties().subscribe((data) => {
      this.specialities = data;
    });
  }

  getSpecialtyById(specialtyId) {
    this.specialtiesService.getSpecialtiesId(specialtyId).subscribe((data) => {
      console.log(data);
    });
  }
}
