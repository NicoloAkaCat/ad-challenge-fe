<script setup lang="ts">
import { AInputPasswordToggle } from '#components'

useSeoMeta({
  title: 'Login - Ad Challenge',
  description: 'Login to your account'
})

const { fetch } = useUserSession()

const loginSchema = z.object({
  email: z.email({ error: 'Email is required' }).nonempty(),
  password: z
    .string({ error: 'Password is required' })
    .min(8)
    .max(100)
    .nonempty()
    .meta({ input: { component: AInputPasswordToggle } })
})

async function login(email: string, password: string) {
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })
    // Refresh local session state
    await fetch()
    await navigateTo('/')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    useToast().add({
      title: 'Login Failed',
      description: 'Please check your credentials and try again.',
      icon: 'i-lucide-circle-x',
      color: 'error'
    })
  }
}
</script>

<template>
  <UPageSection
    title="Login"
    description="Please enter your credentials to sign in to your account."
    icon="i-lucide-user-key"
    orientation="horizontal"
  >
    <UPageCard>
      <AutoForm
        :schema="loginSchema"
        @submit="login($event.email, $event.password)"
      />
    </UPageCard>
  </UPageSection>
</template>
