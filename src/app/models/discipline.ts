export interface Discipline {
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
}

