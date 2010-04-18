/*
 * Copyright (c) 2009-2010 Takashi Kitao
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @class
 */
b9.Math = {};

/**
 *
 * @param {Number} x
 */
b9.Math.floor = function(x) {
    return Math.floor(x);
};

/**
 *
 * @param {Number} x
 */
b9.Math.abs = function(x) {
    return (x >= 0.0) ? x : -x;
};

/**
 *
 * @param {Number} a
 * @param {Number} b
 */
b9.Math.min = function(a, b) {
    return (a < b) ? a : b;
};

/**
 *
 * @param {Number} a
 * @param {Number} b
 */
b9.Math.max = function(a, b) {
    return (a > b) ? a : b;
};

/**
 *
 * @param {Number} x
 * @param {Number} min
 * @param {Number} max
 */
b9.Math.clamp = function(x, min, max) {
    return (x < min) ? min : ((x > max) ? max : x);
};

/**
 *
 * @param {Number} s
 */
b9.Math.sqrt = function(s) {
    return Math.sqrt(s);
};

/**
 *
 * @param {Number} deg
 */
b9.Math.sin_float = function(deg) {
    return Math.sin(deg * b9.Math.DEG_TO_RAD);
};

/**
 *
 * @param {Number} deg
 */
b9.Math.cos_float = function(deg) {
    return Math.cos(deg * b9.Math.DEG_TO_RAD);
};

/**
 *
 * @param {Number} deg
 */
b9.Math.sin_int = function(deg) {
    deg = b9.Math.floor(deg);

    if (deg < 0) {
        deg -= (b9.Math.floor(deg / 360) - 1) * 360;
    }

    deg %= 360;

    return (deg < 180) ? b9.Math._sin_table[deg] : -b9.Math._sin_table[deg - 180];
};

/**
 *
 * @param {Number} deg
 */
b9.Math.cos_int = function(deg) {
    return b9.Math.sin_int(deg + 90);
};

/**
 *
 * @param {Number} x
 */
b9.Math.asin = function(x) {
    return Math.asin(x) * b9.Math.RAD_TO_DEG;
};

/**
 *
 * @param {Number} x
 */
b9.Math.acos = function(x) {
    return Math.acos(x) * b9.Math.RAD_TO_DEG;
};

/**
 *
 * @param {Number} y
 * @param {Number} x
 */
b9.Math.atan2 = function(y, x) {
    return Math.atan2(y, x) * b9.Math.RAD_TO_DEG;
};

/**
 *
 * @param {Number} from
 * @param {Number} to
 */
b9.Math.random_int = function(from, to) {
    from = b9.Math.floor(from);
    to = b9.Math.floor(to);

    if (to >= from) {
        b9._n1 = to - from + 1;
        return from + b9.Math.floor(Math.random() * b9._n1);
    } else {
        b9._n1 = from - to + 1;
        return from - b9.Math.floor(Math.random() * b9._n1);
    }
};

/**
 *
 * @param {Number} from
 * @param {Number} to
 * @param {Number} interval
 */
b9.Math.random_float = function(from, to, interval) {
    interval = b9.Math.abs(interval);

    if (to >= from) {
        b9._f1 = b9.Math.floor((to - from) / interval + 1.0);
        return from + b9.Math.floor(Math.random() * b9._f1) * interval;
    } else {
        b9._f1 = b9.Math.floor((from - to) / interval + 1.0);
        return from - b9.Math.floor(Math.random() * b9._f1) * interval;
    }
};

/**
 *
 * @param {Number} from
 * @param {Number} to
 * @param {Number} ratio
 */
b9.Math.interp = function(from, to, ratio) {
    if (ratio < b9.Math.EPSILON) {
        return from;
    } else if (ratio > 1.0 - b9.Math.EPSILON) {
        return to;
    } else {
        return from * (1.0 - ratio) + to * ratio;
    }
};

/**
 * {Number}
 */
b9.Math.EPSILON = 0.0001;

/**
 * {Number}
 */
b9.Math.PI = Math.PI;

/**
 * {Number}
 */
b9.Math.DEG_TO_RAD = b9.Math.PI / 180.0;

/**
 * {Number}
 */
b9.Math.RAD_TO_DEG = 180.0 / b9.Math.PI;

/** @private */
b9.Math._sin_table = new array(180);

for (var i = 0; i < 180; i++) {
    b9.Math._sin_table[i] = Math.sin(b9.Math.PI / (180.0 * i));
}
