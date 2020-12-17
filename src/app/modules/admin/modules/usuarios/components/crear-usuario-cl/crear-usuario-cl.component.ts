import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

// EXTRAS
import { AdminService } from '../../../../services/admin.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import { SpecialtiesService } from 'src/app/services/specialties.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomDateAdapter } from 'src/app/shared/utils';
import { RoomsService } from 'src/app/services/rooms.service';

import { environment } from '../../../../../../../environments/environment';
import { validate } from 'rut.js';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

const current = new Date();

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario-cl.component.html',
  styleUrls: ['./crear-usuario-cl.component.scss'],
})

export class CrearUsuarioComponentCL implements OnInit {
  isForeign: boolean = false;
  isSchool: boolean = false;
  identificationData: FormGroup;
  personalData: FormGroup;
  profilesForm: FormGroup;
  waitingRoomForm: FormGroup;
  profileDataForm: FormGroup;
  specialitiesForm: FormGroup;
  professionalForm: FormGroup;
  workForm: FormGroup;
  professionalRegistrySend: any = [];
  passwordForm: FormGroup;
  showPassword: boolean;
  documentTypeDefault:any;
  errorCepString:string;
  public errorCep:boolean = false;
  public ufObject:any;
  public cityObject:any;
  public neighborhood:any;
  public street:any;
  public mayorEdad:boolean;
  maxDate = undefined;



  registerUf:any;
  registerUf2:any;

  previsionHealth: any = [];
  states: any = [];
  cities: any = [];
  cities2: any = [];
  countries: any = [];
  breeds: any = [];
  educations: any = [];
  familiarSituations: any = [];
  issuingEntities: any = [];

  profileSelected: any;
  roomSelected: any;

