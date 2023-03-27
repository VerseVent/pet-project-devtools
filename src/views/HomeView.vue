<script setup lang="ts">
import {computed, ref} from 'vue'
import PlaylistForm from '../components/main-page/playlist-form.vue'
const playlist = ref<string>('')

const actualPlaylist = computed(() => {
  return playlist.value === '' ? 'empty' : playlist.value
})

async function findPlaylist() {
  const {usePlaylistStore} = await import('../stores/playlist')
  const store = usePlaylistStore()

  store.getPlaylistItems(playlist.value)
}
</script>

<template>
  <div class="form__container">
    <PlaylistForm v-model:playlist="playlist" />
    <h3>Actual playlist: {{ actualPlaylist }}</h3>
    <button @click="findPlaylist">Find playlist</button>
  </div>
</template>
<style scoped lang="scss">
.form {
  &__container {
    @apply mb-72 mr-24;
  }
}
</style>
