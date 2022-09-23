import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {delay, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{

  constructor(private http: HttpClient) { }

  //el metoon 
  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {

    const email = control.value

    return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${email }`)
    .pipe(
      delay(3000),
      map( resp =>{
        return (resp.length === 0 )
        ?null
        :{emailTomado: true}
      })
    );
   
  }
}

