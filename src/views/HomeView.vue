<script setup lang="ts">
import YtPlayer from '@/components/music-player/yt-player.vue'
import type {IPlaylistItem} from '@/dto/IPlaylistItem'
import {ref} from 'vue'
import PlaylistForm from '../components/main-page/playlist-form.vue'
const playlist = ref<string>('')

const actualPlaylist = ref<string>('')

const activeVideo = ref<string>('')
const currentVideoIndex = ref<number>(0)
const playlistItems = ref<Array<IPlaylistItem>>([])

async function findPlaylist() {
  const {usePlaylistStore} = await import('../stores/playlist')

  const store = usePlaylistStore()

  const {items} = await store.getPlaylistItems(playlist.value)

  playlistItems.value = items

  // TODO: Some enhancement with video info, preview or smth else
  // const video = await store.getVideo(playlistItems.value[0].contentDetails.videoId)

  setActiveVideo()
  actualPlaylist.value = ''
}
async function playPrevVideo() {
  if (currentVideoIndex.value > 0) {
    currentVideoIndex.value -= 1
    setActiveVideo()
    return
  }
  currentVideoIndex.value = playlistItems.value.length - 1
  setActiveVideo()
}
async function playNextVideo() {
  if (currentVideoIndex.value < playlistItems.value.length - 1) {
    currentVideoIndex.value += 1
    setActiveVideo()
    return
  }
  currentVideoIndex.value = 0
  setActiveVideo()
}
const setActiveVideo = () => {
  activeVideo.value = playlistItems.value[currentVideoIndex.value].contentDetails.videoId
}
</script>

<template>
  <div class="form__container">
    <PlaylistForm v-model:playlist="playlist" @emit-submit="findPlaylist" />
    <h3>Actual playlist: {{ actualPlaylist }}</h3>

    <YtPlayer
      v-if="activeVideo"
      :video-id="activeVideo"
      @prevVideo="playPrevVideo"
      @nextVideo="playNextVideo"
    />
  </div>
</template>
<style scoped lang="scss">
.form {
  &__container {
    @apply mb-72 mr-24 w-[100%];
  }
}
</style>
