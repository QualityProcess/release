export class TaskActivityItem {
        id: number;
        task_activity_id: number;
        name: string;
        description: string;
        customisation: string;
        checked_on: Date;
        qa_by: string;
        can_checked_qa: boolean = true;
        qa_date: Date;
        link: string;
        estimated_start: Date;
        estimated_completion: Date;
        hours_estimated: number;
        hours_actual: number;
        is_enabled: boolean;
        is_locked: boolean;
        created_at: Date;
        updated_at: Date;
        percentage_complete: number;
        image: {
          url: string;
          thumbnail: {
            url: string;
          }
        };
        sort: number;
        checked_by: string;
}
