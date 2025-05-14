import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { editTaskSchema } from '@/schemas'
import { useForm } from '@tanstack/react-form'
import type { UseMutateFunction } from '@tanstack/react-query'
import { Loader } from 'lucide-react'

type Props = {
    id: number
    name: string
    description: string
    is_completed: boolean
    editTask: UseMutateFunction<any, Error, { id: number; name?: string | undefined; description?: string | undefined; is_completed?: boolean | undefined; }, unknown>
    isPending: boolean
}

const EditTaskForm = ({ id, name, description, is_completed, editTask, isPending }: Props) => {
    const form = useForm({
        defaultValues: {
            name,
            description,
            is_completed
        },
        validators: {
            onChange: editTaskSchema
        },
        onSubmit: ({ value }) => {
            editTask({
                id,
                ...value
            })
        }
    })

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()

            form.handleSubmit()
        }} className="grid gap-4 w-full">
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
            <div className="grid gap-2">
                <Label htmlFor="is_completed">Completed?</Label>
                <form.Field
                    name="is_completed"
                    children={(field) => (
                        <>
                            <Checkbox
                                id="is_completed"
                                checked={field.state.value}
                                onBlur={field.handleBlur}
                                onCheckedChange={(e) => field.handleChange(e === true)}
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
                        {isSubmitting || isPending ? <Loader className="animate-spin" /> : 'Edit task'}
                    </Button>
                )}
            />
        </form>
    )
}

export default EditTaskForm