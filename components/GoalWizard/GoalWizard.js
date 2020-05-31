import { html, useState } from "../../htm-preact.js";
import { useChromeStorage } from "../../hooks.js";

import { AutoResizeInput } from "../AutoResizeInput/AutoResizeInput.js";
import { DaysSelector } from "../DaysSelector/DaysSelector.js";

export function GoalWizard({ closeScreen }) {
  const [goal, setGoal] = useChromeStorage("goal", {});

  let step = "task";
  if (goal.task) {
    step = "days";
    if (goal.days) {
      step = "outcome_good";
      if (goal.outcome_good) {
        step = "outcome_bad";
        if (goal.outcome_bad) {
          step = "share";
        }
      }
    }
  }

  return html`
    <div class="GoalWizard">
      <div class="GoalWizard__content">
        ${step === "task" && html`<${GoalWizardTask} />`}
        ${step === "days" && html`<${GoalWizardDays} />`}
        ${step === "outcome_good" &&
        html`<${GoalWizardOutcome} variant="good" />`}
        ${step === "outcome_bad" &&
        html`<${GoalWizardOutcome} variant="bad" />`}
        ${step === "share" &&
        html`<${GoalWizardShare}
          goal=${goal}
          close=${() => {
            closeScreen();
          }}
        />`}
      </div>
    </div>
  `;
}

function GoalWizardTask() {
  const [goal, setGoal] = useChromeStorage("goal", {});
  const [taskText, setTaskText] = useState("");

  return html`<h1 class="GoalWizard__header">Step 1: Choose a goal.</h1>
    <div class="GoalWizard__text">
      My life would be better if I chose to${" "}
      <${AutoResizeInput}
        class="GoalWizard__goalInput"
        value=${taskText}
        setValue=${setTaskText}
        autofocus
      />${" "} every day.
    </div>
    <div class="GoalWizard__buttonContainer">
      <button
        class="GoalWizard__button GoalWizard__button--continue"
        onClick=${() => {
          setGoal({ ...goal, task: taskText });
        }}
        disabled=${taskText === ""}
      >
        Next
      </button>
    </div>`;
}

function GoalWizardDays() {
  const [goal, setGoal] = useChromeStorage("goal", {});
  const [days, setDays] = useState(["mon", "tue", "wed", "thu", "fri"]);

  return html`<h1 class="GoalWizard__header">Step 2: Set a schedule.</h1>
    <div class="GoalWizard__text">
      I will <span class="text-green">${goal.task}</span> on these days:
      <${DaysSelector} days=${days} setDays=${setDays} />
    </div>
    <div class="GoalWizard__buttonContainer">
      <button
        class="GoalWizard__button GoalWizard__button--continue"
        onClick=${() => {
          setGoal({ ...goal, days });
        }}
        disabled=${days.length === 0}
      >
        Next
      </button>
      <button
        class="GoalWizard__button GoalWizard__button--back"
        onClick=${() => {
          setGoal({ ...goal, task: undefined });
        }}
      >
        Back
      </button>
    </div>`;
}

function GoalWizardOutcome({ variant }) {
  const [goal, setGoal] = useChromeStorage("goal", {});
  const [outcomeText, setOutcomeText] = useState("");

  return html`<h1 class="GoalWizard__header">
      Step ${variant === "good" ? "3" : "4"}: Consider the Possibilities
    </h1>
    <div class="GoalWizard__text">
      What will your life be like if you consistently${" "}
      ${variant === "good"
        ? html`<span class="text-green">succeed</span>`
        : html`<span class="text-red">fail</span>`}${" "}
      for a year?
      <textarea
        value=${outcomeText}
        class=${`GoalWizard__textarea ${
          variant === "good" ? "text-green" : "text-red"
        }`}
        onInput=${(event) => {
          setOutcomeText(event.target.value);
        }}
        placeholder=${variant === "good"
          ? "I will be stronger and better able to support my family."
          : "I will be weak and useless."}
        autofocus
        rows=${3}
      />
    </div>
    <div class="GoalWizard__buttonContainer">
      <button
        class="GoalWizard__button GoalWizard__button--continue"
        onClick=${() => {
          setGoal({
            ...goal,
            [`outcome_${variant}`]: outcomeText,
            startDate: new Date().getTime(),
          });
        }}
        disabled=${outcomeText === ""}
      >
        Next
      </button>
      <button
        class="GoalWizard__button GoalWizard__button--back"
        onClick=${() => {
          setGoal({
            ...goal,
            [variant === "good" ? "days" : "outcome_good"]: undefined,
          });
        }}
      >
        Back
      </button>
    </div>`;
}

function GoalWizardShare({ goal, close }) {
  const daysText = (num) => {
    if (num === 1) return "one day";
    if (num === 2) return "two days";
    if (num === 3) return "three days";
    if (num === 4) return "four days";
    if (num === 5) return "five days";
    if (num === 6) return "six days";
    if (num === 7) return "seven days";
    return `${num} days`;
  };

  let twitterURL = new URL("https://twitter.com/intent/tweet");
  twitterURL.searchParams.append(
    "text",
    `I am committing to ${goal.task} ${daysText(
      goal.days.length
    )} a week. Wish me luck!`
  );

  return html`<h1 class="GoalWizard__header">Step 5: Public Accountability</h1>
    <div class="GoalWizard__text">
      If you're serious about achieving your goal, commit to it publicly.
    </div>
    <div class="GoalWizard__text GoalWizard__text--small">
      Share your goal on${" "}
      <a href=${twitterURL.href} target="_blank" rel="nofollow">Twitter</a> or
      write a post on${" "}
      <a href="https://facebook.com/" target="_blank" rel="nofollow">Facebook</a
      >.
    </div>
    <div class="GoalWizard__buttonContainer">
      <button
        class="GoalWizard__button GoalWizard__button--continue"
        onClick=${close}
      >
        Done
      </button>
    </div>`;
}
