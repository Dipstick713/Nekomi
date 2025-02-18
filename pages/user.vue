<script setup lang="ts">

</script>

<template>
    <div class="min-h-screen bg-neutral-900 text-white flex">
      <Sidebar/>
      <!-- Main Content -->
      <main class="flex-1 p-6 mx-4 my-3">
        <h1 class="text-3xl font-bold mb-8">Your Playlists</h1>
  
        <!-- Room Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <!-- Room (Hard coded for now)--> 
          <div class="bg-zinc-800 p-6 rounded-lg">
            <h2 class="text-xl font-bold mb-2">Dipstick</h2>
            <p class="text-gray-400 mb-4">Created by: dipstick</p>
            <div class="flex space-x-4">
              <UButton>
                <Icon name="material-symbols:content-copy" />Copy Link
              </UButton>
              <UButton>
                Enter playlist <Icon name="material-symbols:arrow-forward-ios-rounded"/>
              </UButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>