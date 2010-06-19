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
 * @class hoge
 */
b9.Color = b9.createClass();

/**
 * hoge
 * @param {b9.Color|Number} [arg1] hoge
 * @param {Number} [arg2] hoge
 * @param {Number} [arg3] hoge
 * @param {Number} [arg4] hoge
 */
b9.Color.prototype.initialize = function(arg1, arg2, arg3, arg4) {
    this._r = 0.0;
    this._g = 0.0;
    this._b = 0.0;
    this._a = 0.0;

    if (arguments.length === 1) {
        this._r = arg1._r;
        this._g = arg1._g;
        this._b = arg1._b;
        this._a = arg1._a;
    } else if (arguments.length === 3) {
        this._r = arg1;
        this._g = arg2;
        this._b = arg3;
        this._a = 1.0;
    } else if (arguments.length === 4) {
        this._r = arg1;
        this._g = arg2;
        this._b = arg3;
        this._a = arg4;
    }

    this._r = b9.Math.clamp(this._r, 0.0, 1.0);
    this._g = b9.Math.clamp(this._g, 0.0, 1.0);
    this._b = b9.Math.clamp(this._b, 0.0, 1.0);
    this._a = b9.Math.clamp(this._a, 0.0, 1.0);
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.Color.prototype.getR = function() {
    return this._r;
};

/**
 * hoge
 * @param {Number} r hoge
 */
b9.Color.prototype.setR = function(r) {
    this._r = b9.Math.clamp(r, 0.0, 1.0);
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.Color.prototype.getG = function() {
    return this._g;
};

/**
 * hoge
 * @param {Number} g hoge
 */
b9.Color.prototype.setG = function(g) {
    this._g = b9.Math.clamp(g, 0.0, 1.0);
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.Color.prototype.getB = function() {
    return this._b;
};

/**
 * hoge
 * @param {Number} b hoge
 */
b9.Color.prototype.setB = function(b) {
    this._b = b9.Math.clamp(b, 0.0, 1.0);
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.Color.prototype.getA = function() {
    return this._a;
};

/**
 * hoge
 * @param {Number} a hoge
 */
b9.Color.prototype.setA = function(a) {
    this._a = b9.Math.clamp(a, 0.0, 1.0);
};

/**
 * hoge
 * @param {b9.Color|Number} arg1 hoge
 * @param {Number} [arg2] hoge
 * @param {Number} [arg3] hoge
 * @param {Number} [arg4] hoge
 */
b9.Color.prototype.set = function(arg1, arg2, arg3, arg4) {
    if (arguments.length === 1) {
        this._r = arg1._r;
        this._g = arg1._g;
        this._b = arg1._b;
        this._a = arg1._a;
    } else if (arguments.length === 3) {
        this._r = arg1;
        this._g = arg2;
        this._b = arg3;
        this._a = 1.0;
    } else if (arguments.length === 4) {
        this._r = arg1;
        this._g = arg2;
        this._b = arg3;
        this._a = arg4;
    }

    this._r = b9.Math.clamp(this._r, 0.0, 1.0);
    this._g = b9.Math.clamp(this._g, 0.0, 1.0);
    this._b = b9.Math.clamp(this._b, 0.0, 1.0);
    this._a = b9.Math.clamp(this._a, 0.0, 1.0);
};

/**
 * hoge
 * @param {b9.Color} color hoge
 */
b9.Color.prototype.add = function(color) {
    this._r = b9.Math.min(this._r + color._r, 1.0);
    this._g = b9.Math.min(this._g + color._g, 1.0);
    this._b = b9.Math.min(this._b + color._b, 1.0);
    this._a = b9.Math.min(this._a + color._a, 1.0);
};

/**
 * hoge
 * @param {b9.Color} color hoge
 */
b9.Color.prototype.sub = function(color) {
    this._r = b9.Math.max(this._r - color._r, 0.0);
    this._g = b9.Math.max(this._g - color._g, 0.0);
    this._b = b9.Math.max(this._b - color._b, 0.0);
    this._a = b9.Math.max(this._a - color._a, 0.0);
};

/**
 * hoge
 * @param {b9.Color|Number} arg hoge
 */
b9.Color.prototype.mul = function(arg) {
    if (arg._r === undefined) {
        this._r *= arg;
        this._g *= arg;
        this._b *= arg;
        this._a *= arg;
    } else {
        this._r = this._r * arg._r;
        this._g = this._g * arg._g;
        this._b = this._b * arg._b;
        this._a = this._a * arg._a;
    }

    this._r = b9.Math.clamp(this._r, 0.0, 1.0);
    this._g = b9.Math.clamp(this._g, 0.0, 1.0);
    this._b = b9.Math.clamp(this._b, 0.0, 1.0);
    this._a = b9.Math.clamp(this._a, 0.0, 1.0);
};

/**
 * hoge
 * @param {Number} s hoge
 */
b9.Color.prototype.div = function(s) {
    var rs = 1.0 / s;

    this._r = b9.Math.clamp(this._r * rs, 0.0, 1.0);
    this._g = b9.Math.clamp(this._g * rs, 0.0, 1.0);
    this._b = b9.Math.clamp(this._b * rs, 0.0, 1.0);
    this._a = b9.Math.clamp(this._a * rs, 0.0, 1.0);
};

/**
 * hoge
 * @param {b9.Color} to hoge
 * @param {Number} ratio hoge
 */
b9.Color.prototype.interp = function(to, ratio) {
    if (ratio < b9.Math.EPSILON) {
        return;
    } else if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else {
        var inv_ratio = 1.0 - ratio;

        this._r = b9.Math.clamp(this._r * inv_ratio + to._r * ratio, 0.0, 1.0);
        this._g = b9.Math.clamp(this._g * inv_ratio + to._g * ratio, 0.0, 1.0);
        this._b = b9.Math.clamp(this._b * inv_ratio + to._b * ratio, 0.0, 1.0);
        this._a = b9.Math.clamp(this._a * inv_ratio + to._a * ratio, 0.0, 1.0);
    }
};

/**
 * hoge
 * @param {b9.Color} color hoge
 * @return {Boolean} hoge
 */
b9.Color.prototype.isEqual = function(color) {
    return (b9.Math.isEqualFloat(this._r, color._r) && b9.Math.isEqualFloat(this._g, color._g) &&
            b9.Math.isEqualFloat(this._b, color._b) && b9.Math.isEqualFloat(this._a, color._a));
};

/**
 * hoge
 * @return {String} hoge
 */
b9.Color.prototype.toString = function() {
    return "(" + this._r + ", " + this._g + ", " + this._b + ", " + this._a + ")";
};

/**
 * hoge
 * @return {b9.Color}
 */
b9.Color.ZERO = new b9.Color(0.0, 0.0, 0.0, 0.0);

/**
 * hoge
 * @return {b9.Color}
 */
b9.Color.FULL = new b9.Color(1.0, 1.0, 1.0, 1.0);
