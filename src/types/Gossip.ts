export interface GossipVideo {
  title: string;
  duration: string;
  url: string;
  platform: 'YouTube';
}

export interface GossipItem {
  id: string;
  date: string;
  kind?: 'english-checkin';
  title?: string;
  content?: string;
  video?: GossipVideo;
  tags?: string[];
  mood?: string;
}
