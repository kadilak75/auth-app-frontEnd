import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  constructor(private fb: FormBuilder) { }

 

  formularioDinamico: FormGroup = this.fb.group({
    nombre: ['' , [Validators.required, Validators.minLength(3) ] ],
    agregar: ['',[Validators.required, Validators.minLength(3) ] ],
    favoritos: this.fb.array([ 
      ['Metal Gear'],
      ['Death Stranding']
    ], Validators.required)
  })
//[ , [Validators.required] ],
  campoNoValido(campo: string){
    return this.formularioDinamico.controls[campo].errors
        && this.formularioDinamico.controls[campo].touched

  }

  guardar(){
    if(this.formularioDinamico.invalid){
      this.formularioDinamico.markAllAsTouched()
    }
    console.log(this.formularioDinamico.value)
  }

  //metodo para convertir el arreglo de FormControl que tenemos ('favoritos')
  //y convertirlo en un arreglo de FormArray para manipular mas facilmente
  get favoritosArr(){
    return this.formularioDinamico.get('favoritos') as FormArray
  }

  //nuevo objeto enlazado con el input que vamos a agregar al arreglo
  nuevoFavorito: FormControl = this.fb.control('',Validators.required);

  agregarFavorito(){
    if(this.nuevoFavorito.invalid){return;}

    //se crea un nuevo objeto porque nuevoFavorito está ligado al input y puede ocasionar problemas si se trabaja con el directamente
    this.favoritosArr.push(new FormControl (this.nuevoFavorito.value) );
    this.nuevoFavorito.reset()
  }


  //recibe el index del elemento y lo borra
  borrar(index: number){

    this.favoritosArr.removeAt(index);

  }
 
  impr(event: any){
    console.log(event)
  }
}
