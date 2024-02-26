import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  login(): Observable<{ token: string }> {
    return this.http.get<{ token: string }>('https://mocki.io/v1/4b986d28-e3c8-4b39-90ca-80cec8d7d01d');
  }

}
