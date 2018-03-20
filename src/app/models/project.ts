import  { Task } from './task';

export interface Project {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  image: {
    url: string;
    thumbnail: {
      url: string;
    }
  }
  sort: number;
  tasks: Task[];
}

