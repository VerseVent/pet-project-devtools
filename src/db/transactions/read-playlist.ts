// @ts-nocheck

import type {IDBPlaylist} from './../../dto/IDBPlaylist'
import {makeTX} from '../hooks/makeTX'
import {openDB} from '../hooks/openDB'

export async function readPlaylist(): Promise<Array<IDBPlaylist>> {
  const db = await openDB('PlaylistDB', 3)
  return new Promise((resolve) => {
    const readTx = makeTX(db, 'playlistStore', 'readonly')

    readTx.oncomplete = () => {
      console.log('Transaction end')
    }

    const store = readTx.objectStore('playlistStore')
    const getReq = store.getAll()

    getReq.onsuccess = (e: unknown) => {
      const playlist: Array<IDBPlaylist> = e.target.result

      resolve(playlist)
    }

    getReq.onerror = (err) => {
      console.log(err)
    }
  })
}
