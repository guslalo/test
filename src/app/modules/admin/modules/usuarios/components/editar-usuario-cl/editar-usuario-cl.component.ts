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
import { months } from 'moment';
import { validate } from 'rut.js';

const current = new Date();

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario-cl.component.html',
  styleUrls: ['./editar-usuario-cl.component.scss'],
})
export class EditarUsuarioCLComponent implements OnInit {
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
  citiesFilter: any;
  city2:boolean;
  registerUf:any;
  registerUf2:any;
  profileSelected: any;
  roomSelected: any;
  setDate:any;
  previsionHealth: any = [];

  states: any = [];
  cities: any = [];
  cities2: any = [];
  countries: any = [];
  breeds: any = [];
  educations: any = [];
  familiarSituations: any = [];
  issuingEntities: any = [];
  public cpfvalid: boolean = true;

  specialitiesData: any;

  errorCepString:string;
  public errorCep:boolean = false;
  public ufObject:any;
  public cityObject:any;
  public neighborhood:any;
  public street:any;

  currentDate = {
    day: current.getDate(),
    month: current.getMonth() + 1,
    year: current.getFullYear()
  };

  maxDate = {
    day: current.getDate(),
    month: current.getMonth() + 1,
    year: current.getFullYear() - 18 
  };

  dateAdapter = new CustomDateAdapter();
  birthDate:NgbDateStruct;
  inmigrationDate: NgbDateStruct;

  formUser: any = [];
  userObject: any = {};

  roles: any = [
    { name: 'common.roles.admin.label', value: 'admin' },
    { name: 'common.roles.coordinator.label', value: 'coordinator' },
    { name: 'common.roles.doctor.label', value: 'professional' },
  ];
  profile: any = {};
  profiles: any = [];
  profilesAssigned: any = [];
  waitingRooms: any = [];
  waitingRoomsAssigned: any = [];

  specialities: any = [];
  specialitiesAssigned: any = [];

