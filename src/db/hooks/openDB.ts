export async function openDB(dbname: string, version: number) {
  return new Promise((resolve, reject) => {
    const idb = window.indexedDB

    const DBOpenReq: IDBOpenDBRequest = idb.open(dbname, version)
    DBOpenReq.onerror = (e) => {
      console.log('Error opening db', e)
      reject('Error')
    }

    DBOpenReq.onsuccess = (e: unknown) => {
      resolve(e.target.result)
    }

    DBOpenReq.onupgradeneeded = (e: unknown) => {
      console.log('onupgradeneeded')
      const db = e.target.result

      if (!db.objectStoreNames.contains('playlistStore')) {
        db.createObjectStore('playlistStore', {
          autoIncrement: true,
          keyPath: 'id'
        })
      }
    }
  })
}
