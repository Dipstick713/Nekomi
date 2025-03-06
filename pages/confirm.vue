<template>
  <div class="callback-container">
    <h1>Processing login...</h1>
    <div class="loading-spinner"></div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const session = useSupabaseSession()
if (session.value) {
    const accessToken = session.value.provider_token

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (response.ok) {
      const userData = await response.json()
      const { error: dbError } = await supabase
        .from('users')
        .upsert({
          id: session.value.user.id,
          spotify_id: userData.id,
          display_name: userData.display_name,
          email: userData.email,
          avatar_url: userData.images?.[0]?.url,
          spotify_access_token: accessToken,
          spotify_refresh_token: session.value.provider_refresh_token,
          spotify_token_expiry: new Date(session.value.expires_at * 1000).toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' })
      if (dbError) {
        console.error('Error updating database:', dbError)
      } else {
        console.log('User data stored successfully')
      }
    }
    navigateTo('/user')
}
</script>
