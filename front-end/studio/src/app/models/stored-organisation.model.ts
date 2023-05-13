import { OrganisationModel } from "./organisation.model";

export interface StoredOrganisation extends OrganisationModel {

    orgId: string;
    
}