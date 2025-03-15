<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const searchQuery = ref('') 
const searchResults = ref([]) 
const spotifyAccessToken = ref('') 
const spotifyTokenExpiry = ref(0) 

const config = useRuntimeConfig()

const props = defineProps({
  playlistId: {
    type: String,
    required: true,
  },
});

const fetchSpotifyToken = async () => {
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('spotify_access_token, spotify_token_expiry')
    .eq('id', user.value.id)
    .single()

  if (userError) {
    console.error('Error fetching Spotify token:', userError)
    return
  }
  console.log(spotifyAccessToken.value)
  spotifyAccessToken.value = userData.spotify_access_token
  spotifyTokenExpiry.value = new Date(userData.spotify_token_expiry).getTime()
}

// Function to refresh the Spotify access token
const refreshSpotifyToken = async () => {
  try {
    // Fetch the user's Spotify refresh token from Supabase
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('spotify_refresh_token')
      .eq('id', user.value.id)
      .single()
    
    if (userError || !userData.spotify_refresh_token) {
      console.error('Error fetching Spotify refresh token:', userError)
      return
    }

    const refreshToken = userData.spotify_refresh_token
    
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${config.public.spotifyClientId}:${config.public.spotifyClientSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: config.public.spotifyClientId
      }),
    }
    const body = await fetch(url, payload);
    const response = await body.json();

    // Update the Spotify access token and expiry in the database
    const { error: updateError } = await supabase
      .from('users')
      .update({
        spotify_access_token: response.access_token,
        spotify_token_expiry: new Date(Date.now() + response.expires_in * 1000).toISOString(),
      })
      .eq('id', user.value.id)

    if (updateError) {
      console.error('Error updating Spotify token:', updateError)
      return
    }

    spotifyAccessToken.value = response.access_token
    spotifyTokenExpiry.value = Date.now() + response.expires_in * 1000

    console.log('Spotify access token refreshed successfully')
  } catch (err) {
    console.error('Unexpected error refreshing Spotify token:', err)
  }
}

watch(
  () => spotifyTokenExpiry.value,
  async (newExpiry) => {
    if (newExpiry && newExpiry <= Date.now()) {
      console.log('Spotify access token expired. Refreshing...')
      await refreshSpotifyToken()
    }
  },
  { immediate: true } 
)

fetchSpotifyToken()

const fetchSongsFromTable = async () => {
  try {
    const { data: songs, error } = await supabase
      .from('songs')
      .select('spotify_song_id');

    if (error) {
      console.error('Error fetching songs from table:', error);
      return [];
    }

    return songs.map((song) => song.spotify_song_id);
  } catch (err) {
    console.error('Unexpected error fetching songs from table:', err);
    return [];
  }
};

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

    const songsInTable = await fetchSongsFromTable();

    searchResults.value = data.tracks.items.map((song) => ({
      ...song,
      isLiked: songsInTable.includes(song.id),}))
  } catch (err) {
    console.error('Unexpected error:', err)
    alert('An unexpected error occurred. Please try again.')
  }
}

const toggleLike = async (songId: string) => {
  const song = searchResults.value.find((song) => song.id === songId);
  if (!song || song.isLiked) {
    // If the song is already liked, do nothing
    return;
  }

  try {
    // Insert the song into the songs table if it doesn't exist
    const { error: upsertError } = await supabase
      .from('songs')
      .upsert(
        {
          spotify_song_id: songId,
          name: song.name,
          artist: song.artists.map((artist) => artist.name).join(', '),
          playlist_id: props.playlistId,
          img_url: song.album.images[0]?.url,
          added_by: user.value.id,
          votes: 1, // Initialize votes to 1
        },
        { onConflict: 'id' }
      );

    if (upsertError) {
      console.error('Error upserting song:', upsertError);
      return;
    }
    // Update the UI to reflect the like
    song.isLiked = true;
  } catch (err) {
    console.error('Unexpected error toggling like:', err);
  }
};

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
            <tr v-for="song in searchResults" :key="song.id" class="border-b border-gray-700 hover:bg-green-700">
              <td class="py-3 px-4">
                <UAvatar
                :src=song.album.images[0].url
                alt="Album Cover"
                size="md"
                label="Album Cover"
              />
              </td>
              <td class="py-3 px-4">{{ song.name }}</td>
              <td class="py-3 px-4">{{ song.artists.map(artist => artist.name).join(', ') }}</td>
              <td class="py-3 px-4">{{ Math.floor(song.duration_ms / 60000) }}:{{ ((song.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0') }}</td>
              <td class="py-3 px-4">
                <button class="flex items-center gap-1" @click="toggleLike(song.id)">
                  <Icon
                  v-if="!song.isLiked"
                  class="p-1 text-white hover:bg-gray-800 rounded-full cursor-pointer"
                  name="material-symbols-light:favorite-outline"
                  size="28"
                  />
                  <Icon
                  v-else
                  class="p-1 text-green-400 rounded-full cursor-pointer"
                  name="material-symbols:favorite-rounded"
                  size="28"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>
</template>