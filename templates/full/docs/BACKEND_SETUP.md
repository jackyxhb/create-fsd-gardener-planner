# Backend API Setup Guide

This template comes with a **mock API** for development and demonstration. To use it with a real backend, follow this guide.

## Current Setup

The app currently uses a mock API (`src/shared/api/mockApi.ts`) that stores data in memory. This means:
- ✅ No backend setup required to get started
- ✅ Tasks work for demo/development
- ❌ Data is lost on page refresh
- ❌ No data persistence

## Switching to a Real Backend

### Step 1: Update the API Client

Replace the mock API with your real backend in `src/entities/todo/api/todoApi.ts`:

```typescript
import { apiClient } from '@shared/api/client'
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../model/types'

export const todoApi = {
  getAll: () => apiClient.get<Todo[]>('/todos').then((r) => r.data),
  getById: (id: string) => apiClient.get<Todo>(`/todos/${id}`).then((r) => r.data),
  create: (dto: CreateTodoDto) => apiClient.post<Todo>('/todos', dto).then((r) => r.data),
  update: (id: string, dto: UpdateTodoDto) =>
    apiClient.patch<Todo>(`/todos/${id}`, dto).then((r) => r.data),
  remove: (id: string) => apiClient.delete(`/todos/${id}`),
}
```

### Step 2: Configure the API Base URL

Set `VITE_API_BASE_URL` environment variable (defaults to `/api`):

**.env.local**
```
VITE_API_BASE_URL=http://localhost:3000/api
```

The API client is configured in `src/shared/api/client.ts` with:
- JWT token injection in request headers
- 401 error handling (removes token on auth failure)

### Step 3: Implement Required Endpoints

Your backend must implement these endpoints:

#### GET /api/todos
Fetch all tasks.

**Response:**
```json
[
  {
    "id": "1",
    "title": "Plant tomatoes",
    "description": "Spring planting",
    "latitude": 51.5074,
    "longitude": -0.1278,
    "completed": false,
    "createdAt": "2024-03-01T00:00:00Z"
  }
]
```

#### GET /api/todos/:id
Fetch a single task.

**Response:**
```json
{
  "id": "1",
  "title": "Plant tomatoes",
  "description": "Spring planting",
  "latitude": 51.5074,
  "longitude": -0.1278,
  "completed": false,
  "createdAt": "2024-03-01T00:00:00Z"
}
```

#### POST /api/todos
Create a new task.

**Request:**
```json
{
  "title": "Plant tomatoes",
  "description": "Spring planting",
  "latitude": 51.5074,
  "longitude": -0.1278
}
```

**Response:** Same as GET /api/todos/:id

#### PATCH /api/todos/:id
Update a task.

**Request:**
```json
{
  "title": "Plant tomatoes",
  "completed": true
}
```

**Response:** Updated task object

#### DELETE /api/todos/:id
Delete a task.

**Response:** 204 No Content

## Data Types

The app expects tasks with this TypeScript interface:

```typescript
interface Todo {
  id: string
  title: string
  description: string
  latitude: number
  longitude: number
  completed: boolean
  createdAt: Date
}

interface CreateTodoDto {
  title: string
  description?: string
  latitude?: number
  longitude?: number
}

interface UpdateTodoDto {
  title?: string
  description?: string
  latitude?: number
  longitude?: number
  completed?: boolean
}
```

## Example Backend Implementations

### Node.js / Express

```typescript
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

let todos = []
let nextId = 1

app.get('/api/todos', (req, res) => {
  res.json(todos)
})

app.post('/api/todos', (req, res) => {
  const todo = {
    id: String(nextId++),
    ...req.body,
    completed: false,
    createdAt: new Date(),
  }
  todos.push(todo)
  res.json(todo)
})

app.patch('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id)
  if (!todo) return res.status(404).json({ error: 'Not found' })
  Object.assign(todo, req.body)
  res.json(todo)
})

app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== req.params.id)
  res.status(204).send()
})

app.listen(3000)
```

### Python / Flask

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

todos = []
next_id = 1

@app.route('/api/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route('/api/todos', methods=['POST'])
def create_todo():
    global next_id
    todo = {
        'id': str(next_id),
        **request.json,
        'completed': False,
        'createdAt': datetime.now().isoformat()
    }
    next_id += 1
    todos.append(todo)
    return jsonify(todo), 201

@app.route('/api/todos/<id>', methods=['PATCH'])
def update_todo(id):
    todo = next((t for t in todos if t['id'] == id), None)
    if not todo:
        return jsonify({'error': 'Not found'}), 404
    todo.update(request.json)
    return jsonify(todo)

@app.route('/api/todos/<id>', methods=['DELETE'])
def delete_todo(id):
    global todos
    todos = [t for t in todos if t['id'] != id]
    return '', 204

if __name__ == '__main__':
    app.run(port=3000)
```

## Authentication (Optional)

If your backend uses JWT authentication:

1. Store the token after login:
```typescript
import { setToken } from '@shared/auth/jwt'

setToken(jwtToken)
```

2. The token is automatically included in all API requests via the interceptor in `src/shared/api/client.ts`

3. On 401 response, the token is automatically removed

## Testing with Postman

Use Postman to test your API endpoints before integrating:

1. **GET** `http://localhost:3000/api/todos`
2. **POST** `http://localhost:3000/api/todos`
   - Body: `{ "title": "Test", "latitude": 51.5, "longitude": -0.1 }`
3. **PATCH** `http://localhost:3000/api/todos/1`
   - Body: `{ "completed": true }`
4. **DELETE** `http://localhost:3000/api/todos/1`

## Troubleshooting

### CORS Errors
Make sure your backend includes CORS headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PATCH, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### 401 Errors
The app will remove the stored JWT token on 401. Re-login is required.

### 404 Errors
Check that your API base URL matches `VITE_API_BASE_URL` in `.env.local`.

## Removing the Mock API

Once your backend is ready, you can delete:
- `src/shared/api/mockApi.ts` (no longer needed)

The app will use your real backend API automatically.
