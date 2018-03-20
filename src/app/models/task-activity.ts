import { TaskActivityItem } from './task-activity-item';


export class TaskActivity {
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
      task_activity_items: TaskActivityItem[]
}
