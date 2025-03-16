<script setup lang="ts">
</script>

<template>
<div class="min-h-screen bg-neutral-900 text-white">
    <!-- Header -->
    <header class="p-6 bg-neutral-900">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-2xl font-bold">Nekomi</div>
        <nav class="space-x-4">
            <a
        href="https://github.com/Dipstick713"
        target="_blank"
        class="text-white underline"
        >
        <Icon name="mdi:github" class="hover:opacity-50 transition-opacity duration-300" size="25px"/>
        </a>
        <a
        href="https://x.com/dipsticksi"
        target="_blank"
        class="text-white underline"
        >
        <Icon name="bi:twitter-x" class="hover:opacity-50 transition-opacity duration-300" size="25px"/>
        </a> 
        <a
        href="https://discord.com/users/1063101828151132180"
        target="_blank"
        class="text-white underline"
        >
        <Icon name="ic:baseline-discord" class="hover:opacity-50 transition-opacity duration-300" size="25px"/>
        </a>  
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <Hero />

    <!-- Features Section -->
    <section class="bg-neutral-800 py-16">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-6 bg-neutral-700 rounded-lg">
            <Icon name="material-symbols:playlist-add" size="70px" class="text-green-400"/>
            <h3 class="text-xl font-bold mb-2 py-1 ">Make Playlist Together</h3>
            <p>Share music and create the perfect playlist with your favorite people. Start curating memories together today!</p>
          </div>
          <div class="p-6 bg-neutral-700 rounded-lg">
            <Icon name="bxs:upvote" size="70px" class="text-green-400"/>
            <h3 class="text-xl font-semibold mb-2">Vote Top Songs</h3>
            <p>Rank your favorite tracks and let the best songs rise to the top. Your playlist, your votes, your vibe!</p>
          </div>
          <div class="p-6 bg-neutral-700 rounded-lg">
            <Icon name="streamline:graph-arrow-increase-solid" size="70px" class="text-green-400"/>
            <h3 class="text-xl font-bold mb-2">Top Listener</h3>
            <p>Discover the top listener and find out who’s jamming to the tracks the most, leading the way in every beat!</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Built With Section -->
    <section class="container mx-auto text-center py-16">
      <h2 class="text-3xl font-bold mb-8">Built With</h2>
      <div class="text-5xl space-x-10 flex justify-center">
          <a
          href="https://nuxt.com/"
          target="_blank"
          >
            <Icon name="logos:nuxt-icon" class="hover:opacity-50 transition-opacity duration-300"/>
          </a>
        <a
        href="https://tailwindcss.com/"
        target="_blank"
        class="block"
        >
          <Icon name="logos:tailwindcss-icon" class="hover:opacity-50 transition-opacity duration-300"/>
        </a>
        <a
        href="https://supabase.com/"
        target="_blank"
        >
          <Icon class="hover:opacity-50 transition-opacity duration-300" name="logos:supabase-icon"/>
        </a>
        <a
        href="https://www.postgresql.org/"
        target="_blank"
        >
          <Icon name="logos:postgresql" class="hover:opacity-50 transition-opacity duration-300"/>
        </a>
        
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-neutral-800 p-6 flex flex-row justify-center text-center">
        <a
        href="https://github.com/Dipstick713/Nekomi"
        target="_blank"
        class="text-white underline"
        >
          <div class="flex hover:opacity-50 transition-opacity duration-300">
            <p class="px-2">Github Repo</p>
            <Icon name="mdi:github" size="25px"/>
          </div>
        </a>
    </footer>
  </div>
</template>