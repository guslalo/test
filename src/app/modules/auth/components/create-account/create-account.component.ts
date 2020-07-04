import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray  } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';






@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})



export class CreateAccountComponent implements OnInit   {
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
    //this.validForm();
    this.formUno = this._formBuilder.group({
      nombre: [null, [Validators.required, Validators.minLength(2)]],
      apellidos: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [ Validators.email, Validators.required, Validators.minLength(2)]],
      sexo: [null, [Validators.required, Validators.minLength(2)]],
      razonSocial: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.formDos = this._formBuilder.group({
      nacimiento: ['', Validators.required],
      ufNacimiento: ['',  Validators.required],
      municipio: ['', Validators.required],
      nacionalidad: ['', Validators.required]   
    });
    this.formTres = this._formBuilder.group({
      cep: ['', Validators.required],
      uf: ['', Validators.required],
      ciudad: ['', Validators.required],
      barrio: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required]
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

  validarForm(){
    this.formUno = this._formBuilder.group({
      nombre: [null, [Validators.required, Validators.minLength(2)]],
      apellidos: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [ Validators.email, Validators.required, Validators.minLength(2)]],
      sexo: [null, [Validators.required, Validators.minLength(2)]],
      razonSocial: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.formDos = this._formBuilder.group({
      nacimiento: ['', Validators.required],
      ufNacimiento: ['',  Validators.required],
      municipio: ['', Validators.required],
      nacionalidad: ['', Validators.required]   
    });
    this.formTres = this._formBuilder.group({
      cep: ['', Validators.required],
      uf: ['', Validators.required],
      ciudad: ['', Validators.required],
      barrio: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required]
    });
    /*this.form = new FormGroup({
      'password': new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}$/),
      ]),
      'confirmPassword':  new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])),
    }, { 
      validators: this.confirmPass.bind(this)  
    },
  );*/
    /*
    this.formCuatro = this._formBuilder.group({
      'password': ['', [Validators.required,  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}$/)]],
      'confirmPassword':  new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
    }, { 
      validators: this.confirmPass.bind(this)  
    },
    ) */
  }
  /*
  validForm(){
    this.form = new FormGroup({
      'nombre': new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      'apellidos': new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      'email': new FormControl('',[
        Validators.minLength(2),
        Validators.email,
        Validators.required
      ]),
      'telefono': new FormControl('',[
        Validators.minLength(2),
        Validators.required
      ]),
      'rut': new FormControl('',[
        Validators.minLength(2),
        Validators.required
      ]),
      'edad': new FormControl('',[
        Validators.minLength(1),
        Validators.required
      ]),
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
  console.log(this.form);
}*/
  mostrarForm(form){
    console.log(form.controls);
  }

  confirmPass(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
 
  crearCuenta(){
    console.log(this.form);
    const formObject = {
      email:this.form[0].email.value,
      password:this.form[3].password.value,
    }
    if (formObject) {
      this.registerUser.registerUser(formObject.email, formObject.password).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/mis-pacientes']);
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

  stepper(){
    
  }

}
