<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Ad Challenge - Frontend'
const description = 'Nuxt application that satisfies challenge requirements '

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const route = useRoute()
const { loggedIn, clear } = useUserSession()

const items = computed<NavigationMenuItem[]>(() =>
  !loggedIn.value
    ? [
        {
          label: 'Registration',
          to: '/auth/register',
          active: route.path.startsWith('/auth/register')
        },
        {
          label: 'Login',
          to: '/auth/login',
          active: route.path.startsWith('/auth/login')
        }
      ]
    : [
        {
          label: 'Profile',
          to: '/auth/profile',
          active: route.path.startsWith('/auth/profile')
        },
        {
          label: 'Users',
          to: '/users',
          active: route.path.startsWith('/users')
        }
      ]
)

async function logout() {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    await clear()
    await navigateTo('/auth/login')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    useToast().add({
      title: 'Logout Failed',
      description: 'Something went wrong while logging out. Please try again.',
      icon: 'i-lucide-circle-x',
      color: 'error'
    })
  }
}
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <AppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>
      </template>

      <UNavigationMenu :items="items" orientation="horizontal" />

      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>

      <template #right>
        <UColorModeButton />
        <UButton
          v-if="loggedIn"
          icon="i-lucide-log-out"
          size="md"
          color="error"
          variant="ghost"
          @click="logout"
        >
          Logout
        </UButton>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #default>
        <p class="text-sm text-muted">
          Built with Nuxt UI • © {{ new Date().getFullYear() }}
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
