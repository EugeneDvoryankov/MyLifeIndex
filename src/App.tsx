import {useEffect, useState, useRef, type ChangeEvent, type SubmitEvent} from 'react';
import { supabase } from "./lib/supabase";
import {type DailyLog, type SavedDailyLog} from "./types";
import {DailyLogForm} from "./components/DailyLogForm";
import {LogHistory} from "./components/LogHistory";
import { WellbeingProfile } from "./components/WellbeingProfile";

const emptyDailyLog: DailyLog = {
  studyHours: "",
  screenTimeMinutes: "",
  activityName: "",
  activityMinutes: "",
};

/**
 * This function calculates experience points XP based on daily activities 
 * Study for 1 hours: 10 XP
 * Be active for at least 30 minutes: +20 XP
 * Keep screen time at or below 120 minutes: +15 XP
 * Later, these rules should be replaced with a more advanced algorithm.
 */
function calculateXP(log: DailyLog): number {

  // Family, work, education, religious community
  // How many hours have you spent with family?
  // How many hours at work? Should there be a limit after which more work is less XP?
  // Happiness and Life Satisfaction, Physical and Mental Health, Meaning and Purpose, Character and Virtue

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

  const studyInputRef = useRef<HTMLInputElement>(null);

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
    studyInputRef.current?.focus();
  }

  return (
    <main>
      <h1>My Life Index</h1>
      <p>Log your day and earn XP for positive habits.</p>

      <WellbeingProfile />

      <DailyLogForm
        dailyLog={dailyLog}
        isSaving={isSaving}
        saveError={saveError}
        studyInputRef={studyInputRef}
        onLogChange={handleLogChange}
        onSubmit={handleSubmit}
      />


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

      <LogHistory logs={logs} loadError={loadError}/>

    </main>
  )
  
}