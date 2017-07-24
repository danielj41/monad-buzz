import { lifted, spoken } from './monad-utils.js';
import yCombinator from './y-combinator.js';

/**
 * Maps each value from `generator` through `transform`, chaining IO operations
 * together.
 *
 * @param Truth truth The initial IO monad to bind through the computations.
 * @param Iterator generator An iterator of values to `transform`.
 * @param (Truth -> Truth) transform
 */
export const chainTruthGenerator = yCombinator(self =>
  function*({ truth, generator, transform }) {
    const next = generator.next();

    if (!next.done) {
      const newTruth = transform(truth.bind(() => lifted(next.value)));
      yield newTruth; // Let the user do one iteration at a time.

      yield* self({
        truth: newTruth.bind(() => spoken("\n")),
        generator,
        transform
      });
    } else {
      yield truth;
    }
  }
);

/**
 * Returns an iterator over a range of integers.
 */
export const range = yCombinator(self =>
  function*({ start, end }) {
    if (start <= end) {
      yield start;
      yield* self({
        start: start + 1,
        end
      });
    }
  }
);
