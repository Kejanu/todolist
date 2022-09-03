import {fetcher} from "../components/Util";

export const taskRemote = {
    getTasks: (): Promise<Task[]> => {
        return fetch(`/tasks`, {
            method: "GET"
        })
            .then(response => {
                return response.json();
            })
    },

    createTask: (taskInput: TaskInput): Promise<Task> => {
        return fetch(`/tasks`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskInput)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                return response.text().then(text => {
                    throw new Error(text)
                });
            })
    },

    updateTask: (taskId: string, taskInput: TaskInput): Promise<Task> => {
        return fetcher(`/tasks/${taskId}`, "PUT", taskInput);
    },

    deleteTask: (taskId: string): Promise<void> => {
        return fetcher(`/tasks/${taskId}`, "DELETE");
    }
};

export interface Task {
    id: string;
    title: string;
    content: string;
    status: TaskStatus;
    orderIndex: number;
}

export interface TaskInput {
    title: string;
    content: string;
    orderIndex?: number;
    status: TaskStatus;
}

export enum TaskStatus {
    TODO = "TODO",
    DONE = "DONE"
}
