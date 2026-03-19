import type { Todo, CreateTodoDto, UpdateTodoDto } from '@entities/todo'

// Mock data stored in memory
let mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Plant spring vegetables',
    description: 'Tomatoes, peppers, and cucumbers',
    latitude: 51.5074,
    longitude: -0.1278,
    completed: false,
    createdAt: new Date('2024-03-01'),
  },
  {
    id: '2',
    title: 'Water garden beds',
    description: 'Morning watering routine',
    latitude: 51.508,
    longitude: -0.125,
    completed: false,
    createdAt: new Date('2024-03-05'),
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
    const newTodo: Todo = {
      id: String(nextId++),
      title: dto.title,
      description: dto.description || '',
      latitude: dto.latitude || 51.5074,
      longitude: dto.longitude || -0.1278,
      completed: false,
      createdAt: new Date(),
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
    mockTodos[index] = { ...mockTodos[index], ...dto }
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
