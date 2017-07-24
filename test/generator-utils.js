import assert from 'assert';

import { range } from '../src/generator-utils.js';

describe('generator-utils', function() {
  describe('#range()', function() {
    it('should iterate over a range of values', function() {
      const iterator = range({ start: -2, end: 1 });

      assert.equal(-2, iterator.next().value);
      assert.equal(-1, iterator.next().value);
      assert.equal(0, iterator.next().value);
      assert.equal(1, iterator.next().value);
      assert.equal(true, iterator.next().done);
    });
  });
});
