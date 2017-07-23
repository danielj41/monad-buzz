import { spoken, pass } from './monad-utils';
import compFactory from './comp-factory.js';

export const fizzbuzzComp = compFactory(
    value => value % 5 === 0 && value % 3 === 0,
    "fizzbuzz");

export const fizzComp = compFactory(
    value => value % 3 === 0,
    "fizz");

export const buzzComp = compFactory(
    value => value % 5 === 0,
    "buzz");

export const idComp = maybe => maybe.bind(spoken, pass());
