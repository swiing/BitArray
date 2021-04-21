/**
 *  An ES6 BitArray class for easy operations on sequences of bits.
 *
 *  @author swiing
 */
/**
 *  It aims at ease of use.
 *
 *  With regards to performance, it remains to be experimented/proven
 *  that it actually performs better than a regular array of booleans/numbers
 *  (at least in the specific context where it is used).
 *  Presumably, accessing values at indexes (array[i]) is slow, because
 *  it goes via a proxy. On the other hand, logical operations should be
 *  really fast. So it may depend on how much of those operations are used.
 *  Unless performance is a critical part, it should be ok for most cases
 *  anyway (it may be possible to increase performance by minimizing
 *  accesses to the proxy handlers - FFS if needed).
 *
 *  Lastly, it is very memory-efficient, as each value is coded in 1 bit,
 *  as opposed to booleans being less efficiently coded.
 *  (see https://dev.to/shevchenkonik/memory-size-of-javascript-boolean-3mlj)
 *
 */
import BitTypedArray from "@bitarray/typedarray";
export default class BitArray extends BitTypedArray {
    and: (bitArray: BitArray) => BitArray;
    or: (bitArray: BitArray) => BitArray;
    xor: (bitArray: BitArray) => BitArray;
    /**
     * returns the number of 'true' entries
     */
    get count(): number;
    /**
     *
     * @param bitArray
     * @returns a BitArray instance with the logical 'or' applied to this and the passed parameter.
     * The length of the resulting BitArray is the minimum of the length of the two operands.
     */
    ["|"](bitArray: BitArray): BitArray;
    /**
     *
     * @param bitArray
     * @returns a BitArray instance with the logical 'and' applied to this and the passed parameter.
     * The length of the resulting BitArray is the minimum of the length of the two operands.
     */
    ["&"](bitArray: BitArray): BitArray;
    /**
     *
     * @param bitArray
     * @returns a BitArray instance with the logical 'xor' applied to this and the passed parameter.
     * The length of the resulting BitArray is the minimum of the length of the two operands.
     */
    ["^"](bitArray: BitArray): BitArray;
}
