package de.kejanu.entities;

import org.openapitools.model.TaskDto;
import org.openapitools.model.TaskStatusDto;

public class TaskMapper {
    public static TaskDto map(DbTask dbTask) {
        return new TaskDto()
            .id(dbTask.id.toString())
            .title(dbTask.title)
            .content(dbTask.content)
            .status(TaskStatusDto.valueOf(dbTask.taskStatus.name()));
    }
}
