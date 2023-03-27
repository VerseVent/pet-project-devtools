<script setup lang="ts">
interface IEmit {
  (e: 'update:playlist', playlist: string): void
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
</script>

<template>
  <h2>Provide youtube playlist link</h2>
  <form class="form">
    <input class="form__input" type="text" :value="playlist" @input="emitFormInput" />
  </form>
</template>

<style scoped lang="scss">
.form {
  @apply w-[100%];
  &__input {
    @apply border-none border-white border-[3px] bg-gradient-to-r from-indigo-500 via-purple-500
     to-pink-500 focus:bg-pos-100 transition-all bg-size-200 duration-500 appearance-none
      py-2 px-4 w-[350px] outline-none rounded-md text-white text-lg;
  }
  &__btn {
  }
}
</style>
