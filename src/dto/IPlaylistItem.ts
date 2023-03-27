export interface IPlaylistItem {
  contentDetails: IContent
  etag: string
  id: string
  kind: string
  snippet: Object
}

interface IContent {
  videoId: string
  videoPublishedAt: string
}
