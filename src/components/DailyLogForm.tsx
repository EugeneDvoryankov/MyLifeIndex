import type {ChangeEvent, SubmitEvent} from "react";
import type {DailyLog} from "../types";

type DailyLogFormProps = {
    dailyLog: DailyLog;
    isSaving: boolean;
    saveError: string | null;
    onLogChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

export function DailyLogForm({
    dailyLog,
    isSaving,
    saveError,
    onLogChange,
    onSubmit,
}: DailyLogFormProps) {
    return(
        <form onSubmit={onSubmit}>

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
          onChange={onLogChange}
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
          onChange={onLogChange}
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
          onChange={onLogChange}
          />

          <input 
          id="activity-name"
          name="activityName"
          type="text"
          value={dailyLog.activityName}
          onChange={onLogChange}
          />


        </div>


        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save daily log"}
        </button>
        {saveError !== null && <p>Could not save: {saveError}</p>}
      </form>
    )
}