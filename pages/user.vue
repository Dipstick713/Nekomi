<script setup lang="ts">
const supabase = useSupabaseClient()
const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
  else navigateTo('/')
}
</script>

<template>
    <div class="min-h-screen bg-neutral-900 text-white flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-neutral-800 border-r border-neutral-600 p-6">
        <!-- User Info -->
        <div class="mb-3 border-b border-neutral-600">
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

          <div class="text-gray-400 mx-2 mb-2 text-sm">example@gmail.com</div>
        </div>
  
        <!-- Navigation Links -->
        <nav class="space-y-2">
          <a href="#" class="block hover:bg-neutral-700 p-2 rounded">Your Playlists</a>
          <a href="#" class="block hover:bg-neutral-700 p-2 rounded">Create/Join Playlist</a>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <main class="flex-1 p-6">
        <h1 class="text-3xl font-bold mb-8">Your Playlists</h1>
  
        <!-- Room Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Room (Hard coded for now)--> 
          <div class="bg-zinc-800 p-6 rounded-lg">
            <h2 class="text-xl font-bold mb-2">Dipstick</h2>
            <p class="text-gray-400 mb-4">Created by: dipstick</p>
            <div class="flex space-x-4">
              <UButton>
                <Icon name="material-symbols:content-copy" />Copy Link
              </UButton>
              <UButton>
                Enter playlist <Icon name="material-symbols:arrow-forward-ios-rounded"/>
              </UButton>
            </div>
          </div>
  
        </div>
      </main>
    </div>
  </template>