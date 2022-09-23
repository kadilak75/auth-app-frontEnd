import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {


  // string que contiene la arquitectura de una RegExp
  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  regex: RegExp = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');



  //Validacion personalizada, recibe el valor de un campo y si no cumple las condiciones
  //regresamos cualquier objeto con un valor true, esto le indica al ReactiveForms que el
  //campo no es valido, si regresamos null el campo es valido
  noPuedeSerStrider(control: FormControl):ValidationErrors|null{
    console.log(control.value)
    const valor = control.value?.trim().toLowerCase()
    if(valor === 'strider'){
      return {noStrider: true}
    }
    return null
    console.log(valor)
  }

  camposIguales(campo1: string, campo2: string) {
   
    return (formGroup: AbstractControl): ValidationErrors | null => {
       
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({noIguales: true});
        return {noIguales: true}
      }

      formGroup.get(campo2)?.setErrors(null);
      return null
    }
  }

  constructor() { }



}



