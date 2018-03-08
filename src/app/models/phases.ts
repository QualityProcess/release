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
  disciplines: [{
    id: number;
    project_phase_id: number;
    description: string;
    is_enabled: boolean;
    category: string;
    created_at: Date;
    updated_at: Date;
    image: {
      url: string;
      thumbnail: {
        url: string;
      }
    };
    sort: number;
  }];
  sort: number;
}

