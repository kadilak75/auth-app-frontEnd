import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {


  //inicializamos el servicio FormBuilder
  constructor(private fb: FormBuilder) { }

  //creamos un objeto de tipo FormGroup
  miFormulario: FormGroup = this.fb.group({
    genero: ['M',Validators.required],
    notificaciones: [ ,Validators.required],
    //requiredTrue, porque si no lo marcaria valido siempre que las condiciones tengan un valor
    condiciones: [false,Validators.requiredTrue]
  })

  persona = {
    genero: 'F',
    notificaciones: true,
  }

  //va a inicializar los valores del formularip para que se correspondan con los de persona
  ngOnInit(): void {

    //se usa .reset y no .setValue porque los campos del objeto persona no se corresponden
    //con los de miFormulario, entonces esto manda error, .reset los inicializa y si no
    //existen los deja como null
    this.miFormulario.reset({
      ...this.persona,
      condiciones: false
    })
    //se pasa una copia del objeto y se inicializa siempre las condiciones como false
  }


  guardar(){
    
    const formValue = {...this.miFormulario.value};
    delete formValue.condiciones;
    this.persona = formValue;
  }

  

}
