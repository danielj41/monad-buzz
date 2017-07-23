import fizzbuzzer from './src/fizzbuzz.js';
import { consoleTruth } from './src/monad-utils.js';

let truth;

for (truth of fizzbuzzer()) {}

consoleTruth(truth);
