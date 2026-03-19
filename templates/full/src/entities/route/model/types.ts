export interface Route {
  id: string
  name: string
  waypoints: Array<{ lat: number; lng: number }>
  todoIds: string[]
  createdAt: string
}
