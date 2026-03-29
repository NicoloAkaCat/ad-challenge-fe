<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const { clear } = useUserSession()
const { data: user, pending, error, refresh } = useFetch<User>('/api/auth/me')

async function deleteUser(id: string) {
  try {
    await $fetch(`/api/users/${id}`, {
      method: 'DELETE'
    })
    await clear()
    await navigateTo('/')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    useToast().add({
      title: 'Delete Failed',
      description: 'Please try again later.',
      icon: 'i-lucide-circle-x',
      color: 'error'
    })
  }
}
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
            @click="deleteUser(user?.id ?? '')"
          >
            Delete Account
          </UButton>
        </div>
      </template>
    </UCard>
  </UContainer>
</template>
