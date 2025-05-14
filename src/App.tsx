import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EditIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Checkbox } from "./components/ui/checkbox"
import { env } from "./env"
import type { Task } from "./types"
import { z } from "zod"

const editTaskSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  is_completed: z.boolean().optional()
})

function App() {
  const queryClient = useQueryClient()

  const { mutate: editTask } = useMutation({
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


  const { data: tasks, error } = useQuery<Task[], Error>({
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

  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 gap-4 px-4 md:px-6 lg:px-8">
        {tasks?.map(({ id, name, description, is_completed }) => (
          <Card key={id} className="max-h-[10rem]">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>
                {name}
              </CardTitle>
              <div className="flex items-center gap-3">
                <Button size={'icon'} variant={'ghost'}>
                  <EditIcon className="size-4" />
                </Button>
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
        ))}
      </div>
    </main>
  )
}

export default App
