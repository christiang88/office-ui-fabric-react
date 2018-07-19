import { getWindow } from './dom';

/**
 * We use requestAnimationFrames as the basis for layout operations, batching as many layout operations as
 * possible in a single requestAnimationFrame. This variable is used to ensure we only schedule one
 * call to requestAnimationFrame at a time.
 */
let rafScheduled = false;

/**
 * An array that keeps track of all the functions containing layout invalidating operations that have been
 * scheduled.
 */
let layoutOperations: (() => void)[] = [];

/**
 * Often times components will need to call browser APIs that will require a reflow. If the DOM has been
 * heavily mutated since the last reflow, this could be an expensive operation. The problem gets worse as
 * multiple components start calling these APIs and updating the DOM with the result of the API calls. To
 * optimize runtime performance, we should try to batch all calls to layout invalidating operations across
 * components to happen in a single pass, then allow the components to mutate the DOM once all the DOM reads
 * have completed.
 *
 * This function allows for a component to schedule a layout invalidating operation, leaving it up to the
 * layout scheduler to determine the most optimal time to perform this update. The caller will receive a
 * callback that will be invoked once the the layout invalidating operation has been performed, providing
 * any return values of that layout invalidating operation.
 * @param fn A function encapsulating usages of APIs like "getBoundingClientRect" that will force a reflow.
 */
export function scheduleLayoutInvalidatingOperation<T>(fn: () => T): Promise<T> {
  ensureRafScheduled();
  return new Promise<T>((resolve: (value: T) => void) => {
    layoutOperations.push(() => resolve(fn()));
  });
}

function ensureRafScheduled(): void {
  if (!rafScheduled) {
    const win = getWindow();
    if (win) {
      win.requestAnimationFrame(executeLayoutInvalidatingOperations);
      rafScheduled = true;
    }
  }
}

/**
 * Executes all layout invalidating operations. This leverages the fact that all promises get executed at the
 * end of the current current run of the event loop. This means all the layout invalidating operations would
 * happen before any of the promises get resolved. This guarantees that the DOM will not be mutated until all
 * layout invalidating operations have taken place.
 */
function executeLayoutInvalidatingOperations(): void {
  layoutOperations.forEach((x: () => void) => x());
  layoutOperations = [];
  rafScheduled = false;
}
