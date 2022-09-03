package de.kejanu.entities;

import java.util.UUID;

public record TaskId(UUID value) {

    public static TaskId valueOf(UUID taskId) {
        return new TaskId(taskId);
    }

    public static TaskId valueOf(String taskId) {
        return new TaskId(UUID.fromString(taskId));
    }

    @Override
    public String toString() {
        return value.toString();
    }
}
