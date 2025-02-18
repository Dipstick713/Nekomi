<script setup lang="ts">
</script>

<template>
    <button class="flex items-center gap-1">
        <Icon 
            v-if="false"
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
</template>