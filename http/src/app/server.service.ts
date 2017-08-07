import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ServerService {
  private url = 'https://udemy-ng-http-2981b.firebaseio.com/data.json';

  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    return this.http.post(this.url, servers);
  }

}
