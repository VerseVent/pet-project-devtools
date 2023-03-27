<script setup lang="ts">
import type {IPlaylistItem} from '@/dto/IPlaylistItem'
import {computed, ref} from 'vue'
import PlaylistForm from '../components/main-page/playlist-form.vue'
const playlist = ref<string>('')

const actualPlaylist = computed(() => {
  return playlist.value === '' ? 'empty' : playlist.value
})

const playlistItems = ref<Array<IPlaylistItem>>([])

async function findPlaylist() {
  const {usePlaylistStore} = await import('../stores/playlist')
  const store = usePlaylistStore()

  const {items} = await store.getPlaylistItems(playlist.value)
  playlistItems.value = items

  console.log(playlistItems.value[0].contentDetails.videoId) //TODO:place inside player

  const video = await store.getVideo(playlistItems.value[0].contentDetails.videoId)

  console.log(video)
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
