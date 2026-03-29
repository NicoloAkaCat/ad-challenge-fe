<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { data: users, pending, error, refresh } = useFetch<User[]>('/api/users')
</script>

<template>
  <UContainer class="py-10">
    <UPageCard title="Users" description="View currently registered users.">
      <UTable :data="users" :loading="pending" />

      <UButton
        v-if="error"
        icon="i-lucide-circle-x"
        size="md"
        color="error"
        variant="outline"
        @click="refresh()"
      >
        Error loading users: {{ error.statusMessage }}
      </UButton>
    </UPageCard>
  </UContainer>
</template>
