<script setup lang="ts">
const supabase = useSupabaseClient()
const user= useSupabaseUser()
const {data} = await supabase
  .from('users')
  .select('display_name,email,avatar_url')
  .eq('id', user.value.id)
  .single();

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
  else navigateTo('/')
}
</script>

<template>
      <!-- Sidebar -->
       <div></div>
      <aside class="w-64 bg-neutral-800 border-r border-neutral-600 p-6">
        <!-- User Info -->
        <div class="mb-3 mt-3 border-b border-neutral-600">
          <div class="flex flex-row justify-between">
            <div class="text-lg flex font-bold py-1">
              <UAvatar
                :src=data.avatar_url
                alt="Avatar"
                class="mx-2"
                label="Log out"
              />{{ data.display_name }}
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

          <div class="text-gray-400 mx-2 mb-3 mt-1 text-sm">{{ data.email }}</div>
        </div>
  
        <!-- Navigation Links -->
        <nav class="space-y-2">
          <NuxtLink to=/user class="block hover:bg-neutral-700 p-2 rounded">Your Playlists</NuxtLink>
          <NuxtLink href=/create class="block hover:bg-neutral-700 p-2 rounded">Create/Join Playlist</NuxtLink>
          <NuxtLink href=/add class="block hover:bg-neutral-700 p-2 rounded">Add Songs</NuxtLink>
        </nav>
      </aside>
</template>