<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import UserHeader from '../components/todos/UserHeader.vue'
import TodoFilters from '../components/todos/TodoFilters.vue'
import TodoCreate from '../components/todos/TodoCreate.vue'
import TodoListItem from '../components/todos/TodoListItem.vue'
import { useAuth } from '../composables/useAuth'
import { useTodos } from '../composables/useTodos'

const router = useRouter()
const { user, logout } = useAuth()
const { 
  isLoading, 
  errorMessage, 
  filters, 
  availableUserIds, 
  filteredTodos, 
  favoriteTodoIds, 
  fetchTodos, 
  toggleFavorite, 
  addTodo 
} = useTodos()

onMounted(async () => {
  if (!user.value) {
    router.replace({ name: 'login' })
    return
  }
  await fetchTodos()
})

const createModel = reactive({ userId: '', title: '' })

async function handleAdd(payload: { userId: number; title: string }) {
  await addTodo(payload.userId, payload.title)
}
</script>

<template>
  <div class="container">
    <UserHeader
      v-if="user"
      :user="user"
      @logout="logout"
    />

    <div class="controls">
      <TodoFilters
        :status="filters.status"
        :user-id="filters.userId"
        :search="filters.searchQuery"
        :user-id-options="availableUserIds"
        @update:status="status => (filters.status = status)"
        @update:userId="user => (filters.userId = user)"
        @update:search="search => (filters.searchQuery = search)"
      />

      <TodoCreate
        v-model="createModel"
        @add="handleAdd"
      />
    </div>

    <div>
      <div
        v-if="isLoading"
        class="state"
      >
        Loading...
      </div>
      <div 
        v-else-if="errorMessage"
        class="state error"
      >
        {{ errorMessage }}
      </div>
      <ul 
        v-else
        class="list"
      >
        <TodoListItem
          v-for="item in filteredTodos"
          :key="item.id"
          :id="item.id"
          :title="item.title"
          :user-id="item.userId"
          :completed="item.completed"
          :favorite="favoriteTodoIds.has(item.id)"
          @toggle-fav="toggleFavorite"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 16px;
  max-width: 960px;
  margin: 0 auto;
  color: #e5e7eb;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
}
.user {
  display: flex;
  gap: 12px;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: #6366f1;
  display: grid;
  place-items: center;
  color: white;
  font-weight: 700;
}
.info .name { 
  font-weight: 600; 
}
.info .meta { 
  color: #9ca3af;
  font-size: 12px;
}
.logout {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
}
.controls {
  display: grid;
  gap: 20px;
  margin: 12px 0 20px;
}
.filters {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
label {
  font-size: 12px;
  color: #9ca3af;
}
.select, .input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #374151;
  background: #0b1220;
  color: #e5e7eb;
}
.button {
  padding: 10px 12px;
  border-radius: 8px;
  border: 0;
  background: #10b981;
  color: white;
  cursor: pointer;
}
.create {
  border-top: 1px solid #1f2937;
  padding-top: 12px;
}
.create-grid {
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  gap: 12px;
}
.list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 10px;
}
.item {
  padding: 12px;
  border: 1px solid #1f2937;
  border-radius: 10px;
  background: #0b1220;
}
.item.done { 
  opacity: 0.8;
}
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todo-title { 
  font-weight: 600;
}
.meta {
  color: #9ca3af;
  font-size: 12px;
  margin-top: 4px;
}
.fav {
  background: transparent;
  border: 1px solid #374151;
  color: #9ca3af;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
}
.fav.active { 
  color: #f59e0b;
  border-color: #f59e0b;
}
.state {
  color: #9ca3af;
}
.error {
  color: #f87171;
}
@media (max-width: 640px) {
  .filters { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .create-grid { grid-template-columns: 1fr; }
}
</style>