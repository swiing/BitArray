import BoolArray from '../dist/bitarray.js';
import { log as _, logHeader as _$ } from "./util.js";


const len = 33; // choose any integer value

_$("Randomly initializing an array");

  const randomArray = new BoolArray(len);
  for( let i=0, bool; i<len; i++)
      randomArray[i] = (Math.random() > 0.5);

  _( "instanceof == BoolArray", randomArray instanceof BoolArray )

  _( "array == ", randomArray);


_$("properties");

  _( ".count", randomArray.count);


_$("Bitwise operations");

  const sample1 = BoolArray.from([true,false,false,true,false,false,false,false,
                                  true,false,false,true,false,false,false,false,
                                  true,false,false,true,false,false,false,false,
                                  true,false,false,true,false,false,false,true ]
                        .concat([ true,false,false,true,false,false,false,false,
                                  true,false,false,true,false,false,false,false,
                                  true,false,false,true,false,false,false,false,
                                  true,false,false,true,false,false,false,true ]));

  const sample2 = BoolArray.from([false,true,false,true,false,false,false,false,
                                  true,false,false,true,false,false,false,false,
                                  false,true,false,true,false,false,false,false,
                                  true,false,false,true,false,false,false,true ]
                        .concat([ true,false,false,true,false,false,false,false,
                                  true,false,false,true,false,false,false,false,
                                  true,false,false,true,false,false,false,false,
                                  true,false,false,true,false,false,false,true ]));

  _( "sample1 = ", sample1.toString() );
  _( "sample2 = ", sample2.toString() );
  _( "s1 | s2 = ", (sample1)['|'](sample2) .toString() );
  _( "s1 ^ s2 = ", (sample1)['^'](sample2) .toString() );
  _( "s1 & s2 = ", (sample1)['&'](sample2) .toString() );
