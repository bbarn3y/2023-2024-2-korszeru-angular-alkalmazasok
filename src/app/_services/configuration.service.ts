import { Injectable } from '@angular/core';
import {Configuration} from "@models/configuration";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  static config: Configuration;

  constructor() { }

  static fetchConfiguration(): Promise<Configuration> {

  }

  static loadConfiguration() {

  }
}
