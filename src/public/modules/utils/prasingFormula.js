export function toPubChemFormula(formula) {

  const counts = parseFormula(formula);
  console.log(toHillNotation(counts));
  return toHillNotation(counts);
};

function parseFormula(formula) {
  // Recursively parse a formula string into an atom count map
  function parse(str, i) {
    const counts = {};
    while (i < str.length) {
      if (str[i] === '(') {
        // Find matching closing paren
        i++;
        const [inner, ni] = parse(str, i);
        i = ni + 1; // skip ')'
        // Read multiplier after ')'
        let numStr = '';
        while (i < str.length && /[0-9]/.test(str[i])) numStr += str[i++];
        const mult = numStr ? parseInt(numStr) : 1;
        for (const [el, cnt] of Object.entries(inner))
          counts[el] = (counts[el] || 0) + cnt * mult;
      } else if (str[i] === ')') {
        return [counts, i];
      } else if (/[A-Z]/.test(str[i])) {
        // Read element symbol
        let sym = str[i++];
        while (i < str.length && /[a-z]/.test(str[i])) sym += str[i++];
        // Read count
        let numStr = '';
        while (i < str.length && /[0-9]/.test(str[i])) numStr += str[i++];
        const cnt = numStr ? parseInt(numStr) : 1;
        counts[sym] = (counts[sym] || 0) + cnt;
      } else {
        throw new Error('Unexpected character: ' + str[i]);
      };
    };
    return [counts, i];
  };

  const [counts] = parse(formula, 0);
  return counts;
};

function toHillNotation(counts) {
  // Hill order: C first, H second, then alphabetical
  const elements = Object.keys(counts);
  const sorted = [];
  if (counts['C']) sorted.push('C');
  if (counts['H']) sorted.push('H');
  for (const el of elements.sort()) {
    if (el !== 'C' && el !== 'H') sorted.push(el);
  }
  return sorted.map(el => el + (counts[el] > 1 ? counts[el] : '')).join('');
};

