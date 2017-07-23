# monad-buzz
fizzbuzz without out all the sad mutation and interleaved IO

## featuring

easily-understandable definition of program behavior


```js
/**
 * @return Iterator A lazy iterator that will create and bind one computation per
 *                  iteration. It will return an immutable IO monad after each
 *                  iteration. The final IO monad can be executed at the end of
 *                  the program to build the final output string.
 */
export default function fizzbuzzer() {
  return chainTruthGenerator(pass(), range(1, 100), truth => truth
      .bind(fizzbuzzComp)
      .bind(fizzComp)
      .bind(buzzComp)
      .bind(idComp));
}
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

mutation-free iteration

```js
/**
 * Returns an iterator over a range of integers.
 */
export function* range(start, end) {
  if (start <= end) {
    yield start;
    yield* range(start + 1, end);
  }
}
```
