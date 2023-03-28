<script setup lang="ts">
interface IEmit {
  (e: 'update:playlist', playlist: string): void
  (e: 'emitSubmit'): void
}

const emits = defineEmits<IEmit>()
defineProps({
  playlist: {
    type: String,
    required: false,
    default() {
      return ''
    }
  }
})

const emitFormInput = (playlist: Event) => {
  emits('update:playlist', (playlist.target as HTMLInputElement).value)
}
const emitFindPlaylist = () => emits('emitSubmit')
</script>

<template>
  <h2 class="form__title">Provide youtube playlist id</h2>
  <form class="form">
    <label class="form__label" for="playlistId">Playlist id</label>
    <input
      id="playlistId"
      class="form__input"
      type="text"
      :value="playlist"
      @input="emitFormInput"
    />
  </form>
  <div class="form__btn-container">
    <button class="form__btn" @click="emitFindPlaylist">Find playlist</button>
  </div>
</template>

<style scoped lang="scss">
.form {
  @apply w-[100%] mb-3;
  &__input {
    @apply border-none border-white border-[3px] bg-gradient-to-r from-indigo-500 via-purple-500
     to-pink-500 focus:bg-pos-100 transition-all bg-size-200 duration-500 appearance-none
      py-2 px-4 w-[100%] outline-none rounded-md text-white text-lg;
  }
  &__label {
    @apply pb-2 block;
  }
  &__title {
    @apply pb-2;
  }
  &__btn {
    @apply bg-gradient-to-r border-0 from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed;
  }
  &__btn-container {
    @apply flex justify-end;
  }
}
</style>
