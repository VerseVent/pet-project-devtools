export interface IPlaylistItem {
  contentDetails: IContent
  etag: string
  id: string
  kind: string
  snippet: IItemSnippet
}
interface IItemSnippet {
  playlistId: string
}
interface IContent {
  videoId: string
  videoPublishedAt: string
}
