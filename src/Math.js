/*
 * Copyright (c) 2009-2011 Takashi Kitao
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
 * @class Provides mathematical functions.
 */
b9.Math = {};

/**
 * Returns the integer value that is less than or equal to the argument.
 * @param {Number} x A value.
 * @return {Number} The integer value.
 */
b9.Math.floor = Math.floor;

/**
 * Returns the absolute value of the argument.
 * @param {Number} x A value.
 * @return {Number} The absolute value.
 */
b9.Math.abs = function(x) {
    return (x >= 0.0) ? x : -x;
};

/**
 * Returns the smaller of the two values.
 * @param {Number} a A value.
 * @param {Number} b An another value.
 * @return {Number} The smaller value.
 */
b9.Math.min = function(a, b) {
    return (a < b) ? a : b;
};

/**
 * Returns the greater of the two values.
 * @param {Number} a A value.
 * @param {Number} b An another value.
 * @return {Number} The greater value.
 */
b9.Math.max = function(a, b) {
    return (a > b) ? a : b;
};

/**
 * Clamps a value within an inclusive range.
 * @param {Number} x A value to be clamped.
 * @param {Number} min The minimum value of the range.
 * @param {Number} max The maximum value of the range.
 * @return {Number} A clamped value.
 */
b9.Math.clamp = function(x, min, max) {
    return (x < min) ? min : ((x > max) ? max : x);
};

/**
 * Returns the square root of a value.
 * @param {Number} x A value.
 * @return {Number} The positive square root of the value.
 */
b9.Math.sqrt = Math.sqrt;

/**
 * Returns the trigonometric sine of a float angle.
 * @param {Number} deg A float angle in degrees.
 * @return {Number} The sine of the angle.
 */
b9.Math.sin_float = function(deg) {
    return Math.sin(deg * this.DEG_TO_RAD);
};

/**
 * Returns the trigonometric cosine of a float angle.
 * @param {Number} deg A float angle in degrees.
 * @return {Number} The cosine of the angle.
 */
b9.Math.cos_float = function(deg) {
    return Math.cos(deg * this.DEG_TO_RAD);
};

/**
 * Returns the trigonometric sine of an integer angle.
 * This function allows only an integer angle, but is faster than the sin_float function.
 * @param {Number} deg An integer angle in degrees.
 * @return {Number} The sine of an angle.
 */
b9.Math.sin_int = function(deg) {
    deg = this.floor(deg);

    if (deg < 0) {
        deg %= 360;
        deg += 360;
    } else if (deg >= 360) {
        deg %= 360;
    }

    return this.sinTable_[deg];
};

/**
 * Returns the trigonometric cosine of an integer angle.
 * This function allows only an integer angle, but is faster than the cos_float function.
 * @param {Number} deg An integer angle in degrees.
 * @return {Number} The cosine of an angle.
 */
b9.Math.cos_int = function(deg) {
    deg = this.floor(deg) + 90;

    if (deg < 0) {
        deg %= 360;
        deg += 360;
    } else if (deg >= 360) {
        deg %= 360;
    }

    return this.sinTable_[deg];
};

/**
 * Returns the arc sine of a value.
 * @param {Number} x A value.
 * @return {Number} The arc sine of a value.
 */
b9.Math.asin = function(x) {
    return Math.asin(x) * this.RAD_TO_DEG;
};

/**
 * Returns the arc cosine of a value.
 * @param {Number} x A value.
 * @return {Number} The arc cosine of a value.
 */
b9.Math.acos = function(x) {
    return Math.acos(x) * this.RAD_TO_DEG;
};

/**
 * Returns the arc tangent of an x, y coordinate.
 * @param {Number} y A y-coordinate.
 * @param {Number} x An x-coordinate.
 * @return {Number} The arc tangent of y/x.
 */
b9.Math.atan2 = function(y, x) {
    return Math.atan2(y, x) * this.RAD_TO_DEG;
};

/**
 * Returns a random integer value within an inclusive range.
 * @param {Number} from The beginning of the range.
 * @param {Number} to The end of the range.
 * @return {Number} A random integer value.
 */
b9.Math.random_int = function(from, to) {
    var range;

    from = this.floor(from);
    to = this.floor(to);

    if (to >= from) {
        range = to - from + 1;
        return from + this.floor(Math.random() * range);
    } else {
        range = from - to + 1;
        return from - this.floor(Math.random() * range);
    }
};

/**
 * Returns a random float value within an inclusive range.
 * @param {Number} from The beginning of the range.
 * @param {Number} to The end of the range.
 * @param {Number} interval The interval of the random values.
 * @return {Number} A random float value.
 */
b9.Math.random_float = function(from, to, interval) {
    var range;

    interval = this.abs(interval);

    if (to >= from) {
        range = this.floor((to - from) / interval) + 1;
        return from + this.floor(Math.random() * range) * interval;
    } else {
        range = this.floor((from - to) / interval) + 1;
        return from - this.floor(Math.random() * range) * interval;
    }
};

/**
 * Returns the interporated value between the two values by a ratio.
 * @param {Number} from A source value.
 * @param {Number} to A destination value.
 * @param {Number} ratio The value which indicates how far to interpolate between the two values.
 * @return {Number} The interpolated value between the two values.
 */
b9.Math.lerp = function(from, to, ratio) {
    if (ratio < this.EPSILON) {
        return from;
    } else if (ratio > 1.0 - this.EPSILON) {
        return to;
    } else {
        return from * (1.0 - ratio) + to * ratio;
    }
};

/**
 * Returns whether the two values are almost equal.
 * @param {Number} a A value.
 * @param {Number} b An another value.
 * @return {Boolean} true if the two values are almost equal; false otherwise.
 */
b9.Math.equals_float = function(a, b) {
    return (this.abs(a - b) < this.EPSILON);
};

/**
 * An extremely small positive quantity.
 * If the difference of two numbers is less than this value, two numbers are considered equal.
 * @const
 * @type {Number}
 */
b9.Math.EPSILON = 0.0001;

/**
 * Pi.
 * @const
 * @type {Number}
 */
b9.Math.PI = Math.PI;

/**
 * Pi/180.
 * @const
 * @type {Number}
 */
b9.Math.DEG_TO_RAD = b9.Math.PI / 180.0;

/**
 * 180/Pi.
 * @const
 * @type {Number}
 */
b9.Math.RAD_TO_DEG = 180.0 / b9.Math.PI;

b9.Math.sinTable_ = [];
(function() {
    var i;

    for (i = 0; i < 360; i++) {
        b9.Math.sinTable_[i] = b9.Math.sin_float(i);
    }
})();
