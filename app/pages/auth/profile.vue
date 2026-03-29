<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const { data: user, pending, error, refresh } = useFetch<User>('/api/auth/me')
</script>

<template>
  <UContainer class="py-10">
    <UCard variant="subtle" class="max-w-2xl mx-auto">
      <template #header>
        <USkeleton v-if="pending" class="h-8" />
        <h3 v-else-if="!error" class="text-lg font-bold">
          {{ user?.firstName }} {{ user?.lastName }} | {{ user?.email }}
        </h3>
      </template>

      <div v-if="!error">
        <p class="text-muted text-lg">{{ user?.presentation }}</p>
      </div>
      <UButton
        v-if="error"
        icon="i-lucide-circle-x"
        size="md"
        color="error"
        variant="outline"
        @click="refresh()"
      >
        Error loading profile: {{ error.statusMessage }}
      </UButton>

      <template #footer>
        <div class="flex justify-end">
          <UButton
            v-if="!error"
            icon="i-lucide-trash-2"
            color="error"
            variant="ghost"
          >
            Delete Account
          </UButton>
        </div>
      </template>
    </UCard>
  </UContainer>
</template>
