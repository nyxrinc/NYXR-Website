// Native <dialog> supplies modality and Escape; keep Tab within its controls too.
export function trapDialogFocus(event) {
  if (event.key !== 'Tab') return;
  const controls = [
    ...event.currentTarget.querySelectorAll(
      'button:not([disabled]),a[href],input:not([disabled]),select,textarea,[tabindex="0"]',
    ),
  ].filter((el) => el.getClientRects().length);
  if (!controls.length) {
    event.preventDefault();
    return;
  }
  const first = controls[0],
    last = controls.at(-1),
    active = document.activeElement;
  if (event.shiftKey && (active === first || !event.currentTarget.contains(active))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (active === last || !event.currentTarget.contains(active))) {
    event.preventDefault();
    first.focus();
  }
}
