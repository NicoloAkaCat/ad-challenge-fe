export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const token = (session?.secure as { token: string } | undefined)?.token

  if (!token)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const config = useRuntimeConfig(event)

  return await $fetch(`${config.apiBase}/auth/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
})
