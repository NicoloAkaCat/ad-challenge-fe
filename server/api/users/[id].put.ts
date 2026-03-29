export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const token = (session?.secure as { token: string } | undefined)?.token

  if (!token)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const config = useRuntimeConfig(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  try {
    const { email } = await $fetch<User>(`${config.apiBase}/auth/users/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body
    })
    await replaceUserSession(event, {
      user: {
        email: email
      },
      secure: {
        token: token
      }
    })
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.response?._data?.message || 'Failed to update user'
    })
  }
})
