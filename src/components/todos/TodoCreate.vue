<script setup lang="ts">
const emit = defineEmits<{
  (e: 'add', payload: { userId: number; title: string }): void
}>()

const model = defineModel<{
  userId: string; title: string
}>(
  { required: true }
)

function onAdd() {
  if (!model.value.userId || !model.value.title.trim()) return
  emit('add', { userId: Number(model.value.userId), title: model.value.title })
  model.value.userId = ''
  model.value.title = ''
}
</script>

<template>
  <div class="create">
    <h3>
      Create todo
    </h3>
    <div class="create-grid">
      <input 
        v-model="model.userId"
        class="input" type="number"
        min="1"
        placeholder="User ID"
      />
      <input
        v-model.trim="model.title"
        class="input"
        type="text"
        placeholder="Title"
      />
      <button
        class="button"
        @click="onAdd"
      >
        Add
      </button>
    </div>
  </div>
</template>

<style scoped>
.create {
  border-top: 1px solid #1f2937;
  padding-top: 12px;
}
.create-grid {
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  gap: 12px;
}
.input {
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
@media (max-width: 640px) {
  .create-grid {
    grid-template-columns: 1fr;
    }
  }
</style>


