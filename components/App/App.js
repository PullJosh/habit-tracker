import { html, useState, useEffect } from "../../htm-preact.js";
import { useChromeStorage } from "../../hooks.js";

import { GoalWizard } from "../GoalWizard/GoalWizard.js";
import { MainScreen } from "../MainScreen/MainScreen.js";
import { UserMenu } from "../UserMenu/UserMenu.js";

export function App() {
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
    <${UserMenu} />
  `;
}
