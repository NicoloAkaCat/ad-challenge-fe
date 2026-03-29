export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig(event)

  try {
    const response = await $fetch(`${config.apiBase}/auth/login`, {
      method: 'POST',
      body
    })

    const access_token = (response as { access_token: string }).access_token

    await setUserSession(event, {
      secure: {
        token: access_token
      }
    })

    return { success: true }
  } catch (error: any) {
    throw createError({
      statusCode: error?.status || 401,
      message: error?.message || 'Login failed'
    })
  }
})
