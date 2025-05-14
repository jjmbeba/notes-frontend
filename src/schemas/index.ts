import { z } from "zod";

export const addTaskSchema = z.object({
  name: z.string().min(2, {
    message: 'Task name should be at least 2 characters'
  }).max(100, {
    message: 'Task name should not exceed 100 characters',
  }),
  description: z.string().min(1, {
    message: 'Task description should be at least 5 characters'
  }).max(500, {
    message: 'Task description should not exceed 500 characters'
  })
})

export const editTaskSchema = addTaskSchema.extend({
  is_completed: z.boolean()
})