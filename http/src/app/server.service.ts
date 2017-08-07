import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ServerService {
  private url = 'https://udemy-ng-http-2981b.firebaseio.com/data.json';

  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.url, servers, {headers: headers});
  }

  getServers() {
    return this.http.get(this.url);
  }

}
