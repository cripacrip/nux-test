export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type StatusFilter = 'All' | 'Completed' | 'Uncompleted' | 'Favorites'

export type ApiUser = {
  id: number
  username: string
  phone: string
  name: string
  email: string
}
