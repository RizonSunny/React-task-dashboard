# Task Dashboard — React Practice Project

Self-study project to learn modern React end-to-end before Next.js.
Full 12-phase plan: `~/.claude/projects/D--corner-Next-react-task-dashboard/memory/project_react_dashboard.md`

## Current status
- Phase 1: Project setup (in progress — Vite scaffolded, Tailwind next)
- Phases 2-5 planned for today's 4-hour session
- Phases 6-12 in future sessions

## Stack
React + TypeScript, Tailwind v4, Vite.
Later phases: Zod, React Hook Form, TanStack Table, Context API, JSONPlaceholder API.

## Folder structure (to create in Phase 1)
```
src/
├── components/
├── pages/
├── hooks/
├── context/
├── types/
├── utils/
├── layouts/
└── data/
```

## Rules for Claude
- Respect the phase ordering — do NOT introduce Zod / RHF / Context / memoization before their designated phase. The pain-then-solution progression is intentional.
- Phase 5 forms use plain `useState` on purpose (motivates Phase 6 Zod and Phase 7 RHF).
- No `useMemo` / `useCallback` / `React.memo` until Phase 12.
- User is driving and learning — guide step by step, wait for confirmation between steps, don't dump full implementations unprompted.
- Today's session goal: finish Phases 1-5 (setup → layout → reusable UI → dashboard cards → Task CRUD with useState).

## Time budget for today
- Phase 1 (setup): 20 min
- Phase 2 (layout): 45 min
- Phase 3 (UI components — only Button/Input/Card/Modal): 60 min
- Phase 4 (dashboard cards): 30 min
- Phase 5 (Task CRUD with useState): 85 min
- Buffer: 20 min
