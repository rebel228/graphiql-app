import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { prepareToPrettify, prettify } from '../helpers/prettify';

describe('Prettify function', () => {
  it('removes double whitespaces', () => {
    const string = 'a  b  c';
    expect(prettify(prepareToPrettify(string))).toBe('a b c');
  });

  it('trims the string', () => {
    const string = '   abc     ';
    expect(prettify(prepareToPrettify(string))).toBe('abc');
  });

  it('adds linebreaks and intendation for objects', () => {
    const string1 = '{a: 1, b: 2}';
    const string2 = '{a: [b, c], b: 2}';
    expect(prettify(prepareToPrettify(string1))).toBe(`{\n\ta: 1,\n\tb: 2\n}`);
    expect(prettify(prepareToPrettify(string2))).toBe(
      `{\n\ta: [\n\t\tb,\n\t\tc\n\t],\n\tb: 2\n}`
    );
  });

  it('doesnt add linebreaks for empty object / arrays', () => {
    const string = '{a: {}, b: []}';
    expect(prettify(prepareToPrettify(string))).toBe(`{\n\ta: {},\n\tb: []\n}`);
  });

  it('preserves commas and colons inside strings', () => {
    const string = '{"A": "Abc", "def": {"abc": "aab, bbc, ccd"}}';
    const expected = `{\n\t"A": "Abc",\n\t"def": {\n\t\t"abc": "aab, bbc, ccd"\n\t}\n}`;
    expect(prettify(prepareToPrettify(string))).toBe(expected);
  });
});
