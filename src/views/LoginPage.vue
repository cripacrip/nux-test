<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const isSubmitting = ref(false)
const errorMessage = ref('')

async function handleSubmit(payload: { username: string; phone: string }) {
  errorMessage.value = ''
  isSubmitting.value = true
  try {
    const ok = await login(payload.username, payload.phone)
    if (ok) router.push({ name: 'todos' })
    else errorMessage.value = 'login error'
  } catch {
    errorMessage.value = 'Network error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h1 class="title">Login</h1>
      <LoginForm @submit="handleSubmit" />
      <p
        v-if="isSubmitting"
        class="muted">
        Checking…
      </p>
      <p
        v-if="errorMessage"
        class="error"
      >
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #0f172a;
}
.card {
  width: 100%;
  max-width: 400px;
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 24px;
  color: #e5e7eb;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.title {
  margin: 0 0 16px;
  font-size: 24px;
}
.muted { color: #9ca3af; margin: 8px 0 0; }
.error {
  color: #f87171;
  margin: 0;
}
</style>


