<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'submit', payload: { username: string; phone: string }): void
}>()

const username = ref('')
const phone = ref('')
const error = ref('')

function handleUsernameInput(e: Event) {
  const target = e.target as HTMLInputElement
  target.value = target.value.replace(/[^a-zA-Z\u0400-\u04FF\s]/g, '')
  username.value = target.value
}

function onSubmit() {
  error.value = ''
  if (!username.value.trim() || !phone.value.trim()) {
    error.value = 'Please fill in both fields'
    return
  }
  emit('submit', { username: username.value, phone: phone.value })
}
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="form"
  >
    <label class="label">
      Username
    </label>
    <input
      class="input"
      type="text"
      :value="username"
      @input="handleUsernameInput"
      placeholder="Enter username"
      autocomplete="username"
    />

    <label class="label">
      Phone number
    </label>
    <input 
      class="input"
      type="tel"
      v-model.trim="phone"
      placeholder="Enter phone"
      autocomplete="tel"
    />

    <button 
      class="button"
      type="submit"
    >
      Login
    </button>
    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
.label {
  font-size: 14px;
  color: #9ca3af;
}
.input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #374151;
  background: #0b1220;
  color: #e5e7eb;
}
.input:focus {
  border-color: #6366f1;
}
.button {
  margin-top: 8px;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: #6366f1;
  color: white;
  cursor: pointer;
}
.error {
  color: #f87171;
  margin: 0;
  }
</style>


