export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type TaskFormState = {
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority,
    assignee: string,
    dueDate: string
};

export type Task = TaskFormState & {
    id: string
}