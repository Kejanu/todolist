package de.kejanu;

import de.kejanu.core.Strings;
import de.kejanu.core.Validator;
import de.kejanu.entities.DbTask;
import de.kejanu.entities.TaskId;
import de.kejanu.entities.TaskMapper;
import de.kejanu.entities.TaskStatus;
import io.quarkus.panache.common.Sort;
import org.openapitools.api.TasksApi;
import org.openapitools.model.TaskDto;
import org.openapitools.model.TaskInputDto;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Stream;

@Transactional
public class TaskResource implements TasksApi {

    @Override
    public List<TaskDto> getTasks() {
        try ( Stream<DbTask> dbTasks = DbTask.streamAll(Sort.by("created_at", Sort.Direction.Ascending)) ) {
            return dbTasks.map(TaskMapper::map).toList();
        }
    }

    @Override
    public TaskDto getTask(String taskId) {
        return TaskMapper.map(fetchTaskById(taskId));
    }

    @Override
    public TaskDto createTask(TaskInputDto taskInputDto) {
        Validator.create()
            .required(taskInputDto.getTitle(), "Title is required");

        DbTask dbTask = new DbTask();
        dbTask.title = Strings.trimToBlank(taskInputDto.getTitle());
        dbTask.content = Strings.trimToBlank(taskInputDto.getContent());
        dbTask.taskStatus = taskInputDto.getStatus() != null
            ? TaskStatus.valueOf(taskInputDto.getStatus().name())
            : TaskStatus.TODO;

        dbTask.persist();
        return TaskMapper.map(dbTask);
    }


    @Override
    public TaskDto updateTask(String taskId, TaskInputDto taskInputDto) {
        DbTask dbTask = fetchTaskById(taskId);

        Validator.create()
            .required(taskInputDto.getTitle(), "Title is required")
            .required(taskInputDto.getStatus().name(), "Status is required");

        dbTask.title = Strings.trimToBlank(taskInputDto.getTitle());
        dbTask.content = Strings.trimToBlank(taskInputDto.getContent());
        dbTask.taskStatus = TaskStatus.valueOf(taskInputDto.getStatus().name());

        return TaskMapper.map(dbTask);
    }

    @Override
    public void deleteTask(String taskId) {
        fetchTaskById(taskId).delete();
    }

    private DbTask fetchTaskById(String taskId) {
        TaskId wrapTaskId = TaskId.valueOf(taskId);
        DbTask dbTask = DbTask.find("id", wrapTaskId.value()).firstResult();
        if ( dbTask == null ) {
            throw Errors.taskNotFound(wrapTaskId);
        }
        return dbTask;
    }
}
