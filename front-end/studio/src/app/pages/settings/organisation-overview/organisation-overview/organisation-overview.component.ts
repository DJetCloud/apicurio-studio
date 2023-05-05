import { Component, OnInit, ViewChild} from '@angular/core';
import { OrganisationOverviewService } from '../../../../services/organisation-overview.service';
import { AbstractPageComponent } from '../../../../components/page-base.component';

import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import { Organisation } from '../../../../models/organisation';
import { OrganisationEditorComponent } from './_components/organisation-editor.component';
@Component({
  selector: 'app-organisation-overview',
  templateUrl: './organisation-overview.component.html',
  styleUrls: ['./organisation-overview.component.css']
})
export class OrganisationOverviewComponent extends AbstractPageComponent {

  private organisations: Organisation[];

  @ViewChild("organisationCreator", { static: true }) organisationCreator: OrganisationEditorComponent;


  constructor(private organisationOverview: OrganisationOverviewService, route: ActivatedRoute, titleService: Title) {
  super(route, titleService);
  }

  protected pageTitle(): string {
    return "DJAI - Settings - Organisations";
    }

    public loadAsyncPageData(): void {
      this.organisationOverview.getOverviewInformation().then( organisations => {
          this.organisations = organisations;
          this.loaded("organisations");
      }).catch( error => {
          this.error(error);
      });
    }

    public createOrganisation() {
      this.organisationCreator.open();
  }

  }
