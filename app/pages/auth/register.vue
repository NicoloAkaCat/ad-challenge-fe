<script setup lang="ts">
import { AInputPasswordToggle } from '#components'

useSeoMeta({
  title: 'Register - Ad Challenge',
  description: 'Register an account'
})

const { fetch } = useUserSession()

const registerSchema = z.object({
  firstName: z.string({ error: 'First name is required' }).nonempty(),
  lastName: z.string({ error: 'Last name is required' }).nonempty(),
  email: z.email({ error: 'Email is required' }).nonempty(),
  password: z
    .string({ error: 'Password is required' })
    .min(8)
    .max(100)
    .nonempty()
    .meta({ input: { component: AInputPasswordToggle } }),
  presentation: z.string({ error: 'Presentation is required' }).nonempty()
})

async function register(data: zInfer<typeof registerSchema>) {
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { ...data }
    })
    // Refresh local session state
    await fetch()
    await navigateTo('/')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    useToast().add({
      title: 'Register Failed',
      description: 'Something went wrong. Please try again.',
      icon: 'i-lucide-circle-x',
      color: 'error'
    })
  }
}
</script>

<template>
  <UPageSection
    title="Register"
    description="Please enter your credentials to create an account."
    icon="i-lucide-user-plus"
    orientation="horizontal"
  >
    <UPageCard>
      <AutoForm :schema="registerSchema" @submit="register($event)" />
    </UPageCard>
  </UPageSection>
</template>
