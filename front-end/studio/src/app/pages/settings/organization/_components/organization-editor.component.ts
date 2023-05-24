import {Component, EventEmitter, Output} from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {OrganizationModel} from '../../../../models/organization.model';

@Component({
  selector: 'organization-editor',
  templateUrl: './organization-editor.component.html',
  styleUrls: ['./organization-editor.component.css']
})
export class OrganizationEditorComponent {

  @Output() onCreateOrganization = new EventEmitter<OrganizationModel>();

  public model: OrganizationModel;
  public createOrganization: boolean = false;
  public _isOpen: boolean = false;
  public _mode: string = "create";
  public orgId: string;

  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();

  constructor(private organizationService: OrganizationService) {
    this.createOrganization = false;
  }

  public initializeModelFromEntity(entity: OrganizationModel): void {
    this.model = {
      name: entity.name,
      email: entity.email,
      description: entity.description,
      createdBy: entity.createdBy,
      createdOn: entity.createdOn,
      id: entity.id
    };
    this._mode = "edit";
    this.orgId = entity.id;
  }

  public open(entity?: OrganizationModel) {
    if (entity) {
      this.initializeModelFromEntity(entity);
    } else {
      this.initializeModel();
    }
    this._isOpen = true;
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
    }
    this._mode = "create";
  }

  public submit() {
    let action: Promise<any>;
    if (this._mode == "create") {
      action = this.organizationService.createOrganization({
        name: this.model.name,
        description: this.model.description,
        email: this.model.email,
        id: this.model.id,
        createdBy: this.model.createdBy,
        createdOn: this.model.createdOn,
      });
    } else {
      action = this.organizationService.updateOrganization(this.orgId, {
        name: this.model.name,
        description: this.model.description,
        email: this.model.email,
        id: this.model.id,
        createdBy: this.model.createdBy,
        createdOn: this.model.createdOn,
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
      ? "Create Organization"
      : "Save";
  }

  public pageHeader(): string {
    return this._mode == "create"
      ? "Create Organization"
      : "Edit the Organization";
  }

  public isOpen(): boolean {
    return this._isOpen;
  }
}
