export interface Project {
  id: number;
  team_id: number;
  name: string;
  description: string;
  status: string;
  created_at: string;
}

// כשיוצרים פרויקט - חייבים לשייך אותו לצוות
export interface CreateProjectPayload {
  teamId: number;
  name: string;
  description: string;
}