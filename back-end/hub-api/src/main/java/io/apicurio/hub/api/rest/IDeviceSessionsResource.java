package io.apicurio.hub.api.rest;

import io.apicurio.hub.api.beans.DeviceSession;
import io.apicurio.hub.core.exceptions.ServerError;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;

@Path("device-sessions")
public interface IDeviceSessionsResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    Collection<DeviceSession> listDeviceSessions(@QueryParam("mock") boolean mock) throws ServerError;

    @DELETE
    @Path("/{sessionId}")
    void deleteSession(@PathParam("sessionId") String sessionId) throws ServerError;
}
