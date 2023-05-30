import {Injectable} from '@angular/core';
import {OrganizationModel} from '../models/organization.model';
import {AbstractHubService} from "./hub";
import {IAuthenticationService} from "./auth.service";
import {HttpClient} from '@angular/common/http';
import {ConfigService} from "./config.service";
import {NewOrganization} from '../models/new-organization.model';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends AbstractHubService {

  constructor(http: HttpClient, authService: IAuthenticationService, config: ConfigService) {
    super(http, authService, config);
  }

  public getOverviewInformation(): Promise<OrganizationModel[]> {

    let url: string = this.endpoint('/orgs');
    let options: any = this.options({ "Accept": "application/json" });

    return this.httpGet<OrganizationModel[]>(url, options);
  }

  public createOrganization(organization: OrganizationModel): Promise<OrganizationModel> {

    let url: string = this.endpoint('/orgs');;
    let options: any = this.options({ "Accept": "application/json" });

    return this.httpPostWithReturn<NewOrganization, OrganizationModel>(url, organization, options);
  }

  public updateOrganization(orgId: string, organizationTemplate: OrganizationModel): Promise<void> {

    let organizationTemplateUrl: string = this.endpoint("/orgs/:orgId", {
      orgId: orgId
    });
    let options: any = this.options({ "Accept": "application/json" });

    return this.httpPut<OrganizationModel>(organizationTemplateUrl, organizationTemplate, options);
  }

  public deleteOrganization(orgId: string): Promise<void> {

    let url: string = this.endpoint("/orgs/:orgId", {
      orgId: orgId
    });
    let options: any = this.options({ "Accept": "application/json" });

    return this.httpDelete(url, options);
  }
}
