import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {
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
  profiles: any = [];
  profilesAssigned: any = [];

  waitingRooms: any = [
    { id: '1', name: 'Sala de Espera 1', description: 'desc 1' },
    { id: '2', name: 'Sala de Espera 2', description: 'desc 2' },
    { id: '3', name: 'Sala de Espera 3', description: 'desc 3' },
  ];
  waitingRoomsAssigned: any = [];

  specialities: any = [
    { id: '1', name: 'Especialidad 1', description: 'desc 1' },
    { id: '2', name: 'Especialidad 2', description: 'desc 2' },
    { id: '3', name: 'Especialidad 3', description: 'desc 3' },
  ];
  specialitiesAssigned: any = [];

  constructor(
    private router: Router,
    private routerAct: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private calendar: NgbCalendar
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

    this.formUser.push(this.personalData, this.profileForm, this.educationForm, this.passwordForm);

    this.birthDate = this.calendar.getToday();
  }

  getUser(userType, userId) {
    this.adminService.getUserById(userType, userId).subscribe(
      (user) => {
        // console.log(user);
        this.personalData.get('cpf').setValue(user.identificationData.cpf);
        this.personalData.get('cns').setValue(user.identificationData.cns);
        this.personalData.get('passport').setValue(user.identificationData.passport);
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
        id: form.profile._id,
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
    if (this.specialitiesAssigned.some((sp) => sp.name === data.name)) {
      alert(`La especialidad ${data.name} ya esta asignada al usuario`);
    } else {
      this.specialitiesAssigned.push({
        id: data.id,
        name: data.name,
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
      if (this.formUser[0].valid && this.formUser[3].valid) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.formUser[0].valid && this.formUser[1].valid && this.formUser[2].valid && this.formUser[3].valid) {
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

  createUser() {
    console.log(this.profilesAssigned);

    const _profiles = this.profilesAssigned.map((map) => {
      return map.id;
    });
    const _waitingRooms = this.waitingRoomsAssigned.map((map) => {
      return map.id;
    });
    const _specialities = this.specialitiesAssigned.map((map) => {
      return map.id;
    });

    this.userObject = {
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

    console.log(this.formUser[0].value.birthdate);

    console.log(this.userObject);

    if (this.profilesAssigned.length && this.waitingRoomsAssigned.length) {
      this.adminService.createUser(this.userType, this.userObject).subscribe((response) => {
        // console.log(response);
        this.router.navigate(['app-admin/usuarios']);
      });
    } else {
      alert('Complete el formulario con todos los datos necesarios');
    }
  }
}
