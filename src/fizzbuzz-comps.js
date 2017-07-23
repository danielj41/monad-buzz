import { pass, lifted, spoken } from './monad-utils.js';

export function fizzbuzzComp(maybe) {
  return maybe.bind(value => {
    if (value % 5 === 0 && value % 3 === 0) {
      return spoken("fizzbuzz");
    }
    return lifted(value);
  }, pass());
}

export function fizzComp(maybe) {
  return maybe.bind(value => {
    if (value % 3 === 0) {
      return spoken("fizz");
    }
    return lifted(value);
  }, pass());
}

export function buzzComp(maybe) {
  return maybe.bind(value => {
    if (value % 5 === 0) {
      return spoken("buzz");
    }
    return lifted(value);
  }, pass());
}

export function idComp(maybe) {
  return maybe.bind(spoken, pass());
}
