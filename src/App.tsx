import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EditIcon, Ghost, Loader, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Checkbox } from "./components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./components/ui/dialog"
import { env } from "./env"
import EditTaskForm from "./forms/edit-task"
import type { Task } from "./types"
import { Link } from "react-router"

const editTaskSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  is_completed: z.boolean().optional()
})

function App() {
  const queryClient = useQueryClient()

  const { mutate: editTask, isPending } = useMutation({
    mutationKey: ['tasks'],
    mutationFn: async (values: z.infer<typeof editTaskSchema>) => {
      return await fetch(`${env.VITE_BACKEND_URL}/tasks/${values.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values
        })
      }).then((res) => res.json())
    },
    onError: (error) => {
      console.error(error)
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Note editted successfully")
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    }
  })


  const { data: tasks, error, isLoading } = useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: async () => {
      try {
        return await fetch(`${env.VITE_BACKEND_URL}/tasks`).then((res) => res.json())
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  })

  if (error) {
    toast.error(error.message)
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center gap-3">
      <Loader2 className="size-6 animate-spin" />
      Hang on. Loading tasks...
    </div>
  }

  if (!tasks || tasks.length < 1) {
    return <div className="min-h-screen flex flex-col items-center justify-center font-semibold ">
      <Ghost className="size-8" />
      No tasks found. Create some <Link className="underline" to={'/add-task'}>here.</Link>
    </div>
  }

  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 gap-4 px-4 md:px-6 lg:px-8">
        {tasks?.map((task) => {
          const { id, name, description, is_completed } = task

          return (
            <Card key={id} className="max-h-[10rem]">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>
                  {name}
                </CardTitle>
                <div className="flex items-center gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size={'icon'} variant={'ghost'}>
                        <EditIcon className="size-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0">
                          Edit task
                        </h2>
                      </DialogHeader>
                      <EditTaskForm {...task} editTask={editTask} isPending={isPending} />
                    </DialogContent>
                  </Dialog>
                  <Checkbox className="cursor-pointer" onClick={() => editTask({
                    id,
                    is_completed: !is_completed
                  })} checked={is_completed} />
                </div>
              </CardHeader>
              <CardContent>
                {description}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </main>
  )
}

export default App
