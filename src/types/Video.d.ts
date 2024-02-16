interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

interface VideoSnippet {
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishTime: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  title: string;
}

interface VideoId {
  kind: string;
  videoId: string;
}

interface SearchResult {
  etag: string;
  id: VideoId;
  kind: string;
  snippet: VideoSnippet;
}
