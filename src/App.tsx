import { useQuery } from "@tanstack/react-query"
import { EditIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Checkbox } from "./components/ui/checkbox"
import { env } from "./env"
import type { Task } from "./types"

function App() {
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
        {tasks?.map(({id, name, description, is_completed}) => (
          <Card key={id} className="max-h-[10rem]">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>
                {name}
              </CardTitle>
              <div className="flex items-center gap-3">
                <Button size={'icon'} variant={'ghost'}>
                  <EditIcon className="size-4" />
                </Button>
                <Checkbox checked={is_completed} />
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
