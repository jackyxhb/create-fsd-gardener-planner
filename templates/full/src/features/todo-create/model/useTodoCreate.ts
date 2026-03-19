import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi, useTodoStore, type CreateTodoDto } from '@entities/todo'

export function useTodoCreate() {
  const queryClient = useQueryClient()
  const addTodo = useTodoStore((s) => s.addTodo)

  return useMutation({
    mutationFn: (dto: CreateTodoDto) => todoApi.create(dto),
    onSuccess: (todo) => {
      addTodo(todo)
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
