<script setup lang="ts">
import LeaderBoard from '~/components/LeaderBoard.vue';

const supabase = useSupabaseClient();
const activeTab = ref('Songs');
const route = useRoute();
const user = useSupabaseUser();
const playlistName = ref('');
const playlistCode = ref('');
const totalMembers = ref(0);

const fetchPlaylistDetails = async () => {
  const { data: playlist, error } = await supabase
    .from('playlists')
    .select('name, playlist_code')
    .eq('id', route.params.id)
    .single();

  if (error) {
    console.error('Error fetching playlist details:', error);
    return;
  }

  playlistName.value = playlist.name;
  playlistCode.value = playlist.playlist_code;

  const { count, error: membersError } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })
    .eq('playlist_id', route.params.id);

  if (membersError) {
    console.error('Error fetching total members:', membersError);
    return;
  }

  totalMembers.value = count || 0; // Set total members count
};

const checkMembership = async () => {
  const userId = user.value.id;

  const { data: member, error } = await supabase
    .from('members')
    .select('user_id')
    .eq('playlist_id', route.params.id)
    .eq('user_id', userId)
    .single();

  if (error || !member) {
    navigateTo('/user')
  }
};



const copyPlaylistCode = async () => {
  try {
    await navigator.clipboard.writeText(playlistCode.value);
    alert('Playlist code copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

onMounted(() => {
  checkMembership();
  fetchPlaylistDetails();
  
});
</script>

<template>
  <div class="min-h-screen bg-neutral-900 text-white flex">
    <Sidebar />
    <main class="flex-1 p-6 mx-4 my-3">
      <!-- Playlist Header -->
      <div class="flex flex-row justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold mb-1">{{ playlistName }}</h1>
          <p class="text-gray-400">Total Members: {{ totalMembers }}</p>
        </div>
        <div class="flex space-x-2 sm:space-x-4 w-full sm:w-auto">
          <UButton
            class="bg-neutral-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
            @click="copyPlaylistCode"
          >
            <Icon name="material-symbols:content-copy" />Copy Code
          </UButton>
        </div>
      </div>

      <!-- Tab Navigation -->
      <nav class="grid grid-cols-1 my-6 md-2 md:grid-cols-3 font-bold bg-zinc-800 rounded-lg p-2 space-x-2">
        <button
          @click="activeTab = 'Songs'"
          :class="[
            'p-1 transition-colors rounded-lg',
            activeTab === 'Songs' ? 'bg-neutral-500' : 'hover:bg-neutral-700'
          ]"
        >
          Songs
        </button>
        <button
          @click="activeTab = 'Vote'"
          :class="[
            'p-1 transition-colors rounded-lg',
            activeTab === 'Vote' ? 'bg-neutral-500' : 'hover:bg-neutral-700'
          ]"
        >
          Vote
        </button>
        <button
          @click="activeTab = 'Leaderboard'"
          :class="[
            'p-1 transition-colors rounded-lg',
            activeTab === 'Leaderboard' ? 'bg-neutral-500' : 'hover:bg-neutral-700'
          ]"
        >
          Leaderboard
        </button>
      </nav>

      <!-- Dynamic Content -->
      <Playlist v-if="activeTab === 'Songs'" />
      <VoteList v-if="activeTab === 'Vote'" />
      <LeaderBoard v-if="activeTab === 'Leaderboard'" />
    </main>
  </div>
</template>