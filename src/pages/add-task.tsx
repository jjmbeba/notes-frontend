import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { env } from "@/env"
import { Label } from "@radix-ui/react-label"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader } from "lucide-react"
import { useNavigate } from "react-router"
import { toast } from "sonner"
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
  })
})

const AddTaskPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()


  const { mutate: createTask, isPending } = useMutation({
    mutationKey: ['tasks'],
    mutationFn: async (values: z.infer<typeof addTaskSchema>) => {
      return await fetch(`${env.VITE_BACKEND_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
    },
    onError: (error) => {
      console.error(error)
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Task created successfully")
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
      navigate('/')
    }
  })


  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    validators: {
      onChange: addTaskSchema
    },
    onSubmit: ({ value }) => {
      console.log(value)
      createTask(value)
    }
  })

  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-6 lg:px-8">
      <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0">
        Add a task
      </h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()

        form.handleSubmit()
      }} className="grid gap-4 w-full md:w-2/3 lg:w-1/3">
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
              {isSubmitting || isPending ? <Loader className="animate-spin" /> : 'Add task'}
            </Button>
          )}
        />
      </form>
    </main>
  )
}

export default AddTaskPage