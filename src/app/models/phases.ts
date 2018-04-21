import { Discipline } from './discipline';

export interface Phases {
  id: number;
  project_id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  is_enabled: boolean;
  task_id: number;
  image: {
    url: string;
    thumbnail: {
      url: string;
    }
  };
  disciplines: Discipline[];
  sort: number;
}

