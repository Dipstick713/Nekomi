<script setup lang="ts">
const playlistCode = ref()
const name = ref()
const playlistId = ref<string | null>(null);
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const verify = ref('')

const getPlaylist = async (code: string) => {
    const {data:isPlaylist} = await supabase
        .from('playlists')
        .select('name,id')
        .eq('playlist_code', code.trim())
        .single()
    if(!isPlaylist){
        verify.value = 'false'
        console.log("No playlist")
    }
    else 
    {
        const {data: isMember} = await supabase
        .from('playlists')
        .select('name')
        .eq('user_id', user.value.id)
        .eq('playlist_code', code.trim())
        .single()
        if(!isMember)
        {
            verify.value = 'noUser'
        }
        else {
            name.value=isPlaylist.name;
            playlistId.value = isPlaylist.id;
            verify.value = 'true';
        }
    }
}
</script>

<template>
    <div class="min-h-screen bg-neutral-900 text-white flex">
        <Sidebar/>
        <main class="flex-1 p-6 mx-4 my-3">
            <h1 class="text-3xl font-bold mb-3">Add Songs</h1>
            <p class="text-gray-400">Boost your playlist by voting for the songs you love! The more votes a song gets, the higher the chance it gets added.</p>
            <div class="flex items-center space-x-4 mt-4">
          <input
            v-model="playlistCode"
            type="text"
            placeholder="Enter Playlist Code"
            class=" bg-zinc-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <UButton @click="getPlaylist(playlistCode)" class="bg-green-500 hover:bg-green-600">
            Get Playlist
          </UButton>
        </div>
        <div v-if="verify==='false'" class="text-red-400 mt-2">Playlist does not exists.</div>
        <div v-if="verify==='noUser'" class="text-red-400">The user is not a member in this playlist.</div>
        <div v-if="verify==='true'"class="flex flex-row justify-between items-center mb-8">
            <div class="w-full border-t-4 border-neutral-700 mt-4 mb-2">
                <h3 class="text-2xl font-bold pt-2 mt-6 mb-3">Playlist: {{ name }}</h3>
                <p class="text-gray-400 mb-4">Note: If you’ve already voted for a song, you can remove your vote from the Vote List in the playlist.</p>
                <AddSong :playlistId="playlistId"/>
            </div>
        </div>
      </main>
    </div>
</template>