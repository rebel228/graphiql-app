export const prettify = (string: string): string => {
  const braces: boolean[] = [];
  for (let i = 0; i < string.length; i++) {
    if (['{', '['].includes(string[i])) {
      if (
        (string[i] === '[' && string[i + 1] === ']') ||
        (string[i] === '{' && string[i + 1] === '}')
      ) {
        i += 2;
      } else {
        braces.push(true);
        string =
          string.slice(0, i + 1) +
          `\n${'\t'.repeat(braces.length)}` +
          string.slice(i + 1);
        i += 1;
      }
    }
    if (['}', ']'].includes(string[i])) {
      braces.pop();
      string =
        string.slice(0, i) +
        `\n${'\t'.repeat(braces.length)}` +
        string.slice(i);
      i = i + braces.length + 1;
    }
    if (',' === string[i]) {
      if (string[i + 1] === ' ') {
        string = string.slice(0, i + 1) + string.slice(i + 2);
      }
      string =
        string.slice(0, i + 1) +
        `\n${'\t'.repeat(braces.length)}` +
        string.slice(i + 1);
      i += 1;
    }
    if (':' === string[i] && string[i + 1].match(/\S/)) {
      string = string.slice(0, i + 1) + ' ' + string.slice(i + 1);
      i += 1;
    }
    if ([',"'].includes(string[i] + string[i + 1])) {
      string = string.slice(0, i + 1) + ' ' + string.slice(i + 1);
      i += 1;
    }
    if (string[i] === '\\' && string[i + 1] === 'n') {
      string = string.slice(0, i) + ' ' + string.slice(i + 2);
    }
  }
  return string.replace(/\n\t{0,}\s{0,}\n/, '\n');
};

export const prepareToPrettify = (string: string) => {
  string = string
    .replace(/\n|\r|\t/g, '')
    .replace(/(^\s*)|(\s*$)/gi, '')
    .replace(/[ ]{2,}/gi, ' ')
    .replace(/\n /, '\n')
    .replace(/\s+\x3a/g, ':')
    .replace(/ {1,}\x2c/, ',')
    .replace(/\x5b \x5d/, '[]')
    .replace(/\x7b \x7d/, '{}')
    .replace(/\x7b /, '{')
    .replace(/\x5b /, '[');
  return string;
};
