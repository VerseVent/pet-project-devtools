// @ts-nocheck

import {makeTX} from '../hooks/makeTX'
import {openDB} from '../hooks/openDB'

export async function addPlaylist(playlistId: string, playlistTotal: number) {
  const db = await openDB('PlaylistDB', 3)

  return new Promise((resolve) => {
    const transaction = makeTX(db, 'playlistStore', 'readwrite')

    transaction.oncomplete = () => {
      resolve('Successfully added playlist')
    }

    const store = transaction.objectStore('playlistStore')

    store.put({
      id: playlistId,
      playlistTotal
    })
  })
}
