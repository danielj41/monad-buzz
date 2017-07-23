import { chainTruthGenerator, range } from './generator-utils.js';
import { fizzbuzzComp, fizzComp, buzzComp, idComp } from './fizzbuzz-comps.js';
import { pass } from './monad-utils.js';

export default function fizzbuzzer() {
  return chainTruthGenerator(pass(), range(1, 100), truth => truth
      .bind(fizzbuzzComp)
      .bind(fizzComp)
      .bind(buzzComp)
      .bind(idComp));
}
