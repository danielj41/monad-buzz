// monad variants

class Lifted {
  constructor(value) {
    this.value = value;
  }

  chain(transform) {
    var result = transform(this.value);
    return result instanceof RideItOut ? this : result;
  }
}

class Descend {
  constructor(text) {
    this.text = text;
  }

  chain(transform) {
    return this;
  }

  toJSON() {
    return this.text;
  }
}

class RideItOut {
  chain(transform) {
    return this;
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

function fizzbuzzComp(value) {
  if (value % 5 === 0 && value % 3 === 0) {
    return new Descend("fizzbuzz");
  }

  return new RideItOut();
}

function fizzComp(value) {
  if (value % 3 === 0) {
    return new Descend("fizz");
  }

  return new RideItOut();
}

function buzzComp(value) {
  if (value % 5 === 0) {
    return new Descend("buzz");
  }

  return new RideItOut();
}

function idComp(value) {
  return new Descend(value);
}



// fizzbuzz implementation

function LazyFizzbuzzerFactory() {
  return chainGenerator(range(1, 100), (value) => new Lifted(value)
      .chain(fizzbuzzComp)
      .chain(fizzComp)
      .chain(buzzComp)
      .chain(idComp)
      .toJSON());
}



// main

for (text of LazyFizzbuzzerFactory()) {
  console.log(text + "\n");
}
