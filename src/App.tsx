import {useState, type ChangeEvent, type SubmitEvent} from 'react';

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

export default function App() {
  //const [studyHours, setStudyHours] = useState(0);
  //const [savedStudyHours, setSavedStudyHours] = useState<number | null>(null);
  const [dailyLog, setDailyLog] = useState<DailyLog>(emptyDailyLog);
  const [savedLog, setSavedLog] = useState<DailyLog | null>(null);



  function handleLogChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target;
    
    setDailyLog((dailyLog) => ({
      ...dailyLog,
      //studyHours: event.target.value,
      //screenTimeMinutes: event.target.value,
      [name]: value,
    }));
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
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
          type="string"
          value={dailyLog.activityName}
          onChange={handleLogChange}
          />


        </div>


        <button type="submit">Save daily log</button>
      </form>


      {savedLog != null && ( 
        <section>
          <h2>Saved log</h2>
          <p>Study hours: {savedLog.studyHours || 0} hours</p>
          <p>Screen time: {savedLog.screenTimeMinutes || 0} minutes</p>
          <p>Activity name: {savedLog.activityName || ""} </p>
          <p>Activity minutes: {savedLog.activityMinutes || 0 } </p>
          
        </section>
      )}
    </main>
  )
  
}