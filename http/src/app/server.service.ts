import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

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
    const invalidUrl = 'https://udemy-ng-http-2981b.firebaseio.com/data';
    return this.http.get(invalidUrl)
      .map(
        (response: Response) => {
          const data = response.json();
          for (const server of data) {
            server.name = 'FETCHED_' + server.name;
          }
          return data;
        }
      )
      .catch(
        (error: Response) => Observable.throw('Something went wrong.')
      );
  }

  getAppName() {
    return this.http.get('https://udemy-ng-http-2981b.firebaseio.com/appName.json')
      .map(
        (response: Response) => response.json()
      );
  }

}
