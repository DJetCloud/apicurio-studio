import {Component, ViewChild} from '@angular/core';
import {OrganizationService} from '../../../services/organization.service';
import {AbstractPageComponent} from '../../../components/page-base.component';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {OrganizationModel} from '../../../models/organization.model';
import {OrganizationEditorComponent} from './_components/organization-editor.component';
import {ConfirmDeleteDialogComponent} from '../../../components/dialogs/confirm-delete.component';

@Component({
  selector: 'app-organizations-overview',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent extends AbstractPageComponent {

  public organizations: OrganizationModel[];

  @ViewChild("organizationCreator", { static: true }) organizationCreator: OrganizationEditorComponent;
  @ViewChild("confirmDeleteModal", { static: true }) confirmDeleteModal: ConfirmDeleteDialogComponent;

  constructor(private organizationService: OrganizationService, route: ActivatedRoute, titleService: Title) {
    super(route, titleService);
  }

  protected pageTitle(): string {
    return "DJAI - Settings - Organizations";
  }

  public loadAsyncPageData(): void {
    this.organizationService.getOverviewInformation().then(organizations => {
      this.organizations = organizations;
      this.loaded("organizations");
    }).catch(error => {
      this.error(error);
    });
  }

  public createOrganization() {
    this.organizationCreator.open();
  }

  public editOrganization(organization: OrganizationModel) {
    this.organizationCreator.open(organization);
  }

  public deleteOrganization(orgId: string) {
    this.confirmDeleteModal.onDelete.subscribe(_ =>
      this.organizationService.deleteOrganization(orgId).then(_ => {
        this.loadAsyncPageData();
      }).catch(error => {
        this.error(error);
      })
    );
    this.confirmDeleteModal.open();
  }
}
