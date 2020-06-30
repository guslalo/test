import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  //public password: any;
  //@Input() password: string;
  public password: any;
  public user: any = { };
  public form:any;
  constructor(private router: Router) {
    this.form = new FormGroup({
      'nombre': new FormControl('', [
        Validators.required,
        //Validators.minLength(3)
      ]),
      'apellidos': new FormControl('', [
        Validators.required
      ]),
      'email': new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      'rut': new FormControl('',[
        Validators.required
      ]),
      'edad': new FormControl('',[
        Validators.required
      ]),
      'password': new FormControl('',[
        Validators.required,
        //Validators.pattern('/^(?=.[A-Z])(?=.[0-8]).{8,}$')
        Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z]).{8,20}$/)
      ]
      ),
      'confirmPasword': new FormControl('',[
        Validators.required,
        Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z]).{8,20}$/)
      ]),
    });
    
   }

  ngOnInit(): void {
    
  }

  onFocus(){
    
  }
  crearCuenta(){
    if (this.form.valid) {
      console.log(this.form.value);
      this.router.navigate(['/mi-salud']);
    }
  
  }
  submit() {
    console.log(this.form.value);
    console.log(this.form );
  }

}
