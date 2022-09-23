import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Maurizio Olivastri',
      email: 'mailexample@mail.com',
      username: 'Molivastri24'
    })
  }

  //AQUI TEMPORALMENTE
  
  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  regex: RegExp = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');



  //Validacion personalizada, recibe el valor de un campo y si no cumple las condiciones
  //regresamos cualquier objeto con un valor true, esto le indica al ReactiveForms que el
  //campo no es valido, si regresamos null el campo es valido
  noPuedeSerStrider(control: FormControl){
    console.log(control.value)
    const valor = control.value?.trim().toLowerCase()
    if(valor === 'strider'){
      return {noStrider: true}
    }
    return null
    console.log(valor)
  }

  constructor( private fb: FormBuilder,
                private validator: ValidatorService,
                private mailValidator: EmailValidatorService) { }

  miFormulario: FormGroup = this.fb.group({
    //Validators.pattern() evalua el campo junto a una RegExp, se le puede pasar como ARG un string con esta
    //arquitectura o una RegExp ya compilada
    nombre:    ['',[ Validators.required, Validators.pattern(this.validator.nombreApellidoPattern) ] ],
    email:     ['',[ Validators.required, Validators.pattern(this.validator.regex) ],[this.mailValidator] ],
    username:  ['',[ Validators.required, this.validator.noPuedeSerStrider]],
    password:  ['',[ Validators.required, Validators.minLength(6) ] ],
    confirmar: ['',[ Validators.required,] ],
  },{
    validators: [ this.validator.camposIguales('password','confirmar') ]
  
  })

  



  //regresa el estado de la propiedad invalid y si fue tocado el campo
  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid
            &&this.miFormulario.get(campo)?.touched
  }


  
  submitFormulario(){

    console.log(this.miFormulario.value)
    //marca todos los campos como tocados para que aparezcan los errores
    this.miFormulario.markAllAsTouched();
  }

  get emailErrorMsg(){
    
    const errors = this.miFormulario.get('email')?.errors

    if (errors?.required){
      return 'Email es Obligatorio'
    }else if(errors?.pattern){
      return 'El Email no es correcto' 
    }else if(errors?.emailTomado){//error que proviene del email-validator.service que valida si el email ya existe
      return 'El email ya existe'
    }

    return ''
  }


}
