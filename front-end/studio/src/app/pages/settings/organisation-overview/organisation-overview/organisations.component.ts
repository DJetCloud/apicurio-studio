import {Component, ViewChild} from '@angular/core';
import {OrganisationService} from '../../../../services/organisation.service';
import {AbstractPageComponent} from '../../../../components/page-base.component';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {OrganisationModel} from '../../../../models/organisation.model';
import {StoredOrganisation} from '../../../../models/stored-organisation.model';
import {OrganisationEditorComponent} from './_components/organisation-editor.component';
import {ConfirmDeleteDialogComponent} from '../../../../components/dialogs/confirm-delete.component';
@Component({
  selector: 'app-organisations-overview',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.css']
})
export class OrganisationsComponent extends AbstractPageComponent {

  private organisations: OrganisationModel[];

  @ViewChild("organisationCreator", { static: true }) organisationCreator: OrganisationEditorComponent;
  @ViewChild("confirmDeleteModal", { static: true }) confirmDeleteModal: ConfirmDeleteDialogComponent;


  constructor(private organisationService: OrganisationService, route: ActivatedRoute, titleService: Title) {
    super(route, titleService);
  }

  protected pageTitle(): string {
    return "DJAI - Settings - Organisations";
  }

  public loadAsyncPageData(): void {
    this.organisationService.getOverviewInformation().then(organisations => {
      this.organisations = organisations;
      this.loaded("organisations");
    }).catch(error => {
      this.error(error);
    });
  }

  public createOrganisation() {
    this.organisationCreator.open();
  }

  public editOrganisation(organistaion: StoredOrganisation) {
    this.organisationCreator.open(organistaion);
  }

  public deleteOrganisation(orgId: string) {
    this.confirmDeleteModal.onDelete.subscribe(_ =>
      this.organisationService.deleteStoredOrganisation(orgId).then(_ => {
        this.loadAsyncPageData();
      }).catch(error => {
        this.error(error);
      })
    );
    this.confirmDeleteModal.open();
  }

}
