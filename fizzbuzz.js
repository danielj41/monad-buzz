// monad variants

/**
 * An IO monad implementation. Please only use this monad to say things that are
 * true; do not lie to your user.
 * Truth<T>
 */
class Truth {
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
class Yes {
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

class No {
  bind(fn, defaultValue) {
    return defaultValue;
  }
}

/**
 * Monad utils for common use cases.
 */

/**
 * Takes a raw value and returns the value wrapped in a Maybe and IO monad.
 * The IO monad will not output anything.
 *
 * @param T liftValue The raw value to lift
 * @return Truth<Maybe<T>>
 */
function lifted(liftValue) {
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
function spoken(moreWords) {
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
function pass() {
  return new Truth(words => {return { words, value: new No() }});
}

function consoleTruth(truth) {
  console.log(truth.speakTheTruth('').words);
}







// generator utils

function* chainTruthGenerator(truth, generator, transform) {
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

function* range(start, end) {
  if (start <= end) {
    yield start;
    yield* range(start + 1, end);
  }
}



// fizzbuzz computations

function fizzbuzzComp(maybe) {
  return maybe.bind(value => {
    if (value % 5 === 0 && value % 3 === 0) {
      return spoken("fizzbuzz");
    }
    return lifted(value);
  }, pass());
}

function fizzComp(maybe) {
  return maybe.bind(value => {
    if (value % 3 === 0) {
      return spoken("fizz");
    }
    return lifted(value);
  }, pass());
}

function buzzComp(maybe) {
  return maybe.bind(value => {
    if (value % 5 === 0) {
      return spoken("buzz");
    }
    return lifted(value);
  }, pass());
}

function idComp(maybe) {
  return maybe.bind(spoken, pass());
}



// fizzbuzz implementation

function LazyFizzbuzzerFactory() {
  return chainTruthGenerator(pass(), range(1, 100), truth => truth
      .bind(fizzbuzzComp)
      .bind(fizzComp)
      .bind(buzzComp)
      .bind(idComp));
}



// main
let truth = null;
for (truth of LazyFizzbuzzerFactory()) {}
consoleTruth(truth);
