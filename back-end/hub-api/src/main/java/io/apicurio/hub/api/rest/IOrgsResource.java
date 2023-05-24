package io.apicurio.hub.api.rest;

import io.apicurio.hub.api.beans.NewOrganization;
import io.apicurio.hub.api.beans.UpdateOrganization;
import io.apicurio.hub.core.beans.Organization;
import io.apicurio.hub.core.exceptions.NotFoundException;
import io.apicurio.hub.core.exceptions.ServerError;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;

@Path("orgs")
public interface IOrgsResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    Collection<Organization> listOrganizations() throws ServerError;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Organization createOrganization(NewOrganization organization) throws ServerError;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{orgId}")
    Organization getOrganization(@PathParam("orgId") String orgId) throws ServerError, NotFoundException;

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("{orgId}")
    void updateOrganization(@PathParam("orgId") String orgId, UpdateOrganization info) throws ServerError, NotFoundException;

    @DELETE
    @Path("{orgId}")
    void deleteOrganization(@PathParam("orgId") String orgId) throws ServerError, NotFoundException;
}
