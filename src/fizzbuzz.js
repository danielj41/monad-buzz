import { chainTruthGenerator, range } from './generator-utils.js';
import { fizzbuzzComp, fizzComp, buzzComp, idComp } from './fizzbuzz-comps.js';
import { pass } from './monad-utils.js';

/**
 * @return Iterator A lazy iterator that will perform one computation per
 *                  iteration. It will return the current `Truth` at each
 *                  iteration, which can be evaluated at the end of the program
 *                  to create the final output.
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
