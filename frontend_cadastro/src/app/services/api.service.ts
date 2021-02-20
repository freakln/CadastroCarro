import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Carro} from '../core/models/carroModel';

const baseUrl = 'http://localhost:3333/carro';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }


  createCarro(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(baseUrl, carro);
  }

  retrieve(): Observable<any> {
    return this.http.get<any>(baseUrl);
  }

  updateCarro(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
