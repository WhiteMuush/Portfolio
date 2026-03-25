export function useCursorSection(text: string) {
  const dispatch = (t: string | null) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("cursor-section", { detail: { text: t } })
      );
    }
  };
  return {
    onMouseEnter: () => dispatch(text),
    onMouseLeave: () => dispatch(null),
  };
}
