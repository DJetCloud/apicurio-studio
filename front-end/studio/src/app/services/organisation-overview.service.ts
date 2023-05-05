import { Injectable } from '@angular/core';
import { Organisation } from '../models/organisation';
import {AbstractHubService} from "./hub";
import {IAuthenticationService} from "./auth.service";
import {HttpClient} from '@angular/common/http';
import {ConfigService} from "./config.service";
@Injectable({
  providedIn: 'root'
})
export class OrganisationOverviewService extends AbstractHubService {

  constructor(http: HttpClient, authService: IAuthenticationService, config: ConfigService) {
    super(http, authService, config);
   }

   public getOverviewInformation(): Promise<Organisation[]> {
    
    let url: string = 'https://microcks.djai.app/rest/DJAI/1.0.0/orgs';
    let options: any = this.options({ "Accept": "application/json" });

    return this.httpGet<Organisation[]>(url, options);
 }
}
