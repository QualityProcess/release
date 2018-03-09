export interface Task {
  id: number;
  area_id: number;
  name: string;
  description: string;
  is_enabled: boolean;
  created_at: Date;
  updated_at: Date;
  image: {
    url: string;
    thumbnail: {
      url: string;
    }
  }
  sort: number;
  task_phases: [{
    id: number;
    task_id: number;
    name: string;
    description: string;
    is_enabled: boolean;
    created_at: Date;
    updated_at: Date;
    category: string;
    image: {
      url: string;
      thumbnail: {
        url: string;
      }
    };
    task_activities: [{
      id: number;
      name: string;
      description: string;
      is_enabled: boolean;
      created_at: Date;
      updated_at: Date;
      task_phase_id: number;
      image: {
        url: string;
        thumbnail: {
          url: string;
        }
      };
      sort: number;
      task_activity_item: [{
        id: number;
        task_activity_id: number;
        name: string;
        description: string;
        customisation: string;
        cheked_on: Date;
        link: string;
        is_enabled: boolean;
        is_locked: boolean;
        created_at: Date;
        updated_at: Date;   
        image: {
          url: string;
          thumbnail: {
            url: string;
          }
        };
        sort: number;
        checked_by: string;
      }]
    }]

  }]
}
