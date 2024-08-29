export interface Post {
  id?: string; // Changed from number to string for Firebase key
  post: string[];
  likes: number;
  comments: { userName: string, text: string }[]; // Updated to include userName and text
  isLiked: boolean;
  imageUrl?: string; // Optional image URL
  date: string; // Date of the post
  userName: string; // User's name who made the post
}
