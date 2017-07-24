# monad-buzz
fizzbuzz without out all the sad mutation and interleaved IO [satire [kinda]]

## featuring

easily-understandable definition of program behavior


```js
/**
 * @return Iterator<Truth<Maybe<int>>>
 *    A lazy iterator that will create and bind one computation per
 *    iteration. It will return an immutable IO monad after each
 *    iteration. The final IO monad can be executed at the end of
 *    the program to build the final output string.
 */
export default function fizzbuzzer() {
  return chainTruthGenerator({
    truth: pass(),
    generator: range({start: 1, end: 100}),
    transform: truth => truth
        .bind(fizzbuzzComp)
        .bind(fizzComp)
        .bind(buzzComp)
        .bind(idComp)
  });
}
```

mutation-free iteration

```js
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

```

beautiful declarative computations

```js
/**
 * @param Maybe<int> value
 * @return Truth<Maybe<int>>
 */
export const buzzComp = compFactory(
    value => value % 5 === 0,
    "buzz");
```
