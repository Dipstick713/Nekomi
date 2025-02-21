<script setup lang="ts">
</script>

<template>
    <div class="overflow-x-auto">
        <div class="flex flex-row justify-between items-center min-w-full bg-neutral-800 mb-5 p-5 rounded-lg">
          <div>
            <div class="font-bold">Add your favourite songs</div>
            <div class="text-gray-400">If the number of votes surpasses 50%, the track will be added to the playlist for everyone to enjoy.</div>
          </div>
          <UButton class="h-10">
            <Icon name="material-symbols:playlist-add" size="24px"/>Add Song
          </UButton>
        </div>
        <div class="font-bold text-2xl mb-3 border-t-4 border-neutral-700 pt-3">Vote List</div>
        <table class="min-w-full bg-neutral-800 rounded-lg">
          <thead>
            <tr class="text-left border-b border-gray-700">
              <th class="py-3 px-4">#</th>
              <th class="py-3 px-4">Title</th>
              <th class="py-3 px-4">Artist</th>
              <th class="py-3 px-4"><Icon name="mingcute:time-duration-line" class="text-white mt-2" size="23px"/></th>
              <th class="py-3 px-4">Vote Count</th>
              <th class="py-3 px-4">Vote</th>
            </tr>
          </thead>
          <tbody>
            <!-- Song 1 -->
            <tr class="hover:bg-green-700">
              <td class="py-3 px-4">1</td>
              <td class="py-3 px-4">Billie Toppy</td>
              <td class="py-3 px-4 text-gray-400">Billie Toppy</td>
              <td class="py-3 px-4 text-gray-400">3:15</td>
              <td class="py-3 px-4">3/5</td>
              <td class="py-3 px-4 text-gray-400"><LikeButton/></td>
            </tr>
  
            <!-- Song 2 -->
            <tr class="hover:bg-green-700">
              <td class="py-3 px-4">2</td>
              <td class="py-3 px-4">Lauren</td>
              <td class="py-3 px-4 text-gray-400">Lauren</td>
              <td class="py-3 px-4 text-gray-400">3:42</td>
              <td class="py-3 px-4">3/5</td>
              <td class="py-3 px-4 text-gray-400"><LikeButton/></td>
            </tr>
  
            <!-- Song 3 -->
            <tr class="hover:bg-green-700">
              <td class="py-3 px-4">3</td>
              <td class="py-3 px-4">Seven</td>
              <td class="py-3 px-4 text-gray-400">Seven</td>
              <td class="py-3 px-4 text-gray-400">3:45</td>
              <td class="py-3 px-4">3/5</td>
              <td class="py-3 px-4 text-gray-400"><LikeButton/></td>
            </tr>
  
            <!-- Song 4 -->
            <tr class="hover:bg-green-700">
              <td class="py-3 px-4">4</td>
              <td class="py-3 px-4">Sugar</td>
              <td class="py-3 px-4 text-gray-400">Untourable Album</td>
              <td class="py-3 px-4 text-gray-400">2:56</td>
              <td class="py-3 px-4">3/5</td>
              <td class="py-3 px-4 text-gray-400"><LikeButton/></td>
            </tr>
  
            <!-- Song 5 -->
            <tr class="hover:bg-green-700">
              <td class="py-3 px-4">5</td>
              <td class="py-3 px-4">Tree Among Shrubs</td>
              <td class="py-3 px-4 text-gray-400">Untourable Album</td>
              <td class="py-3 px-4 text-gray-400">3:08</td>
              <td class="py-3 px-4">3/5</td>
              <td class="py-3 px-4 text-gray-400"><LikeButton/></td>
            </tr>
  
            <!-- Add more songs dynamically here -->
          </tbody>
        </table>
      </div>
</template>