import { html, useState, useEffect } from "../htm-preact.js";

export function SuccessScreen({ succeeded, undo }) {
  // Don't shake if you load the page and have already succeeded
  const [allowShakeAnimation, setAllowShakeAnimation] = useState(!succeeded);

  useEffect(() => {
    if (!succeeded) {
      setAllowShakeAnimation(true);
    }
  }, [succeeded]);

  return html`
    <div
      class=${"SuccessScreen" + (succeeded ? " SuccessScreen--visible" : "")}
      style=${{
        transform: `translateY(${succeeded ? "0%" : "100%"})`,
        transformOrigin: "bottom left",
        opacity: succeeded ? 1 : 0,
        transition: succeeded
          ? "opacity 100ms ease-in, transform 400ms cubic-bezier(0.700, 0.000, 0.700, 0.000)"
          : "opacity 150ms ease-in-out, transform 150ms step-end",
      }}
    >
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
        <div
          class=${"SuccessScreen__content" +
          (allowShakeAnimation
            ? " SuccessScreen__content--allowShakeAnimation"
            : "")}
        >
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
