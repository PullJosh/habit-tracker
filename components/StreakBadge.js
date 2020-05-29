import { html } from "../htm-preact.js";

export function StreakBadge({ type, days }) {
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
