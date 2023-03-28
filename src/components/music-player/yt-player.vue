<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import YTPlayer from 'youtube-player'
import type {YouTubePlayer} from 'youtube-player/dist/types'
import prevIcon from '@/assets/prev-button.svg'
import nextIcon from '@/assets/next-button.svg'
import playIcon from '@/assets/play-button.svg'
import pauseIcon from '@/assets/pause-button.svg'

interface IEmits {
  (emitName: 'nextVideo'): void
  (emitName: 'prevVideo'): void
}

const isPlaying = ref(false)
const emit = defineEmits<IEmits>()
const props = defineProps({
  videoId: {
    type: String,
    required: false,
    default() {
      return ''
    }
  }
})
const playerEl = ref()

let player: YouTubePlayer

onMounted(() => {
  createPlayer()
})

async function createPlayer() {
  player = YTPlayer(playerEl.value.id, {height: '0', width: '0'})
  await player.loadVideoById(props.videoId)
}

watch(
  () => props.videoId,
  async (newValue) => {
    await player.loadVideoById(newValue)
    await player.playVideo()
  }
)

function onCreated() {}

async function runPlayer() {
  isPlaying.value = true
  await player.playVideo()
}
async function pausePlayer() {
  isPlaying.value = false
  await player.pauseVideo()
}
async function nextVideo() {
  isPlaying.value = false
  await player.stopVideo()
  emit('nextVideo')
}
async function prevVideo() {
  isPlaying.value = false
  await player.stopVideo()
  emit('prevVideo')
}

onCreated()
</script>

<template>
  <div id="music-player" ref="playerEl"></div>
  <div class="player__btn-container">
    <button class="player__btn" @click="prevVideo">
      <img class="player__btn-icon" :src="prevIcon" alt="previous music" />
    </button>
    <button class="player__btn" @click="pausePlayer">
      <img class="player__btn-icon" :src="pauseIcon" alt="pause music" />
    </button>
    <button class="player__btn" @click="runPlayer">
      <img class="player__btn-icon" :src="playIcon" alt="play music" />
    </button>
    <button class="player__btn" @click="nextVideo">
      <img class="player__btn-icon" :src="nextIcon" alt="next music" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.player {
  &__btn {
    @apply bg-transparent border-none;
  }
  &__btn-icon {
    @apply w-10 cursor-pointer transition-transform hover:scale-110 mx-1;
  }
  &__btn-container {
    @apply w-[100%] flex justify-center py-2  bg-gradient-to-r rounded-md from-pink-500 via-indigo-600 to-pink-500;
  }
}
</style>
