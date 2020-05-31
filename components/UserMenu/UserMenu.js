import { html, useState, useEffect } from "../../htm-preact.js";
import { useChromeStorage } from "../../hooks.js";

export function UserMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  let [goal, setGoal] = useChromeStorage("goal", null);
  const [logs, setLogs] = useChromeStorage("logs", []);

  const goalIsComplete = !!(
    goal &&
    goal.task &&
    goal.days &&
    goal.outcome_good &&
    goal.outcome_bad
  );

  const dayList = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  const onClickBody = (event) => {
    if (!event.target.closest(".UserMenu")) {
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

  return html`<div class=${"UserMenu" + (menuOpen ? " UserMenu--open" : "")}>
    <button
      class="UserMenu__button"
      onClick=${() => {
        setMenuOpen(!menuOpen);
      }}
    >
      <svg
        class="UserMenu__buttonImage"
        version="1.1"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#fff"
          d="m24 0a24 24 0 0 0-24 24 24 24 0 0 0 24 24 24 24 0 0 0 24-24 24 24 0 0 0-24-24zm0 4a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10zm0 24a28 28 0 0 1 17.289 6.0137 20 20 0 0 1-17.289 9.9863 20 20 0 0 1-17.299-10.01 28 28 0 0 1 17.299-5.9902z"
        />
      </svg>
    </button>

    <div class="UserMenu__popup">
      <div class="UserMenu__area UserMenu__area--user">
        <button
          class="UserMenu__menuButton UserMenu__menuButton--signin"
          title="Registration is not yet available."
          disabled
        >
          Sign In or Register
        </button>
      </div>
      <div class="UserMenu__area UserMenu__area--goal">
        ${goalIsComplete &&
        html`<div class="UserMenu__goal">
          <div class="UserMenu__goalDescription">
            Goal:${" "}
            <span class="UserMenu__goalText">
              ${goal.task[0].toUpperCase() + goal.task.slice(1)}
            </span>
          </div>
          <div class="UserMenu__goalDays">
            ${dayList.map(
              (day, index) =>
                html`<div
                  class=${"UserMenu__goalDay" +
                  (goal.days.includes(day)
                    ? " UserMenu__goalDay--active"
                    : "") +
                  (goal.days.includes(dayList[index - 1])
                    ? " UserMenu__goalDay--prevActive"
                    : "") +
                  (goal.days.includes(dayList[index + 1])
                    ? " UserMenu__goalDay--nextActive"
                    : "")}
                >
                  ${day[0]}
                </div>`
            )}
          </div>
        </div>`}
        ${!goalIsComplete &&
        html`
          <div class="UserMenu__goal">
            <div class="UserMenu__goalDescription">
              <svg
                style="margin-bottom: 16px;"
                width="208"
                height="64"
                version="1.1"
                viewBox="0 0 208 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="translate(0 -280.07)" stroke-linecap="round">
                  <path
                    d="m151.43 289.23s6.3009 2.8307 12.164 2.0686c5.8626-0.76212 9.424-2.7219 15.561-2.1231 6.0615 0.59149 6.4105 1.1432 6.4105 1.1432l-4.1093 24.769s-2.7943-1.6331-10.136-0.92543c-7.3419 0.70768-10.13 1.9036-15.506 1.3065-5.8326-0.64788-8.8761-2.613-8.8761-2.613z"
                    fill="none"
                    stroke="#e6e6ed"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                  <path
                    d="m144 332.07 8-44"
                    fill="none"
                    stroke="#e6e6ed"
                    stroke-width="4"
                  />
                  <g fill="#e6e6ed">
                    <path
                      d="m151.43 289.23c2.8681 1.0034 6.0273 1.8551 10.133 2.2135l-1.3125 7.8125c-3.3491 2e-3 -6.7621-0.63654-9.875-1.625z"
                    />
                    <path
                      d="m169.75 290.19-1.125 7.25c2.5836-0.41516 5.0784-1.3187 7.8125-0.90625l1-7.2188c-2.3795-0.53179-4.9754-0.09-7.6875 0.875z"
                    />
                    <path
                      d="m176.44 296.54-1.0625 9c1.235-0.064 3.0175 0.11694 7.4688 1.125l1.4062-8.75c-3.3155-0.9508-5.552-1.1546-7.8125-1.375z"
                    />
                    <path
                      d="m175.38 305.54c-1.4224-0.12214-3.9352 0.30095-8.1875 1.5938l-1.125 7.1875 8.3125-0.5z"
                    />
                    <path
                      d="m160.25 299.25c2.3764 0.0483 5.4462-0.99277 8.375-1.8125l-1.4375 9.6875c-3.1609 0.78395-6.6512 1.7486-8.5 1.375z"
                    />
                    <path
                      d="m149.66 306.6 9.0312 1.9062-1.125 6.875c-4.2935 0.0331-6.9611-0.84427-9.1875-1.9688z"
                    />
                  </g>
                  <g fill="none" stroke-width="3">
                    <path
                      d="m30.25 329.82s12.25-4.75 32.125-4.625 34.25 10.75 55.5 10.625 26.125-3.75 26.125-3.75"
                      stroke="#444447"
                      stroke-dasharray="12, 12"
                      stroke-linejoin="round"
                    />
                    <path d="m21.75 326.57 17 6.625" stroke="#e6e6ed" />
                    <path d="m22.375 333.94 15.375-8" stroke="#e6e6ed" />
                  </g>
                </g>
              </svg>

              You haven't finished setting a goal yet. When you do, the fun will
              begin!
            </div>
          </div>
        `}
        ${goalIsComplete &&
        html`<button
          class="UserMenu__menuButton UserMenu__menuButton--reset"
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
        </button>`}
      </div>
    </div>
  </div>`;
}
