export type DailyLog = {
  studyHours: string;
  screenTimeMinutes: string;
  activityName: string;
  activityMinutes: string;
};

export type SavedDailyLog = {
  id: string;
  log_date: string;
  studyHours: number;
  screenTimeMinutes: number;
  activityName: string;
  activityMinutes: number;
  xp: number;
  created_at: string;
};
