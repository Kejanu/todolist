import {ReactNode, useEffect, useState} from "react";
import {Task, taskRemote, TaskStatus} from "../remotes/taskRemote";
import classNames from "classnames";
import {GrEdit} from "react-icons/gr";
import {IoAddCircleOutline} from "react-icons/io5";
import Modal from "../components/Modal";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import Select from "../components/Select";
import produce, {Draft} from "immer";
import {useNotification} from "../components/notification/NotificationProvider";
import {MdOutlineDeleteOutline} from "react-icons/md";
import ConfirmModal from "../components/ConfirmModal";


const TasksPage = () => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [editTaskId, setEditTaskId] = useState<string | null>(null);

    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskContent, setTaskContent] = useState<string>("");
    const [taskStatus, setTaskStatus] = useState<TaskStatus>(TaskStatus.TODO);

    const [toDeleteTask, setToDeleteTask] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    function fetchTasks() {
        setIsLoading(true);
        taskRemote.getTasks()
            .then(setTasks)
            .catch(console.log)
            .finally(() => setIsLoading(false));
    }

    function initTaskValues(task?: Task) {
        setEditTaskId(task?.id ?? null);
        setTaskTitle(task?.title ?? "");
        setTaskContent(task?.content ?? "");
        setTaskStatus(task?.status ?? TaskStatus.TODO);
    }

    const {showSuccess, showError} = useNotification();

    const todoTasks = tasks.filter(task => task.status === "TODO");
    const doneTasks = tasks.filter(task => task.status === "DONE");
    return (
        <>
            {
                toDeleteTask !== null &&
                <ConfirmModal
                    title={"Delete Task"}
                    onCancel={() => setToDeleteTask(null)}
                    onConfirm={() => {
                        taskRemote.deleteTask(toDeleteTask!.id)
                            .then(() => {
                                setTasks(produce((draft: Draft<Task[]>) => {
                                    const index = draft.findIndex((task: Task) => task.id === toDeleteTask!.id);
                                    if (index !== -1) {
                                        draft.splice(index, 1);
                                    }
                                }));
                                setToDeleteTask(null);
                                showSuccess(`Task deleted successfully`);
                            })
                            .catch(showError);
                    }}>
                    <div>
                        Really delete Task: <span className={"tw-font-medium"}>{toDeleteTask.title}</span>
                    </div>
                </ConfirmModal>
            }
            {taskModalOpen &&
                <Modal>
                    <Modal.Header>
                        Create Task
                    </Modal.Header>
                    <Modal.Body>
                        <TextInput placeholder={"Title"} value={taskTitle} onChange={setTaskTitle}/>
                        <TextArea placeholder={"Content"} value={taskContent} onChange={setTaskContent}/>
                        <Select value={taskStatus} onChange={(value) => setTaskStatus(value as TaskStatus)}>
                            {Object.keys(TaskStatus).map((e: any) => (
                                <Select.Option key={e} value={e}>
                                    {e}
                                </Select.Option>
                            ))}
                        </Select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setTaskModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            variant={"success"}
                            onClick={() => {
                                setIsLoading(true);

                                if (editTaskId === null) {
                                    taskRemote.createTask({
                                        title: taskTitle,
                                        content: taskContent,
                                        status: taskStatus
                                    }).then((task: Task) => {
                                        setTasks(produce(draft => {
                                            draft.push(task);
                                        }));
                                        showSuccess("Task created successfully");
                                    }).catch(showError)
                                        .finally(() => {
                                            setIsLoading(false);
                                            setTaskModalOpen(false);
                                        });
                                } else {
                                    taskRemote.updateTask(editTaskId, {
                                        title: taskTitle,
                                        content: taskContent,
                                        status: taskStatus
                                    }).then((updatedTask: Task) => {
                                        setTasks(produce((draft: Draft<Task[]>) => {
                                            const index = draft.findIndex((task: Task) => task.id === editTaskId);
                                            if (index !== -1) {
                                                draft[index] = updatedTask;
                                            }
                                        }));
                                        showSuccess("Task updated successfully");
                                    }).catch(showError)
                                        .finally(() => {
                                            setIsLoading(false);
                                            setTaskModalOpen(false);
                                        });
                                }
                            }}>
                            {editTaskId === null ? "Create" : "Update"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
            <div className={"tw-flex tw-flex-col tw-h-full"}>
                <div className={"tw-bg-slate-700"}>
                    <button
                        className={"tw-p-2 tw-m-2 tw-rounded tw-bg-emerald-500"}
                        onClick={() => {
                            initTaskValues();
                            setTaskModalOpen(true);
                        }}
                    >
                        <div className={"tw-flex tw-items-center tw-gap-2"}>
                            <IoAddCircleOutline size={22}/>
                            <div className={"tw-font-medium"}>Create Task</div>
                        </div>

                    </button>
                </div>
                <div className={"tw-flex tw-grow"}>
                    <div className={"tw-flex tw-flex-col tw-basis-1/2 tw-bg-amber-600 tw-p-4"}>
                        <TaskHeader className={"tw-bg-amber-500"}>
                            TODO
                        </TaskHeader>
                        <div className={"tw-flex tw-flex-col tw-grow tw-bg-amber-400 tw-mt-2 tw-rounded tw-p-4"}>
                            <div>
                                {todoTasks.map((task: Task, index: number) =>
                                    <TaskComponent
                                        index={index}
                                        key={task.id}
                                        task={task}
                                        className={"tw-bg-amber-300"}
                                        initTaskValues={initTaskValues}
                                        openTaskModal={setTaskModalOpen}
                                        setDeleteTask={setToDeleteTask}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={"tw-flex tw-flex-col tw-basis-1/2 tw-bg-emerald-500 tw-h-full tw-p-4"}>
                        <TaskHeader className={"tw-bg-emerald-400"}>
                            DONE
                        </TaskHeader>
                        <div className={"tw-flex tw-flex-col tw-grow tw-bg-emerald-400 tw-mt-2 tw-rounded tw-p-4"}>
                            {doneTasks.map((task: Task, index: number) =>
                                <TaskComponent
                                    index={index}
                                    key={task.id}
                                    task={task}
                                    className={"tw-bg-emerald-300"}
                                    initTaskValues={initTaskValues}
                                    openTaskModal={setTaskModalOpen}
                                    setDeleteTask={setToDeleteTask}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


interface TaskHeaderProps {
    children: ReactNode;
    className?: string;
}

const TaskHeader = ({children, className}: TaskHeaderProps) => {
    return (
        <div className={classNames([
            "tw-text-lg tw-font-bold tw-text-center tw-rounded tw-border tw-p-2",
            className
        ])}>
            {children}
        </div>
    );
}

interface TaskComponentProps {
    task: Task;
    className?: string;
    initTaskValues: (task: Task) => void;
    openTaskModal: (value: boolean) => void;
    setDeleteTask: (task: Task) => void;
    index: number;
}

const TaskComponent = (props: TaskComponentProps) => {
    return (
        <div className={classNames([
            "tw-flex tw-p-4 tw-rounded tw-mb-2",
            props.className
        ])}>
            <div className={"tw-grow"}>
                <div className={"tw-font-medium tw-text-lg"}>
                    {props.task.title}
                </div>
                <div>
                    {props.task.content}
                </div>
            </div>
            <div className={"tw-flex tw-items-center tw-gap-2"}>
                <Button
                    appearance={"icon"}
                    onClick={() => {
                        props.initTaskValues(props.task);
                        props.openTaskModal(true);
                    }}
                >
                    <GrEdit size={18}/>
                </Button>
                <Button
                    appearance={"icon"}
                    onClick={() => {
                        props.setDeleteTask(props.task);
                    }}
                >
                    <MdOutlineDeleteOutline size={22}/>
                </Button>
            </div>
        </div>
    );
}

export default TasksPage;