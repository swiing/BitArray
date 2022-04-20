<p align="center">

  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white" />

</p>

# @bitarray/es6

![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/swiing/bitarray)

A BitArray class for easy and native-like operations on sequences of bits.

## Rationale

The library implements [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)s behind the hood. This allows for:

- **optimal memory usage**: each bit is effectively coded in just one bit in memory, as opposed to being coded as, e.g. booleans or integers in regular arrays.

- **efficient bitwise operations**: operations treat 32 bits at once, as opposed to dealing with entries one by one in regular arrays.

> :bulb: It comes at the cost that accessing a single bit at a given index will be slightly more expensive than accessing the value stored in a regular array: indeed, the interesting bit needs to be extracted once a Uint32 value has been found first.
>
> Having said that, in the very vast majority of cases, any difference either way should be unnoticeable; and you may very well opt to use this library for the sole reason that it provides **a convenient [native-like interface](#usage)** for your needs.

## Compatibility

![compatibility](https://img.shields.io/badge/compatibility-%3E%3D%20ES6-orange?style=flat)

The library relies on the [Proxy](https://caniuse.com/?search=Proxy) object, which is an ES6 (aka ES2015) feature. It can NOT be polyfilled (to the extent it is used by the library).

_Note: standard `TypedArray` is also a feature of ecmascript ES6._

## Installation

[![npm version](https://badge.fury.io/js/@bitarray%2Fes6.svg)](https://badge.fury.io/js/@bitarray%2Fes6)

```sh
npm install @bitarray/es6
```

or

```sh
yarn add @bitarray/es6
```

## Usage

Usage is same as for any standard typed array. You may check the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) for details. This is because the `BitArray` object extends [@bitarray/typedarray](https://github.com/swiing/Bit-TypedArray). Check it for details.

It adds [bitwise operations](#Bitwise-operations) on top.

### Instantiating

```js
import BitArray from "@bitarray/es6"

const bits = BitArray.from("11001010");

const otherbits = new BitArray(12); // 12 bits, the values of which default to zero.
```

### Bitwise operations

```js
bits.count; // === 4; number of bits set to 1.

// same as bits.and(otherbits)
(bits)['&'](otherbits); // an instance holding a sequence of eight zeros

// same as bits.or(otherbits)
(bits)['|'](otherbits); // 11001010

// same as bits.xor(otherbits)
(bits)['^'](otherbits); // 11001010
```

### Iterating

```js
for (let i=0; i<bits.length; i++)
  // do something with bits[i]

bits.forEach((val, i, arr) => { /* do something */ });

for (let i in bits)
  // do something with bits[i]

for (let bit of bits)
  // do something with bit
```

### Indexes & values

```js
Object.keys(bits);    // [0, 1, 2, 3, 4, 5, 6, 7]
Object.values(bits);  // [1, 1, 0, 0, 1, 0, 1, 0]
Object.entries(bits); // [["0", 1], ["1", 1], ["2", 0], ["3", 0], ...]
```

## License

[![license](https://img.shields.io/github/license/swiing/BitArray)](https://github.com/swiing/BitArray/blob/main/LICENSE)
