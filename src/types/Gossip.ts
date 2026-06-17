export interface GossipItem {
  id: string;
  date: string;
  title?: string;
  content: string;
  tags?: string[];
  mood?: string;
}
