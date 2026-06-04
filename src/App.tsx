import {useState, type ChangeEvent, type SubmitEvent} from 'react';

type DailyLog = {
  studyHours: string;
  screenTimeMinutes: string;
  activityMinutes: string;
  didHobby : boolean;
};

const emptyDailyLog: DailyLog = {
  studyHours: "",
  screenTimeMinutes: "",
  activityMinutes: "",
  didHobby: false
};

export default function App() {
  //const [studyHours, setStudyHours] = useState(0);
  //const [savedStudyHours, setSavedStudyHours] = useState<number | null>(null);
  const [dailyLog, setDailyLog] = useState<DailyLog>(emptyDailyLog);
  const [savedLog, setSavedLog] = useState<DailyLog | null>(null);



  function handleLogChange(event: ChangeEvent<HTMLInputElement>) {
    setDailyLog(dailyLog);
    dailyLog: event.target.value;
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
        <label htmlFor="study-hours">How many hours did you study?</label>

        <div>
          <input
          id="study-hours"
          type="number"
          min="0"
          max="24"
          step="0.5"
          value={dailyLog.studyHours}
          onChange={handleLogChange}
          />
        </div>



        <button type="submit">Save daily log</button>
      </form>


      {savedLog != null && ( 
        <section>
          <h2>Saved log</h2>
          <p>Study: {savedLog.studyHours || 0} hours</p>
          
        </section>
      )}
    </main>
  )
  
}