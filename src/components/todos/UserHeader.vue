<script setup lang="ts">
import type { ApiUser } from "../../types";

defineProps<{
  user: ApiUser
}>();

defineEmits<{
  (e: "logout"): void
}>();
</script>

<template>
  <header class="header">
    <div class="user">
      <div class="avatar">
        {{ user.name[0] }}
      </div>
      <div class="info">
        <div class="name">
          {{ user.name }}
        </div>
        <div class="meta">
          @{{ user.username }} • {{ user.email }} • {{ user.phone }}
        </div>
      </div>
    </div>
    <button
      class="logout"
      @click="$emit('logout')"
    >
      Logout
    </button>
  </header>
</template>

<style scoped>
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
</style>
