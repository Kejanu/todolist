package de.kejanu.core;

import javax.ws.rs.BadRequestException;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.NotFoundException;

public class Validator {

    public static Validator create() {
        return new Validator();
    }
    public Validator required(String s, String message) {
        if (Strings.trimToBlank(s).equals("")) {
            throw new BadRequestException(message);
        }
        return this;
    }
}
