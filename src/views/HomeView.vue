<script setup lang="ts">
import YtPlayer from '@/components/music-player/yt-player.vue'
import loaderStepperVue from '@/components/ui/loader-stepper.vue'
import type {IPlaylistItem} from '@/dto/IPlaylistItem'
import {ref} from 'vue'
import PlaylistForm from '../components/main-page/playlist-form.vue'
import {usePlaylistStore} from '../stores/playlist'
const playlist = ref<string>('')
const actualPlaylist = ref<string>('')

const isPlaylistGenerated = ref<boolean>(false)
const isLogicExecuted = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const activeVideo = ref<string>('')
const currentVideoIndex = ref<number>(0)
const playlistItems = ref<Array<IPlaylistItem>>([])

const store = usePlaylistStore()

async function generatePlaylist(pageToken: string = '') {
  isLoading.value = true
  const {items, nextPageToken} = await store.getPlaylistItems(playlist.value, pageToken)

  sumPlaylistItems(items)

  if (nextPageToken) {
    generatePlaylist(nextPageToken)
    return
  }
  console.log(playlistItems.value)
  isPlaylistGenerated.value = true
  setActiveVideo()
  isLoading.value = false
  // TODO: Some enhancement with video info, preview or smth else
  // const video = await store.getVideo(playlistItems.value[0].contentDetails.videoId)

  //TODO: Make playlist title valid and visible
  // actualPlaylist.value = ''
}

function sumPlaylistItems(items: Array<IPlaylistItem>) {
  playlistItems.value = [...playlistItems.value, ...items]
  isLogicExecuted.value = true
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
    <PlaylistForm v-model:playlist="playlist" @emit-submit="generatePlaylist" />
    <h3>Actual playlist: {{ actualPlaylist }}</h3>

    <YtPlayer
      v-if="activeVideo"
      :video-id="activeVideo"
      @prevVideo="playPrevVideo"
      @nextVideo="playNextVideo"
    />
    <ul v-if="isLoading" class="form__loader-steps">
      <loaderStepperVue :process-title="'Building logic'" :is-loaded="isLogicExecuted" />
      <loaderStepperVue :process-title="'Getting your tracks'" :is-loaded="isPlaylistGenerated" />
    </ul>
  </div>
</template>
<style scoped lang="scss">
.form {
  &__container {
    @apply mb-72 mr-24 w-[100%];
  }
  &__loader-steps {
    @apply max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400 list-none p-0 pt-2;
  }
}
</style>
