export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const token = (session?.secure as { token: string } | undefined)?.token

  if (!token)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const config = useRuntimeConfig(event)
  const id = getRouterParam(event, 'id')
  try {
    return await $fetch(`${config.apiBase}/auth/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.response?._data?.message || 'Failed to delete user'
    })
  }
})
