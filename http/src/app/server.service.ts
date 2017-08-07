import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class ServerService {
  private url = 'https://udemy-ng-http-2981b.firebaseio.com/data.json';

  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    const headers = new Headers({'Content-Type': 'application/json'});
    // return this.http.post(this.url, servers, {headers: headers});
    return this.http.put(this.url, servers, {headers: headers});
  }

  getServers() {
    return this.http.get(this.url)
      .map((response: Response) => {
        const data = response.json();
        for (const server of data) {
          server.name = 'FETCHED_' + server.name;
        }
        return data;
      });
  }

}
