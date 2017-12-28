import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  logChange(change: string): void {
    console.log(change);
  }

}
