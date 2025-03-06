<script setup lang="ts">
const supabase = useSupabaseClient()
const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
  else navigateTo('/')
}
</script>

<template>
      <!-- Sidebar -->
      <aside class="w-64 bg-neutral-800 border-r border-neutral-600 p-6">
        <!-- User Info -->
        <div class="mb-3 mt-3 border-b border-neutral-600">
          <div class="flex flex-row justify-between">
            <div class="text-lg flex font-bold py-1">
              <UAvatar
                src="https://avatars.githubusercontent.com/u/739984?v=4"
                alt="Avatar"
                class="mx-2"
                label="Log out"
              />Dipstick
            </div>
              <UButton
                icon="ic:outline-log-out"
                @click="signOut"
                size="sm"
                color="red"
                square
                variant="solid"
              />
            </div>

          <div class="text-gray-400 mx-2 mb-3 mt-1 text-sm">example@gmail.com</div>
        </div>
  
        <!-- Navigation Links -->
        <nav class="space-y-2">
          <a href=/user class="block hover:bg-neutral-700 p-2 rounded">Your Playlists</a>
          <a href=/create class="block hover:bg-neutral-700 p-2 rounded">Create/Join Playlist</a>
        </nav>
      </aside>
</template>