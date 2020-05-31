import { html, useState, useEffect } from "../../htm-preact.js";
import { useChromeStorage } from "../../hooks.js";

export function GoalMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  let [goal, setGoal] = useChromeStorage("goal", null);
  const [logs, setLogs] = useChromeStorage("logs", []);

  const onClickBody = (event) => {
    if (!event.target.closest(".GoalMenu")) {
      setMenuOpen(false);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", onClickBody);
    document.body.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.removeEventListener("click", onClickBody);
      document.body.removeEventListener("keydown", onKeyDown);
    };
  });

  const goalIsComplete = !!(
    goal &&
    goal.task &&
    goal.days &&
    goal.outcome_good &&
    goal.outcome_bad
  );

  if (!goalIsComplete) {
    return null;
  }

  return html`<div class=${"GoalMenu" + (menuOpen ? " GoalMenu--open" : "")}>
    <button
      class="GoalMenu__button"
      onClick=${() => {
        setMenuOpen(!menuOpen);
      }}
    >
      <svg version="1.1" viewBox="0 0 38 38">
        <circle cx="19" cy="19" r="3" fill="#fff" />
        <circle
          cx="19"
          cy="19"
          r="9"
          fill="none"
          stroke="#fff"
          stroke-width="4"
        />
        <circle
          cx="19"
          cy="19"
          r="17"
          fill="none"
          stroke="#fff"
          stroke-width="4"
        />
      </svg>
    </button>

    <div class="GoalMenu__popup">
      <div class="GoalMenu__goalDetails">
        <p>
          Your goal is to${" "}
          <strong class="text-green">${goal.task}</strong> on these days:
        </p>

        <div class="GoalMenu__goalDays">
          ${["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(
            (day, index, dayList) =>
              html`<div
                class=${"GoalMenu__goalDay" +
                (goal.days.includes(day) ? " GoalMenu__goalDay--active" : "") +
                (goal.days.includes(dayList[index - 1])
                  ? " GoalMenu__goalDay--prevActive"
                  : "") +
                (goal.days.includes(dayList[index + 1])
                  ? " GoalMenu__goalDay--nextActive"
                  : "")}
              >
                ${day[0]}
              </div>`
          )}
        </div>

        <p>You know the potential outcomes.</p>

        <div class="GoalMenu__outcome GoalMenu__outcome--good">
          ${goal.outcome_good}
        </div>

        <div class="GoalMenu__or">OR</div>

        <div class="GoalMenu__outcome GoalMenu__outcome--bad">
          ${goal.outcome_bad}
        </div>

        <p>The decision is yours.</p>
      </div>
      <div class="GoalMenu__actionBar">
        <button
          class="GoalMenu__resetButton"
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
          Reset Goal
        </button>
      </div>
    </div>
  </div>`;
}
