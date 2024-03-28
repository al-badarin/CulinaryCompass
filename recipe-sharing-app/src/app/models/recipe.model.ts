import { UserId } from './user-id';

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
  userId: UserId;
  created_at: string;
  updatedAt: string;
  __v: number;
}
