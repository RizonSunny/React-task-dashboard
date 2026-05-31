import z from "zod";


export const taskFormSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .min(3, "Title must be at least 3 characters"),

    description: z
        .string()
        .trim()
        .max(200, "Description must be ≤ 200 characters"),
    
    status: z.enum(["todo", "in-progress", "done"]),

    priority: z.enum(["low", "medium", "high"]),

    assignee: z
        .string()
        .trim()
        .min(1, "Assignee is required"),

    dueDate: z
        .string()
        .min(1, "Due date is required")
        .refine((val) => !Number.isNaN((Date.parse(val))), {
            message: "Due date must be a valid date",
        }),
})

export type TaskFormType = z.infer<typeof taskFormSchema>;