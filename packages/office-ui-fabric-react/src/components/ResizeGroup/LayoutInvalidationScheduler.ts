import { getWindow } from '../../Utilities';
let rafScheduled = false;
let layoutOperations: (() => void)[] = [];

export function scheduleLayoutInvalidatingOperation<T>(fn: () => T): Promise<T> {
  ensureRafScheduled();
  return new Promise<T>(resolve => {
    layoutOperations.push(() => resolve(fn()));
  });
}

function ensureRafScheduled() {
  if (!rafScheduled) {
    const win = getWindow();
    if (win) {
      win.requestAnimationFrame(performLayoutOperations);
      rafScheduled = true;
    }
  }
}

function performLayoutOperations() {
  layoutOperations.forEach(x => x());
  layoutOperations = [];
  rafScheduled = false;
}
