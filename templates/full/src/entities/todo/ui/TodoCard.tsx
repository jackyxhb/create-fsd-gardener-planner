import { cn } from '@shared/lib/utils'
import type { Todo } from '../model/types'

interface Props {
  todo: Todo
  onToggle?: (id: string) => void
  className?: string
}

export function TodoCard({ todo, onToggle, className }: Props) {
  return (
    <div className={cn('rounded-lg border p-4 shadow-sm', className)}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle?.(todo.id)}
          className="h-4 w-4"
        />
        <h3 className={cn('font-medium', todo.completed && 'line-through text-muted-foreground')}>
          {todo.title}
        </h3>
      </div>
      {todo.description && (
        <p className="mt-1 text-sm text-muted-foreground">{todo.description}</p>
      )}
    </div>
  )
}
