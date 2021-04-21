# @bitarray/es6

A BitArray class for easy operations on sequences of bits.

## Rationale

The library implements [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)s
behind the hood. This allows for:

- **optimal memory usage**: each bit is effectively coded in just one bit in memory, 
as opposed to being coded as, e.g. booleans or integers in regular arrays.

- **efficient bitwise operations**: operations treat 32 bits at once,
as opposed to dealing with entries one by one in regular arrays.

It comes at the cost that accessing a single bit at a given index will be 
slightly more expensive than accessing the value stored in a regular array: 
indeed, the interesting bit needs to be extracted once a Uint32 value has 
been found first.

So _do use_ this library if you need to apply operations on bunches of bits 
and/or if memory usage matters to you. But _don't use_ this library if you 
rather need to heavily manipulate bits _one at a time_. 

Having said that, in the vast majority of cases, any difference either way 
should be mostly unnoticeable; and you may very well opt to use this library 
for the sole reason that it provides **a convenient [interface](#usage)** for your needs.

## Compatibility

The library relies on the [Proxy](https://caniuse.com/?search=Proxy) object,
which is an ES6 (aka ES2015) feature. It can NOT be polyfilled (to the extent it is used by the library).

## Usage

The BitArray class extends [@bitarray/typedarray](https://github.com/swiing/Bit-TypedArray).
So it inherits the behaviour of standard [type arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray).

It adds bit-specific methods on top. 

### Instantiating

```javascript
import BitArray from "path/to/bitarray.js"

const bits = BitArray.from( "11001010" );

bits.count; // === 4; number of bits set to 1.

const otherbits = new BitArray(12); // 12 bits, the values of which default to zero.

// same as bits.and(otherbits)
( bits )['&']( otherbits ); // an instance holding a sequence of eight zeros

// same as bits.or(otherbits)
( bits )['|']( otherbits ); // an instance holding the same sequence as bits

// same as bits.xor(otherbits)
( bits )['^']( otherbits ); // an instance holding the same sequence as bits

```

### Iterating
```javascript
for( let i=0; i<bits.length; i++ ) 
  // do something with bits[i]

bits.forEach( (val, i, arr) => { /* do something */ } );

for( let i in bits ) 
  // do something with bits[i]

for( let bit of bits ) 
  // do something with bit
```

### Indexes & values

```javascript
Object.keys( bits );    // [ 0,1,2,3,4,5,6,7 ]
Object.values( bits );  // [ 1,1,0,0,1,0,1,0 ]
Object.entries( bits ); // [ ["0",1], ["1",1], ["2",0], ["3",0],...]
```
