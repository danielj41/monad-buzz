import assert from 'assert';

import fizzbuzzer from '../src/fizzbuzz.js';
import { getTheWords } from '../src/monad-utils.js';
import yCombinator from '../src/y-combinator.js';

describe('fizzbuzz', function() {
  describe('#fizzbuzzer()', function() {
    it('should match the expected output', function() {

      const words = getTheWords((yCombinator(self =>
        ({ fizzbuzz, finalTruth }) => {
          const { done, value } = fizzbuzz.next();
          return done ? finalTruth : self({ fizzbuzz, finalTruth: value });
        })
      )({
        fizzbuzz: fizzbuzzer()
      }));

      assert.equal(
              "1\n" +
              "2\n" +
              "fizz\n" +
              "4\n" +
              "buzz\n" +
              "fizz\n" +
              "7\n" +
              "8\n" +
              "fizz\n" +
              "buzz\n" +
              "11\n" +
              "fizz\n" +
              "13\n" +
              "14\n" +
              "fizzbuzz\n" +
              "16\n" +
              "17\n" +
              "fizz\n" +
              "19\n" +
              "buzz\n" +
              "fizz\n" +
              "22\n" +
              "23\n" +
              "fizz\n" +
              "buzz\n" +
              "26\n" +
              "fizz\n" +
              "28\n" +
              "29\n" +
              "fizzbuzz\n" +
              "31\n" +
              "32\n" +
              "fizz\n" +
              "34\n" +
              "buzz\n" +
              "fizz\n" +
              "37\n" +
              "38\n" +
              "fizz\n" +
              "buzz\n" +
              "41\n" +
              "fizz\n" +
              "43\n" +
              "44\n" +
              "fizzbuzz\n" +
              "46\n" +
              "47\n" +
              "fizz\n" +
              "49\n" +
              "buzz\n" +
              "fizz\n" +
              "52\n" +
              "53\n" +
              "fizz\n" +
              "buzz\n" +
              "56\n" +
              "fizz\n" +
              "58\n" +
              "59\n" +
              "fizzbuzz\n" +
              "61\n" +
              "62\n" +
              "fizz\n" +
              "64\n" +
              "buzz\n" +
              "fizz\n" +
              "67\n" +
              "68\n" +
              "fizz\n" +
              "buzz\n" +
              "71\n" +
              "fizz\n" +
              "73\n" +
              "74\n" +
              "fizzbuzz\n" +
              "76\n" +
              "77\n" +
              "fizz\n" +
              "79\n" +
              "buzz\n" +
              "fizz\n" +
              "82\n" +
              "83\n" +
              "fizz\n" +
              "buzz\n" +
              "86\n" +
              "fizz\n" +
              "88\n" +
              "89\n" +
              "fizzbuzz\n" +
              "91\n" +
              "92\n" +
              "fizz\n" +
              "94\n" +
              "buzz\n" +
              "fizz\n" +
              "97\n" +
              "98\n" +
              "fizz\n" +
              "buzz\n",
              words);
    });
  });
});
