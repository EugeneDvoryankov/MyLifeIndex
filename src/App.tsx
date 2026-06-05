import {useEffect, useState, type ChangeEvent, type SubmitEvent} from 'react';
import { supabase } from "./lib/supabase";

type DailyLog = {
  studyHours: string;
  screenTimeMinutes: string;
  activityName: string;
  activityMinutes: string;
};

const emptyDailyLog: DailyLog = {
  studyHours: "",
  screenTimeMinutes: "",
  activityName: "",
  activityMinutes: "",
};

type SavedDailyLog = {
  id: string;
  log_date: string;
  studyHours: number;
  screenTimeMinutes: number;
  activityName: string;
  activityMinutes: number;
  xp: number;
  created_at: string;
};

/**
 * This function calculates experience points XP based on daily activities 
 * Study for 1 hours: 10 XP
 * Be active for at least 30 minutes: +20 XP
 * Keep screen time at or below 120 minutes: +15 XP
 * Later, these rules should be replaced with a more advanced algorithm.
 */
function calculateXP(log: DailyLog): number {
  const studyHours = Number(log.studyHours);
  const screenTimeMinutes = Number(log.screenTimeMinutes);
  const activityMinutes = Number(log.activityMinutes);

  let xp = 0;

  if (studyHours >= 0 ){
    xp = xp + studyHours * 10;
  }

  if (activityMinutes >= 30) {
    xp += 20;
  }

  if (0 < screenTimeMinutes && screenTimeMinutes <= 120) {
    xp += 15;
  }

  return xp;
}

export default function App() {
  const [dailyLog, setDailyLog] = useState<DailyLog>(emptyDailyLog);
  const [savedLog, setSavedLog] = useState<DailyLog | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [logs, setLogs] = useState<SavedDailyLog[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLogs() {
        const { data, error } = await supabase
        .from("daily_logs")
        .select("*")
        .order("created_at", {ascending: false });
      

      if (error) {
        setLoadError(error.message);
        return;
      }

      setLogs(data ?? []);

    }

    void loadLogs();

  }, []);


  function handleLogChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target;
    
    setDailyLog((dailyLog) => ({
      ...dailyLog,
      //studyHours: event.target.value,
      //screenTimeMinutes: event.target.value,
      [name]: value,
    }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const xp = calculateXP(dailyLog);

    setIsSaving(true);
    setSaveError(null);

    const{error} = await supabase.from("daily_logs").insert({
      studyHours: Number(dailyLog.studyHours),
      screenTimeMinutes: Number(dailyLog.screenTimeMinutes),
      activityMinutes: Number(dailyLog.activityMinutes),
      activityName: dailyLog.activityName,
      xp
    });

    setIsSaving(false);

    if (error) {
      setSaveError(error.message);
      return;
    }

    setSavedLog(dailyLog);
  }

  return (
    <main>
      <h1>My Life Index</h1>
      <p>Log your day and earn XP for positive habits.</p>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="study-hours">Study hours</label>

          <input
          id="study-hours"
          name="studyHours"
          type="number"
          min="0"
          max="24"
          step="0.5"
          value={dailyLog.studyHours}
          onChange={handleLogChange}
          />
        </div>

        <div>
          <label htmlFor="screen-time">Screen time in minutes</label>
          <input 
          id="screen-time"
          name="screenTimeMinutes"
          type="number"
          min="0"
          value={dailyLog.screenTimeMinutes}
          onChange={handleLogChange}
          />
        </div>

        <div>
          <label>Activity time in minutes and activity name</label>

          <input 
          id="activity-minutes"
          name="activityMinutes"
          type="number"
          min="0"
          value={dailyLog.activityMinutes}
          onChange={handleLogChange}
          />

          <input 
          id="activity-name"
          name="activityName"
          type="text"
          value={dailyLog.activityName}
          onChange={handleLogChange}
          />


        </div>


        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save daily log"}
        </button>
        {saveError !== null && <p>Could not save: {saveError}</p>}
      </form>


      {savedLog != null && ( 
        <section>
          <h2>Saved log</h2>
          <p>Study hours: {savedLog.studyHours || 0} hours</p>
          <p>Screen time: {savedLog.screenTimeMinutes || 0} minutes</p>
          <p>Activity name: {savedLog.activityName || ""} </p>
          <p>Activity minutes: {savedLog.activityMinutes || 0 } </p>

          <p>XP earned: {calculateXP(savedLog)}</p>
          
        </section>
      )}

      <section>
        <h2>Previous logs</h2>

        {loadError != null && <p>Could not load logs: {loadError} </p>}

        {logs.length === 0 && loadError === null && <p>No saved logs yet.</p>}

        {logs.map((log) => (
          <article key={log.id}>
            <h3>{log.log_date}</h3>
            <p>Study hours: {log.studyHours || 0} hours</p>
            <p>Screen time: {log.screenTimeMinutes || 0} minutes</p>
            <p>Activity name: {log.activityName || ""} </p>
            <p>Activity minutes: {log.activityMinutes || 0 } </p>
            <p>XP earned: {log.xp}</p>
          </article>
        ))}
      </section>


    </main>
  )
  
}