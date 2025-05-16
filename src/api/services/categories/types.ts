export interface AppCategory {
  ancestors: AppCategory[];
  description: string;
  id: string;
  level: number;
  name: string;
}
