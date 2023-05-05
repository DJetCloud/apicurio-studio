package io.apicurio.hub.api.rest.impl;

import io.apicurio.hub.api.beans.NewOrganization;
import io.apicurio.hub.api.beans.UpdateOrganization;
import io.apicurio.hub.api.metrics.IApiMetrics;
import io.apicurio.hub.api.rest.IOrgsResource;
import io.apicurio.hub.api.security.ISecurityContext;
import io.apicurio.hub.core.beans.Organization;
import io.apicurio.hub.core.exceptions.AlreadyExistsException;
import io.apicurio.hub.core.exceptions.NotFoundException;
import io.apicurio.hub.core.exceptions.ServerError;
import io.apicurio.hub.core.storage.IStorage;
import io.apicurio.hub.core.storage.StorageException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.util.Collection;
import java.util.Date;

public class OrgsResource implements IOrgsResource {
    private static Logger logger = LoggerFactory.getLogger(OrgsResource.class);

    @Inject
    private IApiMetrics metrics;
    @Inject
    private ISecurityContext security;
    @Inject
    private IStorage storage;

    @Override
    public Collection<Organization> listOrganizations() throws ServerError {
        metrics.apiCall("/orgs", "GET");
        logger.debug("Listing all Organizations");
        String user = security.getCurrentUser().getLogin();
        try {
            return storage.listOrganizations(user);
        } catch (StorageException e) {
            throw new ServerError(e);
        }
    }

    @Override
    public Organization createOrganization(NewOrganization info) throws ServerError {
        metrics.apiCall("/orgs", "POST");
        logger.debug("Creating an Organization: {}", info.getName());

        Date now = new Date();
        String user = security.getCurrentUser().getLogin();

        Organization org = new Organization();
        org.setName(info.getName());
        org.setDescription(info.getDescription());
        org.setEmail(info.getEmail());
        org.setCreatedBy(user);
        org.setCreatedOn(now);
        try {
            String orgId = storage.createOrganization(user, org);
            org.setId(orgId);
        } catch (StorageException | AlreadyExistsException e) {
            throw new ServerError(e);
        }
        return org;
    }

    @Override
    public Organization getOrganization(String orgId) throws ServerError, NotFoundException {
        logger.debug("Getting the organization with ID: {}", orgId);
        metrics.apiCall("/orgs/{orgId}", "GET");

        String user = security.getCurrentUser().getLogin();
        try {
            return storage.getOrganization(orgId, user);
        } catch (StorageException e) {
            throw new ServerError(e);
        }
    }

    @Override
    public void updateOrganization(String orgId, UpdateOrganization info) throws ServerError, NotFoundException {
        logger.debug("Updating organization with ID: {}", orgId);
        metrics.apiCall("/orgs/{orgId}", "PUT");

        String user = security.getCurrentUser().getLogin();
        try {
            Organization org  = storage.getOrganization(orgId, user);
            org.setDescription(info.getDescription());
            org.setEmail(info.getEmail());

            storage.updateOrganization(org);
        } catch (StorageException e) {
            throw new ServerError(e);
        }
    }

    @Override
    public void deleteOrganization(String orgId) throws ServerError, NotFoundException {
        logger.debug("Deleting organization with ID: {}", orgId);
        metrics.apiCall("/orgs/{orgId}", "DELETE");

        String user = security.getCurrentUser().getLogin();
        try {
            storage.deleteOrganization(orgId, user);
        } catch (StorageException e) {
            throw new ServerError(e);
        }
    }
}
