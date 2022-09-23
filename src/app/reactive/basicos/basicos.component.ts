import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent {

  constructor(private fb: FormBuilder) { }

  // miFormulario: FormGroup = new FormGroup({
  //   nombre: new FormControl('RTX 4080ti'),
  //   precio: new FormControl(0),
  //   existencias: new FormControl(0)
  // })

  miFormulario: FormGroup = this.fb.group({
    nombre: [ , [Validators.required, Validators.minLength(3)] ],
    precio: [ , [Validators.required,Validators.min(0)] ],
    existencias: [ , [Validators.required,Validators.min(0)] ]
  })

  //esta validacion se le pasa a cada input en el que tengamos validaciones basicas y queremos
  //que muestre en mensaje de error utilizando ngIf, en este caso los 
  //tres campos tienen validación en estos campos vamos a pedir un argumento que va a ser el 
  //formControlName="" y este va a ser el control que se va a evaluar, de esta manera no tenemos
  //que crear un metodo individual para cada input

  //este metodo regresa true si hay errores y si los campos se han tocado, esto lo utilizaremos junto con
  //la funcion markAllAsTouched() en el metodo guardar() para poder activar los errores en caso de que se
  //intente mandar el formulario sin siquiera rellenar los campos
  campoNoValido(campo: string){
    return this.miFormulario.controls[campo].errors 
    && this.miFormulario.controls[campo].touched
  }


  guardar(){
    if(this.miFormulario.invalid){
      
      //este metodo marca todos los campos como tocados, que junto al metodo campoNoValido()
      //lo vamos a utilizar para activar los mensajes de error
      this.miFormulario.markAllAsTouched()
      return
    }
    //una vez que se manda resetea los valores del formulario, por defecto se resetean a valores vacios
    //si se desea resetearlos a unos valores especificos tenemos que indicarlos en el ngOnInit de la siguiente forma
    /*ngOnInit(){
      this.miFormulario.reset({
        nombre: 'un nombre'
        precio: un precio
        existencias: un numero
      })
      si no se indica alguno de los valores se resetea a un valor vacio
    }*/
    this.miFormulario.reset()
    console.log(this.miFormulario.value)
  }
 


}
