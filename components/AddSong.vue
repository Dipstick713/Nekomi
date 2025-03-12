<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const searchQuery = ref('') 
const searchResults = ref([]) 

const searchSongs = async () => {
  if (!searchQuery.value) {
    alert('Please enter a search query.')
    return
  }

  try {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('spotify_access_token')
      .eq('id', user.value.id)
      .single()

    if (userError || !userData.spotify_access_token) {
      console.error('Error fetching Spotify access token:', userError)
      alert('Failed to fetch Spotify access token. Please try again.')
      return
    }

    const accessToken = userData.spotify_access_token

    // Make a request to the Spotify API to search for songs
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery.value)}&type=track&limit=40`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!response.ok) {
      console.error('Error searching for songs:', await response.text())
      alert('Failed to search for songs. Please try again.')
      return
    }

    const data = await response.json()
    searchResults.value = data.tracks.items
    console.log(searchResults.value)
  } catch (err) {
    console.error('Unexpected error:', err)
    alert('An unexpected error occurred. Please try again.')
  }
}
</script>

<template>
    
    <div class="overflow-x-auto">
        <div class="space-x-4 m-1">
                <input
                v-model="searchQuery"
                type="text"
                placeholder="Enter Song Name"
                class=" bg-zinc-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <UButton @click="searchSongs" class="bg-green-500 hover:bg-green-600">
                    Search
                </UButton>
        </div>
        <div class="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table class="min-w-full mt-4 bg-neutral-800 rounded-lg">
          <thead>
            <tr class="text-left border-b border-gray-700">
              <th class="py-3 px-4">#</th>
              <th class="py-3 px-4">Title</th>
              <th class="py-3 px-4">Artist</th>
              <th class="py-3 px-4">
                <Icon name="mingcute:time-duration-line" class="text-white mt-2" size="23px" />
              </th>
              <th class="py-3 px-4">Vote</th>
            </tr>
          </thead>
          <tbody>
            <!-- Dynamic Song Rows -->
            <tr v-for="(song, index) in searchResults" :key="song.id" class="border-b border-gray-700">
              <td class="py-3 px-4">{{ index + 1 }}</td>
              <td class="py-3 px-4">{{ song.name }}</td>
              <td class="py-3 px-4">{{ song.artists.map(artist => artist.name).join(', ') }}</td>
              <td class="py-3 px-4">{{ Math.floor(song.duration_ms / 60000) }}:{{ ((song.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0') }}</td>
              <td class="py-3 px-4">
                <LikeButton/>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>
</template>