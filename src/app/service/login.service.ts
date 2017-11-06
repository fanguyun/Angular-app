import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {
    constructor(private http: Http) { }

    loginIn() {
      return this.http
        .get(`https://api.github.com/orgs/angular/members?page=1&per_page=5`)
        .map(res => res.json())
    }
}
