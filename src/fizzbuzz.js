import { chainTruthGenerator, range } from './generator-utils.js';
import { fizzbuzzComp, fizzComp, buzzComp, idComp } from './fizzbuzz-comps.js';
import { pass } from './monad-utils.js';

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
