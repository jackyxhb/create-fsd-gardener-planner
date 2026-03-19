export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  locationId?: string
  createdAt: string
  updatedAt: string
}

export type CreateTodoDto = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateTodoDto = Partial<CreateTodoDto>
