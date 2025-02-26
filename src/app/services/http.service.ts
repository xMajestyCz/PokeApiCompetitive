import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 1304, offset: number = 0) {
    return this.http.get(`${this.apiUrl}pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetails(name: string) {
    return this.http.get(`${this.apiUrl}pokemon/${name}`);
  }
}
