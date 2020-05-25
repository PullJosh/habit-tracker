import { html, render, useState, useEffect } from "./htm-preact.js";
import { useChromeStorage, useForceRerender } from "./hooks.js";

import { GoalWizard } from "./components/GoalWizard.js";

function App() {
  const [goal, setGoal] = useChromeStorage("goal", null);

  const goalIsComplete = !!(
    goal &&
    goal.task &&
    goal.days &&
    goal.outcome_good &&
    goal.outcome_bad
  );

  const [showingGoalWizard, setShowingGoalWizard] = useState(false);
  useEffect(() => {
    if (!goalIsComplete && goal !== null) {
      setShowingGoalWizard(true);
    }
  }, [goal, goalIsComplete]);

  return html`
    ${showingGoalWizard &&
    html`<${GoalWizard}
      closeScreen=${() => {
        setShowingGoalWizard(false);
      }}
    />`}
    ${goalIsComplete && !showingGoalWizard && html`<${MainScreen} />`}
  `;
}

function MainScreen() {
  const [goal, setGoal, goalStatus] = useChromeStorage("goal", {});
  const [logs, setLogs, logsStatus] = useChromeStorage("logs", []);

  const loading = goalStatus === "loading" || logsStatus === "loading";

  // Rerender every minute in case the day changes (midnight)
  useForceRerender(60000);

  if (loading) {
    return null;
  }

  const today = new Date();

  const sameDay = (dateA, dateB) =>
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate();

  function completedDay(day) {
    return logs.some((log) => sameDay(new Date(log.date), day));
  }

  function isDayOff(day) {
    const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const dayName = dayNames[day.getDay()];

    return !goal.days.includes(dayName);
  }

  function getStreak(beforeDay) {
    let day = new Date(beforeDay); // Copy so we don't modify the original
    day.setDate(day.getDate() - 1);

    let streakType = null;
    let streakDays = 0;

    while (day.getTime() >= goal.startDate) {
      if (!isDayOff(day)) {
        if (streakType === null) {
          streakType = completedDay(day) ? "good" : "bad";
        }

        if (completedDay(day) === (streakType === "good")) {
          // This day matches the streak!
          streakDays++;
        } else {
          // This day doesn't match. We've hit the end of the streak.
          break;
        }
      }

      day.setDate(day.getDate() - 1);
    }

    // If it's a bad streak and you haven't done anything today,
    // that doesn't count against you (because the outcome of today
    // is still undecided). But if you have a good streak going and
    // you succeed today, that should add to your streak.
    if (streakType === "good" && completedDay(today) && !isDayOff(today)) {
      streakDays++;
    }

    return {
      type: streakType,
      days: streakDays,
    };
  }

  const status = isDayOff(today)
    ? "day-off"
    : completedDay(today)
    ? "done"
    : "not-done";

  const streak = getStreak(today);

  return html`
    <div class=${`MainScreen MainScreen--${status}`}>
      <div class="MainScreen__content">
        <h1 class="MainScreen__header">
          ${status === "not-done" &&
          html`Don't forget to${" "}
            <span class="text-green">${goal.task}</span> today!`}
          ${status === "done" && html`Good work. 🎉`}
        </h1>
        ${status === "not-done" &&
        html`<button
            class="MainScreen__completedBtn"
            onClick=${() => {
              setLogs([...logs, { date: new Date().getTime() }]);
            }}
          >
            I did it!
          </button>
          <div class="MainScreen__streakContainer">
            <${StreakBadge} type=${streak.type} days=${streak.days} />
          </div>`}
        ${status === "done" &&
        html`<button
          class="MainScreen__undoCompletedBtn"
          onClick=${() => {
            setLogs(logs.filter((log) => !sameDay(today, new Date(log.date))));
          }}
        >
          ← Undo
        </button>`}
      </div>
      <button
        class="MainScreen__resetButton"
        onClick=${() => {
          if (
            confirm(
              "Are you sure you want to reset your goal? This will delete all your data."
            )
          ) {
            setLogs([]);
            setGoal({});
          }
        }}
      >
        Change goal
      </button>
    </div>
  `;
}

function StreakBadge({ type, days }) {
  if (!["good", "bad"].includes(type) || days < 2) {
    return null;
  }

  if (type === "good") {
    return html`<div class="StreakBadge StreakBadge--good">
      You've been successful <span>${days} days</span> in a row.<br />Keep the
      streak alive!
    </div>`;
  }

  return html`<div class="StreakBadge StreakBadge--bad">
    You missed the mark <span>${days} days</span> in a row.<br />Break the
    spiral today!
  </div>`;
}

render(html`<${App} />`, document.querySelector("#app"));
