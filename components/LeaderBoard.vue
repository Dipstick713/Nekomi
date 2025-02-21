<script setup lang="ts">
</script>

<template>
    <div class="overflow-x-auto">
        <table class="min-w-full bg-neutral-800 rounded-lg">
          <thead>
            <tr class="text-center border-b border-gray-700">
              <th class="py-3 px-4">Rank</th>
              <th class="py-3 px-4">User</th>
              <th class="py-3 px-4">Minutes Spent Listening</th>
            </tr>
          </thead>
          <tbody>
            <!-- Song 1 -->
            <tr class="text-center hover:bg-green-700">
              <td class="py-3 px-4"><Icon name="noto:1st-place-medal" class="mr-1"/>1</td>
              <td class="py-3 px-4">Billie Toppy</td>
              <td class="py-3 px-4 text-gray-400">333333</td>
            </tr>
  
            <!-- Song 2 -->
            <tr class="text-center hover:bg-green-700">
                <td class="py-3 px-4"><Icon name="noto:2nd-place-medal" class="mr-1"/>2</td>
              <td class="py-3 px-4">Lauren</td>
              <td class="py-3 px-4 text-gray-400">2222</td>
            </tr>
  
            <!-- Song 3 -->
            <tr class="text-center hover:bg-green-700">
                <td class="py-3 px-4"><Icon name="noto:3rd-place-medal" class="mr-1"/>3</td>
              <td class="py-3 px-4">Seven</td>
              <td class="py-3 px-4 text-gray-400">1323</td>
            </tr>
  
            <!-- Song 4 -->
            <tr class="text-center hover:bg-green-700">
              <td class="py-3 px-4">4</td>
              <td class="py-3 px-4">Sugar</td>
              <td class="py-3 px-4 text-gray-400">1112</td>
            </tr>
  
            <!-- Song 5 -->
            <tr class="text-center hover:bg-green-700">
              <td class="py-3 px-4">5</td>
              <td class="py-3 px-4">Tree Among Shrubs</td>
              <td class="py-3 px-4 text-gray-400">43</td>
            </tr>
  
          </tbody>
        </table>
      </div>
</template>