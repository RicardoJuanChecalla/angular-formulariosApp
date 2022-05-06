import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})

export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup =  new FormGroup({
  //   nombre: new FormControl('pepe'),
  //   precio: new FormControl(0),
  //   existencias: new FormControl(0)
  // });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'pepe',
      precio: 5,
//      existencias: 1, 
    });
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required, Validators.min(0)] ],
    existencias: [, [Validators.required, Validators.min(0)]],
  });

  campoValido(campo: string){
    return this.miFormulario.controls[campo]?.errors && 
      this.miFormulario.controls[campo]?.touched;
  }

  guardar(){
    if ( this.miFormulario.invalid )
    {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}
