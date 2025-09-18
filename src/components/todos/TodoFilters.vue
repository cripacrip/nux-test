<script setup lang="ts">
import type { StatusFilter } from '../../types'

defineProps<{
  status: StatusFilter
  userId: string | number
  search: string
  userIdOptions: number[]
}>()
defineEmits<{
  (e: 'update:status', value: StatusFilter): void
  (e: 'update:userId', value: string | number): void
  (e: 'update:search', value: string): void
}>()
</script>

<template>
  <div class="filters">
    <div class="filter-item">
      <label>Status</label>
      <select
        class="select"
        :value="status"
        @change="$emit('update:status', ($event.target as HTMLSelectElement).value as StatusFilter)"
      >
        <option>All</option>
        <option>Completed</option>
        <option>Uncompleted</option>
        <option>Favorites</option>
      </select>
    </div>

    <div class="filter-item">
      <label>User</label>
      <select
        class="select"
        :value="userId"
        @change="$emit('update:userId', ($event.target as HTMLSelectElement).value)"
      >
        <option>All Users</option>
        <option 
          v-for="id in userIdOptions"
          :key="id"
          :value="id"
        >
          {{ id }}
        </option>
      </select>
    </div>

    <div class="filter-item">
      <label>Search</label>
      <input
        class="input"
        type="text"
        :value="search"
        @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
        placeholder="Search title..."
      />
    </div>
  </div>
</template>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

/* each filter (label + control) grouped together */
.filter-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 12px;
  color: #9ca3af;
}

.select,
.input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #374151;
  background: #0b1220;
  color: #e5e7eb;
}

@media (max-width: 640px) {
  .filters {
    grid-template-columns: 1fr;
  }
}
</style>
