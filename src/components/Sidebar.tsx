import { NavLink } from "react-router-dom"
import type { NavItem } from "../types/nav"

const navItems: NavItem[] = [
    { label: "Dashboard", path: "/"},
    { label: "Tasks", path: "/tasks"},
    { label: "Profile", path: "/profile"},
    { label: "Settings", path: "/settings"},
]


export default function Sidebar() {
    return (
        <aside className="w-64 bg-slate-900 text-slate-100 min-h-screen p-4 hidden md:block">
            <div className="text-xl font-bold mb-8">Task Dashboard</div>
            <nav className="flex flex-col gap-1">
                {navItems.map( (item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/"}
                        className={ ({isActive}) => 
                         `px-3 py-2 rounded-md text-sm transition ${
                            isActive
                                ? "bg-slate-700 text-white"
                                : "text-slate-300 hover:bg-slate-800"
                            }`
                        }
                    >
                        { item.label }
                    </NavLink>
                ))}

            </nav>
        </aside>
    )
}