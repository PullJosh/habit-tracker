import { html } from "../htm-preact.js";

export function DaysSelector({ days, setDays }) {
  const dayOptions = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  const addDay = (day) => {
    setDays([...days, day]);
  };

  const removeDay = (day) => {
    setDays(days.filter((d) => d !== day));
  };

  return html`<div class="DaysSelector">
    ${dayOptions.map((day) => {
      const active = days.includes(day);
      return html`<label
        class=${`DaysSelector__day DaysSelector__day--${active ? "on" : "off"}`}
      >
        <input
          type="checkbox"
          class="DaysSelector__checkbox"
          checked=${active}
          onChange=${() => {
            if (active) {
              removeDay(day);
            } else {
              addDay(day);
            }
          }}
        />
        <span class="DaysSelector__dayText">${day.slice(0, 1)}</span>
      </label>`;
    })}
  </div>`;
}
