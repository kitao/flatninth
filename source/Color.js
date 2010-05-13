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
 * @param {b9.Color|Number} [arg1]
 * @param {Number} [arg2]
 * @param {Number} [arg3]
 * @param {Number} [arg4]
 */
b9.Color = function(arg1, arg2, arg3, arg4) {
    /**
     * hoge
     * return {Number}
     */
    this.r = 0;

    /**
     * hoge
     * return {Number}
     */
    this.g = 0;

    /**
     * hoge
     * return {Number}
     */
    this.b = 0;

    /**
     * hoge
     * return {Number}
     */
    this.a = 0;

    if (arguments.length === 4) {
        this.r = arg1;
        this.g = arg2;
        this.b = arg3;
        this.a = arg4;
    } else if (arguments.length === 3) {
        this.r = arg1;
        this.g = arg2;
        this.b = arg3;
        this.a = 255;
    } else if (arguments.length === 1) {
        this.r = arg1.r;
        this.g = arg1.g;
        this.b = arg1.b;
        this.a = arg1.a;
    }
};

/**
 * hoge
 * @param {b9.Color|Number} arg1
 * @param {Number} arg2
 * @param {Number} arg3
 * @param {Number} [arg4]
 */
b9.Color.prototype.set = function(arg1, arg2, arg3, arg4) {
    if (arguments.length === 4) {
        this.r = arg1;
        this.g = arg2;
        this.b = arg3;
        this.a = arg4;
    } else if (arguments.length === 3) {
        this.r = arg1;
        this.g = arg2;
        this.b = arg3;
        this.a = 255;
    } else if (arguments.length === 1) {
        this.r = arg1.r;
        this.g = arg1.g;
        this.b = arg1.b;
        this.a = arg1.a;
    }
};

/**
 * hoge
 * @param {b9.Color} color
 */
b9.Color.prototype.add = function(color) {
    this.r += color.r;
    this.g += color.g;
    this.b += color.b;
    this.a += color.a;

    if (this.r > 255) { this.r = 255; }
    if (this.g > 255) { this.g = 255; }
    if (this.b > 255) { this.b = 255; }
    if (this.a > 255) { this.a = 255; }
};

/**
 * hoge
 * @param {b9.Color} color
 */
b9.Color.prototype.sub = function(color) {
    this.r -= color.r;
    this.g -= color.g;
    this.b -= color.b;
    this.a -= color.a;

    if (this.r < 0) { this.r = 0; }
    if (this.g < 0) { this.g = 0; }
    if (this.b < 0) { this.b = 0; }
    if (this.a < 0) { this.a = 0; }
};

/**
 * hoge
 * @param {b9.Color|Number} arg
 */
b9.Color.prototype.mul = function(arg) {
    if (arg.r === undefined) {
        this.r *= arg;
        this.g *= arg;
        this.b *= arg;
        this.a *= arg;
    } else {
        this.r = this.r * arg.r / 255.0;
        this.g = this.g * arg.g / 255.0;
        this.b = this.b * arg.b / 255.0;
        this.a = this.a * arg.a / 255.0;
    }

    this.r = b9.Math.clamp(b9.Math.floor(this.r), 0, 255);
    this.g = b9.Math.clamp(b9.Math.floor(this.g), 0, 255);
    this.b = b9.Math.clamp(b9.Math.floor(this.b), 0, 255);
    this.a = b9.Math.clamp(b9.Math.floor(this.a), 0, 255);
};

/**
 * hoge
 * @param {Number} s
 */
b9.Color.prototype.div = function(s) {
    var rs = 1.0 / r;

    this.r = b9.Math.floor(this.r * rs);
    this.g = b9.Math.floor(this.g * rs);
    this.b = b9.Math.floor(this.b * rs);
    this.a = b9.Math.floor(this.a * rs);
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

        this.r = b9.Math.floor(this.r * inv_ratio + to.r);
        this.g = b9.Math.floor(this.g * inv_ratio + to.g);
        this.b = b9.Math.floor(this.b * inv_ratio + to.b);
        this.a = b9.Math.floor(this.a * inv_ratio + to.a);
    }
};

/**
 * hoge
 * @param {b9.Color} color
 * @return {Boolean} hoge
 */
b9.Color.prototype.isEqual = function(color) {
    return (this.r === color.r && this.g === color.g && this.b === color.b && this.a === color.a);
};

/**
 * hoge
 * @return {String}
 */
b9.Color.prototype.toString = function() {
    return "(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
};

/**
 * hoge
 * return {b9.Color}
 */
b9.Color.ZERO = new b9.Color(0, 0, 0, 0);

/**
 * hoge
 * return {b9.Color}
 */
b9.Color.FULL = new b9.Color(255, 255, 255, 255);
