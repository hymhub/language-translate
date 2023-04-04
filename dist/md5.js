// utils/md5.js
function safeAdd(x6, y5) {
    var lsw = (x6 & 65535) + (y5 & 65535), msw = (x6 >> 16) + (y5 >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q7, a4, b6, x6, s6, t5) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a4, q7), safeAdd(x6, t5)), s6), b6);
}
function md5ff(a4, b6, c5, d5, x6, s6, t5) {
    return md5cmn(b6 & c5 | ~b6 & d5, a4, b6, x6, s6, t5);
}
function md5gg(a4, b6, c5, d5, x6, s6, t5) {
    return md5cmn(b6 & d5 | c5 & ~d5, a4, b6, x6, s6, t5);
}
function md5hh(a4, b6, c5, d5, x6, s6, t5) {
    return md5cmn(b6 ^ c5 ^ d5, a4, b6, x6, s6, t5);
}
function md5ii(a4, b6, c5, d5, x6, s6, t5) {
    return md5cmn(c5 ^ (b6 | ~d5), a4, b6, x6, s6, t5);
}
function binlMD5(x6, len) {
    x6[len >> 5] |= 128 << len % 32, x6[(len + 64 >>> 9 << 4) + 14] = len;
    var i2, olda, oldb, oldc, oldd, a4 = 1732584193, b6 = -271733879, c5 = -1732584194, d5 = 271733878;
    for (i2 = 0; i2 < x6.length; i2 += 16)
        olda = a4, oldb = b6, oldc = c5, oldd = d5, a4 = md5ff(a4, b6, c5, d5, x6[i2], 7, -680876936), d5 = md5ff(d5, a4, b6, c5, x6[i2 + 1], 12, -389564586), c5 = md5ff(c5, d5, a4, b6, x6[i2 + 2], 17, 606105819), b6 = md5ff(b6, c5, d5, a4, x6[i2 + 3], 22, -1044525330), a4 = md5ff(a4, b6, c5, d5, x6[i2 + 4], 7, -176418897), d5 = md5ff(d5, a4, b6, c5, x6[i2 + 5], 12, 1200080426), c5 = md5ff(c5, d5, a4, b6, x6[i2 + 6], 17, -1473231341), b6 = md5ff(b6, c5, d5, a4, x6[i2 + 7], 22, -45705983), a4 = md5ff(a4, b6, c5, d5, x6[i2 + 8], 7, 1770035416), d5 = md5ff(d5, a4, b6, c5, x6[i2 + 9], 12, -1958414417), c5 = md5ff(c5, d5, a4, b6, x6[i2 + 10], 17, -42063), b6 = md5ff(b6, c5, d5, a4, x6[i2 + 11], 22, -1990404162), a4 = md5ff(a4, b6, c5, d5, x6[i2 + 12], 7, 1804603682), d5 = md5ff(d5, a4, b6, c5, x6[i2 + 13], 12, -40341101), c5 = md5ff(c5, d5, a4, b6, x6[i2 + 14], 17, -1502002290), b6 = md5ff(b6, c5, d5, a4, x6[i2 + 15], 22, 1236535329), a4 = md5gg(a4, b6, c5, d5, x6[i2 + 1], 5, -165796510), d5 = md5gg(d5, a4, b6, c5, x6[i2 + 6], 9, -1069501632), c5 = md5gg(c5, d5, a4, b6, x6[i2 + 11], 14, 643717713), b6 = md5gg(b6, c5, d5, a4, x6[i2], 20, -373897302), a4 = md5gg(a4, b6, c5, d5, x6[i2 + 5], 5, -701558691), d5 = md5gg(d5, a4, b6, c5, x6[i2 + 10], 9, 38016083), c5 = md5gg(c5, d5, a4, b6, x6[i2 + 15], 14, -660478335), b6 = md5gg(b6, c5, d5, a4, x6[i2 + 4], 20, -405537848), a4 = md5gg(a4, b6, c5, d5, x6[i2 + 9], 5, 568446438), d5 = md5gg(d5, a4, b6, c5, x6[i2 + 14], 9, -1019803690), c5 = md5gg(c5, d5, a4, b6, x6[i2 + 3], 14, -187363961), b6 = md5gg(b6, c5, d5, a4, x6[i2 + 8], 20, 1163531501), a4 = md5gg(a4, b6, c5, d5, x6[i2 + 13], 5, -1444681467), d5 = md5gg(d5, a4, b6, c5, x6[i2 + 2], 9, -51403784), c5 = md5gg(c5, d5, a4, b6, x6[i2 + 7], 14, 1735328473), b6 = md5gg(b6, c5, d5, a4, x6[i2 + 12], 20, -1926607734), a4 = md5hh(a4, b6, c5, d5, x6[i2 + 5], 4, -378558), d5 = md5hh(d5, a4, b6, c5, x6[i2 + 8], 11, -2022574463), c5 = md5hh(c5, d5, a4, b6, x6[i2 + 11], 16, 1839030562), b6 = md5hh(b6, c5, d5, a4, x6[i2 + 14], 23, -35309556), a4 = md5hh(a4, b6, c5, d5, x6[i2 + 1], 4, -1530992060), d5 = md5hh(d5, a4, b6, c5, x6[i2 + 4], 11, 1272893353), c5 = md5hh(c5, d5, a4, b6, x6[i2 + 7], 16, -155497632), b6 = md5hh(b6, c5, d5, a4, x6[i2 + 10], 23, -1094730640), a4 = md5hh(a4, b6, c5, d5, x6[i2 + 13], 4, 681279174), d5 = md5hh(d5, a4, b6, c5, x6[i2], 11, -358537222), c5 = md5hh(c5, d5, a4, b6, x6[i2 + 3], 16, -722521979), b6 = md5hh(b6, c5, d5, a4, x6[i2 + 6], 23, 76029189), a4 = md5hh(a4, b6, c5, d5, x6[i2 + 9], 4, -640364487), d5 = md5hh(d5, a4, b6, c5, x6[i2 + 12], 11, -421815835), c5 = md5hh(c5, d5, a4, b6, x6[i2 + 15], 16, 530742520), b6 = md5hh(b6, c5, d5, a4, x6[i2 + 2], 23, -995338651), a4 = md5ii(a4, b6, c5, d5, x6[i2], 6, -198630844), d5 = md5ii(d5, a4, b6, c5, x6[i2 + 7], 10, 1126891415), c5 = md5ii(c5, d5, a4, b6, x6[i2 + 14], 15, -1416354905), b6 = md5ii(b6, c5, d5, a4, x6[i2 + 5], 21, -57434055), a4 = md5ii(a4, b6, c5, d5, x6[i2 + 12], 6, 1700485571), d5 = md5ii(d5, a4, b6, c5, x6[i2 + 3], 10, -1894986606), c5 = md5ii(c5, d5, a4, b6, x6[i2 + 10], 15, -1051523), b6 = md5ii(b6, c5, d5, a4, x6[i2 + 1], 21, -2054922799), a4 = md5ii(a4, b6, c5, d5, x6[i2 + 8], 6, 1873313359), d5 = md5ii(d5, a4, b6, c5, x6[i2 + 15], 10, -30611744), c5 = md5ii(c5, d5, a4, b6, x6[i2 + 6], 15, -1560198380), b6 = md5ii(b6, c5, d5, a4, x6[i2 + 13], 21, 1309151649), a4 = md5ii(a4, b6, c5, d5, x6[i2 + 4], 6, -145523070), d5 = md5ii(d5, a4, b6, c5, x6[i2 + 11], 10, -1120210379), c5 = md5ii(c5, d5, a4, b6, x6[i2 + 2], 15, 718787259), b6 = md5ii(b6, c5, d5, a4, x6[i2 + 9], 21, -343485551), a4 = safeAdd(a4, olda), b6 = safeAdd(b6, oldb), c5 = safeAdd(c5, oldc), d5 = safeAdd(d5, oldd);
    return [a4, b6, c5, d5];
}
function binl2rstr(input) {
    var i2, output = "", length32 = input.length * 32;
    for (i2 = 0; i2 < length32; i2 += 8)
        output += String.fromCharCode(input[i2 >> 5] >>> i2 % 32 & 255);
    return output;
}
function rstr2binl(input) {
    var i2, output = [];
    for (output[(input.length >> 2) - 1] = void 0, i2 = 0; i2 < output.length; i2 += 1)
        output[i2] = 0;
    var length8 = input.length * 8;
    for (i2 = 0; i2 < length8; i2 += 8)
        output[i2 >> 5] |= (input.charCodeAt(i2 / 8) & 255) << i2 % 32;
    return output;
}
function rstrMD5(s6) {
    return binl2rstr(binlMD5(rstr2binl(s6), s6.length * 8));
}
function rstrHMACMD5(key, data) {
    var i2, bkey = rstr2binl(key), ipad = [], opad = [], hash;
    for (ipad[15] = opad[15] = void 0, bkey.length > 16 && (bkey = binlMD5(bkey, key.length * 8)), i2 = 0; i2 < 16; i2 += 1)
        ipad[i2] = bkey[i2] ^ 909522486, opad[i2] = bkey[i2] ^ 1549556828;
    return hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8), binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
}
function rstr2hex(input) {
    var hexTab = "0123456789abcdef", output = "", x6, i2;
    for (i2 = 0; i2 < input.length; i2 += 1)
        x6 = input.charCodeAt(i2), output += hexTab.charAt(x6 >>> 4 & 15) + hexTab.charAt(x6 & 15);
    return output;
}
function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input));
}
function rawMD5(s6) {
    return rstrMD5(str2rstrUTF8(s6));
}
function hexMD5(s6) {
    return rstr2hex(rawMD5(s6));
}
function rawHMACMD5(k5, d5) {
    return rstrHMACMD5(str2rstrUTF8(k5), str2rstrUTF8(d5));
}
function hexHMACMD5(k5, d5) {
    return rstr2hex(rawHMACMD5(k5, d5));
}
export function md5(string, key, raw) {
    return key ? raw ? rawHMACMD5(key, string) : hexHMACMD5(key, string) : raw ? rawMD5(string) : hexMD5(string);
}
