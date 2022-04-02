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
// I could leverage _views from @bitarray/typedarray, or create a new one here.
// import { _views } from "./bit-typedarray.js";
const _views = new WeakMap();
function getViewer(instance) {
    let viewer = _views.get(instance.buffer);
    if (!viewer) {
        _views.set(instance.buffer, viewer = new Uint32Array(instance.buffer));
    }
    return viewer;
}
// This is an extension of BitTypedArray with features (methods,getters)
// not available in native TypedArray's, essentially, bit operations.
export default class BitArray extends BitTypedArray {
    /**
     * returns the number of 'true' entries
     */
    // this is meant to be performant
    // inspired by https://github.com/bramstein/bit-array/blob/master/lib/bit-array.js
    get count() {
        let count = 0;
        let view = getViewer(this);
        for (let i = 0; i < this.length / 32; i++) {
            let x = view[i];
            // See: http://bits.stephan-brumme.com/countBits.html for an explanation
            x = x - ((x >> 1) & 0x55555555);
            x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
            x = x + (x >> 4);
            x &= 0xF0F0F0F;
            count += (x * 0x01010101) >> 24;
        }
        return count;
    }
    // Implementation note 1: I once used the maximum length of the two operands (for | and for ^),
    // defaulting to 'false' for the operand with "missing" values. However, it is arguable that
    // this is a good default assumption (it depends on context) so I finally prefer to go
    // conservative, and compute only when there is actual data available (i.e. not assuming
    // 'false' otherwise).
    // As a positive side effect, it also simplifies implementation (but this is not the driver).
    // Implementation note 2: I could have a very simple implementation doing e.g.
    // ret[i] = this[i] && bitArray[i], for every index
    // However, this would go through the array bit by bit. Instead, I go 4 bytes by 4 bytes (Uint32).
    // This is where improved performance is expected.
    /**
     *
     * @param bitArray
     * @returns a BitArray instance with the logical 'or' applied to this and the passed parameter.
     * The length of the resulting BitArray is the minimum of the length of the two operands.
     */
    ["|"](bitArray) {
        const ret = new BitArray(Math. /*max*/min(this.length, bitArray.length));
        const retView = new Uint32Array(ret.buffer);
        _views.set(ret.buffer, retView);
        const thisView = getViewer(this);
        const bitArrayView = getViewer(bitArray);
        // let offset = 0;
        // -1 needed for the case len == 32*n
        let offset = (ret.length - 1 >> 5) + 1; // divide 32, and add 1 because of next i--.
        // for( /**/;
        //      // -1 needed for the case Math.min() == 32*n.
        //      offset < ( ret.length /*== Math.min( this.length, bitArray.length )*/ - 1 >> 5 ) + 1;
        //      offset++ )
        while (offset--)
            // note: ret is a proxy;
            retView[offset] = thisView[offset] | bitArrayView[offset];
        // Needed only if length of the returned value would be the max length of the two operands
        // for( /**/;
        //      // offset < ( Math.max( this.length, bitArray.length ) >> 5 ) + 1;
        //      // (tbc) same as:
        //      offset < ret.length >> 5;
        //      offset++ )
        //    _views.get( ret.buffer )[ offset ] = _views.get( ( this.length <= bitArray.length ? bitArray : _targets.get( this ) ).buffer )[ offset ];
        // when the two operands have a different length, and since bitwise
        // operations treat by bunch of 32 bits, we may have set bits to 1
        // beyond the length of ret. We apply a mask to set them back to zero
        // (so that other operations like .count are correct)
        retView[ret.length >> 5] &= (1 << (ret.length & 31)) - 1; /* modulo 32 , -1*/
        return ret;
    }
    /**
     *
     * @param bitArray
     * @returns a BitArray instance with the logical 'and' applied to this and the passed parameter.
     * The length of the resulting BitArray is the minimum of the length of the two operands.
     */
    ["&"](bitArray) {
        const ret = new BitArray(Math.min(this.length, bitArray.length));
        const retView = new Uint32Array(ret.buffer);
        _views.set(ret.buffer, retView);
        const thisView = getViewer(this);
        const bitArrayView = getViewer(bitArray);
        // -1 needed for the case len == 32*n
        let offset = (ret.length - 1 >> 5) + 1; // divide 32, and add 1 because of next i--.
        while (offset--)
            retView[offset] = thisView[offset] & bitArrayView[offset];
        return ret;
    }
    /**
     *
     * @param bitArray
     * @returns a BitArray instance with the logical 'xor' applied to this and the passed parameter.
     * The length of the resulting BitArray is the minimum of the length of the two operands.
     */
    ["^"](bitArray) {
        const ret = new BitArray(Math.min(this.length, bitArray.length));
        const retView = new Uint32Array(ret.buffer);
        _views.set(ret.buffer, retView);
        const thisView = getViewer(this);
        const bitArrayView = getViewer(bitArray);
        // -1 needed for the case len == 32*n
        let offset = (ret.length - 1 >> 5) + 1; // divide 32, and add 1 because of next i--.
        while (offset--)
            retView[offset] = thisView[offset] ^ bitArrayView[offset];
        // when the two operands have a different length, and since bitwise
        // operations treat by bunch of 32 bits, we may have set bits to 1
        // beyond the length of ret. We apply a mask to set them back to zero
        // (so that other operations like .count are correct)
        retView[ret.length >> 5] &= (1 << (ret.length & 31)) - 1; /* modulo 32 , -1*/
        return ret;
    }
}
// create aliases
BitArray.prototype.and = BitArray.prototype["&"];
BitArray.prototype.or = BitArray.prototype["|"];
BitArray.prototype.xor = BitArray.prototype["^"];
