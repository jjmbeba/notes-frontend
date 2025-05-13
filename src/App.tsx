import { EditIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Checkbox } from "./components/ui/checkbox"

function App() {
  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 gap-4 px-4 md:px-6 lg:px-8">
        {Array.from({ length: 9 }).fill(0).map((_, index) => (
          <Card key={`card-${index}`} className="max-h-[10rem]">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>
                Title
              </CardTitle>
              <div className="flex items-center gap-3">
                <Button size={'icon'} variant={'ghost'}>
                  <EditIcon className="size-4" />
                </Button>
                <Checkbox />
              </div>
            </CardHeader>
            <CardContent>
              Content here
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}

export default App
