import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  nuevoFavorito: FormControl =  this.fb.control('', Validators.required);

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([],[Validators.required, Validators.minLength(1)]),
  });



  get favoritosArr(): FormArray {
    //return this.miFormulario.controls['favoritos']?.value;
    return this.miFormulario.get('favoritos') as FormArray;
  }

  campoValido(campo: string){
    return this.miFormulario.controls[campo]?.errors && 
      this.miFormulario.controls[campo]?.touched;
  }

  ngOnInit(): void {
  }

  guardar(){
    if ( this.miFormulario.invalid ){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
  }

  agregarFavorito(){
    if(this.nuevoFavorito.invalid){ return;}
    // this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ));
    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value, Validators.required));
    this.nuevoFavorito.reset();
  }

  borrar(index: number){
    this.favoritosArr.removeAt(index);
  }

}
