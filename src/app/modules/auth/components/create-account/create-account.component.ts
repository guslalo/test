import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray  } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { registerUser } from '../../../../models/registerUser';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['../login/login.component.scss']
})



export class CreateAccountComponent implements OnInit   {

  public userRegister: registerUser;

  model: NgbDateStruct;
  date: {year: number, month: number};

  public password: any;
  public user: any = { };
  //public form:any;
  onClick(index: number): void {
    //this.selectedIndex = index;
  }

  isLinear = false;
  formUno:FormGroup;
  formDos: FormGroup;
  formTres: FormGroup;
  formCuatro: FormGroup;
  form = [];
  
  constructor(
    private router: Router, 
    private registerUser:RegisterService, 
    private _formBuilder: FormBuilder,
    private calendar: NgbCalendar
    ) { }


  ngOnInit(): void {

    this.formUno = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      secondlastName: [null ],
      email: [null, [ Validators.email, Validators.required, Validators.minLength(2)]],
      gender: [null, [Validators.required, Validators.minLength(2)]],
      confirmEmail: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.formDos = this._formBuilder.group({
      birthdate: ['', Validators.required],
      ufBirth: ['',  Validators.required],
      municipalityBirth: ['', Validators.required],
      nacionality: ['', Validators.required]   
    });
    this.formTres = this._formBuilder.group({
      cep: ['', Validators.required],
      uf: ['', Validators.required],
      city: ['', Validators.required],
      neighborhood: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required]
    });
    this.formCuatro = new FormGroup({
      'password': new FormControl('',[
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}$/),
      ]),
      'confirmPassword':  new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
    }, { 
      validators: this.confirmPass.bind(this)  
    },
    );
    this.form.push(
      this.formUno.controls, 
      this.formDos.controls, 
      this.formTres.controls,
      this.formCuatro.controls
    )
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

 
  mostrarForm(form){
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
 
  crearCuenta(){
    console.log(this.form);
    const formObject = {
      personalData:{
        name:this.form[0].name.value,
        lastName:this.form[0].lastName.value,
        gender:this.form[0].gender.value,
        postalCode:"",
        phoneNumber:this.form[0].phoneNumber.value,
        email:this.form[0].email.value
      },
      birthData:{
        birthdate:this.form[1].birthdate.value.toString(),
        ufBirth:this.form[1].ufBirth.value,
        municipalityBirth:this.form[1].municipalityBirth.value,
        nacionality:this.form[1].nacionality.value,
      },
      addressData:{
        cep:this.form[2].cep.value,
        uf:this.form[2].uf.value,
        city:this.form[2].city.value,
        neighborhood:this.form[2].neighborhood.value,
        street:this.form[2].street.value,
        streetNumber:this.form[2].streetNumber.value
      },
      password:this.form[3].password.value
    }
 
    if (formObject) {
      this.registerUser.registerUser(
        formObject.personalData, 
        formObject.birthData, 
        formObject.addressData, 
        formObject.password
        ).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/']);
        },
        error => {
          console.log(error)
        }
      ) 
    }
  }

  submit() {
   console.log(this.form);
  }

  
}
