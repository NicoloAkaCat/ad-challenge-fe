<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { clear, fetch } = useUserSession()
const { data: user, pending, error, refresh } = useFetch<User>('/api/auth/me')

const updating = ref(false)
const updateForm = useTemplateRef('updateForm')
const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email().optional(),
  presentation: z.string().max(500).optional()
})

async function updateUser(data: zInfer<typeof updateUserSchema>) {
  try {
    await $fetch(`/api/users/${user.value?.id}`, {
      method: 'PUT',
      body: { ...data }
    })
    // Refresh local session state
    await fetch()
    await refresh()
    updating.value = false
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    useToast().add({
      title: 'Update User Failed',
      description: 'Something went wrong. Please try again.',
      icon: 'i-lucide-circle-x',
      color: 'error'
    })
  }
}

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
        <h3 v-else-if="!error && !updating" class="text-2xl font-bold">
          {{ user?.firstName }} {{ user?.lastName }} | {{ user?.email }}
        </h3>
      </template>

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
      <p v-else-if="!updating && !pending" class="text-muted text-lg">
        {{ user?.presentation }}
      </p>
      <AutoForm
        v-else-if="updating"
        ref="updateForm"
        :schema="updateUserSchema"
        :initial-state="user"
        :config="{ submit: false }"
        @submit="updateUser($event)"
      />

      <template #footer>
        <div v-if="!error" class="flex justify-end gap-2">
          <UButton
            v-if="!updating"
            icon="i-lucide-user-pen"
            color="primary"
            variant="soft"
            @click="updating = true"
          >
            Update Profile
          </UButton>
          <UButton
            v-else
            icon="i-lucide-user-check"
            color="primary"
            variant="soft"
            @click="updateForm?.submit()"
          >
            Save Profile
          </UButton>
          <UButton
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
