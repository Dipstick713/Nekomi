<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const playlists = ref()

const fetchPlaylists = async () => {
  try {
    const { data: membersData, error: membersError } = await supabase
      .from('members')
      .select('playlist_id')
      .eq('user_id', user.value.id)

    if (membersError) throw membersError

    const playlistIds = membersData.map(member => member.playlist_id)

    const { data: playlistsData, error: playlistsError } = await supabase
      .from('playlists')
      .select('id, name, owner_id, playlist_code, users:owner_id (display_name)')
      .in('id', playlistIds)

    if (playlistsError) throw playlistsError

    playlists.value = playlistsData
  } catch (error) {
    console.error('Error fetching playlists:', error)
  }
}

onMounted(() => {
  fetchPlaylists()
})

const copyPlaylistCode = async (playlistCode: string) => {
  try {
    await navigator.clipboard.writeText(playlistCode)
    alert('Playlist code copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy')
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-900 text-white flex">
    <Sidebar />
    <!-- Main Content -->
    <main class="flex-1 p-6 mx-4 my-3">
      <h1 class="text-3xl font-bold mb-8">Your Playlists</h1>

      <!-- Playlist Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div v-for="playlist in playlists" :key="playlist.id" class="bg-zinc-800 p-6 rounded-lg">
          <h2 class="text-xl font-bold mb-2">{{ playlist.name }}</h2>
          <p class="text-gray-400 mb-4">Created by: {{ playlist.users.display_name }}</p>
          <div class="flex space-x-4">
            <UButton @click="copyPlaylistCode(playlist.playlist_code)">
              <Icon name="material-symbols:content-copy" />Copy Code
            </UButton>
            <UButton @click="navigateTo(`/playlist/${playlist.id}`)">
              Enter playlist <Icon name="material-symbols:arrow-forward-ios-rounded" />
            </UButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>