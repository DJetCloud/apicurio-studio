import { Component, EventEmitter, Output } from '@angular/core';
import { OrganisationService } from '../../../../../services/organisation.service';
import { ConfigService } from '../../../../../services/config.service';
import { OrganisationModel } from '../../../../../models/organisation.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../email-validator.directive';
import {
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { StoredOrganisation } from '../../../../../models/stored-organisation.model';
import { UpdateOrganisation } from '../../../../../models/update-organisation-template.model';
@Component({
  selector: 'organisation-editor',
  templateUrl: './organisation-editor.component.html',
  styleUrls: ['./organisation-editor.component.css']
})
export class OrganisationEditorComponent {
  reactiveForm: FormGroup;
  submitted = false;

  @Output() onCreateOrganisation = new EventEmitter<OrganisationModel>();

  model: OrganisationModel;
  createOrganisation: boolean = false;
  public _isOpen: boolean = false;

  public _mode: string = "create";
  orgId: string;


  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();

  constructor(private organisationService: OrganisationService, private config: ConfigService, private formBuilder: FormBuilder) {
    this.createOrganisation = false;
    this.model = {} as OrganisationModel;
  }

  public initializeModelFromEntity(entity: UpdateOrganisation): void {
    this.model = {
      name: entity.name,
      email: entity.email,
      description: entity.description,
      createdBy: entity.createdBy,
      createdOn: entity.createdOn,
      id: entity.id
    };
    this._mode = "edit";
    this.orgId = entity.orgId;
  }
  

  public open(entity?: UpdateOrganisation) {
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
      action = this.organisationService.createStoredOrganisation({
        name: this.model.name,
        description: this.model.description,
        email: this.model.email,
        id: this.model.id,
        createdBy: this.model.createdBy,
        createdOn: this.model.createdOn,
      });
    } else {
      action = this.organisationService.updateStoredOrganisation(this.orgId, {
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
}
