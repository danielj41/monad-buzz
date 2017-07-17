// monad variants

// io
class Truth {
  constructor(speakTheTruth) {
    this.speakTheTruth = speakTheTruth;
  }

  bind(getNextSpeaker) {
    return new Truth(oldWords => {
      const { words, value } = this.speakTheTruth(oldWords);
      return getNextSpeaker(value, words).speakTheTruth(words);
    });
  }
}

function lifted(liftValue) {
  return new Truth(words => {
    return { words, value: new Yes(liftValue) };
  });
}

function spoken(moreWords) {
  return new Truth(words => {
    return {
      words: words + moreWords,
      value: new No()
    };
  });
}

function pass() {
  return new Truth(words => {return { words, value: new No() }});
}

function consoleTruth(truth) {
  console.log(truth.speakTheTruth('').words);
}



class Yes {
  constructor(value) {
    this.value = value;
  }

  bind(fn) {
    return fn(this.value);
  }
}

class No {
  bind(fn) {
    return pass();
  }
}



// generator utils

function* chainGenerator(generator, transform) {
  var next = generator.next();

  if (!next.done) {
    yield transform(next.value);
    yield* chainGenerator(generator, transform);
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
  });
}

function fizzComp(maybe) {
  return maybe.bind(value => {
    if (value % 3 === 0) {
      return spoken("fizz");
    }
    return lifted(value);
  });
}

function buzzComp(maybe) {
  return maybe.bind(value => {
    if (value % 5 === 0) {
      return spoken("buzz");
    }
    return lifted(value);
  });
}

function idComp(maybe) {
  return maybe.bind(spoken);
}



// fizzbuzz implementation

function LazyFizzbuzzerFactory() {
  return chainGenerator(range(1, 100), value => lifted(value)
      .bind(fizzbuzzComp)
      .bind(fizzComp)
      .bind(buzzComp)
      .bind(idComp));
}



// main

for (truth of LazyFizzbuzzerFactory()) {
  consoleTruth(truth);
}
