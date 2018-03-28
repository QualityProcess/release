import { TaskActivity } from './task-activity';

export class TaskPhase {
    id: number;
    task_id: number;
    name: string;
    description: string;
    is_enabled: boolean;
    created_at: Date;
    updated_at: Date;
    category: string;
    sort: number;
    image: {
      url: string;
      thumbnail: {
        url: string;
      }
    };
    task_activities: TaskActivity[];
}
