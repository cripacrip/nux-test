<script setup lang="ts">
defineProps<{
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  favorite: boolean;
}>();

defineEmits<{
  (e: "toggle-fav", id: number): void
}>();
</script>

<template>
  <li class="item" :class="{ done: completed }">
    <div class="title-row">
      <span class="todo-title">{{ title }}</span>
      <button
        class="fav"
        :class="{ active: favorite }"
        @click="$emit('toggle-fav', id)"
      >
        ★
      </button>
    </div>
    <div class="meta">
      User {{ userId }} • {{ completed ? "Completed" : "Uncompleted" }}
    </div>
  </li>
</template>

<style scoped>
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
</style>
