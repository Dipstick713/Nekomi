<script setup lang="ts">

const supabase = useSupabaseClient();
const playlistSongs = ref([]);
const route = useRoute();
const user = useSupabaseUser();

// Fetch songs and votes for the current playlist
const fetchSongsFromTable = async () => {
  const userId = user.value.id;

  // Fetch songs for the current playlist
  const { data: songs, error: songsError } = await supabase
    .from('songs')
    .select('*')
    .eq('playlist_id', route.params.id);

  if (songsError) {
    console.error('Error fetching songs from table:', songsError);
    return;
  }

  // Fetch total votes for each song
  const songsWithVotes = await Promise.all(
    songs.map(async (song) => {
      const { count, error: votesError } = await supabase
        .from('votes')
        .select('*', { count: 'exact', head: true })
        .eq('song_id', song.id);

      if (votesError) {
        console.error('Error fetching votes:', votesError);
        return { ...song, totalVotes: 0, isLiked: false };
      }

      // Check if the current user has voted for this song
      const { data: userVote, error: userVoteError } = await supabase
        .from('votes')
        .select('user_id')
        .eq('song_id', song.id)
        .eq('user_id', userId)
        .maybeSingle();

      return {
        ...song,
        totalVotes: count || 0,
        isLiked: !!userVote, // Set `isLiked` to true if the user has voted for this song
      };
    })
  );

  // Filter songs with more than 50% votes
  playlistSongs.value = songsWithVotes.filter(song => {
    const totalVotes = song.totalVotes;
    const requiredVotes = Math.ceil(totalVotes / 2); // More than 50%
    return song.totalVotes > requiredVotes;
  });
};

// Toggle like (vote) for a song
const toggleLike = async (songId) => {
  const song = playlistSongs.value.find(s => s.id === songId);
  const userId = user.value.id;

  if (song.isLiked) {
    // If already liked, delete the vote record for this user
    const { error } = await supabase
      .from('votes')
      .delete()
      .eq('song_id', songId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error unvoting:', error);
      return;
    }
  } else {
    // If not liked, insert a vote record for this user
    const { error } = await supabase
      .from('votes')
      .insert([{ song_id: songId, user_id: userId }]);

    if (error) {
      console.error('Error voting:', error);
      return;
    }
  }

  // Refresh the song list after voting/unvoting
  fetchSongsFromTable();
};

// Fetch songs when the component mounts
onMounted(() => {
  fetchSongsFromTable();
});
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-neutral-800 rounded-lg">
      <thead>
        <tr class="text-left border-b border-gray-700">
          <th class="py-3 px-4">#</th>
          <th class="py-3 px-4">Title</th>
          <th class="py-3 px-4">Artist</th>
          <th class="py-3 px-4"><Icon name="mingcute:time-duration-line" class="text-white mt-2" size="23px" /></th>
          <th class="py-3 px-4">Votes</th>
          <th class="py-3 px-4">Vote</th>
        </tr>
      </thead>
      <tbody>
        <!-- Dynamic Song Rows -->
        <tr v-for="(song, index) in playlistSongs" :key="song.id" class="hover:bg-green-700">
          <td class="py-3 px-4">
            <UAvatar
              :src="song.img_url"
              alt="Album Cover"
              size="md"
              label="Album Cover"
            />
          </td>
          <td class="py-3 px-4">{{ song.name }}</td>
          <td class="py-3 px-4 text-gray-400">{{ song.artist }}</td>
          <td class="py-3 px-4 text-gray-400">{{ song.duration }}</td>
          <td class="py-3 px-4 text-gray-400">{{ song.totalVotes }}</td>
          <td class="py-3 px-4 text-gray-400">
            <button class="flex items-center gap-1" @click="toggleLike(song.id)">
              <Icon
                v-if="!song.isLiked"
                class="p-1 text-white hover:bg-gray-800 rounded-full cursor-pointer"
                name="material-symbols-light:favorite-outline"
                size="28"
              />
              <Icon
                v-else
                class="p-1 text-green-400 hover:bg-gray-800 rounded-full cursor-pointer"
                name="material-symbols:favorite-rounded"
                size="28"
              />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>