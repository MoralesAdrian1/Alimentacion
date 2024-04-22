import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { alimentosModel } from '../models/models';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlimentosService {

  constructor(private http: HttpClient) { }
  domain: string="http://localhost:3000";
  getAlimentos() {
    return this.http.get<alimentosModel[]>(`${this.domain}/api/alimento`).pipe(
      map(res => res)
    );
  }

  addAlimentos(newAlimentos: alimentosModel){
    return this.http.post<alimentosModel>(`${this.domain}/api/alimento`,newAlimentos).pipe(
      map(res => res)
      );
  }

  deleteAlimentos(id: string){
    return this.http.delete<alimentosModel>(`${this.domain}/api/alimento/${id}`).pipe(
      map(res => res)
      );
  }
  updateAlimentos(newAlimentos: alimentosModel) {
    return this.http.put(`${this.domain}/api/alimento/${newAlimentos._id}`, newAlimentos).pipe(
      map(res => res)
    );
  }
  getCategorias(): Observable<alimentosModel[]> {
    return this.http.get<alimentosModel[]>(`${this.domain}/api/categoria`).pipe(
      catchError((error: any) => throwError('Error al cargar categoria'))
    );
  }
}