import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { OrganisationOverviewService } from '../../../../../services/organisation-overview.service';
import { IAuthenticationService } from '../../../../../services/auth.service';
import { ConfigService } from '../../../../../services/config.service';
import { Organisation } from '../../../../../models/organisation';
export interface CreateOrganisation {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-organisation-editor',
  templateUrl: './organisation-editor.component.html',
  styleUrls: ['./organisation-editor.component.css']
})
export class OrganisationEditorComponent {

  @Output() onCreateOrganisation = new EventEmitter<CreateOrganisation>();

  model: CreateOrganisation = {
    id: "",
    name: "",
    description: "",
};
  createOrganisation: boolean = false;
  public _isOpen: boolean = false;

  constructor(private organisationOverview: OrganisationOverviewService, private config: ConfigService)
   { 
    this.createOrganisation = false;
   }

  public creatingOrganisation(): void {
    this.createOrganisation = true;
    this.onCreateOrganisation.emit(this.model);
  }

  public initializeModelFromEntity(entity: Organisation): void {
    this.model = {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        
    };

}
 
public open(entity?: Organisation) {
  if (entity) {
      console.debug(`[TemplateEditorComponent] Editing template ${entity.name}`)
      this.initializeModelFromEntity(entity);
  } else {
      this.initializeModel();
  }
  this._isOpen = true;
}

public initializeModel(): void {
  this.model = {
      id: "",
      name: "",
      description: "",

  };

}


}
