import fizzbuzzer from './src/fizzbuzz.js';
import { consoleTruth } from './src/monad-utils.js';
import yCombinator from './src/y-combinator.js';

consoleTruth((yCombinator(self => ({ fizzbuzz, finalTruth }) => {
  const { done, value } = fizzbuzz.next();
  return done ? finalTruth : self({ fizzbuzz, finalTruth: value });
}))({
  fizzbuzz: fizzbuzzer()
}));
