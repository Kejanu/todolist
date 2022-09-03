package de.kejanu.core;

import javax.ws.rs.BadRequestException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class CustomExceptionMapper implements ExceptionMapper<BadRequestException> {

    public Response toResponse(BadRequestException e) {
        return Response
            .status(Response.Status.BAD_REQUEST)
            .type(MediaType.TEXT_PLAIN)
            .entity(e.getMessage())
            .build();
    }
}