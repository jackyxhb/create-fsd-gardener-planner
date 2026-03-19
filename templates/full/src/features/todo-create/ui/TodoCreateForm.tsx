import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTodoCreate } from '../model/useTodoCreate'
import { cn } from '@shared/lib/utils'

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  completed: z.boolean().default(false),
})

type FormValues = z.infer<typeof schema>

interface Props {
  className?: string
}

export function TodoCreateForm({ className }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })
  const { mutateAsync } = useTodoCreate()

  const onSubmit = async (values: FormValues) => {
    await mutateAsync(values)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-3', className)}>
      <div>
        <input
          {...register('title')}
          placeholder="New garden task..."
          className="w-full rounded border px-3 py-2 text-sm"
        />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>
      <textarea
        {...register('description')}
        placeholder="Description (optional)"
        className="w-full rounded border px-3 py-2 text-sm"
        rows={2}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
      >
        {isSubmitting ? 'Adding…' : 'Add Task'}
      </button>
    </form>
  )
}
