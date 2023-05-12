import { OrganisationModel } from "./organisation/organisation.model";

export interface StoredOrganisation extends OrganisationModel {

    orgId: string;
    
}