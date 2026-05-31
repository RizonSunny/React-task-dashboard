import React, { useState } from "react"
import { mockTasks } from "../data/mockTasks"
import type { Task, TaskFormState, TaskPriority, TaskStatus} from "../types/task"
import { data } from "react-router-dom"

const emptyForm: TaskFormState = {
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    assignee: "",
    dueDate: "",
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>(mockTasks)
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

    //create modal state
    // const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [formMode, setFormMode] = useState<null | "create" | Task>(null); /// null = closed, create = create mode, Task = edit mode
    const [form, setForm] = useState<TaskFormState>(emptyForm);
    const [errors, setErrors] = useState<Partial<Record<keyof TaskFormState, string>>>({});

    const isEditing = formMode !== null && formMode !== "create";

    const handleDelete = ( id: string ) => {
        setTasks( (prev) => prev.filter( (t) => t.id !== id) );
        setTaskToDelete(null);
    }

    const openCreate = () => {
        setForm(emptyForm);
        setErrors({});
        // setIsCreateOpen(true);
        setFormMode("create");
    }

    const openEdit = (task: Task) => {
        setForm({
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            assignee: task.assignee,
            dueDate: task.dueDate,
        });
        setErrors({});
        setFormMode(task);
    }

    const closeForm = () => {
        // setIsCreateOpen(false);
        setFormMode(null);
    }

    const validate = (data: TaskFormState) => {
        const newErrors: Partial<Record<keyof TaskFormState, string>> = {};
        if (!data.title.trim()) newErrors.title = "Title is required";
        else if (data.title.trim().length < 3) newErrors.title = "Title must be at least 3 characters";
        if (data.description.trim().length > 200) newErrors.description = "Description must be ≤ 200 characters";
        if (!data.assignee.trim()) newErrors.assignee = "Assignee is required";
        if (!data.dueDate) newErrors.dueDate = "Due date is required";
        return newErrors;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate(form);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        if (isEditing) {
            const editing = formMode;
            setTasks((prev) => 
                prev.map((t) => 
                    t.id === editing.id 
                    ? {
                        ...t,
                        title: form.title.trim(),
                        description: form.description.trim(),
                        status: form.status,
                        priority: form.priority,
                        assignee: form.assignee.trim(),
                        dueDate: form.dueDate,
                    }
                    : t
                )
            )
        } else {
            const newTask: Task = {
                id: crypto.randomUUID(),
                title: form.title.trim(),
                description: form.description.trim(),
                status: form.status,
                priority: form.priority,
                assignee: form.assignee.trim(),
                dueDate: form.dueDate,
            };
            setTasks((prev) => [newTask, ...prev]);
        }        
        closeForm();

    }
  
    return(
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text=2x1 font-bold text-slate-900">Tasks</h1>
                <button 
                    onClick={openCreate}
                    className="px-4 py-2 rounded-md text-sm font-medium bg-slate-900 text-white hover:bg-slate-800"
                >
                     + New Task
                </button>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                <ul className="divide-y divide-slate-200">
                    {tasks.length === 0 && (
                        <li className="px-5 py-8 text-center text-sm text-slate-500">
                           No tasks yet. 
                        </li>
                    )}
                    { tasks.map( (task) => (
                        <li key={task.id} className="px-5 py-3 flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <div className="text-sm font-medium text-slate-900 truncate">{task.title}</div>
                                <div className="text-xs text-slate-500">
                                    Due {task.dueDate} . {task.assignee}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                        task.priority === 'high'
                                            ? "bg-red-100 text-red-700"
                                            : task.priority === 'medium'
                                            ? "bg-amber-100 text-amber-700"
                                            : "bg-slate-100 text-slate-700"
                                    }`}
                                >
                                    {task.priority}
                                </span>
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                        task.status === "done"
                                        ? "bg-green-100 text-green-700"
                                        : task.status === "in-progress"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-slate-100 text-slate-700"
                                    }`}
                                >
                                    {task.status}
                                </span>
                                <button 
                                    onClick={ () => openEdit(task)}
                                    className="text-xs text-slate-600 hover:text-slate-900 px-2 py-1">
                                    Edit
                                </button>
                                <button 
                                    onClick={ () => setTaskToDelete(task)}
                                    className="text-xs text-red-600 hover:text-red-700 px-2 py-1">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Confirm delete modal */}
            {taskToDelete && (
                <div 
                    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                    onClick={() => setTaskToDelete(null)}
                >
                    <div
                        className="bg-white rounded-lg w-full max-w-md shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-5 py-3 border-b border-slate-200">
                            <h2 className="text-lg font-semibold">Delete task?</h2>
                        </div>
                        <div className="p-5">
                            <p className="text-sm text-slate-600 mb-4">
                                Are you sure you want to delete <strong>{taskToDelete.title}</strong>? This can't be undone.
                            </p>
                            <div className="flex justify-end gap-2">
                                <button
                                onClick={() => setTaskToDelete(null)}
                                className="px-4 py-2 rounded-md text-sm font-medium bg-slate-200 text-slate-900 hover:bg-slate-300"
                                >
                                Cancel
                                </button>
                                <button
                                onClick={() => handleDelete(taskToDelete.id)}
                                className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700"
                                >
                                Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Task Modal */}
            { formMode !==null && (
                <div
                    className="ABC fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                    onClick={closeForm}
                >
                    <div
                        className="bg-white rounded-lg w-full max-w-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-5 py-3 border-b border-slate-200">
                            <h2 className="text-lg font-semibold">
                                {isEditing ? "Edit" : "New"} task</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title" className="text-sm font-medium text-slate-700">Title</label>
                                <input 
                                    id="title"
                                    value={form.title}
                                    onChange={ (e) => setForm( (p) => ({ ...p, title: e.target.value}))}
                                    className={`px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                                        errors.title ? "border-red-500" : "border-slate-300"
                                    }`}
                                />
                                {errors.title && <span className="text-xs text-red-600">{errors.title}</span>}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="description" className="text-sm font-medium text-slate-700">Description</label>
                                <textarea
                                    id="description"
                                    rows={3}
                                    value={form.description}
                                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                                    className={`px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                                        errors.description ? "border-red-500" : "border-slate-300"
                                    }`}
                                />
                                {errors.description && <span className="text-xs text-red-600">{errors.description}</span>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="status" className="text-sm font-medium text-slate-700">Status</label>
                                    <select
                                        id="status"
                                        value={form.status}
                                        onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as TaskStatus }))}
                                        className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                                    >
                                        <option value="todo">Todo</option>
                                        <option value="in-progress">In progress</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="priority" className="text-sm font-medium text-slate-700">Priority</label>
                                    <select
                                        id="priority"
                                        value={form.priority}
                                        onChange={(e) => setForm((p) => ({ ...p, priority: e.target.value as TaskPriority }))}
                                        className="px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="assignee" className="text-sm font-medium text-slate-700">Assignee</label>
                                    <input
                                        id="assignee"
                                        value={form.assignee}
                                        onChange={(e) => setForm((p) => ({ ...p, assignee: e.target.value }))}
                                        className={`px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                                        errors.assignee ? "border-red-500" : "border-slate-300"
                                        }`}
                                    />
                                    {errors.assignee && <span className="text-xs text-red-600">{errors.assignee}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="dueDate" className="text-sm font-medium text-slate-700">Due date</label>
                                    <input
                                        id="dueDate"
                                        type="date"
                                        value={form.dueDate}
                                        onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))}
                                        className={`px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                                        errors.dueDate ? "border-red-500" : "border-slate-300"
                                        }`}
                                    />
                                    {errors.dueDate && <span className="text-xs text-red-600">{errors.dueDate}</span>}
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="px-4 py-2 rounded-md text-sm font-medium bg-slate-200 text-slate-900 hover:bg-slate-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md text-sm font-medium bg-slate-900 text-white hover:bg-slate-800"
                                >
                                    {isEditing ? "Save changes" : "Create task"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}