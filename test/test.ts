// coloring in node
const NodeFailure = '\x1b[31m', // red
  NodeSuccess = '\x1b[32m', // green
  NodeInfo = '\x1b[37m'; // white

// coloring in browser
const BrowserFailure = 'color:red;',
  BrowserSuccess = 'color:green;',
  BrowserInfo = 'color:darkgrey;font-size: x-large;';

const log =
  typeof window === 'object'
    ? // in browser
      function (success: boolean, text: string, tab: string) {
        success == true
          ? console.log('%c' + tab + text, BrowserSuccess)
          : success == false
          ? console.log('%c' + tab + text, BrowserFailure)
          : console.log('%c' + tab + text, BrowserInfo);
      }
    : // in node
      function (success: boolean, text: string, tab: string) {
        success == true
          ? console.log(NodeSuccess + tab + text + NodeInfo)
          : success == false
          ? console.log(NodeFailure + tab + text + NodeInfo)
          : console.log(tab + text);
      };

export default function test(suite: object, tab = '') {
  let success: boolean;

  // for( let [desc, success] of Object.entries( suite ) ) // es2017
  for (let desc of Object.keys(suite)) {
    success = suite[desc];

    if (typeof success === 'boolean') log(success, desc, tab);
    else {
      log(undefined, desc, tab);
      test(success, tab + '\t');
    }
  }
}
