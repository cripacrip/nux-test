import { ref, computed, reactive } from 'vue'
import { getTodos, createTodo } from '../api/todos'
import type { Todo, StatusFilter } from '../types'

const todos = ref<Todo[]>([])
const isLoading = ref(false)
const errorMessage = ref('')

const filters = reactive({
  status: 'All' as StatusFilter,
  userId: 'All Users' as string | number,
  searchQuery: '',
  search: '',
})

const favoriteTodoIds = ref<Set<number>>(loadFavorites())

function loadFavorites(): Set<number> {
  const stored = localStorage.getItem('favoriteTodos')
  if (!stored) return new Set()

  try {
    const parsed = JSON.parse(stored)
    const ids = Array.isArray(parsed)
      ? parsed.map(Number).filter(n => !isNaN(n))
      : []
    return new Set(ids)
  } catch {
    return new Set()
  }
}

function saveFavorites() {
  localStorage.setItem('favoriteTodos', JSON.stringify([...favoriteTodoIds.value]))
}

export function useTodos() {
  async function fetchTodos() {
    isLoading.value = true
    errorMessage.value = ''
    try {
      const response = await getTodos()
      if (!response.ok) throw new Error('Network error')
      todos.value = await response.json()
    } catch {
      errorMessage.value = 'Couldn’t load todos. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  const availableUserIds = computed(() => {
    const userIds = new Set(todos.value.map(todo => todo.userId))
    return [...userIds].sort((a, b) => a - b)
  })

  const filteredTodos = computed(() => {
    let result = [...todos.value]

    if (filters.status === 'Completed') {
      result = result.filter(todo => todo.completed)
    } else if (filters.status === 'Uncompleted') {
      result = result.filter(todo => !todo.completed)
    } else if (filters.status === 'Favorites') {
      result = result.filter(todo => favoriteTodoIds.value.has(todo.id))
    }

    if (filters.userId !== 'All Users') {
      const userId = Number(filters.userId)
      if (!isNaN(userId)) {
        result = result.filter(todo => todo.userId === userId)
      }
    }

    const rawQuery = (typeof filters.search === 'string' && filters.search) || filters.searchQuery || ''
    const query = String(rawQuery).trim().toLowerCase()
    if (query) {
      result = result.filter(todo => todo.title.toLowerCase().includes(query))
    }

    return result
  })

  function toggleFavorite(todoId: number) {
    if (favoriteTodoIds.value.has(todoId)) {
      favoriteTodoIds.value.delete(todoId)
    } else {
      favoriteTodoIds.value.add(todoId)
    }
    saveFavorites()
  }
  async function addTodo(userId: number, title: string) {
    const newTodo = { userId, title, completed: false }
    try {
      const response = await createTodo(newTodo)
      if (!response.ok) throw new Error('Network error')
      const createdTodo: Todo = await response.json()

      const id = createdTodo.id
      todos.value.unshift({ ...createdTodo, id })
    } catch {
      errorMessage.value = 'Failed to add todo. Please try again.'
    }
  }

  return {
    todos,
    isLoading,
    errorMessage,

    loading: isLoading,
    error: errorMessage,
    userIdOptions: availableUserIds,
    favoriteIds: favoriteTodoIds,
    filters,
    availableUserIds,
    filteredTodos,
    favoriteTodoIds,

    fetchTodos,
    toggleFavorite,
    addTodo,
  }
}

