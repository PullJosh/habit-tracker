import { html } from "../htm-preact.js";
import { useChromeStorage } from "../hooks.js";

export function StreakBanner({ type, days }) {
  const [goal, setGoal] = useChromeStorage("goal", {});

  if (!["good", "bad"].includes(type) || days < 2) {
    return null;
  }

  if (type === "good") {
    return html`<div class="StreakBanner StreakBanner--good">
      <span class="StreakBanner__text">
        You've been successful${" "}
        <span class="StreakBanner__days">${days} days</span> in a row. Keep the
        streak alive!
      </span>
    </div>`;
  } else {
    // This is a bad streak. But *how bad*?
    if (days < 7) {
      return html`
        <div class="StreakBanner StreakBanner--bad">
          <span class="StreakBanner__text">
            You missed the mark${" "}
            <span class="StreakBanner__days">${days} days</span> in a row. Break
            the spiral today!
          </span>
        </div>
      `;
    }

    if (days < 14) {
      return html`<div class="StreakBanner StreakBanner--awful">
        <span class="StreakBanner__text">
          It has been <span class="StreakBanner__days">${days} days</span>
          ${goal.task && ` since you decided to ${goal.task}`}. Start again
          right now!
        </span>
      </div>`;
    }

    const repeatedGoalString = goal.task
      ? new Array(Math.ceil(50 / goal.task.length)).fill(goal.task).join(" ") +
        "\xa0"
      : "";

    return html`<div class="StreakBanner StreakBanner--catastrophic">
      <span class="StreakBanner__text">
        <div
          class="StreakBanner__marquee"
          style="animation-duration: 30s; animation-direction: reverse;"
        >
          ${repeatedGoalString}
        </div>
        <div class="StreakBanner__marquee" style="animation-duration: 20s;">
          ${repeatedGoalString}
        </div>
        <div class="StreakBanner__marquee" style="animation-duration: 35s;">
          ${repeatedGoalString}
        </div>
        <div
          class="StreakBanner__marquee"
          style="animation-duration: 26s; animation-direction: reverse;"
        >
          ${repeatedGoalString}
        </div>
        <div class="StreakBanner__marquee" style="animation-duration: 30s;">
          ${repeatedGoalString}
        </div>
        <div
          class="StreakBanner__marquee"
          style="animation-duration: 33s; animation-direction: reverse;"
        >
          ${repeatedGoalString}
        </div>
      </span>
    </div>`;
  }
}
