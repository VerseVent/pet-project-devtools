import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useCounterStore = defineStore('counter', {
  actions: {
    async getPlaylistItems() {
      const response = await fetch(
        'playlists?part=snippet%2CcontentDetails&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&maxResults=25'
      )
      return response
    }
  }
})
