import { Discipline } from './discipline';

export interface Phases {
  id: number;
  project_id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  is_enabled: boolean;
  image: {
    url: string;
    thumbnail: {
      url: string;
    }
  };
  disciplines: Discipline[];
  sort: number;
}

