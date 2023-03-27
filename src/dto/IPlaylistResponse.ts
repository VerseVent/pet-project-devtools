export interface IPlaylistResponse {
  etag: string
  items: Array<any>
  kind: string
  nextPageToken: string
  pageInfo: {totalResults: number; resultsPerPage: number}
}