  professionalRegistry: any = [];
  professionalRegistrySend: any = [];

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
  ) { }

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
    this.getPrevissions();

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
      name: ['', [Validators.required, ]],
      lastName: ['', [Validators.required,]],
      motherName: ['', null],
      secondLastName: ['', [Validators.required,]],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: [null, [Validators.required, ]],
      gender: [null, Validators.required],
      birthdate: [null, Validators.required],
      ufBirth: [null, null],
      municipalityBirth: [null, null],
      nacionality: [null, Validators.required],
      originCountry: [null, null],
      inmigrationDate: [null, null],
      breed: [null, null],
      education: [null, null],
      familySituation: [null, null],
      cep: ['', null],
      uf: [null, Validators.required],
      city: [null, Validators.required],
      city2: ['',null],
      neighborhood: ['', null],
      street: ['', Validators.required],
      streetNumber: [null, [Validators.required, Validators.pattern(/^(?=.*[0-9])/)]],
      complement: [null, ],
      healthInsurance: [null, Validators.required],
      zipcode: ['', null]
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
      ufRegistry: [null, null],
      professionalRegistryType: [null, null],
      professionalRegistry: [null, null],
      ufProfessionalRegistry: [null, null],
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

    this.professionalForm.controls['professionalRegistryType'].setValue(' ');
    this.professionalForm.controls['professionalRegistry'].setValue(' ');
    this.professionalForm.controls['ufProfessionalRegistry'].setValue(' ');
    this.professionalForm.controls['university'].setValue(' ');
    this.professionalForm.controls['professionalTitle'].setValue(' ');
    this.professionalForm.controls['course'].setValue(' ');
    this.professionalForm.controls['ufRegistry'].setValue(' ');
  }

  ufSelect(id) {
    this.city2 = false;
    let idSelected = id.value.split(":");
    console.log(idSelected[1]);
    this.getCitiesforId(idSelected[1].trim());
    
  }

  ufSelect2(id) {
    this.city2 = true;
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
        if (user.identificationData.run) this.identificationData.get('document').setValue('run');
        // SECONDARY IDENTIFICATION
        if (user.identificationData.idDocumentNumber)
          this.identificationData.get('extraDocument').setValue('idDocumentNumber');

        // USER DATA
        this.identificationData
          .get('idDocumentNumber')
          .setValue(user.identificationData.run || null);


        this.isForeign = user.identificationData.isForeign;
        if (user.identificationData.isForeign) {
          this.identificationData.get('passport').setValue(user.identificationData.passport);
          this.personalData.get('originCountry').setValue(user.personalData.originCountry);
          this.inmigrationDate =
            this.dateAdapter.fromModel(user.personalData.inmigrationDate) || this.calendar.getToday();
          this.personalData.get('inmigrationDate').setValue(this.inmigrationDate);
        }


          
         
        this.isSchool = user.personalData.isSchool;
        this.personalData.get('name').setValue(user.personalData.name);
        this.personalData.get('lastName').setValue(user.personalData.lastName);
        this.personalData.get('secondLastName').setValue(user.personalData.secondLastName);
        this.personalData.get('email').setValue(user.personalData.email);
        this.personalData.get('phoneNumber').setValue(user.personalData.phoneNumber);
        this.personalData.get('gender').setValue(user.personalData.gender);
        this.birthDate = this.dateAdapter.fromModel(user.personalData.birthdate);
        this.setDate = {
          day:this.birthDate.year,
          month:this.birthDate.month,
          year:this.birthDate.day,
        }
        this.personalData.get('birthdate').setValue(this.setDate);
        this.personalData.get('nacionality').setValue(user.personalData.nacionality);
        this.personalData.get('education').setValue(user.personalData.education || null);
        this.personalData.get('healthInsurance').setValue(user.personalData.healthInsurance || user.personalData.prevission);
        this.personalData.get('zipcode').setValue(user.addressData?.zipcode || user.personalData?.postal || '');
;
        this.personalData.get('uf').setValue(user.addressData.uf);
        this.personalData.get('city').setValue(user.addressData.city);
        this.personalData.get('city2').setValue(user.addressData.city);
        this.personalData.get('street').setValue(user.addressData.street);
        this.personalData.get('streetNumber').setValue(user.addressData.streetNumber);
        this.personalData.get('complement').setValue(user.addressData.complement);
        
        this.waitingRoomsAssigned = user.waitingRooms || [];
        console.log(this.birthDate );
        console.log(this.dateAdapter.fromModel(user.personalData.birthdate))
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
        this.professionalForm.get('nrRegistryHealthIntendence').setValue(user.professionalData?.nrRegistryHealthIntendence || '')
        this.professionalForm.get('workState').setValue(user.professionalData?.workState || '')
        this.professionalForm.get('workCity').setValue(user.professionalData?.workCity || '')
        this.professionalForm.get('workStreet').setValue(user.professionalData?.workStreet || '')
        this.professionalForm.get('workNumber').setValue(user.professionalData?.workNumber || '')
        this.professionalForm.get('workComplement').setValue(user.professionalData?.workCOmplement || '')
        this.professionalForm.get('workPostal').setValue(user.professionalData?.workPostal || '')
        this.professionalForm.get('workPhone').setValue(user.professionalData?.workState || '')
        /*this.professionalForm.get('professionalTitle').setValue(user.professionalData?.professionalTitle);
        this.professionalForm.get('university').setValue(user.professionalData?.university);
        this.professionalForm.get('course').setValue(user.professionalData?.course);
        this.professionalForm.get('ufRegistry').setValue(user.professionalData?.ufRegistry);*/
        //this.professionalForm.controls['ufRegistry'].setValue(user.professionalData?.ufRegistry);

        this.specialitiesData = this.specialities?.reduce((obj, value: any) => {
          obj[value._id] = value;
          return obj;
        }, {});

        if (user.specialities?.length) {
          for (const sp of user.specialities) {
            this.specialtiesService.getSpecialtiesId(sp).subscribe((data) => {
              console.log(data);
              this.specialitiesAssigned.push(data.payload[0]);
            },
            error => {
              console.log(error)
            }
            );
          }
        }

        console.log(this.specialitiesAssigned);
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
  validRUN(run:string){
    this.cpfvalid = validate(run);
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
   //console.log(this.formUser[0], this.formUser[1], this.formUser[3], this.formUser[4], this.formUser[5]);

    switch (this.userType) {
      case 'admins':
        if (this.formUser[0].valid && this.formUser[1].valid) {
          return true;
        } else {
          return false;
        }
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
        ...(this.formUser[0].value.document === 'run' && { run: this.formUser[0].value.idDocumentNumber || '' }),

        passport: this.formUser[0].value.passport || '',
        ...(this.formUser[0].value.extraDocument === 'idDocumentNumber' && {
          idDocumentNumber: this.formUser[0].value.extraIdDocument || '',
        }),
        isForeign: this.isForeign,
      },
      personalData: {
        isSchool: this.isSchool,
        name: this.formUser[1].value.name,
        lastName: this.formUser[1].value.lastName,
        //motherName: this.formUser[1].value.motherName,
        secondLastName: this.formUser[1].value.secondLastName,
        email: this.formUser[1].value.email,
        phoneNumber: this.formUser[1].value.phoneNumber,
        birthdate: this.dateAdapter.toModel(this.formUser[1].value.birthdate),
        gender: this.formUser[1].value.gender,
        nacionality: this.formUser[1].value.nacionality,
        originCountry: this.formUser[1].value.originCountry || '',
        //inmigrationDate: this.dateAdapter.toModel(this.formUser[1].value.inmigrationDate) || '',
        education: this.formUser[1].value.education || '',
        healthInsurance: this.formUser[1].value.healthInsurance || '',
        //breed:' ',

      },
      addressData: {
        uf: this.formUser[1].value.uf,
        city: this.formUser[1].value.city,
        street: this.formUser[1].value.street,
        streetNumber: parseInt(this.formUser[1].value.streetNumber),
        complement: this.formUser[1].value.complement,
        zipcode: this.formUser[1].value.zipcode,
      },
      profiles: _profiles,
      waitingRooms: this.waitingRoomsAssigned,
      specialities: _specialities,
      professionalData: {
        biography: this.formUser[3].value.biography,
        professionalTitle: this.formUser[4].value.professionalTitle,
        university: this.formUser[4].value.university,
        course: this.formUser[4].value.course,
        ufRegistry: this.formUser[4].value.ufRegistry, //his.formUser[4].value.ufRegistry._id,
        professionalRegistryType: this.formUser[4].value.professionalRegistryType,
        professionalRegistry: this.professionalRegistry,
        ufProfessionalRegistry: this.formUser[4].value.ufProfessionalRegistry,
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

    // console.log(this.formUser[0].value.birthdate);
    console.log(this.userObject);

    if (this.userType !== 'patients') {
      if (this.profilesAssigned.length && this.waitingRoomsAssigned.length) {
        this.adminService.updateUser(this.userType, this.userObject).subscribe(
          (res) => {
            console.log(res);
            this.spinner.hide();
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
          console.log(res);
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
  getPrevissions(){
    this.userService.getPrevissions().subscribe((data)=>{
      this.previsionHealth = data.payload 
    })
  }

  getUfs() {
    this.userService.getStates().subscribe((data) => {
      console.log(data);
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

  addProfessionalRegistry() {
    this.professionalRegistry.push({
      university: this.professionalForm.value.university,
      professionalTitle: this.professionalForm.value.professionalTitle,
    });

    this.professionalRegistrySend.push({
      university: this.professionalForm.value.university,
      professionalTitle: this.professionalForm.value.professionalTitle,
    });
     
    this.professionalForm.controls['professionalRegistryType'].setValue(' ');
    this.professionalForm.controls['professionalRegistry'].setValue(' ');
    this.professionalForm.controls['ufProfessionalRegistry'].setValue(' ');
    this.professionalForm.controls['university'].setValue(' ');
    this.professionalForm.controls['professionalTitle'].setValue(' ');
    this.professionalForm.controls['course'].setValue(' ');
    this.professionalForm.controls['ufRegistry'].setValue(' ');
  }

  removeRegistry(index) {
    this.professionalRegistry.splice(index, 1);
  }

  updateProfilePhoto(event: any) {
    console.log('subiendo foto', event)
    this.adminService.uploadUserProfilePhoto(event.target.files[0], '')
      .then(data => {
        this.professionalPhoto = data;
      })
      .catch(err => {

      })
  }
}
