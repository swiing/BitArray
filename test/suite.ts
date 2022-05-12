import BitArray from '../src/bitarray';

const len = 42; // choose whatever value

// we fill randomly, but we could choose fixed values, or whatever,
const arr1 = new Array(len).fill(false).map((x) => Math.random() > 0.5);
// arr2 is arbitrarily longer here. Could also be shorter, or same size
const arr2 = new Array(len + 10).fill(false).map((x) => Math.random() > 0.5);

const sample1 = BitArray.from(arr1);
const sample2 = BitArray.of(...arr2);
const sample3 = BitArray.from('0110');

// Returns true if the block throws
function expectThrow(fn: () => void) {
  try {
    fn();
  } catch (e) {
    return true;
  }

  return false;
}

// matches the format of BitArray.toSting()
function toString(arr) {
  return (
    arr
      .map(Number)
      // add space between each byte
      .map((b, i) => ((i + 1) % 8 ? b : b + ' '))
      .join('')
      // remove possible end space
      .trim()
  );
}

/** suite 1 */
const instantiating = {
  'BitArray.from': sample1 instanceof BitArray,
  'BitArray.of': sample2 instanceof BitArray,
};

/** suite 2 */
const properties = {
  '.count': sample1.count == arr1.reduce((acc, bit) => acc + Number(bit), 0),
};

/** suite 3 */
const binary_operations = (() => {
  const shortestArr = arr2.length > arr1.length ? arr1 : arr2;

  return {
    '&':
      sample1['&'](sample2).toString() ===
      toString(shortestArr.map((_, i) => arr1[i] && arr2[i])),

    '|':
      sample1['|'](sample2).toString() ===
        toString(shortestArr.map((_, i) => arr1[i] || arr2[i])) &&
      // make sure we don't have bits set beyond the length of the bitarray
      sample1['|'](sample2).count ==
        arr1.reduce(
          (acc, bit, i) => acc + (Number(arr1[i]) | Number(arr2[i])),
          0
        ),

    '^':
      sample1['^'](sample2).toString() ===
        toString(shortestArr.map((_, i) => arr1[i] !== arr2[i])) &&
      sample1['^'](sample2).count ==
        arr1.reduce(
          (acc, bit, i) => acc + (Number(arr1[i]) ^ Number(arr2[i])),
          0
        ),

    or:
      sample1.or(sample2).toString() ===
      toString(shortestArr.map((_, i) => arr1[i] || arr2[i])),
    and:
      sample1.and(sample2).toString() ===
      toString(shortestArr.map((_, i) => arr1[i] && arr2[i])),
    xor:
      sample1.xor(sample2).toString() ===
      toString(shortestArr.map((_, i) => arr1[i] !== arr2[i])),
  };
})();

/** suite 4 */
const character_encoding_from_set = {
  '.encode_1bit': sample3.encode('ab') === 'abba',
  '.encode_3bit': sample3.encode('abcdefgh') === 'da',
  '.encode_': expectThrow(() => sample3.encode('')),
  '.encode_a': expectThrow(() => sample3.encode('a')),
  '.encode_abc': expectThrow(() => sample3.encode('abc')),
};

/** suite 5 */
const character_encode_decode = {
  '.decode_1bit':
    BitArray.decode('abba', 'ab').toString() === sample3.toString(),
  // Note: the substring is needed because when deserializing, we  have some number of padding 0s that we can't know were
  // in the original string or not
  '.decode_3bit':
    BitArray.decode('da', 'abcdefgh').toString().substring(0, 4) ===
    sample3.toString(),
  '.decode_empty': BitArray.decode('', 'ab').toString() === '',
  '.decode_invalid': expectThrow(() => BitArray.decode('abc', 'ab')),
  '.decode_': expectThrow(() => BitArray.decode('abba', '')),
};

export default {
  instantiating,
  properties,
  binary_operations,
  character_encoding_from_set,
  character_encode_decode,
};
