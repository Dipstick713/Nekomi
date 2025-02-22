<script setup>
const activeTab = ref('join')
const roomCode = ref('')

const setActiveTab = (tab) => {
  activeTab.value = tab
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
          Join Room
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
          Create Room
        </button>
      </div>
      
      <!-- Join Room Panel -->
      <div v-if="activeTab === 'join'" class="border border-gray-600 rounded-lg p-6 mx-4 mb-4"> <!-- Added margin -->
        <h2 class="text-white text-xl font-bold mb-2">Join Room</h2>
        <p class="text-blue-400 text-sm mb-4">Enter the room code here.</p>
        
        <input
          type="text"
          v-model="roomCode"
          placeholder="Enter Room Code"
          class="w-full bg-zinc-700 text-white py-3 px-4 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button 
          class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Join Room
        </button>
      </div>
      
      <!-- Create Room Panel -->
      <div v-if="activeTab === 'create'" class="border border-gray-600 rounded-lg p-6 mx-4 mb-4"> <!-- Added margin -->
        <h2 class="text-white text-xl font-bold mb-2">Create Room</h2>
        <p class="text-blue-400 text-sm mb-4">Set up a new room.</p>
        
        <input
          type="text"
          v-model="roomName"
          placeholder="Enter Room Name"
          class="w-full bg-gray-700 text-white py-3 px-4 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Create New Room
        </button>
      </div>
    </div>
  </div>
</div>
</template>