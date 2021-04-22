import BitArray from "../src/bitarray.js";

const len = 42; // choose whatever value

// we fill randomly, but we could choose fixed values, or whatever,
const arr1 = new Array( len      ).fill(false).map( x => Math.random() > 0.5 )
// arr2 is arbitrarily longer here. Could also be shorter, or same size
const arr2 = new Array( len + 10 ).fill(false).map( x => Math.random() > 0.5 )

const sample1 = BitArray.from( arr1 );
const sample2 = BitArray.of( ...arr2 );

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

export default {
  instantiating,
  properties,
  binary_operations
};

