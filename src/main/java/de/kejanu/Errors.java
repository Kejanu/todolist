package de.kejanu;

import de.kejanu.entities.TaskId;

import javax.ws.rs.BadRequestException;

public class Errors {
    public static BadRequestException taskNotFound(TaskId taskId) {
        return new BadRequestException(String.format("Task with id %s not found", taskId.toString()));
    }
}
