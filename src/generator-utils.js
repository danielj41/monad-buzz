import { lifted, spoken } from './monad-utils.js';

export function* chainTruthGenerator(truth, generator, transform) {
  const next = generator.next();

  if (!next.done) {
    const newTruth = transform(truth.bind(() => lifted(next.value)));
    yield;
    yield* chainTruthGenerator(newTruth.bind(() => spoken("\n")),
        generator,
        transform);
  } else {
    yield truth;
  }
}

export function* range(start, end) {
  if (start <= end) {
    yield start;
    yield* range(start + 1, end);
  }
}
