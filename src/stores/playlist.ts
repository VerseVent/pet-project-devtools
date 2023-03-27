import {request} from '@/api/fetch-wrapper'
import type {IPlaylistResponse} from '@/dts/IPlaylistResponse'
import {defineStore} from 'pinia'

export const usePlaylistStore = defineStore('playlist', {
  actions: {
    async getPlaylist() {
      const response = await request(
        'playlists?part=snippet%2CcontentDetails&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&maxResults=25'
      )
      return response
    },
    async getPlaylistItems(playlist: string) {
      const response = await request<IPlaylistResponse>(
        `playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playlist}`
      )
      await request<IPlaylistResponse>(
        `playlistItems?part=snippet%2CcontentDetails&maxResults=75&pageToken=${response.nextPageToken}&playlistId=${playlist}`
      )
      return response
    }
  }
})
