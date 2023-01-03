import * as NumberUtils from '../utils/NumberUtils'
import { describe, expect, test } from '@jest/globals'

describe('sum module', () => {
  test('12 fill 3 zero', () => {
    expect(NumberUtils.fillZero(12, 3)).toBe('012');
  });
});

