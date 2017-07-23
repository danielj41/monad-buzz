/**
 * An IO monad implementation. Please only use this monad to say things that are
 * true; do not lie to your user.
 * Truth<T>
 */
export class Truth {
  /**
   * @param (oldWords: string -> { words: string, value: T }) speakTheTruth
   */
  constructor(speakTheTruth) {
    this.speakTheTruth = speakTheTruth;
  }

  /**
   * @param ((words, value) -> (oldWords -> { words, value })) getNextSpeaker
   * @return Truth<T> A new Truth<T> monad expressing both Truths sequentially.
   */
  bind(getNextSpeaker) {
    return new Truth(oldWords => {
      const { words, value } = this.speakTheTruth(oldWords);
      return getNextSpeaker(value, words).speakTheTruth(words);
    });
  }
}

/**
 * A Maybe<T> monad implementation with two variants.
 * variant Yes<T> contains a value, and will pass its value to bound functions.
 * variant No does not contan a value, and will propagate the default value
 *            forward.
 */
export class Yes {
  /**
   * @param T value
   */
  constructor(value) {
    this.value = value;
  }

  bind(fn, defaultValue) {
    return fn(this.value);
  }
}

export class No {
  bind(fn, defaultValue) {
    return defaultValue;
  }
}
