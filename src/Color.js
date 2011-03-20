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
 * Constructs a color. The following forms are allowed:
 * <ul>
 * <li>b9.Color()</li>
 * <li>b9.Color(b9.Color colorToBeCloned)</li>
 * <li>b9.Color(int r, int g, int b, int a = 255)</li>
 * </ul>
 *
 * @class A color which is represented by red, green, blue, and alpha components.<br>
 * Each component ranges between 0..255 with 0 meaning no contribution for that component,
 * and 255 meaning 100% contribution.
 *
 * @param {b9.Color|number} [colorOrR] A color to be cloned or a red component.
 * @param {number} [g] A green component.
 * @param {number} [b] A blue component.
 * @param {number} [a] An alpha component. If not specified, 255 is used.
 */
b9.Color = b9.createClass();

/**
 * @ignore
 */
b9.Color.prototype.initialize = function(colorOrR, g, b, a) {
    /**
     * The red component of this color.
     * @type {number}
     */
    this.r = 0;

    /**
     * The green component of this color.
     * @type {number}
     */
    this.g = 0;

    /**
     * The blue component of this color.
     * @type {number}
     */
    this.b = 0;

    /**
     * The alpha component of this color.
     * @type {number}
     */
    this.a = 0;

    if (arguments.length === 1) {
        this.r = colorOrR.r;
        this.g = colorOrR.g;
        this.b = colorOrR.b;
        this.a = colorOrR.a;
    } else if (arguments.length === 3) {
        this.r = colorOrR;
        this.g = g;
        this.b = b;
        this.a = 255;
    } else if (arguments.length === 4) {
        this.r = colorOrR;
        this.g = g;
        this.b = b;
        this.a = a;
    }
};

/**
 * Sets all of the components to this color. The following forms are allowed:
 * <ul>
 * <li>b9.Color(b9.Color colorToBeCloned)</li>
 * <li>b9.Color(int r, int g, int b, int a = 255)</li>
 * </ul>
 * @param {b9.Color|number} [colorOrR] A color to be cloned or a red component.
 * @param {number} [g] A green component.
 * @param {number} [b] A blue component.
 * @param {number} [a] An alpha component. If not specified, 255 is used.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.set = function(colorOrR, g, b, a) {
    if (arguments.length === 1) {
        this.r = colorOrR.r;
        this.g = colorOrR.g;
        this.b = colorOrR.b;
        this.a = colorOrR.a;
    } else if (arguments.length === 3) {
        this.r = colorOrR;
        this.g = g;
        this.b = b;
        this.a = 255;
    } else if (arguments.length === 4) {
        this.r = colorOrR;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    return this;
};

/**
 * Adds a color to this color.
 * @param {b9.Color} color A color.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.add = function(color) {
    this.r = b9.Math.min(this.r + color.r, 255);
    this.g = b9.Math.min(this.g + color.g, 255);
    this.b = b9.Math.min(this.b + color.b, 255);
    this.a = b9.Math.min(this.a + color.a, 255);

    return this;
};

/**
 * Subtracts a color from this color.
 * @param {b9.Color} color A color.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.sub = function(color) {
    this.r = b9.Math.max(this.r - color.r, 0);
    this.g = b9.Math.max(this.g - color.g, 0);
    this.b = b9.Math.max(this.b - color.b, 0);
    this.a = b9.Math.max(this.a - color.a, 0);

    return this;
};

/**
 * Multiplies this color with a color or a scalar value.
 * @param {b9.Color|number} colorOrScalar A color or a scalar value.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.mul = function(colorOrScalar) {
    if (colorOrScalar.r) {
        this.r = ((this.r + 1) * (colorOrScalar.r + 1) - 1) >> 8;
        this.g = ((this.g + 1) * (colorOrScalar.g + 1) - 1) >> 8;
        this.b = ((this.b + 1) * (colorOrScalar.b + 1) - 1) >> 8;
        this.a = ((this.a + 1) * (colorOrScalar.a + 1) - 1) >> 8;
    } else {
        this.r = b9.Math.clamp(this.r * colorOrScalar, 0, 255);
        this.g = b9.Math.clamp(this.g * colorOrScalar, 0, 255);
        this.b = b9.Math.clamp(this.b * colorOrScalar, 0, 255);
        this.a = b9.Math.clamp(this.a * colorOrScalar, 0, 255);
    }

    return this;
};

/**
 * Divides this color by a scalar value.
 * @param {number} s A scalar value.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.div = function(s) {
    var rs = 1.0 / s;

    this.r = b9.Math.clamp(this.r * rs, 0, 255);
    this.g = b9.Math.clamp(this.g * rs, 0, 255);
    this.b = b9.Math.clamp(this.b * rs, 0, 255);
    this.a = b9.Math.clamp(this.a * rs, 0, 255);

    return this;
};

/**
 * Interpolates this color to a color by a ratio.
 * @param {b9.Color} to A destination color.
 * @param {number} ratio The value which indicates how far to interpolate between the two colors.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.lerp = function(to, ratio) {
    var invRatio;

    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        invRatio = 1.0 - ratio;

        this.r = this.r * invRatio + to.r * ratio;
        this.g = this.g * invRatio + to.g * ratio;
        this.b = this.b * invRatio + to.b * ratio;
        this.a = this.a * invRatio + to.a * ratio;
    }

    return this;
};

/**
 * Returns whether this color equals a color.
 * @param {b9.Color} vec A color.
 * @return {boolean} true if the two colors are equal; false otherwise.
 */
b9.Color.prototype.equals = function(color) {
    return (this.r === color.r && this.g === color.g && this.b === color.b && this.a === color.a);
};

/**
 * Returns a string representation of this color.
 * @return {string} A string representation of this color.
 */
b9.Color.prototype.toString = function() {
    var str;

    str = "(";
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
 * The color whose components are all 0.
 * @const
 * @type {b9.Color}
 */
b9.Color.ZERO = new b9.Color(0, 0, 0, 0);

/**
 * The color whose components are all 255.
 * @const
 * @type {b9.Color}
 */
b9.Color.FULL = new b9.Color(255, 255, 255, 255);
