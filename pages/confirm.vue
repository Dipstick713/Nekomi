<script setup lang="ts">
const user = useSupabaseUser()

if (user.value) {
    navigateTo('/user');
}
</script>

<template>
    <div>redirecting</div>
</template>