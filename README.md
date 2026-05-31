# Task Dashboard

A self-study React project — building a Team Task Management Dashboard end-to-end to learn modern React before moving to Next.js. Full plan is 12 phases; this README tracks what's done.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- React Router

## Phases completed

### ✅ Project setup
- Vite scaffold with React + TypeScript
- Tailwind v4 wired via `@tailwindcss/vite` plugin
- Folder structure: `components`, `pages`, `hooks`, `context`, `types`, `utils`, `layouts`, `data`

### ✅ Layout system
- `DashboardLayout` shell with persistent Sidebar + Navbar
- React Router nested routes via `<Outlet />`
- `NavLink` with `isActive` for active-link highlighting
- Pages: Dashboard, Tasks, Profile, Settings

### ✅ Dashboard overview
- 4 stat cards (Total, Completed, Pending, High Priority) — values **derived** from data, not stored
- Recent Tasks list sorted by due date
- Priority + status pills with conditional Tailwind classes
- Responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`

> Phase 3 (reusable UI components) was intentionally skipped — building inline first to feel real duplication before extracting. Will extract in Phase 9.

### ✅ Task CRUD with useState
- Tasks page: list, create, edit, delete
- One form modal serving two modes (create / edit) via a tri-state variable: `null | "create" | Task`
- Confirm-delete modal with click-outside-to-close
- Immutable updates: `prev.filter`, `prev.map`, `[newTask, ...prev]`

### ✅ Zod validation
- `taskFormSchema` in `src/schemas/taskFormSchema.ts` — single source of truth
- Form values type **derived** from the schema via `z.infer<typeof taskFormSchema>` (no hand-written type)
- `safeParse` + `error.flatten().fieldErrors` replaces the imperative `validate()` function
- Auto-trim built into the schema via `.string().trim()` — no manual `.trim()` calls in submit
- Chained validators with custom messages (`.min(3, "Title must be at least 3 characters")`)

## Concepts practiced so far

- TypeScript literal union types (`"todo" | "in-progress" | "done"`)
- Deriving state from data instead of duplicating it
- Immutable array updates and why `.sort()` is dangerous
- `min-w-0` flexbox gotcha
- Event bubbling and `stopPropagation` on modal backdrops
- `type="button"` to prevent accidental form submission
- Controlled forms with `useState` + spread updates
- Functional state updates (`setX(prev => ...)`)
- The `prev.map(t => t.id === id ? {...t, ...changes} : t)` update pattern
- TypeScript narrowing vs `as` type assertions
- `crypto.randomUUID()` for client-side IDs
- Zod schemas as runtime values (not just compile-time types)
- `z.infer` to derive TypeScript types from schemas
- `safeParse` vs `parse` for forms vs strict parsing
- Indexed access types: `TaskFormValues["status"]`

## All phases

| # | Phase | Focus | Status |
|---|-------|-------|--------|
| 1 | Project setup | Vite + React + TS + Tailwind v4, folder structure | ✅ |
| 2 | Layout system | Sidebar, Navbar, DashboardLayout, React Router | ✅ |
| 3 | Reusable UI components | Button, Input, Card, Modal | ⏭️ Skipped (will extract in Phase 9 once duplication is real) |
| 4 | Dashboard overview | Stat cards + recent tasks, derived from data | ✅ |
| 5 | Task CRUD with useState | Create / edit / delete tasks, manual validation | ✅ |
| 6 | Zod validation | Collapse the imperative `validate()` into a schema | ✅ |
| 7 | React Hook Form | Stop hand-managing form state | ⬜ |
| 8 | TanStack Table | Real data table with sort / filter / paginate / global search | ⬜ |
| 9 | Custom hooks | Extract `useTasks`, `useDebounce`, `useLocalStorage`, `useModal` | ⬜ |
| 10 | Context API | Auth + Theme global state, dark mode, protected routes | ⬜ |
| 11 | Data fetching | Replace mocks with JSONPlaceholder (+ TanStack Query) | ⬜ |
| 12 | Optimization | `useMemo`, `useCallback`, `React.memo` — only where profiling shows wins | ⬜ |

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).
