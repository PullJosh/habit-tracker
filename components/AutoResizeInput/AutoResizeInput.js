import { html, useRef } from "../../htm-preact.js";

export function AutoResizeInput({ value, setValue, ...props }) {
  const containerRef = useRef();
  const inputRef = useRef();

  const updateWidth = () => {
    const span = document.createElement("span");
    const withNonbreakingSpaces = event.target.value
      .split("")
      .map((str) => (str === " " ? "\xa0" : str))
      .join("");
    span.innerText = withNonbreakingSpaces;
    span.className = props.class;
    span.style.width = "auto";

    containerRef.current.appendChild(span);
    const rect = span.getBoundingClientRect();
    containerRef.current.removeChild(span);

    inputRef.current.style.width = rect.width + "px";
  };

  return html`<span ref=${containerRef}>
    <input
      ...${props}
      type="text"
      ref=${inputRef}
      value=${value}
      onInput=${(event) => {
        setValue(event.target.value);

        updateWidth();
      }}
    />
  </span>`;
}
