import AddTaskForm from "@/forms/add-task"

const AddTaskPage = () => {
  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-6 lg:px-8">
      <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0">
        Add a task
      </h2>
      <AddTaskForm />
    </main>
  )
}

export default AddTaskPage