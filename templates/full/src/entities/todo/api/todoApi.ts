import { mockApiClient } from '@shared/api/mockApi'
import type { CreateTodoDto, UpdateTodoDto } from '../model/types'

export const todoApi = {
  getAll: () => mockApiClient.getAll(),
  getById: (id: string) => mockApiClient.getById(id),
  create: (dto: CreateTodoDto) => mockApiClient.create(dto),
  update: (id: string, dto: UpdateTodoDto) => mockApiClient.update(id, dto),
  remove: (id: string) => mockApiClient.remove(id),
}
