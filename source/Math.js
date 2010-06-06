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
 * hoge
 * @class hoge
 */
b9.Math = {};

/**
 * hoge
 * @param {Number} x hoge
 * @return {Number} hoge
 */
b9.Math.floor = function(x) {
    return Math.floor(x);
};

/**
 * hoge
 * @param {Number} x hoge
 * @return {Number} hoge
 */
b9.Math.abs = function(x) {
    return (x >= 0.0) ? x : -x;
};

/**
 * hoge
 * @param {Number} a hoge
 * @param {Number} b hoge
 * @return {Number} hoge
 */
b9.Math.min = function(a, b) {
    return (a < b) ? a : b;
};

/**
 * hoge
 * @param {Number} a hoge
 * @param {Number} b hoge
 * @return {Number} hoge
 */
b9.Math.max = function(a, b) {
    return (a > b) ? a : b;
};

/**
 * hoge
 * @param {Number} x hoge
 * @param {Number} min hoge
 * @param {Number} max hoge
 * @return {Number} hoge
 */
b9.Math.clamp = function(x, min, max) {
    return (x < min) ? min : ((x > max) ? max : x);
};

/**
 * hoge
 * @param {Number} s hoge
 * @return {Number} hoge
 */
b9.Math.sqrt = function(s) {
    return Math.sqrt(s);
};

/**
 * hoge
 * @param {Number} deg hoge
 * @return {Number} hoge
 */
b9.Math.sinFloat = function(deg) {
    return Math.sin(deg * this.DEG_TO_RAD);
};

/**
 * hoge
 * @param {Number} deg hoge
 * @return {Number} hoge
 */
b9.Math.cosFloat = function(deg) {
    return Math.cos(deg * this.DEG_TO_RAD);
};

/**
 * hoge
 * @param {Number} deg hoge
 * @return {Number} hoge
 */
b9.Math.sinInt = function(deg) {
    deg = this.floor(deg);

    if (deg < 0) {
        deg -= (this.floor(deg / 360) - 1) * 360;
    }

    deg %= 360;

    return (deg < 180) ? this._sin_table[deg] : -this._sin_table[deg - 180];
};

/**
 * hoge
 * @param {Number} deg hoge
 * @return {Number} hoge
 */
b9.Math.cosInt = function(deg) {
    return this.sinInt(deg + 90);
};

/**
 * hoge
 * @param {Number} x hoge
 * @return {Number} hoge
 */
b9.Math.asin = function(x) {
    return Math.asin(x) * this.RAD_TO_DEG;
};

/**
 * hoge
 * @param {Number} x hoge
 * @return {Number} hoge
 */
b9.Math.acos = function(x) {
    return Math.acos(x) * this.RAD_TO_DEG;
};

/**
 * hoge
 * @param {Number} y hoge
 * @param {Number} x hoge
 * @return {Number} hoge
 */
b9.Math.atan2 = function(y, x) {
    return Math.atan2(y, x) * this.RAD_TO_DEG;
};

/**
 * hoge
 * @param {Number} from hoge
 * @param {Number} to hoge
 * @return {Number} hoge
 */
b9.Math.randomInt = function(from, to) {
    from = this.floor(from);
    to = this.floor(to);

    var range;

    if (to >= from) {
        range = to - from + 1;
        return from + this.floor(Math.random() * range);
    } else {
        range = from - to + 1;
        return from - this.floor(Math.random() * range);
    }
};

/**
 * hoge
 * @param {Number} from hoge
 * @param {Number} to hoge
 * @param {Number} interval hoge
 * @return {Number} hoge
 */
b9.Math.randomFloat = function(from, to, interval) {
    interval = this.abs(interval);

    var range;

    if (to >= from) {
        range = this.floor((to - from) / interval) + 1;
        return from + this.floor(Math.random() * range) * interval;
    } else {
        range = this.floor((from - to) / interval) + 1;
        return from - this.floor(Math.random() * range) * interval;
    }
};

/**
 * hoge
 * @param {Number} from hoge
 * @param {Number} to hoge
 * @param {Number} ratio hoge
 * @return {Number} hoge
 */
b9.Math.interp = function(from, to, ratio) {
    if (ratio < this.EPSILON) {
        return from;
    } else if (ratio > 1.0 - this.EPSILON) {
        return to;
    } else {
        return from * (1.0 - ratio) + to * ratio;
    }
};

/**
 * hoge
 * @param {Number} a hoge
 * @param {Number} b hoge
 * @return {Boolean} hoge
 */
b9.Math.isEqualFloat = function(a, b) {
    return (this.abs(a - b) < this.EPSILON);
};

/**
 * hoge
 * @return {Number}
 */
b9.Math.EPSILON = 0.0001;

/**
 * hoge
 * @return {Number}
 */
b9.Math.PI = Math.PI;

/**
 * hoge
 * @return {Number}
 */
b9.Math.DEG_TO_RAD = b9.Math.PI / 180.0;

/**
 * hoge
 * @return {Number}
 */
b9.Math.RAD_TO_DEG = 180.0 / b9.Math.PI;

/** @private */
b9.Math._sin_table = new Array(180);

for (var i = 0; i < 180; i++) {
    b9.Math._sin_table[i] = b9.Math.sinFloat(i);
}