  currentDate = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
    day: current.getDate(),
  };




  dateAdapter = new CustomDateAdapter();
  birthDate: NgbDateStruct;
  inmigrationDate: NgbDateStruct;

  formUser: any = [];
  userObject: any = {};
  public cpfvalid: boolean = true;

  roles: any = [
    { name: 'common.roles.admin.label', value: 'admin' },
    { name: 'common.roles.coordinator.label', value: 'coordinator' },
    { name: 'common.roles.doctor.label', value: 'professional' },
  ];
  profiles: any = [];
  profilesAssigned: any = [];

  waitingRooms: any = [];
  waitingRoomsAssigned: any = [];

  specialities: any = [];
  specialitiesAssigned: any = [];

  professionalRegistry: any = [];

  works: any = [];
  

  // FOR CUSTOM FORM
  public userType = this.routerAct.snapshot.queryParamMap.get('userType');

  constructor(
    private location: Location,
    private routerAct: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private userService: UsersService,
    private roomsService: RoomsService,
    private specialtiesService: SpecialtiesService,
    private calendar: NgbCalendar,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    
  if(environment.checkAge === false){
    this.mayorEdad = false
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth(),
      day: current.getDate(),
    };
  } else {
    this.mayorEdad = true
    this.maxDate = {
      year: current.getFullYear() - 18,
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
  }

    this.spinner.show();

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
    this.getPrevissions();

    this.identificationData = this.formBuilder.group({
      document:  new FormControl('run'),
      idDocumentNumber: ['', Validators.required],
      passport: ['', null],
      rgRegistry: ['', null],
      issuingBody: [null, null],
      extraDocument: [null, null],
      extraIdDocument: ['', null],
    });

    this.personalData = this.formBuilder.group({
      name: ['', [Validators.required,]], 
      lastName: ['',[Validators.required,]], 
      motherName: ['', null],
      secondLastName: ['', [Validators.required,]],//Validators.pattern(/^[a-zA-ZñáéíóúüµùàçéèçÇ\s]*$/)
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]],
      gender: [null, Validators.required],
      birthdate: [null, Validators.required],
      ufBirth: [null, null],
      municipalityBirth: [null, null],
      nacionality: [null, Validators.required],
      originCountry: [null, null],
      inmigrationDate: [null, null],
      breed: ['', null],
      education: [null, null],
      familySituation: [null, null],
      cep: ['', null],
      uf: [null, Validators.required],
      city: [null, Validators.required],
      neighborhood: ['', null],
      street: ['', Validators.required],
      complement: ['', null],
      streetNumber: [null, [Validators.required, Validators.pattern(/^(?=.*[0-9])/)]],
      prevission: ['',Validators.required],
      postal: ['',null]
    });

    this.profilesForm = this.formBuilder.group({
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
      course: ['', null],
      ufRegistry: ['', null],
      professionalRegistryType: ['', null],
      professionalRegistry: ['', null],
      ufProfessionalRegistry: ['', null],
      nrRegistryHealthIntendence: [null, Validators.required],
      workState: [null, Validators.required],
      workCity: [null, Validators.required],
      workStreet: [null, Validators.required],
      workNumber: [null, Validators.required],
      workComplement: ['', null],
      workPostal: ['', null],
      workPhone: ['', null],
      workMutuality: ['',null]
    });

    this.workForm = this.formBuilder.group({

    })

    this.passwordForm = new FormGroup(
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

    this.formUser.push(
      this.identificationData,
      this.personalData,
      this.profilesForm,
      this.profileDataForm,
      this.professionalForm,
      this.passwordForm
    );
    setTimeout(() => {
      this.validateForm();
      this.spinner.hide();
    }, 1000);
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
      this.identificationData.get('issuingBody').disable();
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
      this.identificationData.get('issuingBody').enable();
      this.identificationData.get('passport').reset();
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

  validRUN(run:string){
    this.cpfvalid = validate(run);
    console.log(this.cpfvalid, run)
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

  ufSelect(id) {
    let idSelected = id.value.split(":");
    console.log(idSelected[1]);
    this.getCitiesforId(idSelected[1].trim());
    
  }
  ufSelect2(id) {
    let idSelected = id.value.split(":");
    console.log(idSelected[1]);
    this.getCitiesforId2(idSelected[1].trim());

  }
  getCitiesforId2(stateId) {
    this.userService.getCitiesForUf(stateId).subscribe((data) => {
      console.log(data);
      this.cities2 = data.payload
      //this.citiesFilter = data.payload;
    },
      error => {
        console.log(error)
      }
    );
  }

  getCitiesforId(stateId) {
    this.userService.getCitiesForUf(stateId).subscribe((data) => {
      console.log(data);
      this.cities = data.payload
      //this.citiesFilter = data.payload;
    },
      error => {
        console.log(error)
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

    if (this.profilesAssigned.some((profile) => profile.role === this.profileSelected.role)) {
      alert(`El rol ${this.profileSelected.role} ya esta asignado al usuario`);
    } else {
      this.profilesAssigned.push({
        id: this.profileSelected.id,
        role: this.profileSelected.role,
        name: this.profileSelected.profileName,
      });
    }
    this.isProfessional();

    console.log(this.profilesAssigned);
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
      case 'admin':
        console.log(this.formUser[0].valid 
          , this.formUser[1].valid 
          , this.formUser[5].valid)
        if (this.formUser[0].valid 
          && this.formUser[1].valid 
          && this.formUser[5].valid) {
          return true;
        } else {
          return false;
        }
      case 'coordinator':
        if (this.formUser[0].valid && this.formUser[1].valid && this.formUser[2].valid && this.formUser[5].valid) {
          return true;
        } else {
          return false;
        }

      case 'professional':
        if (this.formUser[0].valid && this.formUser[1].valid && this.formUser[4].valid && this.formUser[5].valid) {
          return true;
        } else {
          return false;
        }
      case 'patient':
        
        if (this.formUser[0].valid 
            && this.formUser[1].valid 
            && this.formUser[5].valid) {
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

  ufRegistry(id){
    let idSelected =  id.options[id.selectedIndex].value.split(":");
    console.log(idSelected[1])
    this.registerUf = {
      id:idSelected[1],
      name:id.options[id.selectedIndex].text
    }
  }
  ufRegistry2(id){
    let idSelected2 =  id.options[id.selectedIndex].value.split(":");
    this.registerUf2 = {
      id:idSelected2[1],
      name:id.options[id.selectedIndex].text
    }
  }


  createUser() {
    //console.log(this.formUser[4]);
    // console.log(this.profilesAssigned);]
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
      return map.id;
    });

    

    console.log(this.userObject);
    

    if (this.userType === 'patient') {
      this.userObject = {
        identificationData: {
          ...(this.formUser[0].value.document === 'cpf' && { cpf: this.formUser[0].value.idDocumentNumber || '' }),
          ...(this.formUser[0].value.document === 'cns' && { cns: this.formUser[0].value.idDocumentNumber || '' }),
          ...(this.formUser[0].value.document === 'run' && { run: this.formUser[0].value.idDocumentNumber || '' }),
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
          motherName: '',
          secondLastName: this.formUser[1].value.secondLastName,
          email: this.formUser[1].value.email,
          phoneNumber: this.formUser[1].value.phoneNumber,
          birthdate: this.dateAdapter.toModel(this.formUser[1].value.birthdate),
          ufBirth: '',
          municipalityBirth: '',
          gender: this.formUser[1].value.gender,
          nacionality: this.formUser[1].value.nacionality,
          originCountry: '',
          inmigrationDate: this.dateAdapter.toModel(this.formUser[1].value.inmigrationDate) || '',
          breed: '',
          education: this.formUser[1].value.education || '',
          familySituation:  '',
          prevission: this.formUser[1].value.prevission || ''
        },
        addressData: {
          cep: this.formUser[1].value.cep,
          uf: this.formUser[1].value.uf,
          city: this.formUser[1].value.city,
          neighborhood: this.formUser[1].value.neighborhood,
          street: this.formUser[1].value.street,
          streetNumber: parseInt(this.formUser[1].value.streetNumber),
          complement: this.formUser[1].value.complement,
          postal: this.formUser[1].value.postal
        },
        profiles: _profiles,
        waitingRooms: this.waitingRoomsAssigned,
        specialities: _specialities,
        password: this.formUser[5].value.password,
        confirmPassword: this.formUser[5].value.confirmPassword,
      };
      this.adminService.createUser(this.userType, this.userObject).subscribe(
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

    } 

    if(this.userType === 'professional'){
      
      this.userObject = {
        identificationData: {
          ...(this.formUser[0].value.document === 'cpf' && { cpf: this.formUser[0].value.idDocumentNumber || '' }),
          ...(this.formUser[0].value.document === 'cns' && { cns: this.formUser[0].value.idDocumentNumber || '' }),
          ...(this.formUser[0].value.document === 'run' && { run: this.formUser[0].value.idDocumentNumber || '' }),
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
          motherName: '',
          secondLastName: this.formUser[1].value.secondLastName,
          email: this.formUser[1].value.email,
          phoneNumber: this.formUser[1].value.phoneNumber,
          birthdate: this.dateAdapter.toModel(this.formUser[1].value.birthdate),
          ufBirth: '',
          municipalityBirth: '',
          gender: this.formUser[1].value.gender,
          nacionality: this.formUser[1].value.nacionality,
          originCountry: '',
          inmigrationDate: this.dateAdapter.toModel(this.formUser[1].value.inmigrationDate) || '',
          breed: '',
          education: this.formUser[1].value.education || '',
          familySituation: '',
          prevission: this.formUser[1].value.prevission || ''
        },
        addressData: {
          cep: this.formUser[1].value.cep,
          uf: this.formUser[1].value.uf,
          city: this.formUser[1].value.city,
          neighborhood: this.formUser[1].value.neighborhood,
          street: this.formUser[1].value.street,
          streetNumber: parseInt(this.formUser[1].value.streetNumber),
          complement: this.formUser[1].value.complement,
          postal: this.formUser[1].value.postal
        },
        profiles: _profiles,
        waitingRooms: this.waitingRoomsAssigned,
        specialities: _specialities,
        professionalData: {
          biography: this.formUser[3].value.biography,
          professionalTitle: this.formUser[4].value.professionalTitle,
          university: this.formUser[4].value.university,
          course: this.formUser[4].value.course,
          ufRegistry: this.formUser[4].value.ufRegistry._id,
          professionalRegistryType: this.formUser[4].value.professionalRegistryType,
          professionalRegistry: this.professionalRegistry,
          nrRegistryHealthIntendence: this.formUser[4].value.nrRegistryHealthIntendence,
          workState: this.formUser[4].value.workState,
          workCity: this.formUser[4].value.workCity,
          workStreet: this.formUser[4].value.workStreet,
          workNumber: this.formUser[4].value.workNumber,
          workComplement: this.formUser[4].value.workComplement,
          workPostal: this.formUser[4].value.workPostal,
          workPhone: this.formUser[4].value.workPhone
        },
        password: this.formUser[5].value.password,
        confirmPassword: this.formUser[5].value.confirmPassword,
      };
      if (this.profilesAssigned.length && this.waitingRoomsAssigned.length) {
        this.adminService.createUser(this.userType, this.userObject).subscribe(
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
      
    }

    if(this.userType === 'coordinator'){
      
      this.userObject = {
        identificationData: {
          ...(this.formUser[0].value.document === 'cpf' && { cpf: this.formUser[0].value.idDocumentNumber || '' }),
          ...(this.formUser[0].value.document === 'cns' && { cns: this.formUser[0].value.idDocumentNumber || '' }),
          ...(this.formUser[0].value.document === 'run' && { run: this.formUser[0].value.idDocumentNumber || '' }),
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
          motherName: '',
          secondLastName: this.formUser[1].value.secondLastName,
          email: this.formUser[1].value.email,
          phoneNumber: this.formUser[1].value.phoneNumber,
          birthdate: this.dateAdapter.toModel(this.formUser[1].value.birthdate),
          ufBirth: '',
          municipalityBirth: '',
          gender: this.formUser[1].value.gender,
          nacionality: this.formUser[1].value.nacionality,
          originCountry: '',
          inmigrationDate: this.dateAdapter.toModel(this.formUser[1].value.inmigrationDate) || '',
          breed: '',
          education: this.formUser[1].value.education || '',
          familySituation: '',
          prevission: this.formUser[1].value.prevission || ''
        },
        addressData: {
          cep: this.formUser[1].value.cep,
          uf: this.formUser[1].value.uf,
          city: this.formUser[1].value.city,
          neighborhood: this.formUser[1].value.neighborhood,
          street: this.formUser[1].value.street,
          streetNumber: parseInt(this.formUser[1].value.streetNumber),
          complement: this.formUser[1].value.complement
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
          professionalRegistryType: this.formUser[4].value.professionalRegistryType,
          professionalRegistry: this.professionalRegistry,
          ufProfessionalRegistry: this.formUser[4].value.ufProfessionalRegistry,
        },
        password: this.formUser[5].value.password,
        confirmPassword: this.formUser[5].value.confirmPassword,
      };
      if (this.profilesAssigned.length && this.waitingRoomsAssigned.length) {
        this.adminService.createUser(this.userType, this.userObject).subscribe(
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
      
    }
    if(this.userType === 'admin'){
      
      this.userObject = {
        identificationData: {
          ...(this.formUser[0].value.document === 'cpf' && { cpf: this.formUser[0].value.idDocumentNumber || '' }),
          ...(this.formUser[0].value.document === 'cns' && { cns: this.formUser[0].value.idDocumentNumber || '' }),
          ...(this.formUser[0].value.document === 'run' && { run: this.formUser[0].value.idDocumentNumber || '' }),
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
          motherName: '',
          secondLastName: this.formUser[1].value.secondLastName,
          email: this.formUser[1].value.email,
          phoneNumber: this.formUser[1].value.phoneNumber,
          birthdate: this.dateAdapter.toModel(this.formUser[1].value.birthdate),
          ufBirth: '',
          municipalityBirth: '',
          gender: this.formUser[1].value.gender,
          nacionality: this.formUser[1].value.nacionality,
          originCountry: '',
          inmigrationDate: this.dateAdapter.toModel(this.formUser[1].value.inmigrationDate) || '',
          breed: '',
          education: this.formUser[1].value.education || '',
          familySituation:  '',
          prevission: this.formUser[1].value.prevission || ''
        },
        addressData: {
          cep: this.formUser[1].value.cep,
          uf: this.formUser[1].value.uf,
          city: this.formUser[1].value.city,
          neighborhood: this.formUser[1].value.neighborhood,
          street: this.formUser[1].value.street,
          streetNumber: parseInt(this.formUser[1].value.streetNumber),
          complement: this.formUser[1].value.complement
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
          professionalRegistryType: this.formUser[4].value.professionalRegistryType,
          professionalRegistry: this.professionalRegistry,
          ufProfessionalRegistry: this.formUser[4].value.ufProfessionalRegistry,
        },
        password: this.formUser[5].value.password,
        confirmPassword: this.formUser[5].value.confirmPassword,
      };
      if (this.profilesAssigned.length && this.waitingRoomsAssigned.length) {
        this.adminService.createUser(this.userType, this.userObject).subscribe(
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

  getLocationDataFromCep(){
    this.errorCep = false;
    this.personalData.get('cep').valueChanges.subscribe( x =>  {
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
              this.personalData.get('uf').setValue(this.ufObject, {emitEvent: false});
              this.personalData.get('city').setValue(this.cityObject);
              
              this.personalData.get('uf').enable();
              this.personalData.get('city').enable();
              this.personalData.get('neighborhood').enable();
              this.personalData.get('street').enable();
              this.personalData.get('streetNumber').enable();
              this.personalData.get('complement').enable();
              this.personalData.get('neighborhood').setValue(this.neighborhood, { emitEvent: false});
              this.personalData.get('street').setValue(this.street, {emitEvent: false});
  
              this.personalData.get('uf').valueChanges.subscribe( x =>  {
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
      this.cities2 = data.payload;
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

  getPrevissions(){
    this.userService.getPrevissions().subscribe((data)=>{
      this.previsionHealth = data.payload 
    })
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
    if(this.userType == 'professional') return true
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
    if (this.userType == "professional"){
      this.professionalRegistry.push({
        type: this.professionalForm.value.professionalRegistryType || '',
        registry: this.professionalForm.value.professionalRegistry || '',
        uf: '',
        university: this.professionalForm.value.university || '',
        professionalTitle: this.professionalForm.value.professionalTitle || '',
        course: this.professionalForm.value.course || '',
        ufRegistry: ''
      });
  
      
      this.professionalRegistrySend.push({
        type: this.professionalForm.value.professionalRegistryType || '',
        registry: this.professionalForm.value.professionalRegistry || '',
        uf: '',
        university: this.professionalForm.value.university || '',
        professionalTitle: this.professionalForm.value.professionalTitle || '',
        course: this.professionalForm.value.course || '',
        ufRegistry: ''
      });
    }else{
      this.professionalRegistry.push({
        type: this.professionalForm.value.professionalRegistryType || '',
        registry: this.professionalForm.value.professionalRegistry || '',
        uf: this.registerUf2.name,
        university: this.professionalForm.value.university || '',
        professionalTitle: this.professionalForm.value.professionalTitle || '',
        course: this.professionalForm.value.course || '',
        ufRegistry: this.registerUf2.name
      });
  
      
      this.professionalRegistrySend.push({
        type: this.professionalForm.value.professionalRegistryType || '',
        registry: this.professionalForm.value.professionalRegistry || '',
        uf: this.registerUf2.id,
        university: this.professionalForm.value.university || '',
        professionalTitle: this.professionalForm.value.professionalTitle || '',
        course: this.professionalForm.value.course || '',
        ufRegistry: this.registerUf2.id
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

    this.profilesForm = this.formBuilder.group({
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
