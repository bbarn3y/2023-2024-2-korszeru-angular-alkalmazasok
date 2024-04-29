import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  static randomId(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }


}
