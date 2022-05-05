import BitArray from "../src/bitarray";

const len = 42; // choose whatever value

// we fill randomly, but we could choose fixed values, or whatever,
const arr1 = new Array( len      ).fill(false).map( x => Math.random() > 0.5 )
// arr2 is arbitrarily longer here. Could also be shorter, or same size
const arr2 = new Array( len + 10 ).fill(false).map( x => Math.random() > 0.5 )

const sample1 = BitArray.from( arr1 );
const sample2 = BitArray.of( ...arr2 );
const sample3 = BitArray.from( '0110');

// Returns true if the block throws
function expectThrow( fn: () => void) {
  try {
    fn();
  } catch(e) {
    return true;
  }

  return false;
}

// matches the format of BitArray.toSting()
function toString( arr ) {
  return arr.map( Number )
              // add space between each byte
              .map( (b,i) => (i+1)%8 ? b : b+" " )
              .join("")
              // remove possible end space
              .trim();
}


/** suite 1 */
const instantiating = {
  "BitArray.from": sample1 instanceof BitArray,
  "BitArray.of":   sample2 instanceof BitArray
};

/** suite 2 */
const properties = {
  ".count": sample1.count == arr1.reduce( (acc,bit) => acc+Number(bit), 0 )
};


/** suite 3 */
const binary_operations = (()=>{

  const shortestArr = arr2.length>arr1.length ? arr1 : arr2;

  return {
    "&":   (sample1)['&'](sample2) .toString() === toString( shortestArr.map((_,i)=> arr1[i] && arr2[i] )),

    "|":   (sample1)['|'](sample2) .toString() === toString( shortestArr.map((_,i)=> arr1[i] || arr2[i] ))
        // make sure we don't have bits set beyond the length of the bitarray
        && (sample1)['|'](sample2) .count == arr1.reduce( (acc,bit,i) => acc+(Number(arr1[i])|Number(arr2[i])), 0 ),

    "^":   (sample1)['^'](sample2) .toString() === toString( shortestArr.map((_,i)=> arr1[i] !==  arr2[i] ))
        && (sample1)['^'](sample2) .count == arr1.reduce( (acc,bit,i) => acc+(Number(arr1[i])^Number(arr2[i])), 0 ),

    "or" : (sample1).or  (sample2) .toString() === toString( shortestArr.map((_,i)=> arr1[i]  ||  arr2[i] )),
    "and": (sample1).and (sample2) .toString() === toString( shortestArr.map((_,i)=> arr1[i]  &&  arr2[i] )),
    "xor": (sample1).xor (sample2) .toString() === toString( shortestArr.map((_,i)=> arr1[i] !==  arr2[i] ))
  }

})();

/** suite 4 */
const character_encoding_from_set = {
  ".encodeWithCharacterSet_1bit": sample3.encodeWithCharacterSet('ab') === 'abba',
  ".encodeWithCharacterSet_3bit": sample3.encodeWithCharacterSet('abcdefgh') === 'da',
  ".encodeWithCharacterSet_": expectThrow(() => sample3.encodeWithCharacterSet('')),
  ".encodeWithCharacterSet_a": expectThrow(() => sample3.encodeWithCharacterSet('a')),
  ".encodeWithCharacterSet_abc": expectThrow(() => sample3.encodeWithCharacterSet('abc'))
};

/** suite 5 */
const character_encode_decode = {
  ".decodeWithCharacterSet_1bit": BitArray.decodeWithCharacterSet('ab', 'abba').toString() === sample3.toString(),
  ".decodeWithCharacterSet_3bit": BitArray.decodeWithCharacterSet('abcdefgh', 'da').toString().substring(0, 4) === sample3.toString(),
  ".decodeWithCharacterSet_empty": BitArray.decodeWithCharacterSet('ab', '').toString() === '',
  ".decodeWithCharacterSet_invalid": expectThrow(() => BitArray.decodeWithCharacterSet('ab', 'abc')),
  ".decodeWithCharacterSet_": expectThrow(() => BitArray.decodeWithCharacterSet('', 'abba')),
};


export default {
  instantiating,
  properties,
  binary_operations,
  character_encoding_from_set,
  character_encode_decode
};

