<script setup lang="ts">
const activeTab = ref('Songs')
</script>

<template>
    <div class="min-h-screen bg-neutral-900 text-white flex">
        <Sidebar/>
        <main class="flex-1 p-6 mx-4 my-3">
            
            <!-- Playlist Header -->
            <div class="flex flex-row justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold mb-1">Playlist 1</h1>
                    <p class="text-gray-400">27 songs</p>
                </div>
                <div class="flex space-x-2 sm:space-x-4 w-full sm:w-auto">
                    <UButton class="bg-neutral-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100">
                        <Icon name="material-symbols:content-copy" />Copy Link
                    </UButton>
                    <UButton color="red">
                        <Icon name="radix-icons:exit"/>Leave Playlist
                    </UButton>
                    </div>
                </div>

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
      
        <Playlist v-if="activeTab === 'Songs'"/>
        <VoteList v-if="activeTab === 'Vote'"/>
      </main>
    </div>
  </template>
  