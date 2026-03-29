export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)

  try {
    await $fetch(`${config.apiBase}/auth/register`, {
      method: 'POST',
      body
    })

    const { email, password } = body
    const loginResponse = await $fetch(`${config.apiBase}/auth/login`, {
      method: 'POST',
      body: { email, password }
    })

    const access_token = (loginResponse as { access_token: string })
      .access_token

    await setUserSession(event, {
      user: {
        email: email
      },
      secure: {
        token: access_token
      }
    })

    return { success: true }
  } catch (error: any) {
    throw createError({
      statusCode: error?.status || 500,
      statusMessage: error?.message || 'Registration failed'
    })
  }
})
