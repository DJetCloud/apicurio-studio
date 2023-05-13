import { Component, EventEmitter, Output } from '@angular/core';
import { OrganisationOverviewService } from '../../../../../services/organisation.service';
import { ConfigService } from '../../../../../services/config.service';
import { StoredOrganisation } from '../../../../../models/stored-organisation.model';
import { OrganisationModel } from '../../../../../models/organisation.model';

@Component({
  selector: 'organisation-editor',
  templateUrl: './organisation-editor.component.html',
  styleUrls: ['./organisation-editor.component.css']
})
export class OrganisationEditorComponent {

  @Output() onCreateOrganisation = new EventEmitter<OrganisationModel>();

  model: OrganisationModel;
  createOrganisation: boolean = false;
  public _isOpen: boolean = false;
  public _isLoaded: boolean = false;

  public _mode: string = "create";
  orgId: string;

  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();


  constructor(private organisationService: OrganisationOverviewService, private config: ConfigService)
   { 
    this.createOrganisation = false;
   }

  public initializeModelFromEntity(entity: StoredOrganisation): void {
    this.model = {
        id:entity.orgId,
        name: entity.name,
        email: entity.email,
        description: entity.description,
        createdBy: entity.createdBy,
        createdOn: entity.createdOn
    };
    this.orgId = entity.id;
    this._mode = "edit";
  }
 
  public open(entity?: StoredOrganisation) {
    if (entity) {
        this.initializeModelFromEntity(entity);
    } else {
        this.initializeModel();
    }
    this._isOpen = true;
    this._isLoaded = true;
  }

  public cancel() {
    this._isOpen = false;
  }

  public initializeModel(): void {
    this.model = {
        name: "",
        description: "",
        email: "",
        id: null,
        createdBy: "",
        createdOn: new Date(),
    };
    this.orgId = null;
    this._mode = "create";
  }

  public isValid(): boolean {
    return !!this.model.name?.trim() && !!this.model.email?.trim();
  }

  public submit() {
    let action: Promise<any>;
    if (this._mode == "create") {
        action = this.organisationService.createStoredOrganisation({
            name: this.model.name,
            description: this.model.description,
            email: this.model.email,
            id:this.model.id
        });
    } else {
        action = this.organisationService.updateStoredOrganisation(this.orgId, {
            name: this.model.name,
            description: this.model.description,
            email: this.model.email,
            
        });
    }
    action.then(_ => {
        this.onSubmit.emit();
        this.cancel();
    }).catch(error => {
        console.error(error);
        this.cancel();
    })
  }

  public submitText(): string {
    return this._mode == "create"
        ? "Create Organisation"
        : "Save";
  }

  
  public pageHeader(): string {
    return this._mode == "create"
        ? "Create Organisation"
        : "Edit the Organisation";
  }

  public isOpen(): boolean {
    return this._isOpen;
  }


  public isLoaded(): boolean {
    return this._isLoaded;
  }
}
