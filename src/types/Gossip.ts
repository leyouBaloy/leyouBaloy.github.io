export interface GossipVideo {
  title: string;
  /** 视频时长，可缺省；新条目按“听到 x:xx”写在 content 里 */
  duration?: string;
  url: string;
  platform?: string;
}

export interface GossipItem {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  kind?: 'english-checkin' | 'note' | string;
  title?: string;
  content?: string;
  video?: GossipVideo;
  tags?: string[];
  mood?: string;
}
