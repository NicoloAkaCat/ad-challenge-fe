export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig(event)

  const response = await $fetch(`${config.apiBase}/auth/login`, {
    method: 'POST',
    body
  }).catch((e) => {
    throw createError({
      statusCode: e?.status || 401,
      message: e?.message || 'Login failed'
    })
  })

  const access_token = (response as { access_token: string }).access_token

  await setUserSession(event, {
    secure: {
      token: access_token
    }
  })

  return { success: true }
})
