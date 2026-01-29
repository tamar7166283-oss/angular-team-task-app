export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'normal' | 'high';

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee_id?: number;
  due_date?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskPayload {
  projectId: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: number;
  dueDate?: string;
  orderIndex: number;
}
