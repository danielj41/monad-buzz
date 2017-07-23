import { Yes, No, Truth } from './monads.js';

/**
 * Takes a raw value and returns the value wrapped in a Maybe and IO monad.
 * The IO monad will not output anything.
 *
 * @param T liftValue The raw value to lift
 * @return Truth<Maybe<T>>
 */
export function lifted(liftValue) {
  return new Truth(words => {
    return { words, value: new Yes(liftValue) };
  });
}

/**
 * Takes words and returns an IO monad that will speak those words. This IO
 * monad will "consume" the value passed through, returning a No monad variant.
 *
 * @param string moreWords
 * @return Truth<Maybe<T>>
 */
export function spoken(moreWords) {
  return new Truth(words => {
    return {
      words: words + moreWords,
      value: new No()
    };
  });
}

/**
 * Returns an empty IO monad.
 *
 * @return Truth<Maybe<T>>
 */
export function pass() {
  return new Truth(words => {return { words, value: new No() }});
}

/**
 * Logs the final Truth to the console. Only use as the last statement in your
 * program.
 */
export function consoleTruth(truth) {
  console.log(truth.speakTheTruth('').words);
}
