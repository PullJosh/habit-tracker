import { html, useState, useEffect } from "../../htm-preact.js";

export function ClickAndHoldButton({
  className,
  children,
  onClick,
  onReleaseEarly,
  ...props
}) {
  const [holding, setHolding] = useState(false);
  const [holdingReason, setHoldingReason] = useState(null);

  const releaseEarly = () => {
    setHolding(false);
    setHoldingReason(null);

    onReleaseEarly();
  };

  const onMouseUp = () => {
    if (holding && holdingReason === "mouse") {
      releaseEarly();
    }
  };

  const onKeyUp = (event) => {
    if (holding) {
      if (
        (event.key === "Enter" && holdingReason === "enter") ||
        (event.key === " " && holdingReason === "space")
      ) {
        releaseEarly();
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("keyup", onKeyUp);

    return () => {
      document.body.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("keyup", onKeyUp);
    };
  });

  useEffect(() => {
    if (holding) {
      const timeout = setTimeout(() => {
        setHolding(false);
        setHoldingReason(null);

        onClick();
      }, 1500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [holding]);

  return html`<button
    class=${[
      "ClickAndHoldButton",
      `ClickAndHoldButton--${holding ? "holding" : "released"}`,
      className || "",
    ].join(" ")}
    onMouseDown=${() => {
      if (!holding) {
        setHolding(true);
        setHoldingReason("mouse");
      }
    }}
    onKeyPress=${(event) => {
      if (!holding) {
        if (event.key === "Enter") {
          setHolding(true);
          setHoldingReason("enter");
        }

        if (event.key === " ") {
          setHolding(true);
          setHoldingReason("space");
        }
      }
    }}
    ...${props}
  >
    <span class="ClickAndHoldButton__content">${children}</span>
  </button>`;
}
