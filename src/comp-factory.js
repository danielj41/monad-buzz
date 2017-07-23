import { pass, lifted, spoken } from './monad-utils.js';

/**
 * Returns a commonly-used computation: If condition(value) is met, speak some
 * words. Otherwise, pass the value to the next computation.
 *
 * @param (T -> boolean) condition
 * @param string words
 *
 * @return (Maybe<T> -> Truth<Maybe<T>>)
 */
export default function compFactory(condition, words) {
  return maybe => {
    return maybe.bind(value => {
      if (condition(value)) {
        return spoken(words);
      }

      return lifted(value);
    }, pass());
  }
}
