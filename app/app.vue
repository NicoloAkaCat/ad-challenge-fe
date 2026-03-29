<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const { loggedIn } = useUserSession()

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
          label: 'Users',
          to: '/users'
        }
      ]
)
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
