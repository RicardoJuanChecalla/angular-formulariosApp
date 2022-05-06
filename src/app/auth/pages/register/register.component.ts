import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
// import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validations';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  //emailErrorMsg: string = '';

  get emailErrorMsg(): string{
    const errors = this.miFormulario.get('email')?.errors;
    if( errors?.['required'] ){
      return 'El correo electrónico es obligatorio';
    }else if(errors?.['pattern']){
      return 'El correo electrónico no tiene el formato correcto';
    }else if(errors?.['emailTomado']){
      return 'El correo electrónico ya fue tomado';
    }
    return '';
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern )]],
    email: ['', [Validators.required, Validators.pattern( this.validatorService.emailPattern )], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider ]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  },{
    validators: [ this.validatorService.camposIguales('password','password2') ]
  });

  constructor(private fb: FormBuilder,
      private validatorService: ValidatorService,
      private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Ricardo Checalla',
      email: 'test1@test.com',
      username: 'test1',
      password: '123456',
      password2: '123456',
    });
  }

  campoValido(campo: string){
    return this.miFormulario.controls[campo]?.invalid &&
      this.miFormulario.controls[campo]?.touched;
  }

  // emilRequired(){
  //   return this.miFormulario.get('email')?.errors?.['required'] &&
  //    this.miFormulario.get('email')?.touched;
  // }

  // emilFormato(){
  //   return this.miFormulario.get('email')?.errors?.['pattern'] &&
  //    this.miFormulario.get('email')?.touched;
  // }

  // emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.['emailTomado'] &&
  //    this.miFormulario.get('email')?.touched;
  // }

  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
