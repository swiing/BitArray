/**
 * Some useful alphabets
 */

const lettersAndDigits =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const base64MIMEChars = lettersAndDigits + '+/';
const base64UrlChars = lettersAndDigits + '-_';

export { base64MIMEChars, base64UrlChars };
