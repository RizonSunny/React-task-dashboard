import { mockTasks } from "../data/mockTasks"

export default function DashboardPage() {   
    const total = mockTasks.length;
    const completed = mockTasks.filter( (t) => t.status === "done").length;
    const pending = mockTasks.filter( (t) => t.status !== "done").length;
    const highPriority = mockTasks.filter( (t) => t.status === "done").length;

    const recentTask = [...mockTasks]
        .sort( (a,b) => a.dueDate.localeCompare(b.dueDate))
        .slice(0, 5);
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            {/* start cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
                    <div className="text-sm text-slate-500">Total Tasks</div>
                    <div className="text-3xl font-bold text-slate-900 mt-2">{total}</div>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
                    <div className="text-sm text-slate-500">Completed</div>
                    <div className="text-3xl font-bold text-green-600 mt-2">{completed}</div>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
                    <div className="text-sm text-slate-500">Pending</div>
                    <div className="text-3xl font-bold text-amber-600 mt-2">{pending}</div>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
                    <div className="text-sm text-slate-500">High Priority</div>
                    <div className="text-3xl font-bold text-red-600 mt-2">{highPriority}</div>
                </div>
            </div>

            {/* Recent Task */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="px-5 py-3 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900">Recent Tasks</h2>
                </div>
                <ul className="divide-y divide-slate-200">
                    {recentTask.map( (task) => (
                        <li key={task.id} className="px-5 py-3 flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-slate-900">{task.title}</div>
                                <div className="text-xs text-slate-500">
                                Due {task.dueDate} · {task.assignee}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                        task.priority === "high"
                                            ? "bg-red-100 text-red-700"
                                            : task.priority === "medium"
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
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}