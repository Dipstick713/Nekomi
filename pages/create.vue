<script setup>
import { nanoid } from 'nanoid';

const supabase = useSupabaseClient()
const session = useSupabaseSession()

const activeTab = ref('join')
const roomCode = ref('')
const roomName = ref('')

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const generateRoomCode = () => {
  return nanoid(6);
};

const playlistCode = generateRoomCode();

const createRoom = async () => {
  if (!session.value) {
    console.error('User not authenticated')
    return
  }

  const { data: playlist, error: playlistError } = await supabase
    .from('playlists')
    .insert([
      {
        name: roomName.value,
        owner_id: session.value.user.id,
        playlist_code: playlistCode,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ])
    .select()
    .single()

  if (playlistError) {
    console.error('Error creating playlist:', playlistError)
    return
  }

  const { error: memberError } = await supabase
    .from('members')
    .insert([
      {
        playlist_id: playlist.id,
        user_id: session.value.user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ])

  if (memberError) {
    console.error('Error adding member:', memberError)
    return
  }

  navigateTo('/user')
}

const joinRoom = async () => {
  if (!session.value) {
    console.error('User not authenticated')
    return
  }
  if (!roomCode.value) {
    console.error('Playlist code is required')
    return
  }

  // Fetch the playlist by playlist code
  const { data: playlist, error: playlistError } = await supabase
    .from('playlists')
    .select('*')
    .eq('playlist_code', roomCode.value.trim())
    .maybeSingle()

  if (playlistError) {
    console.error('Error fetching playlist:', playlistError)
    return
  }

  if (!playlist) {
    console.error('Playlist not found')
    return
  }

  // Check if the user is already a member of the playlist
  const { data: existingMember, error: memberCheckError } = await supabase
    .from('members')
    .select('*')
    .eq('playlist_id', playlist.id)
    .eq('user_id', session.value.user.id)
    .single()

  if (memberCheckError && memberCheckError.code !== 'PGRST116') {
    console.error('Error checking membership:', memberCheckError)
    return
  }

  if (existingMember) {
    console.error('User is already a member of this playlist')
    return
  }

  // Add the user to the members table
  const { error: memberError } = await supabase
    .from('members')
    .insert([
      {
        playlist_id: playlist.id,
        user_id: session.value.user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ])

  if (memberError) {
    console.error('Error joining playlist:', memberError)
    return
  }

  navigateTo('/user')
}
</script>

<template>
<div class="min-h-screen bg-neutral-900 text-white flex">
  <Sidebar/>
  <div class="flex-1 flex justify-center items-center"> 
    <div class="w-96 max-w-md bg-neutral-800 rounded-lg shadow-lg"> 
      <!-- Tab Buttons -->
      <div class="flex justify-around mb-4 p-4">
        <button 
          :class="`py-2 px-4 rounded-md font-medium ${
            activeTab === 'join' 
              ? 'bg-white text-black' 
              : 'bg-transparent text-white'
          }`"
          @click="setActiveTab('join')"
        >
          Join Playlist
        </button>
        <button 
          :class="`py-2 px-4 rounded-md font-medium ${
            activeTab === 'create' 
              ? 'bg-white text-black' 
              : 'bg-transparent text-white'
              
          }`"
          color="blue"
          @click="setActiveTab('create')"
        >
          Create Playlist
        </button>
      </div>
      
      <!-- Join Room Panel -->
      <div v-if="activeTab === 'join'" class="border border-gray-600 rounded-lg p-6 mx-4 mb-4"> <!-- Added margin -->
        <h2 class="text-white text-xl font-bold mb-2">Join Playlist</h2>
        <p class="text-blue-400 text-sm mb-4">Enter the playlist code here.</p>
        
        <input
          type="text"
          v-model="roomCode"
          placeholder="Enter Playlist Code"
          class="w-full bg-zinc-700 text-white py-3 px-4 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button 
          @click="joinRoom"
          class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Join
        </button>
      </div>
      
      <!-- Create Room Panel -->
      <div v-if="activeTab === 'create'" class="border border-gray-600 rounded-lg p-6 mx-4 mb-4"> <!-- Added margin -->
        <h2 class="text-white text-xl font-bold mb-2">Create Playlist</h2>
        <p class="text-blue-400 text-sm mb-4">Set up a new playlist.</p>
        
        <input
          type="text"
          v-model="roomName"
          placeholder="Enter Playlist Name"
          class="w-full bg-zinc-700 text-white py-3 px-4 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          @click="createRoom"
          class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</div>
</template>