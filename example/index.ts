import BoolArray from '../src/bitarray.js';
import { log as _, logHeader as _$ } from './util.js';

import { bit } from '@bitarray/typedarray';

const len = 33; // choose any integer value

_$('Randomly initializing an array');

const randomArray = new BoolArray(len);
for (let i = 0; i < len; i++)
  randomArray[i] = (Math.random() > 0.5) as unknown as bit;

_('instanceof == BoolArray', randomArray instanceof BoolArray);

_('array == ', randomArray);

_$('properties');

_('.count', randomArray.count);

_$('Bitwise operations');

const sample1 = BoolArray.from(
  [
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
  ].concat([
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
  ])
);

const sample2 = BoolArray.from(
  [
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
  ].concat([
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
  ])
);

_('sample1 = ', sample1.toString());
_('sample2 = ', sample2.toString());
_('s1 | s2 = ', sample1['|'](sample2).toString());
_('s1 ^ s2 = ', sample1['^'](sample2).toString());
_('s1 & s2 = ', sample1['&'](sample2).toString());
