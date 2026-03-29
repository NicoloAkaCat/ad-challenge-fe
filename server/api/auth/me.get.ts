export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const token = (session?.secure as { token: string } | undefined)?.token
  if (!token)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const config = useRuntimeConfig(event)
  try {
    return await $fetch(`${config.apiBase}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error: any) {
    throw createError({
      statusCode: error?.status || 401,
      message: error?.message || 'Login failed'
    })
  }
})
