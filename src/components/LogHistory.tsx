import type {SavedDailyLog} from "../types";

type LogHistoryProps = {
    logs: SavedDailyLog[];
    loadError: string | null;
};

export function LogHistory({logs, loadError}: LogHistoryProps) {
    return (
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
    );
}