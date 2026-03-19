import type { Todo, CreateTodoDto, UpdateTodoDto } from '@entities/todo'

// Mock data stored in memory
const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Plant spring vegetables',
    description: 'Tomatoes, peppers, and cucumbers',
    completed: false,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Water garden beds',
    description: 'Morning watering routine',
    completed: false,
    createdAt: '2024-03-05T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z',
  },
]

let nextId = 3

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockApiClient = {
  async getAll(): Promise<Todo[]> {
    await delay(300)
    return structuredClone(mockTodos)
  },

  async getById(id: string): Promise<Todo> {
    await delay(200)
    const todo = mockTodos.find((t) => t.id === id)
    if (!todo) {
      throw new Error(`Todo ${id} not found`)
    }
    return structuredClone(todo)
  },

  async create(dto: CreateTodoDto): Promise<Todo> {
    await delay(400)
    const now = new Date().toISOString()
    const newTodo: Todo = {
      id: String(nextId++),
      title: dto.title,
      description: dto.description || '',
      completed: false,
      createdAt: now,
      updatedAt: now,
    }
    mockTodos.push(newTodo)
    return structuredClone(newTodo)
  },

  async update(id: string, dto: UpdateTodoDto): Promise<Todo> {
    await delay(300)
    const index = mockTodos.findIndex((t) => t.id === id)
    if (index === -1) {
      throw new Error(`Todo ${id} not found`)
    }
    mockTodos[index] = {
      ...mockTodos[index],
      ...dto,
      updatedAt: new Date().toISOString(),
    }
    return structuredClone(mockTodos[index])
  },

  async remove(id: string): Promise<void> {
    await delay(300)
    const index = mockTodos.findIndex((t) => t.id === id)
    if (index === -1) {
      throw new Error(`Todo ${id} not found`)
    }
    mockTodos.splice(index, 1)
  },
}
