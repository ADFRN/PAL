export interface FriendRequest {
  fromUserId: string;
  fromUsername: string;
  fromProfilePictureUrl: string;
  status: 'pending' | 'accepted' | 'rejected';
  requestedAt: Date;
}

export interface Friend {
  friendUserId: string;
  friendUsername: string;
  friendProfilePictureUrl: string;
  status: 'accepted';
}

export interface LibraryBook {
  libraryBookId: string;
  libraryBookTitle: string;
  libraryBookCoverUrl: string;
  addedAt: Date;
  currentPage?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface User {
  userId: string;
  username: string;
  profilePictureUrl: string;
  friends: Friend[];
  friendRequests: FriendRequest[];
  library: LibraryBook[];
  createdAt: Date;
  reviews: BookReview[];
}

export interface Book {
  bookId: string;
  title: string;
  coverUrl: string;
  reviews: BookReview[];
}

export interface BookReview {
  rating: number;
  review: string;
  reviewerUserId: string;
  reviewerUsername: string;
  reviewedBook: Book;
  createdAt: Date;
}
