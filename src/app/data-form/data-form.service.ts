import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {Usuario} from '../shared/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class DataFormService {

  baseUrl = "http://localhost:3000"

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

 /*  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })

  } */
create(usuario): Observable<Usuario> {
  
  return this.http.post<Usuario>(this.baseUrl + '/usuario',
  JSON.stringify(usuario), this.httpOptions);
}

read(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(this.baseUrl + '/usuario')
}
}
