<script setup lang="ts">
const supabase = useSupabaseClient()

const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'spotify',
    options: {
      redirectTo: 'http://localhost:3000/confirm',
    },
  })
  if (error) {
    console.log(error)
    return
  }
}
</script>

<template>
    <section class="container mx-auto text-center py-20">
    <h1 class="text-5xl py-4 font-bold mb-4">Build the Ultimate Playlist With Your Crew</h1>
    <p class="text-xl mb-8 mx-auto max-w-3xl">
        Collaborate seamlessly to create playlists filled with everyone's favorite tunes. Vote on top tracks to shape the vibe and keep tabs on who’s grooving to the beats the most. Discover, share, and enjoy music together like never before!
    </p>
    <div class="flex items-center justify-center">
        <UButton
        @click="signInWithOAuth"
        icon="ri:spotify-fill"
        size="lg"
        color="green"
        variant="solid"
        label="Continue with Spotify"
        :trailing="false"
        />
    </div>
  </section>
</template>
