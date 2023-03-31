export function makeTX(db: IDBDatabase, storeName: string, mode: IDBTransactionMode) {
  const tx: IDBTransaction = db.transaction(storeName, mode)
  tx.onerror = (error) => {
    console.log('ERROR::Transaction: ', error)
  }
  return tx
}
