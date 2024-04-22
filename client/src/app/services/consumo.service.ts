import { Injectable } from '@angular/core';
import { alimentosModel, consumoModel } from '../models/models';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {

  constructor(private http: HttpClient) { }
  domain: string="http://localhost:3000";
  getConsumo() {
    return this.http.get<consumoModel[]>(`${this.domain}/api/consumo`).pipe(
      map(res => res)
    );
  }

  addConsumo(newConsumo: consumoModel){
    return this.http.post<consumoModel>(`${this.domain}/api/consumo`,newConsumo).pipe(
      map(res => res)
      );
  }

  deleteConsumo(id: string){
    return this.http.delete<consumoModel>(`${this.domain}/api/consumo/${id}`).pipe(
      map(res => res)
      );
  }
  updateConsumo(newConsumo: consumoModel) {
    return this.http.put(`${this.domain}/api/consumo/${newConsumo._id}`, newConsumo).pipe(
      map(res => res)
    );
  }
  //get de otras colecciones
  getCategorias(): Observable<alimentosModel[]> {
    return this.http.get<alimentosModel[]>(`${this.domain}/api/categoria`).pipe(
      catchError((error: any) => throwError('Error al cargar categoria'))
    );
  }
  getAlimentos(): Observable<alimentosModel[]> {
    return this.http.get<alimentosModel[]>(`${this.domain}/api/alimento`).pipe(
      catchError((error: any) => throwError('Error al cargar categoria'))
    );
  }
}
