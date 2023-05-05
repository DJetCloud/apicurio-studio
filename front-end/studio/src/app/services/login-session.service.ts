import {Injectable} from '@angular/core';
import {LoginSession} from '../models/login-session';
import {AbstractHubService} from "./hub";
import {IAuthenticationService} from "./auth.service";
import {HttpClient} from '@angular/common/http';
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class LoginSessionService extends AbstractHubService{

    constructor(http: HttpClient, authService: IAuthenticationService, config: ConfigService) {
     super(http, authService, config);
    }

    public getLoginSession(): Promise<LoginSession[]> {
    
     let url: string = this.endpoint("/device-sessions");
     let options: any = this.options({ "Accept": "application/json" });

     return this.httpGet<LoginSession[]>(url, options);
  }

    public deleteLoginSessionById(id: string): Promise<void> {
      console.info("[LoginSessionService] Deleting the Login Session for id %s", id);

      let apiDeviceSessionUrl: string = this.endpoint("/device-sessions/:id", {
        id: id
      });
      let options: any = this.options({ "Accept": "application/json" });

      console.info("[LoginSessionService] Deleting an Login Session: %s", apiDeviceSessionUrl);
      return this.httpDelete(apiDeviceSessionUrl, options);
  }
}
