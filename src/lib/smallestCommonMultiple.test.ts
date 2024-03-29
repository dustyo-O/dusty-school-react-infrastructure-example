import { smallestCommonMultiple } from './smallestCommonMultiple';

test('smallestCommonMultiple', () => {
    const result = smallestCommonMultiple(6, 8);

    expect(result).toBe(24);
});
