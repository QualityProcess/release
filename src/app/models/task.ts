import { TaskPhase } from './task-phase';

export class Task {
  id: number;
  project_id: number;
  discipline_id: number;
  design_stage_id: number;
  areas_id: number;
  project_phases_id: number;
  name: string;
  description: string;
  is_enabled: boolean;
  is_template: boolean;
  created_at: Date;
  updated_at: Date;
  image: {
    url: string;
    thumbnail: {
      url: string;
    }
  }
  sort: number;
  task_phases: TaskPhase[]
}
