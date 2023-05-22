import {Injectable} from '@angular/core';
import {OrganisationModel} from '../models/organisation.model';
import {AbstractHubService} from "./hub";
import {IAuthenticationService} from "./auth.service";
import {HttpClient} from '@angular/common/http';
import {ConfigService} from "./config.service";
import {NewOrganisation} from '../models/new-organisation.model';
@Injectable({
  providedIn: 'root'
})
export class OrganisationService extends AbstractHubService {

  constructor(http: HttpClient, authService: IAuthenticationService, config: ConfigService) {
    super(http, authService, config);
  }

  public getOverviewInformation(): Promise<OrganisationModel[]> {

    let url: string = this.endpoint('/orgs');
    let options: any = this.options({ "Accept": "application/json" });

    return this.httpGet<OrganisationModel[]>(url, options);
  }

  public createOrganisation(organisation: OrganisationModel): Promise<OrganisationModel> {

    let url: string = this.endpoint('/orgs');;
    let options: any = this.options({ "Accept": "application/json" });

    return this.httpPostWithReturn<NewOrganisation, OrganisationModel>(url, organisation, options);
  }

  public updateOrganisation(orgId: string, organisationTemplate: OrganisationModel): Promise<void> {

    let organisationTemplateUrl: string = this.endpoint("/orgs/:orgId", {
      orgId: orgId
    });
    let options: any = this.options({ "Accept": "application/json" });

    return this.httpPut<OrganisationModel>(organisationTemplateUrl, organisationTemplate, options);
  }

  public deleteOrganisation(orgId: string): Promise<void> {

    let url: string = this.endpoint("/orgs/:orgId", {
      orgId: orgId
    });
    let options: any = this.options({ "Accept": "application/json" });

    return this.httpDelete(url, options);
  }
}
