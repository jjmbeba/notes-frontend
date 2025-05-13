import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-label"
import { useForm } from "@tanstack/react-form"
import { Loader } from "lucide-react"
import { z } from "zod"

const addTaskSchema = z.object({
  name: z.string().min(2, {
    message: 'Task name should be at least 2 characters'
  }).max(100, {
    message: 'Task name should not exceed 100 characters',
  }),
  description: z.string().min(1, {
    message: 'Task description should be at least 5 characters'
  }).max(500, {
    message: 'Task description should not exceed 500 characters'
  }),
  isCompleted: z.boolean()
})

const AddTaskPage = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      isCompleted: false
    },
    validators: {
      onChange: addTaskSchema
    },
    onSubmit: ({ value }) => {
      console.log(value)
    }
  })

  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center">
      <form onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()

        form.handleSubmit()
      }} className="grid gap-4 w-1/3">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <form.Field
            name="name"
            children={(field) => (
              <>
                <Input
                  id="name"
                  placeholder="Enter task name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.map((error, i) => (
                  <div key={i} className="text-red-500 text-sm">
                    {error?.message}
                  </div>
                ))}
              </>
            )}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <form.Field
            name="description"
            children={(field) => (
              <>
                <Textarea
                  id="description"
                  placeholder="Enter task description"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.map((error, i) => (
                  <div key={i} className="text-red-500 text-sm">
                    {error?.message}
                  </div>
                ))}
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? <Loader className="animate-spin" /> : 'Add task'}
            </Button>
          )}
        />
      </form>
    </main>
  )
}

export default AddTaskPage