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
    /**
     * hoge
     * @return {Number}
     */
    this.r = 0.0;

    /**
     * hoge
     * @return {Number}
     */
    this.g = 0.0;

    /**
     * hoge
     * @return {Number}
     */
    this.b = 0.0;

    /**
     * hoge
     * @return {Number}
     */
    this.a = 0.0;

    if (arguments.length === 1) {
        this.r = arg1.r;
        this.g = arg1.g;
        this.b = arg1.b;
        this.a = arg1.a;
    } else if (arguments.length === 3) {
        this.r = arg1;
        this.g = arg2;
        this.b = arg3;
        this.a = 1.0;
    } else if (arguments.length === 4) {
        this.r = arg1;
        this.g = arg2;
        this.b = arg3;
        this.a = arg4;
    }

    this.r = b9.Math.clamp(this.r, 0.0, 1.0);
    this.g = b9.Math.clamp(this.g, 0.0, 1.0);
    this.b = b9.Math.clamp(this.b, 0.0, 1.0);
    this.a = b9.Math.clamp(this.a, 0.0, 1.0);
};

/**
 * hoge
 * @param {b9.Color|Number} arg1 hoge
 * @param {Number} [arg2] hoge
 * @param {Number} [arg3] hoge
 * @param {Number} [arg4] hoge
 * @return {b9.Color} hoge
 */
b9.Color.prototype.set = function(arg1, arg2, arg3, arg4) {
    if (arguments.length === 1) {
        this.r = arg1.r;
        this.g = arg1.g;
        this.b = arg1.b;
        this.a = arg1.a;
    } else if (arguments.length === 3) {
        this.r = arg1;
        this.g = arg2;
        this.b = arg3;
        this.a = 1.0;
    } else if (arguments.length === 4) {
        this.r = arg1;
        this.g = arg2;
        this.b = arg3;
        this.a = arg4;
    }

    this.r = b9.Math.clamp(this.r, 0.0, 1.0);
    this.g = b9.Math.clamp(this.g, 0.0, 1.0);
    this.b = b9.Math.clamp(this.b, 0.0, 1.0);
    this.a = b9.Math.clamp(this.a, 0.0, 1.0);

    return this;
};

/**
 * hoge
 * @param {b9.Color} color hoge
 * @return {b9.Color} hoge
 */
b9.Color.prototype.add = function(color) {
    this.r = b9.Math.min(this.r + color.r, 1.0);
    this.g = b9.Math.min(this.g + color.g, 1.0);
    this.b = b9.Math.min(this.b + color.b, 1.0);
    this.a = b9.Math.min(this.a + color.a, 1.0);

    return this;
};

/**
 * hoge
 * @param {b9.Color} color hoge
 * @return {b9.Color} hoge
 */
b9.Color.prototype.sub = function(color) {
    this.r = b9.Math.max(this.r - color.r, 0.0);
    this.g = b9.Math.max(this.g - color.g, 0.0);
    this.b = b9.Math.max(this.b - color.b, 0.0);
    this.a = b9.Math.max(this.a - color.a, 0.0);

    return this;
};

/**
 * hoge
 * @param {b9.Color|Number} arg hoge
 * @return {b9.Color} hoge
 */
b9.Color.prototype.mul = function(arg) {
    if (arg.r === undefined) {
        this.r *= arg;
        this.g *= arg;
        this.b *= arg;
        this.a *= arg;
    } else {
        this.r = this.r * arg.r;
        this.g = this.g * arg.g;
        this.b = this.b * arg.b;
        this.a = this.a * arg.a;
    }

    this.r = b9.Math.clamp(this.r, 0.0, 1.0);
    this.g = b9.Math.clamp(this.g, 0.0, 1.0);
    this.b = b9.Math.clamp(this.b, 0.0, 1.0);
    this.a = b9.Math.clamp(this.a, 0.0, 1.0);

    return this;
};

/**
 * hoge
 * @param {Number} s hoge
 * @return {b9.Color} hoge
 */
b9.Color.prototype.div = function(s) {
    var rs = 1.0 / s;

    this.r = b9.Math.clamp(this.r * rs, 0.0, 1.0);
    this.g = b9.Math.clamp(this.g * rs, 0.0, 1.0);
    this.b = b9.Math.clamp(this.b * rs, 0.0, 1.0);
    this.a = b9.Math.clamp(this.a * rs, 0.0, 1.0);

    return this;
};

/**
 * hoge
 * @param {b9.Color} to hoge
 * @param {Number} ratio hoge
 * @return {b9.Color} hoge
 */
b9.Color.prototype.interp = function(to, ratio) {
    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        var inv_ratio = 1.0 - ratio;

        this.r = b9.Math.clamp(this.r * inv_ratio + to.r * ratio, 0.0, 1.0);
        this.g = b9.Math.clamp(this.g * inv_ratio + to.g * ratio, 0.0, 1.0);
        this.b = b9.Math.clamp(this.b * inv_ratio + to.b * ratio, 0.0, 1.0);
        this.a = b9.Math.clamp(this.a * inv_ratio + to.a * ratio, 0.0, 1.0);
    }

    return this;
};

/**
 * hoge
 * @param {b9.Color} color hoge
 * @return {Boolean} hoge
 */
b9.Color.prototype.isEqual = function(color) {
    return (b9.Math.isEqualFloat(this.r, color.r) && b9.Math.isEqualFloat(this.g, color.g) &&
            b9.Math.isEqualFloat(this.b, color.b) && b9.Math.isEqualFloat(this.a, color.a));
};

/**
 * hoge
 * @return {String} hoge
 */
b9.Color.prototype.toString = function() {
    var str = "(";
    str += this.r;
    str += ", ";
    str += this.g;
    str += ", ";
    str += this.b;
    str += ", ";
    str += this.a;
    str += ")";

    return str;
};

/**
 * hoge
 * @return {String} hoge
 */
b9.Color.prototype.toRGB = function() {
    var rgb = "rgb(";
    rgb += b9.Math.floor(this.r * 255.0 + 0.5);
    rgb += ",";
    rgb += b9.Math.floor(this.g * 255.0 + 0.5);
    rgb += ",";
    rgb += b9.Math.floor(this.b * 255.0 + 0.5);
    rgb += ")";

    return rgb;
};

/**
 * hoge
 * @return {String} hoge
 */
b9.Color.prototype.toRGBA = function() {
    var rgba = "rgba(";
    rgba += b9.Math.floor(this.r * 255.0 + 0.5);
    rgba += ",";
    rgba += b9.Math.floor(this.g * 255.0 + 0.5);
    rgba += ",";
    rgba += b9.Math.floor(this.b * 255.0 + 0.5);
    rgba += ",";
    rgba += b9.Math.floor(this.a * 255.0 + 0.5);
    rgba += ")";

    return rgba;
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
