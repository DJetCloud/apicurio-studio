import { Injectable } from '@angular/core';
import { OrganisationModel } from '../models/organisation/organisation.model';
import {AbstractHubService} from "./hub";
import {IAuthenticationService} from "./auth.service";
import {HttpClient} from '@angular/common/http';
import {ConfigService} from "./config.service";
import { NewOrganisation } from '../models/new-organisation.model';
import { UpdateOrganisationTemplate } from '../models/update-organisation-template.model';
@Injectable({
  providedIn: 'root'
})
export class OrganisationOverviewService extends AbstractHubService {

  constructor(http: HttpClient, authService: IAuthenticationService, config: ConfigService) {
    super(http, authService, config);
   }

   public getOverviewInformation(): Promise<OrganisationModel[]> {
    
    let url: string = this.endpoint('/orgs');
    let options: any = this.options({ "Accept": "application/json" });

    return this.httpGet<OrganisationModel[]>(url, options);
 }

  public createStoredOrganisation(organisation: NewOrganisation): Promise<OrganisationModel> {

    let url: string = this.endpoint('/orgs');;
    let options: any = this.options({ "Accept": "application/json" });

    return this.httpPostWithReturn<NewOrganisation, OrganisationModel>(url, organisation, options);
}

  public updateStoredOrganisation(orgId: string, organisationTemplate: UpdateOrganisationTemplate): Promise<void> {

    let organisationTemplateUrl: string = this.endpoint("/orgs/:orgId", {
      orgId: orgId
    });
    let options: any = this.options({ "Accept": "application/json" });

    return this.httpPut<UpdateOrganisationTemplate>(organisationTemplateUrl, organisationTemplate, options);
  }

  public deleteStoredOrganisation(orgId: string): Promise<void> {

    let url: string = this.endpoint("/orgs/:orgId", {
      orgId: orgId
    });
    let options: any = this.options({ "Accept": "application/json" });

    return this.httpDelete(url, options);
}
}
