import { getWellbeingScores } from "../lib/wellbeingScores";
import "./WellbeingProfile.css";

const maxScore = 10;
const chartRadius = 100;
const ringScores = [2, 4, 6, 8, maxScore];

function radarPoint(axis: number, score: number) {
  const angle = axis * Math.PI / 3;
  const radius = chartRadius * score / maxScore;

  return { x: radius * Math.sin(angle), y: -radius * Math.cos(angle) };
}

function polygonPoints(points: { x: number; y: number }[]) {
  return points.map(({ x, y }) => String(x) + "," + String(y)).join(" ");
}

export function WellbeingProfile() {
  const domains = getWellbeingScores();
  const average = domains.reduce((total, domain) => total + domain.score, 0) / domains.length;
  const axisEnds = domains.map((_, axis) => radarPoint(axis, maxScore));
  const profilePoints = domains.map(({ score }, axis) => radarPoint(axis, score));

  return (
    <section className="wellbeing-profile" aria-labelledby="wellbeing-profile-title">
      <div className="wellbeing-profile__summary">
        <p className="wellbeing-profile__example">Example check-in</p>
        <h2 id="wellbeing-profile-title">Well-being profile</h2>
        <p>Six domains of human flourishing</p>

        <div className="wellbeing-profile__average">
          <p>Average score</p>
          <p className="wellbeing-profile__average-value">
            <strong>{average.toFixed(1)}</strong> <span>/ {maxScore}</span>
          </p>
          <div className="wellbeing-profile__meter" aria-hidden="true">
            <span style={{ width: average / maxScore * 100 + "%" }} />
          </div>
        </div>
      </div>

      <figure className="wellbeing-profile__chart" aria-label="Six domain scores out of 10">
        <svg className="wellbeing-profile__radar" viewBox="-110 -121 220 242" aria-hidden="true">
          <polygon className="wellbeing-profile__grid-background" points={polygonPoints(axisEnds)} />
          {axisEnds.map(({ x, y }, axis) => (
            <line key={domains[axis].label} className="wellbeing-profile__grid-line" x1="0" y1="0" x2={x} y2={y} />
          ))}
          {ringScores.map((score) => (
            <polygon
              key={score}
              className={score === maxScore ? "wellbeing-profile__grid-edge" : "wellbeing-profile__grid-line"}
              points={polygonPoints(domains.map((_, axis) => radarPoint(axis, score)))}
            />
          ))}
          <polygon className="wellbeing-profile__shape" points={polygonPoints(profilePoints)} />
          {profilePoints.map(({ x, y }, axis) => (
            <circle key={domains[axis].label} className="wellbeing-profile__point" cx={x} cy={y} r="3" />
          ))}
          {domains.map(({ label }, axis) => {
            const { x, y } = radarPoint(axis, maxScore + 1.3);

            return (
              <text
                key={label}
                className="wellbeing-profile__mobile-key"
                x={x}
                y={y}
                dominantBaseline="central"
                textAnchor="middle"
              >
                {axis + 1}
              </text>
            );
          })}
        </svg>

        <ol className="wellbeing-profile__domains" role="list">
          {domains.map(({ label, score }, axis) => (
            <li key={label} className="wellbeing-profile__domain">
              <span className="wellbeing-profile__domain-key" aria-hidden="true">{axis + 1}</span>
              <span>{label}</span>
              <strong>{score.toFixed(1)}</strong>
            </li>
          ))}
        </ol>
      </figure>

      <footer className="wellbeing-profile__footer">
        <a href="https://doi.org/10.1073/pnas.1702996114">Based on VanderWeele (2017)</a>
        <span>0 to {maxScore} scale</span>
      </footer>
    </section>
  );
}
