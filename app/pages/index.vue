<template>
  <div>
    <UPageHero
      title="Ad Challenge - Frontend"
      description="A simple Nuxt application that satisfies the requirements of the challenge. It consumes the API exposed by the NestJS backend that enable a full authentication flow."
      :links="[
        {
          label: 'Sign up',
          to: '/auth/register',
          trailingIcon: 'i-lucide-arrow-right',
          size: 'xl'
        },
        {
          label: 'Sign In',
          to: '/auth/login',
          icon: 'i-lucide-user',
          size: 'xl',
          color: 'neutral',
          variant: 'subtle'
        }
      ]"
    />
  </div>
</template>
