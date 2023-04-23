import { Injectable } from '@angular/core';
import { LoginSession } from '../models/login-session';
import {AbstractHubService} from "./hub";
import {IAuthenticationService} from "./auth.service";
import { HttpClient } from '@angular/common/http';
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class LoginSessionService extends AbstractHubService{

 constructor(http: HttpClient, authService: IAuthenticationService, config: ConfigService) {
     super(http, authService, config);
 }

  public getLoginSession(): Promise<LoginSession[]> {
    
    let url = "https://microcks.djai.app/rest/DJAI+Device+Sessions/1.0.0/device-sessions";
    let options: any = this.options({ "Accept": "application/json" });

    return this.httpGet<LoginSession[]>(url, options);
}
}
