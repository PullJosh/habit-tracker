import { html, useState, useEffect } from "../../htm-preact.js";

export function SuccessScreen({ succeeded, undo }) {
  // Don't shake if you load the page and have already succeeded
  const [allowAnimation, setAllowAnimation] = useState(!succeeded);

  useEffect(() => {
    if (!succeeded) {
      setAllowAnimation(true);
    }
  }, [succeeded]);

  return html`
    <div
      class=${"SuccessScreen" +
      (succeeded ? " SuccessScreen--visible" : "") +
      (allowAnimation ? " SuccessScreen--allowAnimation" : "")}
      style=${{
        transform: `translateY(${succeeded ? "0%" : "100%"})`,
        transformOrigin: "bottom left",
        opacity: succeeded ? 1 : 0,
        transition: succeeded
          ? "transform 400ms cubic-bezier(0.700, 0.000, 0.700, 0.000)"
          : "opacity 150ms ease-in-out, transform 150ms step-end",
      }}
    >
      <svg viewBox="0 0 100 10" class="SuccessScreen__curve">
        <path fill="black" d="M0 0 Q 50 20, 100 0" />
      </svg>
      <div
        class="SuccessScreen__inner"
        style=${{
          transform: `translateY(${succeeded ? "0%" : "-100%"})`,
          transformOrigin: "bottom left",
          transition: succeeded
            ? "transform 400ms cubic-bezier(0.700, 0.000, 0.700, 0.000)"
            : "none",
        }}
      >
        <div class="SuccessScreen__content">
          <h1 class="SuccessScreen__header">Good work. 🎉</h1>
          <button
            class="SuccessScreen__undoBtn"
            onClick=${() => {
              undo();
            }}
          >
            ← Undo
          </button>
        </div>
      </div>
    </div>
  `;
}
