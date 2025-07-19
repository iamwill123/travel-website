export interface TravelRecommendation {
  id: string;
  title: string;
  destination: string;
  category:
    | "restaurant"
    | "attraction"
    | "hotel"
    | "activity"
    | "transport"
    | "other";
  description: string;
  tips: string;
  rating: number;
  author: string;
  date: string;
  imageUrl?: string;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  joinDate: string;
}

export interface Comment {
  id: string;
  recommendationId: string;
  author: string;
  content: string;
  date: string;
  rating?: number;
}
